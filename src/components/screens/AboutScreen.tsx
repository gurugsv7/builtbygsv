import { useState } from 'react';
import { motion } from 'motion/react';
import { MobileAboutScreen } from './MobileAboutScreen';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { CAPABILITIES, PRINCIPLES, STUDIO } from '../../data/studio';
import { SCREEN_PATHS } from '../../routes';
import { HeroIllustration } from '../illustrations/HeroIllustration';
import { Reveal, RevealGroup, RevealItem, useSequence } from '../../motion/primitives';
import { EASE } from '../../motion/tokens';

interface AboutScreenProps {
  onBack: () => void;
  onOpenMenu: () => void;
  onStartProject: () => void;
}

export const AboutScreen = ({ onBack, onOpenMenu, onStartProject }: AboutScreenProps) => (
  <>
    <div className="lg:hidden"><MobileAboutScreen onBack={onBack} onOpenMenu={onOpenMenu} onStartProject={onStartProject} /></div>
    <main className="hidden min-h-screen bg-[#F8F9FA] px-12 pb-16 pt-4 text-[#131921] lg:block">
      <header className="mx-auto flex max-w-6xl items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-widest text-[#0F8B75]">About BuiltbyGSV</span>
        <button onClick={onStartProject} className="press group flex items-center gap-3 rounded-full bg-[#09121F] px-5 py-3 text-xs font-bold text-white">Start a Project <ArrowRight className="nudge-r h-4 w-4 text-emerald-400" /></button>
      </header>
      <div className="mx-auto max-w-6xl">
        <section className="grid items-center gap-8 py-16 lg:grid-cols-[1.2fr_.8fr]">
          <Reveal>
            <p className="text-[10px] font-extrabold uppercase tracking-[.16em] text-[#0F8B75]">{STUDIO.positioning}</p>
            <h1 className="mt-5 text-5xl font-extrabold leading-[1.1] tracking-tight">We build technology<br />around <span className="font-serif font-normal italic text-[#0F8B75]">the problem.</span></h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-slate-600">BuiltbyGSV is a product and AI engineering studio focused on designing and building useful, dependable digital products.</p>
            <div className="mt-8 grid max-w-xl grid-cols-[auto_1fr] gap-x-6 gap-y-3 border-t border-slate-200 pt-6 text-sm">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-500">We work with</span>
              <span className="font-semibold text-slate-800">Businesses, institutions and product teams</span>
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-500">We build</span>
              <span className="flex flex-wrap gap-x-4 gap-y-1">
                {CAPABILITIES.map((item) => <a key={item.id} href={SCREEN_PATHS[item.id]} className="u-link font-bold text-[#0F8B75]">{item.title}</a>)}
              </span>
            </div>
            <p className="mt-6 max-w-xl text-sm leading-7 text-slate-600">Product thinking and interface design stay close to the engineering decisions that make a system work.</p>
          </Reveal>
          <Reveal delay={0.15} y={0}><HeroIllustration className="mx-auto w-full max-w-sm" /></Reveal>
        </section>

        <section aria-labelledby="principles-heading" className="border-t border-slate-200 py-16">
          <Reveal className="flex items-end justify-between gap-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#0F8B75]">What we believe</p>
              <h2 id="principles-heading" className="mt-3 text-3xl font-extrabold tracking-tight">Four principles, <span className="font-serif font-normal italic text-[#0F8B75]">one loop.</span></h2>
            </div>
            <p className="max-w-xs text-sm leading-6 text-slate-600">Each principle leads to the next — and what we learn after release sends us back to the problem.</p>
          </Reveal>
          <PrinciplesPath />
        </section>

        <section aria-labelledby="how-heading" className="grid gap-12 rounded-[2rem] bg-[#E2F1ED] p-12 lg:grid-cols-[.85fr_1.15fr]">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-widest text-[#0F8B75]">How we work</p>
            <h2 id="how-heading" className="mt-3 text-3xl font-extrabold tracking-tight">Engineering<br /><span className="font-serif font-normal italic text-[#0F8B75]">with purpose.</span></h2>
            <div className="mt-6 space-y-4 text-sm leading-7 text-slate-700">
              <p>We start by understanding the current workflow. That might mean a customer portal, an internal dashboard, an assistant that searches business documents or an integration that removes repeated data entry.</p>
              <p>We choose technology around the constraints: the data, the people maintaining it and the cost of operating it. Scope, review points and handover are part of the build.</p>
            </div>
            <a href="/process" className="group mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#0F8B75]"><span className="u-link">Our delivery process</span> <ArrowRight className="nudge-r h-4 w-4" /></a>
          </Reveal>
          <ConvergingLanes />
        </section>

        <RevealGroup as="section" className="grid gap-10 py-16 lg:grid-cols-2">
          <RevealItem>
            <h2 className="text-lg font-extrabold">A studio with direct accountability.</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">BuiltbyGSV brings product definition, interface design and engineering into one delivery process. Based in Puducherry, we work with businesses in Karaikal, Bengaluru, Thanjavur and remotely across India.</p>
            <ul className="mt-5 flex flex-wrap gap-2" aria-label="Where we work">
              {['Puducherry', 'Karaikal', 'Bengaluru', 'Thanjavur', 'Remote · India'].map((place, index) => (
                <li key={place} className={`rounded-full px-3 py-1 text-xs font-bold ${index === 0 ? 'bg-[#131921] text-white' : 'border border-slate-200 bg-white text-slate-700'}`}>{place}</li>
              ))}
            </ul>
          </RevealItem>
          <RevealItem>
            <h2 className="text-lg font-extrabold">Clear ownership, from scope to handover.</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">We agree on what the first release needs to do, review progress together and document what is delivered. You retain the source code and accounts needed to operate and develop the product.</p>
            <ol className="mt-5 flex items-center gap-2 text-xs font-bold text-slate-700">
              {['Agree scope', 'Review together', 'Document', 'You own it'].map((item, index) => (
                <li key={item} className="flex items-center gap-2">{index > 0 && <span aria-hidden="true" className="text-[#0F8B75]">→</span>}<span className={index === 3 ? 'rounded-full bg-[#F5C748] px-2.5 py-1 text-[#131921]' : ''}>{item}</span></li>
              ))}
            </ol>
          </RevealItem>
        </RevealGroup>

        <a href="/careers" className="lift group mb-8 flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-6 font-bold">Build your next chapter with BuiltbyGSV. <span className="inline-flex items-center gap-1 text-sm text-[#0F8B75]"><span className="u-link">Explore careers</span> <ArrowUpRight className="nudge-ur h-4 w-4" /></span></a>
        <Reveal as="section" className="brush-banner-dark flex items-center justify-between gap-6 p-10 text-white">
          <div><h2 className="text-2xl font-extrabold">Have something worth building?</h2><p className="mt-3 text-sm text-slate-300">Tell us about what you're building.</p></div>
          <button onClick={onStartProject} className="press group inline-flex items-center gap-3 rounded-full bg-[#F5C748] px-5 py-3 text-sm font-extrabold text-[#131921]">Start a Project <ArrowRight className="nudge-r h-4 w-4" /></button>
        </Reveal>
      </div>
    </main>
  </>
);

/** The four principles as stations on one drawn path, with a return line closing the loop. */
function PrinciplesPath() {
  const { ref, step } = useSequence(PRINCIPLES.length + 1, 0.3, 0.2);
  const [focus, setFocus] = useState<number | null>(null);
  // Node centres in the 400×150 path space; x maps to the four equal columns.
  const ys = [34, 104, 34, 104];
  return (
    <div ref={ref} className="relative mt-12" onMouseLeave={() => setFocus(null)}>
      <svg className="absolute inset-x-0 top-0 h-[150px] w-full overflow-visible" viewBox="0 0 400 150" preserveAspectRatio="none" fill="none" aria-hidden="true">
        <motion.path d="M50 34 C 80 34, 120 104, 150 104 C 180 104, 220 34, 250 34 C 280 34, 320 104, 350 104" stroke="#0F8B75" strokeWidth="2"
          vectorEffect="non-scaling-stroke" initial={{ pathLength: 0 }} animate={{ pathLength: step < 0 ? 0 : Math.min(1, (step + 0.2) / 3) }} transition={{ duration: 0.6, ease: EASE.out }} />
        <motion.path d="M350 104 C 360 150, 330 150, 200 148 C 70 146, 40 150, 50 34" stroke="#F5C748" strokeWidth="2"
          vectorEffect="non-scaling-stroke" initial={{ pathLength: 0 }} animate={{ pathLength: step >= PRINCIPLES.length ? 1 : 0 }} transition={{ duration: 1, ease: EASE.inOut }} />
      </svg>
      <ol className="relative grid grid-cols-4">
        {PRINCIPLES.map((principle, index) => {
          const on = index <= step;
          const dim = focus !== null && focus !== index;
          return (
            <li key={principle.title} className="flex flex-col items-center px-4 text-center" style={{ paddingTop: ys[index] - 20 }}
              onMouseEnter={() => setFocus(index)}>
              <motion.span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 font-mono text-xs font-bold" initial={false}
                animate={{ backgroundColor: on ? '#0F8B75' : '#FFFFFF', borderColor: on ? '#0F8B75' : '#E2E8F0', color: on ? '#FFFFFF' : '#94A3B8', scale: focus === index ? 1.12 : 1 }}>
                0{index + 1}
              </motion.span>
              <motion.div initial={false} animate={{ opacity: !on ? 0.3 : dim ? 0.45 : 1 }} transition={{ duration: 0.3 }}>
                <h3 className="mt-5 text-lg font-extrabold">{principle.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{principle.description}</p>
              </motion.div>
            </li>
          );
        })}
      </ol>
      <motion.p className="mt-8 text-center font-handwritten text-lg text-slate-600" initial={{ opacity: 0 }} animate={{ opacity: step >= PRINCIPLES.length ? 1 : 0 }}>
        …and what we learn becomes the next problem worth solving.
      </motion.p>
    </div>
  );
}

/** Product definition, interface design and engineering run as one delivery process. */
function ConvergingLanes() {
  const { ref, step } = useSequence(3, 0.35, 0.2);
  const lanes = [
    { label: 'Product definition', y: 40, color: '#F5C748' },
    { label: 'Interface design', y: 120, color: '#0F8B75' },
    { label: 'Engineering', y: 200, color: '#131921' },
  ];
  return (
    <div ref={ref} className="relative self-center rounded-3xl bg-white p-8" role="img" aria-label="Product definition, interface design and engineering converge into one delivery process that ends in a documented release">
      <div className="relative h-[240px]">
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 520 240" preserveAspectRatio="none" fill="none" aria-hidden="true">
          {lanes.map((lane) => (
            <motion.path key={lane.label} d={`M150 ${lane.y} C 260 ${lane.y}, 260 120, 340 120`} stroke={lane.color} strokeWidth="3" strokeLinecap="round"
              vectorEffect="non-scaling-stroke" initial={{ pathLength: 0 }} animate={{ pathLength: step >= 0 ? 1 : 0 }} transition={{ duration: 0.8, ease: EASE.out }} />
          ))}
          <motion.path d="M340 120 H410" stroke="#0F8B75" strokeWidth="5" strokeLinecap="round" vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0 }} animate={{ pathLength: step >= 1 ? 1 : 0 }} transition={{ duration: 0.5, ease: EASE.out }} />
        </svg>
        {lanes.map((lane, index) => (
          <motion.span key={lane.label} className="absolute left-0 flex -translate-y-1/2 items-center gap-2 text-xs font-extrabold" style={{ top: lane.y }}
            initial={{ opacity: 0, x: -8 }} animate={step >= 0 ? { opacity: 1, x: 0 } : {}} transition={{ delay: index * 0.08 }}>
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: lane.color }} />{lane.label}
          </motion.span>
        ))}
        <motion.span className="absolute right-0 top-1/2 flex -translate-y-1/2 flex-col items-end text-right" initial={{ opacity: 0, x: 8 }} animate={step >= 2 ? { opacity: 1, x: 0 } : {}}>
          <span className="rounded-2xl bg-[#131921] px-3 py-2 text-xs font-extrabold text-white">One delivery<br />process</span>
          <span className="mt-2 font-mono text-[10px] font-bold uppercase tracking-wider text-[#0F8B75]">→ Documented release</span>
        </motion.span>
      </div>
    </div>
  );
}
