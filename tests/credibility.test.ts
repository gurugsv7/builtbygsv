import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { BUSINESS_REGISTRATION, EXCLUDED_EVIDENCE_PROJECTS, TRUST_PAGE, type WebsiteAudit } from '../src/data/credibility';
import { createOrganizationSchema } from '../src/seo';
import { getAppRouteMetadata, getScreenFromPath } from '../src/routes';
import { PROJECTS } from '../src/data/mockData';

test('trust route and organization identifiers share the same business evidence', () => {
  assert.equal(getScreenFromPath(TRUST_PAGE.path), 'trust');
  assert.equal(getAppRouteMetadata(TRUST_PAGE.path).title, TRUST_PAGE.title);
  const organization = createOrganizationSchema()['@graph'].find(node => node['@type'] === 'Organization');
  assert.equal(organization?.taxID, BUSINESS_REGISTRATION.gstin);
  assert.equal(organization?.identifier?.value, BUSINESS_REGISTRATION.udyamNumber);
  assert.ok(!PROJECTS.some(project => EXCLUDED_EVIDENCE_PROJECTS.includes(project.id)));
});

test('every published score is backed by a matching successful Lighthouse report', async () => {
  const audits: WebsiteAudit[] = JSON.parse(await readFile('src/data/websiteAudits.json', 'utf8'));
  assert.ok(audits.length > 0, 'Publish evidence before claiming website audits');
  assert.equal(new Set(audits.map(a => `${a.id}-${a.strategy}`)).size, audits.length);
  for (const audit of audits) {
    assert.ok(!EXCLUDED_EVIDENCE_PROJECTS.includes(audit.id), 'Personal experiments must stay outside public business evidence');
    if (audit.status !== 'complete') {
      assert.equal(audit.scores, undefined);
      continue;
    }
    assert.match(audit.report!, /^\/audits\/[a-z0-9-]+\.report\.html$/);
    const report = JSON.parse(await readFile(`public${audit.report!.replace('.html', '.json')}`, 'utf8'));
    assert.equal(report.runtimeError, undefined);
    assert.equal(report.fetchTime, audit.checkedAt);
    assert.equal(report.lighthouseVersion, audit.lighthouseVersion);
    assert.equal(new URL(report.requestedUrl).href, new URL(audit.url).href);
    const scores = audit.scores!;
    for (const [key, category] of [['performance', 'performance'], ['accessibility', 'accessibility'], ['bestPractices', 'best-practices'], ['seo', 'seo']] as const) {
      assert.equal(scores[key], Math.round(report.categories[category].score * 100));
      assert.ok(scores[key] >= 0 && scores[key] <= 100);
    }
    await readFile(`public${audit.report}`);
  }
});
