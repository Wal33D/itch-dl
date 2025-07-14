export const ITCH_BASE = 'itch.io';
export const ITCH_URL = `https://${ITCH_BASE}`;
export const ITCH_API = `https://api.${ITCH_BASE}`;

// Extracts https://user.itch.io/name to {author: 'user', game: 'name'}
export const ITCH_GAME_URL_REGEX = /^https:\/\/(?<author>[\w\d-_]+)\.itch\.io\/(?<game>[\w\d-_]+)$/;

export const ITCH_BROWSER_TYPES = [
  'games',
  'tools',
  'game-assets',
  'comics',
  'books',
  'physical-games',
  'soundtracks',
  'game-mods',
  'misc',
];
