import test from 'node:test';
import assert from 'node:assert';
import { loadKeysAndUrls, getDownloadKeys, getOwnedGames, getOwnedKeys } from '../keys';

class FakeClient {
  page = 0;
  async get() {
    this.page += 1;
    if (this.page === 1) {
      return {
        status: 200,
        data: {
          owned_keys: [
            { game_id: 1, id: 'a', game: { url: 'u1' } },
            { game_id: 2, id: 'b', game: { url: 'u2' } },
          ],
          per_page: 2,
        },
      };
    } else if (this.page === 2) {
      return {
        status: 200,
        data: { owned_keys: [{ game_id: 3, id: 'c', game: { url: 'u3' } }], per_page: 2 },
      };
    }
    return { status: 400 };
  }
}

test('loadKeysAndUrls fetches and caches', async () => {
  const client = new FakeClient();
  await loadKeysAndUrls(client as any);
  const keys = await getDownloadKeys(client as any);
  assert.deepStrictEqual(keys, { 1: 'a', 2: 'b', 3: 'c' });
  const urls = await getOwnedGames(client as any);
  assert.deepStrictEqual(urls, ['u1', 'u2', 'u3']);
  const both = await getOwnedKeys(client as any);
  assert.deepStrictEqual(both, [keys, urls]);
  const calls = client.page;
  await getDownloadKeys(client as any);
  assert.strictEqual(client.page, calls);
});
