import { ArrowRight, ArrowUpRight } from 'lucide-react';
import type { Project, ScreenType } from '../types';
import { PROJECTS } from '../data/mockData';
import { CAPABILITIES, DELIVERY_STEPS } from '../data/studio';
import v2Preview from '../assets/v2productions/hero.png';

interface Props {
  onNavigate: (screen: ScreenType) => void;
  onOpenProjectDetail: (project: Project) => void;
  onOpenStartProject: () => void;
}

export function StudioHomeSections({ onNavigate, onOpenProjectDetail, onOpenStartProject }: Props) {
  const work = ['v2-productions', 'thaai-clinic-website', 'budget-diet-app'].map(id => PROJECTS.find(project => project.id === id)!);
  return <div className="space-y-16 pb-12 pt-10 lg:space-y-24 lg:pt-16">
    <section aria-label="What we build" className="border-t border-slate-200 pt-8 lg:pt-12">
      <div className="grid gap-6 lg:grid-cols-[.9fr_1.1fr] lg:gap-12">
        <div>
          <p className="text-[10px] font-extrabold uppercase tracking-[.18em] text-[#0F8B75]">Engineering products from idea to scale</p>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight lg:text-4xl">The thinking.<br />The design.<br /><span className="font-serif italic font-normal text-[#0F8B75]">The engineering.</span></h2>
          <p className="mt-5 max-w-sm text-sm leading-7 text-slate-600">We work across product strategy, design and engineering to turn complex requirements into dependable digital products.</p>
          <p className="mt-4 max-w-sm text-sm leading-7 text-slate-600">For businesses, institutions and ambitious teams building a new product or improving how they operate.</p>
        </div>
        <div className="border-t border-slate-200">
          {CAPABILITIES.map((capability, index) => <button key={capability.id} onClick={() => onNavigate(capability.id)} className="group flex w-full gap-4 border-b border-slate-200 py-5 text-left hover:bg-[#E2F1ED]/40">
            <span className="pt-1 font-mono text-xs text-[#0F8B75]">0{index + 1}</span>
            <span className="flex-1"><span className="block text-lg font-extrabold">{capability.title}</span><span className="mt-2 block text-sm leading-6 text-slate-600">{capability.description}</span></span>
            <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-[#0F8B75] transition-transform group-hover:-translate-y-1" />
          </button>)}
        </div>
      </div>
    </section>
    <section aria-label="Selected work">
      <div className="mb-6 flex items-end justify-between gap-4"><h2 className="text-3xl font-extrabold tracking-tight">Selected <span className="font-serif italic font-normal text-[#0F8B75]">work.</span></h2><button onClick={() => onNavigate('projects')} className="text-xs font-bold text-[#0F8B75]">Explore Our Work <span aria-hidden="true">↗</span></button></div>
      <button onClick={() => onOpenProjectDetail(work[0])} id="btn-explore-case-study" className="group grid w-full gap-6 overflow-hidden rounded-3xl bg-[#09121F] p-6 text-left text-white lg:grid-cols-2 lg:items-center lg:p-8">
        <div><p className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">Client work · Creative Studio Platform</p><h3 className="mt-4 text-3xl font-extrabold">V² Productions</h3><p className="mt-4 text-sm leading-7 text-slate-300">A responsive platform connecting video showcases, creative services, course information and enquiries. Designed with distinct mobile and desktop experiences.</p><p className="mt-4 font-mono text-xs text-slate-400">React · TypeScript · Vite · Tailwind CSS</p><span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-emerald-400">Explore Case Study <ArrowRight className="h-4 w-4" /></span></div>
        <img src={v2Preview} alt="V² Productions interface from the delivered platform" loading="lazy" className="max-h-80 w-full rounded-2xl object-contain transition-transform duration-300 group-hover:rotate-1" />
      </button>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">{work.slice(1).map(project => <button key={project.id} onClick={() => onOpenProjectDetail(project)} className="rounded-2xl border border-slate-200 bg-white p-6 text-left transition-colors hover:border-[#0F8B75]">
        <p className="text-[10px] font-extrabold uppercase tracking-widest text-[#0F8B75]">{project.detailData?.engagement}</p><h3 className="mt-3 text-xl font-extrabold">{project.title}</h3><p className="mt-3 text-sm leading-6 text-slate-600">{project.subtitle}</p><span className="mt-5 inline-flex items-center gap-2 text-xs font-bold">Read the case study <ArrowUpRight className="h-4 w-4 text-[#0F8B75]" /></span>
      </button>)}</div>
    </section>
    <section className="grid gap-6 rounded-[2rem] bg-[#E2F1ED] p-6 lg:grid-cols-2 lg:gap-12 lg:p-10">
      <div><p className="text-[10px] font-extrabold uppercase tracking-widest text-[#0F8B75]">Why BuiltbyGSV</p><h2 className="mt-4 text-3xl font-extrabold tracking-tight">Product decisions,<br /><span className="font-serif italic font-normal">grounded in engineering.</span></h2></div>
      <div className="space-y-4 text-sm leading-7 text-slate-700"><p>We connect the user experience to the system behind it. Scope, interface design, data and integrations are considered together so the product can work as a whole.</p><p>AI earns its place through a useful task, a dependable source of data and a way to check the result. We agree on the release boundary and ownership before development starts.</p><span className="block font-handwritten text-xl text-[#0F8B75]">Thoughtful design. Maintainable systems.</span></div>
    </section>
    <section aria-label="How we build"><div className="mb-6 flex flex-wrap items-end justify-between gap-4"><h2 className="text-3xl font-extrabold">How we <span className="font-serif italic font-normal text-[#0F8B75]">build.</span></h2><button onClick={() => onNavigate('process')} className="text-xs font-bold text-[#0F8B75]">Our delivery process ↗</button></div>
      <ol className="grid gap-5 sm:grid-cols-2 xl:grid-cols-5">{DELIVERY_STEPS.map((step, index) => <li key={step.title} className="border-t-2 border-[#F5C748] pt-4"><span className="font-mono text-xs text-[#0F8B75]">0{index + 1}</span><h3 className="mt-3 text-sm font-extrabold">{step.title}</h3><p className="mt-2 text-xs leading-6 text-slate-600">{step.description}</p></li>)}</ol>
    </section>
    <section className="grid gap-6 border-t border-slate-200 pt-8 lg:grid-cols-2"><div><p className="text-[10px] font-extrabold uppercase tracking-widest text-[#0F8B75]">Built for V² Productions</p><p className="mt-4 text-sm leading-7 text-slate-600">Explore the actual screens, responsive architecture and scope delivered in our creative studio case study.</p><button onClick={() => onOpenProjectDetail(work[0])} className="mt-3 text-xs font-bold text-[#0F8B75]">See the implementation ↗</button></div><div><p className="text-[10px] font-extrabold uppercase tracking-widest text-[#0F8B75]">The studio</p><p className="mt-4 text-sm leading-7 text-slate-600">BuiltbyGSV is a Product &amp; AI Engineering Studio. We build useful, dependable software around the people and problems it needs to serve.</p><button onClick={() => onNavigate('about')} className="mt-3 text-xs font-bold text-[#0F8B75]">About BuiltbyGSV ↗</button></div></section>
    <section className="brush-banner-dark flex flex-col gap-6 p-7 text-white sm:flex-row sm:items-center sm:justify-between lg:p-10"><div><h2 className="text-2xl font-extrabold lg:text-3xl">Have something worth building?</h2><p className="mt-3 text-sm text-slate-300">Tell us about the problem and where you want to take it.</p></div><button onClick={onOpenStartProject} className="inline-flex shrink-0 items-center justify-center gap-3 self-start rounded-full bg-[#F5C748] px-5 py-3 text-sm font-extrabold text-[#09121F] sm:self-auto">Start a Project <ArrowRight className="h-4 w-4" /></button></section>

  </div>;
}
