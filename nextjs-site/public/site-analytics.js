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

  function watchedFraction(video) {
    if (!Number.isFinite(video.duration) || video.duration <= 0) return 0;
    let watched = 0;
    try {
      for (let i = 0; i < video.played.length; i++) {
        watched += Math.max(0, Math.min(video.duration, video.played.end(i)) - Math.max(0, video.played.start(i)));
      }
    } catch { return 0; }
    return Math.min(1, watched / video.duration);
  }

  function referralLabel(source) {
    const labels = clean(source);
    return `${labels.utm_medium || 'unknown'}:${labels.utm_source || 'direct-or-unknown'}`;
  }

  function publicPath(path) {
    const normalized = path.replace(/\/+$/, '') || '/';
    return ['/', '/j2j-time', '/j2j-time/thanks', '/guides/automatic-billable-time-tracking', '/case-studies/billable-time', '/privacy', '/apps/phone-activity', '/apps/phone-activity/privacy', '/apps/phone-activity/terms'].includes(normalized) ? path : null;
  }

  const queue = [];
  let production = false;
  let source = {};
  function track(name) {
    if (!production || !valid(name)) return;
    const event = { path: name, title: name.replaceAll('-', ' '), event: true, referrer: referralLabel(source), j2jAttribution: clean(source) };
    try {
      if (typeof root.goatcounter?.count === 'function') root.goatcounter.count(event);
      else if (queue.length < 30) queue.push(event);
    } catch { /* Analytics must never break navigation. */ }
  }

  root.J2JAnalytics = { attribution, bookingHref, track, watchedFraction };
  if (!root.document) return;
  function mount() {
    const { document, location } = root;
    let stored = null;
    try { stored = JSON.parse(root.sessionStorage.getItem('j2j-attribution')); } catch { /* Storage may be disabled. */ }
    source = attribution(location.search, document.referrer, stored);
    try { root.sessionStorage.setItem('j2j-attribution', JSON.stringify(source)); } catch { /* Links still work without storage. */ }
    const placement = () => location.pathname === '/' ? 'home' : location.pathname.split('/').filter(Boolean).join('-');
    function decorate(link) {
      link.href = bookingHref(link.href, source, link.dataset.placement || placement());
    }
    function decorateSignup() {
      const labels = clean(source);
      document.querySelectorAll('input[data-j2j-attribution]').forEach(input => {
        const key = input.dataset.j2jAttribution;
        if (keys.includes(key)) input.value = labels[key] || '';
      });
    }
    document.querySelectorAll('a[href^="https://calendly.com/"]').forEach(decorate);
    decorateSignup();
    document.addEventListener('click', event => {
      const link = event.target.closest?.('a');
      if (!link) return;
      decorate(link);
      if (link.dataset.event) track(link.dataset.event);
      else if (link.href.startsWith('https://calendly.com/')) track('booking-click-' + placement());
      else if (link.href.startsWith('mailto:')) track('email-click-' + placement());
    });
    // Delegate media events so client-side navigation needs no new listeners.
    const measured = new WeakMap();
    function once(target, name) {
      let sent = measured.get(target);
      if (!sent) { sent = new Set(); measured.set(target, sent); }
      if (sent.has(name)) return;
      sent.add(name);
      track(name);
    }
    function videoEvent(event) {
      const video = event.target;
      const slot = video?.dataset?.j2jVideo;
      if (!['home', 'product'].includes(slot)) return;
      if (event.type === 'play') once(video, `j2j-time-video-play-${slot}`);
      if (event.type === 'error') once(video, `j2j-time-video-error-${slot}`);
      if (event.type === 'timeupdate' || event.type === 'ended') {
        const fraction = watchedFraction(video);
        for (const percent of [25, 50, 75, 90]) {
          if (fraction >= percent / 100) once(video, `j2j-time-video-${percent}-${slot}`);
        }
      }
    }
    for (const type of ['play', 'timeupdate', 'ended', 'error']) {
      document.addEventListener(type, event => videoEvent({ type, target: event.target }), true);
    }
    function signupForm(target) {
      const form = target?.closest?.('form[data-j2j-signup]') || target;
      return form?.dataset?.j2jSignup === 'product' ? form : null;
    }
    document.addEventListener('focusin', event => {
      const form = signupForm(event.target);
      if (form) once(form, 'j2j-time-signup-start-product');
    });
    document.addEventListener('invalid', event => {
      const form = signupForm(event.target);
      if (form) once(form, 'j2j-time-signup-validation-product');
    }, true);
    document.addEventListener('submit', event => {
      const form = signupForm(event.target);
      if (form && !event.defaultPrevented && form.checkValidity()) once(form, 'j2j-time-signup-submit-product');
      // Submission is an attempt. Confirmed signups come from Customer.io.
    });
    let lastPath = location.pathname;
    document.addEventListener('j2j-pageview', () => {
      source = attribution(location.search, '', source);
      try { root.sessionStorage.setItem('j2j-attribution', JSON.stringify(source)); } catch { /* Optional storage. */ }
      document.querySelectorAll('a[href^="https://calendly.com/"]').forEach(decorate);
      decorateSignup();
      if (lastPath === location.pathname) return;
      lastPath = location.pathname;
      if (!production || !publicPath(lastPath)) return;
      const page = { path: lastPath, title: document.title, referrer: referralLabel(source), j2jAttribution: clean(source) };
      try {
        if (typeof root.goatcounter?.count === 'function') root.goatcounter.count(page);
        else if (queue.length < 30) queue.push(page);
      } catch { /* Navigation remains functional without analytics. */ }
    });
    production = location.protocol === 'https:' && ['j2j.info', 'www.j2j.info'].includes(location.hostname);
    const code = document.querySelector('script[data-j2j-analytics]')?.dataset.j2jAnalytics;
    if (!production || !valid(code)) return;
    const initialPage = { path: publicPath(location.pathname), title: document.title, referrer: referralLabel(source), j2jAttribution: clean(source) };
    // Strip query strings and referrer paths before the analytics library sees them.
    let referrerHost = '';
    try { referrerHost = new URL(document.referrer).hostname; } catch { /* Direct or unknown. */ }
    root.goatcounter = { path: location.pathname, referrer: referrerHost, no_onload: true, no_events: true };
    const script = document.createElement('script');
    script.src = 'https://gc.zgo.at/count.js';
    script.dataset.goatcounter = `https://${code}.goatcounter.com/count`;
    script.async = true;
    script.addEventListener('load', () => {
      // count.js also sends location.search in its q field. Sanitize at the
      // provider boundary, before the first count, including queued events.
      const getData = root.goatcounter?.get_data;
      if (typeof getData !== 'function') {
        production = false;
        queue.length = 0;
        return;
      }
      root.goatcounter.get_data = vars => {
        const data = getData(vars);
        const labels = clean(vars?.j2jAttribution || source);
        const query = new URLSearchParams(labels).toString();
        data.q = query ? '?' + query : '';
        data.r = referralLabel(labels);
        if (!data.e && !publicPath(data.p || '')) data.p = null;
        return data;
      };
      if (initialPage.path) {
        try { root.goatcounter?.count?.(initialPage); } catch { /* Best effort. */ }
      }
      for (const event of queue.splice(0)) {
        try { root.goatcounter?.count?.(event); } catch { /* Best effort only. */ }
      }
    });
    document.head.append(script);
  }
  if (root.document.readyState === 'loading') root.document.addEventListener('DOMContentLoaded', mount, { once: true });
  else mount();
})(globalThis);
