import { useEffect, useRef, useState } from 'react';
import { animate, useInView, useReducedMotion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import type { Project } from '../../types';
import { PROJECTS } from '../../data/mockData';
import { projectMedia, projectTheme } from '../../data/projectMedia';
import { ConceptCover } from './ConceptScreens';

/**
 * An endless ribbon of project covers. The list is rendered twice and the track slides
 * by half its width, so the loop is seamless. Hovering pauses it.
 */
export function ProjectMarquee({ onOpenProjectDetail, compact = false }: { onOpenProjectDetail: (project: Project) => void; compact?: boolean }) {
  const items = [...PROJECTS, ...PROJECTS];
  return (
    <div className="marquee relative -mx-4 overflow-hidden py-2 sm:-mx-6 lg:mx-0 [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]">
      <ul className="marquee-track flex gap-4" style={{ animationDuration: `${PROJECTS.length * (compact ? 4 : 5)}s` }}>
        {items.map((project, index) => {
          const theme = projectTheme(project.id);
          const hero = projectMedia[project.id]?.hero;
          const duplicate = index >= PROJECTS.length;
          return (
            <li key={`${project.id}-${index}`} aria-hidden={duplicate || undefined} className={compact ? 'w-56 shrink-0' : 'w-72 shrink-0 xl:w-80'}>
              <button type="button" tabIndex={duplicate ? -1 : undefined} onClick={() => onOpenProjectDetail(project)} aria-label={`${project.title} case study`}
                className="group block w-full overflow-hidden rounded-2xl border border-slate-200/80 bg-white text-left shadow-2xs transition duration-300 hover:-translate-y-1 hover:shadow-lg">
                <span className="relative flex aspect-[16/10] items-center justify-center overflow-hidden p-3" style={{ backgroundColor: theme.bg }}>
                  <span aria-hidden="true" className="absolute inset-0 opacity-20 [background-size:12px_12px]" style={{ backgroundImage: `radial-gradient(${theme.accent} 1px, transparent 1px)` }} />
                  {hero ? <img src={hero} alt="" loading="lazy" className="relative max-h-full w-full object-contain drop-shadow-lg transition-transform duration-500 group-hover:scale-105" />
                    : <ConceptCover projectId={project.id} className="relative max-h-full w-full transition-transform duration-500 group-hover:scale-105" />}
                </span>
                <span className="flex items-center gap-2 px-3.5 py-2.5">
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-extrabold">{project.title}</span>
                    <span className="block truncate text-[10px] font-bold" style={{ color: theme.accent }}>{project.category} · {project.status}</span>
                  </span>
                  <ArrowUpRight className="nudge-ur h-4 w-4 shrink-0 text-slate-400 group-hover:text-[#0F8B75]" />
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/** Counts up to `to` the first time it scrolls into view. */
export function CountUp({ to, className }: { to: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(reduce ? to : 0);
  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, to, { duration: 1.4, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setValue(Math.round(v)) });
    return () => controls.stop();
  }, [inView, reduce, to]);
  return <span ref={ref} className={className}>{String(value).padStart(2, '0')}</span>;
}
