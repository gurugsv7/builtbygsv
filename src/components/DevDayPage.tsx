import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, ArrowUpRight, Check, Play, QrCode, Share2, UserPlus, X } from 'lucide-react';
import { BrandMark, BrandTile, WhatsappMark, type BrandName } from './BrandIcons';
import { BrandLogo } from './BrandLogo';
import { ProjectMarquee } from './visuals/ProjectMarquee';
import { ConceptCover } from './visuals/ConceptScreens';
import { PROJECTS } from '../data/mockData';
import { WORK_SUMMARIES } from '../data/studio';
import { projectMedia, projectTheme } from '../data/projectMedia';
import { brandEntity, SITE_URL } from '../seo';
import { EASE } from '../motion/tokens';
import { DrawnUnderline } from '../motion/primitives';
import { DEVDAY_PAGE } from '../content/devday';
import { caseStudyHref } from '../returnTo';
import type { Project } from '../types';

const PAGE_URL = `${SITE_URL}${DEVDAY_PAGE.path}`;
const whatsapp = `https://wa.me/${brandEntity.phone.replace(/\D/g, '')}?text=${encodeURIComponent('Hi Guru, we met at DevDay!')}`;
const FEATURED = ['kamayuu-card-game', 'reelcut-ai-video-editor'];

const open = (project: Project) => { window.location.href = caseStudyHref(project.id, 'devday'); };

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: EASE.out, delay },
});

/**
 * Event landing page for people met at DevDay: one tap to save the contact or start a
 * chat, a QR that can be shown from a phone or laptop, and the current work.
 */
export function DevDayPage() {
  const [showQr, setShowQr] = useState(false);
  const [copied, setCopied] = useState(false);

  const share = async () => {
    try {
      if (navigator.share) { await navigator.share({ title: 'BuiltbyGSV', text: 'Gurusabarivasan · BuiltbyGSV', url: PAGE_URL }); return; }
      await navigator.clipboard.writeText(PAGE_URL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch { /* the user dismissed the share sheet */ }
  };

  const channels = [
    { href: whatsapp, label: 'WhatsApp', brand: 'whatsapp' },
    { href: brandEntity.instagram, label: 'Instagram', brand: 'instagram' },
    { href: brandEntity.linkedin, label: 'LinkedIn', brand: 'linkedin' },
    { href: brandEntity.x, label: 'X', brand: 'x' },
    { href: brandEntity.github, label: 'GitHub', brand: 'github' },
  ] satisfies { href: string; label: string; brand: BrandName }[];

  return (
    <main className="relative min-h-screen overflow-x-clip bg-[#F8F9FA] pb-24 font-sans text-[#131921] antialiased lg:pb-0">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[26rem] bg-[radial-gradient(#131921_1px,transparent_1px)] opacity-[0.07] [background-size:18px_18px] [mask-image:linear-gradient(#000,transparent)]" />
      <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-5 sm:px-6 lg:px-10 lg:pt-8">
        <header className="flex items-center justify-between">
          <a href="/" aria-label="BuiltbyGSV home"><BrandLogo nameClassName="text-sm" /></a>
          <button type="button" onClick={share} className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-2 text-xs font-extrabold text-slate-700 shadow-2xs transition hover:border-slate-400">
            {copied ? <><Check className="h-3.5 w-3.5 text-[#0F8B75]" /> Link copied</> : <><Share2 className="h-3.5 w-3.5" /> Share</>}
          </button>
        </header>

        <section className="mt-8 grid gap-10 lg:mt-14 lg:grid-cols-[1.15fr_.85fr] lg:items-center">
          <div>
            <motion.p {...rise(0)} className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#0F8B75]">
              DevDay · We just met
            </motion.p>
            <motion.h1 {...rise(0.08)} className="mt-5 text-[2.4rem] font-extrabold leading-[1.04] tracking-tight sm:text-5xl lg:text-6xl">
              Great to meet you.<br />
              <span className="relative inline-block font-serif font-normal italic text-[#0F8B75]">Let’s stay in touch.<DrawnUnderline className="-bottom-1.5 h-3.5" delay={0.6} /></span>
            </motion.h1>
            <motion.p {...rise(0.16)} className="mt-5 max-w-lg text-base leading-7 text-slate-600">
              I’m <strong className="text-[#131921]">{brandEntity.founderName}</strong>, founder of <strong className="text-[#131921]">BuiltbyGSV</strong>, a product & AI engineering studio. We build web platforms, custom software and AI products.
            </motion.p>

            <motion.div {...rise(0.24)} className="mt-7 flex flex-wrap gap-3">
              <a href="/gurusabarivasan.vcf" className="press group inline-flex items-center gap-2.5 rounded-full bg-[#09121F] py-3 pl-5 pr-2 text-sm font-extrabold text-white shadow-lg hover:bg-slate-800">
                <UserPlus className="h-4 w-4 text-[#F5C748]" /> Save my contact
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#F5C748] text-[#131921]"><ArrowRight className="nudge-r h-3.5 w-3.5" /></span>
              </a>
              <a href="/tour" className="press inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-extrabold text-[#131921] hover:border-slate-500">
                <Play className="h-3.5 w-3.5 fill-current" /> 1-min tour
              </a>
              <a href="/connect" className="press inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-extrabold text-[#131921] hover:border-slate-500">
                <BrandMark name="linkedin" className="h-3.5 w-3.5" /><BrandMark name="x" className="h-3 w-3" /> Connect
              </a>
            </motion.div>

            <motion.ul {...rise(0.32)} className="mt-6 grid grid-cols-5 gap-2 sm:max-w-lg" aria-label="Ways to connect">
              {channels.map(({ href, label, brand }) => (
                <li key={label}>
                  <a href={href} target="_blank" rel="noopener noreferrer"
                    className="group flex flex-col items-center gap-1.5 rounded-2xl border border-slate-200 bg-white p-3 text-[11px] font-extrabold shadow-2xs transition hover:-translate-y-0.5 hover:shadow-md active:scale-95">
                    <BrandTile name={brand} className="h-10 w-10" />
                    {label}
                  </a>
                </li>
              ))}
            </motion.ul>
          </div>

          <motion.button type="button" onClick={() => setShowQr(true)} aria-label="Enlarge the QR code for this page"
            initial={{ opacity: 0, scale: 0.94, rotate: -2 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 0.8, ease: EASE.out, delay: 0.2 }}
            className="group relative mx-auto hidden w-full max-w-sm rounded-[2rem] bg-[#131921] p-6 text-left text-white shadow-xl lg:block">
            <span className="relative block rounded-2xl bg-white p-4 transition-transform duration-500 group-hover:scale-[1.02]">
              <img src="/devday-qr.svg" alt="" width={300} height={300} className="h-auto w-full" />
            </span>
            <span className="relative mt-4 flex items-center justify-between">
              <span><span className="block font-mono text-[10px] font-bold uppercase tracking-widest text-[#F5C748]">Scan to connect</span><span className="mt-0.5 block text-sm font-bold">builtbygsv.in/devday</span></span>
              <QrCode className="h-6 w-6 text-white/60" />
            </span>
          </motion.button>
        </section>

        <section className="mt-14 lg:mt-20" aria-labelledby="devday-building">
          <p className="font-mono text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#0F8B75]">Shipped and in the lab</p>
          <h2 id="devday-building" className="mt-2 text-2xl font-extrabold tracking-tight lg:text-3xl">Start <span className="font-serif font-normal italic text-[#0F8B75]">here.</span></h2>
          <div className="mt-6 grid grid-cols-[minmax(0,1fr)] gap-5 md:grid-cols-2">
            {FEATURED.map((id, index) => {
              const project = PROJECTS.find((item) => item.id === id)!;
              const theme = projectTheme(id);
              return (
                <motion.a key={id} href={caseStudyHref(id, 'devday')} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.6, ease: EASE.out, delay: index * 0.1 }}
                  className="group block overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-2xs transition hover:-translate-y-1 hover:shadow-xl">
                  <span className="relative flex aspect-[16/10] items-center justify-center overflow-hidden px-6 pt-6" style={{ backgroundColor: theme.bg }}>
                    <span aria-hidden="true" className="absolute inset-0 opacity-20 [background-size:16px_16px]" style={{ backgroundImage: `radial-gradient(${theme.accent} 1px, transparent 1px)` }} />
                    {projectMedia[id]?.hero
                      ? <img src={projectMedia[id].hero} alt={`${project.title} interface`} loading="lazy" className="relative max-h-full w-full object-contain drop-shadow-xl transition-transform duration-700 group-hover:scale-[1.03]" />
                      : <ConceptCover projectId={id} peek={0.6} className="relative h-full w-full transition-transform duration-700 group-hover:scale-[1.03]" />}
                  </span>
                  <span className="flex items-center justify-between gap-4 p-5">
                    <span className="min-w-0">
                      <span className="block text-[10px] font-extrabold uppercase tracking-widest" style={{ color: theme.accent }}>{project.category} · {project.status}</span>
                      <span className="mt-1 block text-xl font-extrabold">{project.title}</span>
                      <span className="mt-1 line-clamp-2 block text-sm leading-6 text-slate-600">{WORK_SUMMARIES[id]?.built}</span>
                    </span>
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white transition-transform group-hover:-rotate-45" style={{ backgroundColor: theme.accent }}><ArrowRight className="h-4 w-4" /></span>
                  </span>
                </motion.a>
              );
            })}
          </div>
        </section>

        <section className="mt-14" aria-labelledby="devday-work">
          <div className="flex items-end justify-between gap-4">
            <h2 id="devday-work" className="text-2xl font-extrabold tracking-tight lg:text-3xl">More from the <span className="font-serif font-normal italic text-[#0F8B75]">studio.</span></h2>
            <a href="/projects" className="group inline-flex shrink-0 items-center gap-1 text-xs font-bold text-[#0F8B75]"><span className="u-link">All work</span> <ArrowUpRight className="nudge-ur h-3.5 w-3.5" /></a>
          </div>
          <div className="mt-5"><ProjectMarquee onOpenProjectDetail={open} /></div>
        </section>

        <section className="brush-banner-dark mt-14 flex flex-col gap-5 p-7 text-white sm:flex-row sm:items-center sm:justify-between lg:p-10">
          <div>
            <h2 className="text-2xl font-extrabold lg:text-3xl">Got an idea worth building?</h2>
            <p className="mt-2 text-sm text-slate-300">Tell me the problem. We’ll shape the right first version together.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="press inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-3 text-sm font-extrabold text-white"><WhatsappMark className="h-4 w-4 text-[#25D366]" /> Message me</a>
            <a href="/start-project" className="press inline-flex items-center gap-2 rounded-full bg-[#F5C748] px-5 py-3 text-sm font-extrabold text-[#09121F]">Start a Project <ArrowRight className="h-4 w-4" /></a>
          </div>
        </section>
      </div>

      <motion.nav aria-label="Quick actions" initial={{ y: 100 }} animate={{ y: 0 }} transition={{ type: 'spring', stiffness: 260, damping: 26, delay: 0.6 }}
        className="fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-40 grid grid-cols-[1.6fr_1fr_1fr_1fr] gap-1.5 rounded-[1.4rem] border border-white/10 bg-[#131921]/95 p-1.5 shadow-2xl backdrop-blur-md lg:hidden">
        <a href="/gurusabarivasan.vcf" className="flex items-center justify-center gap-1.5 rounded-2xl bg-[#F5C748] py-3 text-xs font-extrabold text-[#131921] active:scale-95"><UserPlus className="h-4 w-4" /> Save contact</a>
        <a href={whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="flex flex-col items-center justify-center gap-0.5 rounded-2xl py-1.5 text-[10px] font-bold text-white active:scale-95"><WhatsappMark className="h-4 w-4 text-[#25D366]" /> Chat</a>
        <button type="button" onClick={() => setShowQr(true)} className="flex flex-col items-center justify-center gap-0.5 rounded-2xl py-1.5 text-[10px] font-bold text-white active:scale-95"><QrCode className="h-4 w-4" /> QR</button>
        <a href="/tour" className="flex flex-col items-center justify-center gap-0.5 rounded-2xl py-1.5 text-[10px] font-bold text-white active:scale-95"><Play className="h-4 w-4" /> Tour</a>
      </motion.nav>

      <AnimatePresence>
        {showQr && (
          <motion.div role="dialog" aria-modal="true" aria-label="QR code for this page" className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#09121F]/95 p-6 backdrop-blur"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowQr(false)}>
            <motion.div className="w-full max-w-sm rounded-[2rem] bg-white p-5 shadow-2xl" initial={{ scale: 0.85, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}>
              <img src="/devday-qr.svg" alt="QR code linking to builtbygsv.in/devday" className="h-auto w-full" />
              <p className="mt-3 text-center text-sm font-extrabold text-[#131921]">Scan to save my contact</p>
              <p className="text-center font-mono text-xs text-slate-500">builtbygsv.in/devday</p>
            </motion.div>
            <button type="button" onClick={() => setShowQr(false)} className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-white"><X className="h-4 w-4" /> Close</button>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
