export interface Settings {
  apiKey?: string;
  userAgent?: string;
  downloadTo?: string;
  mirrorWeb: boolean;
  urlsOnly: boolean;
  parallel: number;
  filterFilesPlatform?: string[];
  filterFilesType?: string[];
  filterFilesGlob?: string;
  filterFilesRegex?: string;
  filterUrlsGlob?: string;
  filterUrlsRegex?: string;
  verbose: boolean;
}

import path from 'node:path';
import fs from 'node:fs';
import os from 'node:os';
import axiosPkg from 'axios/package.json';
import pkg from './package.json';

export function processPlatformTraits(platforms?: string[]): string[] | undefined {
  if (!platforms || platforms.length === 0) {
    return undefined;
  }

  const traitMapping: Record<string, string> = {
    win: 'p_windows',
    lin: 'p_linux',
    mac: 'p_osx',
    osx: 'p_osx',
    darwin: 'p_osx',
    and: 'p_android',
  };

  const traits = new Set<string>();

  for (let p of platforms) {
    let platformTrait: string | undefined;
    p = p.trim().toLowerCase().replace(/^p_/, '');

    if (p.startsWith('native')) {
      const sys = process.platform;
      p = sys.toLowerCase();
      if (p.endsWith('bsd')) {
        console.warn(
          'Note: Native downloads for *BSDs are not available - Linux binaries will be used.'
        );
        p = 'linux';
      }
    }

    for (const [key, trait] of Object.entries(traitMapping)) {
      if (p.startsWith(key)) {
        platformTrait = trait;
        break;
      }
    }

    if (!platformTrait) {
      throw new Error(`Platform ${p} not known!`);
    }

    traits.add(platformTrait);
  }

  return Array.from(traits);
}

// Default settings used when generating a Settings object

export const DEFAULT_SETTINGS: Settings = {
  apiKey: undefined,
  userAgent: `axios/${axiosPkg.version} itch-dl/${pkg.version}`,
  downloadTo: undefined,
  mirrorWeb: false,
  urlsOnly: false,
  parallel: 1,
  filterFilesPlatform: undefined,
  filterFilesType: undefined,
  filterFilesGlob: undefined,
  filterFilesRegex: undefined,
  filterUrlsGlob: undefined,
  filterUrlsRegex: undefined,
  verbose: false,
};

/**
 * Returns the path to the itch-dl configuration directory for the
 * current operating system. The directory may not exist.
 */
export function createAndGetConfigPath(): string {
  const sys = process.platform;
  let basePath: string;
  if (sys === 'linux') {
    basePath = process.env.XDG_CONFIG_HOME || path.join(os.homedir(), '.config');
  } else if (sys === 'darwin') {
    basePath = path.join(os.homedir(), 'Library', 'Application Support');
  } else if (sys === 'win32') {
    basePath = process.env.APPDATA || path.join(os.homedir(), 'AppData', 'Roaming');
  } else {
    throw new Error(`Unknown platform: ${sys}`);
  }
  return path.join(basePath, 'itch-dl');
}

const TYPE_CHECKS: Record<keyof Settings, (v: any) => boolean> = {
  apiKey: (v) => typeof v === 'string',
  userAgent: (v) => typeof v === 'string',
  downloadTo: (v) => typeof v === 'string',
  mirrorWeb: (v) => typeof v === 'boolean',
  urlsOnly: (v) => typeof v === 'boolean',
  parallel: (v) => typeof v === 'number',
  filterFilesPlatform: (v) => Array.isArray(v),
  filterFilesType: (v) => Array.isArray(v),
  filterFilesGlob: (v) => typeof v === 'string',
  filterFilesRegex: (v) => typeof v === 'string',
  filterUrlsGlob: (v) => typeof v === 'string',
  filterUrlsRegex: (v) => typeof v === 'string',
  verbose: (v) => typeof v === 'boolean',
};

const EXPECTED_TYPES: Record<keyof Settings, string> = {
  apiKey: 'string',
  userAgent: 'string',
  downloadTo: 'string',
  mirrorWeb: 'boolean',
  urlsOnly: 'boolean',
  parallel: 'number',
  filterFilesPlatform: 'array',
  filterFilesType: 'array',
  filterFilesGlob: 'string',
  filterFilesRegex: 'string',
  filterUrlsGlob: 'string',
  filterUrlsRegex: 'string',
  verbose: 'boolean',
};

/**
 * Validates config data loaded from JSON, discarding unknown keys and
 * ensuring value types are correct. Exits the process on fatal errors.
 */
export function cleanConfig(configData: Record<string, any>): Partial<Settings> {
  const cleaned: Partial<Settings> = {};
  let invalid = false;

  for (const [key, value] of Object.entries(configData)) {
    if (!(key in TYPE_CHECKS)) {
      console.warn(`Settings contain an unknown item, ignoring: '${key}'`);
      continue;
    }

    if (value !== null && value !== undefined && !TYPE_CHECKS[key as keyof Settings](value)) {
      console.error(
        `Settings.${key} has invalid type '${typeof value}', expected '${EXPECTED_TYPES[key as keyof Settings]}'`
      );
      invalid = true;
      continue;
    }

    cleaned[key as keyof Settings] = value as any;
  }

  if (invalid) {
    console.error('Settings invalid, bailing out!');
    process.exit(1);
  }

  return cleaned;
}

/**
 * Loads configuration from disk and applies command-line overrides.
 * CLI values replace file values when they evaluate to true.
 */
export function loadConfig(cli: Partial<Settings> = {}, profile?: string | null): Settings {
  const configPath = createAndGetConfigPath();
  const configFilePath = path.join(configPath, 'config.json');
  const profileFilePath = profile ? path.join(configPath, 'profiles', profile) : '';

  let configData: Record<string, any> = {};
  if (fs.existsSync(configFilePath)) {
    console.debug(`Found config file: ${configFilePath}`);
    try {
      configData = JSON.parse(fs.readFileSync(configFilePath, 'utf-8'));
    } catch {
      configData = {};
    }
  }

  if (profile && fs.existsSync(profileFilePath)) {
    console.debug(`Found profile: ${profileFilePath}`);
    try {
      const profileData = JSON.parse(fs.readFileSync(profileFilePath, 'utf-8'));
      Object.assign(configData, profileData);
    } catch {}
  }

  const settings: Settings = { ...DEFAULT_SETTINGS, ...cleanConfig(configData) };

  for (const key of Object.keys(DEFAULT_SETTINGS) as (keyof Settings)[]) {
    const value = cli[key];
    if (value) {
      (settings as any)[key] = value;
    }
  }

  const envKey = process.env.ITCH_API_KEY;
  if (!settings.apiKey && envKey) {
    settings.apiKey = envKey;
  }

  settings.filterFilesPlatform = processPlatformTraits(settings.filterFilesPlatform);

  return settings;
}
