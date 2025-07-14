import test from 'node:test';
import assert from 'node:assert';
import { getIntAfterMarkerInJson, shouldSkipItemByGlob, shouldSkipItemByRegex } from '../src/utils';

test('getIntAfterMarkerInJson returns number when marker exists', () => {
  const text = 'foo\nI.ViewGame({"id": 42})\nbar';
  assert.strictEqual(getIntAfterMarkerInJson(text, 'I.ViewGame', 'id'), 42);
});

test('getIntAfterMarkerInJson returns null when missing', () => {
  assert.strictEqual(getIntAfterMarkerInJson('nothing here', 'Marker', 'id'), null);
});

test('shouldSkipItemByGlob checks patterns', () => {
  assert.strictEqual(shouldSkipItemByGlob('File', 'file.txt', '*.zip'), true);
  assert.strictEqual(shouldSkipItemByGlob('File', 'file.zip', '*.zip'), false);
});

test('shouldSkipItemByRegex checks patterns', () => {
  assert.strictEqual(shouldSkipItemByRegex('URL', 'abc', 'a.*c'), false);
  assert.strictEqual(shouldSkipItemByRegex('URL', 'abc', 'b.*c'), true);
});
