import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { blogPosts } from '../src/blog';
import { blogRouteMetadata, getBlogRoute } from '../src/blogRoutes';
import { PROJECTS } from '../src/data/mockData';
import {
  appRouteMetadata,
  getAppRouteMetadata,
  getProjectFromPath,
  getScreenFromPath,
} from '../src/routes';
import { contentPages, getContentPage } from '../src/contentPages';
import {
  createContentPageSchema,
  createOrganizationSchema,
  createServiceAreaSchema,
  locationPages,
  SITE_URL,
} from '../src/seo';
import { getServiceAreaPage, serviceAreaPages } from '../src/serviceAreas';

test('project routes are unique, canonical, and resolve to their project', () => {
  const ids = PROJECTS.map((project) => project.id);
  assert.equal(new Set(ids).size, ids.length);

  for (const project of PROJECTS) {
    const path = `/projects/${project.id}`;
    assert.equal(getProjectFromPath(path), project);
    assert.equal(getProjectFromPath(`${path}/`), project);
    assert.equal(getScreenFromPath(path), 'project-detail');
    assert.equal(getAppRouteMetadata(path).title, project.detailData?.seoTitle ?? `${project.title} Case Study | BuiltbyGSV`);
  }
});

test('unknown project slugs do not silently resolve to a different project', () => {
  assert.equal(getProjectFromPath('/projects/does-not-exist'), null);
  assert.equal(getScreenFromPath('/projects/does-not-exist'), 'not-found');
  assert.equal(getScreenFromPath('/missing-page'), 'not-found');
});

test('blog route metadata is derived from the rendered blog content', () => {
  assert.deepEqual(
    blogRouteMetadata.map(({ path }) => path),
    blogPosts.map(({ path }) => path),
  );
  for (const post of blogPosts) assert.equal(getBlogRoute(`${post.path}/`)?.title, post.title);
});

test('sitemap contains every public route and no stale project routes', async () => {
  const sitemap = await readFile(new URL('../public/sitemap.xml', import.meta.url), 'utf8');
  const actual = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  const expectedPaths = new Set([
    ...Object.keys(appRouteMetadata),
    ...PROJECTS.map((project) => `/projects/${project.id}`),
    ...locationPages.map((page) => page.path),
    ...serviceAreaPages.map((page) => page.path),
    ...contentPages.map((page) => page.path),
    '/insights',
    ...blogPosts.map((post) => post.path),
  ]);
  const expected = [...expectedPaths].map((path) => `${SITE_URL}${path === '/' ? '/' : path}`);

  assert.deepEqual(actual.sort(), expected.sort());
});

test('prerender uses source content and emits a custom noindex 404', async () => {
  const prerender = await readFile(new URL('../scripts/prerender.ts', import.meta.url), 'utf8');
  assert.match(prerender, /PROJECTS\.map/);
  assert.match(prerender, /blogPosts\.map/);
  assert.match(prerender, /locationPages\.map/);
  assert.match(prerender, /404\.html/);
  assert.match(prerender, /noindex, follow/);
});

test('contact is indexable while the error page stays out of the sitemap', async () => {
  const sitemap = await readFile(new URL('../public/sitemap.xml', import.meta.url), 'utf8');
  assert.match(sitemap, /<loc>https:\/\/builtbygsv\.in\/contact<\/loc>/);
  assert.doesNotMatch(sitemap, /<loc>https:\/\/builtbygsv\.in\/404<\/loc>/);
  assert.equal(getScreenFromPath('/contact'), 'contact');
});

test('deployment configuration applies the expected baseline security headers', async () => {
  const config = JSON.parse(await readFile(new URL('../vercel.json', import.meta.url), 'utf8'));
  const globalHeaders = new Map(
    config.headers.find((entry: { source: string }) => entry.source === '/(.*)').headers
      .map((header: { key: string; value: string }) => [header.key, header.value]),
  );
  for (const header of [
    'Content-Security-Policy',
    'Cross-Origin-Opener-Policy',
    'Permissions-Policy',
    'Referrer-Policy',
    'Strict-Transport-Security',
    'X-Content-Type-Options',
    'X-Frame-Options',
  ]) {
    assert(globalHeaders.has(header), `Missing ${header}`);
  }
});

test('organization schema has stable, internally referenced entities', () => {
  const schema = createOrganizationSchema();
  const ids = new Set(schema['@graph'].map((entity) => entity['@id']));
  assert(ids.has(`${SITE_URL}/#organization`));
  assert(ids.has(`${SITE_URL}/#gurusabarivasan`));
  assert(ids.has(`${SITE_URL}/#website`));
});

test('every public path is unique across every page collection', () => {
  const paths = [
    ...Object.keys(appRouteMetadata),
    ...PROJECTS.map((project) => `/projects/${project.id}`),
    ...locationPages.map((page) => page.path),
    ...serviceAreaPages.map((page) => page.path),
    ...contentPages.map((page) => page.path),
    ...blogPosts.map((post) => post.path),
  ];
  assert.equal(new Set(paths).size, paths.length, 'two pages claim the same path');
});

test('titles and descriptions are unique so pages do not cannibalise each other', () => {
  const titles = [
    ...Object.values(appRouteMetadata).map((meta) => meta.title),
    ...locationPages.map((page) => page.title),
    ...serviceAreaPages.map((page) => page.title),
    ...contentPages.map((page) => page.title),
    ...blogPosts.map((post) => post.seoTitle),
  ];
  assert.equal(new Set(titles).size, titles.length, 'duplicate title tag');

  const descriptions = [
    ...Object.values(appRouteMetadata).map((meta) => meta.description),
    ...locationPages.map((page) => page.description),
    ...serviceAreaPages.map((page) => page.description),
    ...contentPages.map((page) => page.description),
    ...blogPosts.map((post) => post.description),
  ];
  assert.equal(new Set(descriptions).size, descriptions.length, 'duplicate meta description');
});

test('service-area and content pages resolve from their own path, with or without a trailing slash', () => {
  for (const page of serviceAreaPages) {
    assert.equal(getServiceAreaPage(page.path), page);
    assert.equal(getServiceAreaPage(`${page.path}/`), page);
    assert.equal(getScreenFromPath(page.path), 'not-found', 'spokes are not app screens');
  }
  for (const page of contentPages) {
    assert.equal(getContentPage(page.path), page);
    assert.equal(getContentPage(`${page.path}/`), page);
  }
});

test('every internal link on a new page points at a page that exists', () => {
  const known = new Set([
    ...Object.keys(appRouteMetadata),
    ...PROJECTS.map((project) => `/projects/${project.id}`),
    ...locationPages.map((page) => page.path),
    ...serviceAreaPages.map((page) => page.path),
    ...contentPages.map((page) => page.path),
    ...blogPosts.map((post) => post.path),
    '/insights',
  ]);
  for (const page of [...serviceAreaPages, ...contentPages]) {
    for (const link of page.related) {
      assert.ok(known.has(link.path), `${page.path} links to missing page ${link.path}`);
    }
  }
});

test('every spoke is reachable from its city hub, so none are orphaned', () => {
  const hubs = new Set(locationPages.map((page) => page.path));
  for (const page of serviceAreaPages) {
    assert.ok(
      hubs.has(`/web-software-developer-${page.citySlug}`),
      `${page.path} has no city hub to be linked from`,
    );
  }
});

test('answer blocks stay in the extractable length range for AI engines', () => {
  for (const page of [...serviceAreaPages, ...contentPages]) {
    const words = page.answer.trim().split(/\s+/).length;
    assert.ok(words >= 35 && words <= 90, `${page.path} answer block is ${words} words`);
  }
});

test('FAQ and breadcrumb schema is emitted for every new page', () => {
  for (const page of serviceAreaPages) {
    const nodes = createServiceAreaSchema(page);
    const types = nodes.map((node) => node['@type']);
    assert.deepEqual(types, ['Service', 'FAQPage', 'BreadcrumbList']);

    const faq = nodes[1] as { mainEntity: { name: string; acceptedAnswer: { text: string } }[] };
    assert.equal(faq.mainEntity.length, page.faqs.length);
    assert.ok(page.faqs.length >= 3, `${page.path} needs at least 3 FAQs to be worth marking up`);

    const breadcrumb = nodes[2] as { itemListElement: { position: number }[] };
    assert.deepEqual(
      breadcrumb.itemListElement.map((item) => item.position),
      [1, 2, 3],
    );
  }
  for (const page of contentPages) {
    const types = createContentPageSchema(page).map((node) => node['@type']);
    assert.deepEqual(types, ['FAQPage', 'BreadcrumbList']);
  }
});

test('no page claims a street address the studio cannot verify', () => {
  // BuiltbyGSV is remote with no verifiable premises. A PostalAddress carrying a
  // streetAddress or postalCode would be a fabricated local signal.
  const schema = JSON.stringify(createOrganizationSchema());
  assert.doesNotMatch(schema, /streetAddress/);
  assert.doesNotMatch(schema, /postalCode/);
  assert.doesNotMatch(schema, /"@type":"LocalBusiness"/);

  const serviceSchema = JSON.stringify(serviceAreaPages.map(createServiceAreaSchema));
  assert.doesNotMatch(serviceSchema, /streetAddress/);
});

test('review schema is only claimed when real testimonials exist', async () => {
  const { testimonials } = await import('../src/contentPages');
  const source = await readFile(new URL('../src/SiteRouter.tsx', import.meta.url), 'utf8');
  if (testimonials.length === 0) {
    assert.doesNotMatch(source, /aggregateRating|"Review"/);
  }
});

test('prerender emits the new page collections, sitemap and llms.txt from source', async () => {
  const prerender = await readFile(new URL('../scripts/prerender.ts', import.meta.url), 'utf8');
  assert.match(prerender, /serviceAreaPages\.map/);
  assert.match(prerender, /contentPages\.map/);
  assert.match(prerender, /sitemap\.xml/);
  assert.match(prerender, /llms\.txt/);
});
