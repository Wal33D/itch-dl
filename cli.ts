import { Command } from 'commander';
import path from 'node:path';
import fs from 'node:fs';

import pkg from './package.json';
import { Settings, loadConfig } from './config';
import { ItchApiClient } from './api';
import { getJobsForUrlOrPath, preprocessJobUrls } from './handlers';
import { getDownloadKeys } from './keys';
import { driveDownloads } from './downloader';

const originalDebug = console.debug;
function setLogging(verbose: boolean): void {
  if (verbose) {
    console.debug = originalDebug;
  } else {
    console.debug = () => { /* noop */ };
  }
}

function buildProgram(): Command {
  const program = new Command();
  program
    .name('itch-dl')
    .description('Bulk download stuff from Itch.io. Docs: https://github.com/Wal33D/itch-dl/wiki')
    .version(pkg.version)
    .argument('<url_or_path>', 'itch.io URL or path to a game jam entries.json file')
    .option('--profile <profile>', 'configuration profile to load')
    .option('--api-key <key>', 'itch.io API key - https://itch.io/user/settings/api-keys')
    .option('--user-agent <agent>', 'user agent to use when sending HTTP requests')
    .option('--download-to <path>', 'directory to save results into (default: current working dir)')
    .option('--mirror-web', 'try to fetch assets on game sites')
    .option('--urls-only', 'print scraped game URLs without downloading them')
    .option('--parallel <parallel>', 'how many threads to use for downloading games (default: 1)', (v) => parseInt(v, 10))
    .option('--filter-files-platform <platforms...>', 'filter downloaded files by platform (windows, mac, linux, android, native), affects only executables')
    .option('--filter-files-type <types...>', 'filter downloaded files by type (see wiki for valid values)')
    .option('--filter-files-glob <glob>', 'filter downloaded files with a shell-style glob/fnmatch (unmatched files are skipped)')
    .option('--filter-files-regex <regex>', 'filter downloaded files with a Python regex (unmatched files are skipped)')
    .option('--filter-urls-glob <glob>', 'filter itch URLs with a shell-style glob/fnmatch (unmatched URLs are skipped)')
    .option('--filter-urls-regex <regex>', 'filter itch URLs with a Python regex (unmatched URLs are skipped)')
    .option('--verbose', 'print verbose logs');
  return program;
}

export function parseArgs(argv: string[] = process.argv): { urlOrPath: string; settings: Partial<Settings>; profile?: string } {
  const program = buildProgram();
  program.parse(argv);
  const opts = program.opts();
  const settings: Partial<Settings> = {
    apiKey: opts.apiKey,
    userAgent: opts.userAgent,
    downloadTo: opts.downloadTo,
    mirrorWeb: Boolean(opts.mirrorWeb),
    urlsOnly: Boolean(opts.urlsOnly),
    parallel: typeof opts.parallel === 'number' && !isNaN(opts.parallel) ? opts.parallel : 1,
    filterFilesPlatform: opts.filterFilesPlatform,
    filterFilesType: opts.filterFilesType,
    filterFilesGlob: opts.filterFilesGlob,
    filterFilesRegex: opts.filterFilesRegex,
    filterUrlsGlob: opts.filterUrlsGlob,
    filterUrlsRegex: opts.filterUrlsRegex,
    verbose: Boolean(opts.verbose),
  };
  const urlOrPath = program.args[0];
  const profile: string | undefined = opts.profile;
  return { urlOrPath, settings, profile };
}

export async function run(argv: string[] = process.argv): Promise<void> {
  const { urlOrPath, settings: cliSettings, profile } = parseArgs(argv);

  // Initial verbosity toggle from CLI flag
  setLogging(Boolean(cliSettings.verbose));

  const settings = loadConfig(cliSettings, profile);

  // Final verbosity after config merge
  setLogging(settings.verbose);

  if (!settings.apiKey) {
    console.error(
      'You did not provide an API key which itch-dl requires.\n' +
      'See https://github.com/Wal33D/itch-dl/wiki/API-Keys for more info.'
    );
    return;
  }

  const client = new ItchApiClient(settings.apiKey, settings.userAgent);
  const profileReq = await client.get('/profile');
  if (profileReq.status !== 200) {
    console.error(
      `Provided API key appears to be invalid: ${profileReq.data}\n` +
      'See https://github.com/Wal33D/itch-dl/wiki/API-Keys for more info.'
    );
    return;
  }

  let jobs = await getJobsForUrlOrPath(urlOrPath, settings);
  console.info('Found %d URL(s) total.', jobs.length);

  jobs = preprocessJobUrls(jobs, settings);
  console.info('Will process %d URL(s) after filtering and deduplication.', jobs.length);

  if (jobs.length === 0) {
    console.error('No URLs to download.');
    return;
  }

  if (settings.urlsOnly) {
    for (const job of jobs) console.log(job);
    return;
  }

  settings.downloadTo = path.normalize(settings.downloadTo ?? process.cwd());
  fs.mkdirSync(settings.downloadTo, { recursive: true });

  const keys = await getDownloadKeys(client);
  await driveDownloads(jobs, settings, keys);
}
