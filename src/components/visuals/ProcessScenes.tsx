import { motion, type Variants } from 'motion/react';
import { EASE } from '../../motion/tokens';

/** One small scene per delivery stage, drawn in the studio's line style. */

const INK = '#131921';
const TEAL = '#0F8B75';
const MINT = '#E2F1ED';
const SUN = '#F5C748';

const pop: Variants = {
  hidden: { opacity: 0, y: 8 },
  shown: (i: number = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE.out, delay: i * 0.08 } }),
};
const draw: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  shown: (i: number = 0) => ({ pathLength: 1, opacity: 1, transition: { duration: 0.55, ease: EASE.out, delay: i * 0.08 } }),
};
const text = { stroke: 'none', fill: INK, fontSize: 11, fontWeight: 800, fontFamily: 'Plus Jakarta Sans, sans-serif' } as const;

function Frame({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <motion.svg viewBox="0 0 320 220" className="h-full w-full overflow-visible" fill="none" stroke={INK} strokeWidth={2}
      strokeLinecap="round" strokeLinejoin="round" initial="hidden" animate="shown" role="img" aria-label={label}>
      {children}
    </motion.svg>
  );
}

function Understand() {
  const notes = [
    { x: 30, y: 40, r: -4, fill: SUN, t: 'Users' },
    { x: 118, y: 28, r: 3, fill: '#fff', t: 'Problem' },
    { x: 40, y: 124, r: 2, fill: '#fff', t: 'Constraints' },
  ];
  return (
    <Frame label="Notes about users, the problem and constraints converging on an agreed outcome">
      {notes.map((note, i) => (
        <motion.g key={note.t} variants={pop} custom={i} transform={`rotate(${note.r} ${note.x + 40} ${note.y + 34})`}>
          <rect x={note.x} y={note.y} width="84" height="66" rx="6" fill={note.fill} />
          <text x={note.x + 42} y={note.y + 38} textAnchor="middle" {...text}>{note.t}</text>
        </motion.g>
      ))}
      <motion.path variants={draw} custom={3} d="M114 90 C 160 100, 190 110, 218 112" stroke={TEAL} />
      <motion.path variants={draw} custom={4} d="M160 160 C 190 150, 205 138, 222 128" stroke={TEAL} />
      <motion.g variants={pop} custom={5}>
        <circle cx="252" cy="118" r="42" fill={MINT} stroke={TEAL} />
        <circle cx="252" cy="118" r="26" fill="#fff" stroke={TEAL} />
        <circle cx="252" cy="118" r="9" fill={TEAL} stroke="none" />
        <text x="252" y="182" textAnchor="middle" {...text}>Outcome</text>
      </motion.g>
    </Frame>
  );
}

function Design() {
  return (
    <Frame label="A wireframe of the product experience beside a simple architecture sketch">
      <motion.g variants={pop} custom={0}>
        <rect x="16" y="24" width="160" height="172" rx="12" fill="#fff" />
        <path d="M16 46 H176" />
      </motion.g>
      <motion.rect variants={pop} custom={1} x="30" y="58" width="132" height="42" rx="6" fill={MINT} strokeDasharray="4 4" strokeWidth={1.5} />
      <motion.rect variants={pop} custom={2} x="30" y="110" width="62" height="36" rx="6" fill="#fff" strokeDasharray="4 4" strokeWidth={1.5} />
      <motion.rect variants={pop} custom={3} x="100" y="110" width="62" height="36" rx="6" fill="#fff" strokeDasharray="4 4" strokeWidth={1.5} />
      <motion.rect variants={pop} custom={4} x="30" y="156" width="80" height="24" rx="12" fill={TEAL} stroke="none" />
      {[
        { y: 36, t: 'UI' },
        { y: 96, t: 'API' },
        { y: 156, t: 'Data' },
      ].map((box, i) => (
        <motion.g key={box.t} variants={pop} custom={5 + i}>
          <rect x="222" y={box.y} width="82" height="36" rx="9" fill={i === 1 ? INK : i === 2 ? SUN : '#fff'} />
          <text x="263" y={box.y + 22} textAnchor="middle" {...text} fill={i === 1 ? '#fff' : INK}>{box.t}</text>
        </motion.g>
      ))}
      <motion.path variants={draw} custom={8} d="M263 72 V96 M263 132 V156" stroke={TEAL} />
      <motion.path variants={draw} custom={9} d="M176 110 C 196 110, 200 54, 222 54" stroke={TEAL} />
    </Frame>
  );
}

function Build() {
  const rows = [
    [{ x: 40, w: 110, f: TEAL }, { x: 158, w: 120, f: '#fff' }],
    [{ x: 40, w: 70, f: '#fff' }, { x: 118, w: 90, f: SUN }, { x: 216, w: 62, f: '#fff' }],
    [{ x: 40, w: 150, f: '#fff' }, { x: 198, w: 80, f: INK }],
  ];
  return (
    <Frame label="Blocks of a product being assembled in reviewable stages">
      <motion.path variants={pop} custom={0} d="M24 190 H296" stroke={TEAL} strokeDasharray="4 4" />
      {rows.map((row, r) => row.map((block, i) => (
        <motion.rect key={`${r}-${i}`} variants={pop} custom={(2 - r) * 3 + i} x={block.x} y={148 - r * 44} width={block.w} height="36" rx="8" fill={block.f} />
      )))}
      {[0, 1, 2].map((r) => (
        <motion.g key={r} variants={pop} custom={9 + r}>
          <circle cx="300" cy={166 - r * 44} r="9" fill={MINT} stroke={TEAL} strokeWidth={1.5} />
          <path d={`M296 ${166 - r * 44} l3 3 l5 -6`} stroke={TEAL} strokeWidth={1.8} />
        </motion.g>
      ))}
      <motion.text variants={pop} custom={12} x="160" y="44" textAnchor="middle" {...text} fill="#64748B" fontSize={10}>STAGE BY STAGE</motion.text>
    </Frame>
  );
}

function Ship() {
  return (
    <Frame label="A checklist of tested workflows, then the release going live with handover notes">
      <motion.g variants={pop} custom={0}>
        <rect x="18" y="26" width="150" height="170" rx="12" fill="#fff" />
        <text x="34" y="52" {...text} fill="#64748B" fontSize={10}>CHECKS</text>
      </motion.g>
      {['Main workflows', 'Edge cases', 'Devices'].map((item, i) => (
        <motion.g key={item} variants={pop} custom={1 + i}>
          <rect x="32" y={66 + i * 40} width="18" height="18" rx="5" fill={TEAL} stroke="none" />
          <path d={`M36 ${75 + i * 40} l3.5 3.5 l6 -7`} stroke="#fff" strokeWidth={2} />
          <text x="60" y={79 + i * 40} {...text}>{item}</text>
        </motion.g>
      ))}
      <motion.path variants={draw} custom={4} d="M168 110 C 196 110, 200 80, 222 80" stroke={TEAL} />
      <motion.g variants={pop} custom={5}>
        <rect x="222" y="52" width="84" height="56" rx="12" fill={INK} />
        <circle cx="244" cy="80" r="6" fill="#10B981" stroke="none" />
        <text x="276" y="84" textAnchor="middle" {...text} fill="#fff">Live</text>
      </motion.g>
      <motion.path variants={draw} custom={6} d="M264 108 V140" stroke={TEAL} />
      <motion.g variants={pop} custom={7}>
        <rect x="222" y="140" width="84" height="56" rx="8" fill={SUN} />
        <path d="M236 158 H290 M236 170 H282 M236 182 H270" strokeWidth={1.5} />
      </motion.g>
    </Frame>
  );
}

function Improve() {
  const bars = [30, 44, 40, 62, 74];
  return (
    <Frame label="Usage and feedback feeding back into the next scoped release">
      <motion.path variants={draw} custom={0} d="M160 30 A 80 80 0 1 1 82 118" stroke={TEAL} strokeWidth={2.5} />
      <motion.path variants={draw} custom={3} d="M74 108 L82 120 L94 110" stroke={TEAL} strokeWidth={2.5} />
      {bars.map((h, i) => (
        <motion.rect key={i} variants={pop} custom={2 + i} x={116 + i * 20} y={148 - h} width="12" height={h} rx="3" fill={i === bars.length - 1 ? SUN : TEAL} stroke="none" />
      ))}
      <motion.g variants={pop} custom={8}>
        <rect x="18" y="30" width="96" height="40" rx="20" fill="#fff" />
        <text x="66" y="54" textAnchor="middle" {...text}>Feedback</text>
      </motion.g>
      <motion.g variants={pop} custom={9}>
        <rect x="216" y="168" width="96" height="36" rx="18" fill={MINT} stroke={TEAL} />
        <text x="264" y="190" textAnchor="middle" {...text}>Next scope</text>
      </motion.g>
    </Frame>
  );
}

export const PROCESS_SCENES = [Understand, Design, Build, Ship, Improve];
