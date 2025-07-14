import fs from 'node:fs';
import path from 'node:path';
import { load, type CheerioAPI, type Cheerio } from 'cheerio';
import AdmZip from 'adm-zip';
import * as tar from 'tar';
import axios from 'axios';
import { SingleBar, Presets } from 'cli-progress';
import { ItchApiClient } from './api';
import { ItchDownloadError, getIntAfterMarkerInJson, shouldSkipItemByGlob, shouldSkipItemByRegex } from './utils';
import { ITCH_GAME_URL_REGEX } from './consts';
import { Settings } from './config';
import { parseInfobox, InfoboxMetadata } from './infobox';

export const TARGET_PATHS = {
  site: 'site.html',
  cover: 'cover',
  metadata: 'metadata.json',
  files: 'files',
  screenshots: 'screenshots',
} as const;

export interface DownloadResult {
  url: string;
  success: boolean;
  errors: string[];
  external_urls: string[];
}

export interface GameMetadata {
  game_id: number;
  title?: string;
  url: string;
  errors?: string[];
  external_downloads?: string[];
  author?: string;
  author_url?: string;
  cover_url?: string | null;
  screenshots: string[];
  description?: string | null;
  rating?: Record<string, number>;
  extra?: InfoboxMetadata;
  created_at?: string;
  updated_at?: string;
  released_at?: string;
  published_at?: string;
  [key: string]: any;
}

export class GameDownloader {
  settings: Settings;
  downloadKeys: Record<number, string>;
  client: ItchApiClient;

  constructor(settings: Settings, keys: Record<number, string>) {
    this.settings = settings;
    this.downloadKeys = keys;
    this.client = new ItchApiClient(settings.apiKey, settings.userAgent);
  }

  static getRatingJson(site: CheerioAPI): any | null {
    const scripts = site('script[type="application/ld+json"]');
    for (let i = 0; i < scripts.length; i++) {
      try {
        const json = JSON.parse(site(scripts[i]).text().trim());
        if (json['@type'] === 'Product') return json;
      } catch {
        continue;
      }
    }
    return null;
  }

  static getMeta(site: CheerioAPI, selector: string, attr: string = 'content'): string | null {
    const node = site(`meta[${selector}]`);
    if (node.length === 0) return null;
    return node.attr(attr) || null;
  }

  async getGameId(url: string, site: CheerioAPI): Promise<number> {
    let gameId: number | null = null;
    const itchPath = GameDownloader.getMeta(site, 'name="itch:path"');
    if (itchPath) {
      const parts = itchPath.split('/');
      const last = parts[parts.length - 1];
      gameId = parseInt(last, 10);
    }
    if (!gameId) {
      const scripts = site('script[type="text/javascript"]');
      for (let i = 0; i < scripts.length; i++) {
        const text = site(scripts[i]).text().trim();
        if (text.includes('I.ViewGame')) {
          const v = getIntAfterMarkerInJson(text, 'I.ViewGame', 'id');
          if (v !== null) { gameId = v; break; }
        }
      }
    }
    if (!gameId) {
      const dataUrl = url.replace(/\/+$/, '') + '/data.json';
      const r = await this.client.get(dataUrl, false);
      if (r.status === 200) {
        try {
          const data = r.data;
          if (data.errors) {
            throw new ItchDownloadError(`Game data fetching failed for ${url}: ${data.errors}`);
          }
          if (data.id) gameId = parseInt(data.id, 10);
        } catch {}
      }
    }
    if (!gameId) throw new ItchDownloadError(`Could not get the Game ID for URL: ${url}`);
    return gameId;
  }

  extractMetadata(gameId: number, url: string, site: CheerioAPI): GameMetadata {
    const ratingJson = GameDownloader.getRatingJson(site);
    const title = ratingJson ? ratingJson.name : null;
    let description = GameDownloader.getMeta(site, 'property="og:description"');
    if (!description) description = GameDownloader.getMeta(site, 'name="description"');
    const screenshots: string[] = [];
    const screenshotsNode = site('div.screenshot_list');
    screenshotsNode.find('a').each((_, a) => {
      const href = site(a).attr('href');
      if (href) screenshots.push(href);
    });
    const metadata: GameMetadata = {
      game_id: gameId,
      title: title || site('h1.game_title').text().trim(),
      url,
      cover_url: GameDownloader.getMeta(site, 'property="og:image"'),
      screenshots,
      description: description || undefined,
    };
    const infoboxDiv = site('div.game_info_panel_widget');
    if (infoboxDiv.length) {
      const infobox = parseInfobox(infoboxDiv);
      for (const dt of ['created_at','updated_at','released_at','published_at']) {
        if (infobox[dt]) {
          metadata[dt] = (infobox[dt] as Date).toISOString();
          delete (infobox as any)[dt];
        }
      }
      if ('author' in infobox) {
        metadata.author = (infobox.author as any).author;
        metadata.author_url = (infobox.author as any).author_url;
        delete (infobox as any).author;
      }
      if ('authors' in infobox && !metadata.author) {
        metadata.author = 'Multiple authors';
        metadata.author_url = `https://${new URL(url).hostname}`;
      }
      metadata.extra = infobox;
    }
    const aggRating = ratingJson ? ratingJson.aggregateRating : null;
    if (aggRating) {
      try {
        metadata.rating = { average: parseFloat(aggRating.ratingValue), votes: aggRating.ratingCount };
      } catch {
        // ignore
      }
    }
    return metadata;
  }

  getCredentials(title: string, gameId: number): Record<string, any> {
    const creds: Record<string, any> = {};
    if (this.downloadKeys[gameId]) {
      creds['download_key_id'] = this.downloadKeys[gameId];
      console.debug('Got credentials for', title, creds);
    }
    return creds;
  }

  static async getDecompressedContentSize(targetPath: string): Promise<number | null> {
    try {
      const zip = new AdmZip(targetPath);
      const entries = zip.getEntries().filter((e: any) => !e.isDirectory);
      if (entries.length > 0) {
        return entries.reduce((sum: number, ent: any) => sum + ent.header.size, 0);
      }
    } catch {
      // not a zip file
    }

    try {
      let total = 0;
      await tar.t({
        file: targetPath,
        onentry: (entry: any) => { if (entry.type === 'File') total += entry.size; }
      });
      return total === 0 ? null : total;
    } catch {
      // not a tar file
    }

    return null;
  }

  async downloadFile(url: string, downloadPath: string | null, credentials: Record<string, any>): Promise<string> {
    try {
      const res = await this.client.get(url, true, false, { responseType: 'stream', data: credentials });
      if (downloadPath) {
        await new Promise<void>((resolve, reject) => {
          const writer = fs.createWriteStream(downloadPath);
          res.data.pipe(writer);
          writer.on('finish', resolve);
          writer.on('error', reject);
        });
      }
      return res.request.res.responseUrl || url; // final URL
    } catch (e: any) {
      throw new ItchDownloadError(`Unrecoverable download error: ${e}`);
    }
  }

  async downloadFileByUploadId(uploadId: number, downloadPath: string | null, credentials: Record<string, any>): Promise<string> {
    return this.downloadFile(`/uploads/${uploadId}/download`, downloadPath, credentials);
  }

  async download(url: string, skipDownloaded: boolean = true): Promise<DownloadResult> {
    const match = url.match(ITCH_GAME_URL_REGEX);
    if (!match || !match.groups) {
      return { url, success: false, errors: [`Game URL is invalid: ${url} - please file a new issue.`], external_urls: [] };
    }
    const author = match.groups.author;
    const game = match.groups.game;
    const downloadPath = path.join(this.settings.downloadTo ?? '.', author, game);
    fs.mkdirSync(downloadPath, { recursive: true });
    const paths: Record<string, string> = {};
    for (const [k, v] of Object.entries(TARGET_PATHS)) {
      paths[k] = path.join(downloadPath, v);
    }
    if (fs.existsSync(paths['metadata']) && skipDownloaded) {
      console.info('Skipping already-downloaded game for URL:', url);
      return { url, success: true, errors: ['Game already downloaded.'], external_urls: [] };
    }
    let siteHtml = '';
    try {
      const r = await this.client.get(url, false);
      siteHtml = r.data;
    } catch (e: any) {
      return { url, success: false, errors: [`Could not download the game site for ${url}: ${e}`], external_urls: [] };
    }
    const $ = load(siteHtml);
    let gameId: number;
    let metadata: GameMetadata;
    try {
      gameId = await this.getGameId(url, $);
      metadata = this.extractMetadata(gameId, url, $);
    } catch (e: any) {
      return { url, success: false, errors: [String(e)], external_urls: [] };
    }
    const title = metadata.title || game;
    const credentials = this.getCredentials(title, gameId);
    let gameUploads;
    try {
      const uploadsReq = await this.client.get(`/games/${gameId}/uploads`, true, false, { data: credentials, timeout: 15000 });
      gameUploads = uploadsReq.data.uploads;
    } catch (e: any) {
      return { url, success: false, errors: [`Could not fetch game uploads for ${title}: ${e}`], external_urls: [] };
    }
    const externalUrls: string[] = [];
    const errors: string[] = [];
    fs.mkdirSync(paths['files'], { recursive: true });
    for (const upload of gameUploads) {
      if (!('id' in upload && 'filename' in upload && 'type' in upload && 'traits' in upload && 'storage' in upload)) {
        errors.push(`Upload metadata incomplete: ${JSON.stringify(upload)}`);
        continue;
      }
      const uploadId = upload.id;
      const fileName = upload.filename;
      const fileType = upload.type;
      const fileTraits: string[] = upload.traits;
      const expectedSize: number | undefined = upload.size;
      const uploadIsExternal = upload.storage === 'external';
      if (this.settings.filterFilesType && !this.settings.filterFilesType.includes(fileType)) {
        console.info(`File '${fileName}' has ignored type '${fileType}', skipping`);
        continue;
      }
      if (this.settings.filterFilesPlatform && fileType === 'default' && !fileTraits.some(t => this.settings.filterFilesPlatform!.includes(t))) {
        console.info(`File '${fileName}' not for requested platforms, skipping`);
        continue;
      }
      if (shouldSkipItemByGlob('File', fileName, this.settings.filterFilesGlob)) continue;
      if (shouldSkipItemByRegex('File', fileName, this.settings.filterFilesRegex)) continue;
      const targetPath = uploadIsExternal ? null : path.join(paths['files'], fileName);
      try {
        const targetUrl = await this.downloadFileByUploadId(uploadId, targetPath, credentials);
        if (uploadIsExternal) {
          externalUrls.push(targetUrl);
          continue;
        }
        const stat = fs.statSync(targetPath!);
        const downloadedSize = stat.size;
        let contentSize: number | null = null;
        if (expectedSize !== undefined && downloadedSize !== expectedSize) {
          contentSize = await GameDownloader.getDecompressedContentSize(targetPath!);
          if (contentSize !== expectedSize) {
            errors.push(`Downloaded file size is ${downloadedSize} (content ${contentSize}), expected ${expectedSize} for upload ${JSON.stringify(upload)}`);
          }
        }
      } catch (e: any) {
        errors.push(`Download failed for upload ${JSON.stringify(upload)}: ${e}`);
      }
    }
    if (this.settings.mirrorWeb) {
      fs.mkdirSync(paths['screenshots'], { recursive: true });
      for (const screenshot of metadata.screenshots) {
        if (!screenshot) continue;
        const fileName = path.basename(screenshot);
        try {
          await this.downloadFile(screenshot, path.join(paths['screenshots'], fileName), {});
        } catch (e: any) {
          errors.push(`Screenshot download failed: ${e}`);
        }
      }
    }
    if (metadata.cover_url) {
      try {
        const ext = path.extname(metadata.cover_url);
        await this.downloadFile(metadata.cover_url, paths['cover'] + ext, {});
      } catch (e: any) {
        errors.push(`Cover art download failed: ${e}`);
      }
    }
    fs.writeFileSync(paths['site'], load(siteHtml).html() || '');
    fs.writeFileSync(paths['metadata'], JSON.stringify(metadata, null, 4));
    return { url, success: errors.length === 0, errors, external_urls: externalUrls };
  }
}

export async function driveDownloads(jobs: string[], settings: Settings, keys: Record<number, string>): Promise<void> {
  const downloader = new GameDownloader(settings, keys);
  const results: DownloadResult[] = new Array(jobs.length);

  const bar = new SingleBar({}, Presets.shades_classic);
  bar.start(jobs.length, 0);

  let index = 0;
  const workers: Promise<void>[] = [];
  const threads = Math.max(1, settings.parallel);

  const worker = async () => {
    while (true) {
      let current: number;
      if (index >= jobs.length) return;
      current = index++;
      const job = jobs[current];
      const res = await downloader.download(job);
      results[current] = res;
      bar.increment();
    }
  };

  for (let i = 0; i < threads; i++) {
    workers.push(worker());
  }

  await Promise.all(workers);
  bar.stop();

  console.log('Download complete!');
  for (const r of results) {
    if (!r.errors.length && !r.external_urls.length) continue;
    if (r.success) console.log(`\nNotes for ${r.url}:`); else console.log(`\nDownload failed for ${r.url}:`);
    for (const e of r.errors) console.log(`- ${e}`);
    for (const u of r.external_urls) console.log(`- External download URL (download manually!): ${u}`);
  }
}
