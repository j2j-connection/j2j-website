import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
const context = {};
vm.runInNewContext(fs.readFileSync(fileURLToPath(new URL('../public/demos/budget/model.js', import.meta.url)), 'utf8'), context);
const { review, sample } = context.BudgetDemo;

test('a positive total balance must not hide an individual overrun', () => {
  const r = review(sample);
  assert.equal(r.approved, 300000);
  assert.equal(r.billed, 234000);
  assert.equal(r.remaining, 66000);
  assert.equal(r.overruns.length, 1);
  assert.equal(r.overruns[0].id, 'architecture');
  assert.equal(r.overruns[0].overrun, 9000);
  assert.equal(r.billedRatio, 0.78);
});

test('approved changes change the baseline; billed amounts are not changed', () => {
  const revised = sample.map(r => r.id === 'architecture' ? { ...r, changes: r.changes + 9000 } : r);
  const r = review(revised);
  assert.equal(r.approved, 309000);
  assert.equal(r.billed, 234000);
  assert.equal(r.remaining, 75000);
  assert.equal(r.overruns.length, 0);
  assert.equal(sample[0].changes, 10000);
});

test('every consultant is independently checked, including later rows', () => {
  const r = review(sample.map(row => row.id === 'landscape' ? { ...row, billed: 46000 } : row));
  assert.equal(r.overruns.length, 2);
  assert.equal(r.overruns.find(row => row.id === 'landscape').overrun, 1000);
});

test('zero budget has no percentage, but still exposes billed overrun', () => {
  const r = review([{ id: 'zero', name: 'Zero baseline', original: 0, changes: 0, billed: 100 }]);
  assert.equal(r.billedRatio, null);
  assert.equal(r.overruns[0].overrun, 100);
});

test('missing or duplicated input is rejected, not silently treated as zero', () => {
  assert.throws(() => review([{ id: 'x', name: 'Missing', original: 500, changes: 0, billed: null }]));
  assert.throws(() => review([sample[0], sample[0]]));
  assert.throws(() => review([]));
});
