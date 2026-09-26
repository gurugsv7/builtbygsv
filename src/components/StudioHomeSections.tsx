import { ArrowRight, ArrowUpRight, Check } from 'lucide-react';
import { motion } from 'motion/react';
import type { Project, ScreenType } from '../types';
import { PROJECTS } from '../data/mockData';
import { WORK_SUMMARIES } from '../data/studio';
import v2Preview from '../assets/v2productions/hero.png';
import { CapabilityExplorer } from './visuals/CapabilityExplorer';
import { ProcessRail } from './visuals/ProcessRail';
import { Reveal, RevealGroup, RevealItem, useSequence } from '../motion/primitives';
import { EASE } from '../motion/tokens';

interface Props {
  onNavigate: (screen: ScreenType) => void;
  onOpenProjectDetail: (project: Project) => void;
  onOpenStartProject: () => void;
}

function Eyebrow({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return <p className={`text-[10px] font-extrabold uppercase tracking-[.18em] ${dark ? 'text-emerald-400' : 'text-[#0F8B75]'}`}>{children}</p>;
}

function SummaryRows({ id, dark = false }: { id: string; dark?: boolean }) {
  const summary = WORK_SUMMARIES[id];
  if (!summary) return null;
  const rows = [['Problem', summary.problem], ['Built', summary.built]] as const;
  return (
    <dl className={`divide-y ${dark ? 'divide-white/10 border-y border-white/10' : 'divide-slate-200 border-y border-slate-200'}`}>
      {rows.map(([term, text]) => (
        <div key={term} className="grid grid-cols-[4.5rem_1fr] gap-3 py-3">
          <dt className={`pt-0.5 font-mono text-[10px] font-bold uppercase tracking-wider ${dark ? 'text-emerald-400' : 'text-[#0F8B75]'}`}>{term}</dt>
          <dd className={`text-sm leading-6 ${dark ? 'text-slate-200' : 'text-slate-700'}`}>{text}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Interface concerns and system concerns converge on one product decision. */
function ProductSystemDiagram() {
  const { ref, step } = useSequence(3, 0.35, 0.15);
  const left = ['Interface', 'User journeys', 'Content'];
  const right = ['Data', 'Integrations', 'AI, where useful'];
  const chip = 'rounded-full border border-[#0F8B75]/25 bg-white px-3 py-1.5 text-xs font-bold text-[#131921] shadow-2xs';
  return (
    <div ref={ref} className="relative grid grid-cols-[1fr_auto_1fr] items-center gap-3" aria-label="Interface design and system engineering are considered together to reach one product decision" role="img">
      <div className="space-y-2 text-right">
        <p className="mb-3 font-mono text-[10px] font-bold uppercase tracking-wider text-slate-500">What people use</p>
        {left.map((item, i) => (
          <motion.div key={item} className="flex justify-end" initial={{ opacity: 0, x: -10 }} animate={step >= 0 ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.45, ease: EASE.out, delay: i * 0.08 }}>
            <span className={chip}>{item}</span>
          </motion.div>
        ))}
      </div>
      <div className="relative flex h-44 w-40 items-center justify-center">
        <svg className="absolute inset-0 h-full w-full overflow-visible" viewBox="0 0 160 176" fill="none" aria-hidden="true">
          {[34, 88, 142].map((y) => (
            <g key={y}>
              <motion.path d={`M0 ${y} C 40 ${y}, 45 88, 62 88`} stroke="#0F8B75" strokeWidth="1.6"
                initial={{ pathLength: 0 }} animate={{ pathLength: step >= 1 ? 1 : 0 }} transition={{ duration: 0.6, ease: EASE.out }} />
              <motion.path d={`M160 ${y} C 120 ${y}, 115 88, 98 88`} stroke="#0F8B75" strokeWidth="1.6"
                initial={{ pathLength: 0 }} animate={{ pathLength: step >= 1 ? 1 : 0 }} transition={{ duration: 0.6, ease: EASE.out }} />
            </g>
          ))}
        </svg>
        <motion.div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full bg-[#131921] p-2 text-center text-[10px] font-extrabold leading-tight text-white shadow-lg"
          initial={{ scale: 0.6, opacity: 0 }} animate={step >= 2 ? { scale: 1, opacity: 1 } : {}} transition={{ type: 'spring', stiffness: 300, damping: 22 }}>
          One product decision
        </motion.div>
      </div>
      <div className="space-y-2">
        <p className="mb-3 font-mono text-[10px] font-bold uppercase tracking-wider text-slate-500">What makes it work</p>
        {right.map((item, i) => (
          <motion.div key={item} initial={{ opacity: 0, x: 10 }} animate={step >= 0 ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.45, ease: EASE.out, delay: i * 0.08 }}>
            <span className={chip}>{item}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function StudioHomeSections({ onNavigate, onOpenProjectDetail, onOpenStartProject }: Props) {
  const work = ['v2-productions', 'thaai-clinic-website', 'budget-diet-app'].map(id => PROJECTS.find(project => project.id === id)!);
  const [featured, ...others] = work;
  return <div className="space-y-20 pb-12 pt-10 lg:space-y-28 lg:pt-16">
    <section aria-labelledby="home-capabilities" className="border-t border-slate-200 pt-10 lg:pt-14">
      <div className="mb-10 grid gap-6 lg:grid-cols-[.95fr_1.05fr] lg:items-end xl:gap-14">
        <Reveal>
          <Eyebrow>Engineering products from idea to scale</Eyebrow>
          <h2 id="home-capabilities" className="mt-4 text-3xl font-extrabold tracking-tight lg:text-4xl">The thinking.<br />The design.<br /><span className="font-serif font-normal italic text-[#0F8B75]">The engineering.</span></h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="max-w-md text-sm leading-7 text-slate-600">We work across product strategy, design and engineering to turn complex requirements into dependable digital products — for businesses, institutions and ambitious teams building something new or improving how they operate.</p>
        </Reveal>
      </div>
      <Reveal delay={0.15}><CapabilityExplorer onNavigate={onNavigate} /></Reveal>
    </section>

    <section aria-labelledby="home-work">
      <Reveal className="mb-8 flex items-end justify-between gap-4">
        <div><Eyebrow>Evidence, not decoration</Eyebrow><h2 id="home-work" className="mt-3 text-3xl font-extrabold tracking-tight">Selected <span className="font-serif font-normal italic text-[#0F8B75]">work.</span></h2></div>
        <button onClick={() => onNavigate('projects')} className="group inline-flex items-center gap-1 text-xs font-bold text-[#0F8B75]"><span className="u-link">Explore Our Work</span> <ArrowUpRight className="nudge-ur h-3.5 w-3.5" /></button>
      </Reveal>
      <Reveal>
        <button onClick={() => onOpenProjectDetail(featured)} id="btn-explore-case-study" className="group grid w-full gap-8 overflow-hidden rounded-[2rem] bg-[#09121F] p-7 text-left text-white lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:p-10">
          <div>
            <Eyebrow dark>Client work · Creative Studio Platform</Eyebrow>
            <h3 className="mt-4 text-4xl font-extrabold tracking-tight">V² Productions</h3>
            <div className="mt-6"><SummaryRows id={featured.id} dark /></div>
            <p className="mt-5 font-mono text-xs text-slate-400">React · TypeScript · Vite · Tailwind CSS</p>
            <span className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-emerald-400"><span className="u-link">Explore Case Study</span> <ArrowRight className="nudge-r h-4 w-4" /></span>
          </div>
          <div className="relative">
            <div aria-hidden="true" className="absolute -inset-4 rounded-[2rem] bg-[radial-gradient(#10B981_1px,transparent_1px)] [background-size:16px_16px] opacity-20" />
            <div className="zoom-frame relative rounded-2xl">
              <img src={v2Preview} alt="V² Productions interface from the delivered platform" loading="lazy" className="max-h-96 w-full object-contain" />
            </div>
          </div>
        </button>
      </Reveal>
      <RevealGroup className="mt-5 grid gap-5 sm:grid-cols-2">
        {others.map(project => (
          <RevealItem key={project.id}>
            <button onClick={() => onOpenProjectDetail(project)} className="lift group flex h-full w-full flex-col rounded-[1.75rem] border border-slate-200 bg-white p-7 text-left hover:border-[#0F8B75]/60">
              <div className="flex items-center justify-between gap-3">
                <Eyebrow>{project.detailData?.engagement}</Eyebrow>
                <span className="rounded-full border border-slate-200 px-2.5 py-1 text-[10px] font-bold text-slate-500">{project.status}</span>
              </div>
              <h3 className="mt-4 text-2xl font-extrabold tracking-tight">{project.title}</h3>
              <div className="mt-5 flex-1"><SummaryRows id={project.id} /></div>
              <div className="mt-5 flex items-center justify-between">
                <span className="font-mono text-[11px] text-slate-500">{project.tags.slice(0, 3).join(' · ')}</span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E2F1ED] text-[#0F8B75] transition-colors group-hover:bg-[#0F8B75] group-hover:text-white"><ArrowUpRight className="nudge-ur h-4 w-4" /></span>
              </div>
            </button>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>

    <section aria-labelledby="home-why" className="grid gap-10 rounded-[2rem] bg-[#E2F1ED] p-7 lg:grid-cols-[.8fr_1.2fr] lg:gap-12 lg:p-12">
      <Reveal>
        <Eyebrow>Why BuiltbyGSV</Eyebrow>
        <h2 id="home-why" className="mt-4 text-3xl font-extrabold tracking-tight">Product decisions,<br /><span className="font-serif font-normal italic">grounded in engineering.</span></h2>
        <p className="mt-5 max-w-sm text-sm leading-7 text-slate-700">We connect the user experience to the system behind it, so scope, interface design, data and integrations are considered together and the product works as a whole.</p>
        <span className="mt-6 block font-handwritten text-xl text-[#0F8B75]">Thoughtful design. Maintainable systems.</span>
      </Reveal>
      <div className="space-y-8">
        <ProductSystemDiagram />
        <RevealGroup className="grid gap-4 border-t border-[#0F8B75]/15 pt-6 sm:grid-cols-2">
          <RevealItem>
            <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#0F8B75]">AI earns its place with</p>
            <ul className="mt-3 space-y-2 text-sm font-semibold text-slate-800">
              {['A useful task', 'A dependable source of data', 'A way to check the result'].map(item => (
                <li key={item} className="flex items-center gap-2.5"><span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#0F8B75] text-white"><Check className="h-3 w-3" strokeWidth={3} /></span>{item}</li>
              ))}
            </ul>
          </RevealItem>
          <RevealItem>
            <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#0F8B75]">Agreed before development</p>
            <ul className="mt-3 space-y-2 text-sm font-semibold text-slate-800">
              {['The release boundary', 'Ownership of code and accounts'].map(item => (
                <li key={item} className="flex items-center gap-2.5"><span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#F5C748] text-[#131921]"><Check className="h-3 w-3" strokeWidth={3} /></span>{item}</li>
              ))}
            </ul>
          </RevealItem>
        </RevealGroup>
      </div>
    </section>

    <section aria-labelledby="home-process">
      <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-4">
        <div><Eyebrow>From scope to release</Eyebrow><h2 id="home-process" className="mt-3 text-3xl font-extrabold">How we <span className="font-serif font-normal italic text-[#0F8B75]">build.</span></h2></div>
        <button onClick={() => onNavigate('process')} className="group inline-flex items-center gap-1 text-xs font-bold text-[#0F8B75]"><span className="u-link">Our delivery process</span> <ArrowUpRight className="nudge-ur h-3.5 w-3.5" /></button>
      </Reveal>
      <ProcessRail />
    </section>

    <RevealGroup as="section" className="grid gap-4 border-t border-slate-200 pt-8 lg:grid-cols-2">
      {[
        { eyebrow: 'Built for V² Productions', text: 'Explore the actual screens, responsive architecture and scope delivered in our creative studio case study.', cta: 'See the implementation', go: () => onOpenProjectDetail(featured) },
        { eyebrow: 'The studio', text: 'BuiltbyGSV is a Product & AI Engineering Studio. We build useful, dependable software around the people and problems it needs to serve.', cta: 'About BuiltbyGSV', go: () => onNavigate('about') },
      ].map(item => (
        <RevealItem key={item.eyebrow}>
          <button onClick={item.go} className="group flex h-full w-full items-start justify-between gap-6 rounded-2xl p-5 text-left transition-colors hover:bg-white">
            <span><Eyebrow>{item.eyebrow}</Eyebrow><span className="mt-3 block text-sm leading-7 text-slate-600">{item.text}</span><span className="u-link mt-3 inline-block text-xs font-bold text-[#0F8B75]">{item.cta}</span></span>
            <ArrowUpRight className="nudge-ur mt-1 h-5 w-5 shrink-0 text-[#0F8B75]" />
          </button>
        </RevealItem>
      ))}
    </RevealGroup>

    <Reveal as="section" className="brush-banner-dark flex flex-col gap-6 p-7 text-white sm:flex-row sm:items-center sm:justify-between lg:p-10">
      <div><h2 className="text-2xl font-extrabold lg:text-3xl">Have something worth building?</h2><p className="mt-3 text-sm text-slate-300">Tell us about the problem and where you want to take it.</p></div>
      <button onClick={onOpenStartProject} className="press group inline-flex shrink-0 items-center justify-center gap-3 self-start rounded-full bg-[#F5C748] px-5 py-3 text-sm font-extrabold text-[#09121F] sm:self-auto">Start a Project <ArrowRight className="nudge-r h-4 w-4" /></button>
    </Reveal>
  </div>;
}
