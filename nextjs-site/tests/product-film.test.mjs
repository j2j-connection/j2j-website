import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createHash } from 'node:crypto';
const root = new URL('../', import.meta.url);
const read = name => fs.readFileSync(new URL(name, root), 'utf8');
test('homepage offers the J2J Time film within the case-study journey', () => {
  const page = read('src/components/CaseStudy.tsx');
  assert.match(page, /import J2JTimeDemo/);
  assert.ok(page.indexOf('<J2JTimeDemo') < page.indexOf('<details'));
});
test('the public film names the billable-time problem and distinguishes planned features', () => {
  const demo = read('src/components/J2JTimeDemo.tsx');
  assert.match(demo, /Tracking billable time shouldn’t mean reconstructing your day/);
  assert.match(demo, /planned review, approval, and QuickBooks Time/);
  assert.match(demo, /Book a demo/);
  assert.doesNotMatch(demo, /autoplay|autoPlay|iframe|95%|guaranteed|—/);
  assert.match(demo, /controls/);
  assert.match(demo, /preload="none"/);
  assert.match(demo, /playsInline/);
  assert.match(demo, /kind="captions"/);
  assert.match(demo, /src="\/media\/j2j-time-v8\.mp4"/);
  assert.doesNotMatch(demo, /j2j-time-v[67]/);
  assert.match(demo, /aria-describedby=/);
});
test('published film has local captions and a still image, without shipping private sources', () => {
  const video = new URL('public/media/j2j-time-v8.mp4', root);
  const poster = new URL('public/media/j2j-time-v8-poster.jpg', root);
  assert.ok(fs.statSync(video).size > 1000000);
  assert.equal(createHash('sha256').update(fs.readFileSync(video)).digest('hex'), '107b3099a1e9e4f718f229c0436c2587c459aebd8e2fda967fa869878650975b', 'publish the approved product-only narrated film');
  assert.ok(fs.statSync(poster).size > 10000);
  const captions = read('public/media/j2j-time-v8.vtt');
  assert.ok(captions.startsWith('WEBVTT\n'));
  assert.match(captions, /Tracking billable time/);
  assert.match(captions, /building a review and approval flow/);
  assert.equal(fs.readdirSync(new URL('public/media/',root)).sort().join(','), 'j2j-time-v8-poster.jpg,j2j-time-v8.mp4,j2j-time-v8.vtt');
});
