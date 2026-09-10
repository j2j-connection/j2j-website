/* Shared by exported React pages and static demos. No visitor IDs or full referrer URLs. */
(function (root) {
  'use strict';
  const keys = ['utm_source', 'utm_medium', 'utm_campaign'];
  const valid = value => typeof value === 'string' && /^[a-z0-9][a-z0-9._-]{0,63}$/i.test(value);
  const clean = input => Object.fromEntries(keys.filter(key => valid(input?.[key])).map(key => [key, input[key]]));

  function attribution(search, referrer, stored) {
    const params = new URLSearchParams(search);
    const campaign = clean(Object.fromEntries(keys.map(key => [key, params.get(key)])));
    if (campaign.utm_source) return campaign;
    let host = '';
    try { host = new URL(referrer).hostname.replace(/^www\./, ''); } catch { /* No usable referrer. */ }
    if (host && !['j2j.info', 'localhost'].includes(host)) {
      const ai = ['chatgpt.com', 'chat.openai.com', 'claude.ai', 'claude.com', 'gemini.google.com', 'perplexity.ai'];
      const organic = ['google.com', 'bing.com', 'duckduckgo.com', 'search.yahoo.com'];
      if (ai.includes(host)) return { utm_source: host, utm_medium: 'ai' };
      if (organic.includes(host)) return { utm_source: host, utm_medium: 'organic' };
      return { utm_source: 'other-referral', utm_medium: 'referral' };
    }
    const previous = clean(stored);
    return previous.utm_source ? previous : { utm_source: 'direct-or-unknown', utm_medium: 'unknown' };
  }

  function bookingHref(href, source, placement) {
    try {
      const url = new URL(href);
      if (url.protocol !== 'https:' || url.hostname !== 'calendly.com') return href;
      for (const [key, value] of Object.entries(clean(source))) url.searchParams.set(key, value);
      if (valid(placement)) url.searchParams.set('utm_content', placement);
      return url.href;
    } catch { return href; }
  }

  const queue = [];
  let production = false;
  function track(name) {
    if (!production || !valid(name)) return;
    const event = { path: name, title: name.replaceAll('-', ' '), event: true };
    try {
      if (typeof root.goatcounter?.count === 'function') root.goatcounter.count(event);
      else if (queue.length < 30) queue.push(event);
    } catch { /* Analytics must never break navigation. */ }
  }

  root.J2JAnalytics = { attribution, bookingHref, track };
  if (!root.document) return;
  function mount() {
    const { document, location } = root;
    let stored = null;
    try { stored = JSON.parse(root.sessionStorage.getItem('j2j-attribution')); } catch { /* Storage may be disabled. */ }
    const source = attribution(location.search, document.referrer, stored);
    try { root.sessionStorage.setItem('j2j-attribution', JSON.stringify(source)); } catch { /* Links still work without storage. */ }
    const placement = () => location.pathname === '/' ? 'home' : location.pathname.split('/').filter(Boolean).join('-');
    function decorate(link) {
      link.href = bookingHref(link.href, source, link.dataset.placement || placement());
    }
    document.querySelectorAll('a[href^="https://calendly.com/"]').forEach(decorate);
    document.addEventListener('click', event => {
      const link = event.target.closest?.('a');
      if (!link) return;
      decorate(link);
      if (link.dataset.event) track(link.dataset.event);
      else if (link.href.startsWith('https://calendly.com/')) track('booking-click-' + placement());
      else if (link.href.startsWith('mailto:')) track('email-click-' + placement());
    });
    let lastPath = location.pathname;
    document.addEventListener('j2j-pageview', () => {
      document.querySelectorAll('a[href^="https://calendly.com/"]').forEach(decorate);
      if (lastPath === location.pathname) return;
      lastPath = location.pathname;
      if (!production) return;
      const page = { path: lastPath, title: document.title, referrer: '' };
      try {
        if (typeof root.goatcounter?.count === 'function') root.goatcounter.count(page);
        else if (queue.length < 30) queue.push(page);
      } catch { /* Navigation remains functional without analytics. */ }
    });
    production = location.protocol === 'https:' && ['j2j.info', 'www.j2j.info'].includes(location.hostname);
    const code = document.querySelector('script[data-j2j-analytics]')?.dataset.j2jAnalytics;
    if (!production || !valid(code)) return;
    // Strip query strings and referrer paths before the analytics library sees them.
    let referrerHost = '';
    try { referrerHost = new URL(document.referrer).hostname; } catch { /* Direct or unknown. */ }
    root.goatcounter = { path: location.pathname, referrer: referrerHost };
    const script = document.createElement('script');
    script.src = 'https://gc.zgo.at/count.js';
    script.dataset.goatcounter = `https://${code}.goatcounter.com/count`;
    script.async = true;
    script.addEventListener('load', () => {
      for (const event of queue.splice(0)) {
        try { root.goatcounter?.count?.(event); } catch { /* Best effort only. */ }
      }
    });
    document.head.append(script);
  }
  if (root.document.readyState === 'loading') root.document.addEventListener('DOMContentLoaded', mount, { once: true });
  else mount();
})(globalThis);
