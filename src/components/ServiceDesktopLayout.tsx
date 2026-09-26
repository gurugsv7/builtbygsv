import { useId, useRef, useState, type KeyboardEvent } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowLeft, ArrowRight, Bookmark, type LucideIcon } from 'lucide-react';
import type { ServiceDetail } from '../types';
import { SERVICE_VISUALS } from '../data/serviceVisuals';
import { CAPABILITIES } from '../data/studio';
import { CapabilityScene } from './visuals/CapabilityScenes';
import { ServiceDiagram } from './visuals/ServiceDiagrams';
import { EngagementStrip } from './ServiceEngagement';
import { Reveal, DrawnUnderline } from '../motion/primitives';
import { DURATION, EASE, SPRING } from '../motion/tokens';

interface Props {
  service: ServiceDetail;
  icons: Record<string, LucideIcon>;
  idPrefix: string;
  isBookmarked: boolean;
  onToggleBookmark: (serviceId: string) => void;
  onBack: () => void;
  onStartProject: () => void;
}

/** Desktop service page. The mobile design lives in each service screen. */
export function ServiceDesktopLayout({ service, icons, idPrefix, isBookmarked, onToggleBookmark, onBack, onStartProject }: Props) {
  const visual = SERVICE_VISUALS[service.id];
  const number = CAPABILITIES.findIndex((item) => item.id === service.id) + 1;
  const accent = visual.accent;

  return (
    <main className="mx-auto w-full max-w-[1400px] px-10 pb-16 pt-4 text-[#131921] xl:px-14">
      <header className="flex items-center justify-between py-2">
        <button onClick={onBack} id={`${idPrefix}-back-desktop`} className="group inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-[#131921]">
          <ArrowLeft className="nudge-l h-4 w-4" /> All services
        </button>
        <div className="flex items-center gap-3">
          <button onClick={() => onToggleBookmark(service.id)} aria-pressed={isBookmarked} aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark service'}
            className="rounded-full p-2 text-slate-600 transition-colors hover:bg-slate-200/60">
            <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} style={isBookmarked ? { color: accent } : undefined} />
          </button>
          <button onClick={onStartProject} className="press group flex items-center gap-2.5 rounded-full bg-[#09121F] py-1.5 pl-4 pr-1.5 text-xs font-bold text-white">
            Start a Project
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#10B981] text-slate-950"><ArrowRight className="nudge-r h-3.5 w-3.5" strokeWidth={3} /></span>
          </button>
        </div>
      </header>

      <section className="grid items-center gap-12 py-12 lg:grid-cols-[1fr_1.05fr] xl:py-16">
        <Reveal>
          <p className="font-mono text-[11px] font-bold uppercase tracking-[.18em]" style={{ color: accent }}>Service · 0{number}</p>
          <h1 className="mt-4 text-5xl font-extrabold leading-[1.05] tracking-tight xl:text-6xl">{service.title}</h1>
          <p className="relative mt-4 inline-block font-handwritten text-2xl" style={{ color: accent }}>
            {service.scriptTagline}
            <DrawnUnderline className="-bottom-2 h-3" delay={0.5} />
          </p>
          <p className="mt-7 max-w-lg text-base leading-8 text-slate-600">{service.description}</p>
          <div className="mt-8 flex items-center gap-5">
            <button onClick={onStartProject} id={`${idPrefix}-start-project-desktop`} className="press group inline-flex items-center gap-3 rounded-full py-3 pl-5 pr-2 text-sm font-bold text-white shadow-md" style={{ backgroundColor: accent }}>
              Start a Project
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white" style={{ color: accent }}><ArrowRight className="nudge-r h-4 w-4" strokeWidth={2.6} /></span>
            </button>
            <a href="/process" className="group text-sm font-bold text-[#131921]"><span className="u-link">How we deliver</span> <span aria-hidden="true" className="nudge-ur inline-block">↗</span></a>
          </div>
        </Reveal>
        <Reveal delay={0.1} y={0}>
          <div className="relative overflow-hidden rounded-[2rem] border p-8" style={{ backgroundColor: visual.accentSoft, borderColor: `${accent}33` }}>
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-40 [background-size:18px_18px] [mask-image:linear-gradient(to_bottom,black,transparent_75%)]"
              style={{ backgroundImage: `radial-gradient(${accent} 1px, transparent 1px)` }} />
            <div className="relative mx-auto aspect-[400/280] max-w-[520px]"><CapabilityScene id={service.id} /></div>
          </div>
        </Reveal>
      </section>

      <section aria-labelledby={`${idPrefix}-system`} className="border-t border-slate-200 py-16">
        <Reveal className="mb-12 grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end">
          <div>
            <p className="font-mono text-[11px] font-bold uppercase tracking-[.18em]" style={{ color: accent }}>How it fits together</p>
            <h2 id={`${idPrefix}-system`} className="mt-3 text-3xl font-extrabold tracking-tight xl:text-4xl">{visual.heading}</h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-slate-600">{visual.intro}</p>
        </Reveal>
        <div className="rounded-[2rem] border border-slate-200 bg-white px-8 py-12 xl:px-12">
          <ServiceDiagram visual={visual} variant="desktop" />
        </div>
      </section>

      <FeatureTabs service={service} icons={icons} accent={accent} accentSoft={visual.accentSoft} />

      <Reveal as="section" className="flex flex-wrap items-center gap-x-6 gap-y-3 border-y border-slate-200 py-6">
        <p className="font-mono text-[11px] font-bold uppercase tracking-[.16em] text-slate-500">Tools we commonly use</p>
        <ul className="flex flex-wrap gap-x-5 gap-y-2">
          {service.techStack.map((tech) => <li key={tech} className="text-sm font-bold text-[#131921]">{tech}</li>)}
        </ul>
      </Reveal>

      <div className="py-16"><EngagementStrip /></div>

      <Reveal as="section" className="brush-banner-dark flex items-center justify-between gap-6 p-10 text-white">
        <div>
          <h2 className="text-3xl font-extrabold">Scoping a {service.title.toLowerCase()} project?</h2>
          <p className="mt-3 text-sm text-slate-300">Tell us about the problem. We’ll help shape the right first release.</p>
        </div>
        <button onClick={onStartProject} className="press group inline-flex shrink-0 items-center gap-3 rounded-full bg-[#F5C748] px-5 py-3 text-sm font-extrabold text-[#09121F]">
          Start a Project <ArrowRight className="nudge-r h-4 w-4" />
        </button>
      </Reveal>
    </main>
  );
}

interface FeatureTabsProps { service: ServiceDetail; icons: Record<string, LucideIcon>; accent: string; accentSoft: string }

/** What's included, as an accessible tab set: titles on the left, the detail beside them. */
function FeatureTabs({ service, icons, accent, accentSoft }: FeatureTabsProps) {
  const [selected, setSelected] = useState(0);
  const baseId = useId();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const feature = service.features[selected];
  const Icon = icons[feature.icon];

  const onKey = (event: KeyboardEvent) => {
    const last = service.features.length - 1;
    const next = event.key === 'ArrowDown' || event.key === 'ArrowRight' ? (selected === last ? 0 : selected + 1)
      : event.key === 'ArrowUp' || event.key === 'ArrowLeft' ? (selected === 0 ? last : selected - 1)
      : event.key === 'Home' ? 0 : event.key === 'End' ? last : null;
    if (next === null) return;
    event.preventDefault();
    setSelected(next);
    tabs.current[next]?.focus();
  };

  return (
    <section aria-labelledby={`${baseId}-heading`} className="grid gap-10 pb-16 lg:grid-cols-[.9fr_1.1fr]">
      <Reveal>
        <p className="font-mono text-[11px] font-bold uppercase tracking-[.18em]" style={{ color: accent }}>What’s included</p>
        <h2 id={`${baseId}-heading`} className="mt-3 text-3xl font-extrabold tracking-tight">Built in, not bolted on.</h2>
        <div role="tablist" aria-orientation="vertical" aria-label="Included in this service" className="mt-8 border-t border-slate-200" onKeyDown={onKey}>
          {service.features.map((item, index) => {
            const active = index === selected;
            return (
              <button key={item.id} ref={(node) => { tabs.current[index] = node; }} role="tab" id={`${baseId}-tab-${index}`}
                aria-selected={active} aria-controls={`${baseId}-panel`} tabIndex={active ? 0 : -1}
                onClick={() => setSelected(index)} onMouseEnter={() => setSelected(index)}
                className="relative flex w-full items-center gap-4 border-b border-slate-200 py-4 text-left">
                {active && <motion.span layoutId={`${baseId}-bar`} transition={SPRING.gentle} className="absolute -left-4 top-3 bottom-3 w-1 rounded-full" style={{ backgroundColor: accent }} />}
                <span className="font-mono text-xs" style={{ color: active ? accent : '#94A3B8' }}>0{index + 1}</span>
                <span className={`text-base font-extrabold transition-colors ${active ? 'text-[#131921]' : 'text-slate-500 hover:text-[#131921]'}`}>{item.title}</span>
              </button>
            );
          })}
        </div>
      </Reveal>
      <div role="tabpanel" id={`${baseId}-panel`} aria-labelledby={`${baseId}-tab-${selected}`} className="relative min-h-[300px] self-stretch overflow-hidden rounded-[2rem] p-10" style={{ backgroundColor: accentSoft }}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={feature.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: DURATION.base, ease: EASE.out }}>
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-2xs" style={{ color: accent }}>{Icon ? <Icon className="h-6 w-6" /> : null}</span>
            <h3 className="mt-8 text-2xl font-extrabold tracking-tight">{feature.title}</h3>
            <p className="mt-3 max-w-lg text-base font-semibold leading-7 text-slate-800">{feature.description}</p>
            {feature.details && <p className="mt-4 max-w-lg text-sm leading-7 text-slate-600">{feature.details}</p>}
          </motion.div>
        </AnimatePresence>
        <span aria-hidden="true" className="absolute bottom-6 right-8 font-mono text-6xl font-bold opacity-10" style={{ color: accent }}>0{selected + 1}</span>
      </div>
    </section>
  );
}
