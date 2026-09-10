import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

function load() {
  const context = { URL, URLSearchParams };
  vm.runInNewContext(fs.readFileSync(new URL('../public/site-analytics.js', import.meta.url), 'utf8'), context);
  return context.J2JAnalytics;
}

test('campaign attribution survives a page change without mixing old campaign values', () => {
  const api = load();
  const first = api.attribution('?utm_source=gold&utm_medium=referral&utm_campaign=fall-talk', '', null);
  assert.equal(first.utm_source, 'gold');
  assert.equal(api.attribution('', 'https://j2j.info/', first).utm_campaign, 'fall-talk');
  const next = api.attribution('?utm_source=chatgpt.com', '', first);
  assert.equal(next.utm_source, 'chatgpt.com');
  assert.equal(next.utm_campaign, undefined);
});

test('recognized search and AI referrers are classified without retaining query strings', () => {
  const api = load();
  for (const [host, medium] of [['chatgpt.com', 'ai'], ['claude.ai', 'ai'], ['gemini.google.com', 'ai'], ['www.google.com', 'organic'], ['www.bing.com', 'organic']]) {
    const result = api.attribution('', `https://${host}/?q=private-client`, null);
    assert.equal(result.utm_medium, medium);
    assert.ok(!JSON.stringify(result).includes('private-client'));
  }
  assert.equal(api.attribution('', '', null).utm_source, 'direct-or-unknown');
  assert.equal(api.attribution('', 'https://chatgpt.com.attacker.example/', null).utm_medium, 'referral');
});

test('contact URL carries source and placement, not arbitrary query data or personal identifiers', () => {
  const api = load();
  const source = api.attribution('?utm_source=gold&utm_campaign=tom%40example.com&email=private@example.com', '', null);
  const url = new URL(api.bookingHref('https://calendly.com/tom-j2j/30min?month=2026-10', source, 'hero'));
  assert.equal(url.searchParams.get('utm_source'), 'gold');
  assert.equal(url.searchParams.get('utm_content'), 'hero');
  assert.equal(url.searchParams.get('month'), '2026-10');
  assert.ok(!url.href.includes('example.com'));
  assert.equal(api.bookingHref('mailto:team@j2j.info', source, 'footer'), 'mailto:team@j2j.info');
  assert.equal(api.bookingHref('https://calendly.com.evil.example/', source, 'hero'), 'https://calendly.com.evil.example/');
});

test('malformed stored attribution and referrers cannot break a contact link', () => {
  const api = load();
  for (const stored of [null, [], 'broken', { utm_source: 'x@example.com' }]) {
    const result = api.attribution('', 'not a URL', stored);
    assert.equal(result.utm_source, 'direct-or-unknown');
  }
});

function browserContext({ hostname = 'j2j.info', blockedStorage = false } = {}) {
  const listeners = {};
  const scripts = [];
  const links = [{ href: 'https://calendly.com/tom-j2j/30min', dataset: { placement: 'hero' } }];
  const counts = [];
  const context = {
    URL, URLSearchParams,
    location: { protocol: 'https:', hostname, pathname: '/', search: '?utm_source=gold&utm_medium=referral' },
    sessionStorage: { getItem() { if (blockedStorage) throw Error('disabled'); return null; }, setItem() { if (blockedStorage) throw Error('disabled'); } },
    document: {
      readyState: 'complete', referrer: 'https://partner.example/private-path?email=private@example.com', title: 'J2J',
      querySelectorAll: () => links,
      querySelector: () => ({ dataset: { j2jAnalytics: 'j2j' } }),
      addEventListener: (name, handler) => { listeners[name] = handler; },
      createElement: () => ({ dataset: {}, addEventListener(name, handler) { this[name] = handler; } }),
      head: { append: script => scripts.push(script) },
    },
  };
  vm.runInNewContext(fs.readFileSync(new URL('../public/site-analytics.js', import.meta.url), 'utf8'), context);
  return { context, listeners, scripts, links, counts };
}

test('blocked storage still permits attributed booking links, while previews send no analytics', () => {
  const { links, scripts, context } = browserContext({ hostname: 'localhost', blockedStorage: true });
  assert.match(links[0].href, /utm_source=gold/);
  context.J2JAnalytics.track('booking-click-home');
  assert.equal(scripts.length, 0);
});

test('production loads analytics once, queues early clicks, and never calls a click a booking', () => {
  const { context, scripts, links, listeners, counts } = browserContext();
  assert.equal(scripts.length, 1);
  assert.equal(context.goatcounter.referrer, 'partner.example');
  listeners.click({ target: { closest: () => links[0] } });
  context.goatcounter.count = event => counts.push(event);
  scripts[0].load();
  assert.equal(counts.length, 1);
  assert.equal(counts[0].path, 'booking-click-home');
  assert.equal(counts[0].event, true);
  assert.ok(!JSON.stringify(counts).includes('private'));
});

test('client-side navigation records the new page once and updates booking placement', () => {
  const { context, scripts, listeners, counts, links } = browserContext();
  context.goatcounter.count = event => counts.push(event);
  scripts[0].load();
  context.location.pathname = '/case-studies/billable-time/';
  context.location.search = '';
  links[0].dataset = {};
  listeners['j2j-pageview']();
  listeners['j2j-pageview']();
  assert.equal(counts.filter(e => !e.event).length, 1);
  assert.equal(counts[0].path, '/case-studies/billable-time/');
  assert.match(links[0].href, /utm_content=case-studies-billable-time/);
});
