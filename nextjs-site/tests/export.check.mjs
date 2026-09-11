import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createHash } from 'node:crypto';

const root = new URL('../out/', import.meta.url);
const read = name => fs.readFileSync(new URL(name, root), 'utf8');
const pages = ['/', '/case-studies/billable-time/'];

test('homepage uses the supplied OpenAI Select Partner badge and exact designation', () => {
  const html = read('index.html');
  assert.ok(html.includes('alt="OpenAI Select Partner"'));
  assert.ok(html.includes('J2J Connection is an OpenAI Select Partner'));
  assert.ok(html.includes('href="https://openai.com/business/partners/"'));
  assert.doesNotMatch(html, /OpenAI (?:Certified|Elite|Advanced) Partner/);
  const badge = fs.readFileSync(new URL('partners/openai-select-partner.svg', root));
  assert.equal(createHash('sha256').update(badge).digest('hex'), '312a3c4767dcf6a51eab6b73f49143a54dee60a88899f4b0b2ca448547efac86');
});

test('every public content page has its own canonical, description, share metadata and one heading', () => {
  const titles = new Set();
  for (const route of pages) {
    const html = read(`${route.slice(1)}index.html`);
    const tags = html.match(/<(?:meta|link)\b[^>]*>/g) || [];
    const canonical = tags.filter(t => /rel="canonical"/.test(t));
    assert.equal(canonical.length, 1, route);
    assert.ok(canonical[0].includes(`href="https://j2j.info${route}"`), route);
    for (const attr of ['name="description"', 'property="og:title"', 'property="og:description"', 'property="og:url"', 'name="twitter:card"']) {
      assert.ok(tags.some(t => t.includes(attr)), `${route}: ${attr}`);
    }
    assert.equal((html.match(/<h1\b/g) || []).length, 1, route);
    assert.ok(!/<meta[^>]+content="[^"]*noindex/.test(html), route);
    titles.add(html.match(/<title>(.*?)<\/title>/s)?.[1]);
  }
  assert.equal(titles.size, pages.length);
});

test('sitemap lists exactly the published content pages and all files exist', () => {
  const urls = [...read('sitemap.xml').matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);
  assert.deepEqual(urls.sort(), pages.map(p => `https://j2j.info${p}`).sort());
  for (const url of urls) assert.ok(fs.existsSync(new URL(`${new URL(url).pathname.slice(1)}index.html`, root)));
});

test('crawler policy is open to search and AI retrieval, with a valid sitemap', () => {
  const robots = read('robots.txt');
  assert.match(robots, /User-agent: \*/i);
  assert.match(robots, /Allow: \//);
  assert.doesNotMatch(robots, /Disallow: \//);
  assert.match(robots, /Sitemap: https:\/\/j2j.info\/sitemap.xml/);
});

test('schema parses, identifies the real organization, and does not invent reviews', () => {
  const html = read('index.html');
  const blocks = [...html.matchAll(/<script[^>]+type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs)].map(m => JSON.parse(m[1]));
  const nodes = blocks.flatMap(b => b['@graph'] || [b]);
  assert.ok(nodes.some(n => n['@type'] === 'Organization' && n.legalName === 'J2J Connection LLC'));
  assert.ok(nodes.some(n => n['@type'] === 'WebSite' && n.url === 'https://j2j.info/'));
  assert.ok(!JSON.stringify(blocks).includes('aggregateRating'));
});

test('homepage features the real case study, without demo links or unsupported absolutes', () => {
  const html = read('index.html');
  assert.ok(html.includes('href="/case-studies/billable-time/"'));
  for (const route of pages) assert.doesNotMatch(read(`${route.slice(1)}index.html`), /href="\/demos\/|budget demo/);
  assert.doesNotMatch(html, /Nothing leaves their own accounts|client details never leave their team|No hourly meter|95% accurate|Paid for itself in three weeks/);
});

test('retired demo URLs redirect to the case study without shipping the demo', () => {
  for (const route of ['demos/', 'demos/budget/']) {
    const html = read(`${route}index.html`);
    assert.match(html, /http-equiv="refresh" content="0;url=\/case-studies\/billable-time\/"/);
    assert.match(html, /rel="canonical" href="https:\/\/j2j.info\/case-studies\/billable-time\/"/);
    assert.match(html, /name="robots" content="noindex"/);
    assert.match(html, /href="\/case-studies\/billable-time\/"/);
    assert.doesNotMatch(html, /app.js|model.js|flow.js|Project Budget.xlsx/);
  }
  for (const asset of ['app.js', 'model.js', 'flow.js', 'style.css', 'Project Budget.xlsx']) {
    assert.ok(!fs.existsSync(new URL(`demos/budget/${asset}`, root)), asset);
  }
});

test('all local links and assets in exported content resolve on the static host', () => {
  for (const route of pages) {
    const html = read(`${route.slice(1)}index.html`);
    for (const match of html.matchAll(/(?:href|src)="([^"#]+)"/g)) {
      const url = new URL(match[1].replaceAll('&amp;', '&'), `https://j2j.info${route}`);
      if (url.origin !== 'https://j2j.info') continue;
      const target = decodeURIComponent(url.pathname).replace(/^\//, '');
      assert.ok(fs.existsSync(new URL(target.endsWith('/') ? `${target}index.html` : target, root)), `${route}: ${url.pathname}`);
    }
  }
});
