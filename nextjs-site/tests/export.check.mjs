import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createHash } from 'node:crypto';

const root = new URL('../out/', import.meta.url);
const read = name => fs.readFileSync(new URL(name, root), 'utf8');
const pages = ['/', '/j2j-time/', '/guides/automatic-billable-time-tracking/', '/case-studies/billable-time/', '/privacy/'];

test('access requests use consistent buyer copy without promising a trial or immediate setup', () => {
  const product = read('j2j-time/index.html');
  assert.match(product, /Start capturing the work behind your billable time\./);
  assert.match(product, /Leave your email and we’ll get in touch to see how J2J Time fits your team’s workflow\./);
  assert.match(product, /<button[^>]+type="submit"[^>]*>Request access<\/button>/);
  assert.match(product, /contact me about getting started with J2J Time and product updates/);
  assert.match(product, /name="j2j_time_interest" value="early-access"/);
  assert.match(product, /value="product-updates-v1"/);
  assert.match(read('j2j-time/thanks/index.html'), /Thanks for requesting access\./);
  for (const route of [...pages, '/j2j-time/thanks/']) {
    assert.doesNotMatch(read(`${route.slice(1)}index.html`), /early access|first month free|free for 30 days/i, route);
  }
});

test('product funnel hooks are present on the deployed film, native form and CTAs', () => {
  const home = read('index.html');
  const product = read('j2j-time/index.html');
  assert.match(home, /data-j2j-video="home"/);
  assert.match(home, /data-event="j2j-time-product-click-home"/);
  assert.match(product, /data-j2j-video="product"/);
  assert.match(product, /data-j2j-signup="product"/);
  assert.match(product, /data-event="j2j-time-signup-cta-product"/);
  assert.match(product, /data-event="j2j-time-demo-cta-product"/);
});

test('J2J Time is an indexable product with evidence, answers and an accessible native signup', () => {
  const html = read('j2j-time/index.html');
  assert.match(html, /AI time tracker for/);
  for (const term of ['Outlook', 'Google', 'Android', 'iPhone', 'QuickBooks Time', 'manual', 'Request access']) assert.ok(html.includes(term), term);
  assert.match(html, /href="\/case-studies\/billable-time\/"/);
  assert.match(html, /href="\/guides\/automatic-billable-time-tracking\/"/);
  assert.match(html, /<video[^>]+controls=""/);
  assert.match(html, /Video transcript/);
  const form = html.match(/<form\b[^>]*>.*?<\/form>/s)?.[0];
  assert.ok(form);
  assert.match(form, /method="POST"/);
  assert.match(form, /action="https:\/\/customerioforms\.com\/forms\/submit_action\?/);
  assert.match(form, /type="email"[^>]+required=""/);
  assert.match(form, /type="checkbox"[^>]+required=""/);
  assert.match(form, /name="j2j_time_consent"/);
  assert.doesNotMatch(form, /name="(?:unsubscribed|api_key|id)"|localStorage|sessionStorage/);
  const nodes = [...html.matchAll(/<script[^>]+type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs)].flatMap(m => { const data = JSON.parse(m[1]); return data['@graph'] || [data]; });
  const app = nodes.find(n => n['@type'] === 'SoftwareApplication');
  assert.equal(app?.name, 'J2J Time');
  assert.equal(app?.publisher?.['@id'], 'https://j2j.info/#organization');
  const film = nodes.find(n => n['@type'] === 'VideoObject');
  assert.equal(film?.duration, 'PT50S');
  assert.equal(film?.contentUrl, 'https://j2j.info/media/j2j-time-v7.mp4');
  assert.ok(film?.transcript.includes('building a review and approval flow'));
  assert.doesNotMatch(JSON.stringify(nodes), /aggregateRating|"price"|FAQPage/);
});

test('signup confirmation is excluded from discovery and signup privacy is disclosed', () => {
  const html = read('j2j-time/thanks/index.html');
  assert.match(html, /name="robots" content="noindex, nofollow"/);
  assert.match(html, /href="\/j2j-time\/"/);
  assert.doesNotMatch(read('sitemap.xml'), /\/thanks\//);
  assert.match(read('privacy/index.html'), /Customer\.io/);
});

test('time-tracking guide explains the billing decision and links to the product', () => {
  const html = read('guides/automatic-billable-time-tracking/index.html');
  assert.match(html, /href="\/j2j-time\/"/);
  assert.match(html, /QuickBooks Time/);
  assert.match(html, /<table/);
  assert.doesNotMatch(html, /best time tracker|guaranteed|95% accurate|—/i);
});

test('privacy disclosure is separate from the footer on every content page', () => {
  for (const route of pages) {
    const html = read(`${route.slice(1)}index.html`);
    const footer = html.match(/<footer\b[^>]*>.*?<\/footer>/s)?.[0];
    assert.ok(footer, route);
    assert.match(footer, /href="\/privacy\/"/);
    assert.doesNotMatch(footer, /Site measurement|GoatCounter|session storage|scheduled call/);
  }
  const privacy = read('privacy/index.html');
  assert.match(privacy, /GoatCounter/);
  assert.match(privacy, /Calendly/);
  assert.doesNotMatch(privacy, /property="og:image"|name="twitter:image"/);
});

test('homepage uses the supplied OpenAI Select Partner badge and exact designation', () => {
  const html = read('index.html');
  assert.ok(html.includes('alt="OpenAI Select Partner"'));
  assert.equal((html.match(/alt="OpenAI Select Partner"/g) || []).length, 1);
  assert.ok(!html.includes('J2J Connection is an OpenAI Select Partner'));
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
  for (const route of [...pages, '/apps/phone-activity/', '/apps/phone-activity/privacy/', '/apps/phone-activity/terms/']) {
    const html = read(`${route.slice(1)}index.html`);
    for (const match of html.matchAll(/(?:href|src)="([^"#]+)"/g)) {
      const url = new URL(match[1].replaceAll('&amp;', '&'), `https://j2j.info${route}`);
      if (url.origin !== 'https://j2j.info') continue;
      const target = decodeURIComponent(url.pathname).replace(/^\//, '');
      assert.ok(fs.existsSync(new URL(target.endsWith('/') ? `${target}index.html` : target, root)), `${route}: ${url.pathname}`);
    }
  }
});

test('phone application pages export independently with accurate permission and privacy disclosures', () => {
  for (const route of ['/apps/phone-activity/', '/apps/phone-activity/privacy/', '/apps/phone-activity/terms/']) {
    const html = read(`${route.slice(1)}index.html`);
    assert.match(html, route.endsWith('/terms/') ? /separate service agreement/ : /full Google Drive access/);
    assert.ok(html.includes(`href="https://j2j.info${route}"`));
    assert.equal((html.match(/<h1\b/g) || []).length, 1);
    assert.match(html, /J2J_logo\.svg/);
    assert.doesNotMatch(html, /property="og:image"|name="twitter:image"/);
  }
  const policy = read('apps/phone-activity/privacy/index.html');
  assert.match(policy, /message contents/);
  assert.match(policy, /Limited Use/);
  assert.match(policy, /not a guaranteed 24-hour maximum/);
});
