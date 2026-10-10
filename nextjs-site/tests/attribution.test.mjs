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

function browserContext({ hostname = 'j2j.info', blockedStorage = false, search = '?utm_source=gold&utm_medium=referral' } = {}) {
  const listeners = {};
  const scripts = [];
  const links = [{ href: 'https://calendly.com/tom-j2j/30min', dataset: { placement: 'hero' } }];
  const counts = [];
  const inputs = ['utm_source', 'utm_medium', 'utm_campaign'].map(key => ({ dataset: { j2jAttribution: key }, value: 'unknown' }));
  const context = {
    URL, URLSearchParams,
    location: { protocol: 'https:', hostname, pathname: '/', search },
    sessionStorage: { getItem() { if (blockedStorage) throw Error('disabled'); return null; }, setItem() { if (blockedStorage) throw Error('disabled'); } },
    document: {
      readyState: 'complete', referrer: 'https://partner.example/private-path?email=private@example.com', title: 'J2J',
      querySelectorAll: selector => selector === 'input[data-j2j-attribution]' ? inputs : links,
      querySelector: () => ({ dataset: { j2jAnalytics: 'j2j' } }),
      addEventListener: (name, handler) => { listeners[name] = handler; },
      createElement: () => ({ dataset: {}, addEventListener(name, handler) { this[name] = handler; } }),
      head: { append: script => scripts.push(script) },
    },
  };
  vm.runInNewContext(fs.readFileSync(new URL('../public/site-analytics.js', import.meta.url), 'utf8'), context);
  if (context.goatcounter) context.goatcounter.get_data = vars => ({ ...vars, q: context.location.search });
  return { context, listeners, scripts, links, counts, inputs };
}

test('signup fields retain only safe acquisition labels across navigation, without changing contact fields', () => {
  const { context, inputs, listeners } = browserContext({ blockedStorage: true, search: '?utm_source=chatgpt.com&utm_medium=ai&utm_campaign=private%40example.com&email=private@example.com' });
  assert.deepEqual(inputs.map(i => i.value), ['chatgpt.com', 'ai', '']);
  inputs.forEach(i => { i.value = 'unknown'; });
  context.location.pathname = '/j2j-time/';
  context.location.search = '';
  listeners['j2j-pageview']();
  assert.deepEqual(inputs.map(i => i.value), ['chatgpt.com', 'ai', '']);
  assert.ok(!JSON.stringify(inputs).includes('example.com'));
});

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
  assert.equal(counts.length, 2);
  assert.equal(counts[0].path, '/');
  assert.equal(counts[1].path, 'booking-click-home');
  assert.equal(counts[1].event, true);
  assert.ok(!JSON.stringify(counts).includes('private'));
});

test('the provider cannot transmit raw queries, including emails and search questions', () => {
  const { context, scripts } = browserContext({ search: '?utm_source=chatgpt.com&utm_medium=ai&utm_campaign=fall&email=private@example.com&q=private-client' });
  assert.equal(context.goatcounter.no_onload, true);
  context.goatcounter.get_data = vars => ({ p: vars.path, q: context.location.search, r: 'unsafe-referrer' });
  context.goatcounter.count = () => {};
  scripts[0].load();
  const data = context.goatcounter.get_data({ path: '/' });
  assert.equal(new URLSearchParams(data.q).get('utm_campaign'), 'fall');
  assert.ok(!JSON.stringify(data).includes('private'));
  assert.match(data.r, /ai.*chatgpt.com/);
});

test('video progress uses played ranges, so seeking and replay do not fake completion', () => {
  const api = load();
  const ranges = list => ({ length: list.length, start: i => list[i][0], end: i => list[i][1] });
  assert.equal(api.watchedFraction({ duration: 50, played: ranges([[49, 50]]) }), 0.02);
  assert.equal(api.watchedFraction({ duration: 50, played: ranges([[0, 10], [30, 35]]) }), 0.3);
  assert.equal(api.watchedFraction({ duration: NaN, played: ranges([]) }), 0);
});

test('video and form events are deduplicated, carry acquisition labels and never include entered values', () => {
  const { context, scripts, listeners, counts } = browserContext({ search: '?utm_source=chatgpt.com&utm_medium=ai' });
  context.goatcounter.count = e => counts.push(e);
  scripts[0].load();
  const video = { dataset: { j2jVideo: 'product' }, duration: 50, played: { length: 1, start: () => 0, end: () => 26 } };
  listeners.play({ target: video }); listeners.play({ target: video });
  listeners.timeupdate({ target: video }); listeners.timeupdate({ target: video });
  const form = { dataset: { j2jSignup: 'product' }, checkValidity: () => true };
  const field = { value: 'private@example.com', closest: () => form };
  listeners.focusin({ target: field }); listeners.focusin({ target: field });
  listeners.invalid({ target: field }); listeners.invalid({ target: field });
  listeners.submit({ target: form, defaultPrevented: false });
  assert.equal(counts.filter(e => e.path === 'j2j-time-video-play-product').length, 1);
  assert.equal(counts.filter(e => e.path === 'j2j-time-video-50-product').length, 1);
  assert.equal(counts.filter(e => e.path === 'j2j-time-signup-start-product').length, 1);
  assert.equal(counts.filter(e => e.path === 'j2j-time-signup-validation-product').length, 1);
  assert.equal(counts.filter(e => e.path === 'j2j-time-signup-submit-product').length, 1);
  assert.ok(counts.filter(e => e.event).every(e => e.referrer.includes('ai:chatgpt.com')));
  assert.ok(!JSON.stringify(counts).includes('private'));
  assert.ok(!counts.some(e => /signup-(complete|success)/.test(e.path)));
});

test('invalid or cancelled submissions and direct thanks-page visits never become conversions', () => {
  const { context, scripts, listeners, counts } = browserContext();
  context.goatcounter.count = e => counts.push(e); scripts[0].load();
  listeners.submit({ target: { dataset: { j2jSignup: 'product' }, checkValidity: () => false } });
  listeners.submit({ target: { dataset: { j2jSignup: 'product' }, checkValidity: () => true }, defaultPrevented: true });
  context.location.pathname = '/j2j-time/thanks/'; listeners['j2j-pageview']();
  assert.ok(!counts.some(e => /signup-submit|signup-complete|signup-success/.test(e.path)));
});

test('a provider change fails closed instead of sending raw query data', () => {
  const { context, scripts, counts } = browserContext({ search: '?email=private@example.com' });
  delete context.goatcounter.get_data;
  context.goatcounter.count = e => counts.push(e);
  scripts[0].load();
  context.J2JAnalytics.track('j2j-time-signup-start-product');
  assert.equal(counts.length, 0);
});

test('unrecognized page paths cannot transmit identifiers through pageview URLs', () => {
  const { context, scripts, listeners, counts } = browserContext();
  context.goatcounter.count = e => counts.push(e); scripts[0].load();
  context.location.pathname = '/customer/private@example.com/'; listeners['j2j-pageview']();
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
  assert.equal(counts.filter(e => !e.event).length, 2);
  assert.equal(counts[1].path, '/case-studies/billable-time/');
  assert.match(links[0].href, /utm_content=case-studies-billable-time/);
});
