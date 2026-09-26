import { motion } from 'motion/react';
import { Code2, Lightbulb, PenTool, RefreshCw, Rocket, type LucideIcon } from 'lucide-react';
import { DELIVERY_STEPS } from '../../data/studio';
import { useSequence } from '../../motion/primitives';
import { EASE } from '../../motion/tokens';

export const STAGE_ICONS: LucideIcon[] = [Lightbulb, PenTool, Code2, Rocket, RefreshCw];

/**
 * UNDERSTAND → DESIGN → BUILD → SHIP → IMPROVE as one connected system. The connector
 * fills from the left as the rail enters view and each stage switches on in turn.
 * Desktop only; the mobile home keeps its compact dashboard.
 */
export function ProcessRail() {
  const count = DELIVERY_STEPS.length;
  const { ref, step } = useSequence(count, 0.32, 0.25);
  const progress = step < 0 ? 0 : step / (count - 1);

  return (
    <div ref={ref} className="relative">
      <div aria-hidden="true" className="absolute left-[10%] right-[10%] top-7 h-0.5 rounded-full bg-slate-200" />
      <motion.div aria-hidden="true" className="absolute left-[10%] right-[10%] top-7 h-0.5 origin-left rounded-full bg-[#0F8B75]"
        initial={{ scaleX: 0 }} animate={{ scaleX: progress }} transition={{ duration: 0.45, ease: EASE.out }} />
      <ol className="relative grid grid-cols-5 gap-4">
        {DELIVERY_STEPS.map((stage, index) => {
          const Icon = STAGE_ICONS[index];
          const on = index <= step;
          return (
            <li key={stage.title} className="flex flex-col items-center text-center">
              <motion.span
                className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border-2"
                initial={false}
                animate={{
                  backgroundColor: on ? '#0F8B75' : '#FFFFFF',
                  borderColor: on ? '#0F8B75' : '#E2E8F0',
                  color: on ? '#FFFFFF' : '#94A3B8',
                  scale: index === step ? 1.06 : 1,
                }}
                transition={{ duration: 0.35, ease: EASE.out }}
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
              </motion.span>
              <span className="mt-4 font-mono text-[11px] font-bold text-[#0F8B75]">0{index + 1}</span>
              <h3 className="mt-1 text-sm font-extrabold">{stage.title}</h3>
              <motion.p className="mt-2 max-w-[13rem] text-xs leading-5 text-slate-600"
                initial={false} animate={{ opacity: on ? 1 : 0.35 }} transition={{ duration: 0.4 }}>
                {stage.description}
              </motion.p>
            </li>
          );
        })}
      </ol>
      {/* The loop back from Improve to Understand: the next release starts from real usage. */}
      <div aria-hidden="true" className="relative mx-[10%] mt-4 h-8">
        <svg className="absolute inset-0 h-full w-full overflow-visible" viewBox="0 0 100 10" preserveAspectRatio="none" fill="none">
          <motion.path d="M100 0 C 100 9, 97 10, 50 10 C 3 10, 0 9, 0 0" stroke="#F5C748" strokeWidth="2"
            vectorEffect="non-scaling-stroke" initial={{ pathLength: 0 }} animate={{ pathLength: step === count - 1 ? 1 : 0 }}
            transition={{ duration: 0.9, ease: EASE.inOut, delay: 0.2 }} />
        </svg>
        <motion.span className="absolute left-1/2 top-full -translate-x-1/2 pt-1 font-handwritten text-sm text-slate-600"
          initial={{ opacity: 0 }} animate={{ opacity: step === count - 1 ? 1 : 0 }} transition={{ delay: 0.8 }}>
          real usage shapes the next release
        </motion.span>
      </div>
    </div>
  );
}
