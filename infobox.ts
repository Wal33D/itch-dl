import { load } from 'cheerio';
import type { Cheerio } from 'cheerio';

export interface InfoboxMetadata {
  updated_at?: Date;
  released_at?: Date;
  published_at?: Date;
  status?: string;
  platforms?: string[];
  publisher?: string;
  author?: { author: string; author_url: string };
  authors?: Record<string, string>;
  genre?: Record<string, string>;
  tools?: Record<string, string>;
  license?: Record<string, string>;
  code_license?: Record<string, string>;
  asset_license?: Record<string, string>;
  tags?: Record<string, string>;
  length?: string;
  languages?: Record<string, string>;
  multiplayer?: Record<string, string>;
  player_count?: string;
  accessibility?: Record<string, string>;
  inputs?: Record<string, string>;
  links?: Record<string, string>;
  mentions?: Record<string, string>;
  category?: Record<string, string>;
  [key: string]: unknown;
}

function parseDateBlock(td: Cheerio<any>): Date | null {
  const abbr = td.find('abbr');
  if (!abbr || !abbr.attr('title')) return null;
  const [dateStr, timeStr] = abbr.attr('title')!.split('@');
  const date = new Date(dateStr.trim() + ' UTC');
  const time = timeStr.trim();
  const t = /(?<hh>\d{2}):(?<mm>\d{2})/u.exec(time);
  if (t) {
    date.setUTCHours(parseInt(t.groups!.hh), parseInt(t.groups!.mm));
  }
  return date;
}

function parseLinks(td: Cheerio<any>): Record<string, string> {
  const result: Record<string, string> = {};
  td.find('a').each((_, a) => {
    const $a = load(a);
    const anchor = $a('a');
    result[anchor.text().trim()] = anchor.attr('href') || '';
  });
  return result;
}

function parseTextFromLinks(td: Cheerio<any>): string[] {
  return Object.keys(parseLinks(td));
}

function parseTr(name: string, content: Cheerio<any>): [string, any] | null {
  switch (name) {
    case 'Updated':
      return ['updated_at', parseDateBlock(content)];
    case 'Release date':
      return ['released_at', parseDateBlock(content)];
    case 'Published':
      return ['published_at', parseDateBlock(content)];
    case 'Status':
      return ['status', parseTextFromLinks(content)[0]];
    case 'Platforms':
      return ['platforms', parseTextFromLinks(content)];
    case 'Publisher':
      return ['publisher', content.text().trim()];
    case 'Rating':
      return null;
    case 'Author': {
      const [author, url] = Object.entries(parseLinks(content))[0] || ['', ''];
      return ['author', { author, author_url: url }];
    }
    case 'Authors':
      return ['authors', parseLinks(content)];
    case 'Genre':
      return ['genre', parseLinks(content)];
    case 'Made with':
      return ['tools', parseLinks(content)];
    case 'License':
      return ['license', parseLinks(content)];
    case 'Code license':
      return ['code_license', parseLinks(content)];
    case 'Asset license':
      return ['asset_license', parseLinks(content)];
    case 'Tags':
      return ['tags', parseLinks(content)];
    case 'Average session':
      return ['length', parseTextFromLinks(content)[0]];
    case 'Languages':
      return ['languages', parseLinks(content)];
    case 'Multiplayer':
      return ['multiplayer', parseLinks(content)];
    case 'Player count':
      return ['player_count', content.text().trim()];
    case 'Accessibility':
      return ['accessibility', parseLinks(content)];
    case 'Inputs':
      return ['inputs', parseLinks(content)];
    case 'Links':
      return ['links', parseLinks(content)];
    case 'Mentions':
      return ['mentions', parseLinks(content)];
    case 'Category':
      return ['category', parseLinks(content)];
    default:
      throw new Error(`Unknown infobox block name '${name}'`);
  }
}

export function parseInfobox(infoboxHtml: Cheerio<any>): InfoboxMetadata {
  const meta: InfoboxMetadata = {};
  const $ibox = load(infoboxHtml.html() || '');
  $ibox('tr').each((_, tr) => {
    const $tr = $ibox(tr);
    const tds = $tr.find('td');
    if (tds.length < 2) return;
    const name = $ibox(tds[0]).text().trim();
    const parsed = parseTr(name, $ibox(tds[1]));
    if (parsed) {
      const [key, value] = parsed;
      (meta as any)[key] = value;
    }
  });
  return meta;
}
