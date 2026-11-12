import { ArrowUpRight, ShieldCheck } from 'lucide-react';
import { BUSINESS_REGISTRATION as registration, AUDIT_METHOD, EXCLUDED_EVIDENCE_PROJECTS, type WebsiteAudit } from '../data/credibility';
import auditData from '../data/websiteAudits.json';
import { PROJECTS } from '../data/mockData';
import { brandEntity } from '../seo';

const audits = (auditData as WebsiteAudit[]).filter(audit => !EXCLUDED_EVIDENCE_PROJECTS.includes(audit.id));
const linkStyle = 'inline-flex items-center gap-2 font-bold text-[#087260] underline underline-offset-4';
const date = (value: string) => new Date(value).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Asia/Kolkata' });

export function TrustPage() {
  return <main className="mx-auto max-w-6xl px-4 py-8 text-[#131921] sm:px-8 lg:py-16">
    <a href="/" className={linkStyle}>BuiltbyGSV / Home</a>
    <header className="my-10 max-w-3xl">
      <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#087260]"><ShieldCheck className="h-4 w-4" />Business details &amp; delivery evidence</p>
      <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-6xl">Know who you’re<br /><span className="font-serif font-normal italic text-[#087260]">building with.</span></h1>
      <p className="mt-6 text-base leading-8 text-slate-600">BuiltbyGSV is a product and AI engineering studio founded by {brandEntity.founderName}, based in Karaikal, Puducherry, India. Explore our registration details, inspect our work and review dated website quality reports.</p>
    </header>
    <section aria-labelledby="registration-heading">
      <h2 id="registration-heading" className="text-2xl font-extrabold">Business registration</h2>
      <p className="mt-3 text-sm leading-7 text-slate-600">Details reviewed on {date(registration.reviewedDate)} against our Udyam certificate and registration emails. Use the government portals for the latest record. Registration identifies the enterprise; it is not a government endorsement of our services.</p>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <article className="rounded-2xl border border-slate-200 bg-white p-6">
          <p className="text-xs font-bold uppercase tracking-widest text-[#087260]">MSME / Udyam registration</p>
          <h3 className="mt-3 text-xl font-extrabold">{registration.enterpriseName}</h3>
          <p className="mt-4 break-words font-mono text-base font-bold">{registration.udyamNumber}</p>
          <p className="my-4 text-sm leading-7 text-slate-600">Registered {date(registration.udyamDate)}. Certificate classification: {registration.classification} enterprise, {registration.classificationYear}. Major activity: services.</p>
          <a href={registration.udyamPortal} target="_blank" rel="noopener noreferrer" className={linkStyle}>Verify on Udyam <ArrowUpRight className="h-4 w-4" /></a>
          <p className="mt-3 text-xs leading-6 text-slate-500">Choose Print/Verify → Verify Udyam Registration and enter the number above. The portal may require a CAPTCHA.</p>
        </article>
        <article className="rounded-2xl border border-slate-200 bg-white p-6">
          <p className="text-xs font-bold uppercase tracking-widest text-[#087260]">Goods and Services Tax</p>
          <h3 className="mt-3 text-xl font-extrabold">GST registration</h3>
          <p className="mt-4 break-words font-mono text-base font-bold">{registration.gstin}</p>
          <p className="my-4 text-sm leading-7 text-slate-600">Registration approval communicated by GSTN on {date(registration.gstApprovalDate)} for Puducherry. This page does not provide a live tax-compliance status.</p>
          <a href={registration.gstPortal} target="_blank" rel="noopener noreferrer" className={linkStyle}>Check GST taxpayer record <ArrowUpRight className="h-4 w-4" /></a>
          <p className="mt-3 text-xs leading-6 text-slate-500">Enter the GSTIN in the official Search Taxpayer service to check the legal name, trade name and current registration status.</p>
        </article>
      </div>
    </section>
    <section id="audits" aria-labelledby="audits-heading" className="mt-14 scroll-mt-6">
      <h2 id="audits-heading" className="text-2xl font-extrabold">Website quality, with the reports attached.</h2>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">{AUDIT_METHOD} Performance, accessibility, best practices and technical SEO are scored out of 100. An automated accessibility score is not a full accessibility assessment.</p>
      {!audits.length && <p className="mt-6 rounded-xl border border-slate-200 p-5 text-sm">No completed audits published yet. Open any case study below to inspect the work.</p>}
      <div className="mt-6 grid gap-4 lg:grid-cols-2">{audits.map(audit => <article key={`${audit.id}-${audit.strategy}`} className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-2"><h3 className="text-lg font-extrabold">{audit.title}</h3><span className="rounded-full bg-[#E2F1ED] px-3 py-1 text-xs font-bold capitalize">{audit.strategy}</span></div>
        <p className="mt-2 text-xs text-slate-500">{audit.engagement} · {date(audit.checkedAt)}</p>
        <a href={audit.url} target="_blank" rel="noopener noreferrer" className="mt-3 block break-all text-xs font-semibold text-[#087260] underline">{audit.url}</a>
        {audit.status === 'complete' && audit.scores ? <><dl className="my-5 grid grid-cols-2 gap-3 sm:grid-cols-4">{Object.entries(audit.scores).map(([key, score]) => <div key={key} className="rounded-xl bg-slate-50 p-3"><dt className="text-[11px] font-semibold text-slate-600">{{ performance: 'Performance', accessibility: 'Accessibility', bestPractices: 'Best practices', seo: 'SEO' }[key]}</dt><dd className={`mt-1 text-2xl font-extrabold ${score >= 90 ? 'text-[#087260]' : score >= 50 ? 'text-amber-800' : 'text-red-700'}`}>{score}<span className="text-xs font-normal text-slate-500">/100</span></dd></div>)}</dl>
          {audit.metrics && <p className="mb-4 text-xs leading-6 text-slate-600">LCP {audit.metrics.lcp} · CLS {audit.metrics.cls} · TBT {audit.metrics.tbt} · FCP {audit.metrics.fcp}</p>}
          <p className="mb-3 text-xs text-slate-500">Lighthouse {audit.lighthouseVersion} · Lab data</p>
          {audit.report && <a href={audit.report} className={linkStyle}>Read the audit report <ArrowUpRight className="h-4 w-4" /></a>}
        </> : <p className="my-5 rounded-xl bg-slate-50 p-4 text-sm leading-7 text-slate-600">Audit unavailable. {audit.message} No score is claimed.</p>}
        {audit.projectId && <a href={`/projects/${audit.projectId}`} className="mt-4 block text-xs font-bold text-[#087260] underline underline-offset-4">Project scope &amp; case study</a>}
      </article>)}</div>
      <p className="mt-5 text-xs leading-6 text-slate-500">LCP: largest contentful paint. CLS: cumulative layout shift. TBT: total blocking time. FCP: first contentful paint. These lab measurements do not establish a field Core Web Vitals pass.</p>
    </section>
    <section className="mt-14" aria-labelledby="work-heading"><h2 id="work-heading" className="text-2xl font-extrabold">Inspect the work and its scope</h2><p className="mt-3 text-sm leading-7 text-slate-600">Client engagements, studio products and concept prototypes are identified in each case study. Private and unpublished projects have no public website score.</p><ul className="mt-5 divide-y divide-slate-200">{PROJECTS.filter(project => !EXCLUDED_EVIDENCE_PROJECTS.includes(project.id)).map(project => <li key={project.id} className="flex flex-wrap items-center justify-between gap-2 py-4"><a href={`/projects/${project.id}`} className={linkStyle}>{project.title}<ArrowUpRight className="h-4 w-4" /></a><span className="text-xs text-slate-600">{project.detailData?.engagement} · {project.status}</span></li>)}</ul></section>
    <section className="my-12 rounded-2xl bg-[#09121F] p-6 text-white"><h2 className="text-2xl font-extrabold">Talk directly to the studio.</h2><p className="mt-3 text-sm leading-7 text-slate-300">Ask about project scope, ownership, delivery milestones or supporting business documents before you commit.</p><a href={`mailto:${brandEntity.email}`} className="mt-5 inline-flex break-all font-bold text-emerald-300 underline underline-offset-4">{brandEntity.email}</a></section>
  </main>;
}
