import test from 'node:test';
import assert from 'node:assert';
import { load } from 'cheerio';
import { parseInfobox } from '../infobox';

test('parseInfobox extracts metadata blocks', () => {
  const html = `<div class="game_info_panel_widget"><table>
    <tr><td>Author</td><td><a href="https://a.test">Alice</a></td></tr>
    <tr><td>Updated</td><td><abbr title="01 January 2024 @ 12:34 UTC"></abbr></td></tr>
    <tr><td>Platforms</td><td><a>Windows</a><a>Linux</a></td></tr>
    <tr><td>Status</td><td><a>Released</a></td></tr>
  </table></div>`;
  const $ = load(html);
  const meta = parseInfobox($.root());
  assert.deepStrictEqual(meta.author, { author: 'Alice', author_url: 'https://a.test' });
  assert.ok(meta.updated_at instanceof Date);
  assert.deepStrictEqual(meta.platforms, ['Windows', 'Linux']);
  assert.strictEqual(meta.status, 'Released');
});
