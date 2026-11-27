/**
 * Prepares dist/ for Cloudflare Pages, using vercel.json as the single source of
 * truth for headers and redirects so both hosts behave the same.
 *
 * 1. Flattens dist/<route>/index.html to dist/<route>.html. Pages serves "/route"
 *    from route.html, but redirects "/route" to "/route/" when only a directory index
 *    exists, which would break every canonical URL (they have no trailing slash).
 * 2. Writes dist/_headers from vercel.json "headers".
 * 3. Writes dist/_redirects from vercel.json path redirects. Host-based redirects
 *    (apex -> www, the legacy domain) cannot be expressed in _redirects; they belong in
 *    Cloudflare Redirect Rules on the zone (see DEPLOYMENT.md).
 */
import { readdir, readFile, rename, rmdir, stat, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';

type VercelConfig = {
  redirects: { source: string; destination: string; permanent?: boolean; has?: unknown[] }[];
  headers: { source: string; headers: { key: string; value: string }[] }[];
};

const dist = resolve('dist');
const config = JSON.parse(await readFile(resolve('vercel.json'), 'utf8')) as VercelConfig;

/** vercel.json uses path-to-regexp ("/(.*)", "/:path*"); Pages uses "*" and ":name". */
export const toPagesPattern = (source: string) =>
  source.replace(/\/\(\.\*\)$/, '/*').replace(/\/:(\w+)\*$/, '/*');

async function flatten(dir: string): Promise<number> {
  let moved = 0;
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const child = join(dir, entry.name);
    moved += await flatten(child);
    const index = join(child, 'index.html');
    if (await stat(index).then(() => true, () => false)) {
      await rename(index, `${child}.html`);
      moved += 1;
      if ((await readdir(child)).length === 0) await rmdir(child);
    }
  }
  return moved;
}

const flattened = await flatten(dist);

// Headers: Pages merges every matching block, so a later, more specific CSP must
// first detach the global one with "! Header-Name" instead of overriding it.
const globalKeys = new Set(config.headers.find((rule) => rule.source === '/(.*)')?.headers.map((h) => h.key) ?? []);
const headerBlocks = config.headers.map((rule) => {
  const pattern = toPagesPattern(rule.source);
  const lines = rule.headers.flatMap(({ key, value }) =>
    rule.source !== '/(.*)' && globalKeys.has(key) ? [`  ! ${key}`, `  ${key}: ${value}`] : [`  ${key}: ${value}`]);
  return [pattern, ...lines].join('\n');
});
await writeFile(join(dist, '_headers'), `${headerBlocks.join('\n\n')}\n`);

const redirectLines = config.redirects
  .filter((rule) => !rule.has)
  .map((rule) => `${toPagesPattern(rule.source)} ${rule.destination} ${rule.permanent === false ? 302 : 301}`);
await writeFile(join(dist, '_redirects'), `${redirectLines.join('\n')}\n`);

console.log(`Cloudflare Pages: flattened ${flattened} routes, ${headerBlocks.length} header rules, ${redirectLines.length} redirects.`);
