import { useEffect, useLayoutEffect, useRef, useState, type ComponentType, type ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  BatteryFull, Bell, BookOpen, CalendarDays, Check, ChevronLeft, Home, Scissors, Signal, User, Wallet, Wifi,
} from 'lucide-react';

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

const CAPTION_LINES = [['THIS', 'IS', 'HOW'], ['WE', 'SHIP', 'FASTER']];
const CAPTION_WORDS = CAPTION_LINES.flat();
type Word = { text: string; cut?: boolean };
const TRANSCRIPT: Word[] = [
  { text: 'So' }, { text: 'um,', cut: true }, { text: 'this' }, { text: 'is' }, { text: 'how' }, { text: 'we' },
  { text: 'you know,', cut: true }, { text: 'ship' }, { text: 'faster.' }, { text: 'Every' }, { text: 'release' },
  { text: 'starts' }, { text: 'with' }, { text: 'like,', cut: true }, { text: 'one' }, { text: 'real' }, { text: 'problem.' },
];
const SPOKEN = TRANSCRIPT.map((word, index) => ({ ...word, index })).filter((word) => !word.cut);
const CUTS = [14, 37, 61, 83];

function Speaker() {
  const reduce = useReducedMotion();
  return (
    <svg viewBox="0 0 270 300" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
      <rect width="270" height="300" fill="#2A2420" />
      <rect x="150" y="26" width="96" height="120" rx="4" fill="#3A322C" />
      <rect x="156" y="32" width="84" height="108" rx="2" fill="#4B4038" />
      <line x1="198" y1="32" x2="198" y2="140" stroke="#3A322C" strokeWidth="3" />
      <rect x="18" y="168" width="54" height="132" fill="#221D1A" />
      <path d="M36 168 C 30 140, 52 128, 48 104 M48 120 C 62 112, 66 98, 74 92 M44 140 C 30 128, 22 124, 16 112" stroke="#5E7A55" strokeWidth="6" strokeLinecap="round" fill="none" />
      <motion.g animate={reduce ? undefined : { y: [0, -1.5, 0] }} transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}>
        <path d="M58 300 C 62 236, 92 214, 135 212 C 178 214, 208 236, 212 300 Z" fill="#2F5D50" />
        <path d="M118 212 L135 236 L152 212 Z" fill="#E9E2D6" />
        <rect x="122" y="182" width="26" height="34" rx="10" fill="#B07A57" />
        <ellipse cx="135" cy="150" rx="38" ry="44" fill="#C08A65" />
        <path d="M97 146 C 94 108, 120 96, 138 98 C 162 98, 178 114, 173 146 C 168 128, 156 118, 136 118 C 116 118, 102 128, 97 146 Z" fill="#1E1916" />
        <motion.ellipse cx="135" cy="172" rx="9" fill="#7A4632" animate={reduce ? { ry: 2.5 } : { ry: [2, 5, 2.5, 4.5, 2] }} transition={{ duration: 1.1, repeat: Infinity }} />
        <circle cx="122" cy="148" r="3" fill="#2A1C14" />
        <circle cx="148" cy="148" r="3" fill="#2A1C14" />
      </motion.g>
    </svg>
  );
}

/** Reelcut: transcript-first video editing on a phone. */
export function ReelcutScreen() {
  const spoken = useTicker(SPOKEN.length, 520);
  const captionIndex = useTicker(CAPTION_WORDS.length, 520);
  const reduce = useReducedMotion();
  const activeWord = SPOKEN[spoken].index;
  return (
    <Phone dark>
      <div className="flex shrink-0 items-center gap-2 px-4 pb-2 pt-1">
        <ChevronLeft className="h-5 w-5 text-white/70" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-[14px] font-bold leading-tight">Launch teaser</p>
          <p className="text-[11px] text-white/50">0:58 · 9:16 · 2 speakers</p>
        </div>
        <span className="rounded-full bg-[#FF5A36] px-3 py-1.5 text-[12px] font-bold">Export</span>
      </div>

      <div className="relative mx-3 h-[262px] shrink-0 overflow-hidden rounded-[18px]">
        <Speaker />
        <span className="absolute left-2.5 top-2.5 rounded-md bg-black/55 px-1.5 py-0.5 text-[10px] font-semibold text-white/90">Auto-framed</span>
        <span className="absolute right-2.5 top-2.5 font-mono text-[10px] font-semibold text-white/80">00:12</span>
        <div className="absolute inset-x-0 bottom-5 flex flex-col items-center gap-0.5">
          {CAPTION_LINES.map((line, lineIndex) => (
            <p key={lineIndex} className="flex gap-1.5 text-[19px] font-black leading-none tracking-tight [text-shadow:0_2px_0_#000,0_0_6px_rgba(0,0,0,.6)]">
              {line.map((word) => {
                const on = CAPTION_WORDS[captionIndex] === word;
                return <span key={word} className={on ? 'text-[#FFD43B]' : 'text-white'}>{word}</span>;
              })}
            </p>
          ))}
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
        <div className="relative h-10 overflow-hidden rounded-[10px]">
          <div className="flex h-full gap-[2px]">
            {['#3A322C', '#2F5D50', '#4B4038', '#2A2420', '#3A322C', '#2F5D50', '#4B4038', '#3A322C'].map((color, index) => (
              <span key={index} className="h-full flex-1" style={{ backgroundColor: color }} />
            ))}
          </div>
          {CUTS.map((left) => <span key={left} className="absolute inset-y-0 w-[3px] bg-[#FF5A36]" style={{ left: `${left}%` }} />)}
          <motion.span className="absolute inset-y-0 w-[2px] bg-white" animate={reduce ? { left: '40%' } : { left: ['0%', '99%'] }}
            transition={reduce ? { duration: 0 } : { duration: 8, repeat: Infinity, ease: 'linear' }} />
        </div>
        <div className="mt-2.5 flex gap-1.5 text-[11px] font-semibold">
          <span className="flex items-center gap-1 rounded-full bg-[#FF5A36]/15 px-2 py-1 text-[#FF8A70]"><Scissors className="h-3 w-3" /> 3 fillers · −42s silence</span>
          <span className="rounded-full bg-white/10 px-2 py-1 text-white/70">Captions EN</span>
        </div>
      </div>
    </Phone>
  );
}

/* --------------------------------------------------------------- Campus One */

const SUBJECTS = [
  { name: 'Data Structures', pct: 94 },
  { name: 'Engineering Maths', pct: 72 },
  { name: 'DBMS', pct: 88 },
];

/** Campus One: a student's day in an institute portal. */
export function CampusOneScreen() {
  const reduce = useReducedMotion();
  const minutes = 12 - useTicker(3, 2600);
  return (
    <Phone>
      <div className="flex shrink-0 items-center justify-between px-5 pb-3 pt-2">
        <div>
          <p className="text-[11px] font-semibold text-[#5B6B80]">Mon, 14 Oct · Sem 4 · CSE</p>
          <p className="text-[21px] font-extrabold leading-tight tracking-tight">Hi, Aarav</p>
        </div>
        <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-[#1F4E79] text-[12px] font-bold text-white">
          AK<span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#F4F6F9] bg-[#F59E0B]" />
        </span>
      </div>

      <div className="mx-4 shrink-0 rounded-[18px] bg-[#1F4E79] p-4 text-white">
        <div className="flex items-center justify-between text-[11px] font-semibold">
          <span className="text-white/70">NEXT CLASS</span>
          <span className="rounded-full bg-[#F59E0B] px-2 py-0.5 font-bold text-[#1F2937]">in {minutes} min</span>
        </div>
        <p className="mt-2 text-[17px] font-bold leading-tight">Data Structures Lab</p>
        <p className="mt-0.5 text-[12px] text-white/75">Lab 3 · Prof. R. Meena · 09:00–10:40</p>
        <div className="mt-3 h-1 rounded-full bg-white/20">
          <motion.div className="h-full rounded-full bg-white" initial={{ width: '62%' }} animate={{ width: reduce ? '70%' : ['62%', '78%'] }}
            transition={{ duration: 7.8, repeat: reduce ? 0 : Infinity, ease: 'linear' }} />
        </div>
      </div>

      <div className="mx-4 mt-3 shrink-0 rounded-[18px] bg-white p-4 shadow-[0_1px_2px_rgba(15,26,42,.06)]">
        <div className="flex items-baseline justify-between">
          <p className="text-[13px] font-bold">Attendance</p>
          <p className="text-[20px] font-extrabold tracking-tight">87%</p>
        </div>
        <div className="mt-2.5 space-y-2.5">
          {SUBJECTS.map((subject, index) => {
            const low = subject.pct < 75;
            return (
              <div key={subject.name}>
                <div className="flex justify-between text-[12px]">
                  <span className="text-[#334155]">{subject.name}</span>
                  <span className={`font-semibold ${low ? 'text-[#B45309]' : 'text-[#334155]'}`}>{subject.pct}%</span>
                </div>
                <div className="relative mt-1 h-1.5 rounded-full bg-[#E5EAF0]">
                  <span className="absolute inset-y-[-3px] left-[75%] w-px bg-[#94A3B8]" />
                  <motion.div className="h-full rounded-full" style={{ backgroundColor: low ? '#F59E0B' : '#1F4E79' }}
                    initial={{ width: 0 }} animate={{ width: `${subject.pct}%` }} transition={{ duration: 0.9, ease: 'easeOut', delay: 0.2 + index * 0.12 }} />
                </div>
                {low && <p className="mt-1 text-[11px] font-semibold text-[#B45309]">Below 75% · attend 4 more classes</p>}
              </div>
            );
          })}
        </div>
      </div>

      <div className="mx-4 mt-3 grid shrink-0 grid-cols-2 gap-3">
        <div className="rounded-[16px] bg-white p-3 shadow-[0_1px_2px_rgba(15,26,42,.06)]">
          <p className="text-[11px] font-semibold text-[#5B6B80]">Term 2 fees</p>
          <p className="mt-1 flex items-center gap-1 text-[14px] font-bold text-[#15803D]"><Check className="h-4 w-4" /> Paid</p>
          <p className="mt-0.5 text-[11px] text-[#5B6B80]">Receipt #2481</p>
        </div>
        <div className="rounded-[16px] bg-white p-3 shadow-[0_1px_2px_rgba(15,26,42,.06)]">
          <p className="text-[11px] font-semibold text-[#5B6B80]">Assignments</p>
          <p className="mt-1 text-[14px] font-bold">2 due</p>
          <p className="mt-0.5 text-[11px] text-[#5B6B80]">DBMS · Fri</p>
        </div>
      </div>

      <div className="mx-4 mt-3 flex shrink-0 items-start gap-2.5 rounded-[16px] bg-white p-3 shadow-[0_1px_2px_rgba(15,26,42,.06)]">
        <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#FEF3C7] text-[#B45309]"><Bell className="h-3.5 w-3.5" /></span>
        <div className="min-w-0">
          <p className="truncate text-[12px] font-bold">Internal assessment timetable</p>
          <p className="text-[11px] text-[#5B6B80]">Exam cell · 2h ago</p>
        </div>
      </div>

      <div className="mt-auto flex shrink-0 justify-around border-t border-[#E5EAF0] bg-white px-2 pb-5 pt-2">
        {[{ icon: Home, label: 'Home' }, { icon: CalendarDays, label: 'Timetable' }, { icon: BookOpen, label: 'Courses' }, { icon: Wallet, label: 'Fees' }, { icon: User, label: 'Profile' }].map(({ icon: Icon, label }, index) => (
          <span key={label} className={`flex flex-col items-center gap-0.5 text-[10px] font-semibold ${index === 0 ? 'text-[#1F4E79]' : 'text-[#94A3B8]'}`}>
            <Icon className="h-[18px] w-[18px]" />{label}
          </span>
        ))}
      </div>
    </Phone>
  );
}

/** Project id → phone-screen preview, for projects without captured screens. */
export const CONCEPT_SCREENS: Record<string, ComponentType> = {
  'reelcut-ai-video-editor': ReelcutScreen,
  'campus-one-institute-portal': CampusOneScreen,
};

/** The preview for a project, scaled to fill its frame; null when it has none. The frame needs a height. */
export function ConceptCover({ projectId, className = '', peek }: { projectId: string; className?: string; peek?: number }) {
  const Screen = CONCEPT_SCREENS[projectId];
  if (!Screen) return null;
  return <div aria-hidden="true" className={className}><FitBox peek={peek}><Screen /></FitBox></div>;
}
