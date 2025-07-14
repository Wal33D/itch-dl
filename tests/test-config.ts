import test from 'node:test';
import assert from 'node:assert';
import { processPlatformTraits, createAndGetConfigPath, loadConfig } from '../config';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

function setEqual(arr: string[] | undefined, expected: string[] | undefined) {
  if (arr === undefined || expected === undefined) {
    assert.strictEqual(arr, expected);
  } else {
    assert.deepStrictEqual(new Set(arr), new Set(expected));
  }
}

test('processPlatformTraits basic', () => {
  setEqual(processPlatformTraits(['win']), ['p_windows']);
  setEqual(processPlatformTraits(['win', 'mac']), ['p_windows', 'p_osx']);
  setEqual(processPlatformTraits([]), undefined);
});

test('processPlatformTraits native', () => {
  const sys = process.platform;
  let expected: string[];
  if (sys.endsWith('bsd')) {
    expected = ['p_linux'];
  } else if (sys === 'darwin') {
    expected = ['p_osx'];
  } else {
    expected = [`p_${sys}`];
  }
  setEqual(processPlatformTraits(['native']), expected);
});

test('createAndGetConfigPath uses XDG_CONFIG_HOME on Linux', () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'itch-dl-test-'));
  const old = process.env.XDG_CONFIG_HOME;
  process.env.XDG_CONFIG_HOME = tmp;
  const cfgPath = createAndGetConfigPath();
  assert.strictEqual(cfgPath, path.join(tmp, 'itch-dl'));
  process.env.XDG_CONFIG_HOME = old;
  fs.rmSync(tmp, { recursive: true, force: true });
});

test('loadConfig merges config and overrides with CLI', () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'itch-dl-test-'));
  const old = process.env.XDG_CONFIG_HOME;
  process.env.XDG_CONFIG_HOME = tmp;
  const cfgDir = createAndGetConfigPath();
  fs.mkdirSync(cfgDir, { recursive: true });
  fs.writeFileSync(path.join(cfgDir, 'config.json'), JSON.stringify({ parallel: 2 }));
  const settings = loadConfig({ parallel: 3 });
  assert.strictEqual(settings.parallel, 3);
  process.env.XDG_CONFIG_HOME = old;
  fs.rmSync(tmp, { recursive: true, force: true });
});

test('loadConfig uses ITCH_API_KEY when unset elsewhere', () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'itch-dl-test-'));
  const oldCfg = process.env.XDG_CONFIG_HOME;
  process.env.XDG_CONFIG_HOME = tmp;
  const cfgDir = createAndGetConfigPath();
  fs.mkdirSync(cfgDir, { recursive: true });

  process.env.ITCH_API_KEY = 'envkey';
  const settings = loadConfig();
  assert.strictEqual(settings.apiKey, 'envkey');

  delete process.env.ITCH_API_KEY;
  process.env.XDG_CONFIG_HOME = oldCfg;
  fs.rmSync(tmp, { recursive: true, force: true });
});
