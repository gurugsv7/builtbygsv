import { DELIVERY_STEPS } from '../../data/studio';
import React, { useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useScroll, useTransform } from 'motion/react';
import { ArrowLeft, Bookmark, MessageSquare, ArrowRight, Check } from 'lucide-react';
import { STAGE_ICONS } from '../visuals/ProcessRail';
import { PROCESS_SCENES } from '../visuals/ProcessScenes';
import { DrawnUnderline, Reveal } from '../../motion/primitives';
import { DURATION, EASE, SPRING } from '../../motion/tokens';

interface ProcessScreenProps {
  onBack?: () => void;
  onStartProject?: () => void;
}

export const ProcessScreen: React.FC<ProcessScreenProps> = ({ onBack, onStartProject }) => (
  <>
    <div className="lg:hidden"><MobileProcess onBack={onBack} onStartProject={onStartProject} /></div>
    <div className="hidden lg:block"><DesktopProcess onStartProject={onStartProject} /></div>
  </>
);

/**
 * Desktop: the stages scroll normally on the right while a sticky panel on the left
 * shows where you are. A stage becomes current as it crosses the middle of the
 * viewport. Nothing is pinned or snapped; scrolling stays the visitor's own.
 */
function DesktopProcess({ onStartProject }: { onStartProject?: () => void }) {
  const [active, setActive] = useState(0);
  const Scene = PROCESS_SCENES[active];
  const count = DELIVERY_STEPS.length;

  return (
    <main className="mx-auto w-full max-w-[1400px] px-10 pb-16 pt-6 text-[#131921] xl:px-14">
      <Reveal as="header" className="grid gap-8 py-12 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
        <div>
          <p className="font-mono text-[11px] font-bold uppercase tracking-[.18em] text-[#0F8B75]">Our delivery process</p>
          <h1 className="mt-4 text-5xl font-extrabold leading-[1.05] tracking-tight xl:text-6xl">
            How we <span className="relative inline-block font-serif font-normal italic text-[#0F8B75]">build.<DrawnUnderline className="-bottom-1 h-3" delay={0.5} /></span>
          </h1>
        </div>
        <p className="max-w-md text-base leading-8 text-slate-600">A clear process, transparent at every step. Five stages take an idea from a defined problem to a documented release — and into what comes next.</p>
      </Reveal>

      <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] xl:gap-20">
        <div className="relative">
          <div className="sticky top-8">
            <div className="relative overflow-hidden rounded-[2rem] border border-[#CDE3DC] bg-[#EEF6F3] p-8">
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-40 bg-[radial-gradient(#0F8B75_1px,transparent_1px)] [background-size:18px_18px] [mask-image:linear-gradient(to_bottom,black,transparent_75%)]" />
              <div className="relative flex items-center justify-between">
                <p className="font-mono text-[11px] font-bold uppercase tracking-[.16em] text-[#0F8B75]">Stage 0{active + 1} of 0{count}</p>
                <p className="font-handwritten text-lg">{DELIVERY_STEPS[active].title}</p>
              </div>
              <div className="relative mx-auto mt-4 aspect-[320/220] max-w-[440px]">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div key={active} className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: DURATION.fast }}>
                    <Scene />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
            <nav aria-label="Process stages" className="relative mt-8">
              <div aria-hidden="true" className="absolute left-5 right-5 top-5 h-0.5 bg-slate-200" />
              <motion.div aria-hidden="true" className="absolute left-5 right-5 top-5 h-0.5 origin-left bg-[#0F8B75]"
                initial={false} animate={{ scaleX: active / (count - 1) }} transition={{ duration: 0.45, ease: EASE.out }} />
              <ol className="relative flex justify-between">
                {DELIVERY_STEPS.map((stage, index) => {
                  const Icon = STAGE_ICONS[index];
                  const state = index < active ? 'done' : index === active ? 'current' : 'next';
                  return (
                    <li key={stage.title} className="flex w-20 flex-col items-center text-center">
                      <a href={`#stage-${index + 1}`} aria-current={state === 'current' ? 'step' : undefined} className="group flex flex-col items-center">
                        <motion.span className="flex h-10 w-10 items-center justify-center rounded-full border-2" initial={false}
                          animate={{ backgroundColor: state === 'next' ? '#FFFFFF' : '#0F8B75', borderColor: state === 'next' ? '#E2E8F0' : '#0F8B75', color: state === 'next' ? '#94A3B8' : '#FFFFFF', scale: state === 'current' ? 1.1 : 1 }}
                          transition={SPRING.gentle}>
                          {state === 'done' ? <Check className="h-4 w-4" strokeWidth={3} /> : <Icon className="h-4 w-4" />}
                        </motion.span>
                        <span className={`mt-2 text-[11px] font-bold ${state === 'next' ? 'text-slate-400' : 'text-[#131921]'}`}>{stage.title}</span>
                      </a>
                    </li>
                  );
                })}
              </ol>
            </nav>
          </div>
        </div>

        <ol className="pb-[20vh]">
          {DELIVERY_STEPS.map((stage, index) => (
            <DesktopStage key={stage.title} index={index} active={index === active} onEnter={() => setActive(index)} />
          ))}
        </ol>
      </div>

      <Reveal as="section" className="brush-banner-dark mt-12 flex items-center justify-between gap-6 p-10 text-white">
        <div><h2 className="text-3xl font-extrabold">Start with stage one.</h2><p className="mt-3 text-sm text-slate-300">Tell us what you’re building, and we’ll help define the problem and the first release.</p></div>
        <button type="button" onClick={onStartProject} id="banner-process-cta-desktop" className="press group inline-flex shrink-0 items-center gap-3 rounded-full bg-[#F5C748] px-5 py-3 text-sm font-extrabold text-[#09121F]">Start a Project <ArrowRight className="nudge-r h-4 w-4" /></button>
      </Reveal>
    </main>
  );
}

function DesktopStage({ index, active, onEnter }: { index: number; active: boolean; onEnter: () => void }) {
  const ref = useRef<HTMLLIElement>(null);
  const stage = DELIVERY_STEPS[index];
  const centred = useInView(ref, { margin: '-45% 0px -45% 0px' });
  const seen = useInView(ref, { once: true, amount: 0.3 });
  React.useEffect(() => { if (centred) onEnter(); }, [centred, onEnter]);

  return (
    <li ref={ref} id={`stage-${index + 1}`} className="scroll-mt-24 flex min-h-[62vh] flex-col justify-center border-b border-slate-200 py-12 last:border-0">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={seen ? { opacity: active ? 1 : 0.45, y: 0 } : {}} transition={{ duration: DURATION.reveal, ease: EASE.out }}>
        <p className="font-mono text-sm font-bold text-[#0F8B75]">0{index + 1}</p>
        <h2 className="mt-3 text-4xl font-extrabold tracking-tight">{stage.title}</h2>
        <p className="mt-4 max-w-md text-lg leading-8 text-slate-600">{stage.description}</p>
        <ul className="mt-7 flex flex-wrap gap-2">
          {stage.outputs.map((output) => (
            <li key={output} className="inline-flex items-center gap-2 rounded-full border border-[#0F8B75]/25 bg-white px-3.5 py-1.5 text-xs font-bold">
              <span className="h-1.5 w-1.5 rounded-full bg-[#F5C748]" />{output}
            </li>
          ))}
        </ul>
      </motion.div>
    </li>
  );
}

/** Mobile: the original app-style screen, with a timeline that fills as you scroll. */
function MobileProcess({ onBack, onStartProject }: ProcessScreenProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const list = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: list, offset: ['start 75%', 'end 55%'] });
  const fill = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div className="min-h-full bg-[#F8F9FA] pb-20 text-[#131921]">
      <div className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-200/50 bg-[#F8F9FA]/90 px-4 py-3 backdrop-blur-md">
        <button onClick={onBack || (() => window.history.back())} className="rounded-full p-1.5 text-slate-700 transition-colors hover:bg-slate-200/60" aria-label="Back">
          <ArrowLeft className="h-5 w-5 stroke-[2.2]" />
        </button>
        <button onClick={() => setIsBookmarked(!isBookmarked)} className="rounded-full p-1.5 text-slate-700 transition-colors hover:bg-slate-200/60" aria-label="Bookmark" aria-pressed={isBookmarked}>
          <Bookmark className={`h-5 w-5 stroke-[2.2] ${isBookmarked ? 'fill-[#131921] text-[#131921]' : 'text-slate-700'}`} />
        </button>
      </div>

      <div className="mx-auto max-w-3xl space-y-5 px-4 pt-2 sm:px-5">
        <div className="space-y-1.5 pt-1">
          <div className="relative inline-block">
            <h1 className="text-3xl font-extrabold tracking-tight text-[#131921]">How We Build</h1>
            <svg className="mt-0.5 h-2 w-full overflow-visible text-[#0F8B75]" viewBox="0 0 130 8" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" aria-hidden="true">
              <motion.path d="M 2 4 C 40 1, 90 7, 128 3" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 0.2, ease: EASE.out }} />
            </svg>
          </div>
          <p className="pt-1 text-xs font-medium text-slate-600">A clear process. Transparent at every step.</p>
        </div>

        <ol ref={list} className="relative space-y-3 pt-2">
          <span aria-hidden="true" className="absolute bottom-8 left-[23px] top-8 w-0.5 bg-slate-200" />
          <motion.span aria-hidden="true" className="absolute bottom-8 left-[23px] top-8 w-0.5 origin-top bg-[#0F8B75]" style={{ scaleY: fill }} />
          {DELIVERY_STEPS.map((step, index) => <MobileStage key={step.title} index={index} />)}
        </ol>

        <button type="button" onClick={onStartProject} id="banner-process-cta"
          className="group flex w-full items-center justify-between gap-3 rounded-2xl border border-emerald-200/80 bg-[#EBF7F4] p-4 text-left shadow-2xs transition-all hover:border-[#0F8B75] active:scale-[0.99]">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-[#0F8B75]"><MessageSquare className="h-5 w-5 stroke-[2]" /></div>
            <div>
              <h3 className="text-xs font-extrabold text-[#131921] transition-colors group-hover:text-[#0F8B75]">Start a Project</h3>
              <p className="text-[11px] font-medium text-slate-600">Tell us what you're building.</p>
            </div>
          </div>
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#131921] text-white transition-colors group-hover:bg-[#0F8B75]"><ArrowRight className="nudge-r h-4 w-4 stroke-[2.5]" /></div>
        </button>
      </div>
    </div>
  );
}

/** A stage card that switches on as it reaches the reading area; tap to see what it produces. */
function MobileStage({ index }: { index: number }) {
  const ref = useRef<HTMLLIElement>(null);
  const on = useInView(ref, { once: true, margin: '0px 0px -35% 0px' });
  const [open, setOpen] = useState(false);
  const step = DELIVERY_STEPS[index];
  const Icon = STAGE_ICONS[index];
  const Scene = PROCESS_SCENES[index];

  return (
    <li ref={ref} className="relative flex gap-3">
      <motion.span className="relative z-10 mt-2 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 bg-white" initial={false}
        animate={{ backgroundColor: on ? '#0F8B75' : '#FFFFFF', borderColor: on ? '#0F8B75' : '#E2E8F0', color: on ? '#FFFFFF' : '#94A3B8' }} transition={{ duration: 0.3 }}>
        <Icon className="h-5 w-5" />
      </motion.span>
      <div className="min-w-0 flex-1 rounded-2xl border border-slate-200/90 bg-white shadow-2xs">
        <button type="button" onClick={() => setOpen(!open)} aria-expanded={open} className="flex w-full items-start justify-between gap-3 p-3.5 text-left">
          <span>
            <span className="font-mono text-[10px] font-bold text-[#0F8B75]">0{index + 1}</span>
            <span className="mt-0.5 block text-sm font-extrabold text-[#131921]">{step.title}</span>
            <span className="mt-0.5 block text-xs font-medium leading-snug text-slate-600">{step.description}</span>
          </span>
          <span aria-hidden="true" className={`mt-1 text-lg leading-none text-[#0F8B75] transition-transform ${open ? 'rotate-45' : ''}`}>+</span>
        </button>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div key="more" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: DURATION.fast }} className="border-t border-slate-100 p-3.5">
              <div className="mx-auto aspect-[320/220] max-w-[260px]"><Scene /></div>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {step.outputs.map((output) => <li key={output} className="rounded-lg bg-[#E2F1ED] px-2 py-1 text-[10px] font-bold text-[#0F8B75]">{output}</li>)}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </li>
  );
}
