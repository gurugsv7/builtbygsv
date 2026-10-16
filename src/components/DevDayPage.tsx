import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, ArrowUpRight, Check, Github, Linkedin, Mail, MessageCircle, QrCode, Share2, UserPlus, X } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { ProjectMarquee } from './visuals/ProjectMarquee';
import { ConceptCover } from './visuals/ConceptScreens';
import { PROJECTS } from '../data/mockData';
import { WORK_SUMMARIES } from '../data/studio';
import { projectTheme } from '../data/projectMedia';
import { brandEntity, SITE_URL } from '../seo';
import { EASE } from '../motion/tokens';
import { DEVDAY_PAGE } from '../content/devday';
import type { Project } from '../types';

const PAGE_URL = `${SITE_URL}${DEVDAY_PAGE.path}`;
const whatsapp = `https://wa.me/${brandEntity.phone.replace(/\D/g, '')}?text=${encodeURIComponent('Hi Guru, we met at DevDay!')}`;
const NOW_BUILDING = ['reelcut-ai-video-editor', 'campus-one-institute-portal'];

const open = (project: Project) => { window.location.href = `/projects/${project.id}`; };

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
    { href: whatsapp, label: 'WhatsApp', icon: MessageCircle, tone: 'bg-emerald-500 text-white', external: true },
    { href: brandEntity.linkedin, label: 'LinkedIn', icon: Linkedin, tone: 'bg-[#0A66C2] text-white', external: true },
    { href: brandEntity.github, label: 'GitHub', icon: Github, tone: 'bg-[#131921] text-white', external: true },
    { href: `mailto:${brandEntity.email}?subject=${encodeURIComponent('We met at DevDay')}`, label: 'Email', icon: Mail, tone: 'bg-[#E2F1ED] text-[#0F8B75]', external: false },
  ];

  return (
    <main className="relative min-h-screen overflow-x-clip bg-[#F8F9FA] font-sans text-[#131921] antialiased">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[28rem] bg-[radial-gradient(60%_60%_at_20%_0%,rgba(16,185,129,.18),transparent),radial-gradient(50%_60%_at_90%_10%,rgba(139,92,246,.16),transparent)]" />
      <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-5 sm:px-6 lg:px-10 lg:pt-8">
        <header className="flex items-center justify-between">
          <a href="/" aria-label="BuiltbyGSV home"><BrandLogo nameClassName="text-sm" /></a>
          <button type="button" onClick={share} className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-2 text-xs font-extrabold text-slate-700 shadow-2xs transition hover:border-slate-400">
            {copied ? <><Check className="h-3.5 w-3.5 text-[#0F8B75]" /> Link copied</> : <><Share2 className="h-3.5 w-3.5" /> Share</>}
          </button>
        </header>

        <section className="mt-8 grid gap-10 lg:mt-14 lg:grid-cols-[1.15fr_.85fr] lg:items-center">
          <div>
            <motion.p {...rise(0)} className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white/80 px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.14em] text-violet-600 backdrop-blur">
              <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-75" /><span className="relative inline-flex h-2 w-2 rounded-full bg-violet-500" /></span>
              DevDay · Hello 👋
            </motion.p>
            <motion.h1 {...rise(0.08)} className="mt-5 text-[2.4rem] font-extrabold leading-[1.04] tracking-tight sm:text-5xl lg:text-6xl">
              Great to meet you.<br />
              <span className="text-sheen font-serif font-normal italic">Let’s stay in touch.</span>
            </motion.h1>
            <motion.p {...rise(0.16)} className="mt-5 max-w-lg text-base leading-7 text-slate-600">
              I’m <strong className="text-[#131921]">{brandEntity.founderName}</strong>, founder of <strong className="text-[#131921]">BuiltbyGSV</strong>, a product & AI engineering studio. We build web platforms, custom software and AI products.
            </motion.p>

            <motion.div {...rise(0.24)} className="mt-7 flex flex-wrap gap-3">
              <a href="/gurusabarivasan.vcf" className="press group inline-flex items-center gap-2.5 rounded-full bg-[#09121F] py-3 pl-5 pr-2 text-sm font-extrabold text-white shadow-lg hover:bg-slate-800">
                <UserPlus className="h-4 w-4 text-emerald-400" /> Save my contact
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-400 text-[#09121F]"><ArrowRight className="nudge-r h-3.5 w-3.5" /></span>
              </a>
              <button type="button" onClick={() => setShowQr(true)} className="press inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-extrabold hover:border-slate-500 lg:hidden">
                <QrCode className="h-4 w-4" /> Show QR
              </button>
            </motion.div>

            <motion.ul {...rise(0.32)} className="mt-6 grid grid-cols-4 gap-2.5 sm:max-w-md" aria-label="Ways to connect">
              {channels.map(({ href, label, icon: Icon, tone, external }) => (
                <li key={label}>
                  <a href={href} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined}
                    className="group flex flex-col items-center gap-1.5 rounded-2xl border border-slate-200 bg-white p-3 text-[11px] font-extrabold shadow-2xs transition hover:-translate-y-0.5 hover:shadow-md active:scale-95">
                    <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${tone}`}><Icon className="h-5 w-5" /></span>
                    {label}
                  </a>
                </li>
              ))}
            </motion.ul>
          </div>

          <motion.button type="button" onClick={() => setShowQr(true)} aria-label="Enlarge the QR code for this page"
            initial={{ opacity: 0, scale: 0.94, rotate: -2 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 0.8, ease: EASE.out, delay: 0.2 }}
            className="group relative mx-auto hidden w-full max-w-sm rounded-[2rem] bg-[#09121F] p-6 text-left text-white shadow-2xl lg:block">
            <span aria-hidden="true" className="absolute -inset-px rounded-[2rem] bg-gradient-to-br from-emerald-400/40 via-transparent to-violet-500/40 opacity-60" />
            <span className="relative block rounded-2xl bg-white p-4 transition-transform duration-500 group-hover:scale-[1.02]">
              <img src="/devday-qr.svg" alt="" width={300} height={300} className="h-auto w-full" />
            </span>
            <span className="relative mt-4 flex items-center justify-between">
              <span><span className="block text-[10px] font-extrabold uppercase tracking-widest text-emerald-400">Scan to connect</span><span className="mt-0.5 block text-sm font-bold">builtbygsv.in/devday</span></span>
              <QrCode className="h-6 w-6 text-white/60" />
            </span>
          </motion.button>
        </section>

        <section className="mt-14 lg:mt-20" aria-labelledby="devday-building">
          <p className="font-mono text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#0F8B75]">In the lab right now</p>
          <h2 id="devday-building" className="mt-2 text-2xl font-extrabold tracking-tight lg:text-3xl">What I’m <span className="font-serif font-normal italic text-[#0F8B75]">building.</span></h2>
          <div className="mt-6 grid grid-cols-[minmax(0,1fr)] gap-5 md:grid-cols-2">
            {NOW_BUILDING.map((id, index) => {
              const project = PROJECTS.find((item) => item.id === id)!;
              const theme = projectTheme(id);
              return (
                <motion.a key={id} href={`/projects/${id}`} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.6, ease: EASE.out, delay: index * 0.1 }}
                  className="group block overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-2xs transition hover:-translate-y-1 hover:shadow-xl">
                  <span className="relative flex aspect-[16/10] items-center justify-center overflow-hidden px-6 pt-6" style={{ backgroundColor: theme.bg }}>
                    <span aria-hidden="true" className="absolute inset-0 opacity-20 [background-size:16px_16px]" style={{ backgroundImage: `radial-gradient(${theme.accent} 1px, transparent 1px)` }} />
                    <ConceptCover projectId={id} className="relative max-h-full w-full max-w-md transition-transform duration-700 group-hover:scale-[1.03]" />
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
            <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="press inline-flex items-center gap-2 rounded-full bg-emerald-400 px-5 py-3 text-sm font-extrabold text-[#09121F]"><MessageCircle className="h-4 w-4" /> Message me</a>
            <a href="/start-project" className="press inline-flex items-center gap-2 rounded-full bg-[#F5C748] px-5 py-3 text-sm font-extrabold text-[#09121F]">Start a Project <ArrowRight className="h-4 w-4" /></a>
          </div>
        </section>
      </div>

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
