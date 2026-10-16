import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion, type PanInfo } from 'motion/react';
import { ArrowLeftRight, ArrowUpRight, Check, Link2, Share2 } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { BrandMark, LinkedinMark, XMark } from './BrandIcons';
import { DotQR } from './DotQR';
import { brandEntity, SITE_URL } from '../seo';
import { CONNECT_PAGE } from '../content/devday';

const INK = '#1C1714';
const PAPER = '#EFE6D3';

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
 * One card, two faces: LinkedIn on the front, X on the back. Swipe, tap the toggle
 * or use the arrow keys to flip. Each face's QR opens that profile directly.
 */
export function ConnectPage() {
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
          <button type="button" onClick={share} className="flex h-9 items-center gap-1.5 rounded-full border-2 px-3 text-xs font-bold" style={{ borderColor: INK }}>
            <Share2 className="h-3.5 w-3.5" /> Share
          </button>
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
