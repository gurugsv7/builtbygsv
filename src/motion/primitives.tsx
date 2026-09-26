import { useEffect, useRef, useState, type ReactNode } from 'react';
import { MotionConfig, motion, stagger, useInView, useReducedMotion, type Variants } from 'motion/react';
import { DURATION, EASE, RISE, STAGGER, VIEWPORT, revealTransition } from './tokens';

/**
 * Site-wide motion defaults. `reducedMotion="user"` makes Motion drop transform and
 * layout animation for visitors who ask for reduced motion, leaving opacity fades,
 * so every page keeps the same information and hierarchy.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user" transition={{ duration: DURATION.base, ease: EASE.out }}>
      {children}
    </MotionConfig>
  );
}

type RevealTag = 'div' | 'section' | 'li' | 'ol' | 'ul' | 'p' | 'header' | 'article' | 'span';

interface RevealProps {
  children: ReactNode;
  as?: RevealTag;
  className?: string;
  delay?: number;
  /** Distance travelled upward while fading in. 0 gives a pure fade. */
  y?: number;
  id?: string;
}

/** A single block that fades and rises slightly the first time it enters the viewport. */
export function Reveal({ children, as = 'div', className, delay = 0, y = RISE, id }: RevealProps) {
  const Tag = motion[as];
  return (
    <Tag
      id={id}
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={revealTransition(delay)}
    >
      {children}
    </Tag>
  );
}

export const groupVariants: Variants = {
  hidden: {},
  shown: { transition: { delayChildren: stagger(STAGGER) } },
};

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: RISE },
  shown: { opacity: 1, y: 0, transition: { duration: DURATION.reveal, ease: EASE.out } },
};

/** Parent of a staggered set. Children use `RevealItem` (or `itemVariants`). */
export function RevealGroup({ children, as = 'div', className, delay = 0 }: Omit<RevealProps, 'y'>) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={VIEWPORT}
      variants={{ hidden: {}, shown: { transition: { delayChildren: stagger(STAGGER, { startDelay: delay }) } } }}
    >
      {children}
    </Tag>
  );
}

export function RevealItem({ children, as = 'div', className }: Omit<RevealProps, 'delay' | 'y'>) {
  const Tag = motion[as];
  return <Tag className={className} variants={itemVariants}>{children}</Tag>;
}

/**
 * Advances an index from -1 to `count - 1` once the element is in view, one step at a
 * time. Diagrams use it to switch nodes on in order. Reduced motion jumps straight to
 * the finished state.
 */
export function useSequence(count: number, interval = 0.28, startDelay = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, VIEWPORT);
  const reduce = useReducedMotion();
  const [step, setStep] = useState(-1);
  useEffect(() => {
    if (!inView) return;
    if (reduce) { setStep(count - 1); return; }
    const timers = Array.from({ length: count }, (_, index) =>
      window.setTimeout(() => setStep(index), (startDelay + index * interval) * 1000),
    );
    return () => timers.forEach(window.clearTimeout);
  }, [count, inView, interval, reduce, startDelay]);
  return { ref, step, inView };
}

/** True on devices with a precise pointer that can hover. */
export function useFinePointer() {
  const [fine, setFine] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches,
  );
  useEffect(() => {
    const query = window.matchMedia('(hover: hover) and (pointer: fine)');
    const update = () => setFine(query.matches);
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);
  return fine;
}

/**
 * Route-level entrance. There is deliberately no exit animation: the new page mounts
 * immediately, so navigation stays instant while the content settles in over ~250ms.
 */
export function PageTransition({ routeKey, children }: { routeKey: string; children: ReactNode }) {
  return (
    <motion.div
      key={routeKey}
      className="flex flex-1 flex-col"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: DURATION.base, ease: EASE.out }}
    >
      {children}
    </motion.div>
  );
}

/** A hand-drawn style underline that draws itself once, used under display headings. */
export function DrawnUnderline({ className = '', color = '#F5C748', delay = 0.35 }: { className?: string; color?: string; delay?: number }) {
  return (
    <svg className={`pointer-events-none absolute left-0 w-full overflow-visible ${className}`} viewBox="0 0 180 14" fill="none" stroke={color} aria-hidden="true">
      <motion.path d="M 3 5 C 50 1, 110 9, 175 4" strokeWidth="3.5" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.7, ease: EASE.out, delay }} />
      <motion.path d="M 12 11 C 60 7, 125 12, 160 8" strokeWidth="2.2" strokeLinecap="round" opacity="0.85"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, ease: EASE.out, delay: delay + 0.25 }} />
    </svg>
  );
}
