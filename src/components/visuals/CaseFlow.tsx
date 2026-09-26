import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import type { Project } from '../../types';
import { Reveal } from '../../motion/primitives';

/**
 * A case study read as a sequence: context, problem, what was built, how it works,
 * and where it stands. Every line comes from the project record; nothing is inferred.
 */
export function CaseFlow({ project, accent }: { project: Project; accent: string }) {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] });
  const fill = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const detail = project.detailData;
  const context = [project.client, project.location, project.year].filter(Boolean).join(' · ');
  const stack = detail?.builtWithTech?.map((tech) => tech.name) ?? project.tags;

  const rows = [
    { label: 'Context', body: <><p className="text-lg font-extrabold">{context}</p><p className="mt-1 text-sm text-slate-600">{[detail?.engagement, detail?.platform].filter(Boolean).join(' · ')}</p></> },
    project.problemStatement && { label: 'Problem', body: <p className="text-base leading-7 text-slate-700">{project.problemStatement}</p> },
    project.solutionProvided && { label: 'What we built', body: <p className="text-base leading-7 text-slate-700">{project.solutionProvided}</p> },
    {
      label: 'How it works', body: <>
        <ul className="flex flex-wrap gap-2">{stack.map((name) => <li key={name} className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 font-mono text-[11px] font-bold text-slate-700">{name}</li>)}</ul>
      </>,
    },
    {
      label: 'Status', body: <>
        <p className="text-lg font-extrabold">{project.status}{detail?.timeline ? <span className="font-medium text-slate-500"> · {detail.timeline}</span> : null}</p>
        {detail?.whatsNextItems?.length ? <>
          <p className="mt-3 font-mono text-[10px] font-bold uppercase tracking-wider text-slate-500">Possible next steps</p>
          <ul className="mt-2 flex flex-wrap gap-2">{detail.whatsNextItems.map((item) => <li key={item} className="rounded-full border border-dashed border-slate-300 px-3 py-1 text-xs font-semibold text-slate-600">{item}</li>)}</ul>
        </> : null}
      </>,
    },
  ].filter(Boolean) as { label: string; body: React.ReactNode }[];

  return (
    <section aria-labelledby="case-flow-heading" className="mx-auto max-w-[1400px] px-5 py-12 lg:px-12 lg:py-16">
      <Reveal>
        <p className="font-mono text-xs font-bold uppercase tracking-[0.16em]" style={{ color: accent }}>The project, in sequence</p>
        <h2 id="case-flow-heading" className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">From context to release</h2>
      </Reveal>
      <ol ref={ref} className="relative mt-10">
        <span aria-hidden="true" className="absolute bottom-6 left-[7px] top-2 w-0.5 bg-slate-200 lg:left-[207px]" />
        <motion.span aria-hidden="true" className="absolute bottom-6 left-[7px] top-2 w-0.5 origin-top lg:left-[207px]" style={{ scaleY: fill, backgroundColor: accent }} />
        {rows.map((row) => (
          <li key={row.label} className="relative grid gap-3 pb-10 pl-8 last:pb-0 lg:grid-cols-[200px_1fr] lg:gap-10 lg:pl-0">
            <span aria-hidden="true" className="absolute left-0 top-1.5 h-4 w-4 rounded-full border-2 bg-white lg:left-[200px]" style={{ borderColor: accent }} />
            <p className="pt-0.5 font-mono text-xs font-bold uppercase tracking-[0.14em] lg:text-right lg:pr-4" style={{ color: accent }}>{row.label}</p>
            <Reveal className="max-w-3xl lg:pl-10">{row.body}</Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}
