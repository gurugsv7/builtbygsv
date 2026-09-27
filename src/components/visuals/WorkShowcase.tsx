import { useEffect, useRef, useState, type PointerEvent } from 'react';
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react';
import { ArrowRight, ArrowUpRight, Briefcase } from 'lucide-react';
import type { Project } from '../../types';
import { projectMedia } from '../../data/projectMedia';
import { WORK_SUMMARIES } from '../../data/studio';
import { PROJECT_ICONS, PhoneCover } from '../screens/MobileProjectDetail';
import { DURATION, EASE, SPRING } from '../../motion/tokens';
import { useFinePointer } from '../../motion/primitives';

/** Per-project stage colours. Anything not listed falls back to the studio teal. */
const THEMES: Record<string, { bg: string; accent: string; dark?: boolean }> = {
  'v2-productions': { bg: '#0B1622', accent: '#10B981', dark: true },
  'budget-diet-app': { bg: '#E6F4EA', accent: '#15803D' },
  'thaai-clinic-website': { bg: '#FBE4EE', accent: '#E11D48' },
};
const themeOf = (project: Project) => THEMES[project.id] ?? { bg: '#E2F1ED', accent: '#0F8B75' };

function Cover({ project, size = 'lg' }: { project: Project; size?: 'lg' | 'md' }) {
  const image = projectMedia[project.id]?.hero;
  const theme = themeOf(project);
  const Icon = PROJECT_ICONS[project.iconName] ?? Briefcase;
  if (image) return <img src={image} alt="" className={`mx-auto w-full object-contain drop-shadow-2xl ${size === 'lg' ? 'max-h-[20rem]' : 'max-h-[18rem]'}`} />;
  return <div className={`flex justify-center ${size === 'lg' ? 'h-64' : 'h-60'}`}><PhoneCover project={project} Icon={Icon} accent={theme.accent} /></div>;
}

interface HeroProps {
  projects: Project[];
  onOpenProjectDetail: (project: Project) => void;
  onStartProject?: () => void;
}

/**
 * Desktop hero: a numbered index of the work beside a large preview stage. Hovering or
 * focusing a row brings that project onto the stage; left alone, the stage cycles.
 */
export function WorkIndexHero({ projects, onOpenProjectDetail, onStartProject }: HeroProps) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const fine = useFinePointer();
  const stage = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-5, 5]), SPRING.depth);
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [4, -4]), SPRING.depth);
  const current = projects[active] ?? projects[0];
  const theme = themeOf(current);
  const completed = projects.filter((project) => project.status === 'Completed').length;

  useEffect(() => {
    if (paused || reduce || projects.length < 2) return;
    const timer = window.setInterval(() => setActive((index) => (index + 1) % projects.length), 4500);
    return () => window.clearInterval(timer);
  }, [paused, reduce, projects.length]);

  const tilt = (event: PointerEvent<HTMLDivElement>) => {
    if (!fine || reduce || !stage.current) return;
    const box = stage.current.getBoundingClientRect();
    px.set((event.clientX - box.left) / box.width - 0.5);
    py.set((event.clientY - box.top) / box.height - 0.5);
  };

  return (
    <section className="grid grid-cols-[minmax(0,.95fr)_minmax(0,1.05fr)] items-center gap-12 py-10 xl:gap-16" onMouseEnter={() => setPaused(true)} onMouseLeave={() => { setPaused(false); px.set(0); py.set(0); }}>
      <div>
        <motion.p className="font-mono text-xs font-extrabold uppercase tracking-[0.18em] text-[#0F8B75]" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Selected work</motion.p>
        <motion.h1 className="mt-4 text-5xl font-extrabold leading-[1.06] tracking-tight xl:text-[3.5rem]" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: DURATION.reveal, ease: EASE.out }}>
          Engineered products. <br /><span className="font-serif font-normal italic text-[#0F8B75]">Considered systems.</span>
        </motion.h1>
        <p className="mt-5 max-w-md text-sm font-medium leading-7 text-slate-600">
          A selection of web, software, and AI products—each shaped around a concrete problem, a maintainable implementation, and a clear next step.
        </p>

        <ol className="mt-8 border-t border-slate-200" aria-label="Project index" onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
          {projects.map((project, index) => {
            const on = index === active;
            return (
              <motion.li key={project.id} className="relative border-b border-slate-200" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                transition={{ duration: DURATION.reveal, ease: EASE.out, delay: 0.15 + index * 0.07 }}>
                {on && <motion.span layoutId="work-index-active" transition={SPRING.gentle} aria-hidden="true" className="absolute inset-y-1 -left-3 right-0 rounded-xl bg-white shadow-2xs" />}
                <button type="button" onMouseEnter={() => setActive(index)} onFocus={() => setActive(index)} onClick={() => onOpenProjectDetail(project)}
                  aria-label={`Open ${project.title}`} className="group relative grid w-full grid-cols-[2.5rem_1fr_auto] items-center gap-3 py-4 text-left">
                  <span className="font-mono text-xs font-bold transition-colors" style={{ color: on ? themeOf(project).accent : '#94A3B8' }}>0{index + 1}</span>
                  <span>
                    <span className={`block text-xl font-extrabold tracking-tight transition-colors ${on ? 'text-[#131921]' : 'text-slate-400'}`}>{project.title}</span>
                    <span className="mt-0.5 block text-xs font-semibold text-slate-500">{project.detailData?.engagement} · {project.category} · {project.year}</span>
                  </span>
                  <span className="flex items-center gap-3">
                    <span className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500">
                      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: project.status === 'Completed' ? '#10B981' : '#F5C748' }} />{project.status}
                    </span>
                    <motion.span animate={{ opacity: on ? 1 : 0, x: on ? 0 : -6 }} transition={{ duration: DURATION.fast }}><ArrowUpRight className="h-4 w-4 text-[#0F8B75]" /></motion.span>
                  </span>
                </button>
              </motion.li>
            );
          })}
        </ol>

        <div className="mt-7 flex items-center gap-5">
          {onStartProject ? (
            <button type="button" onClick={onStartProject} className="press group inline-flex items-center gap-2 rounded-full bg-[#09121F] px-5 py-3 text-sm font-extrabold text-white hover:bg-slate-800">
              Start a Project <ArrowUpRight className="nudge-ur h-4 w-4 text-emerald-400" />
            </button>
          ) : null}
          <span className="font-mono text-[11px] font-bold text-slate-500">{String(projects.length).padStart(2, '0')} case studies · {String(completed).padStart(2, '0')} completed</span>
        </div>
      </div>

      <div style={{ perspective: 1200 }}>
        <motion.div ref={stage} onPointerMove={tilt} className="relative aspect-[5/4.4] overflow-hidden rounded-[2.25rem]"
          style={{ rotateX, rotateY }} initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1, backgroundColor: theme.bg }}
          transition={{ duration: 0.6, ease: EASE.out }}>
          <div aria-hidden="true" className="absolute inset-0 opacity-20 [background-size:18px_18px]" style={{ backgroundImage: `radial-gradient(${theme.accent} 1px, transparent 1px)` }} />
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span key={`n-${current.id}`} aria-hidden="true" className="absolute -left-2 -top-6 font-mono text-[9rem] font-bold leading-none"
              style={{ color: theme.dark ? 'rgba(255,255,255,.06)' : 'rgba(19,25,33,.06)' }}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.45, ease: EASE.out }}>
              0{active + 1}
            </motion.span>
          </AnimatePresence>
          <div className="absolute inset-x-8 top-10 bottom-36 flex items-center justify-center">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div key={current.id} className="w-full" initial={{ opacity: 0, y: 24, scale: 0.94 }} animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -16, scale: 1.02 }} transition={{ duration: 0.55, ease: EASE.out }}>
                <Cover project={current} />
              </motion.div>
            </AnimatePresence>
          </div>
          <button type="button" onClick={() => onOpenProjectDetail(current)} aria-label={`Featured: ${current.title} case study`}
            className={`group absolute inset-x-4 bottom-4 flex items-end justify-between gap-4 rounded-3xl p-5 text-left backdrop-blur-md ${theme.dark ? 'bg-white/10 text-white' : 'bg-white/80 text-[#131921]'}`}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.span key={current.id} className="block min-w-0" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: DURATION.base }}>
                <span className="block text-[10px] font-extrabold uppercase tracking-widest" style={{ color: theme.accent }}>{current.detailData?.engagement} · {current.status}</span>
                <span className="mt-1 block text-2xl font-extrabold tracking-tight">{current.title}</span>
                {WORK_SUMMARIES[current.id] && <span className={`mt-1 block truncate text-xs ${theme.dark ? 'text-slate-300' : 'text-slate-600'}`}>{WORK_SUMMARIES[current.id].built}</span>}
              </motion.span>
            </AnimatePresence>
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white transition-transform group-hover:scale-105" style={{ backgroundColor: theme.accent }}>
              <ArrowRight className="nudge-r h-5 w-5" />
            </span>
          </button>
          <div className="absolute right-6 top-6 flex gap-1.5" aria-hidden="true">
            {projects.map((project, index) => (
              <span key={project.id} className="relative h-1 w-6 overflow-hidden rounded-full" style={{ backgroundColor: theme.dark ? 'rgba(255,255,255,.2)' : 'rgba(19,25,33,.12)' }}>
                {index === active && (
                  <motion.span key={`${active}-${paused}`} className="absolute inset-0 origin-left rounded-full" style={{ backgroundColor: theme.accent }}
                    initial={{ scaleX: paused || reduce ? 1 : 0 }} animate={{ scaleX: 1 }} transition={{ duration: paused || reduce ? 0 : 4.5, ease: 'linear' }} />
                )}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

interface RowsProps { projects: Project[]; onOpenProjectDetail: (project: Project) => void }

/** Desktop showcase: one editorial row per project, alternating sides. */
export function WorkShowcaseRows({ projects, onOpenProjectDetail }: RowsProps) {
  return (
    <motion.ol layout className="mt-6">
      {projects.map((project, index) => (
        <ShowcaseRow key={project.id} project={project} index={index} flip={index % 2 === 1} onOpen={() => onOpenProjectDetail(project)} />
      ))}
    </motion.ol>
  );
}

function ShowcaseRow({ project, index, flip, onOpen }: { project: Project; index: number; flip: boolean; onOpen: () => void }) {
  const ref = useRef<HTMLLIElement>(null);
  const theme = themeOf(project);
  const summary = WORK_SUMMARIES[project.id];
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const drift = useTransform(scrollYProgress, [0, 1], [36, -36]);
  const stack = project.detailData?.builtWithTech?.map((tech) => tech.name) ?? project.tags;

  return (
    <motion.li ref={ref} layout transition={{ layout: SPRING.gentle }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="border-t border-slate-200 first:border-t-0">
      <button type="button" onClick={onOpen} aria-label={`View ${project.title} case study`}
        className="group grid w-full grid-cols-12 items-center gap-10 py-14 text-left xl:gap-14">
        <motion.div className={`relative col-span-7 aspect-[16/11] overflow-hidden rounded-[2rem] ${flip ? 'order-2' : ''}`} style={{ backgroundColor: theme.bg }}
          initial={{ clipPath: 'inset(10% 8% 10% 8% round 32px)', opacity: 0.4 }} whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 32px)', opacity: 1 }}
          viewport={{ once: true, amount: 0.35 }} transition={{ duration: 0.9, ease: EASE.out }}>
          <div aria-hidden="true" className="absolute inset-0 opacity-20 [background-size:18px_18px]" style={{ backgroundImage: `radial-gradient(${theme.accent} 1px, transparent 1px)` }} />
          <span aria-hidden="true" className="absolute left-7 top-5 font-mono text-7xl font-bold" style={{ color: theme.dark ? 'rgba(255,255,255,.08)' : 'rgba(19,25,33,.07)' }}>0{index + 1}</span>
          <motion.div className="absolute inset-10 flex items-center justify-center transition-transform duration-700 group-hover:scale-[1.03]" style={{ y: drift }}>
            <Cover project={project} size="md" />
          </motion.div>
        </motion.div>

        <div className={`col-span-5 ${flip ? 'order-1' : ''}`}>
          <p className="text-[10px] font-extrabold uppercase tracking-widest" style={{ color: theme.accent }}>{project.detailData?.engagement} · {project.year} · {project.status}</p>
          <h3 className="mt-3 text-4xl font-extrabold tracking-tight transition-colors group-hover:text-[#0F8B75]">{project.title}</h3>
          {summary ? (
            <div className="relative mt-7 space-y-5 pl-6">
              <span aria-hidden="true" className="absolute bottom-2 left-[3px] top-2 w-px bg-slate-200" />
              <motion.span aria-hidden="true" className="absolute bottom-2 left-[3px] top-2 w-px origin-top" style={{ backgroundColor: theme.accent }}
                initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true, amount: 0.6 }} transition={{ duration: 0.8, ease: EASE.out, delay: 0.3 }} />
              {[['Problem', summary.problem], ['Built', summary.built]].map(([label, text]) => (
                <div key={label} className="relative">
                  <span aria-hidden="true" className="absolute -left-6 top-1.5 h-[7px] w-[7px] rounded-full border-2 bg-white" style={{ borderColor: theme.accent }} />
                  <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400">{label}</p>
                  <p className="mt-1 text-base leading-7 text-slate-700">{text}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-5 text-base leading-7 text-slate-600">{project.subtitle}</p>
          )}
          <span className="mt-6 flex flex-wrap gap-1.5">
            {stack.slice(0, 5).map((name) => <span key={name} className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 font-mono text-[10px] font-bold text-slate-600">{name}</span>)}
          </span>
          <span className="mt-8 inline-flex items-center gap-2 text-sm font-extrabold text-[#131921]">
            <span className="u-link">View case study</span>
            <span className="flex h-9 w-9 items-center justify-center rounded-full text-white transition-transform group-hover:scale-105" style={{ backgroundColor: theme.accent }}><ArrowRight className="nudge-r h-4 w-4" /></span>
          </span>
        </div>
      </button>
    </motion.li>
  );
}
