import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read = path => fs.readFileSync(new URL(path, import.meta.url), 'utf8');

test('footer links to a separate privacy page instead of exposing measurement details', () => {
  const footer = read('../src/components/Footer.tsx');
  assert.match(footer, /href="\/privacy\/"/);
  assert.doesNotMatch(footer, /Site measurement|<details|GoatCounter|scheduled call/);
  const privacy = read('../src/app/privacy/page.tsx');
  assert.match(privacy, /GoatCounter/);
  assert.match(privacy, /Calendly/);
  assert.match(privacy, /browser tab/);
  assert.match(privacy, /site\.mailto/);
  assert.doesNotMatch(privacy, /completely anonymous|no data is collected|—/);
});
