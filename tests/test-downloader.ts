import test from 'node:test';
import assert from 'node:assert';
import { load } from 'cheerio';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import AdmZip from 'adm-zip';
import * as tar from 'tar';
import { GameDownloader } from '../downloader';
import { DEFAULT_SETTINGS } from '../config';
import { driveDownloads } from '../downloader';
import { SingleBar } from 'cli-progress';

test('GameDownloader.getRatingJson and getMeta', () => {
  const html =
    `<script type="application/ld+json">{"@type":"Product","name":"G"}</script>` +
    `<meta property="og:image" content="img.png">`;
  const $ = load(html);
  const json = GameDownloader.getRatingJson($);
  assert.deepStrictEqual(json, { '@type': 'Product', name: 'G' });
  assert.strictEqual(GameDownloader.getMeta($, 'property="og:image"'), 'img.png');
});

test('GameDownloader.getGameId from meta and script', async () => {
  const settings = { ...DEFAULT_SETTINGS };
  const gd = new GameDownloader(settings, {});
  const site1 = load('<meta name="itch:path" content="games/5"/>');
  assert.strictEqual(await gd.getGameId('https://a.itch.io/game', site1), 5);
  const site2 = load('<script type="text/javascript">I.ViewGame({"id":7})</script>');
  assert.strictEqual(await gd.getGameId('https://a.itch.io/game', site2), 7);
});

test('GameDownloader.extractMetadata basic', () => {
  const html = `\n  <html><head>
    <script type="application/ld+json">{"@type":"Product","name":"My Game","aggregateRating":{"ratingValue":"4.5","ratingCount":10}}</script>
    <meta property="og:image" content="cover.png">
    <meta property="og:description" content="desc">
  </head><body>
    <h1 class="game_title">My Game</h1>
    <div class="screenshot_list"><a href="sc1.png"></a></div>
    <div class="game_info_panel_widget"><table>
      <tr><td>Author</td><td><a href="https://dev">Dev</a></td></tr>
      <tr><td>Published</td><td><abbr title="01 January 2024 @ 15:00 UTC"></abbr></td></tr>
    </table></div>
  </body></html>`;
  const $ = load(html);
  const gd = new GameDownloader({ ...DEFAULT_SETTINGS }, {});
  const meta = gd.extractMetadata(1, 'https://a.itch.io/game', $);
  assert.strictEqual(meta.title, 'My Game');
  assert.strictEqual(meta.cover_url, 'cover.png');
  assert.deepStrictEqual(meta.screenshots, ['sc1.png']);
  assert.strictEqual(meta.author, 'Dev');
  assert.strictEqual(meta.author_url, 'https://dev');
  assert.strictEqual(meta.published_at, new Date('01 January 2024 15:00 UTC').toISOString());
  assert.ok(meta.extra && Object.keys(meta.extra).length === 0);
});

test('driveDownloads runs downloads concurrently and reports progress', async () => {
  const origDownload = GameDownloader.prototype.download;
  let active = 0;
  let maxActive = 0;
  let calls = 0;
  GameDownloader.prototype.download = async function (url: string) {
    active++;
    calls++;
    if (active > maxActive) {
      maxActive = active;
    }
    await new Promise(res => setTimeout(res, 50));
    active--;
    return { url, success: true, errors: [], external_urls: [] };
  };

  const proto = SingleBar.prototype as any;
  const origStart = proto.start;
  const origIncrement = proto.increment;
  const origStop = proto.stop;
  const events: any[] = [];
  proto.start = function (total: number, start: number) {
    events.push(['start', total, start]);
  };
  proto.increment = function () {
    events.push(['inc']);
  };
  proto.stop = function () {
    events.push(['stop']);
  };

  const settings = { ...DEFAULT_SETTINGS, parallel: 2 };
  await driveDownloads(['u1', 'u2', 'u3'], settings, {});

  GameDownloader.prototype.download = origDownload;
  proto.start = origStart;
  proto.increment = origIncrement;
  proto.stop = origStop;

  assert.strictEqual(calls, 3);
  assert.ok(maxActive > 1);
  assert.deepStrictEqual(events, [['start', 3, 0], ['inc'], ['inc'], ['inc'], ['stop']]);
});

test('driveDownloads updates progress and concurrency', async () => {
  const cliProgress = require('cli-progress');
  const OriginalBar = cliProgress.SingleBar;
  const events: { start?: any[]; increments: number; stopped: boolean } = {
    increments: 0,
    stopped: false,
  };
  class FakeBar {
    start(...args: any[]) {
      events.start = args;
    }
    increment() {
      events.increments++;
    }
    stop() {
      events.stopped = true;
    }
  }
  cliProgress.SingleBar = class {
    constructor() {
      return new FakeBar();
    }
  } as any;

  const origDownload = GameDownloader.prototype.download;
  const starts: number[] = [];
  GameDownloader.prototype.download = async function (url: string) {
    starts.push(Date.now());
    await new Promise(res => setTimeout(res, 50));
    return { url, success: true, errors: [], external_urls: [] };
  };

  const settings = { ...DEFAULT_SETTINGS, parallel: 2 };
  const t0 = Date.now();
  await driveDownloads(['a', 'b', 'c'], settings, {});
  const duration = Date.now() - t0;

  GameDownloader.prototype.download = origDownload;
  cliProgress.SingleBar = OriginalBar;

  assert.strictEqual(starts.length, 3);
  assert.ok(starts[1] - starts[0] < 40);
  // Be more lenient with timing on Windows due to different performance characteristics
  const maxDuration = process.platform === 'win32' ? 200 : 120;
  assert.ok(duration < maxDuration);
  assert.deepStrictEqual(events.start, [3, 0]);
  assert.strictEqual(events.increments, 3);
  assert.ok(events.stopped);
});

test('GameDownloader.getDecompressedContentSize for zip and tar', async () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'itch-dl-test-'));
  const zipPath = path.join(tmp, 't.zip');
  const tarPath = path.join(tmp, 't.tar');
  const f1 = path.join(tmp, 'a.txt');
  const f2 = path.join(tmp, 'b.txt');
  fs.writeFileSync(f1, 'abc');
  fs.writeFileSync(f2, 'de');
  const expected = 5;
  const zip = new AdmZip();
  zip.addLocalFile(f1);
  zip.addLocalFile(f2);
  zip.writeZip(zipPath);
  await tar.c({ cwd: tmp, file: tarPath }, ['a.txt', 'b.txt']);

  const zsize = await GameDownloader.getDecompressedContentSize(zipPath);
  const tsize = await GameDownloader.getDecompressedContentSize(tarPath);
  assert.strictEqual(zsize, expected);
  assert.strictEqual(tsize, expected);

  fs.rmSync(tmp, { recursive: true, force: true });
});
