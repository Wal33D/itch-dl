import { minimatch } from 'minimatch';

export class ItchDownloadError extends Error {}

export function getIntAfterMarkerInJson(text: string, marker: string, key: string): number | null {
  let markerLine: string | null = null;
  const lines = text.split(/\r?\n/).reverse();
  for (const line of lines) {
    const idx = line.indexOf(marker);
    if (idx !== -1) {
      markerLine = line.slice(idx);
      break;
    }
  }
  if (!markerLine) return null;
  const regex = new RegExp(`\\"${key}\\":\\s?(\\d+)`);
  const match = markerLine.match(regex);
  if (!match) return null;
  return parseInt(match[1], 10);
}

export function shouldSkipItemByGlob(kind: 'File' | 'URL', item: string, glob?: string): boolean {
  if (glob && !minimatch(item, glob)) {
    console.info(`${kind} '${item}' does not match the glob filter '${glob}', skipping`);
    return true;
  }
  return false;
}

export function shouldSkipItemByRegex(kind: 'File' | 'URL', item: string, regex?: string): boolean {
  if (regex && !(new RegExp(`^${regex}$`).test(item))) {
    console.info(`${kind} '${item}' does not match the regex filter '${regex}', skipping`);
    return true;
  }
  return false;
}
