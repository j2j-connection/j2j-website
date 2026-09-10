import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const read = (path) =>
  fs.readFileSync(fileURLToPath(new URL(path, import.meta.url)), 'utf8');

const hero = read('../src/components/Hero.tsx');
const header = read('../src/components/Header.tsx');
const services = read('../src/components/Services.tsx');
const caseStudy = read('../src/components/CaseStudy.tsx');
const contact = read('../src/components/Contact.tsx');
const layout = read('../src/app/layout.tsx');
const siteContent = read('../src/content/site.ts');

test('LC Three replaces the budget demo throughout the reading journey', () => {
  assert.match(hero, /href="\/case-studies\/billable-time\/"/);
  assert.match(hero, /caseStudyClient.name/);
  for (const source of [hero, caseStudy, read('../src/app/case-studies/billable-time/page.tsx')]) {
    assert.doesNotMatch(source, /\/demos\/|budget demo|What is your budget trying to tell you/);
  }
});

test('the first viewport clearly identifies the built-environment audience', () => {
  assert.doesNotMatch(hero, /Practical AI for the built environment/);
  assert.match(hero, /teams across the built environment/);
  assert.doesNotMatch(hero, /owners, developers, architects, engineers, and contractors/);
  assert.match(header, /Built Environment AI/);
});

test('core sections speak to project work without relying on the AEC acronym', () => {
  assert.match(services, /project teams/);
  assert.match(siteContent, /construction projects/);
  assert.doesNotMatch(caseStudy, /manages construction projects/);
  assert.match(contact, /Tell us where your projects get stuck\./);

  for (const source of [hero, header, services, caseStudy, contact]) {
    assert.doesNotMatch(source, /\bAEC\b/);
    assert.doesNotMatch(source, /—/);
  }
});

test('search metadata reflects the built-environment positioning', () => {
  assert.match(layout, /AI Consulting for the Built Environment/);
  assert.match(layout, /construction and real estate teams/);
});
