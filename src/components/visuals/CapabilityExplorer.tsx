import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import type { ScreenType, ServiceType } from '../../types';
import { CAPABILITIES } from '../../data/studio';
import { SCREEN_PATHS } from '../../routes';
import { DURATION, EASE, SPRING } from '../../motion/tokens';
import { CapabilityScene } from './CapabilityScenes';

interface Props {
  onNavigate: (screen: ScreenType) => void;
}

/**
 * Desktop capabilities: the numbered list stays the primary, readable navigation;
 * hovering or focusing a row swaps the scene beside it to show how that kind of
 * system fits together. Clicking a row opens the service page.
 */
export function CapabilityExplorer({ onNavigate }: Props) {
  const [active, setActive] = useState<ServiceType>(CAPABILITIES[0].id);
  const current = CAPABILITIES.find((item) => item.id === active)!;

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,.95fr)_minmax(0,1.05fr)] lg:items-stretch xl:gap-14">
      <ul className="border-t border-slate-200">
        {CAPABILITIES.map((capability, index) => {
          const isActive = capability.id === active;
          return (
            <li key={capability.id} className="relative border-b border-slate-200">
              {isActive && (
                <motion.span layoutId="capability-active" transition={SPRING.gentle}
                  className="absolute inset-y-0 -left-4 right-0 rounded-2xl bg-[#E2F1ED]/60" aria-hidden="true" />
              )}
              <a
                href={SCREEN_PATHS[capability.id]}
                onClick={(event) => { event.preventDefault(); onNavigate(capability.id); }}
                onMouseEnter={() => setActive(capability.id)}
                onFocus={() => setActive(capability.id)}
                aria-describedby={isActive ? 'capability-scene-caption' : undefined}
                className="group relative flex w-full gap-5 py-6 text-left"
              >
                <span className={`pt-1.5 font-mono text-xs transition-colors ${isActive ? 'text-[#0F8B75]' : 'text-slate-400'}`}>0{index + 1}</span>
                <span className="flex-1">
                  <span className={`block text-xl font-extrabold tracking-tight transition-colors xl:text-2xl ${isActive ? 'text-[#131921]' : 'text-slate-500 group-hover:text-[#131921]'}`}>
                    {capability.title}
                  </span>
                  <span className="mt-2 block max-w-md text-sm leading-6 text-slate-600">{capability.description}</span>
                </span>
                <ArrowUpRight className={`nudge-ur mt-1.5 h-5 w-5 shrink-0 transition-colors ${isActive ? 'text-[#0F8B75]' : 'text-slate-300'}`} />
              </a>
            </li>
          );
        })}
      </ul>

      <div className="relative flex min-h-[420px] flex-col overflow-hidden rounded-[2rem] border border-[#CDE3DC] bg-[#EEF6F3] p-6 xl:p-8">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-40 bg-[radial-gradient(#0F8B75_1px,transparent_1px)] [background-size:18px_18px] [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" />
        <div className="relative flex items-center justify-between">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[.16em] text-[#0F8B75]">How it fits together</p>
          <span className="font-handwritten text-base text-[#131921]">0{CAPABILITIES.indexOf(current) + 1} / 04</span>
        </div>
        <div className="relative flex-1 py-4">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={active} className="absolute inset-0 flex items-center justify-center py-4"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: DURATION.fast, ease: EASE.out }}>
              <div className="aspect-[400/280] w-full max-w-[520px]"><CapabilityScene id={active} /></div>
            </motion.div>
          </AnimatePresence>
        </div>
        <div id="capability-scene-caption" className="relative flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[11px] font-bold uppercase tracking-wider text-slate-600">
          {current.flow.map((stage, index) => (
            <span key={`${active}-${stage}`} className="inline-flex items-center gap-2">
              {index > 0 && <span aria-hidden="true" className="text-[#0F8B75]">→</span>}
              {stage}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
