import test from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { getJobsForGameJamJson, getJobsForPath, preprocessJobUrls, getJobsForItchUrl, getJobsForUrlOrPath } from '../handlers';
import { Settings, DEFAULT_SETTINGS } from '../config';

class DummyClient {
  async get() { throw new Error('not used'); }
}

const dummyClient = new DummyClient() as any;


test('getJobsForGameJamJson extracts urls', () => {
  const data = { jam_games: [ { game: { url: 'u1' } }, { game: { url: 'u2' } } ] };
  assert.deepStrictEqual(getJobsForGameJamJson(data), ['u1','u2']);
});

test('getJobsForPath handles jam json and url list', () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'itch-dl-test-'));
  const jsonPath = path.join(tmp, 'jam.json');
  fs.writeFileSync(jsonPath, JSON.stringify({ jam_games: [ { game: { url: 'u1' } } ] }));
  assert.deepStrictEqual(getJobsForPath(jsonPath), ['u1']);
  const listPath = path.join(tmp, 'list.txt');
  fs.writeFileSync(listPath, 'https://a\nhttp://b');
  assert.deepStrictEqual(getJobsForPath(listPath), ['https://a','http://b']);
  fs.rmSync(tmp, { recursive: true, force: true });
});

test('preprocessJobUrls filters by glob and regex', () => {
  const settings: Settings = { ...DEFAULT_SETTINGS, filterUrlsGlob: '**/*good*', filterUrlsRegex: 'https://.*' };
  const res = preprocessJobUrls([' https://good.com ', 'bad', 'http://good.net'], settings);
  assert.deepStrictEqual(new Set(res), new Set(['https://good.com']));
});

test('getJobsForItchUrl basic game url', async () => {
  const urls = await getJobsForItchUrl('https://author.itch.io/game', dummyClient);
  assert.deepStrictEqual(urls, ['https://author.itch.io/game']);
});

test('getJobsForUrlOrPath with path', async () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'itch-dl-test-'));
  const p = path.join(tmp, 'urls.txt');
  fs.writeFileSync(p, 'https://a');
  const urls = await getJobsForUrlOrPath(p, DEFAULT_SETTINGS);
  assert.deepStrictEqual(urls, ['https://a']);
  fs.rmSync(tmp, { recursive: true, force: true });
});
