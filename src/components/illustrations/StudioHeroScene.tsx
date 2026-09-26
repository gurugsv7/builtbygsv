import { useRef, type PointerEvent, type ReactNode } from 'react';
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from 'motion/react';
import { EASE, SPRING } from '../../motion/tokens';
import { useFinePointer } from '../../motion/primitives';

/**
 * The homepage's isometric studio illustration, assembled in layers on first load.
 * On desktop pointers each layer shifts by a few pixels at a different depth, and the
 * backdrop drifts slightly with scroll. The drawing itself is unchanged.
 */
export function StudioHeroScene() {
  const frame = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const fine = useFinePointer();
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, SPRING.depth);
  const sy = useSpring(py, SPRING.depth);
  const { scrollYProgress } = useScroll({ target: frame, offset: ['start start', 'end start'] });
  const backdropScroll = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 36]);

  const track = (event: PointerEvent<HTMLDivElement>) => {
    if (!fine || reduce || !frame.current) return;
    const box = frame.current.getBoundingClientRect();
    px.set((event.clientX - box.left) / box.width - 0.5);
    py.set((event.clientY - box.top) / box.height - 0.5);
  };
  const settle = () => { px.set(0); py.set(0); };

  const enter = (delay: number, y = 18) => ({
    initial: { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease: EASE.out, delay },
  });
  const float = (distance: number, duration: number) =>
    reduce ? {} : { animate: { y: [0, -distance, 0] }, transition: { duration, repeat: Infinity, ease: 'easeInOut' as const } };

  return (
    <div
      ref={frame}
      onPointerMove={track}
      onPointerLeave={settle}
      className="relative flex min-h-[320px] items-center justify-center select-none sm:min-h-[380px] lg:col-span-6 lg:min-h-[420px] xl:min-h-[460px]"
      aria-hidden="true"
    >
      <Depth x={sx} y={sy} depth={-10} className="absolute z-0 flex items-center justify-center" extraY={backdropScroll}>
        <motion.div
          className="h-72 w-72 rounded-full bg-[#3DA081] opacity-95 shadow-inner sm:h-96 sm:w-96 lg:h-[420px] lg:w-[420px] xl:h-[480px] xl:w-[480px]"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 0.95, scale: 1 }}
          transition={{ duration: 0.9, ease: EASE.out }}
        />
      </Depth>
      <Depth x={sx} y={sy} depth={16} className="absolute right-2 top-2 z-10 sm:right-6 sm:top-4">
        <motion.div {...float(5, 7)}>
          <motion.div className="h-24 w-24 rounded-full bg-[#F5C748] shadow-xs sm:h-28 sm:w-28 lg:h-32 lg:w-32" {...enter(0.35, -10)} />
        </motion.div>
      </Depth>
      <Depth x={sx} y={sy} depth={-6} className="absolute left-2 top-4">
        <motion.div className="h-28 w-28 bg-[radial-gradient(#131921_1.8px,transparent_1.8px)] [background-size:10px_10px]"
          initial={{ opacity: 0 }} animate={{ opacity: 0.3 }} transition={{ duration: 1, delay: 0.5 }} />
      </Depth>

      <div className="relative z-20 h-56 w-72 sm:h-72 sm:w-[420px] lg:h-[310px] lg:w-[480px] xl:h-[350px] xl:w-[540px]">
        <svg className="h-full w-full overflow-visible text-[#131921]" viewBox="0 0 420 350" fill="none" stroke="currentColor">
          {/* Ground line draws first, the blocks then settle onto it. */}
          <motion.path d="M 20 320 Q 200 345, 390 310" stroke="#0F8B75" strokeWidth="2" strokeDasharray="4 4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.15 }} />

          <SvgDepth x={sx} y={sy} depth={4}>
            <motion.g {...enter(0.2)}>
              <path d="M 60 210 L 150 170 L 150 290 L 60 320 Z" fill="#FFFFFF" strokeWidth="2.2" strokeLinejoin="round" />
              <path d="M 150 170 L 230 200 L 230 310 L 150 290 Z" fill="#F8F9FA" strokeWidth="2.2" strokeLinejoin="round" />
              <path d="M 60 210 L 140 180 L 230 200 L 150 170 Z" fill="#F3C258" strokeWidth="2.2" strokeLinejoin="round" />
            </motion.g>
          </SvgDepth>
          <SvgDepth x={sx} y={sy} depth={7}>
            <motion.g {...enter(0.3, 26)}>
              <path d="M 150 140 L 230 100 L 230 200 L 150 230 Z" fill="#FFFFFF" strokeWidth="2.2" strokeLinejoin="round" />
              <path d="M 230 100 L 300 130 L 300 230 L 230 200 Z" fill="#0F8B75" strokeWidth="2.2" strokeLinejoin="round" />
              <path d="M 150 140 L 220 110 L 300 130 L 230 100 Z" fill="#FFFFFF" strokeWidth="2.2" strokeLinejoin="round" />
            </motion.g>
          </SvgDepth>
          <SvgDepth x={sx} y={sy} depth={5}>
            <motion.g {...enter(0.38)}>
              <path d="M 280 190 L 360 160 L 360 290 L 280 320 Z" fill="#FFFFFF" strokeWidth="2.2" strokeLinejoin="round" />
              <path d="M 360 160 L 400 180 L 400 300 L 360 290 Z" fill="#E2E8F0" strokeWidth="2.2" strokeLinejoin="round" />
              <path d="M 280 190 L 320 170 L 400 180 L 360 160 Z" fill="#FFFFFF" strokeWidth="2.2" strokeLinejoin="round" />
            </motion.g>
          </SvgDepth>
          <SvgDepth x={sx} y={sy} depth={9}>
            <motion.g {...enter(0.46)}>
              <path d="M 180 230 L 270 190 L 270 300 L 180 330 Z" fill="#FFFFFF" strokeWidth="2.2" strokeLinejoin="round" />
              <path d="M 270 190 L 320 210 L 320 310 L 270 300 Z" fill="#131921" strokeWidth="2.2" strokeLinejoin="round" fillOpacity="0.8" />
              <path d="M 180 230 L 230 205 L 320 210 L 270 190 Z" fill="#FFFFFF" strokeWidth="2.2" strokeLinejoin="round" />
            </motion.g>
          </SvgDepth>

          {/* The code window lands last and is the most responsive layer. */}
          <SvgDepth x={sx} y={sy} depth={14}>
            <motion.g {...enter(0.62, -22)}>
              <rect x="225" y="88" width="80" height="100" rx="10" fill="#FFFFFF" stroke="#131921" strokeWidth="2.5" transform="rotate(-3 225 88)" />
              <rect x="233" y="96" width="64" height="84" rx="6" fill="#FFFFFF" stroke="#131921" strokeWidth="1.5" transform="rotate(-3 225 88)" />
              <text x="248" y="142" fontFamily="monospace" fontSize="22" fontWeight="900" fill="#131921" stroke="none">&lt;/&gt;</text>
              <motion.line x1="255" y1="158" x2="275" y2="158" stroke="#131921" strokeWidth="3" strokeLinecap="round"
                {...(reduce ? {} : { animate: { opacity: [1, 0.25, 1] }, transition: { duration: 1.6, repeat: Infinity, ease: 'easeInOut' } })} />
            </motion.g>
          </SvgDepth>

          <SvgDepth x={sx} y={sy} depth={6}>
            <motion.g style={{ transformOrigin: '350px 155px', transformBox: 'view-box' }}
              initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, ease: EASE.out, delay: 0.75 }}>
              <path d="M 345 135 L 355 135 L 352 155 L 348 155 Z" fill="#131921" />
              <motion.g style={{ transformOrigin: '350px 135px', transformBox: 'view-box' }}
                {...(reduce ? {} : { animate: { rotate: [-3, 3, -3] }, transition: { duration: 6, repeat: Infinity, ease: 'easeInOut' } })}>
                <path d="M 350 135 Q 340 120, 335 125 Q 345 130, 350 135 Z" fill="#0F8B75" />
                <path d="M 350 135 Q 360 118, 365 122 Q 355 128, 350 135 Z" fill="#0F8B75" />
                <path d="M 350 135 Q 350 115, 350 110" stroke="#131921" strokeWidth="1.5" />
              </motion.g>
            </motion.g>
          </SvgDepth>
        </svg>
      </div>

      <Depth x={sx} y={sy} depth={12} className="absolute right-0 top-0 z-30 space-y-0.5 text-left sm:right-2 lg:-right-2">
        {['Clean code.', 'Thoughtful design.', 'Real results.'].map((line, index) => (
          <motion.p key={line} className="font-handwritten text-sm font-semibold leading-tight text-[#131921] sm:text-base lg:text-lg"
            initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, ease: EASE.out, delay: 0.9 + index * 0.12 }}>
            {line}
          </motion.p>
        ))}
        <svg className="mt-1 h-10 w-8 text-[#131921]" viewBox="0 0 40 50" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <motion.path d="M 5 10 Q 30 2, 25 30 Q 20 45, 10 35" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 1.3, ease: EASE.out }} />
          <motion.polyline points="15 42, 10 35, 18 30" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }} />
        </svg>
      </Depth>

      <span className="absolute left-4 top-4 text-xs font-bold text-[#131921]">✦</span>
      <span className="absolute right-24 top-12 text-xs font-bold text-[#131921]">✚</span>
      <span className="absolute bottom-6 left-0 text-xs font-bold text-[#131921]">✦</span>
    </div>
  );
}

interface DepthProps { x: MotionValue<number>; y: MotionValue<number>; depth: number; className?: string; children: ReactNode; extraY?: MotionValue<number> }

/** Offsets its children by `depth` px across the pointer range. */
function Depth({ x, y, depth, className, children, extraY }: DepthProps) {
  const dx = useTransform(x, (value) => value * depth);
  const pointerY = useTransform(y, (value) => value * depth);
  const zero = useMotionValue(0);
  const scrollY = extraY ?? zero;
  const dy = useTransform([pointerY, scrollY], ([a, b]: number[]) => a + b);
  return <motion.div className={className} style={{ x: dx, y: dy }}>{children}</motion.div>;
}

function SvgDepth({ x, y, depth, children }: Omit<DepthProps, 'className' | 'extraY'>) {
  const dx = useTransform(x, (value) => value * depth);
  const dy = useTransform(y, (value) => value * depth);
  return <motion.g style={{ x: dx, y: dy }}>{children}</motion.g>;
}
