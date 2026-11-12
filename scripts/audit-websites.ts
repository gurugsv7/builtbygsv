import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import { resolve } from 'node:path';
import { PROJECTS } from '../src/data/mockData.ts';
import { SITE_URL } from '../src/seo.ts';
import type { WebsiteAudit } from '../src/data/credibility.ts';
import { EXCLUDED_EVIDENCE_PROJECTS } from '../src/data/credibility.ts';

// Override CHROME_PATH if Chrome/Edge is installed elsewhere. No browser is downloaded.
process.env.CHROME_PATH ??= 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const output = resolve('public/audits');
await mkdir(output, { recursive: true });
const targets = [
  { id: 'builtbygsv', title: 'BuiltbyGSV', url: SITE_URL, engagement: 'Studio website' },
  ...PROJECTS.filter(p => p.detailData?.liveUrl && !EXCLUDED_EVIDENCE_PROJECTS.includes(p.id)).map(p => ({
    id: p.id, title: p.title, url: p.detailData!.liveUrl!, projectId: p.id,
    engagement: p.detailData?.engagement ?? 'Portfolio project',
  })),
];
const selectedId = process.argv[2];
const auditTargets = selectedId ? targets.filter(target => target.id === selectedId) : targets;
if (!auditTargets.length) throw new Error(`Unknown public audit target: ${selectedId}`);
const results: WebsiteAudit[] = selectedId
  ? (JSON.parse(await readFile('src/data/websiteAudits.json', 'utf8')) as WebsiteAudit[])
      .filter(audit => audit.id !== selectedId && !EXCLUDED_EVIDENCE_PROJECTS.includes(audit.id))
  : [];
for (const target of auditTargets) {
  for (const strategy of ['mobile', 'desktop'] as const) {
    const entry: WebsiteAudit = { ...target, strategy, checkedAt: new Date().toISOString(), status: 'unavailable' };
    const name = `${target.id}-${strategy}`;
    try {
      const response = await fetch(target.url, { signal: AbortSignal.timeout(25000) });
      if (!response.ok) throw new Error(`Public page returned HTTP ${response.status}.`);
      const args = [resolve('node_modules/lighthouse/cli/index.js'), target.url,
        '--chrome-flags=--headless --disable-gpu', '--only-categories=performance,accessibility,best-practices,seo',
        '--output=json', '--output=html', `--output-path=${resolve(output, name)}`, '--quiet'];
      if (strategy === 'desktop') args.push('--preset=desktop');
      await new Promise<void>((accept, reject) => {
        const child = spawn(process.execPath, args, { windowsHide: true, stdio: ['ignore', 'ignore', 'pipe'], timeout: 150000 });
        let error = '';
        child.stderr.on('data', chunk => { error = (error + String(chunk)).slice(-1200); });
        child.on('error', reject);
        child.on('close', code => code === 0 ? accept() : reject(new Error(error || `Lighthouse exited ${code}.`)));
      });
      const report = JSON.parse(await readFile(resolve(output, `${name}.report.json`), 'utf8'));
      const htmlPath = resolve(output, `${name}.report.html`);
      await writeFile(htmlPath, (await readFile(htmlPath, 'utf8')).replace(/^[ \t]+$/gm, ''));
      if (report.runtimeError) throw new Error(report.runtimeError.message);
      if (report.audits['errors-in-console']?.details?.items?.some((item: { source?: string }) => item.source === 'exception')) {
        throw new Error('The page threw a JavaScript exception during the audit; do not publish a score for a broken page.');
      }
      const finalUrl = new URL(report.finalDisplayedUrl ?? report.finalUrl);
      if (finalUrl.hostname !== new URL(target.url).hostname) throw new Error('Page redirected to a different host; review access before publishing a score.');
      const categories = report.categories;
      for (const key of ['performance', 'accessibility', 'best-practices', 'seo']) {
        if (typeof categories[key]?.score !== 'number') throw new Error(`Missing ${key} score.`);
      }
      Object.assign(entry, {
        status: 'complete', checkedAt: report.fetchTime, finalUrl: finalUrl.href, lighthouseVersion: report.lighthouseVersion,
        report: `/audits/${name}.report.html`,
        scores: { performance: Math.round(categories.performance.score * 100), accessibility: Math.round(categories.accessibility.score * 100), bestPractices: Math.round(categories['best-practices'].score * 100), seo: Math.round(categories.seo.score * 100) },
        metrics: { lcp: report.audits['largest-contentful-paint'].displayValue, cls: report.audits['cumulative-layout-shift'].displayValue, tbt: report.audits['total-blocking-time'].displayValue, fcp: report.audits['first-contentful-paint'].displayValue },
      });
    } catch (error) {
      // Keep private diagnostic text out of the public dataset.
      console.error(`${name}: ${String(error).slice(0, 400)}`);
      entry.message = 'The public page could not be audited successfully from this test environment. It may require access or be temporarily unavailable.';
    }
    results.push(entry);
    await writeFile(resolve('src/data/websiteAudits.json'), JSON.stringify(results, null, 2) + '\n');
    console.log(`${name}: ${entry.status}${entry.scores ? ` ${JSON.stringify(entry.scores)}` : ''}`);
  }
}
