import { ItchApiClient } from './api';

let KEYS_CACHED = false;
const DOWNLOAD_KEYS: Record<number, string> = {};
const GAME_URLS: string[] = [];

export async function loadKeysAndUrls(client: ItchApiClient): Promise<void> {
  KEYS_CACHED = false;
  let page = 1;
  while (true) {
    const res = await client.get('/profile/owned-keys', true, {
      params: { page },
      timeout: 15000,
    });
    if (res.status !== 200) {
      break;
    }
    const data = res.data;
    if (!data.owned_keys) {
      break;
    }
    // Handle case where owned_keys is an object instead of array (when empty)
    const ownedKeys = Array.isArray(data.owned_keys) ? data.owned_keys : [];
    for (const k of ownedKeys) {
      DOWNLOAD_KEYS[k.game_id] = k.id;
      GAME_URLS.push(k.game.url);
    }
    if (ownedKeys.length === data.per_page) {
      page += 1;
    } else {
      break;
    }
  }
  KEYS_CACHED = true;
}

export async function getOwnedKeys(
  client: ItchApiClient
): Promise<[Record<number, string>, string[]]> {
  if (!KEYS_CACHED) {
    await loadKeysAndUrls(client);
  }
  return [DOWNLOAD_KEYS, GAME_URLS];
}

export async function getDownloadKeys(client: ItchApiClient): Promise<Record<number, string>> {
  if (!KEYS_CACHED) {
    await loadKeysAndUrls(client);
  }
  return DOWNLOAD_KEYS;
}

export async function getOwnedGames(client: ItchApiClient): Promise<string[]> {
  if (!KEYS_CACHED) {
    await loadKeysAndUrls(client);
  }
  return GAME_URLS;
}
