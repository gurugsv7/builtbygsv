import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { SITE_URL } from '../src/seo.ts';

const sitemap = await readFile('dist/sitemap.xml', 'utf8');
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1]);
assert.ok(urls.length > 0, 'Sitemap must contain public pages');
assert.equal(new Set(urls).size, urls.length, 'Sitemap contains duplicate pages');
const knownPaths = new Set(urls.map(url => new URL(url).pathname));
assert.ok(!knownPaths.has('/projects/v2-productions') && !knownPaths.has('/projects/neon-rail'), 'Removed projects must stay outside search inventory');
const titles = new Set<string>();
for (const url of urls) {
  const path = new URL(url).pathname;
  assert.equal(new URL(url).origin, SITE_URL);
  const html = await readFile(resolve('dist', `.${path}`, 'index.html'), 'utf8');
  assert.doesNotMatch(html, /V² Productions|Neon Rail/, `${path}: removed project content is still published`);
  const canonicals = [...html.matchAll(/<link rel="canonical" href="([^"]+)"/g)];
  assert.equal(canonicals.length, 1, `${path}: expected one canonical`);
  assert.equal(canonicals[0][1], url, `${path}: wrong canonical`);
  assert.doesNotMatch(html, /<meta name="robots" content="[^"]*noindex/, `${path}: sitemap page is noindex`);
  const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
  assert.ok(title, `${path}: missing title`);
  assert.ok(!titles.has(title), `${path}: duplicate title`);
  titles.add(title);
  assert.match(html, /<meta name="description" content="[^"]+"/, `${path}: missing description`);
  assert.match(html, /<h1\b/, `${path}: missing initial HTML heading`);
  const graph = JSON.parse(html.match(/<script id="structured-data" type="application\/ld\+json">([\s\S]*?)<\/script>/)![1]);
  const nodes = graph['@graph'] as { '@id'?: string; '@type'?: string }[];
  const ids = nodes.flatMap(node => node['@id'] ? [node['@id']] : []);
  assert.equal(new Set(ids).size, ids.length, `${path}: duplicate structured-data identifiers`);
  if (path !== '/') assert.ok(nodes.some(node => node['@type'] === 'BreadcrumbList'), `${path}: missing breadcrumbs`);
  for (const link of html.matchAll(/<a\b[^>]*href="([^"]+)"/g)) {
    const target = new URL(link[1].replaceAll('&amp;', '&'), SITE_URL);
    if (target.origin !== SITE_URL || target.pathname.startsWith('/audits/') || /\.[a-z0-9]+$/i.test(target.pathname)) continue;
    assert.ok(knownPaths.has(target.pathname) || ['/tour', '/connect', '/devday'].includes(target.pathname), `${path}: broken internal link ${link[1]}`);
  }
}
const work = await readFile('dist/projects/index.html', 'utf8');
assert.match(work, /<a href="https:\/\/www\.builtbygsv\.in\/projects\/s4skillup"/, 'Case studies need crawlable links before JavaScript runs');
const trust = await readFile('dist/trust/index.html', 'utf8');
await readFile('dist/og/projects/s4skillup.jpg');
assert.doesNotMatch(trust, /Neon Rail/, 'Personal experiments do not belong in business evidence');
assert.match(trust, /34EAMPG8995J1ZV/);
assert.match(trust, /UDYAM-PY-01-0011724/);
assert.ok(!urls.some(url => /\/audits\//.test(url)), 'Raw reports should stay outside the sitemap');
console.log(`Verified SEO output for ${urls.length} public pages: canonicals, titles, descriptions, HTML links, structured data and sitemap.`);
