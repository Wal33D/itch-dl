import fs from 'node:fs';
import { load } from 'cheerio';
import { ItchApiClient } from './api';
import {
  ItchDownloadError,
  getIntAfterMarkerInJson,
  shouldSkipItemByGlob,
  shouldSkipItemByRegex,
} from './utils';
import { ITCH_API, ITCH_BASE, ITCH_URL, ITCH_BROWSER_TYPES } from './consts';
import { Settings } from './config';
import { getOwnedGames } from './keys';

export function getJobsForGameJamJson(gameJamJson: any): string[] {
  if (!('jam_games' in gameJamJson)) {
    throw new Error('Provided JSON is not a valid itch.io jam JSON.');
  }
  return gameJamJson.jam_games.map((g: any) => g.game.url);
}

export async function getGameJamJson(jamUrl: string, client: ItchApiClient): Promise<any> {
  const r = await client.get(jamUrl, false);
  if (r.status !== 200) {
    throw new ItchDownloadError(
      `Could not download the game jam site: ${r.status} ${r.statusText}`
    );
  }
  const jamId = getIntAfterMarkerInJson(r.data, 'I.ViewJam', 'id');
  if (jamId === null) {
    throw new ItchDownloadError(
      'Provided site did not contain the Game Jam ID. Provide the path to the game jam entries JSON file instead.'
    );
  }
  const r2 = await client.get(`${ITCH_URL}/jam/${jamId}/entries.json`);
  if (r2.status !== 200) {
    throw new ItchDownloadError(
      `Could not download the game jam entries list: ${r2.status} ${r2.statusText}`
    );
  }
  return r2.data;
}

export async function getJobsForBrowseUrl(url: string, client: ItchApiClient): Promise<string[]> {
  let page = 1;
  const found = new Set<string>();
  while (true) {
    const r = await client.get(`${url}.xml?page=${page}`, false);
    if (r.status !== 200) {
      break;
    }
    const $ = load(r.data, { xmlMode: true });
    const items = $('item');
    if (items.length < 1) {
      break;
    }
    items.each((_, item) => {
      const link = $(item).find('link').text().trim();
      if (link) {
        found.add(link);
      }
    });
    page += 1;
  }
  if (found.size === 0) {
    throw new ItchDownloadError('No game URLs found to download.');
  }
  return Array.from(found);
}

export async function getJobsForCollectionJson(
  url: string,
  client: ItchApiClient
): Promise<string[]> {
  let page = 1;
  const found = new Set<string>();
  while (true) {
    const r = await client.get(url, true, { params: { page }, timeout: 15000 });
    if (r.status !== 200) {
      break;
    }
    const data = r.data;
    if (data.collection_games.length < 1) {
      break;
    }
    for (const item of data.collection_games) {
      found.add(item.game.url);
    }
    if (data.collection_games.length === data.per_page) {
      page += 1;
    } else {
      break;
    }
  }
  if (found.size === 0) {
    throw new ItchDownloadError('No game URLs found to download.');
  }
  return Array.from(found);
}

export async function getJobsForCreator(creator: string, client: ItchApiClient): Promise<string[]> {
  const r = await client.get(`https://${ITCH_BASE}/profile/${creator}`, false);
  if (r.status !== 200) {
    throw new ItchDownloadError(
      `Could not fetch the creator page: HTTP ${r.status} ${r.statusText}`
    );
  }
  const prefix = `https://${creator}.${ITCH_BASE}/`;
  const $ = load(r.data);
  const gameLinks = new Set<string>();
  $('a.game_link').each((_, a) => {
    const href = $(a).attr('href');
    if (href && href.startsWith(prefix)) {
      gameLinks.add(href);
    }
  });
  return Array.from(gameLinks).sort();
}

export async function getJobsForItchUrl(url: string, client: ItchApiClient): Promise<string[]> {
  if (url.startsWith('http://')) {
    url = 'https://' + url.slice(7);
  }
  if (url.startsWith(`https://www.${ITCH_BASE}/`)) {
    url = ITCH_URL + '/' + url.slice(20);
  }
  const urlObj = new URL(url);
  const parts = urlObj.pathname.split('/').filter(x => x.length > 0);

  if (urlObj.hostname === ITCH_BASE) {
    if (parts.length === 0) {
      throw new Error('itch-dl cannot download the entirety of itch.io.');
    }
    const site = parts[0];
    if (site === 'jam') {
      if (parts.length < 2) {
        throw new Error(`Incomplete game jam URL: ${url}`);
      }
      const clean = `${ITCH_URL}/jam/${parts[1]}`;
      const jamJson = await getGameJamJson(clean, client);
      return getJobsForGameJamJson(jamJson);
    } else if (ITCH_BROWSER_TYPES.includes(site)) {
      const clean = [ITCH_URL, ...parts].join('/');
      return await getJobsForBrowseUrl(clean, client);
    } else if (site === 'b' || site === 'bundle') {
      throw new Error('itch-dl cannot download bundles yet.');
    } else if (['j', 'jobs'].includes(site)) {
      throw new Error('itch-dl cannot download a job.');
    } else if (['t', 'board', 'community'].includes(site)) {
      throw new Error('itch-dl cannot download forums.');
    } else if (site === 'profile') {
      if (parts.length >= 2) {
        return await getJobsForCreator(parts[1], client);
      }
      throw new Error('itch-dl expects a username in profile links.');
    } else if (site === 'my-purchases') {
      return await getOwnedGames(client);
    } else if (site === 'c') {
      const collectionId = parts[1];
      const clean = `${ITCH_API}/collections/${collectionId}/collection-games`;
      return await getJobsForCollectionJson(clean, client);
    }
    throw new Error(`itch-dl does not understand "${site}" URLs.`);
  } else if (urlObj.hostname.endsWith(`.${ITCH_BASE}`)) {
    if (parts.length === 0) {
      return await getJobsForCreator(urlObj.hostname.split('.')[0], client);
    }
    return [`https://${urlObj.hostname}/${parts[0]}`];
  } else {
    throw new Error(`Unknown domain: ${urlObj.hostname}`);
  }
}

export function getJobsForPath(p: string): string[] {
  try {
    const jsonData = JSON.parse(fs.readFileSync(p, 'utf8'));
    if (jsonData && jsonData.jam_games) {
      return getJobsForGameJamJson(jsonData);
    }
  } catch {
    // ignore
  }
  const lines = fs.readFileSync(p, 'utf8').split(/\r?\n/);
  const urlList = lines.filter(l => l.startsWith('https://') || l.startsWith('http://'));
  if (urlList.length > 0) {
    return urlList;
  }
  throw new Error('File format is unknown - cannot read URLs to download.');
}

export async function getJobsForUrlOrPath(
  pathOrUrl: string,
  settings: Settings
): Promise<string[]> {
  pathOrUrl = pathOrUrl.trim();
  if (pathOrUrl.startsWith('http://')) {
    pathOrUrl = 'https://' + pathOrUrl.slice(7);
  }
  if (pathOrUrl.startsWith('https://')) {
    const client = new ItchApiClient(settings.apiKey, settings.userAgent);
    return await getJobsForItchUrl(pathOrUrl, client);
  } else if (fs.existsSync(pathOrUrl) && fs.statSync(pathOrUrl).isFile()) {
    return getJobsForPath(pathOrUrl);
  }
  throw new Error(`Cannot handle path or URL: ${pathOrUrl}`);
}

export function preprocessJobUrls(jobs: string[], settings: Settings): string[] {
  const cleaned = new Set<string>();
  for (const baseJob of jobs) {
    const job = baseJob.trim();
    if (shouldSkipItemByGlob('URL', job, settings.filterUrlsGlob)) {
      continue;
    }
    if (shouldSkipItemByRegex('URL', job, settings.filterUrlsRegex)) {
      continue;
    }
    cleaned.add(job);
  }
  return Array.from(cleaned);
}
