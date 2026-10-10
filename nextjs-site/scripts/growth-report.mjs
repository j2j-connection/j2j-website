import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { execFileSync } from 'node:child_process';

const label = value => typeof value === 'string' && /^[a-z0-9][a-z0-9._-]{0,63}$/i.test(value) ? value : 'unknown';
const escape = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

export function summarizeSignups(rows, expectedCount) {
  if (!Number.isInteger(expectedCount) || expectedCount < 0) throw Error('Invalid audience count');
  const ids = new Set();
  const groups = new Map();
  let confirmed = 0;
  for (const row of rows) {
    if (!row.id || ids.has(row.id)) throw Error('Missing or duplicate profile in the report');
    ids.add(row.id);
    const a = row.attributes || {};
    if (a.j2j_time_qa === 'true' || a.j2j_time_interest !== 'early-access' || a.j2j_time_consent !== 'product-updates-v1') continue;
    confirmed++;
    const source = label(a.j2j_time_utm_source);
    const medium = label(a.j2j_time_utm_medium);
    const key = `${medium}:${source}`;
    const group = groups.get(key) || { source, medium, count: 0 };
    group.count++;
    groups.set(key, group);
  }
  if (confirmed !== expectedCount) throw Error('Audience count changed or profile read is incomplete; refresh again');
  return { confirmed, sources: [...groups.values()].sort((a, b) => b.count - a.count || a.source.localeCompare(b.source)) };
}

export function renderReport(report, audienceUrl = 'https://fly.customer.io/') {
  const sourceRows = report.sources.map(row => `<tr><td>${escape(row.medium)}</td><td>${escape(row.source)}</td><td>${row.count}</td></tr>`).join('');
  return `<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>J2J Time growth report</title><style>
body{margin:0;background:#fcfbf7;color:#1c1a14;font:17px/1.6 system-ui,sans-serif}main{max-width:1000px;margin:auto;padding:40px 24px}header{display:flex;gap:15px;align-items:center}header img{width:48px}h1{font-size:42px;line-height:1.1;letter-spacing:-1.5px}h2{font-size:23px;margin-top:35px}.muted{color:#666458}.card{padding:24px;border:1px solid #ddd6b9;border-radius:12px;background:#fbf5da}.number{font-size:60px;font-weight:750;line-height:1.2}nav{display:flex;gap:12px;flex-wrap:wrap}a{color:inherit;text-underline-offset:4px}nav a{padding:10px 16px;border:1px solid #1c1a14;border-radius:6px}table{border-collapse:collapse;width:100%;text-align:left}td,th{padding:10px;border-bottom:1px solid #dedbd1}li{margin:8px 0}@media(max-width:500px){h1{font-size:32px}.number{font-size:48px}} </style>
<main><header><img src="https://j2j.info/J2J_logo.svg" alt="J2J logo"><strong>J2J Connection · Private reporting</strong></header><h1>J2J Time growth report</h1><p class="muted">Refreshed ${escape(report.generatedAt)}. Current audience snapshot, not a historical signup cohort.</p>
<section class="card"><div class="number">${report.confirmed}</div><strong>Current consenting audience</strong><p>Confirmed profiles in Customer.io’s J2J Time access-request list. QA profiles and revoked product consent are excluded. An interest signup does not establish an active or paying customer; provider opt-outs still govern messaging.</p></section>
<h2>Which sources bring confirmed interest?</h2><table><thead><tr><th>Channel</th><th>Source</th><th>Profiles</th></tr></thead><tbody>${sourceRows || '<tr><td colspan="3">No eligible signups yet. Test records are excluded.</td></tr>'}</tbody></table>
<h2>Open the live reports</h2><nav><a href="https://j2j.goatcounter.com/">Visits, sources &amp; funnel events</a><a href="${escape(audienceUrl)}">Confirmed signup list</a><a href="https://search.google.com/search-console?resource_id=https%3A%2F%2Fj2j.info%2F">Google search performance</a></nav>
<h2>Read the funnel correctly</h2><ul><li>Pages: homepage, J2J Time, tracking guide and case study. GoatCounter’s totals can include events; separate page paths from event rows.</li><li>Video: play, 25%, 50%, 75% and 90% watched, measured from actual played ranges rather than the scrubber position.</li><li>Signup: CTA clicks, form starts, validation problems and submission attempts. A submission attempt is not a confirmed signup.</li><li>Confirmed signups: this Customer.io snapshot. A thank-you page visit never proves signup persistence.</li><li>Booking clicks: interest in a conversation. Completed bookings and cancellations are confirmed in Calendly.</li><li>Acquisition: validated source, medium and campaign labels. AI traffic is a recognized referral or supplied campaign label, not proof that an assistant recommended J2J.</li></ul>
<p class="muted">Weekly GoatCounter summaries are configured for the existing account. New funnel measurements begin with their deployment and cannot reconstruct earlier behavior. Analytics blockers and unknown referrals limit coverage; these systems do not share a visitor identifier, so this report does not invent a joined user conversion rate.</p></main></html>`;
}

function api(workspace, route, params, projection) {
  const args = ['--read-only', 'api', `/v1/environments/${workspace}/${route}`, '--jq', projection];
  if (params) args.push('--params', JSON.stringify(params));
  return JSON.parse(execFileSync('cio-j2j', args, { encoding: 'utf8', timeout: 60000, maxBuffer: 1024 * 1024 }));
}

export function collectSignups(workspace, segment) {
  const start = api(workspace, `segments/${segment}/count`, null, '{count,finished}');
  if (!start.finished || !Number.isInteger(start.count) || start.count < 0) throw Error('Customer.io audience is still building or unavailable');
  const filter = { and: [{ segment: { id: Number(segment), inverse: false } }] };
  const filters = Buffer.from(encodeURIComponent(JSON.stringify(filter))).toString('base64');
  const rows = [];
  for (let page = 1; page <= 100; page++) {
    const data = api(workspace, 'customers', { filters, page }, '{customers:[.customers[] | {id,attributes:{j2j_time_interest:.attributes.j2j_time_interest,j2j_time_consent:.attributes.j2j_time_consent,j2j_time_qa:.attributes.j2j_time_qa,j2j_time_utm_source:.attributes.j2j_time_utm_source,j2j_time_utm_medium:.attributes.j2j_time_utm_medium}}],pagination:.meta.pagination}');
    if (!Number.isInteger(data.pagination?.total) || data.pagination.total !== start.count) throw Error('Audience count changed or filtered read is incomplete');
    rows.push(...data.customers);
    if (page * 50 >= data.pagination.total) break;
    if (page === 100) throw Error('Audience exceeds bounded pagination; no partial report written');
  }
  const end = api(workspace, `segments/${segment}/count`, null, '{count,finished}');
  if (!end.finished || end.count !== start.count) throw Error('Audience changed during refresh; retry');
  return summarizeSignups(rows, end.count);
}

function main() {
  const args = process.argv.slice(2);
  const option = key => args[args.indexOf(key) + 1];
  const workspace = process.env.J2J_CIO_ENVIRONMENT_ID;
  const segment = process.env.J2J_CIO_TIME_SEGMENT_ID;
  const out = args.includes('--out') ? path.resolve(option('--out')) : '';
  if (!/^\d+$/.test(workspace || '') || !/^\d+$/.test(segment || '') || !out || !out.split(path.sep).some(p => ['private', 'local-only', '.secrets'].includes(p))) {
    throw Error('Set J2J_CIO_ENVIRONMENT_ID and J2J_CIO_TIME_SEGMENT_ID, and pass --out inside a private/ or local-only/ directory');
  }
  const report = { generatedAt: new Date().toISOString(), ...collectSignups(workspace, segment) };
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, renderReport(report, `https://fly.customer.io/workspaces/${workspace}/journeys/segments/${segment}/people`));
  fs.writeFileSync(out.replace(/\.html$/, '') + '.json', JSON.stringify(report, null, 2));
  process.stdout.write(JSON.stringify({ saved: out, confirmed: report.confirmed, sourceGroups: report.sources.length }) + '\n');
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  try { main(); } catch (error) { process.stderr.write(`Report refresh failed: ${error.message}\n`); process.exitCode = 1; }
}
