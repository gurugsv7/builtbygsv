import type { ComponentType } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { BookOpen, Captions, GraduationCap, Bell, CalendarDays, Scissors, Sparkles, Wand2, Wallet } from 'lucide-react';

/**
 * Animated interface previews for builds that have no captured screens yet. They are
 * drawn in code, labelled as previews, and stand in for the screenshot covers.
 */

const loop = (reduce: boolean | null, duration: number, delay = 0) =>
  reduce ? { duration: 0 } : { duration, delay, repeat: Infinity, ease: 'easeInOut' as const };

function WindowChrome({ dark, label }: { dark?: boolean; label: string }) {
  return (
    <div className={`flex items-center gap-1.5 border-b px-3 py-2 ${dark ? 'border-white/10' : 'border-slate-200'}`}>
      {['#F87171', '#FBBF24', '#34D399'].map((color) => <span key={color} className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />)}
      <span className={`ml-2 truncate font-mono text-[8px] font-bold ${dark ? 'text-white/40' : 'text-slate-400'}`}>{label}</span>
      <span className={`ml-auto rounded-full px-1.5 py-0.5 text-[7px] font-extrabold uppercase tracking-wider ${dark ? 'bg-violet-500/20 text-violet-200' : 'bg-indigo-50 text-indigo-600'}`}>Preview</span>
    </div>
  );
}

const CAPTION = ['Every', 'cut', 'lands', 'on', 'the', 'beat'];
const CLIPS = [
  { w: 22, color: '#8B5CF6' }, { w: 16, color: '#EC4899' }, { w: 28, color: '#6366F1' }, { w: 14, color: '#A855F7' }, { w: 20, color: '#F472B6' },
];

/** Reelcut: an AI video editor with a live preview, suggestions and a moving timeline. */
export function ReelcutScreen() {
  const reduce = useReducedMotion();
  return (
    <div aria-hidden="true" className="w-full overflow-hidden rounded-xl border border-white/10 bg-[#0D0A18] text-white shadow-2xl shadow-violet-950/50">
      <WindowChrome dark label="reelcut.app / project / launch-teaser" />
      <div className="grid grid-cols-[1fr_32%] gap-2 p-2">
        <div className="relative aspect-video overflow-hidden rounded-lg bg-gradient-to-br from-violet-600 via-fuchsia-600 to-orange-400">
          <motion.div className="absolute -left-1/4 top-0 h-full w-1/2 bg-white/20 blur-2xl" animate={{ x: ['0%', '220%'] }} transition={loop(reduce, 4)} />
          <motion.div className="absolute bottom-[30%] left-[18%] h-[38%] w-[22%] rounded-full bg-white/25" animate={{ scale: [1, 1.08, 1] }} transition={loop(reduce, 2.4)} />
          <motion.div className="absolute right-[14%] top-[18%] h-[30%] w-[30%] rounded-lg border border-white/50"
            animate={{ opacity: [0.2, 1, 0.2] }} transition={loop(reduce, 3)}>
            <span className="absolute -top-3 left-0 rounded bg-white px-1 text-[6px] font-extrabold text-violet-700">Subject tracked</span>
          </motion.div>
          <div className="absolute inset-x-0 bottom-2 flex flex-wrap justify-center gap-1 px-2">
            {CAPTION.map((word, index) => (
              <motion.span key={word} className="rounded px-0.5 text-[9px] font-black uppercase leading-none sm:text-[11px]"
                animate={reduce ? undefined : { backgroundColor: ['rgba(0,0,0,0)', '#FACC15', 'rgba(0,0,0,0)'], color: ['#FFFFFF', '#111827', '#FFFFFF'] }}
                transition={reduce ? undefined : { duration: 0.6, delay: index * 0.45, repeat: Infinity, repeatDelay: CAPTION.length * 0.45 - 0.6 }}>
                {word}
              </motion.span>
            ))}
          </div>
        </div>
        <div className="space-y-1.5">
          <p className="flex items-center gap-1 text-[8px] font-extrabold uppercase tracking-wider text-violet-300"><Sparkles className="h-2.5 w-2.5" /> AI assist</p>
          {[
            { icon: Scissors, label: 'Remove silences', done: '−42s' },
            { icon: Captions, label: 'Auto captions', done: 'EN · TA' },
            { icon: Wand2, label: 'Smart reframe', done: '9:16' },
          ].map(({ icon: Icon, label, done }, index) => (
            <motion.div key={label} className="flex items-center gap-1.5 rounded-md bg-white/5 px-1.5 py-1"
              animate={reduce ? undefined : { backgroundColor: ['rgba(255,255,255,.05)', 'rgba(139,92,246,.35)', 'rgba(255,255,255,.05)'] }}
              transition={reduce ? undefined : { duration: 1.6, delay: index * 1.2, repeat: Infinity, repeatDelay: 2 }}>
              <Icon className="h-2.5 w-2.5 shrink-0 text-violet-300" />
              <span className="min-w-0 flex-1 truncate text-[8px] font-bold">{label}</span>
              <span className="font-mono text-[7px] text-white/50">{done}</span>
            </motion.div>
          ))}
          <motion.div className="rounded-md bg-gradient-to-r from-violet-500 to-fuchsia-500 px-1.5 py-1 text-center text-[8px] font-extrabold"
            animate={reduce ? undefined : { scale: [1, 1.04, 1] }} transition={loop(reduce, 1.8)}>
            Export reel
          </motion.div>
        </div>
      </div>
      <div className="relative space-y-1 border-t border-white/10 p-2">
        <div className="flex gap-0.5">
          {CLIPS.map((clip, index) => (
            <motion.span key={index} className="h-4 rounded-sm" style={{ width: `${clip.w}%`, backgroundColor: clip.color }}
              initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.5, delay: 0.2 + index * 0.08 }} />
          ))}
        </div>
        <div className="flex h-4 items-center gap-[2px]">
          {Array.from({ length: 48 }, (_, index) => (
            <motion.span key={index} className="w-full rounded-full bg-emerald-400/70"
              animate={reduce ? { height: '50%' } : { height: ['25%', `${30 + ((index * 37) % 70)}%`, '25%'] }}
              transition={reduce ? { duration: 0 } : { duration: 1 + (index % 5) * 0.2, repeat: Infinity, ease: 'easeInOut' }} />
          ))}
        </div>
        <div className="flex gap-0.5">
          {[30, 18, 26, 20].map((w, index) => <span key={index} className="h-2 rounded-sm bg-yellow-300/70" style={{ width: `${w}%` }} />)}
        </div>
        <motion.span className="absolute bottom-1 top-1 w-0.5 rounded-full bg-white shadow-[0_0_8px_white]"
          animate={reduce ? { left: '40%' } : { left: ['2%', '97%'] }} transition={reduce ? { duration: 0 } : { duration: 6, repeat: Infinity, ease: 'linear' }} />
      </div>
    </div>
  );
}

const COURSES = [
  { name: 'Data Structures', pct: 78, color: '#4F46E5' },
  { name: 'Engineering Maths', pct: 62, color: '#0EA5E9' },
  { name: 'Digital Systems', pct: 91, color: '#10B981' },
];

/** Campus One: an institute portal dashboard with attendance, courses, fees and notices. */
export function CampusOneScreen() {
  const reduce = useReducedMotion();
  const ring = 2 * Math.PI * 16;
  return (
    <div aria-hidden="true" className="w-full overflow-hidden rounded-xl border border-slate-200 bg-white text-[#131921] shadow-2xl shadow-indigo-900/20">
      <WindowChrome label="campusone.app / student / dashboard" />
      <div className="grid grid-cols-[2.25rem_1fr]">
        <div className="flex flex-col items-center gap-2 border-r border-slate-100 bg-indigo-600 py-2 text-white/70">
          <GraduationCap className="h-4 w-4 text-white" />
          {[BookOpen, CalendarDays, Wallet, Bell].map((Icon, index) => (
            <span key={index} className={`flex h-6 w-6 items-center justify-center rounded-md ${index === 0 ? 'bg-white/20 text-white' : ''}`}><Icon className="h-3 w-3" /></span>
          ))}
        </div>
        <div className="space-y-2 bg-slate-50 p-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[7px] font-bold uppercase tracking-wider text-slate-400">Semester 4 · B.E. CSE</p>
              <p className="text-[11px] font-extrabold">Good morning 👋</p>
            </div>
            <motion.span className="relative flex h-5 w-5 items-center justify-center rounded-full bg-white shadow-sm"
              animate={reduce ? undefined : { rotate: [0, -14, 14, -8, 0] }} transition={reduce ? undefined : { duration: 0.8, repeat: Infinity, repeatDelay: 2.4 }}>
              <Bell className="h-2.5 w-2.5 text-indigo-600" />
              <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-rose-500" />
            </motion.span>
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            <div className="col-span-1 flex flex-col items-center rounded-lg bg-white p-1.5 shadow-sm">
              <svg viewBox="0 0 40 40" className="h-10 w-10 -rotate-90">
                <circle cx="20" cy="20" r="16" fill="none" stroke="#E0E7FF" strokeWidth="4" />
                <motion.circle cx="20" cy="20" r="16" fill="none" stroke="#4F46E5" strokeWidth="4" strokeLinecap="round" strokeDasharray={ring}
                  initial={{ strokeDashoffset: ring }} animate={{ strokeDashoffset: ring * 0.13 }} transition={{ duration: 1.4, ease: 'easeOut', delay: 0.3 }} />
              </svg>
              <p className="-mt-0.5 text-[9px] font-extrabold">87%</p>
              <p className="text-[6px] font-bold uppercase text-slate-400">Attendance</p>
            </div>
            <div className="col-span-2 space-y-1 rounded-lg bg-white p-1.5 shadow-sm">
              <p className="text-[7px] font-bold uppercase tracking-wider text-slate-400">Course progress</p>
              {COURSES.map((course, index) => (
                <div key={course.name}>
                  <div className="flex justify-between text-[7px] font-bold"><span className="truncate">{course.name}</span><span className="text-slate-400">{course.pct}%</span></div>
                  <div className="mt-0.5 h-1 rounded-full bg-slate-100">
                    <motion.div className="h-full rounded-full" style={{ backgroundColor: course.color }}
                      initial={{ width: 0 }} animate={{ width: `${course.pct}%` }} transition={{ duration: 1.1, ease: 'easeOut', delay: 0.4 + index * 0.15 }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            <div className="space-y-1 rounded-lg bg-white p-1.5 shadow-sm">
              <p className="text-[7px] font-bold uppercase tracking-wider text-slate-400">Today</p>
              {[['09:00', 'DSA Lab'], ['11:15', 'Maths'], ['14:00', 'Seminar']].map(([time, title], index) => (
                <motion.div key={time} className="flex items-center gap-1 text-[7px]"
                  initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 + index * 0.12 }}>
                  <span className="font-mono text-slate-400">{time}</span>
                  <span className={`truncate rounded px-1 font-bold ${index === 0 ? 'bg-indigo-600 text-white' : 'bg-indigo-50 text-indigo-700'}`}>{title}</span>
                </motion.div>
              ))}
            </div>
            <div className="flex flex-col justify-between rounded-lg bg-gradient-to-br from-indigo-600 to-violet-600 p-1.5 text-white shadow-sm">
              <p className="text-[7px] font-bold uppercase tracking-wider text-white/70">Fee status</p>
              <p className="text-[10px] font-extrabold">Term 2 paid ✓</p>
              <span className="self-start rounded bg-white/20 px-1 text-[6px] font-bold">Receipt</span>
            </div>
          </div>
          <div className="overflow-hidden rounded-lg bg-amber-50 px-1.5 py-1">
            <motion.p className="whitespace-nowrap text-[7px] font-bold text-amber-800"
              animate={reduce ? undefined : { x: ['100%', '-100%'] }} transition={reduce ? undefined : { duration: 9, repeat: Infinity, ease: 'linear' }}>
              📢 Internal assessment schedule published · Hackathon registrations open · Library hours extended
            </motion.p>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Project id → animated preview, for projects without captured screens. */
export const CONCEPT_SCREENS: Record<string, ComponentType> = {
  'reelcut-ai-video-editor': ReelcutScreen,
  'campus-one-institute-portal': CampusOneScreen,
};

/** The animated preview for a project, clipped to its frame; null when it has none. */
export function ConceptCover({ projectId, className = '' }: { projectId: string; className?: string }) {
  const Screen = CONCEPT_SCREENS[projectId];
  if (!Screen) return null;
  return <div className={`overflow-hidden rounded-xl ${className}`}><Screen /></div>;
}
