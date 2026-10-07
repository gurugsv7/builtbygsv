import { useCallback, useEffect, useRef, useState, type MouseEvent, type ReactNode } from 'react';
import { AnimatePresence, motion, useDragControls } from 'motion/react';
import {
  AlertTriangle, ArrowLeft, ArrowRight, ArrowUpRight, Check, ChevronDown, IdCard, Instagram, LayoutTemplate, Link2,
  Mail, Share2, Sparkles, User, X,
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { BusinessFooter } from './BusinessFooter';
import { useDialogFocus } from './useDialogFocus';
import { DURATION, EASE, SPRING } from '../motion/tokens';
import {
  INSTAGRAM_URL, LAST_CHECKED, PACK_EXTRAS, STUDENT_FAQS, STUDENT_PAGE, STUDENT_SOURCES, STUDENT_TOOLS, TOOL_CATEGORIES,
  type StudentTool, type ToolCategory, type ToolLogo, type ToolShot,
} from '../content/studentTools';
import githubLogo from '../assets/student/logos/github.svg';
import adobeLogo from '../assets/student/logos/adobe.svg';
import figmaLogo from '../assets/student/logos/figma.svg';
import notionLogo from '../assets/student/logos/notion.svg';
import autodeskLogo from '../assets/student/logos/autodesk.svg';
import geminiLogo from '../assets/student/logos/gemini.svg';
import ghpackShot from '../assets/student/shots/ghpack.webp';
import namecheapShot from '../assets/student/shots/namecheap.webp';
import figmaShot from '../assets/student/shots/figma.webp';
import notionShot from '../assets/student/shots/notion.webp';
import googleShot from '../assets/student/shots/google.webp';

/* "Campus After Hours", the reel's palette. Clay and teal are only used as fills or
   large marks; text on light grounds uses the darker clay so it clears 4.5:1. */
const INK = '#0d1430';
const COBALT = '#1f3bd1';
const YELLOW = '#ffd84a';
const CLAY = '#e4572e';
const CLAY_TEXT = '#a8360f';
const TEAL = '#19b39b';

const LOGOS: Partial<Record<ToolLogo, string>> = {
  github: githubLogo, adobe: adobeLogo, figma: figmaLogo, notion: notionLogo, autodesk: autodeskLogo, gemini: geminiLogo,
};
const SHOTS: Record<ToolShot, string> = {
  ghpack: ghpackShot, namecheap: namecheapShot, figma: figmaShot, notion: notionShot, google: googleShot,
};

type Filter = 'All' | ToolCategory;
const FILTERS: Filter[] = ['All', ...TOOL_CATEGORIES];
const countFor = (filter: Filter) => (filter === 'All' ? STUDENT_TOOLS.length : STUDENT_TOOLS.filter((tool) => tool.category === filter).length);

const toolFromHash = () => {
  const id = window.location.hash.slice(1);
  return STUDENT_TOOLS.some((tool) => tool.id === id) ? id : null;
};
const toolLink = (tool: StudentTool) => `${window.location.origin}${STUDENT_PAGE.path}#${tool.id}`;

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const list = window.matchMedia(query);
    const update = () => setMatches(list.matches);
    update();
    list.addEventListener('change', update);
    return () => list.removeEventListener('change', update);
  }, [query]);
  return matches;
}

/* ================================================================ small pieces */

function LogoTile({ tool, size = 44 }: { tool: StudentTool; size?: number }) {
  const src = LOGOS[tool.logo];
  return (
    <span aria-hidden="true" className="flex shrink-0 items-center justify-center rounded-xl border-2 bg-white"
      style={{ width: size, height: size, borderColor: INK, boxShadow: `2px 2px 0 ${INK}` }}>
      {src ? <img src={src} alt="" className="h-[58%] w-[58%] object-contain" />
        : tool.logo === 'domain' ? <span className="font-mono text-[13px] font-black tracking-tight" style={{ color: INK }}>.me</span>
          : <LayoutTemplate className="h-[52%] w-[52%]" style={{ color: COBALT }} />}
    </span>
  );
}

function EligibilityChip({ tool, large = false }: { tool: StudentTool; large?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border-[1.5px] bg-white font-bold ${large ? 'px-2.5 py-1 text-[13px]' : 'px-2 py-0.5 text-[11.5px]'}`}
      style={{ borderColor: INK, color: INK }}>
      <span aria-hidden="true" className="flex h-3.5 w-3.5 items-center justify-center rounded-full" style={{ backgroundColor: TEAL }}>
        <Check className="h-2.5 w-2.5" strokeWidth={3.5} style={{ color: INK }} />
      </span>
      {tool.eligibility}
    </span>
  );
}

function CatchMark({ large = false }: { large?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-1 font-bold ${large ? 'text-[13px]' : 'text-[11.5px]'}`} style={{ color: CLAY_TEXT }}>
      <AlertTriangle className="h-3.5 w-3.5" aria-hidden="true" /> Read the catch
    </span>
  );
}

/** Highlighter swipe behind a word. Reduced motion shows it already drawn. */
function Highlight({ children, delay = 0.35 }: { children: ReactNode; delay?: number }) {
  return (
    <span className="relative inline-block whitespace-nowrap px-[0.08em]">
      <motion.span aria-hidden="true" className="absolute inset-x-0 bottom-[0.04em] top-[0.14em] origin-left -rotate-1 rounded-[4px]"
        style={{ backgroundColor: YELLOW }} initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay, duration: 0.5, ease: EASE.out }} />
      <span className="relative" style={{ color: INK }}>{children}</span>
    </span>
  );
}

function GetButton({ tool, size = 'md', className = '' }: { tool: StudentTool; size?: 'md' | 'lg'; className?: string }) {
  return (
    <a href={tool.url} target="_blank" rel="noopener" onClick={(event) => event.stopPropagation()}
      aria-label={`Get ${tool.name} on ${tool.host} (opens in a new tab)`}
      className={`inline-flex items-center justify-center gap-1.5 rounded-xl border-2 font-extrabold text-white transition-transform active:translate-x-[2px] active:translate-y-[2px] ${size === 'lg' ? 'h-14 px-5 text-base' : 'h-10 px-3.5 text-[13px]'} ${className}`}
      style={{ backgroundColor: COBALT, borderColor: INK, boxShadow: `3px 3px 0 ${INK}` }}>
      Get it <ArrowRight className="h-4 w-4" aria-hidden="true" />
    </a>
  );
}

function StudentIdCard({ compact = false }: { compact?: boolean }) {
  const width = compact ? 116 : 236;
  return (
    <motion.div aria-hidden="true" className="relative shrink-0" style={{ width }}
      initial={{ opacity: 0, rotate: -12, y: 10 }} animate={{ opacity: 1, rotate: -5, y: 0 }} transition={{ ...SPRING.gentle, delay: 0.1 }}>
      <span className={`absolute left-1/2 z-10 -translate-x-1/2 rounded-md border-2 bg-[#9aa3b8] ${compact ? '-top-1.5 h-2.5 w-7' : '-top-3 h-5 w-14'}`} style={{ borderColor: '#05091c' }} />
      <div className={`overflow-hidden border-[3px] bg-[#f4f1ea] ${compact ? 'rounded-lg' : 'rounded-2xl'}`}
        style={{ borderColor: '#05091c', boxShadow: `${compact ? 3 : 6}px ${compact ? 3 : 6}px 0 #05091c` }}>
        <div className={`flex items-center justify-between ${compact ? 'px-2 py-1' : 'px-4 py-2.5'}`} style={{ backgroundColor: COBALT }}>
          <span className={`font-['Space_Grotesk'] font-bold uppercase tracking-[0.12em] text-white ${compact ? 'text-[8px]' : 'text-[15px]'}`}>Student ID</span>
          <span className={`rounded-full border-[1.5px] font-mono font-bold ${compact ? 'px-1 text-[7px]' : 'px-2 py-0.5 text-[11px]'}`} style={{ backgroundColor: YELLOW, borderColor: '#05091c', color: INK }}>2026</span>
        </div>
        <div className={`flex items-center ${compact ? 'gap-1.5 p-1.5' : 'gap-3 p-3.5'}`}>
          <span className={`flex shrink-0 items-center justify-center border-2 bg-[#c9d3ff] ${compact ? 'h-8 w-7 rounded' : 'h-[4.6rem] w-16 rounded-lg'}`} style={{ borderColor: '#05091c' }}>
            <User className={compact ? 'h-4 w-4' : 'h-9 w-9'} style={{ color: INK }} />
          </span>
          <span className="min-w-0 flex-1">
            {!compact && <span className="block font-mono text-[9px] font-bold uppercase tracking-wider text-slate-500">Name</span>}
            <span className={`block font-black leading-none ${compact ? 'text-[11px]' : 'text-[22px]'}`} style={{ color: INK }}>YOU</span>
            {!compact && <span className="mt-1.5 block font-mono text-[10px] font-bold uppercase text-slate-600">Any course · Any year</span>}
            <span className={`flex items-end gap-[1.5px] ${compact ? 'mt-1 h-2.5' : 'mt-2 h-5'}`}>
              {[2, 1, 3, 1, 1, 2, 1, 3, 2, 1, 1, 2, 3, 1, 2, 1, 1, 3, 1, 2].slice(0, compact ? 12 : 20).map((weight, index) => (
                <span key={index} className="h-full" style={{ width: weight * (compact ? 1 : 1.5), backgroundColor: '#05091c' }} />
              ))}
            </span>
          </span>
        </div>
      </div>
    </motion.div>
  );
}

/* ================================================================ shared actions */

function useToast() {
  const [message, setMessage] = useState('');
  const timer = useRef<number | undefined>(undefined);
  const show = useCallback((text: string) => {
    setMessage(text);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setMessage(''), 1800);
  }, []);
  const node = (
    <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-6 z-[70] flex justify-center px-4">
      <AnimatePresence>
        {message && (
          <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="rounded-full border-2 px-4 py-2 text-sm font-bold" style={{ backgroundColor: YELLOW, borderColor: INK, color: INK, boxShadow: `3px 3px 0 ${INK}` }}>
            {message}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
  return { show, node };
}

async function copyText(text: string) {
  try { await navigator.clipboard.writeText(text); return true; } catch { return false; }
}

function CopyLinkButton({ tool, onCopied, className = '', label = false }: { tool: StudentTool; onCopied: (text: string) => void; className?: string; label?: boolean }) {
  const [copied, setCopied] = useState(false);
  const copy = async (event: MouseEvent) => {
    event.stopPropagation();
    const ok = await copyText(toolLink(tool));
    onCopied(ok ? `Link to ${tool.short} copied` : 'Could not copy; long-press the address bar instead');
    if (ok) { setCopied(true); window.setTimeout(() => setCopied(false), 1600); }
  };
  return (
    <button type="button" onClick={copy} aria-label={`Copy link to ${tool.name}`}
      className={`inline-flex items-center justify-center gap-1.5 rounded-xl border-2 bg-white font-bold transition-colors hover:bg-[#fff6cf] ${className}`}
      style={{ borderColor: INK, color: INK }}>
      {copied ? <Check className="h-4 w-4" aria-hidden="true" /> : <Link2 className="h-4 w-4" aria-hidden="true" />}
      {label && <span className="text-sm">{copied ? 'Copied' : 'Copy link'}</span>}
    </button>
  );
}

function useShare(onCopied: (text: string) => void) {
  return async () => {
    const url = `${window.location.origin}${STUDENT_PAGE.path}`;
    if (navigator.share) {
      try { await navigator.share({ title: 'Free tools for college students', text: STUDENT_PAGE.headline, url }); } catch { /* dismissed */ }
      return;
    }
    onCopied((await copyText(url)) ? 'Page link copied' : url);
  };
}

/* ================================================================ tool detail (panel + sheet) */

function ToolDetail({ tool, large }: { tool: StudentTool; large: boolean }) {
  const text = large ? 'text-[15px] leading-7' : 'text-[14px] leading-6';
  return (
    <div className="space-y-5">
      <div>
        <p className={`font-semibold text-slate-800 ${large ? 'text-[16px] leading-7' : 'text-[15px] leading-6'}`}>{tool.gets}</p>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <EligibilityChip tool={tool} large />
          {tool.value && (
            <a href={tool.value.source} target="_blank" rel="noopener" className="inline-flex items-center gap-1 rounded-full border-[1.5px] px-2.5 py-1 text-[13px] font-extrabold"
              style={{ backgroundColor: YELLOW, borderColor: INK, color: INK }}>
              {tool.value.text}<ArrowUpRight className="h-3.5 w-3.5" aria-label="(source, opens in a new tab)" />
            </a>
          )}
        </div>
      </div>

      <section aria-label="How to claim it">
        <h3 className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-slate-600">How to claim it</h3>
        <ol className="mt-3 space-y-3">
          {tool.steps.map((step, index) => (
            <li key={step} className={`flex gap-3 text-slate-800 ${text}`}>
              <span aria-hidden="true" className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 font-mono text-[11px] font-bold"
                style={{ backgroundColor: TEAL, borderColor: INK, color: INK }}>{index + 1}</span>
              <span className="min-w-0">{step}</span>
            </li>
          ))}
        </ol>
      </section>

      {tool.caveat && (
        <div className="rounded-xl border-2 border-l-[6px] bg-[#fdece5] p-3.5" style={{ borderColor: CLAY }}>
          <p className="flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.14em]" style={{ color: CLAY_TEXT }}>
            <AlertTriangle className="h-3.5 w-3.5" aria-hidden="true" /> The catch
          </p>
          <p className={`mt-1.5 font-medium text-slate-900 ${text}`}>{tool.caveat}</p>
        </div>
      )}

      {tool.tip && (
        <div className="rounded-xl border-2 bg-[#fff6cf] p-3.5" style={{ borderColor: INK }}>
          <p className="flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-slate-700"><Sparkles className="h-3.5 w-3.5" aria-hidden="true" /> Tip</p>
          <p className={`mt-1.5 font-medium text-slate-900 ${text}`}>{tool.tip}</p>
        </div>
      )}

      {tool.shot && (
        <figure>
          <img src={SHOTS[tool.shot]} alt={`The official ${tool.name} page`} loading="lazy" decoding="async"
            className="w-full rounded-lg border-2 bg-white" style={{ borderColor: INK }} />
          <figcaption className="mt-1.5 text-[12px] text-slate-600">The official page on {tool.host}, captured 7 Oct 2026</figcaption>
        </figure>
      )}
    </div>
  );
}

function ToolHeading({ tool, id }: { tool: StudentTool; id: string }) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <LogoTile tool={tool} size={48} />
      <div className="min-w-0">
        <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-slate-600">{tool.category}</p>
        <h2 id={id} className="text-[19px] font-extrabold leading-tight tracking-tight" style={{ color: INK }}>{tool.name}</h2>
      </div>
    </div>
  );
}

function useEscape(onClose: () => void) {
  useEffect(() => {
    const handle = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handle);
    return () => document.removeEventListener('keydown', handle);
  }, [onClose]);
}

/** Desktop: a drawer on the right. Arrow keys and the buttons step through the visible tools. */
function SidePanel({ tool, tools, onSelect, onClose, onCopied }: {
  tool: StudentTool; tools: StudentTool[]; onSelect: (id: string) => void; onClose: () => void; onCopied: (text: string) => void;
}) {
  const ref = useDialogFocus(true);
  useEscape(onClose);
  const index = tools.findIndex((item) => item.id === tool.id);
  const step = useCallback((delta: number) => {
    if (index < 0 || tools.length < 2) return;
    onSelect(tools[(index + delta + tools.length) % tools.length].id);
  }, [index, onSelect, tools]);
  useEffect(() => {
    const handle = (event: KeyboardEvent) => {
      if ((event.target as HTMLElement).closest('input, textarea')) return;
      if (event.key === 'ArrowRight') step(1);
      if (event.key === 'ArrowLeft') step(-1);
    };
    document.addEventListener('keydown', handle);
    return () => document.removeEventListener('keydown', handle);
  }, [step]);

  return (
    <>
      <motion.div className="fixed inset-0 z-40" style={{ backgroundColor: 'rgba(13,20,48,.45)' }} onClick={onClose}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: DURATION.base }} />
      <motion.div ref={ref} role="dialog" aria-modal="true" aria-labelledby="tool-panel-title" tabIndex={-1}
        className="fixed inset-y-0 right-0 z-50 flex w-[460px] max-w-[92vw] flex-col border-l-[3px] bg-[#f7f5ef] outline-none"
        style={{ borderColor: INK }}
        initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={SPRING.gentle}>
        <div className="flex items-start justify-between gap-3 border-b-2 px-6 py-5" style={{ borderColor: INK }}>
          <ToolHeading tool={tool} id="tool-panel-title" />
          <div className="flex shrink-0 gap-1.5">
            {[{ icon: ArrowLeft, label: 'Previous tool', delta: -1 }, { icon: ArrowRight, label: 'Next tool', delta: 1 }].map(({ icon: Icon, label, delta }) => (
              <button key={label} type="button" onClick={() => step(delta)} aria-label={label} disabled={tools.length < 2}
                className="flex h-9 w-9 items-center justify-center rounded-lg border-2 bg-white transition-colors hover:bg-[#fff6cf] disabled:opacity-40" style={{ borderColor: INK, color: INK }}>
                <Icon className="h-4 w-4" />
              </button>
            ))}
            <button type="button" onClick={onClose} aria-label="Close" className="flex h-9 w-9 items-center justify-center rounded-lg border-2 text-white" style={{ backgroundColor: INK, borderColor: INK }}>
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={tool.id} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: DURATION.fast }}>
              <ToolDetail tool={tool} large />
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="flex gap-2.5 border-t-2 bg-white px-6 py-4" style={{ borderColor: INK }}>
          <GetButton tool={tool} size="lg" className="flex-1" />
          <CopyLinkButton tool={tool} onCopied={onCopied} className="h-14 px-4" label />
        </div>
        <p className="bg-white px-6 pb-4 text-[12px] text-slate-600">Opens {tool.host} in a new tab · <kbd className="font-mono">←</kbd> <kbd className="font-mono">→</kbd> to switch tools</p>
      </motion.div>
    </>
  );
}

/** Mobile: a bottom sheet. Drag the handle down, tap outside, or use the close button. */
function BottomSheet({ tool, onClose, onCopied }: { tool: StudentTool; onClose: () => void; onCopied: (text: string) => void }) {
  const ref = useDialogFocus(true);
  const drag = useDragControls();
  useEscape(onClose);
  return (
    <>
      <motion.div className="fixed inset-0 z-40" style={{ backgroundColor: 'rgba(13,20,48,.55)' }} onClick={onClose}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
      <motion.div ref={ref} role="dialog" aria-modal="true" aria-labelledby="tool-sheet-title" tabIndex={-1}
        className="fixed inset-x-0 bottom-0 z-50 flex max-h-[88dvh] flex-col rounded-t-[26px] border-x-0 border-t-[3px] bg-[#f7f5ef] outline-none"
        style={{ borderColor: INK }}
        initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={SPRING.gentle}
        drag="y" dragListener={false} dragControls={drag} dragConstraints={{ top: 0, bottom: 0 }} dragElastic={{ top: 0, bottom: 0.7 }}
        onDragEnd={(_, info) => { if (info.offset.y > 110 || info.velocity.y > 600) onClose(); }}>
        <div className="touch-none px-4 pb-3 pt-2.5" onPointerDown={(event) => drag.start(event)}>
          <span aria-hidden="true" className="mx-auto mb-3 block h-1.5 w-12 rounded-full bg-slate-400" />
          <div className="flex items-start justify-between gap-3">
            <ToolHeading tool={tool} id="tool-sheet-title" />
            <button type="button" onClick={onClose} aria-label="Close" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border-2 text-white" style={{ backgroundColor: INK, borderColor: INK }}>
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto overscroll-contain border-t-2 px-4 py-5" style={{ borderColor: INK }}>
          <ToolDetail tool={tool} large={false} />
        </div>
        <div className="flex gap-2.5 border-t-2 bg-white px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]" style={{ borderColor: INK }}>
          <GetButton tool={tool} size="lg" className="flex-1" />
          <CopyLinkButton tool={tool} onCopied={onCopied} className="h-14 w-14" />
        </div>
      </motion.div>
    </>
  );
}

/* ================================================================ shared sections */

function FilterChips({ value, onChange, large }: { value: Filter; onChange: (filter: Filter) => void; large: boolean }) {
  return (
    <div role="group" aria-label="Filter by category" className={`flex gap-2 ${large ? 'flex-wrap' : 'no-scrollbar overflow-x-auto px-4 py-2.5'}`}>
      {FILTERS.map((filter) => {
        const active = filter === value;
        return (
          <button key={filter} type="button" aria-pressed={active} onClick={() => onChange(filter)}
            className={`flex shrink-0 items-center gap-1.5 rounded-full border-2 font-bold transition-colors ${large ? 'h-9 px-3.5 text-[13px]' : 'h-10 px-4 text-[14px]'} ${active ? 'text-white' : 'bg-white hover:bg-[#fff6cf]'}`}
            style={{ borderColor: INK, backgroundColor: active ? INK : undefined, color: active ? '#fff' : INK }}>
            {filter}<span className={`font-mono ${large ? 'text-[11px]' : 'text-[12px]'} ${active ? 'text-white/75' : 'text-slate-600'}`}>{countFor(filter)}</span>
          </button>
        );
      })}
    </div>
  );
}

function Disclosure({ summary, children, className = '' }: { summary: ReactNode; children: ReactNode; className?: string }) {
  return (
    <details className={`group rounded-xl border-2 bg-white ${className}`} style={{ borderColor: INK }}>
      <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-[14px] font-extrabold [&::-webkit-details-marker]:hidden" style={{ color: INK }}>
        {summary}
        <ChevronDown className="h-4 w-4 shrink-0 transition-transform group-open:rotate-180" aria-hidden="true" />
      </summary>
      <div className="px-4 pb-4 text-[14px] leading-6 text-slate-700">{children}</div>
    </details>
  );
}

function Faq({ columns = false }: { columns?: boolean }) {
  return (
    <section aria-labelledby="faq-title">
      <h2 id="faq-title" className="mb-2.5 font-mono text-[12px] font-bold uppercase tracking-[0.16em] text-slate-600 lg:text-[11px]">Quick questions</h2>
      <div className={columns ? 'grid grid-cols-2 items-start gap-2' : 'space-y-2'}>
        {STUDENT_FAQS.map((faq) => <Disclosure key={faq.question} summary={faq.question}><p>{faq.answer}</p></Disclosure>)}
      </div>
    </section>
  );
}

function PackExtras() {
  return (
    <section aria-labelledby="extras-title">
      <h2 id="extras-title" className="mb-2.5 font-mono text-[12px] font-bold uppercase tracking-[0.16em] text-slate-600 lg:text-[11px]">More in the Pack</h2>
      <Disclosure summary="More partner offers are on the GitHub Pack page">
        <ul className="space-y-1.5">
          {PACK_EXTRAS.map((item) => (
            <li key={item} className="flex gap-2"><Check className="mt-1 h-3.5 w-3.5 shrink-0" style={{ color: '#0b7a69' }} aria-hidden="true" />{item}</li>
          ))}
        </ul>
        <a href="https://education.github.com/pack" target="_blank" rel="noopener" className="mt-3 inline-flex items-center gap-1 font-bold underline underline-offset-2" style={{ color: COBALT }}>
          See every offer on education.github.com <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      </Disclosure>
    </section>
  );
}

function SourcesFooter({ wide = false }: { wide?: boolean }) {
  return (
    <footer className={`text-[12px] leading-5 text-slate-600 ${wide ? 'grid grid-cols-[1fr_auto] items-center gap-x-8 gap-y-1.5' : 'space-y-2.5'}`}>
      <p><strong className="text-slate-800">Last checked {LAST_CHECKED}</strong> · offers change; official pages are the source of truth.</p>
      <p>
        Sources:{' '}
        {STUDENT_SOURCES.map((source, index) => (
          <span key={source.url}>
            <a href={source.url} target="_blank" rel="noopener" className="underline decoration-slate-400 underline-offset-2 hover:text-slate-900">{source.label}</a>
            {index < STUDENT_SOURCES.length - 1 ? ' · ' : ''}
          </span>
        ))}
      </p>
      <a href={INSTAGRAM_URL} target="_blank" rel="noopener" className={`inline-flex min-h-11 ${wide ? 'col-start-2 row-span-2 row-start-1 max-w-[17rem] py-1.5 leading-[1.3]' : ''} items-center gap-2 rounded-xl border-2 bg-white px-3.5 text-[13px] font-extrabold`}
        style={{ borderColor: INK, color: INK, boxShadow: `3px 3px 0 ${INK}` }}>
        <Instagram className="h-4 w-4" aria-hidden="true" /> Follow @builtbyGSV for more free tools nobody tells you about
      </a>
    </footer>
  );
}

function Tag() {
  return (
    <span className="inline-block -rotate-1 whitespace-nowrap border-2 px-2.5 py-1 font-mono text-[12px] font-bold uppercase tracking-[0.14em] lg:text-[11px] lg:tracking-[0.18em]"
      style={{ backgroundColor: YELLOW, borderColor: '#05091c', color: INK, boxShadow: '3px 3px 0 #05091c' }}>
      {STUDENT_PAGE.tag}
    </span>
  );
}

function Headline({ className }: { className: string }) {
  return (
    <h1 className={`font-extrabold tracking-tight text-white ${className}`}>
      Your student ID unlocks thousands of rupees of software, <Highlight>free</Highlight>.
    </h1>
  );
}

function Tip({ className = '' }: { className?: string }) {
  return (
    <p className={`flex items-start gap-2 text-white/85 ${className}`}>
      <IdCard className="mt-0.5 h-4 w-4 shrink-0" style={{ color: TEAL }} aria-hidden="true" />
      {STUDENT_PAGE.tip}
    </p>
  );
}

/* ================================================================ desktop */

function DesktopCard({ tool, index, onOpen, onCopied }: { tool: StudentTool; index: number; onOpen: (id: string) => void; onCopied: (text: string) => void }) {
  return (
    <motion.article id={tool.id} layout="position" onClick={() => onOpen(tool.id)}
      initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: DURATION.reveal, ease: EASE.out, delay: 0.15 + index * 0.05 }}
      className="group flex cursor-pointer scroll-mt-24 flex-col rounded-2xl border-2 bg-white p-4 transition-[box-shadow,translate] duration-200 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#0d1430]"
      style={{ borderColor: INK, boxShadow: `4px 4px 0 ${INK}` }}>
      <div className="flex items-start gap-3">
        <LogoTile tool={tool} />
        <h2 className="min-w-0 flex-1 pt-0.5 text-[15.5px] font-extrabold leading-[1.25] tracking-tight" style={{ color: INK }}>{tool.name}</h2>
        <CopyLinkButton tool={tool} onCopied={onCopied} className="h-8 w-8 shrink-0 rounded-lg border-[1.5px]" />
      </div>
      <p className="mt-2.5 text-[13px] leading-5 text-slate-600">{tool.gets}</p>
      <div className="mt-auto flex flex-wrap items-center gap-x-2.5 gap-y-1.5 pt-3">
        <EligibilityChip tool={tool} />
        {tool.caveat && <CatchMark />}
      </div>
      <div className="mt-3 flex gap-2">
        <GetButton tool={tool} className="flex-1" />
        <button type="button" onClick={(event) => { event.stopPropagation(); onOpen(tool.id); }} aria-haspopup="dialog"
          className="h-10 rounded-xl border-2 bg-white px-3 text-[13px] font-bold transition-colors hover:bg-[#fff6cf]" style={{ borderColor: INK, color: INK }}
          aria-label={`How to claim ${tool.name}`}>
          Steps
        </button>
      </div>
    </motion.article>
  );
}

function DesktopLayout({ filter, setFilter, tools, onOpen, onShare, onCopied }: LayoutProps) {
  return (
    <main className="min-h-screen bg-[#F1F4F2]">
      <header className="border-b border-slate-200/80 bg-[#F8F9FA] px-10 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <a href="/" aria-label="BuiltbyGSV home"><BrandLogo /></a>
          <nav aria-label="Site" className="flex items-center gap-6 text-xs font-extrabold text-slate-600">
            <a href="/insights" className="transition hover:text-[#0F8B75]">Insights</a>
            <a href="/contact" className="flex items-center gap-1.5 transition hover:text-[#0F8B75]"><Mail className="h-4 w-4" />Contact</a>
          </nav>
        </div>
      </header>

      <section className="px-10" style={{ backgroundColor: INK }}>
        <div className="mx-auto grid max-w-6xl grid-cols-[1fr_auto] items-center gap-12 py-7">
          <div>
            <Tag />
            <Headline className="mt-4 max-w-[30ch] text-[2.2rem] leading-[1.1] xl:text-[2.5rem]" />
            <Tip className="mt-3.5 max-w-2xl text-[15px] leading-6" />
          </div>
          <div className="pr-6"><StudentIdCard /></div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-10 pb-10 pt-6">
        <div className="flex items-center justify-between gap-6">
          <FilterChips value={filter} onChange={setFilter} large />
          <div className="flex items-center gap-4">
            <span className="text-[12px] font-semibold text-slate-600">{STUDENT_TOOLS.length} offers · checked {LAST_CHECKED}</span>
            <button type="button" onClick={onShare} className="flex h-9 items-center gap-1.5 rounded-xl border-2 bg-white px-3.5 text-[13px] font-bold transition-colors hover:bg-[#fff6cf]" style={{ borderColor: INK, color: INK }}>
              <Share2 className="h-4 w-4" aria-hidden="true" /> Share
            </button>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-4 gap-5">
          {tools.map((tool, index) => <DesktopCard key={tool.id} tool={tool} index={index} onOpen={onOpen} onCopied={onCopied} />)}
        </div>

        <div className="mt-7 grid grid-cols-[2.2fr_1fr] items-start gap-6">
          <Faq columns />
          <PackExtras />
        </div>
        <div className="mt-7 border-t-2 border-dashed border-slate-300 pt-5"><SourcesFooter wide /></div>
      </div>
    </main>
  );
}

/* ================================================================ mobile */

function MobileRow({ tool, index, onOpen }: { tool: StudentTool; index: number; onOpen: (id: string) => void }) {
  return (
    <motion.li id={tool.id} className="scroll-mt-20 rounded-2xl border-2 bg-white" style={{ borderColor: INK, boxShadow: `3px 3px 0 ${INK}` }}
      initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: DURATION.reveal, ease: EASE.out, delay: 0.1 + index * 0.04 }}>
      <button type="button" onClick={() => onOpen(tool.id)} aria-haspopup="dialog" aria-label={`${tool.name}: how to claim it`}
        className="flex w-full items-start gap-3 px-3.5 pb-2 pt-3.5 text-left">
        <LogoTile tool={tool} />
        <span className="min-w-0 flex-1">
          <span className="flex items-center justify-between gap-2">
            <span className="text-[16px] font-extrabold leading-tight tracking-tight" style={{ color: INK }}>{tool.name}</span>
            <ChevronDown className="h-4 w-4 shrink-0 -rotate-90 text-slate-500" aria-hidden="true" />
          </span>
          <span className="mt-1 block text-[14px] leading-5 text-slate-600">{tool.gets}</span>
        </span>
      </button>
      <div className="flex flex-wrap items-center justify-between gap-2 px-3.5 pb-3.5 pt-1">
        <span className="flex flex-col items-start gap-1">
          <EligibilityChip tool={tool} large />
          {tool.caveat && <CatchMark large />}
        </span>
        <GetButton tool={tool} className="ml-auto h-11 shrink-0 px-4 text-[14px]" />
      </div>
    </motion.li>
  );
}

function MobileLayout({ filter, setFilter, tools, onOpen, onShare }: LayoutProps) {
  return (
    <main className="min-h-screen bg-[#F1F4F2]">
      <header className="flex items-center justify-between border-b border-slate-200/80 bg-[#F8F9FA] px-4 py-3">
        <a href="/" aria-label="BuiltbyGSV home"><BrandLogo nameClassName="text-[15px]" /></a>
        <button type="button" onClick={onShare} aria-label="Share this list"
          className="flex h-11 items-center gap-1.5 rounded-xl border-2 bg-white px-3 text-[14px] font-bold" style={{ borderColor: INK, color: INK }}>
          <Share2 className="h-4 w-4" aria-hidden="true" /> Share
        </button>
      </header>

      <section className="px-4 pb-6 pt-5" style={{ backgroundColor: INK }}>
        <div className="flex items-start justify-between gap-3">
          <div className="pt-1"><Tag /></div>
          <div className="max-[359px]:hidden"><StudentIdCard compact /></div>
        </div>
        <Headline className="mt-4 text-[1.75rem] leading-[1.12] min-[380px]:text-[1.95rem]" />
        <Tip className="mt-3 text-[14px] leading-[1.45rem]" />
      </section>

      <div className="sticky top-0 z-30 border-b-2 bg-[#F1F4F2]/95 backdrop-blur-sm" style={{ borderColor: INK }}>
        <FilterChips value={filter} onChange={setFilter} large={false} />
      </div>

      <div className="px-4 pb-8 pt-4">
        <p className="mb-3 text-[13px] font-semibold text-slate-600">Tap a card for the steps · {STUDENT_TOOLS.length} offers, checked {LAST_CHECKED}</p>
        <ul className="space-y-3.5">
          {tools.map((tool, index) => <MobileRow key={tool.id} tool={tool} index={index} onOpen={onOpen} />)}
        </ul>
        <div className="mt-8 space-y-6">
          <Faq />
          <PackExtras />
          <SourcesFooter />
        </div>
      </div>
    </main>
  );
}

/* ================================================================ page */

interface LayoutProps {
  filter: Filter;
  setFilter: (filter: Filter) => void;
  tools: StudentTool[];
  onOpen: (id: string) => void;
  onShare: () => void;
  onCopied: (text: string) => void;
}

export function StudentToolsPage() {
  const desktop = useMediaQuery('(min-width: 1024px)');
  const [filter, setFilter] = useState<Filter>('All');
  const [openId, setOpenId] = useState<string | null>(toolFromHash);
  const toast = useToast();
  const share = useShare(toast.show);
  const tools = filter === 'All' ? STUDENT_TOOLS : STUDENT_TOOLS.filter((tool) => tool.category === filter);
  const openTool = STUDENT_TOOLS.find((tool) => tool.id === openId) ?? null;

  // Deep links (/student#figma) open that tool; the card sits behind it when it closes.
  useEffect(() => {
    const id = toolFromHash();
    if (id) document.getElementById(id)?.scrollIntoView({ block: 'center' });
    const onHash = () => setOpenId(toolFromHash());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const open = useCallback((id: string) => {
    setOpenId(id);
    window.history.replaceState(null, '', `#${id}`);
  }, []);
  const close = useCallback(() => {
    setOpenId(null);
    window.history.replaceState(null, '', window.location.pathname);
  }, []);

  const props: LayoutProps = { filter, setFilter, tools, onOpen: open, onShare: share, onCopied: toast.show };

  return (
    <>
      {desktop ? <DesktopLayout {...props} /> : <MobileLayout {...props} />}
      <BusinessFooter />
      <AnimatePresence>
        {openTool && (desktop
          ? <SidePanel key="panel" tool={openTool} tools={tools.some((tool) => tool.id === openTool.id) ? tools : STUDENT_TOOLS} onSelect={open} onClose={close} onCopied={toast.show} />
          : <BottomSheet key={`sheet-${openTool.id}`} tool={openTool} onClose={close} onCopied={toast.show} />)}
      </AnimatePresence>
      {toast.node}
    </>
  );
}
