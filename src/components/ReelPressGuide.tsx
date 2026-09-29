import { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import {
  AnimatePresence, motion, useAnimationFrame, useInView, useMotionValue, useReducedMotion, useScroll, useTransform,
} from 'motion/react';
import {
  ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Check, ChevronDown, Clapperboard, Copy, Film, Hexagon, List, Mic, Pause, Play,
  Sparkles, Terminal, X, type LucideIcon,
} from 'lucide-react';
import {
  REEL_CHAPTERS, REEL_KEYWORDS, REEL_SCENES, REEL_SCENE_NAMES, REEL_SPECS, REEL_STAMPS, REEL_TOOLS,
  type GuideBlock, type GuideChapter,
} from '../content/reelPressGuide';
import { useDialogFocus } from './useDialogFocus';
import { Reveal, useSequence } from '../motion/primitives';
import { DURATION, EASE, SPRING } from '../motion/tokens';

const CLAY = '#E85D22';
const TOTAL = REEL_SCENES[REEL_SCENES.length - 1].end;
const fmt = (value: number) => `${value.toFixed(1)}s`;

/* ================================================================ inline text */

const TOKEN = /(\*\*[\s\S]+?\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\)|\b_[^_]+_\b)/g;

/** Renders the guide's small inline markup: **bold**, _italic_, `code`, [link](url). */
function Rich({ text, dark = false }: { text: string; dark?: boolean }) {
  return (
    <>
      {text.split(TOKEN).filter(Boolean).map((part, index) => {
        if (part.startsWith('**')) return <strong key={index} className={`font-extrabold ${dark ? 'text-white' : 'text-[#131921]'}`}><Rich text={part.slice(2, -2)} dark={dark} /></strong>;
        if (part.startsWith('`')) return <code key={index} className={`rounded-md px-1.5 py-0.5 font-mono text-[0.86em] font-semibold [overflow-wrap:anywhere] ${dark ? 'bg-white/10 text-[#7EE0C6]' : 'bg-[#E9EEEB] text-[#0B4F43]'}`}>{part.slice(1, -1)}</code>;
        const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (link) return <a key={index} href={link[2]} target="_blank" rel="noopener noreferrer" className="u-link font-bold text-[#0F8B75]">{link[1]}</a>;
        if (/^_[^_]+_$/.test(part)) return <em key={index}>{part.slice(1, -1)}</em>;
        return <Fragment key={index}>{part}</Fragment>;
      })}
    </>
  );
}

/* ================================================================ the reel player */

/** Words of each scene's spoken line, spread across the scene so the captions follow the voice. */
const SCENE_WORDS = REEL_SCENES.map((scene) => {
  const words = scene.line.replace(/[“”"]/g, '').split(/\s+/).filter(Boolean);
  const span = (scene.end - scene.start) * 0.94;
  return words.map((word, index) => ({ word, at: scene.start + (index / words.length) * span }));
});

/** Caption chunks of roughly 18 characters, as in the reel. */
function chunk(words: { word: string }[]) {
  const chunks: number[][] = [];
  let current: number[] = [];
  let length = 0;
  words.forEach((item, index) => {
    if (current.length && length + item.word.length + 1 > 18) { chunks.push(current); current = []; length = 0; }
    current.push(index); length += item.word.length + 1;
  });
  if (current.length) chunks.push(current);
  return chunks;
}
const SCENE_CHUNKS = SCENE_WORDS.map(chunk);
const isKeyword = (word: string) => REEL_KEYWORDS.includes(word.toUpperCase().replace(/[^A-Z]/g, ''));

const CAPTION = 'font-black uppercase tracking-tight text-[#FFF4DC] [paint-order:stroke_fill] [-webkit-text-stroke:5px_#131921] [text-shadow:3px_3px_0_#131921]';

function locate(t: number) {
  const scene = Math.max(0, REEL_SCENES.findIndex((item) => t >= item.start && t < item.end));
  const words = SCENE_WORDS[scene];
  let word = 0;
  for (let index = 0; index < words.length; index += 1) if (t >= words[index].at) word = index;
  return { scene, word };
}

/**
 * A playable sketch of the 33.5s reel: each scene's signature word stamps in while
 * karaoke captions follow the script. It pauses off-screen, and reduced motion starts
 * it paused.
 */
function ReelPlayer({ size = 'lg' }: { size?: 'lg' | 'sm' }) {
  const reduce = useReducedMotion();
  const frame = useRef<HTMLDivElement>(null);
  const inView = useInView(frame, { amount: 0.3 });
  const [playing, setPlaying] = useState(!reduce);
  const time = useMotionValue(0);
  const [{ scene, word }, setPos] = useState({ scene: 0, word: 0 });
  const timecode = useTransform(time, (t) => `00:${t.toFixed(1).padStart(4, '0')}`);
  const playhead = useTransform(time, (t) => `${(t / TOTAL) * 100}%`);

  useEffect(() => { if (reduce) setPlaying(false); }, [reduce]);
  useAnimationFrame((_, delta) => {
    if (!playing || !inView) return;
    const next = (time.get() + Math.min(delta, 100) / 1000) % TOTAL;
    time.set(next);
    const pos = locate(next);
    if (pos.scene !== scene || pos.word !== word) setPos(pos);
  });
  const seek = (t: number) => { time.set(t); setPos(locate(t)); };

  const chunks = SCENE_CHUNKS[scene];
  const current = chunks.find((indexes) => indexes.includes(word)) ?? chunks[0];
  const dark = scene === 0;
  const lg = size === 'lg';

  return (
    <div ref={frame} className={lg ? 'w-[300px]' : 'w-[230px]'}>
      <div className="relative rounded-[2.4rem] border-[3px] border-white/15 bg-[#050A0F] p-2.5 shadow-[0_30px_60px_-30px_rgba(0,0,0,.8)]">
        <div className={`relative aspect-[9/16] overflow-hidden rounded-[1.9rem] transition-colors duration-500 ${dark ? 'bg-[#0B0F14]' : 'bg-[#F4EFE4]'}`}>
          <div aria-hidden="true" className={`absolute inset-0 [background-size:14px_14px] ${dark ? 'opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)]' : 'opacity-40 bg-[radial-gradient(#D9CFBC_1px,transparent_1px)]'}`} />
          <div className={`absolute inset-x-3 top-3 flex items-center justify-between font-mono text-[9px] font-bold ${dark ? 'text-white/60' : 'text-slate-500'}`}>
            <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-[#EF4444]" /><motion.span>{timecode}</motion.span></span>
            <span>{String(scene + 1).padStart(2, '0')} · {REEL_SCENE_NAMES[scene]}</span>
          </div>

          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div key={scene} className="absolute inset-x-4 top-[26%] flex justify-center" initial={{ opacity: 0, scale: 1.7, rotate: -14 }}
              animate={{ opacity: 1, scale: 1, rotate: -7 }} exit={{ opacity: 0, y: -30, transition: { duration: 0.2 } }}
              transition={{ type: 'spring', stiffness: 420, damping: 18 }}>
              <span className={`rounded-lg border-[3px] px-3 py-1 text-center font-black uppercase leading-none tracking-tight ${lg ? 'text-[1.9rem]' : 'text-[1.45rem]'}`}
                style={{ color: CLAY, borderColor: CLAY, backgroundColor: dark ? 'transparent' : 'rgba(255,255,255,.55)' }}>
                {REEL_STAMPS[scene]}
              </span>
            </motion.div>
          </AnimatePresence>

          <div className={`absolute inset-x-3 flex flex-wrap justify-center gap-x-2.5 gap-y-0.5 text-center leading-[1.15] ${lg ? 'bottom-[19%] text-[1.2rem]' : 'bottom-[19%] text-[0.95rem]'} ${CAPTION}`} aria-hidden="true">
            {current.map((index) => {
              const item = SCENE_WORDS[scene][index];
              const spoken = index === word;
              return (
                <motion.span key={`${scene}-${index}`} className="inline-block" animate={{ scale: spoken ? 1.14 : 1, color: spoken ? '#FF8A3D' : isKeyword(item.word) ? '#5EE0C2' : '#FFF4DC' }} transition={{ duration: 0.12 }}>
                  {item.word}
                </motion.span>
              );
            })}
          </div>
          <div className={`absolute inset-x-4 bottom-4 h-1 overflow-hidden rounded-full ${dark ? 'bg-white/15' : 'bg-black/10'}`}>
            <motion.div className="h-full bg-[#0F8B75]" style={{ width: playhead }} />
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2.5">
        <button type="button" onClick={() => setPlaying((value) => !value)} aria-label={playing ? 'Pause the reel preview' : 'Play the reel preview'}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F5C748] text-[#09121F] transition-transform active:scale-95">
          {playing ? <Pause className="h-4 w-4" /> : <Play className="ml-0.5 h-4 w-4" />}
        </button>
        <div className="relative flex h-7 flex-1 gap-0.5" role="group" aria-label="Jump to a scene">
          {REEL_SCENES.map((item, index) => (
            <button key={item.start} type="button" onClick={() => seek(item.start)} aria-label={`Scene ${index + 1}: ${REEL_SCENE_NAMES[index]}`} title={REEL_SCENE_NAMES[index]}
              className={`h-full rounded-[4px] transition-colors ${index === scene ? 'bg-[#0F8B75]' : 'bg-white/15 hover:bg-white/25'}`} style={{ flexGrow: item.end - item.start, flexBasis: 0 }} />
          ))}
          <motion.span aria-hidden="true" className="pointer-events-none absolute -bottom-1 -top-1 w-0.5 rounded-full bg-[#F5C748]" style={{ left: playhead }} />
        </div>
      </div>
      <p className="mt-2 text-center font-mono text-[10px] text-white/40">A sketch of the 33.5s reel · real script, real timing</p>
    </div>
  );
}

/* ================================================================ blocks */

function CodeBlock({ code, label, big = false }: { code: string; label?: string; big?: boolean }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(code); setCopied(true); window.setTimeout(() => setCopied(false), 1600); } catch { /* text stays selectable */ }
  };
  return (
    <div className={`overflow-hidden rounded-2xl bg-[#0D1714] text-[#E7EFEA] shadow-[0_18px_40px_-28px_rgba(9,18,31,.9)] ${big ? '' : 'my-5'}`}>
      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-2.5">
        <span className="flex min-w-0 items-center gap-2">
          <span aria-hidden="true" className="flex gap-1">{['#F87171', '#F5C748', '#34D399'].map((color) => <span key={color} className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />)}</span>
          <span className="truncate font-mono text-[10px] font-bold uppercase tracking-wider text-[#8FA79E]">{label ?? 'Terminal'}</span>
        </span>
        <button type="button" onClick={copy} aria-live="polite"
          className={`flex shrink-0 items-center gap-1.5 rounded-md px-2.5 py-1 font-mono text-[11px] font-bold transition-colors ${copied ? 'bg-[#0F8B75] text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}>
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}{copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre className={`overflow-x-auto px-4 py-4 font-mono leading-6 ${big ? 'min-h-[13rem] whitespace-pre-wrap text-[13px] lg:text-[13.5px]' : 'text-[12.5px] lg:text-[13px]'}`}><code>
        {code.split('\n').map((line, index) => {
          const comment = line.match(/^(.*?)(<!--.*-->|\/\/.*)$/);
          const placeholder = line.split(/(\[[^\]]+\])/g);
          return (
            <span key={index} className="block min-h-[1.5em]">
              {comment ? <>{comment[1]}<span className="text-[#7C938A]">{comment[2]}</span></>
                : placeholder.map((part, partIndex) => (/^\[[^\]]+\]$/.test(part) ? <span key={partIndex} className="rounded bg-[#F5C748]/15 text-[#F5C748]">{part}</span> : <Fragment key={partIndex}>{part}</Fragment>))}
            </span>
          );
        })}
      </code></pre>
    </div>
  );
}

function Note({ tone, title, text }: { tone: 'teal' | 'sun'; title: string; text: string }) {
  const teal = tone === 'teal';
  return (
    <Reveal className={`relative my-7 overflow-hidden rounded-3xl p-5 lg:p-6 ${teal ? 'bg-[#E2F1ED]' : 'bg-[#FEF3D0]'}`}>
      <span aria-hidden="true" className={`absolute -right-6 -top-6 h-20 w-20 rounded-full ${teal ? 'bg-[#0F8B75]/10' : 'bg-[#F5C748]/40'}`} />
      <p className={`relative flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.14em] ${teal ? 'text-[#0F8B75]' : 'text-[#9A6B00]'}`}><Sparkles className="h-3.5 w-3.5" />{title}</p>
      <p className="relative mt-2 text-[15px] font-semibold leading-7 text-slate-800 lg:text-base"><Rich text={text} /></p>
    </Reveal>
  );
}

function BulletList({ items, ordered }: { items: string[]; ordered?: boolean }) {
  return (
    <ul className="my-5 space-y-3">
      {items.map((item, index) => (
        <li key={item} className="flex gap-3 text-[15px] leading-7 text-slate-700 lg:text-base">
          {ordered
            ? <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#E2F1ED] font-mono text-[11px] font-bold text-[#0F8B75]">{index + 1}</span>
            : <span aria-hidden="true" className="mt-[11px] h-1.5 w-1.5 shrink-0 rotate-45 bg-[#0F8B75]" />}
          <span className="min-w-0"><Rich text={item} /></span>
        </li>
      ))}
    </ul>
  );
}

function CommandTable({ columns, rows }: { columns: string[]; rows: string[][] }) {
  return (
    <>
      <div className="my-6 hidden overflow-hidden rounded-3xl border border-slate-200 bg-white lg:block">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#0D1714] text-white"><tr>{columns.map((column) => <th key={column} className="px-5 py-3 font-mono text-[10px] font-bold uppercase tracking-wider text-[#8FA79E]">{column}</th>)}</tr></thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row[0]} className="border-t border-slate-100 align-top transition-colors hover:bg-[#F1F4F2]">
                <td className="w-[50%] px-5 py-3.5"><Rich text={row[0]} /></td>
                <td className="px-5 py-3.5 leading-6 text-slate-600"><Rich text={row[1]} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ul className="my-5 space-y-2 lg:hidden">
        {rows.map((row) => (
          <li key={row[0]} className="rounded-2xl border border-slate-200 bg-white p-3.5">
            <p className="flex items-start gap-2 text-[13px]"><Terminal className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#0F8B75]" /><span className="min-w-0"><Rich text={row[0]} /></span></p>
            <p className="mt-1.5 text-[13px] leading-5 text-slate-600"><Rich text={row[1]} /></p>
          </li>
        ))}
      </ul>
    </>
  );
}

/** Numbered steps on a line that fills as you read. */
function Steps({ items }: { items: { title: string; text: string }[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 55%'] });
  const fill = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return (
    <ol ref={ref} className="relative my-7">
      <span aria-hidden="true" className="absolute bottom-6 left-[19px] top-6 w-0.5 bg-slate-200 lg:left-[23px]" />
      <motion.span aria-hidden="true" className="absolute bottom-6 left-[19px] top-6 w-0.5 origin-top bg-[#0F8B75] lg:left-[23px]" style={{ scaleY: fill }} />
      {items.map((item, index) => <Step key={item.title} index={index} item={item} />)}
    </ol>
  );
}

function Step({ index, item }: { index: number; item: { title: string; text: string } }) {
  const ref = useRef<HTMLLIElement>(null);
  const on = useInView(ref, { once: true, margin: '0px 0px -40% 0px' });
  return (
    <li ref={ref} className="relative flex gap-4 pb-5 last:pb-0 lg:gap-5">
      <motion.span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border-2 font-mono text-xs font-bold lg:h-12 lg:w-12 lg:text-sm"
        initial={false} animate={{ backgroundColor: on ? '#0F8B75' : '#FFFFFF', borderColor: on ? '#0F8B75' : '#E2E8F0', color: on ? '#FFFFFF' : '#94A3B8', rotate: on ? 0 : -6 }} transition={{ duration: 0.35 }}>
        {String(index + 1).padStart(2, '0')}
      </motion.span>
      <motion.div className="min-w-0 flex-1 pt-1.5 lg:pt-2.5" initial={false} animate={{ opacity: on ? 1 : 0.5 }}>
        <h3 className="text-base font-extrabold text-[#131921] lg:text-lg">{item.title}</h3>
        <p className="mt-1 text-[15px] leading-7 text-slate-600"><Rich text={item.text} /></p>
      </motion.div>
    </li>
  );
}

/** "The short version": the whole loop as a connected track, with feedback feeding back in. */
function Pipeline() {
  const nodes = [
    { title: 'Script + voice', icon: Mic },
    { title: 'Claude Code plans', icon: Terminal },
    { title: 'HyperFrames builds', icon: Clapperboard },
    { title: 'Claude checks & fixes', icon: Check },
    { title: 'You give feedback', icon: Sparkles },
    { title: 'Render MP4', icon: Film },
  ];
  const { ref, step } = useSequence(nodes.length + 1, 0.22, 0.2);
  const last = nodes.length - 1;
  return (
    <div ref={ref} className="relative my-8 overflow-hidden rounded-3xl bg-[#09121F] p-5 text-white lg:p-7" role="img"
      aria-label="Script and voice go to Claude Code, which plans; HyperFrames builds; Claude checks and fixes; you give feedback, which loops back; then it renders to MP4">
      <div aria-hidden="true" className="absolute inset-0 opacity-15 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />
      <p className="relative font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#48C9A9]">The short version</p>
      <div className="relative mt-6 hidden lg:block">
        <div aria-hidden="true" className="absolute left-[8%] right-[8%] top-6 h-0.5 bg-white/10" />
        <motion.div aria-hidden="true" className="absolute left-[8%] right-[8%] top-6 h-0.5 origin-left bg-[#0F8B75]" initial={{ scaleX: 0 }}
          animate={{ scaleX: step < 0 ? 0 : Math.min(1, step / last) }} transition={{ duration: 0.35, ease: EASE.out }} />
        <ol className="relative grid grid-cols-6 gap-2">
          {nodes.map(({ title, icon: Icon }, index) => {
            const on = index <= step;
            return (
              <li key={title} className="flex flex-col items-center text-center">
                <motion.span className="flex h-12 w-12 items-center justify-center rounded-2xl border" initial={false}
                  animate={{ backgroundColor: on ? (index === last ? '#F5C748' : '#0F8B75') : 'rgba(255,255,255,.04)', borderColor: on ? 'rgba(0,0,0,0)' : 'rgba(255,255,255,.15)', color: on ? (index === last ? '#09121F' : '#FFFFFF') : 'rgba(255,255,255,.4)', scale: index === step ? 1.08 : 1 }}>
                  <Icon className="h-5 w-5" />
                </motion.span>
                <span className={`mt-3 text-xs font-extrabold leading-snug transition-colors ${on ? 'text-white' : 'text-white/40'}`}>{title}</span>
              </li>
            );
          })}
        </ol>
        <svg aria-hidden="true" className="mx-[24%] mt-2 h-8 w-[52%] overflow-visible" viewBox="0 0 100 20" preserveAspectRatio="none" fill="none">
          <motion.path d="M100 0 C 100 16, 96 18, 50 18 C 6 18, 0 16, 0 0" stroke="#F5C748" strokeWidth="1.5" vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0 }} animate={{ pathLength: step >= nodes.length ? 1 : 0 }} transition={{ duration: 0.8, ease: EASE.inOut }} />
        </svg>
        <motion.p className="text-center font-handwritten text-base text-[#F5C748]" initial={{ opacity: 0 }} animate={{ opacity: step >= nodes.length ? 1 : 0 }}>feedback loops until it’s right</motion.p>
      </div>
      <ol className="relative mt-5 space-y-2.5 lg:hidden">
        {nodes.map(({ title, icon: Icon }, index) => {
          const on = index <= step;
          return (
            <motion.li key={title} className="flex items-center gap-3" initial={{ opacity: 0.3, x: -6 }} animate={on ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.3 }}>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl" style={{ backgroundColor: index === last ? '#F5C748' : '#0F8B75', color: index === last ? '#09121F' : '#FFFFFF' }}><Icon className="h-4 w-4" /></span>
              <span className="text-sm font-extrabold">{title}</span>
              {index === 4 && <span className="ml-auto rounded-full border border-[#F5C748]/40 px-2 py-0.5 font-mono text-[9px] font-bold text-[#F5C748]">↺ repeat</span>}
            </motion.li>
          );
        })}
      </ol>
    </div>
  );
}

const KIT_ICONS: Record<string, LucideIcon> = { agent: Terminal, node: Hexagon, ffmpeg: Film, voice: Mic, extras: Sparkles };

function Kit({ items }: { items: { icon: string; title: string; text: string }[] }) {
  return (
    <ul className="my-6 grid gap-3 lg:grid-cols-2">
      {items.map((item, index) => {
        const Icon = KIT_ICONS[item.icon] ?? Sparkles;
        const optional = item.icon === 'extras';
        return (
          <Reveal as="li" key={item.title} delay={index * 0.05}
            className={`lift group relative flex gap-4 rounded-3xl border bg-white p-4 lg:p-5 ${optional ? 'border-dashed border-slate-300 lg:col-span-2' : 'border-slate-200'}`}>
            <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl transition-transform duration-500 group-hover:-rotate-6 ${optional ? 'bg-[#FEF3D0] text-[#9A6B00]' : 'bg-[#0D1714] text-[#48C9A9]'}`}><Icon className="h-5 w-5" /></span>
            <span className="min-w-0">
              <span className="flex items-center gap-2 text-base font-extrabold">{item.title}{optional && <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-500">optional</span>}</span>
              <span className="mt-1 block text-sm leading-6 text-slate-600"><Rich text={item.text} /></span>
            </span>
          </Reveal>
        );
      })}
    </ul>
  );
}

/** Desktop: the reel as a proportional timeline you can click through. */
function ScenesDesktop() {
  const [active, setActive] = useState(0);
  const scene = REEL_SCENES[active];
  return (
    <div className="my-7 hidden overflow-hidden rounded-3xl bg-[#09121F] text-white lg:block">
      <div className="p-6">
        <div className="flex items-center justify-between font-mono text-[10px] font-bold uppercase tracking-wider text-white/40">
          <span>0.0s</span><span>Click a scene</span><span>{fmt(TOTAL)}</span>
        </div>
        <div className="relative mt-3" role="tablist" aria-label="Scenes">
          <div className="flex gap-1">
            {REEL_SCENES.map((item, index) => (
              <button key={item.start} type="button" role="tab" aria-selected={index === active} onClick={() => setActive(index)} title={`${REEL_SCENE_NAMES[index]} · ${fmt(item.start)}–${fmt(item.end)}`}
                className="group relative h-16 min-w-0 overflow-hidden rounded-xl text-left" style={{ flexGrow: item.end - item.start, flexBasis: 0 }}>
                <span className={`absolute inset-0 transition-colors ${index === active ? 'bg-[#0F8B75]' : 'bg-white/[.06] group-hover:bg-white/[.12]'}`} />
                <span className={`relative block truncate px-2.5 pt-2.5 font-mono text-[10px] font-bold ${index === active ? 'text-white/80' : 'text-[#48C9A9]'}`}>{String(index + 1).padStart(2, '0')}</span>
                <span className="relative block truncate px-2.5 text-[11px] font-extrabold">{REEL_SCENE_NAMES[index]}</span>
              </button>
            ))}
          </div>
          <motion.span aria-hidden="true" className="absolute -bottom-2 h-1 rounded-full bg-[#F5C748]" initial={false}
            animate={{ left: `${(scene.start / TOTAL) * 100}%`, width: `${((scene.end - scene.start) / TOTAL) * 100}%` }} transition={SPRING.gentle} />
        </div>
      </div>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={active} role="tabpanel" className="grid grid-cols-[0.9fr_1.1fr] gap-8 border-t border-white/10 bg-white/[.03] p-6"
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: DURATION.base, ease: EASE.out }}>
          <div>
            <p className="font-mono text-xs font-bold text-[#48C9A9]">{fmt(scene.start)} – {fmt(scene.end)}</p>
            <span className="mt-3 inline-block -rotate-3 rounded-md border-2 px-2 py-0.5 text-lg font-black uppercase" style={{ color: CLAY, borderColor: CLAY }}>{REEL_STAMPS[active]}</span>
            <p className="mt-4 font-serif text-xl italic leading-snug text-white/90">{scene.line}</p>
          </div>
          <div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-white/40">On screen</p>
            <p className="mt-2 text-[15px] leading-7 text-white/75"><Rich text={scene.screen} dark /></p>
            <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#F5C748] px-3 py-1.5 text-xs font-extrabold text-[#09121F]"><ArrowRight className="h-3.5 w-3.5" /> {scene.out}</p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/** Mobile: each scene as a tappable card with its slice of the timeline. */
function ScenesMobile() {
  const [open, setOpen] = useState(0);
  return (
    <ol className="my-5 space-y-2 lg:hidden">
      {REEL_SCENES.map((scene, index) => {
        const on = open === index;
        return (
          <li key={scene.start} className={`overflow-hidden rounded-2xl transition-colors ${on ? 'bg-[#09121F] text-white' : 'border border-slate-200 bg-white'}`}>
            <button type="button" onClick={() => setOpen(on ? -1 : index)} aria-expanded={on} className="w-full p-3.5 text-left">
              <span className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-2">
                  <span className={`rounded-md px-1.5 py-0.5 font-mono text-[10px] font-bold ${on ? 'bg-white/10 text-[#48C9A9]' : 'bg-[#E2F1ED] text-[#0F8B75]'}`}>{fmt(scene.start)}–{fmt(scene.end)}</span>
                  <span className="text-[13px] font-extrabold">{REEL_SCENE_NAMES[index]}</span>
                </span>
                <ChevronDown className={`h-4 w-4 shrink-0 transition-transform ${on ? 'rotate-180 text-white/60' : 'text-slate-400'}`} />
              </span>
              <span aria-hidden="true" className={`relative mt-2.5 block h-1 rounded-full ${on ? 'bg-white/10' : 'bg-slate-100'}`}>
                <span className="absolute inset-y-0 rounded-full bg-[#0F8B75]" style={{ left: `${(scene.start / TOTAL) * 100}%`, width: `${((scene.end - scene.start) / TOTAL) * 100}%` }} />
              </span>
              <span className={`mt-2.5 block font-serif text-[15px] italic leading-6 ${on ? 'text-white/90' : 'text-slate-800'}`}>{scene.line}</span>
            </button>
            <AnimatePresence initial={false}>
              {on && (
                <motion.div key="detail" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: DURATION.fast }} className="px-3.5 pb-4">
                  <span className="inline-block -rotate-3 rounded border-2 px-1.5 text-sm font-black uppercase" style={{ color: CLAY, borderColor: CLAY }}>{REEL_STAMPS[index]}</span>
                  <p className="mt-2.5 text-[13px] leading-6 text-white/75"><Rich text={scene.screen} dark /></p>
                  <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-[#F5C748] px-2.5 py-1 text-[11px] font-extrabold text-[#09121F]"><ArrowRight className="h-3 w-3" /> {scene.out}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ol>
  );
}

/** The feedback rounds as a thread: my note, a beat, then what Claude changed. */
function Rounds({ items }: { items: { label: string; quote: string; text: string }[] }) {
  return (
    <div className="my-7 overflow-hidden rounded-3xl border border-slate-200 bg-[#F1F4F2]">
      <div className="flex items-center justify-between border-b border-slate-200 bg-white px-5 py-3">
        <span className="flex items-center gap-2 text-sm font-extrabold"><span className="h-2 w-2 rounded-full bg-[#10B981]" /> Feedback thread</span>
        <span className="font-mono text-[10px] font-bold text-slate-400">{items.length} rounds</span>
      </div>
      <ol className="space-y-6 p-4 lg:p-6">
        {items.map((round) => <RoundPair key={round.label} round={round} />)}
      </ol>
    </div>
  );
}

function RoundPair({ round }: { round: { label: string; quote: string; text: string } }) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduce = useReducedMotion();
  const [stage, setStage] = useState(0);
  useEffect(() => {
    if (!inView) return;
    if (reduce) { setStage(2); return; }
    setStage(1);
    const timer = window.setTimeout(() => setStage(2), 900);
    return () => window.clearTimeout(timer);
  }, [inView, reduce]);
  const bubble = { initial: { opacity: 0, y: 10, scale: 0.97 }, animate: { opacity: 1, y: 0, scale: 1 }, transition: { duration: 0.35, ease: EASE.out } };

  return (
    <li ref={ref} className="min-h-[9rem] space-y-3">
      <p className="text-center font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400">{round.label}</p>
      <div className="flex justify-end">
        {stage >= 1 && (
          <motion.div {...bubble} className="max-w-[85%] rounded-2xl rounded-br-md bg-[#09121F] px-4 py-3 text-white">
            <p className="font-handwritten text-lg leading-snug text-[#F5C748]">“{round.quote}”</p>
            <p className="mt-1 text-right font-mono text-[9px] font-bold text-white/40">GSV</p>
          </motion.div>
        )}
      </div>
      <div className="flex items-end gap-2">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#0F8B75] text-white"><Terminal className="h-3.5 w-3.5" /></span>
        <AnimatePresence mode="wait" initial={false}>
          {stage === 1 && (
            <motion.span key="typing" className="flex gap-1 rounded-2xl rounded-bl-md bg-white px-4 py-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} aria-hidden="true">
              {[0, 1, 2].map((dot) => <motion.span key={dot} className="h-1.5 w-1.5 rounded-full bg-slate-400" animate={{ y: [0, -3, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: dot * 0.12 }} />)}
            </motion.span>
          )}
          {stage >= 2 && (
            <motion.div key="reply" {...bubble} className="max-w-[88%] rounded-2xl rounded-bl-md border border-[#0F8B75]/20 bg-white px-4 py-3">
              <p className="flex items-center gap-1.5 font-mono text-[9px] font-bold uppercase tracking-wider text-[#0F8B75]"><Sparkles className="h-3 w-3" /> What changed</p>
              <p className="mt-1.5 text-[14px] leading-6 text-slate-700 lg:text-[15px]"><Rich text={round.text} /></p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {/* The text stays in the document for search and screen readers until the thread reveals it. */}
      {stage < 2 && <p className="sr-only">Feedback: “{round.quote}” What changed: {round.text.replace(/\*\*/g, '')}</p>}
    </li>
  );
}

/** Prompts as a library: pick one, copy it. */
function Prompts({ items }: { items: { label: string; code: string }[] }) {
  const [active, setActive] = useState(0);
  const chips = useRef<HTMLDivElement>(null);
  const pick = (index: number) => {
    setActive(index);
    (chips.current?.children[index] as HTMLElement | undefined)?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  };
  return (
    <div className="my-6 lg:grid lg:grid-cols-[210px_minmax(0,1fr)] lg:gap-4">
      <div role="tablist" aria-label="Prompts" className="hidden space-y-1 lg:block">
        {items.map((item, index) => (
          <button key={item.label} type="button" role="tab" aria-selected={index === active} onClick={() => setActive(index)}
            className={`relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-bold transition-colors ${index === active ? 'text-white' : 'text-slate-600 hover:bg-white'}`}>
            {index === active && <motion.span layoutId="prompt-tab" transition={SPRING.gentle} className="absolute inset-0 rounded-xl bg-[#09121F]" />}
            <span className={`relative font-mono text-[10px] ${index === active ? 'text-[#F5C748]' : 'text-[#0F8B75]'}`}>{String(index + 1).padStart(2, '0')}</span>
            <span className="relative">{item.label}</span>
          </button>
        ))}
      </div>
      <div ref={chips} role="tablist" aria-label="Prompts" className="no-scrollbar -mx-4 mb-3 flex gap-1.5 overflow-x-auto px-4 lg:hidden">
        {items.map((item, index) => (
          <button key={item.label} type="button" role="tab" aria-selected={index === active} onClick={() => pick(index)}
            className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-bold transition-colors ${index === active ? 'bg-[#09121F] text-white' : 'border border-slate-200 bg-white text-slate-600'}`}>
            {item.label}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={active} role="tabpanel" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -6 }} transition={{ duration: DURATION.base, ease: EASE.out }} className="min-w-0">
          <CodeBlock code={items[active].code} label={`Prompt ${active + 1} · ${items[active].label}`} big />
          <p className="mt-2 text-xs text-slate-500">Text in <span className="rounded bg-[#F5C748]/25 px-1 font-mono text-[#7A5600]">[brackets]</span> is yours to fill in.</p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/** One caption line, labelled with the rules that shape it. */
function CaptionDemo() {
  const words = ['YOU’RE', 'NOT', 'ASKING', 'AI'];
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.5 });
  const [spoken, setSpoken] = useState(2);
  useEffect(() => {
    if (reduce || !inView) return;
    const timer = window.setInterval(() => setSpoken((index) => (index + 1) % words.length), 650);
    return () => window.clearInterval(timer);
  }, [reduce, inView, words.length]);
  const rules = [
    { swatch: '#FFF4DC', label: 'Montserrat Black style, capitals, cream fill' },
    { swatch: '#FF8A3D', label: 'The spoken word turns orange and pops' },
    { swatch: '#5EE0C2', label: 'Keywords rest in teal' },
    { swatch: '#131921', label: 'No box: thick outline and a hard shadow' },
  ];
  return (
    <div ref={ref} className="my-7 overflow-hidden rounded-3xl bg-[#F4EFE4]" role="img" aria-label="A sample caption, YOU'RE NOT ASKING AI, showing the karaoke highlight and teal keyword">
      <div className="relative flex min-h-[9rem] items-center justify-center px-4 py-8 lg:min-h-[11rem]">
        <div aria-hidden="true" className="absolute inset-0 opacity-50 bg-[radial-gradient(#D9CFBC_1px,transparent_1px)] [background-size:14px_14px]" />
        <p className={`relative flex flex-wrap justify-center gap-x-4 gap-y-1 text-[1.9rem] leading-none lg:text-[2.6rem] ${CAPTION}`}>
          {words.map((word, index) => (
            <motion.span key={word} className="inline-block" animate={{ scale: index === spoken ? 1.15 : 1, color: index === spoken ? '#FF8A3D' : word === 'AI' ? '#5EE0C2' : '#FFF4DC' }} transition={{ duration: 0.15 }}>{word}</motion.span>
          ))}
        </p>
        <span className="absolute bottom-3 right-4 font-mono text-[10px] font-bold text-[#8A7D6C]">≈ 18 characters per chunk</span>
      </div>
      <ul className="grid gap-px bg-[#E4DAC6] sm:grid-cols-2">
        {rules.map((rule) => (
          <li key={rule.label} className="flex items-center gap-2.5 bg-white px-4 py-3 text-[13px] font-semibold text-slate-700">
            <span className="h-4 w-4 shrink-0 rounded-md border border-black/10" style={{ backgroundColor: rule.swatch }} />{rule.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** First pass versus final sound design, drawn to scale. */
function Cues() {
  const ref = useRef<HTMLDivElement>(null);
  const on = useInView(ref, { once: true, amount: 0.6 });
  return (
    <div ref={ref} className="my-6 rounded-3xl border border-slate-200 bg-white p-5" role="img" aria-label="Sound cues went from 124 in the first pass to 52 in the final cut">
      {[{ label: 'First pass', value: 124, color: '#CBD5E1' }, { label: 'Final cut', value: 52, color: '#0F8B75' }].map((bar, index) => (
        <div key={bar.label} className={index ? 'mt-4' : ''}>
          <div className="flex items-baseline justify-between"><span className="text-xs font-bold text-slate-600">{bar.label}</span><span className="font-mono text-sm font-extrabold">{bar.value} cues</span></div>
          <div className="mt-1.5 flex h-5 gap-[2px] overflow-hidden">
            {Array.from({ length: Math.round(bar.value / 4) }, (_, tick) => (
              <motion.span key={tick} className="h-full flex-1 rounded-[2px]" style={{ backgroundColor: bar.color, maxWidth: 6 }}
                initial={{ scaleY: 0 }} animate={{ scaleY: on ? 1 : 0 }} transition={{ duration: 0.3, delay: index * 0.3 + tick * 0.012 }} />
            ))}
          </div>
        </div>
      ))}
      <p className="mt-4 font-handwritten text-lg text-[#0F8B75]">one sound per real story beat</p>
    </div>
  );
}

function Checklist({ items }: { items: string[] }) {
  const [done, setDone] = useState<number[]>([]);
  const toggle = (index: number) => setDone((list) => (list.includes(index) ? list.filter((item) => item !== index) : [...list, index]));
  const complete = done.length === items.length;
  return (
    <div className="relative my-6 rounded-3xl border border-slate-200 bg-white p-4 lg:p-6">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-xs font-bold text-slate-500">Tick them off before you render.</p>
        <span className="flex items-center gap-2 font-mono text-xs font-bold text-[#0F8B75]">
          <svg viewBox="0 0 24 24" className="h-6 w-6 -rotate-90" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="none" stroke="#E2E8F0" strokeWidth="3" /><motion.circle cx="12" cy="12" r="9" fill="none" stroke="#0F8B75" strokeWidth="3" strokeLinecap="round" initial={false} animate={{ pathLength: done.length / items.length }} /></svg>
          {done.length}/{items.length}
        </span>
      </div>
      <ul className="space-y-1.5">
        {items.map((item, index) => {
          const on = done.includes(index);
          return (
            <li key={item}>
              <button type="button" onClick={() => toggle(index)} aria-pressed={on} className={`flex w-full items-start gap-3 rounded-xl p-2.5 text-left text-[14px] leading-6 transition-colors lg:text-[15px] ${on ? 'bg-[#E2F1ED]/60 text-slate-500' : 'text-slate-700 hover:bg-slate-50'}`}>
                <motion.span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2" initial={false}
                  animate={{ backgroundColor: on ? '#0F8B75' : '#FFFFFF', borderColor: on ? '#0F8B75' : '#CBD5E1', scale: on ? [1, 1.15, 1] : 1 }} transition={{ duration: 0.25 }}>
                  {on && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
                </motion.span>
                <span className={on ? 'line-through decoration-[#0F8B75]/40' : ''}><Rich text={item} /></span>
              </button>
            </li>
          );
        })}
      </ul>
      <AnimatePresence>
        {complete && (
          <motion.div key="stamp" role="status" className="pointer-events-none absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, scale: 2.2, rotate: -20 }} animate={{ opacity: 1, scale: 1, rotate: -9 }} exit={{ opacity: 0 }} transition={{ type: 'spring', stiffness: 380, damping: 16 }}>
            <span className="rounded-xl border-[5px] bg-white/85 px-5 py-2 text-3xl font-black uppercase tracking-tight shadow-xl lg:text-4xl" style={{ color: CLAY, borderColor: CLAY }}>Ready to render</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="my-5 overflow-hidden rounded-3xl border border-slate-200 bg-white">
      {items.map((item) => (
        <details key={item.q} className="group border-b border-slate-100 last:border-0">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-[15px] font-extrabold transition-colors hover:bg-[#F8F9FA] [&::-webkit-details-marker]:hidden">
            {item.q}
            <span aria-hidden="true" className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#E2F1ED] text-[#0F8B75] transition-transform group-open:rotate-45">+</span>
          </summary>
          <p className="px-5 pb-5 text-[15px] leading-7 text-slate-600"><Rich text={item.a} /></p>
        </details>
      ))}
    </div>
  );
}

function Block({ block }: { block: GuideBlock }) {
  switch (block.type) {
    case 'p': return <p className="my-4 text-[15px] leading-7 text-slate-600 lg:text-[17px] lg:leading-8"><Rich text={block.text} /></p>;
    case 'h3': return <h3 className="mb-2 mt-9 flex items-center gap-2.5 text-lg font-extrabold text-[#131921] lg:text-xl"><span aria-hidden="true" className="h-4 w-1 rounded-full bg-[#F5C748]" />{block.text}</h3>;
    case 'list': return <BulletList items={block.items} ordered={block.ordered} />;
    case 'code': return <CodeBlock code={block.code} label={block.label} />;
    case 'note': return <Note tone={block.tone} title={block.title} text={block.text} />;
    case 'table': return <CommandTable columns={block.columns} rows={block.rows} />;
    case 'steps': return <Steps items={block.items} />;
    case 'scenes': return <><ScenesDesktop /><ScenesMobile /></>;
    case 'rounds': return <Rounds items={block.items} />;
    case 'cues': return <Cues />;
    case 'checklist': return <Checklist items={block.items} />;
    case 'faq': return <Faq items={block.items} />;
    case 'pipeline': return <Pipeline />;
    case 'kit': return <Kit items={block.items} />;
    case 'prompts': return <Prompts items={block.items} />;
    case 'captionDemo': return <CaptionDemo />;
  }
}

function Chapter({ chapter, index }: { chapter: GuideChapter; index: number }) {
  const number = String(index + 1).padStart(2, '0');
  return (
    <section id={chapter.id} aria-labelledby={`${chapter.id}-title`} className="scroll-mt-20 pt-12 first:pt-0 lg:scroll-mt-8 lg:pt-20">
      <Reveal className="flex items-end gap-3 border-b-2 border-[#131921] pb-4 lg:gap-5">
        <span aria-hidden="true" className="text-5xl font-black leading-[0.8] text-transparent [-webkit-text-stroke:1.5px_#0F8B75] lg:text-7xl">{number}</span>
        <span className="min-w-0">
          <span className="block font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#0F8B75]">Chapter {number}</span>
          <h2 id={`${chapter.id}-title`} className="mt-1 text-[1.6rem] font-extrabold leading-[1.1] tracking-tight lg:text-[2.1rem]">{chapter.title}</h2>
        </span>
      </Reveal>
      {chapter.blocks.map((block, blockIndex) => <Block key={blockIndex} block={block} />)}
    </section>
  );
}

/* ================================================================ chrome */

/** Which chapter is being read: the section crossing the upper third of the screen. */
function useActiveChapter() {
  const [active, setActive] = useState(REEL_CHAPTERS[0].id);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting);
      if (visible.length) setActive(visible[0].target.id);
    }, { rootMargin: '-25% 0px -70% 0px' });
    REEL_CHAPTERS.forEach((chapter) => { const node = document.getElementById(chapter.id); if (node) observer.observe(node); });
    return () => observer.disconnect();
  }, []);
  return active;
}

function Stats({ compact = false }: { compact?: boolean }) {
  return (
    <dl className={`grid grid-cols-4 ${compact ? 'gap-2' : 'divide-x divide-white/10 border-y border-white/10'}`}>
      {REEL_SPECS.map((spec, index) => (
        <motion.div key={spec.label} className={compact ? 'rounded-xl bg-white/[.06] px-2 py-2 text-center' : 'px-6 py-5 first:pl-0'}
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + index * 0.08, duration: 0.5, ease: EASE.out }}>
          <dt className={`font-mono font-bold uppercase tracking-wider text-white/40 ${compact ? 'text-[8px]' : 'text-[10px]'}`}>{spec.label}</dt>
          <dd className={`font-black tracking-tight text-white ${compact ? 'mt-0.5 text-sm' : 'mt-1 text-3xl'}`}>{spec.value}</dd>
        </motion.div>
      ))}
    </dl>
  );
}

function EndCard({ onStartProject }: { onStartProject: () => void }) {
  return (
    <section className="relative mt-16 overflow-hidden rounded-[2rem] bg-[#09121F] p-6 text-white lg:p-10">
      <div aria-hidden="true" className="absolute inset-0 opacity-15 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />
      <span aria-hidden="true" className="absolute -right-16 -top-20 h-56 w-56 rounded-full border-[36px] border-[#174B40]" />
      <p className="relative font-handwritten text-2xl text-[#F5C748]">Thanks for commenting “VIDEO”.</p>
      <h2 className="relative mt-3 max-w-lg text-2xl font-extrabold leading-tight lg:text-3xl">Want this kind of workflow built for your brand or product?</h2>
      <p className="relative mt-3 max-w-lg text-sm leading-6 text-slate-300">BuiltbyGSV is a product and AI engineering studio. We design and build custom software, web platforms, AI systems and automation.</p>
      <div className="relative mt-6 flex flex-wrap gap-3">
        <button type="button" onClick={onStartProject} className="press group inline-flex items-center gap-2 rounded-full bg-[#F5C748] px-5 py-3 text-sm font-extrabold text-[#09121F]">Start a Project <ArrowUpRight className="nudge-ur h-4 w-4" /></button>
        <a href="/services/ai-solutions" className="group inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-bold"><span className="u-link">AI solutions</span> <ArrowRight className="nudge-r h-4 w-4" /></a>
      </div>
    </section>
  );
}

/* ================================================================ page */

interface Props { onStartProject: () => void; title: string; readTime: string; published: string }

export function ReelPressGuide({ onStartProject, title, readTime, published }: Props) {
  const active = useActiveChapter();
  const { scrollYProgress } = useScroll();
  const [sheet, setSheet] = useState(false);
  const sheetRef = useDialogFocus(sheet);
  const activeIndex = Math.max(0, REEL_CHAPTERS.findIndex((chapter) => chapter.id === active));
  const date = useMemo(() => new Date(`${published}T00:00:00`).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }), [published]);
  const lead = title.replace(/ without opening a video editor$/, '');
  const accent = 'without opening a video editor.';

  useEffect(() => {
    if (!sheet) return;
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape') setSheet(false); };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [sheet]);

  const byline = (
    <div className="flex items-center gap-3">
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0F8B75] font-mono text-[11px] font-black text-white">GSV</span>
      <span className="text-xs"><span className="block font-extrabold text-white">Gurusabarivasan M · GuruGSV</span><span className="mt-0.5 block font-semibold text-white/50">{date} · {readTime}</span></span>
    </div>
  );
  const heroDots = <div aria-hidden="true" className="absolute inset-0 opacity-[.12] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:18px_18px] [mask-image:linear-gradient(to_bottom,black,transparent)]" />;
  const heroMotion = (delay: number) => ({ initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, ease: EASE.out, delay } });

  return (
    <main className="min-h-screen bg-[#F8F9FA] text-[#131921]">
      <motion.div aria-hidden="true" className="fixed inset-x-0 top-0 z-50 h-1 origin-left bg-[#F5C748]" style={{ scaleX: scrollYProgress }} />

      {/* ---------------- Desktop hero ---------------- */}
      <header className="relative hidden overflow-hidden bg-[#09121F] text-white lg:block">
        {heroDots}
        <div className="relative mx-auto max-w-6xl px-12 pb-12 pt-10">
          <a href="/insights" className="group inline-flex items-center gap-2 text-xs font-extrabold text-white/50 hover:text-white"><ArrowLeft className="nudge-l h-4 w-4" /> All field notes</a>
          <div className="mt-8 grid grid-cols-[minmax(0,1fr)_300px] items-center gap-16">
            <div>
              <motion.p {...heroMotion(0)} className="inline-flex items-center gap-2 rounded-full border border-[#48C9A9]/30 bg-[#48C9A9]/10 px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.14em] text-[#48C9A9]"><Clapperboard className="h-3.5 w-3.5" /> You commented “VIDEO” · here’s the workflow</motion.p>
              <motion.h1 {...heroMotion(0.08)} className="mt-6 text-5xl font-extrabold leading-[1.04] tracking-tight xl:text-[4rem]">
                {lead}{' '}
                <span className="font-serif font-normal italic text-[#48C9A9] underline decoration-[#F5C748] decoration-[3px] underline-offset-[10px]">{accent}</span>
              </motion.h1>
              <motion.p {...heroMotion(0.16)} className="mt-7 max-w-xl text-lg leading-8 text-white/70">The reel you watched was animated, edited and sound-designed with AI: Claude Code writing a HyperFrames project from my script and my voice recording. This page walks through the exact setup, every command, the scene plan, the feedback rounds, and the prompts, so you can make your own.</motion.p>
              <motion.div {...heroMotion(0.24)} className="mt-8 flex flex-wrap items-center gap-6">
                <a href="#what" className="press group inline-flex items-center gap-2 rounded-full bg-[#F5C748] px-5 py-3 text-sm font-extrabold text-[#09121F]">Start reading <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" /></a>
                <a href="#prompts" className="group inline-flex items-center gap-2 text-sm font-bold text-white/80 hover:text-white"><span className="u-link">Jump to the prompts</span> <ArrowRight className="nudge-r h-4 w-4" /></a>
              </motion.div>
              <motion.div {...heroMotion(0.32)} className="mt-9">{byline}</motion.div>
            </div>
            <motion.div initial={{ opacity: 0, y: 30, rotate: 3 }} animate={{ opacity: 1, y: 0, rotate: 0 }} transition={{ duration: 0.9, ease: EASE.out, delay: 0.15 }}>
              <ReelPlayer />
            </motion.div>
          </div>
          <div className="mt-12"><Stats /></div>
          <p className="mt-4 flex items-center gap-2 text-xs font-bold text-white/40">Made with {REEL_TOOLS.map((tool) => <span key={tool} className="rounded-full border border-white/15 px-2.5 py-1 text-[11px] text-white/80">{tool}</span>)}</p>
        </div>
      </header>

      {/* ---------------- Mobile hero ---------------- */}
      <header className="relative overflow-hidden bg-[#09121F] px-4 pb-8 pt-5 text-white lg:hidden">
        {heroDots}
        <div className="relative">
          <a href="/insights" className="flex w-fit items-center gap-1.5 text-[11px] font-extrabold text-white/50"><ArrowLeft className="h-3.5 w-3.5" /> Field notes</a>
          <motion.p {...heroMotion(0)} className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-[#48C9A9]/30 bg-[#48C9A9]/10 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-[#48C9A9]"><Clapperboard className="h-3 w-3" /> You commented “VIDEO”</motion.p>
          <motion.h1 {...heroMotion(0.08)} className="mt-3 text-[2rem] font-extrabold leading-[1.08] tracking-tight">
            {lead} <span className="font-serif font-normal italic text-[#48C9A9] underline decoration-[#F5C748] decoration-2 underline-offset-[6px]">{accent}</span>
          </motion.h1>
          <motion.div className="mt-7 flex justify-center" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE.out, delay: 0.2 }}>
            <ReelPlayer size="sm" />
          </motion.div>
          <motion.p {...heroMotion(0.3)} className="mt-6 text-sm leading-6 text-white/70">The reel was animated, edited and sound-designed with AI: Claude Code writing a HyperFrames project from my script and voice. Here’s the exact setup, every command and the prompts.</motion.p>
          <div className="mt-5">{byline}</div>
          <div className="mt-6"><Stats compact /></div>
          <a href="#what" className="mt-6 flex items-center justify-center gap-2 rounded-full bg-[#F5C748] py-3 text-sm font-extrabold text-[#09121F] active:scale-[0.99]">Start reading <ArrowDown className="h-4 w-4" /></a>
        </div>
      </header>

      {/* ---------------- Mobile chapter bar + sheet ---------------- */}
      <div className="sticky top-0 z-40 border-b border-slate-200 bg-[#F8F9FA]/95 backdrop-blur-md lg:hidden">
        <button type="button" onClick={() => setSheet(true)} className="flex w-full items-center gap-3 px-4 py-3 text-left" aria-haspopup="dialog">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#09121F] font-mono text-[10px] font-bold text-[#F5C748]">{String(activeIndex + 1).padStart(2, '0')}</span>
          <AnimatePresence mode="wait" initial={false}>
            <motion.span key={active} className="min-w-0 flex-1 truncate text-[13px] font-extrabold" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: DURATION.fast }}>
              {REEL_CHAPTERS[activeIndex].title}
            </motion.span>
          </AnimatePresence>
          <span className="flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-[11px] font-bold text-slate-600 shadow-2xs"><List className="h-3.5 w-3.5" /> {activeIndex + 1}/{REEL_CHAPTERS.length}</span>
        </button>
      </div>
      <AnimatePresence>
        {sheet && (
          <motion.div key="sheet" className="fixed inset-0 z-50 flex items-end bg-slate-900/50 lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSheet(false)}>
            <motion.div ref={sheetRef} role="dialog" aria-modal="true" aria-label="Chapters" tabIndex={-1} onClick={(event) => event.stopPropagation()}
              className="max-h-[80vh] w-full overflow-y-auto rounded-t-3xl bg-white p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]"
              initial={{ y: 40 }} animate={{ y: 0 }} exit={{ y: 40 }} transition={{ duration: DURATION.base, ease: EASE.out }}>
              <span aria-hidden="true" className="mx-auto mb-4 block h-1 w-10 rounded-full bg-slate-200" />
              <div className="mb-3 flex items-center justify-between">
                <p className="text-sm font-extrabold">Chapters</p>
                <button type="button" onClick={() => setSheet(false)} aria-label="Close chapters" className="rounded-full p-1.5 text-slate-500 hover:bg-slate-100"><X className="h-5 w-5" /></button>
              </div>
              <ol className="space-y-1">
                {REEL_CHAPTERS.map((chapter, index) => (
                  <li key={chapter.id}>
                    <a href={`#${chapter.id}`} onClick={() => setSheet(false)} aria-current={chapter.id === active ? 'location' : undefined}
                      className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold ${chapter.id === active ? 'bg-[#09121F] text-white' : 'text-slate-700'}`}>
                      <span className={`font-mono text-[11px] ${chapter.id === active ? 'text-[#F5C748]' : 'text-[#0F8B75]'}`}>{String(index + 1).padStart(2, '0')}</span>{chapter.title}
                    </a>
                  </li>
                ))}
              </ol>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ---------------- Body ---------------- */}
      <div className="px-4 py-10 lg:px-12 lg:py-16">
        <div className="mx-auto max-w-6xl lg:grid lg:grid-cols-[230px_minmax(0,1fr)] lg:gap-14">
          <aside className="hidden lg:block">
            <nav aria-label="Chapters" className="sticky top-8">
              <div className="flex items-center justify-between">
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">Chapters</p>
                <span className="font-mono text-[10px] font-bold text-[#0F8B75]">{String(activeIndex + 1).padStart(2, '0')}/{REEL_CHAPTERS.length}</span>
              </div>
              <div className="mt-3 h-1 overflow-hidden rounded-full bg-slate-200"><motion.div className="h-full origin-left bg-[#0F8B75]" style={{ scaleX: scrollYProgress }} /></div>
              <ol className="mt-4 space-y-0.5">
                {REEL_CHAPTERS.map((chapter, index) => {
                  const on = chapter.id === active;
                  const passed = index < activeIndex;
                  return (
                    <li key={chapter.id} className="relative">
                      {on && <motion.span layoutId="guide-chapter" transition={SPRING.gentle} className="absolute inset-0 rounded-lg bg-[#09121F]" />}
                      <a href={`#${chapter.id}`} aria-current={on ? 'location' : undefined}
                        className={`relative grid grid-cols-[2rem_1fr] rounded-lg px-2.5 py-1.5 text-[13px] transition-colors ${on ? 'font-extrabold text-white' : passed ? 'font-semibold text-slate-700' : 'font-semibold text-slate-400 hover:text-[#131921]'}`}>
                        <span className={`font-mono text-[11px] leading-5 ${on ? 'text-[#F5C748]' : 'text-[#0F8B75]'}`}>{passed ? '✓' : String(index + 1).padStart(2, '0')}</span>{chapter.short}
                      </a>
                    </li>
                  );
                })}
              </ol>
              <div className="mt-8 rounded-2xl bg-[#E2F1ED] p-4">
                <p className="font-handwritten text-lg text-[#0F8B75]">Building something?</p>
                <p className="mt-1 text-xs leading-5 text-slate-600">We build custom software, web platforms and AI systems.</p>
                <button type="button" onClick={onStartProject} className="group mt-3 inline-flex items-center gap-1.5 text-xs font-extrabold text-[#131921]"><span className="u-link">Start a Project</span> <ArrowRight className="nudge-r h-3.5 w-3.5" /></button>
              </div>
            </nav>
          </aside>

          <article className="min-w-0 max-w-[74ch]">
            {REEL_CHAPTERS.map((chapter, index) => <Chapter key={chapter.id} chapter={chapter} index={index} />)}
            <EndCard onStartProject={onStartProject} />
            <p className="mt-6 text-center font-mono text-[11px] text-slate-400">Made by GSV · builtbyGSV</p>
          </article>
        </div>
      </div>
    </main>
  );
}
