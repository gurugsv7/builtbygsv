import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { AnimatePresence, motion, type PanInfo } from 'motion/react';
import { ArrowLeftRight, ArrowRight, ArrowUpRight, Check, Link2, QrCode, Share2, X } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { BrandMark, LinkedinMark, XMark } from './BrandIcons';
import { DotQR } from './DotQR';
import { brandEntity, SITE_URL } from '../seo';
import { CONNECT_PAGE } from '../content/devday';
import guruHello from '../assets/guru/guru-hello.webp';
import { useInstallPrompt } from '../useInstallPrompt';

const INK = '#1C1714';
const PAPER = '#EFE6D3';
const CLAY = '#E4572E';

type Face = {
  key: 'linkedin' | 'x';
  label: string;
  url: string;
  handle: string;
  cta: string;
  accent: string;
  body: string;
};
const FACES: Face[] = [
  { key: 'linkedin', label: 'LinkedIn', url: brandEntity.linkedin, handle: 'linkedin.com/in/gurugsv', cta: 'Connect on LinkedIn', accent: '#0A66C2', body: '#FFFFFF' },
  { key: 'x', label: 'X', url: brandEntity.x, handle: 'x.com/BuiltbyGSV', cta: 'Follow @BuiltbyGSV', accent: '#000000', body: '#F4F1EA' },
];

/** Keeps the screen awake while the card is up, so the QR never dims mid-scan. */
function useWakeLock() {
  useEffect(() => {
    let lock: { release: () => Promise<void> } | null = null;
    const nav = navigator as Navigator & { wakeLock?: { request: (type: 'screen') => Promise<{ release: () => Promise<void> }> } };
    const request = async () => {
      try { if (document.visibilityState === 'visible' && nav.wakeLock) lock = await nav.wakeLock.request('screen'); } catch { /* unsupported or denied */ }
    };
    request();
    document.addEventListener('visibilitychange', request);
    return () => { document.removeEventListener('visibilitychange', request); lock?.release().catch(() => undefined); };
  }, []);
}

function CardFace({ face, index }: { face: Face; index: number }) {
  const Mark = face.key === 'linkedin' ? LinkedinMark : XMark;
  return (
    <div className="absolute inset-0 flex flex-col overflow-hidden rounded-[20px] border-2 [backface-visibility:hidden]"
      style={{ backgroundColor: face.body, borderColor: INK, boxShadow: `7px 7px 0 ${INK}`, transform: index ? 'rotateY(180deg)' : undefined }}>
      <div className="flex items-center justify-between px-4 py-3 text-white" style={{ backgroundColor: face.accent }}>
        <span className="flex items-center gap-2 text-[15px] font-extrabold">
          {face.key === 'linkedin'
            ? <span className="rounded-[3px] bg-white"><LinkedinMark className="h-5 w-5" style={{ color: face.accent }} /></span>
            : <XMark className="h-[18px] w-[18px]" />}
          {face.label}
        </span>
        <span className="whitespace-nowrap font-plex text-[11px] font-bold opacity-80">{String(index + 1).padStart(2, '0')}/02</span>
      </div>

      <div className="relative flex items-center px-4 py-2.5">
        <span aria-hidden="true" className="absolute inset-x-4 top-0 border-t-2 border-dashed" style={{ borderColor: `${INK}55` }} />
        <span aria-hidden="true" className="absolute -left-[11px] -top-[10px] h-5 w-5 rounded-full border-2" style={{ backgroundColor: PAPER, borderColor: INK }} />
        <span aria-hidden="true" className="absolute -right-[11px] -top-[10px] h-5 w-5 rounded-full border-2" style={{ backgroundColor: PAPER, borderColor: INK }} />
        <div className="min-w-0" style={{ color: INK }}>
          <p className="font-shout text-[0.95rem] uppercase leading-none tracking-tight">Gurusabarivasan M</p>
          <p className="mt-1 whitespace-nowrap font-plex text-[10px] font-bold uppercase tracking-wide opacity-70">Founder · BuiltbyGSV</p>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center">
        <div className="aspect-square w-[74%] rounded-2xl bg-white p-[5%]" style={{ boxShadow: `inset 0 0 0 2px ${INK}14` }}>
          <DotQR value={face.url} color={face.accent} eye={INK} label={`QR code for ${face.handle}`}
            logo={<span className="flex h-[78%] w-[78%] items-center justify-center rounded-[22%] bg-white"><Mark className="h-[70%] w-[70%]" style={{ color: face.accent }} /></span>} />
        </div>
      </div>

      <p className="truncate px-4 pb-3 pt-2 text-center font-plex text-[12px] font-bold" style={{ color: INK }}>{face.handle}</p>
    </div>
  );
}

/**
 * Show mode, for Guru's own phone: one card, two faces, LinkedIn on the front and X
 * on the back. Swipe, tap the toggle or use the arrow keys to flip. Each face's QR
 * opens that profile directly.
 */
function ShowMode({ onExit }: { onExit: () => void }) {
  const install = useInstallPrompt();
  const [side, setSide] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [copied, setCopied] = useState(false);
  const face = FACES[side];
  useWakeLock();

  const show = useCallback((next: number) => {
    setSide((current) => {
      if (current === next) return current;
      navigator.vibrate?.(12);
      setFlipped(true);
      return next;
    });
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') show(side ? 0 : 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [show, side]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (Math.abs(info.offset.x) > 40 || Math.abs(info.velocity.x) > 400) show(side ? 0 : 1);
  };

  const share = async () => {
    const url = `${SITE_URL}${CONNECT_PAGE.path}`;
    try {
      if (navigator.share) { await navigator.share({ title: 'Connect with Guru', url }); return; }
      await navigator.clipboard.writeText(url);
    } catch { /* dismissed */ }
  };
  const copy = async () => {
    try { await navigator.clipboard.writeText(face.url); setCopied(true); window.setTimeout(() => setCopied(false), 1600); } catch { /* the button link still works */ }
  };

  return (
    <main className="fixed inset-0 flex justify-center overflow-hidden font-sans antialiased" style={{ backgroundColor: PAPER, color: INK }}>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.18] [mask-image:radial-gradient(circle_at_50%_55%,transparent_35%,#000_80%)]"
        style={{ backgroundImage: `radial-gradient(${INK} 1.2px, transparent 1.4px)`, backgroundSize: '10px 10px' }} />

      <div className="relative flex h-full w-full max-w-[440px] flex-col px-5 pb-[max(1rem,env(safe-area-inset-bottom))] pt-[max(1rem,env(safe-area-inset-top))] [--chrome:22rem] [@media(max-height:700px)]:[--chrome:15.5rem]">
        <header className="flex items-center justify-between">
          <a href="/devday" aria-label="BuiltbyGSV"><BrandLogo nameClassName="text-xs" /></a>
          <div className="flex items-center gap-2">
            {install && (
              <button type="button" onClick={install} className="flex h-9 items-center rounded-full px-3 text-xs font-bold text-white" style={{ backgroundColor: INK }}>
                Install
              </button>
            )}
            <button type="button" onClick={share} aria-label="Share this page" className="flex h-9 w-9 items-center justify-center rounded-full border-2" style={{ borderColor: INK }}>
              <Share2 className="h-3.5 w-3.5" />
            </button>
            <button type="button" onClick={onExit} className="flex h-9 items-center gap-1.5 rounded-full border-2 px-3 text-xs font-bold" style={{ borderColor: INK }}>
              <X className="h-3.5 w-3.5" /> Done
            </button>
          </div>
        </header>

        <div className="mt-4 [@media(max-height:700px)]:hidden">
          <motion.p initial={{ opacity: 0, rotate: -6, x: -16 }} animate={{ opacity: 1, rotate: -2, x: 0 }} transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className="inline-block px-2 py-1 font-plex text-[11px] font-bold uppercase tracking-[0.14em]" style={{ backgroundColor: INK, color: PAPER }}>
            Scan · Connect · Build
          </motion.p>
          <h1 className="mt-3 font-shout text-[2.1rem] uppercase leading-[0.95] [@media(max-height:640px)]:text-[1.7rem]">
            Let’s stay <span style={{ color: '#E4572E' }}>connected.</span>
          </h1>
        </div>

        <div className="flex min-h-0 flex-1 items-center justify-center py-4" style={{ perspective: 1400 }}>
          <motion.div className="relative cursor-grab touch-pan-y active:cursor-grabbing"
            style={{ width: 'min(84vw, 20rem, calc((100dvh - var(--chrome)) / 1.42))', aspectRatio: '1 / 1.42', transformStyle: 'preserve-3d' }}
            initial={{ opacity: 0, y: 40, rotateZ: -4 }}
            animate={{ opacity: 1, y: 0, rotateZ: 0, rotateY: side * 180 }}
            transition={{ rotateY: { type: 'spring', stiffness: 120, damping: 16 }, default: { type: 'spring', stiffness: 160, damping: 18 } }}
            drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={0.25} dragSnapToOrigin onDragEnd={onDragEnd}>
            {FACES.map((entry, index) => <CardFace key={entry.key} face={entry} index={index} />)}
          </motion.div>
        </div>

        <div className="flex flex-col items-center">
          <div className="relative grid w-full max-w-[18rem] grid-cols-2 rounded-full border-2 p-1" style={{ borderColor: INK }} role="tablist" aria-label="Choose a network">
            {FACES.map((entry, index) => (
              <button key={entry.key} type="button" role="tab" aria-selected={side === index} onClick={() => show(index)}
                className="relative z-10 flex h-9 items-center justify-center gap-1.5 rounded-full text-sm font-bold transition-colors"
                style={{ color: side === index ? '#FFFFFF' : INK }}>
                {side === index && <motion.span layoutId="connect-tab" className="absolute inset-0 -z-10 rounded-full" style={{ backgroundColor: entry.accent }} transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
                {entry.key === 'linkedin'
                  ? <span className={`rounded-[2px] ${side === index ? 'bg-white' : ''}`}><BrandMark name="linkedin" className="h-4 w-4" /></span>
                  : <XMark className="h-3.5 w-3.5" />}
                {entry.label}
              </button>
            ))}
          </div>
          <AnimatePresence>
            {!flipped && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-2 flex items-center gap-1.5 font-plex text-[11px] font-bold opacity-60 [@media(max-height:700px)]:hidden">
                <motion.span animate={{ x: [-3, 3, -3] }} transition={{ duration: 1.4, repeat: Infinity }}><ArrowLeftRight className="h-3.5 w-3.5" /></motion.span>
                Swipe the card to flip
              </motion.p>
            )}
          </AnimatePresence>

          <div className="mt-4 flex w-full gap-2">
            <a href={face.url} target="_blank" rel="noopener noreferrer" className="flex h-12 flex-1 items-center justify-center gap-2 rounded-2xl text-[15px] font-extrabold text-white transition-colors"
              style={{ backgroundColor: face.accent, boxShadow: `4px 4px 0 ${INK}` }}>
              {face.cta} <ArrowUpRight className="h-4 w-4" />
            </a>
            <button type="button" onClick={copy} aria-label={`Copy ${face.label} link`} className="flex h-12 w-12 items-center justify-center rounded-2xl border-2 bg-white" style={{ borderColor: INK }}>
              {copied ? <Check className="h-4 w-4 text-[#0F8B75]" /> : <Link2 className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

/* ------------------------------------------------------------------ Visitor */

type Step = 'linkedin' | 'x';
const STEPS: { key: Step; title: string; detail: string; url: string; accent: string }[] = [
  { key: 'linkedin', title: 'Connect on LinkedIn', detail: 'in/gurugsv · Founder, BuiltbyGSV', url: 'https://www.linkedin.com/in/gurugsv/', accent: '#0A66C2' },
  { key: 'x', title: 'Follow on X', detail: '@BuiltbyGSV · builds, drops, reels', url: brandEntity.x, accent: '#000000' },
];
const STORE = 'gsv-connect-v1';
const readDone = (): Record<Step, boolean> => {
  try { return { linkedin: false, x: false, ...JSON.parse(localStorage.getItem(STORE) ?? '{}') }; } catch { return { linkedin: false, x: false }; }
};

/** A rubber stamp in the reel style, slammed onto a finished step. */
function Stamp({ children, big = false }: { children: ReactNode; big?: boolean }) {
  return (
    <motion.span initial={{ scale: big ? 3 : 2.4, opacity: 0, rotate: big ? -18 : 14 }} animate={{ scale: 1, opacity: 1, rotate: big ? -8 : -10 }}
      transition={{ type: 'spring', stiffness: 520, damping: 22 }}
      className={`pointer-events-none inline-flex items-center gap-1 rounded-md border-[3px] font-shout uppercase ${big ? 'px-4 py-2 text-[2.4rem]' : 'px-2 py-0.5 text-[0.95rem]'}`}
      style={{ color: CLAY, borderColor: CLAY, mixBlendMode: 'multiply' }}>
      {children}
    </motion.span>
  );
}

function StepTicket({ step, index, done, onGo }: { step: (typeof STEPS)[number]; index: number; done: boolean; onGo: () => void }) {
  const Mark = step.key === 'linkedin' ? LinkedinMark : XMark;
  return (
    <motion.a href={step.url} target="_blank" rel="noopener noreferrer" onClick={onGo}
      initial={{ opacity: 0, x: 60, rotate: 4 }} animate={{ opacity: 1, x: 0, rotate: index ? 1 : -1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.25 + index * 0.12 }}
      whileTap={{ scale: 0.97, x: 3, y: 3 }}
      className="relative flex overflow-hidden rounded-[14px] border-2 bg-white"
      style={{ borderColor: INK, boxShadow: `5px 5px 0 ${INK}`, color: INK }}>
      <span className="flex w-[4.5rem] shrink-0 flex-col items-center justify-center gap-1.5 border-r-2 border-dashed py-3 text-white" style={{ backgroundColor: step.accent, borderColor: `${INK}66` }}>
        {step.key === 'linkedin'
          ? <span className="rounded-[4px] bg-white"><Mark className="h-7 w-7" style={{ color: step.accent }} /></span>
          : <Mark className="h-6 w-6" />}
        <span className="font-print text-[1.2rem] leading-none">0{index + 1}</span>
      </span>
      <span className="flex min-w-0 flex-1 flex-col justify-center px-3.5 py-3">
        <span className="font-shout text-[1.05rem] uppercase leading-tight">{step.title}</span>
        <span className="mt-1 truncate font-plex text-[11px] font-bold opacity-65">{step.detail}</span>
      </span>
      <span className="flex w-[4.75rem] shrink-0 items-center justify-center pr-2">
        {done ? <Stamp>Done</Stamp> : (
          <span className="flex items-center gap-1 rounded-full px-2.5 py-1.5 font-plex text-[11px] font-bold text-white" style={{ backgroundColor: step.accent }}>
            Tap <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
        )}
      </span>
      <span aria-hidden="true" className="absolute -top-[9px] left-[4.15rem] h-4 w-4 rounded-full border-2" style={{ backgroundColor: PAPER, borderColor: INK }} />
      <span aria-hidden="true" className="absolute -bottom-[9px] left-[4.15rem] h-4 w-4 rounded-full border-2" style={{ backgroundColor: PAPER, borderColor: INK }} />
    </motion.a>
  );
}

/**
 * What someone sees after scanning: no more QR codes, just a two-step checklist.
 * Tapping a ticket opens that app; coming back to the page stamps it done.
 */
function VisitorMode({ onShow }: { onShow: () => void }) {
  const [done, setDone] = useState<Record<Step, boolean>>(readDone);
  const pending = useRef<Step | null>(null);
  const count = STEPS.filter((step) => done[step.key]).length;
  const all = count === STEPS.length;

  const finish = useCallback(() => {
    const key = pending.current;
    if (!key) return;
    pending.current = null;
    setDone((current) => {
      const next = { ...current, [key]: true };
      try { localStorage.setItem(STORE, JSON.stringify(next)); } catch { /* progress just won't persist */ }
      const nowAll = STEPS.every((step) => next[step.key]);
      navigator.vibrate?.(nowAll ? [18, 60, 18, 60, 40] : 14);
      return next;
    });
  }, []);

  useEffect(() => {
    const onReturn = () => { if (document.visibilityState === 'visible') finish(); };
    document.addEventListener('visibilitychange', onReturn);
    window.addEventListener('focus', onReturn);
    return () => { document.removeEventListener('visibilitychange', onReturn); window.removeEventListener('focus', onReturn); };
  }, [finish]);

  const go = (key: Step) => {
    pending.current = key;
    // If the profile opened in place of a new tab, the page never hides; stamp it shortly after.
    window.setTimeout(() => { if (document.visibilityState === 'visible' && document.hasFocus()) finish(); }, 2500);
  };

  return (
    <main className="min-h-[100dvh] overflow-x-clip font-sans antialiased" style={{ backgroundColor: PAPER, color: INK }}>
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 opacity-[0.16] [mask-image:linear-gradient(#000,transparent_55%)]"
        style={{ backgroundImage: `radial-gradient(${INK} 1.2px, transparent 1.4px)`, backgroundSize: '10px 10px' }} />
      <div className="relative mx-auto flex min-h-[100dvh] w-full max-w-[440px] flex-col px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-[max(1rem,env(safe-area-inset-top))]">
        <header className="flex items-center justify-between">
          <a href="/devday" aria-label="BuiltbyGSV"><BrandLogo nameClassName="text-xs" /></a>
          <button type="button" onClick={onShow} aria-label="Show QR codes" className="flex h-9 w-9 items-center justify-center rounded-full border-2" style={{ borderColor: INK }}>
            <QrCode className="h-4 w-4" />
          </button>
        </header>

        <section className="relative mt-3 flex items-end gap-1">
          <motion.div className="relative z-10 mb-16 flex-1" initial={{ opacity: 0, y: 12, rotate: -4 }} animate={{ opacity: 1, y: 0, rotate: -2 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.15 }}>
            <div className="relative rounded-2xl border-2 bg-white px-3.5 py-3" style={{ borderColor: INK, boxShadow: `4px 4px 0 ${INK}` }}>
              <p className="font-shout text-[1.35rem] uppercase leading-[1.02]">Hey, I’m Guru!</p>
              <p className="mt-1.5 text-[13px] font-semibold leading-snug">Two taps and we’re connected. I’ll stamp each one when you’re back.</p>
              <svg aria-hidden="true" viewBox="0 0 30 22" className="absolute -right-[22px] bottom-5 h-[22px] w-[30px]">
                <path d="M0 2 L28 12 L0 20" fill="#FFFFFF" stroke={INK} strokeWidth="2" strokeLinejoin="round" />
                <rect x="-2" y="3.5" width="3" height="15" fill="#FFFFFF" />
              </svg>
            </div>
          </motion.div>
          <motion.img src={guruHello} alt="Guru, the BuiltbyGSV character" width={720} height={647} draggable={false}
            className="w-[52%] max-w-[13rem] shrink-0 select-none"
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: [0, -4, 0] }}
            transition={{ opacity: { duration: 0.4 }, y: { duration: 3.4, repeat: Infinity, ease: 'easeInOut', delay: 0.6 } }} />
        </section>

        <div className="relative -mt-1 rounded-2xl border-2 px-4 py-3" style={{ borderColor: INK, backgroundColor: INK, color: PAPER }}>
          <div className="flex items-baseline justify-between">
            <span className="font-plex text-[11px] font-bold uppercase tracking-[0.16em] opacity-70">Connection</span>
            <span className="font-print text-[1.9rem] leading-none"><span style={{ color: count ? '#19B39B' : PAPER }}>{count}</span>/{STEPS.length}</span>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-1.5">
            {STEPS.map((step) => (
              <span key={step.key} className="h-2 overflow-hidden rounded-full bg-white/15">
                <motion.span className="block h-full rounded-full" style={{ backgroundColor: '#19B39B' }}
                  initial={false} animate={{ width: done[step.key] ? '100%' : '0%' }} transition={{ type: 'spring', stiffness: 120, damping: 20 }} />
              </span>
            ))}
          </div>
        </div>

        <div className="mt-5 space-y-4">
          {STEPS.map((step, index) => (
            <StepTicket key={step.key} step={step} index={index} done={done[step.key]} onGo={() => go(step.key)} />
          ))}
        </div>

        <div className="relative mt-auto pt-6">
          <AnimatePresence mode="wait">
            {all ? (
              <motion.div key="all" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center text-center">
                <Stamp big>Connected ✓</Stamp>
                <p className="mt-4 text-sm font-semibold">That’s it. See you in the feed.</p>
                <a href="/tour" className="mt-3 inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-extrabold text-white" style={{ backgroundColor: INK, boxShadow: `4px 4px 0 ${CLAY}` }}>
                  Now see what I build <ArrowRight className="h-4 w-4" />
                </a>
              </motion.div>
            ) : (
              <motion.div key="more" exit={{ opacity: 0 }} className="flex items-center justify-center gap-4 font-plex text-[12px] font-bold">
                <a href="/gurusabarivasan.vcf" className="underline decoration-2 underline-offset-4">Save my number</a>
                <span aria-hidden="true" className="opacity-40">/</span>
                <a href="/tour" className="underline decoration-2 underline-offset-4">1-min tour</a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}

/**
 * /connect is mostly opened by someone who just scanned a code, so it defaults to a
 * checklist with no QR codes. `?show` (or the QR button) switches to the two-sided
 * card for showing from Guru's own phone.
 */
export function ConnectPage() {
  const [showing, setShowing] = useState(() => new URLSearchParams(window.location.search).has('show'));
  const set = (next: boolean) => {
    setShowing(next);
    window.history.replaceState(null, '', next ? `${CONNECT_PAGE.path}?show` : CONNECT_PAGE.path);
  };
  return showing ? <ShowMode onExit={() => set(false)} /> : <VisitorMode onShow={() => set(true)} />;
}
