import { useCallback, useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react';
import { AnimatePresence, motion, useAnimationFrame, useMotionValue, useReducedMotion } from 'motion/react';
import { ArrowRight, ArrowUpRight, Linkedin, MessageCircle, Pause, Play, RotateCcw, UserPlus, X } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { ConceptCover } from './visuals/ConceptScreens';
import { PROJECTS } from '../data/mockData';
import { CAPABILITIES, WORK_SUMMARIES } from '../data/studio';
import { projectMedia, projectTheme } from '../data/projectMedia';
import { brandEntity } from '../seo';
import { EASE } from '../motion/tokens';
import { DrawnUnderline } from '../motion/primitives';

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
const PAPER = '#F4F1EA';
const slideBg = (slide: Slide) => slide.kind === 'project' ? projectTheme(slide.id).bg : slide.kind === 'contact' ? '#131921' : PAPER;
const slideDark = (slide: Slide) => slide.kind === 'project' ? Boolean(projectTheme(slide.id).dark) : slide.kind === 'contact';

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
    <main className="fixed inset-0 flex justify-center bg-[#131921] font-sans text-white antialiased" aria-roledescription="carousel" aria-label="BuiltbyGSV tour">
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
            <BrandLogo nameClassName={dark ? 'text-xs !text-white' : 'text-xs'} />
            <div className="flex items-center gap-1">
              <span className={`mr-1 font-mono text-[11px] font-bold ${dark ? 'text-white/60' : 'text-[#64748B]'}`}>{paused && !last ? 'Paused' : `${String(index + 1).padStart(2, '0')}/${SLIDES.length}`}</span>
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
            {slide.kind === 'project' && <ProjectSlide id={slide.id} number={index} reduce={Boolean(reduce)} />}
            {slide.kind === 'services' && <ServicesSlide />}
            {slide.kind === 'contact' && <ContactSlide onReplay={() => go(0)} />}
          </motion.section>
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
  return (
    <div className="flex flex-1 flex-col text-[#131921]">
      <motion.p {...item(0.05)} className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#0F8B75]">BuiltbyGSV · Puducherry, India</motion.p>
      <motion.h1 {...item(0.12)} className="mt-5 text-[2.6rem] font-extrabold leading-[1.04] tracking-tight [@media(max-height:700px)]:text-[2.2rem]">
        I’m Guru.<br />I build{' '}
        <span className="relative inline-block font-serif font-normal italic text-[#0F8B75]">
          software
          <DrawnUnderline className="-bottom-1.5 h-3.5" delay={0.6} />
        </span>
        <br />that ships.
      </motion.h1>
      <motion.p {...item(0.22)} className="mt-5 max-w-sm text-[15px] leading-7 text-[#475569]">
        Founder of BuiltbyGSV. I design and engineer web platforms, business software and AI products, from the first sketch to production.
      </motion.p>
      <ol className="mt-auto border-t border-[#131921]/15">
        {CAPABILITIES.map((capability, i) => (
          <motion.li key={capability.id} {...item(0.32 + i * 0.07)} className="flex items-baseline gap-4 border-b border-[#131921]/15 py-3">
            <span className="font-mono text-xs font-bold text-[#94A3B8]">0{i + 1}</span>
            <span className="text-[17px] font-bold">{capability.title}</span>
          </motion.li>
        ))}
      </ol>
      <motion.p {...item(0.7)} className="mt-4 flex items-center justify-between text-xs font-semibold text-[#64748B]">
        <span>{PROJECTS.length} projects inside</span>
        <span className="flex items-center gap-1.5 text-[#131921]">Tap to start <ArrowRight className="h-3.5 w-3.5" /></span>
      </motion.p>
    </div>
  );
}

function ProjectSlide({ id, number, reduce }: { id: string; number: number; reduce: boolean }) {
  const project = PROJECTS.find((entry) => entry.id === id)!;
  const theme = projectTheme(id);
  const hero = projectMedia[id]?.hero;
  const summary = WORK_SUMMARIES[id];
  const dark = Boolean(theme.dark);
  const muted = dark ? 'text-white/70' : 'text-[#475569]';
  const rule = dark ? 'border-white/15' : 'border-[#131921]/15';
  return (
    <div className={`flex flex-1 flex-col ${dark ? 'text-white' : 'text-[#131921]'}`}>
      <span aria-hidden="true" className="absolute inset-0 opacity-[0.12] [background-size:18px_18px]" style={{ backgroundImage: `radial-gradient(${dark ? '#FFFFFF' : '#131921'} 1px, transparent 1px)` }} />
      <motion.p {...item(0.05)} className={`relative font-mono text-[11px] font-bold uppercase tracking-[0.16em] ${muted}`}>
        <span style={{ color: theme.accent }}>{String(number).padStart(2, '0')}</span> — {project.category} · {project.status}
      </motion.p>
      <motion.h2 {...item(0.12)} className="relative mt-2 text-[2.5rem] font-extrabold leading-none tracking-tight">{project.title}</motion.h2>
      <motion.p {...item(0.2)} className={`relative mt-3 text-[15px] leading-6 ${muted}`}>{summary?.problem ?? project.subtitle}</motion.p>

      <div className="relative my-5 flex min-h-0 flex-1 items-center justify-center">
        <motion.div className="relative flex h-full w-full items-center justify-center"
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0, scale: reduce ? 1 : [1, 1.04] }}
          transition={{ opacity: { duration: 0.5 }, y: { duration: 0.6, ease: EASE.out }, scale: { duration: SLIDE_MS / 1000, ease: 'linear' } }}>
          {hero
            ? <img src={hero} alt={`${project.title} interface`} className="max-h-full w-full object-contain drop-shadow-xl" draggable={false} />
            : <ConceptCover projectId={id} peek={0.58} className="h-full w-full [mask-image:linear-gradient(#000_80%,transparent)]" />}
        </motion.div>
      </div>

      <motion.div {...item(0.35)} className={`relative border-t pt-4 ${rule}`}>
        <p className={`font-mono text-[10px] font-bold uppercase tracking-wider ${muted}`}>What we built</p>
        <p className="mt-1 text-[15px] font-semibold leading-6">{summary?.built ?? project.subtitle}</p>
        <div className="mt-3 flex items-center justify-between gap-3">
          <span className={`truncate font-mono text-[11px] ${muted}`}>{project.tags.slice(0, 3).join(' · ')}</span>
          <a href={`/projects/${id}`} className="inline-flex shrink-0 items-center gap-1 text-[13px] font-bold underline decoration-2 underline-offset-4" style={{ textDecorationColor: theme.accent }}>
            Case study <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </motion.div>
    </div>
  );
}

function ServicesSlide() {
  return (
    <div className="flex flex-1 flex-col text-[#131921]">
      <motion.p {...item(0.05)} className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#0F8B75]">How I can help</motion.p>
      <motion.h2 {...item(0.12)} className="mt-3 text-[2.3rem] font-extrabold leading-[1.05] tracking-tight [@media(max-height:700px)]:text-[1.9rem]">
        From a rough idea<br /><span className="font-serif font-normal italic text-[#0F8B75]">to a shipped product.</span>
      </motion.h2>
      <ol className="mt-auto border-t border-[#131921]/15">
        {CAPABILITIES.map((capability, i) => (
          <motion.li key={capability.id} {...item(0.25 + i * 0.1)} className="border-b border-[#131921]/15 py-3.5">
            <div className="flex items-baseline gap-4">
              <span className="font-mono text-xs font-bold text-[#94A3B8]">0{i + 1}</span>
              <span className="text-[17px] font-bold">{capability.title}</span>
            </div>
            <p className="mt-1 pl-9 font-mono text-[11px] text-[#475569]">{capability.flow.join(' → ')}</p>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}

function ContactSlide({ onReplay }: { onReplay: () => void }) {
  return (
    <div className="flex flex-1 flex-col text-white">
      <motion.p {...item(0.05)} className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#F5C748]">Let’s talk</motion.p>
      <motion.h2 {...item(0.12)} className="mt-3 text-[2.3rem] font-extrabold leading-[1.05] tracking-tight [@media(max-height:700px)]:text-[1.8rem]">
        Got a problem<br />worth{' '}
        <span className="relative inline-block font-serif font-normal italic">
          solving?
          <DrawnUnderline className="-bottom-1.5 h-3.5" delay={0.5} />
        </span>
      </motion.h2>
      <motion.div className="my-5 flex min-h-0 flex-1 items-center justify-center"
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE.out, delay: 0.2 }}>
        <div className="flex flex-col items-center rounded-[1.5rem] bg-white p-4 text-[#131921]">
          <img src="/devday-qr.svg" alt="QR code linking to builtbygsv.in/devday" className="aspect-square" style={{ height: 'min(15rem, 28dvh)' }} draggable={false} />
          <p className="mt-2 font-mono text-[11px] font-bold">builtbygsv.in/devday</p>
        </div>
      </motion.div>
      <motion.div {...item(0.35)} className="grid grid-cols-2 gap-2.5">
        <a href="/gurusabarivasan.vcf" className="col-span-2 flex items-center justify-center gap-2 rounded-2xl bg-[#F5C748] py-3.5 text-[15px] font-extrabold text-[#131921]"><UserPlus className="h-4 w-4" /> Save my contact</a>
        <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-2xl border border-white/20 py-3 text-sm font-bold"><MessageCircle className="h-4 w-4" /> WhatsApp</a>
        <a href={brandEntity.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-2xl border border-white/20 py-3 text-sm font-bold"><Linkedin className="h-4 w-4" /> LinkedIn</a>
      </motion.div>
      <button type="button" onClick={onReplay} className="mt-4 inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-white/60"><RotateCcw className="h-3.5 w-3.5" /> Replay</button>
    </div>
  );
}
