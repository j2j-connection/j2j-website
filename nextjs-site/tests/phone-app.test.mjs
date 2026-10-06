import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read = path => fs.readFileSync(new URL(path, import.meta.url), 'utf8');

test('phone app overview explains the actual feature and links its own privacy policy', () => {
  const page = read('../src/app/apps/phone-activity/page.tsx');
  assert.match(page, /LC3 Phone Activity/);
  assert.match(page, /J2J Connection LLC/);
  assert.match(page, /href="\/apps\/phone-activity\/privacy\/"/);
  assert.match(page, /href="\/apps\/phone-activity\/terms\/"/);
  assert.match(page, /WhatsApp/);
  assert.match(page, /full Google Drive access/);
  assert.match(page, /testing/);
  assert.doesNotMatch(page, /—|guaranteed|folder-only permission/);
});

test('phone app terms preserve the separate service agreement and avoid automatic billing', () => {
  const page = read('../src/app/apps/phone-activity/terms/page.tsx');
  assert.match(page, /J2J Connection LLC/);
  assert.match(page, /separate service agreement/);
  assert.match(page, /does not authorize a new charge/);
  assert.match(page, /authority/);
  assert.doesNotMatch(page, /—|indemnif|waive|unlimited liability/);
});

test('phone privacy policy discloses transient content, retained metadata and limited use', () => {
  const page = read('../src/app/apps/phone-activity/privacy/page.tsx');
  for (const text of ['message contents', 'Vercel', 'Neon', 'Resend', 'pseudonymous',
    'full Google Drive access', 'outages', 'Limited Use', 'revoke', 'retention']) {
    assert.ok(page.includes(text), text);
  }
  assert.match(page, /https:\/\/myaccount.google.com\/connections/);
  assert.match(page, /https:\/\/developers.google.com\/terms\/api-services-user-data-policy/);
  assert.match(page, /mailto:tom@j2j.info/);
  assert.doesNotMatch(page, /—|never leaves|completely anonymous|guaranteed within 24/);
});
