import { test } from 'node:test';
import assert from 'node:assert/strict';

const load = () => import('../scripts/growth-report.mjs');
const person = (id, extra = {}) => ({ id, attributes: { j2j_time_interest: 'early-access', j2j_time_consent: 'product-updates-v1', j2j_time_utm_source: 'chatgpt.com', j2j_time_utm_medium: 'ai', ...extra } });

test('confirmed signup reporting uses the consent-based audience, excluding QA and revoked consent', async () => {
  const { summarizeSignups } = await load();
  const rows = [person('1'), person('2', { j2j_time_qa: 'true' }), person('3', { j2j_time_consent: 'revoked' })];
  const result = summarizeSignups(rows, 1);
  assert.equal(result.confirmed, 1);
  assert.deepEqual(result.sources, [{ source: 'chatgpt.com', medium: 'ai', count: 1 }]);
});

test('incomplete or duplicate profile reads cannot silently produce a plausible report', async () => {
  const { summarizeSignups } = await load();
  assert.throws(() => summarizeSignups([person('1')], 2), /count/);
  assert.throws(() => summarizeSignups([person('1'), person('1')], 2), /duplicate/);
  assert.throws(() => summarizeSignups([], -1), /count/);
});

test('reports never embed profile identities, claim thank-you visits as signups, or invent conversion rates', async () => {
  const { summarizeSignups, renderReport } = await load();
  const result = summarizeSignups([person('secret-id', { email: 'private@example.com', j2j_time_company: 'Private Company', j2j_time_utm_source: '<script>bad</script>' })], 1);
  const html = renderReport({ generatedAt: '2026-10-10T00:00:00Z', ...result });
  assert.ok(!html.includes('secret-id'));
  assert.ok(!html.includes('private@example.com'));
  assert.ok(!html.includes('Private Company'));
  assert.ok(!html.includes('<script>'));
  assert.match(html, /Customer.io/);
  assert.match(html, /submission attempts/);
  assert.match(html, /current consenting audience/i);
  assert.doesNotMatch(html, /conversion rate:|100% conversion|signup completed from a page visit/i);
});
