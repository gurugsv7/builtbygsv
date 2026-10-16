import { useCallback, useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react';
import { AnimatePresence, motion, useAnimationFrame, useMotionValue, useReducedMotion } from 'motion/react';
import { ArrowUpRight, Cpu, Code2, Laptop, Linkedin, MessageCircle, Pause, Play, RotateCcw, UserPlus, Workflow, X } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { ConceptCover } from './visuals/ConceptScreens';
import { PROJECTS } from '../data/mockData';
import { CAPABILITIES, WORK_SUMMARIES } from '../data/studio';
import { projectMedia, projectTheme } from '../data/projectMedia';
import { brandEntity } from '../seo';
import { EASE } from '../motion/tokens';

/** How long each slide stays up before advancing, in ms. */
const SLIDE_MS = 6500;
const TOUR_PROJECTS = [
  'v2-productions', 'reelcut-ai-video-editor', 'campus-one-institute-portal', 'striatum-4-symposium-platform',
  'e-care-emergency-learning', 'karaikal-one', 'neon-rail', 'kamayuu-card-game', 'pulse-personal-finance-analyst',
];
type Slide = { kind: 'intro' } | { kind: 'project'; id: string } | { kind: 'services' } | { kind: 'contact' };
const SLIDES: Slide[] = [
  { kind: 'intro' },
  ...TOUR_PROJECTS.filter((id) => PROJECTS.some((project) => project.id === id)).map((id) => ({ kind: 'project' as const, id })),
  { kind: 'services' },
  { kind: 'contact' },
];

const whatsapp = `https://wa.me/${brandEntity.phone.replace(/\D/g, '')}?text=${encodeURIComponent('Hi Guru, we met at DevDay!')}`;
const slideBg = (slide: Slide) => slide.kind === 'project' ? projectTheme(slide.id).bg : slide.kind === 'services' ? '#E2F1ED' : '#09121F';
const slideDark = (slide: Slide) => slide.kind === 'project' ? Boolean(projectTheme(slide.id).dark) : slide.kind !== 'services';

const item = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, ease: EASE.out, delay },
});

/**
 * A full-screen, story-style tour of the studio for showing on a phone: progress bars
 * along the top, auto-advance, tap the edges to move, hold anywhere to pause.
 */
export function TourPage() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const progress = useMotionValue(0);
  const press = useRef<{ x: number; y: number; time: number } | null>(null);
  const reduce = useReducedMotion();
  const slide = SLIDES[index];
  const last = index === SLIDES.length - 1;

  const go = useCallback((next: number) => {
    const target = Math.max(0, Math.min(SLIDES.length - 1, next));
    setIndex((current) => { setDirection(target >= current ? 1 : -1); return target; });
    progress.set(0);
  }, [progress]);

  useAnimationFrame((_, delta) => {
    if (paused || last) return;
    const next = progress.get() + delta / SLIDE_MS;
    if (next >= 1) go(index + 1);
    else progress.set(next);
  });

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') go(index + 1);
      if (event.key === 'ArrowLeft') go(index - 1);
      if (event.key === ' ') { event.preventDefault(); setPaused((value) => !value); }
      if (event.key === 'Escape') close();
    };
    const onVisibility = () => setPaused(document.hidden);
    window.addEventListener('keydown', onKey);
    document.addEventListener('visibilitychange', onVisibility);
    return () => { window.removeEventListener('keydown', onKey); document.removeEventListener('visibilitychange', onVisibility); };
  }, [go, index]);

  // Preload the next slide's cover so it never pops in.
  useEffect(() => {
    const next = SLIDES[index + 1];
    const src = next?.kind === 'project' ? projectMedia[next.id]?.hero : undefined;
    if (src) { const image = new Image(); image.src = src; }
  }, [index]);

  const isControl = (target: EventTarget) => (target as HTMLElement).closest('a,button');
  const down = (event: ReactPointerEvent) => {
    if (isControl(event.target)) return;
    press.current = { x: event.clientX, y: event.clientY, time: performance.now() };
    setPaused(true);
  };
  const up = (event: ReactPointerEvent) => {
    const start = press.current;
    press.current = null;
    setPaused(false);
    if (!start || isControl(event.target)) return;
    const dx = event.clientX - start.x;
    if (Math.abs(dx) > 50) { go(index + (dx < 0 ? 1 : -1)); return; }
    if (performance.now() - start.time < 280) {
      const box = (event.currentTarget as HTMLElement).getBoundingClientRect();
      go(index + (event.clientX - box.left < box.width / 3 ? -1 : 1));
    }
  };

  const dark = slideDark(slide);

  return (
    <main className="fixed inset-0 flex justify-center bg-black font-sans text-white antialiased" aria-roledescription="carousel" aria-label="BuiltbyGSV tour">
      <motion.div className="relative h-full w-full max-w-[480px] touch-pan-y select-none overflow-hidden"
        animate={{ backgroundColor: slideBg(slide) }} transition={{ duration: 0.5 }}
        onPointerDown={down} onPointerUp={up} onPointerCancel={() => { press.current = null; setPaused(false); }}
        onContextMenu={(event) => event.preventDefault()}>

        <div className="absolute inset-x-0 top-0 z-30 px-3 pt-[max(0.75rem,env(safe-area-inset-top))]">
          <div className="flex gap-1">
            {SLIDES.map((_, i) => (
              <span key={i} className={`relative h-[3px] flex-1 overflow-hidden rounded-full ${dark ? 'bg-white/25' : 'bg-black/15'}`}>
                <motion.span className={`absolute inset-0 origin-left rounded-full ${dark ? 'bg-white' : 'bg-[#131921]'}`}
                  style={{ scaleX: i < index ? 1 : i === index ? (last ? 1 : progress) : 0 }} />
              </span>
            ))}
          </div>
          <div className="mt-3 flex items-center justify-between">
            <span className={`rounded-xl px-1.5 py-1 ${dark ? '' : 'bg-[#09121F]'}`}><BrandLogo nameClassName="text-xs !text-white" /></span>
            <div className="flex items-center gap-1">
              <button type="button" onClick={() => setPaused((value) => !value)} aria-label={paused ? 'Play' : 'Pause'}
                className={`flex h-9 w-9 items-center justify-center rounded-full ${dark ? 'text-white hover:bg-white/10' : 'text-[#131921] hover:bg-black/5'}`}>
                {paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
              </button>
              <button type="button" onClick={close} aria-label="Close tour"
                className={`flex h-9 w-9 items-center justify-center rounded-full ${dark ? 'text-white hover:bg-white/10' : 'text-[#131921] hover:bg-black/5'}`}>
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.section key={index} custom={direction} className="absolute inset-0 flex flex-col px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[calc(max(0.75rem,env(safe-area-inset-top))+4.5rem)]"
            variants={{ enter: (d: number) => ({ x: d * 60, opacity: 0 }), center: { x: 0, opacity: 1 }, exit: (d: number) => ({ x: d * -60, opacity: 0 }) }}
            initial="enter" animate="center" exit="exit" transition={{ duration: 0.4, ease: EASE.out }}
            aria-label={`Slide ${index + 1} of ${SLIDES.length}`}>
            {slide.kind === 'intro' && <IntroSlide />}
            {slide.kind === 'project' && <ProjectSlide id={slide.id} reduce={Boolean(reduce)} />}
            {slide.kind === 'services' && <ServicesSlide />}
            {slide.kind === 'contact' && <ContactSlide onReplay={() => go(0)} />}
          </motion.section>
        </AnimatePresence>

        <AnimatePresence>
          {paused && !last && (
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="pointer-events-none absolute bottom-[max(1rem,env(safe-area-inset-bottom))] left-1/2 z-30 -translate-x-1/2 rounded-full bg-black/70 px-3 py-1 text-[11px] font-bold text-white backdrop-blur">
              Paused
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </main>
  );
}

function close() {
  if (window.history.length > 1 && document.referrer.startsWith(window.location.origin)) window.history.back();
  else window.location.href = '/devday';
}

function IntroSlide() {
  const projects = PROJECTS.length;
  return (
    <div className="relative flex flex-1 flex-col justify-center">
      <motion.span aria-hidden="true" className="absolute -right-24 top-8 h-64 w-64 rounded-full bg-emerald-500/30 blur-3xl"
        animate={{ scale: [1, 1.2, 1], x: [0, -20, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} />
      <motion.span aria-hidden="true" className="absolute -left-24 bottom-24 h-64 w-64 rounded-full bg-violet-500/30 blur-3xl"
        animate={{ scale: [1.1, 0.9, 1.1], y: [0, -30, 0] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }} />
      <motion.p {...item(0.1)} className="relative text-5xl">👋</motion.p>
      <motion.h1 {...item(0.2)} className="relative mt-4 text-[2.6rem] font-extrabold leading-[1.05] tracking-tight">
        Hi, I’m Guru.<br /><span className="text-sheen font-serif font-normal italic">I build products.</span>
      </motion.h1>
      <motion.p {...item(0.35)} className="relative mt-5 text-base leading-7 text-slate-300">
        Founder of <strong className="text-white">BuiltbyGSV</strong>, a product & AI engineering studio. Web platforms, custom software and AI, built around real problems.
      </motion.p>
      <motion.dl {...item(0.5)} className="relative mt-8 grid grid-cols-3 gap-3">
        {[[String(projects), 'Products'], ['4', 'Capabilities'], ['AI', 'First']].map(([value, label]) => (
          <div key={label} className="rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur">
            <dd className="font-mono text-2xl font-extrabold">{value}</dd>
            <dt className="mt-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">{label}</dt>
          </div>
        ))}
      </motion.dl>
      <motion.p {...item(0.9)} className="relative mt-auto flex items-center justify-center gap-2 pt-6 text-xs font-bold text-slate-400">
        <motion.span animate={{ x: [0, 6, 0] }} transition={{ duration: 1.2, repeat: Infinity }}>👉</motion.span> Tap to see the work · hold to pause
      </motion.p>
    </div>
  );
}

function ProjectSlide({ id, reduce }: { id: string; reduce: boolean }) {
  const project = PROJECTS.find((entry) => entry.id === id)!;
  const theme = projectTheme(id);
  const hero = projectMedia[id]?.hero;
  const summary = WORK_SUMMARIES[id];
  const dark = Boolean(theme.dark);
  return (
    <div className={`flex flex-1 flex-col ${dark ? 'text-white' : 'text-[#131921]'}`}>
      <span aria-hidden="true" className="absolute inset-0 opacity-20 [background-size:18px_18px]" style={{ backgroundImage: `radial-gradient(${theme.accent} 1px, transparent 1px)` }} />
      <motion.p {...item(0.05)} className="relative text-[11px] font-extrabold uppercase tracking-[0.16em]" style={{ color: theme.accent }}>
        {project.detailData?.engagement} · {project.category} · {project.status}
      </motion.p>
      <motion.h2 {...item(0.12)} className="relative mt-2 text-[2.5rem] font-extrabold leading-none tracking-tight">{project.title}</motion.h2>
      <motion.p {...item(0.2)} className={`relative mt-3 text-[15px] leading-6 ${dark ? 'text-slate-300' : 'text-slate-600'}`}>{summary?.problem ?? project.subtitle}</motion.p>

      <div className="relative my-5 flex min-h-0 flex-1 items-center justify-center">
        <span aria-hidden="true" className="absolute inset-x-6 top-1/2 h-48 -translate-y-1/2 rounded-full opacity-40 blur-3xl" style={{ backgroundColor: theme.accent }} />
        <motion.div className="relative flex h-full w-full items-center justify-center"
          initial={{ opacity: 0, y: 30, scale: 0.92 }} animate={{ opacity: 1, y: 0, scale: reduce ? 1 : [0.92, 1, 1.05] }}
          transition={{ opacity: { duration: 0.5 }, y: { duration: 0.6, ease: EASE.out }, scale: { duration: SLIDE_MS / 1000, times: [0, 0.12, 1], ease: 'easeOut' } }}>
          {hero
            ? <img src={hero} alt={`${project.title} interface`} className="max-h-full w-full object-contain drop-shadow-2xl" draggable={false} />
            : <ConceptCover projectId={id} className="max-h-full w-full shadow-2xl" />}
        </motion.div>
      </div>

      <motion.div {...item(0.35)} className={`relative rounded-2xl p-4 backdrop-blur-md ${dark ? 'bg-white/10' : 'bg-white/80'}`}>
        <p className="font-mono text-[10px] font-bold uppercase tracking-wider" style={{ color: theme.accent }}>What we built</p>
        <p className="mt-1 text-sm font-semibold leading-6">{summary?.built ?? project.subtitle}</p>
        <div className="mt-3 flex items-center justify-between gap-3">
          <span className={`truncate font-mono text-[10px] font-bold ${dark ? 'text-slate-300' : 'text-slate-500'}`}>{project.tags.slice(0, 3).join(' · ')}</span>
          <a href={`/projects/${id}`} className="inline-flex shrink-0 items-center gap-1 rounded-full px-3 py-1.5 text-[11px] font-extrabold text-white" style={{ backgroundColor: theme.accent }}>
            Case study <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </motion.div>
    </div>
  );
}

const CAPABILITY_ICONS = { 'web-dev': Laptop, 'software-dev': Code2, 'ai-solutions': Cpu, automation: Workflow } as const;

function ServicesSlide() {
  return (
    <div className="flex flex-1 flex-col text-[#131921]">
      <motion.p {...item(0.05)} className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#0F8B75]">What we can build for you</motion.p>
      <motion.h2 {...item(0.12)} className="mt-2 text-[2.3rem] font-extrabold leading-[1.05] tracking-tight [@media(max-height:700px)]:text-[1.9rem]">
        From idea<br /><span className="font-serif font-normal italic text-[#0F8B75]">to shipped product.</span>
      </motion.h2>
      <div className="mt-5 flex min-h-0 flex-1 flex-col justify-center gap-2.5">
        {CAPABILITIES.map((capability, i) => {
          const Icon = CAPABILITY_ICONS[capability.id];
          return (
            <motion.div key={capability.id} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, ease: EASE.out, delay: 0.25 + i * 0.12 }}
              className="rounded-2xl border border-[#0F8B75]/15 bg-white p-3.5 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0F8B75] text-white"><Icon className="h-5 w-5" /></span>
                <div className="min-w-0">
                  <p className="text-base font-extrabold">{capability.title}</p>
                  <p className="mt-0.5 line-clamp-1 text-xs leading-5 text-slate-600 [@media(max-height:700px)]:hidden">{capability.description}</p>
                </div>
              </div>
              <div className="mt-2.5 flex flex-wrap items-center gap-1 [@media(max-height:700px)]:hidden">
                {capability.flow.map((step, s) => (
                  <motion.span key={step} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6 + i * 0.12 + s * 0.08 }}
                    className="flex items-center gap-1 text-[10px] font-bold text-[#0F8B75]">
                    {s > 0 && <span className="text-slate-300">→</span>}<span className="rounded-full bg-[#E2F1ED] px-2 py-0.5">{step}</span>
                  </motion.span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function ContactSlide({ onReplay }: { onReplay: () => void }) {
  return (
    <div className="flex flex-1 flex-col items-center text-center">
      <motion.h2 {...item(0.05)} className="text-[2.2rem] font-extrabold leading-[1.05] tracking-tight [@media(max-height:700px)]:text-[1.75rem]">
        Let’s build<br /><span className="text-sheen font-serif font-normal italic">something together.</span>
      </motion.h2>
      <motion.div className="my-4 flex min-h-0 w-full flex-1 items-center justify-center"
        initial={{ opacity: 0, scale: 0.85, rotate: -3 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ type: 'spring', stiffness: 220, damping: 20, delay: 0.15 }}>
        <div className="aspect-square rounded-[1.75rem] bg-white p-4 shadow-[0_0_60px_rgba(16,185,129,.35)]" style={{ height: 'min(18rem, 32dvh)' }}>
          <img src="/devday-qr.svg" alt="QR code linking to builtbygsv.in/devday" className="h-full w-full" draggable={false} />
        </div>
      </motion.div>
      <motion.p {...item(0.3)} className="text-sm font-bold text-slate-300">Scan to save my contact · builtbygsv.in/devday</motion.p>
      <motion.div {...item(0.4)} className="mt-5 grid w-full grid-cols-2 gap-2.5">
        <a href="/gurusabarivasan.vcf" className="col-span-2 flex items-center justify-center gap-2 rounded-2xl bg-emerald-400 py-3.5 text-sm font-extrabold text-[#09121F]"><UserPlus className="h-4 w-4" /> Save my contact</a>
        <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-2xl bg-white/10 py-3 text-sm font-bold"><MessageCircle className="h-4 w-4" /> WhatsApp</a>
        <a href={brandEntity.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-2xl bg-white/10 py-3 text-sm font-bold"><Linkedin className="h-4 w-4" /> LinkedIn</a>
      </motion.div>
      <button type="button" onClick={onReplay} className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-slate-400"><RotateCcw className="h-3.5 w-3.5" /> Replay tour</button>
    </div>
  );
}
