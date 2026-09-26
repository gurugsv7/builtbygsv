import { motion, useReducedMotion, type Variants } from 'motion/react';
import type { ServiceType } from '../../types';
import { EASE } from '../../motion/tokens';

/**
 * Small native SVG scenes, one per capability. Each assembles in order when mounted,
 * so re-keying a scene replays it. They share the hero illustration's language:
 * navy 2px outlines, white planes, teal and yellow fills.
 */

const INK = '#131921';
const TEAL = '#0F8B75';
const MINT = '#E2F1ED';
const SUN = '#F5C748';
const PAPER = '#F8F9FA';

const step = 0.09;
const pop: Variants = {
  hidden: { opacity: 0, y: 8 },
  shown: (i: number = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE.out, delay: i * step } }),
};
const draw: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  shown: (i: number = 0) => ({ pathLength: 1, opacity: 1, transition: { duration: 0.5, ease: EASE.out, delay: i * step } }),
};
const grow: Variants = {
  hidden: { scaleY: 0 },
  shown: (i: number = 0) => ({ scaleY: 1, transition: { duration: 0.55, ease: EASE.out, delay: i * step } }),
};

const label = { fontSize: 11, fontWeight: 800, fill: INK, stroke: 'none', fontFamily: 'Plus Jakarta Sans, sans-serif' } as const;
const mono = { fontSize: 10, fontWeight: 700, stroke: 'none', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' } as const;

function Frame({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <motion.svg viewBox="0 0 400 280" className="h-full w-full overflow-visible" fill="none" stroke={INK} strokeWidth={2}
      strokeLinecap="round" strokeLinejoin="round" initial="hidden" animate="shown" role="img" aria-label={title}>
      {children}
    </motion.svg>
  );
}

function ProductScene() {
  return (
    <Frame title="A browser interface and a phone view connected to an API, a database and a live release">
      <motion.g variants={pop} custom={0}>
        <rect x="20" y="30" width="220" height="160" rx="12" fill="#fff" />
        <path d="M20 54 H240" />
        {[36, 48, 60].map((cx) => <circle key={cx} cx={cx} cy="42" r="3" fill={INK} stroke="none" />)}
        <rect x="80" y="37" width="120" height="10" rx="5" fill="#EEF1EF" stroke="none" />
      </motion.g>
      <motion.rect variants={pop} custom={1} x="34" y="64" width="192" height="10" rx="3" fill={MINT} stroke="none" />
      <motion.rect variants={pop} custom={2} x="34" y="82" width="110" height="44" rx="6" fill={TEAL} stroke="none" />
      <motion.g variants={pop} custom={3} stroke="none" fill="#DDE3E0">
        <rect x="152" y="86" width="74" height="7" rx="3.5" />
        <rect x="152" y="99" width="56" height="7" rx="3.5" />
        <rect x="152" y="112" width="64" height="7" rx="3.5" />
      </motion.g>
      {[34, 100, 166].map((x, i) => (
        <motion.rect key={x} variants={pop} custom={4 + i} x={x} y="136" width="60" height="40" rx="6" fill={PAPER} strokeWidth={1.5} />
      ))}
      <motion.g variants={pop} custom={7}>
        <rect x="200" y="118" width="62" height="114" rx="11" fill="#fff" />
        <rect x="208" y="134" width="46" height="22" rx="4" fill={TEAL} stroke="none" />
        <rect x="208" y="162" width="46" height="6" rx="3" fill="#DDE3E0" stroke="none" />
        <rect x="208" y="173" width="34" height="6" rx="3" fill="#DDE3E0" stroke="none" />
        <rect x="208" y="188" width="46" height="26" rx="4" fill={PAPER} strokeWidth={1.5} />
        <path d="M222 124 H240" strokeWidth={2.5} />
      </motion.g>

      <motion.path variants={draw} custom={8} d="M240 70 C 270 70, 272 62, 300 62" stroke={TEAL} />
      <motion.g variants={pop} custom={9}>
        <rect x="300" y="40" width="80" height="44" rx="10" fill={INK} />
        <text x="340" y="66" textAnchor="middle" {...mono} fill="#fff">API</text>
      </motion.g>
      <motion.path variants={draw} custom={10} d="M340 84 V118" stroke={TEAL} />
      <motion.g variants={pop} custom={11}>
        <path d="M300 128 V160 A40 9 0 0 0 380 160 V128" fill={SUN} />
        <ellipse cx="340" cy="128" rx="40" ry="9" fill="#fff" />
        <text x="340" y="155" textAnchor="middle" {...mono} fill={INK}>DATA</text>
      </motion.g>
      <motion.path variants={draw} custom={12} d="M340 170 V200" stroke={TEAL} />
      <motion.g variants={pop} custom={13}>
        <rect x="292" y="200" width="96" height="30" rx="15" fill={MINT} stroke={TEAL} />
        <path d="M308 215 l5 5 l9 -10" stroke={TEAL} strokeWidth={2.5} />
        <text x="354" y="219" textAnchor="middle" {...label}>Live</text>
      </motion.g>
    </Frame>
  );
}

function SoftwareScene() {
  const bars = [40, 58, 34, 66, 50, 72];
  return (
    <Frame title="A purpose-built dashboard with metrics, a chart, records and an approval workflow">
      <motion.rect variants={pop} custom={0} x="20" y="24" width="360" height="232" rx="14" fill="#fff" />
      <motion.g variants={pop} custom={1}>
        <rect x="30" y="34" width="54" height="212" rx="9" fill={INK} stroke="none" />
        {[52, 70, 88, 106].map((y, i) => (
          <rect key={y} x="40" y={y} width="34" height="7" rx="3.5" fill={i === 1 ? TEAL : '#fff'} opacity={i === 1 ? 1 : 0.28} stroke="none" />
        ))}
      </motion.g>
      {[96, 190, 284].map((x, i) => (
        <motion.g key={x} variants={pop} custom={2 + i}>
          <rect x={x} y="36" width="84" height="46" rx="8" fill={PAPER} strokeWidth={1.5} />
          <rect x={x + 10} y="47" width="34" height="6" rx="3" fill="#C9D2CE" stroke="none" />
          <rect x={x + 10} y="61" width={i === 1 ? 50 : 40} height="11" rx="3" fill={i === 2 ? SUN : INK} stroke="none" />
        </motion.g>
      ))}
      <motion.rect variants={pop} custom={5} x="96" y="94" width="176" height="96" rx="8" fill={PAPER} strokeWidth={1.5} />
      {bars.map((height, i) => (
        <motion.rect key={i} variants={grow} custom={6 + i} x={110 + i * 26} y={180 - height} width="14" height={height} rx="3"
          fill={i === bars.length - 1 ? SUN : TEAL} stroke="none" style={{ transformBox: 'fill-box', transformOrigin: 'bottom' }} />
      ))}
      {[202, 218, 234].map((y, i) => (
        <motion.rect key={y} variants={pop} custom={10 + i} x="96" y={y} width="176" height="10" rx="4" fill="#EEF1EF" stroke="none" />
      ))}
      <motion.g variants={pop} custom={8}>
        <rect x="282" y="94" width="92" height="152" rx="8" fill={PAPER} strokeWidth={1.5} />
        <text x="292" y="112" {...mono} fill="#64748B">WORKFLOW</text>
      </motion.g>
      {[
        ['Request', SUN],
        ['Review', TEAL],
        ['Approved', TEAL],
      ].map(([name, color], i) => (
        <motion.g key={name} variants={pop} custom={11 + i}>
          <rect x="290" y={124 + i * 38} width="76" height="28" rx="14" fill="#fff" strokeWidth={1.5} />
          <circle cx="303" cy={138 + i * 38} r="4" fill={color} stroke="none" />
          <text x="312" y={142 + i * 38} {...label} fontSize={10}>{name}</text>
        </motion.g>
      ))}
    </Frame>
  );
}

function AiScene() {
  return (
    <Frame title="Business sources feed retrieval, a model drafts an answer, a person reviews it, and a cited response is produced">
      <motion.g variants={pop} custom={0}>
        <rect x="30" y="78" width="54" height="68" rx="6" fill={PAPER} />
        <rect x="24" y="72" width="54" height="68" rx="6" fill="#fff" />
        <rect x="18" y="66" width="54" height="68" rx="6" fill="#fff" />
        {[80, 92, 104, 116].map((y, i) => <path key={y} d={`M28 ${y} H${i === 3 ? 48 : 62}`} strokeWidth={1.5} />)}
        <text x="48" y="170" textAnchor="middle" {...label}>Sources</text>
      </motion.g>
      <motion.path variants={draw} custom={2} d="M84 106 H112" stroke={TEAL} />
      <motion.g variants={pop} custom={3}>
        <circle cx="140" cy="106" r="27" fill="#fff" />
        <circle cx="136" cy="102" r="9" />
        <path d="M143 109 L152 118" strokeWidth={2.5} />
        <text x="140" y="170" textAnchor="middle" {...label}>Retrieve</text>
      </motion.g>
      <motion.path variants={draw} custom={5} d="M167 106 H196" stroke={TEAL} />
      <motion.g variants={pop} custom={6}>
        <rect x="196" y="76" width="64" height="60" rx="14" fill={INK} />
        {[0, 1, 2].flatMap((row) => [0, 1, 2].map((col) => (
          <circle key={`${row}-${col}`} cx={214 + col * 14} cy={92 + row * 14} r="3" fill={row === 1 && col === 1 ? SUN : TEAL} stroke="none" />
        )))}
        <text x="228" y="170" textAnchor="middle" {...label}>Model</text>
      </motion.g>
      <motion.path variants={draw} custom={8} d="M260 106 H289" stroke={TEAL} />
      <motion.g variants={pop} custom={9}>
        <circle cx="316" cy="106" r="27" fill={SUN} />
        <circle cx="316" cy="98" r="7" fill="#fff" />
        <path d="M303 121 C 306 111, 326 111, 329 121" fill="#fff" />
        <circle cx="336" cy="86" r="9" fill={TEAL} stroke="#fff" />
        <path d="M331.5 86 l3 3 l5 -6" stroke="#fff" strokeWidth={2} />
        <text x="316" y="170" textAnchor="middle" {...label}>Human review</text>
      </motion.g>
      <motion.path variants={draw} custom={11} d="M316 180 C 316 196, 300 200, 290 204" stroke={TEAL} />
      <motion.g variants={pop} custom={12}>
        <rect x="90" y="196" width="200" height="60" rx="14" fill={MINT} stroke={TEAL} />
        <rect x="106" y="210" width="140" height="7" rx="3.5" fill={TEAL} opacity={0.55} stroke="none" />
        <rect x="106" y="223" width="110" height="7" rx="3.5" fill={TEAL} opacity={0.35} stroke="none" />
        <rect x="106" y="236" width="62" height="13" rx="6.5" fill="#fff" stroke={TEAL} strokeWidth={1.2} />
        <text x="137" y="246" textAnchor="middle" {...mono} fontSize={8} fill={TEAL}>SOURCE</text>
      </motion.g>
      <motion.text variants={pop} custom={13} x="190" y="186" textAnchor="middle" {...mono} fill="#64748B">USEFUL OUTPUT</motion.text>
    </Frame>
  );
}

function AutomationScene() {
  const reduce = useReducedMotion();
  return (
    <Frame title="A form submission triggers a workflow that validates, transforms and routes data into a CRM, then notifies the team">
      <motion.g variants={pop} custom={0}>
        <rect x="14" y="90" width="72" height="70" rx="14" fill="#fff" />
        <rect x="26" y="104" width="48" height="8" rx="3" fill={MINT} stroke="none" />
        <rect x="26" y="118" width="48" height="8" rx="3" fill={MINT} stroke="none" />
        <rect x="26" y="134" width="28" height="12" rx="6" fill={TEAL} stroke="none" />
        <text x="50" y="182" textAnchor="middle" {...label}>Form</text>
      </motion.g>
      <motion.path variants={draw} custom={1} d="M86 125 H116" stroke={TEAL} />
      <motion.g variants={pop} custom={2}>
        <rect x="119" y="114" width="22" height="22" rx="4" fill={SUN} transform="rotate(45 130 125)" />
        <text x="130" y="182" textAnchor="middle" {...label}>Trigger</text>
      </motion.g>
      <motion.path variants={draw} custom={3} d="M145 125 H170" stroke={TEAL} />

      {/* A single record travels the pipeline while this scene is on screen. */}
      {!reduce && (
        <motion.circle r="5" cy="125" fill={TEAL} stroke="#fff" strokeWidth={2}
          initial={{ cx: 86, opacity: 0 }}
          animate={{ cx: [86, 130, 230, 349], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 2.4, times: [0, 0.2, 0.6, 1], ease: 'easeInOut', repeat: Infinity, repeatDelay: 1.4, delay: 1.3 }} />
      )}

      <motion.g variants={pop} custom={4}>
        <rect x="170" y="62" width="120" height="126" rx="14" fill={PAPER} strokeDasharray="4 4" strokeWidth={1.5} />
        <text x="180" y="80" {...mono} fill="#64748B">WORKFLOW</text>
      </motion.g>
      {['Validate', 'Transform', 'Route'].map((name, i) => (
        <motion.g key={name} variants={pop} custom={5 + i}>
          <rect x="182" y={90 + i * 30} width="96" height="22" rx="11" fill="#fff" strokeWidth={1.5} />
          <text x="230" y={105 + i * 30} textAnchor="middle" {...label} fontSize={10}>{name}</text>
        </motion.g>
      ))}
      <motion.path variants={draw} custom={8} d="M290 125 H314" stroke={TEAL} />
      <motion.g variants={pop} custom={9}>
        <rect x="314" y="90" width="72" height="70" rx="14" fill={INK} />
        <rect x="326" y="104" width="48" height="8" rx="3" fill="#fff" opacity={0.3} stroke="none" />
        <rect x="326" y="118" width="36" height="8" rx="3" fill="#fff" opacity={0.3} stroke="none" />
        <rect x="326" y="132" width="48" height="14" rx="4" fill={TEAL} stroke="none" />
        <text x="350" y="182" textAnchor="middle" {...label}>CRM</text>
      </motion.g>
      <motion.path variants={draw} custom={10} d="M350 192 V214" stroke={TEAL} />
      <motion.g variants={pop} custom={11}>
        <rect x="286" y="214" width="104" height="30" rx="15" fill={MINT} stroke={TEAL} />
        <path d="M301 234 h12 M303 234 v-6 a4 4 0 0 1 8 0 v6" stroke={TEAL} strokeWidth={1.8} />
        <text x="350" y="233" textAnchor="middle" {...label} fontSize={10}>Notify team</text>
      </motion.g>
    </Frame>
  );
}

export const CAPABILITY_SCENES: Record<ServiceType, () => React.JSX.Element> = {
  'web-dev': ProductScene,
  'software-dev': SoftwareScene,
  'ai-solutions': AiScene,
  automation: AutomationScene,
};

export function CapabilityScene({ id }: { id: ServiceType }) {
  const Scene = CAPABILITY_SCENES[id];
  return <Scene />;
}
