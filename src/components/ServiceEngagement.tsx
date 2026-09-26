import { motion } from 'motion/react';
import { useSequence } from '../motion/primitives';
import { EASE } from '../motion/tokens';

const ENGAGEMENT = [
  { title: 'Agree the scope', text: 'Users, existing systems and the workflow to improve. Together we agree the technical approach and what the first release must do.' },
  { title: 'Review in stages', text: 'Design and engineering progress in reviewable stages, so decisions are seen early.' },
  { title: 'Validate & release', text: 'Important workflows and edge cases are tested before deployment.' },
  { title: 'Hand over & iterate', text: 'Ownership and handover are documented. Further work is scoped around usage and feedback.' },
];

/** Mobile service pages: the engagement summary as a compact disclosure. */
export function ServiceEngagement() {
  return (
    <details className="group rounded-2xl border border-slate-200 bg-white p-4 lg:hidden">
      <summary className="flex cursor-pointer list-none items-center justify-between text-xs font-extrabold text-[#131921] [&::-webkit-details-marker]:hidden">
        How an engagement works <span aria-hidden="true" className="text-lg text-[#0F8B75] transition-transform group-open:rotate-45">+</span>
      </summary>
      <ol className="mt-3 space-y-3 border-l-2 border-[#0F8B75]/25 pl-4">
        {ENGAGEMENT.map((step, index) => (
          <li key={step.title}>
            <p className="text-[11px] font-extrabold"><span className="mr-1.5 font-mono text-[#0F8B75]">0{index + 1}</span>{step.title}</p>
            <p className="mt-0.5 text-[11px] leading-5 text-slate-600">{step.text}</p>
          </li>
        ))}
      </ol>
      <a href="/process" className="mt-3 inline-block text-xs font-bold text-[#0F8B75]">Our delivery process ↗</a>
    </details>
  );
}

/** Desktop service pages: the same four steps as a connected strip. */
export function EngagementStrip() {
  const { ref, step } = useSequence(ENGAGEMENT.length, 0.22, 0.15);
  return (
    <section ref={ref} aria-labelledby="engagement-heading" className="rounded-[2rem] border border-slate-200 bg-[#E2F1ED]/50 p-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h2 id="engagement-heading" className="text-2xl font-extrabold text-[#131921]">From requirements to release.</h2>
        <a href="/process" className="group text-xs font-bold text-[#0F8B75]"><span className="u-link">Explore our delivery process</span> <span aria-hidden="true" className="nudge-ur inline-block">↗</span></a>
      </div>
      <ol className="relative mt-10 grid grid-cols-4 gap-6">
        <span aria-hidden="true" className="absolute left-0 right-0 top-[7px] h-px bg-[#0F8B75]/20" />
        <motion.span aria-hidden="true" className="absolute left-0 right-0 top-[7px] h-px origin-left bg-[#0F8B75]"
          initial={{ scaleX: 0 }} animate={{ scaleX: step < 0 ? 0 : (step + 1) / ENGAGEMENT.length }} transition={{ duration: 0.4, ease: EASE.out }} />
        {ENGAGEMENT.map((item, index) => (
          <li key={item.title} className="relative pt-8">
            <motion.span aria-hidden="true" className="absolute left-0 top-0 h-[15px] w-[15px] rounded-full border-2 border-[#0F8B75]"
              initial={false} animate={{ backgroundColor: index <= step ? '#0F8B75' : '#FFFFFF' }} />
            <p className="font-mono text-[11px] font-bold text-[#0F8B75]">0{index + 1}</p>
            <h3 className="mt-1 text-sm font-extrabold text-[#131921]">{item.title}</h3>
            <p className="mt-2 text-xs leading-6 text-slate-600">{item.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
