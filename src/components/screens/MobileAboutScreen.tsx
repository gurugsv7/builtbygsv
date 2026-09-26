import { ArrowLeft, ArrowRight, ChevronRight, Menu } from 'lucide-react';
import { BrandLogo } from '../BrandLogo';
import { PRINCIPLES } from '../../data/studio';

interface Props {
  onBack: () => void;
  onOpenMenu: () => void;
  onStartProject: () => void;
}

export function MobileAboutScreen({ onBack, onOpenMenu, onStartProject }: Props) {
  return <main className="mx-auto max-w-xl space-y-5 px-4 pb-6 pt-3 text-[#131921]">
    <header className="flex items-center justify-between">
      <button onClick={onBack} aria-label="Back to home" className="p-1.5"><ArrowLeft className="h-5 w-5" /></button>
      <span className="text-sm font-extrabold">About BuiltbyGSV</span>
      <button onClick={onOpenMenu} aria-label="Open navigation menu" className="p-1.5"><Menu className="h-5 w-5" /></button>
    </header>
    <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-2xs">
      <BrandLogo nameClassName="text-lg" />
      <p className="mt-3 text-[9px] font-extrabold uppercase tracking-widest text-[#0F8B75]">Product &amp; AI Engineering Studio</p>
      <h1 className="mt-4 text-2xl font-extrabold leading-tight tracking-tight">We build technology<br />around <span className="font-serif italic text-[#0F8B75]">the problem.</span></h1>
      <p className="mt-3 text-xs font-medium leading-6 text-slate-600">We design and engineer useful, dependable digital products for businesses, institutions and product teams.</p>
      <div className="mt-4 flex flex-wrap gap-1.5">{['Product design', 'Software', 'AI systems', 'Automation'].map(item => <span key={item} className="rounded-lg bg-[#E2F1ED] px-2 py-1 text-[10px] font-bold text-[#0F8B75]">{item}</span>)}</div>
    </section>
    <section className="space-y-3">
      <h2 className="font-serif text-2xl font-extrabold italic">What guides us.</h2>
      <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white">
        {PRINCIPLES.map((principle, index) => <details key={principle.title} className="group border-b border-slate-100 last:border-0">
          <summary className="flex cursor-pointer list-none items-center gap-3 p-4 text-xs font-extrabold [&::-webkit-details-marker]:hidden"><span className="font-mono text-[#0F8B75]">0{index + 1}</span><span className="flex-1">{principle.title}</span><ChevronRight className="h-4 w-4 text-slate-400 transition-transform group-open:rotate-90" /></summary>
          <p className="px-4 pb-4 text-xs leading-6 text-slate-600">{principle.description}</p>
        </details>)}
      </div>
    </section>
    <a href="/process" className="flex items-center justify-between gap-3 rounded-2xl border border-teal-200/70 bg-[#E2F1ED] p-4"><span><span className="block text-xs font-extrabold">How we build</span><span className="mt-1 block text-[11px] text-slate-600">Understand, design, build, validate and improve.</span></span><ArrowRight className="h-4 w-4 shrink-0 text-[#0F8B75]" /></a>
    <p className="px-1 text-[11px] leading-6 text-slate-500">BuiltbyGSV connects product design and engineering. Based in Puducherry, we work with businesses in Karaikal, Bengaluru, Thanjavur and remotely across India.</p>
    <a href="/careers" className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 text-xs font-extrabold">Careers · Two internship roles<ArrowRight className="h-4 w-4 text-[#0F8B75]" /></a>
    <button onClick={onStartProject} className="brush-banner-dark flex w-full items-center justify-between gap-3 p-5 text-left text-white"><span><span className="block font-handwritten text-xl">Start a Project</span><span className="mt-1 block text-[11px] text-slate-300">Tell us what you’re building.</span></span><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F5C748] text-[#131921]"><ArrowRight className="h-5 w-5" /></span></button>
  </main>;
}
