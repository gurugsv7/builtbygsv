import { useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'motion/react';
import type { FlowNode, ServiceVisual } from '../../data/serviceVisuals';
import { useSequence } from '../../motion/primitives';
import { EASE, VIEWPORT } from '../../motion/tokens';

interface FlowProps { nodes: FlowNode[]; accent: string; accentSoft: string }

/**
 * Desktop pipeline. Stages switch on left to right as the diagram enters view; hovering
 * or focusing a stage traces the path up to it, dimming what happens later.
 */
export function FlowDiagramDesktop({ nodes, accent, accentSoft }: FlowProps) {
  const { ref, step } = useSequence(nodes.length, 0.24, 0.2);
  const [hovered, setHovered] = useState<number | null>(null);
  const reach = hovered ?? step;
  const progress = reach < 0 ? 0 : reach / (nodes.length - 1);
  const inset = `${50 / nodes.length}%`;

  return (
    <div ref={ref} className="relative" onMouseLeave={() => setHovered(null)}>
      <div aria-hidden="true" className="absolute top-8 h-0.5 rounded-full bg-slate-200" style={{ left: inset, right: inset }} />
      <motion.div aria-hidden="true" className="absolute top-8 h-0.5 origin-left rounded-full" style={{ left: inset, right: inset, backgroundColor: accent }}
        initial={{ scaleX: 0 }} animate={{ scaleX: progress }} transition={{ duration: 0.4, ease: EASE.out }} />
      <ol className="relative grid gap-3" style={{ gridTemplateColumns: `repeat(${nodes.length}, minmax(0, 1fr))` }}>
        {nodes.map((node, index) => {
          const on = index <= reach;
          return (
            <li key={node.title}>
              <button type="button" onMouseEnter={() => setHovered(index)} onFocus={() => setHovered(index)} onBlur={() => setHovered(null)}
                className="group flex w-full flex-col items-center px-1 text-center outline-offset-4" aria-label={`${node.title}: ${node.caption}`}>
                <motion.span className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl border-2 font-mono text-xs font-bold"
                  initial={false}
                  animate={{ backgroundColor: on ? accent : '#FFFFFF', borderColor: on ? accent : '#E2E8F0', color: on ? '#FFFFFF' : '#94A3B8', y: hovered === index ? -3 : 0 }}
                  transition={{ duration: 0.3, ease: EASE.out }}>
                  0{index + 1}
                </motion.span>
                <span className="mt-4 text-sm font-extrabold text-[#131921]">{node.title}</span>
                <motion.span className="mt-1.5 block max-w-[11rem] text-xs leading-5 text-slate-600" initial={false}
                  animate={{ opacity: on ? 1 : 0.35 }} transition={{ duration: 0.3 }}>
                  {node.caption}
                </motion.span>
                <motion.span aria-hidden="true" className="mt-3 h-1 w-8 rounded-full" style={{ backgroundColor: accentSoft }}
                  initial={false} animate={{ scaleX: hovered === index ? 1.6 : 1, backgroundColor: hovered === index ? accent : accentSoft }} />
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/** Mobile pipeline: a vertical line that fills with scroll, each stage switching on as it arrives. */
export function FlowDiagramMobile({ nodes, accent }: FlowProps) {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 80%', 'end 60%'] });
  const fill = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return (
    <ol ref={ref} className="relative space-y-4 pl-1">
      <span aria-hidden="true" className="absolute bottom-5 left-[21px] top-5 w-0.5 rounded-full bg-slate-200" />
      <motion.span aria-hidden="true" className="absolute bottom-5 left-[21px] top-5 w-0.5 origin-top rounded-full" style={{ scaleY: fill, backgroundColor: accent }} />
      {nodes.map((node, index) => <MobileNode key={node.title} node={node} index={index} accent={accent} />)}
    </ol>
  );
}

function MobileNode({ node, index, accent }: { node: FlowNode; index: number; accent: string }) {
  const ref = useRef<HTMLLIElement>(null);
  const on = useInView(ref, { once: true, margin: '0px 0px -30% 0px' });
  return (
    <li ref={ref} className="relative flex items-start gap-3.5">
      <motion.span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border-2 bg-white font-mono text-[10px] font-bold"
        initial={false} animate={{ backgroundColor: on ? accent : '#FFFFFF', borderColor: on ? accent : '#E2E8F0', color: on ? '#FFFFFF' : '#94A3B8' }}
        transition={{ duration: 0.3 }}>
        0{index + 1}
      </motion.span>
      <motion.span className="pt-1" initial={{ opacity: 0.4, x: 6 }} animate={on ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.4, ease: EASE.out }}>
        <span className="block text-xs font-extrabold text-[#131921]">{node.title}</span>
        <span className="mt-0.5 block text-[11px] leading-5 text-slate-600">{node.caption}</span>
      </motion.span>
    </li>
  );
}

interface FanProps { visual: ServiceVisual }

/** Custom software, desktop: many operational inputs converge on one purpose-built system. */
export function FanInDiagramDesktop({ visual }: FanProps) {
  const fan = visual.fanIn!;
  const { ref, step } = useSequence(4, 0.3, 0.15);
  const chip = 'flex h-11 items-center rounded-xl border bg-white px-4 text-sm font-bold text-[#131921] shadow-2xs';
  const inY = fan.inputs.map((_, i) => 22 + i * 52);
  const outY = fan.outputs.map((_, i) => 48 + i * 52);
  return (
    <div ref={ref} className="grid grid-cols-[minmax(0,1fr)_120px_minmax(0,1.1fr)_120px_minmax(0,1fr)] items-center" role="img"
      aria-label={`${fan.inputs.join(', ')} feed a ${fan.system.title.toLowerCase()}, which produces ${fan.outputs.join(', ').toLowerCase()}`}>
      <div className="space-y-2">
        {fan.inputs.map((item, i) => (
          <motion.div key={item} className={chip} style={{ borderColor: '#E2E8F0' }} initial={{ opacity: 0, x: -12 }}
            animate={step >= 0 ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.45, ease: EASE.out, delay: i * 0.07 }}>{item}</motion.div>
        ))}
      </div>
      <svg viewBox="0 0 120 200" className="h-[200px] w-full overflow-visible" fill="none" aria-hidden="true">
        {inY.map((y) => (
          <motion.path key={y} d={`M0 ${y} C 60 ${y}, 60 100, 120 100`} stroke={visual.accent} strokeWidth="1.8"
            initial={{ pathLength: 0 }} animate={{ pathLength: step >= 1 ? 1 : 0 }} transition={{ duration: 0.6, ease: EASE.out }} />
        ))}
      </svg>
      <motion.div className="relative rounded-3xl bg-[#131921] p-6 text-white shadow-xl" initial={{ opacity: 0, scale: 0.94 }}
        animate={step >= 2 ? { opacity: 1, scale: 1 } : {}} transition={{ type: 'spring', stiffness: 260, damping: 24 }}>
        <p className="font-mono text-[10px] font-bold uppercase tracking-wider" style={{ color: visual.accent }}>Purpose-built</p>
        <p className="mt-2 text-xl font-extrabold">{fan.system.title}</p>
        <p className="mt-1 text-xs leading-5 text-slate-300">{fan.system.caption}</p>
        <div aria-hidden="true" className="mt-5 grid grid-cols-3 gap-1.5">
          {[0, 1, 2].map((i) => <span key={i} className="h-8 rounded-md bg-white/10" />)}
          <span className="col-span-2 h-12 rounded-md bg-white/10" /><span className="h-12 rounded-md" style={{ backgroundColor: visual.accent }} />
        </div>
      </motion.div>
      <svg viewBox="0 0 120 200" className="h-[200px] w-full overflow-visible" fill="none" aria-hidden="true">
        {outY.map((y) => (
          <motion.path key={y} d={`M0 100 C 60 100, 60 ${y}, 120 ${y}`} stroke={visual.accent} strokeWidth="1.8"
            initial={{ pathLength: 0 }} animate={{ pathLength: step >= 3 ? 1 : 0 }} transition={{ duration: 0.6, ease: EASE.out }} />
        ))}
      </svg>
      <div className="space-y-2">
        {fan.outputs.map((item, i) => (
          <motion.div key={item} className={chip} style={{ borderColor: visual.accent, backgroundColor: visual.accentSoft }} initial={{ opacity: 0, x: 12 }}
            animate={step >= 3 ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.45, ease: EASE.out, delay: 0.2 + i * 0.08 }}>{item}</motion.div>
        ))}
      </div>
    </div>
  );
}

/** Custom software, mobile: inputs as a compact grid, then the system, then its outputs. */
export function FanInDiagramMobile({ visual }: FanProps) {
  const fan = visual.fanIn!;
  const ref = useRef<HTMLDivElement>(null);
  const on = useInView(ref, VIEWPORT);
  const line = <motion.span aria-hidden="true" className="mx-auto block h-6 w-0.5 origin-top rounded-full" style={{ backgroundColor: visual.accent }}
    initial={{ scaleY: 0 }} animate={on ? { scaleY: 1 } : {}} transition={{ duration: 0.4, delay: 0.3 }} />;
  return (
    <div ref={ref} className="space-y-1">
      <div className="grid grid-cols-2 gap-2">
        {fan.inputs.map((item) => <span key={item} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-center text-[11px] font-bold">{item}</span>)}
      </div>
      {line}
      <motion.div className="rounded-2xl bg-[#131921] p-4 text-center text-white" initial={{ opacity: 0, y: 8 }} animate={on ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.5 }}>
        <p className="text-sm font-extrabold">{fan.system.title}</p>
        <p className="mt-0.5 text-[11px] text-slate-300">{fan.system.caption}</p>
      </motion.div>
      {line}
      <div className="grid grid-cols-3 gap-2">
        {fan.outputs.map((item) => <span key={item} className="rounded-xl border px-2 py-2 text-center text-[11px] font-bold" style={{ borderColor: visual.accent, backgroundColor: visual.accentSoft }}>{item}</span>)}
      </div>
    </div>
  );
}

export function ServiceDiagram({ visual, variant }: { visual: ServiceVisual; variant: 'desktop' | 'mobile' }) {
  if (visual.fanIn) return variant === 'desktop' ? <FanInDiagramDesktop visual={visual} /> : <FanInDiagramMobile visual={visual} />;
  const props = { nodes: visual.flow!, accent: visual.accent, accentSoft: visual.accentSoft };
  return variant === 'desktop' ? <FlowDiagramDesktop {...props} /> : <FlowDiagramMobile {...props} />;
}
