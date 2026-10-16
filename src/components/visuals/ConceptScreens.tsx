import { useEffect, useLayoutEffect, useRef, useState, type ComponentType, type ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { BatteryFull, ChevronLeft, Scissors, Signal, Wifi } from 'lucide-react';
import editingIsDead from '../../assets/reels/editing-is-dead.webp';
import stopChatgptCode from '../../assets/reels/stop-chatgpt-code.webp';
import claudeCredits from '../../assets/reels/claude-credits.webp';
import studentFreebies from '../../assets/reels/student-freebies.webp';
import aiLieDetector from '../../assets/reels/ai-lie-detector.webp';

/**
 * Phone-screen previews for builds that have no captured screens yet. Each screen is
 * drawn at a fixed device size and scaled to fit whatever frame it is placed in.
 */

const DEVICE = { width: 300, height: 640 };

/**
 * Scales a fixed-size child into its parent, which needs a height. By default the whole
 * device fits, centred. With `peek` (0-1) only that top fraction of the device has to
 * fit: it is drawn larger, anchored near the top, and the rest is cropped by the frame.
 */
function FitBox({ children, peek }: { children: ReactNode; peek?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);
  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;
    const update = () => {
      const width = element.clientWidth;
      const height = element.clientHeight || Infinity;
      const fitHeight = peek ? DEVICE.height * peek : DEVICE.height;
      setScale(Math.min((peek ? 0.86 : 1) * width / DEVICE.width, height / fitHeight));
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(element);
    return () => observer.disconnect();
  }, [peek]);
  return (
    <div ref={ref} className={`relative h-full w-full ${peek ? 'overflow-hidden' : ''}`}>
      <div className={`absolute left-1/2 ${peek ? 'top-[6%] origin-top' : 'top-1/2'}`}
        style={{ width: DEVICE.width, height: DEVICE.height, transform: peek ? `translateX(-50%) scale(${scale})` : `translate(-50%, -50%) scale(${scale})` }}>
        {children}
      </div>
    </div>
  );
}

function Phone({ children, dark }: { children: ReactNode; dark?: boolean }) {
  return (
    <div data-concept-screen className="h-full w-full rounded-[46px] bg-[#0B0B0C] p-[7px] shadow-[0_30px_60px_-25px_rgba(0,0,0,.55)]">
      <div className={`relative flex h-full w-full flex-col overflow-hidden rounded-[39px] font-sans ${dark ? 'bg-[#121212] text-white' : 'bg-[#F4F6F9] text-[#0F1A2A]'}`}>
        <div className="flex h-9 shrink-0 items-center justify-between px-6 pt-1 text-[12px] font-semibold">
          <span>9:41</span>
          <span className="absolute left-1/2 top-2 h-[22px] w-[84px] -translate-x-1/2 rounded-full bg-black" />
          <span className="flex items-center gap-1"><Signal className="h-3 w-3" /><Wifi className="h-3 w-3" /><BatteryFull className="h-3.5 w-3.5" /></span>
        </div>
        {children}
      </div>
    </div>
  );
}

/** Loops an index from 0 to count - 1 every `ms`, unless reduced motion is on. */
function useTicker(count: number, ms: number) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (reduce) return;
    const timer = window.setInterval(() => setIndex((value) => (value + 1) % count), ms);
    return () => window.clearInterval(timer);
  }, [count, ms, reduce]);
  return index;
}

/* ------------------------------------------------------------------ Reelcut */

/** Real BuiltbyGSV reel covers, produced with the studio's own video pipeline. */
export const REEL_COVERS = [editingIsDead, stopChatgptCode, claudeCredits, studentFreebies, aiLieDetector];

type Word = { text: string; cut?: boolean };
const TRANSCRIPT: Word[] = [
  { text: 'So' }, { text: 'um,', cut: true }, { text: 'video' }, { text: 'editing' }, { text: 'is' },
  { text: 'you know,', cut: true }, { text: 'basically' }, { text: 'dead.' }, { text: 'Claude' }, { text: 'cuts,' },
  { text: 'captions' }, { text: 'and' }, { text: 'like,', cut: true }, { text: 'renders' }, { text: 'the' }, { text: 'whole' }, { text: 'reel.' },
];
const SPOKEN = TRANSCRIPT.map((word, index) => ({ ...word, index })).filter((word) => !word.cut);
const CUTS = [19, 41, 58, 81];

/** Reelcut: transcript-first video editing on a phone, shown on a real reel. */
export function ReelcutScreen() {
  const spoken = useTicker(SPOKEN.length, 520);
  const reduce = useReducedMotion();
  const activeWord = SPOKEN[spoken].index;
  return (
    <Phone dark>
      <div className="flex shrink-0 items-center gap-2 px-4 pb-2 pt-1">
        <ChevronLeft className="h-5 w-5 text-white/70" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-[14px] font-bold leading-tight">Editing is dead</p>
          <p className="text-[11px] text-white/50">0:42 · 9:16 · Captions EN</p>
        </div>
        <span className="rounded-full bg-[#FF5A36] px-3 py-1.5 text-[12px] font-bold">Export</span>
      </div>

      <div className="relative mx-3 h-[262px] shrink-0 overflow-hidden rounded-[18px] bg-[#E9E1D2]">
        <motion.img src={editingIsDead} alt="" draggable={false} className="h-full w-full object-cover object-[50%_18%]"
          animate={reduce ? undefined : { scale: [1, 1.05] }} transition={{ duration: 9, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }} />
        <div className="absolute inset-x-3 bottom-3 h-1 overflow-hidden rounded-full bg-black/25">
          <motion.div className="h-full bg-[#FF5A36]" animate={reduce ? { width: '30%' } : { width: ['0%', '100%'] }}
            transition={reduce ? { duration: 0 } : { duration: 8, repeat: Infinity, ease: 'linear' }} />
        </div>
      </div>

      <div className="mx-3 mt-3 shrink-0 rounded-[16px] bg-white/[0.06] p-3">
        <div className="flex items-center justify-between">
          <p className="text-[12px] font-bold">Transcript</p>
          <span className="flex items-center gap-1.5 text-[11px] text-white/60">
            Remove fillers
            <span className="flex h-4 w-7 items-center justify-end rounded-full bg-[#FF5A36] px-0.5"><span className="h-3 w-3 rounded-full bg-white" /></span>
          </span>
        </div>
        <p className="mt-2 text-[13px] leading-[1.55] text-white/85">
          {TRANSCRIPT.map((word, index) => (
            <span key={index}>
              <span className={word.cut ? 'text-[#FF8A70] line-through decoration-[#FF5A36] opacity-70'
                : index === activeWord ? 'rounded bg-white px-0.5 text-[#121212]' : ''}>{word.text}</span>{' '}
            </span>
          ))}
        </p>
      </div>

      <div className="mx-3 mt-3 shrink-0">
        <div className="relative h-12 overflow-hidden rounded-[10px]">
          <div className="flex h-full gap-[2px]">
            {REEL_COVERS.map((src) => (
              <img key={src} src={src} alt="" draggable={false} className="h-full min-w-0 flex-1 object-cover object-top" />
            ))}
          </div>
          {CUTS.map((left) => <span key={left} className="absolute inset-y-0 w-[3px] bg-[#FF5A36]" style={{ left: `${left}%` }} />)}
          <motion.span className="absolute inset-y-0 w-[2px] bg-white shadow-[0_0_0_1px_rgba(0,0,0,.4)]" animate={reduce ? { left: '40%' } : { left: ['0%', '99%'] }}
            transition={reduce ? { duration: 0 } : { duration: 8, repeat: Infinity, ease: 'linear' }} />
        </div>
        <div className="mt-2.5 flex gap-1.5 text-[11px] font-semibold">
          <span className="flex items-center gap-1 rounded-full bg-[#FF5A36]/15 px-2 py-1 text-[#FF8A70]"><Scissors className="h-3 w-3" /> 3 fillers · −42s silence</span>
          <span className="rounded-full bg-white/10 px-2 py-1 text-white/70">5 reels</span>
        </div>
      </div>
    </Phone>
  );
}

/** Project id → phone-screen preview, for projects without captured screens. */
export const CONCEPT_SCREENS: Record<string, ComponentType> = {
  'reelcut-ai-video-editor': ReelcutScreen,
};

/** The preview for a project, scaled to fill its frame; null when it has none. The frame needs a height. */
export function ConceptCover({ projectId, className = '', peek }: { projectId: string; className?: string; peek?: number }) {
  const Screen = CONCEPT_SCREENS[projectId];
  if (!Screen) return null;
  return <div aria-hidden="true" className={className}><FitBox peek={peek}><Screen /></FitBox></div>;
}
