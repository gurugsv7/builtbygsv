import { MobileAboutScreen } from './MobileAboutScreen';
import { ArrowLeft, ArrowRight, Menu } from 'lucide-react';
import { PRINCIPLES, STUDIO } from '../../data/studio';
import { HeroIllustration } from '../illustrations/HeroIllustration';

interface AboutScreenProps {
  onBack: () => void;
  onOpenMenu: () => void;
  onStartProject: () => void;
}

export const AboutScreen = ({ onBack, onOpenMenu, onStartProject }: AboutScreenProps) => (
  <>
  <div className="lg:hidden"><MobileAboutScreen onBack={onBack} onOpenMenu={onOpenMenu} onStartProject={onStartProject} /></div>
  <main className="hidden lg:block min-h-screen bg-[#F8F9FA] px-5 pb-16 pt-4 text-[#131921] lg:px-12">
    <header className="mx-auto flex max-w-6xl items-center justify-between">
      <button onClick={onBack} aria-label="Back to home" className="p-2 lg:hidden"><ArrowLeft className="h-5 w-5" /></button>
      <span className="hidden text-xs font-bold uppercase tracking-widest text-[#0F8B75] lg:block">About BuiltbyGSV</span>
      <button onClick={onOpenMenu} aria-label="Open navigation menu" className="p-2 lg:hidden"><Menu className="h-5 w-5" /></button>
      <button onClick={onStartProject} className="hidden items-center gap-3 rounded-full bg-[#09121F] px-5 py-3 text-xs font-bold text-white lg:flex">Start a Project <ArrowRight className="h-4 w-4 text-emerald-400" /></button>
    </header>
    <div className="mx-auto max-w-6xl">
      <section className="grid gap-8 py-10 lg:grid-cols-[1.2fr_.8fr] lg:items-center lg:py-16">
        <div><p className="text-[10px] font-extrabold uppercase tracking-[.16em] text-[#0F8B75]">{STUDIO.positioning}</p>
          <h1 className="mt-5 text-4xl font-extrabold leading-[1.12] tracking-tight lg:text-5xl">We build technology<br />around <span className="font-serif italic font-normal text-[#0F8B75]">the problem.</span></h1>
          <p className="mt-6 max-w-xl text-sm leading-7 text-slate-600">BuiltbyGSV is a product and AI engineering studio focused on designing and building useful, dependable digital products.</p>
          <p className="mt-4 max-w-xl text-sm leading-7 text-slate-600">We work with businesses, institutions and product teams on web platforms, custom software, AI systems and automation. Product thinking and interface design stay close to the engineering decisions that make a system work.</p>
        </div>
        <HeroIllustration className="mx-auto w-full max-w-xs lg:max-w-sm" />
      </section>
      <section className="border-t border-slate-200 py-10">
        <p className="text-xs font-bold uppercase tracking-widest text-[#0F8B75]">Our principles</p>
        <div className="mt-5 grid gap-x-12 md:grid-cols-2">{PRINCIPLES.map((principle, index) => <article key={principle.title} className="border-b border-slate-200 py-6"><span className="font-mono text-xs text-[#0F8B75]">0{index + 1}</span><h2 className="mt-3 text-xl font-extrabold">{principle.title}</h2><p className="mt-3 text-sm leading-7 text-slate-600">{principle.description}</p></article>)}</div>
      </section>
      <section className="grid gap-8 rounded-3xl bg-[#E2F1ED] p-6 lg:grid-cols-2 lg:p-10"><h2 className="text-3xl font-extrabold tracking-tight">Engineering<br /><span className="font-serif italic font-normal text-[#0F8B75]">with purpose.</span></h2><div className="space-y-4 text-sm leading-7 text-slate-700"><p>We start by understanding the current workflow. That might mean a customer portal, an internal dashboard, an assistant that searches business documents or an integration that removes repeated data entry.</p><p>We choose technology around the constraints: the data, the people maintaining it and the cost of operating it. Scope, review points and handover are part of the build.</p><a href="/process" className="inline-flex items-center gap-2 font-bold text-[#0F8B75]">Our delivery process <ArrowRight className="h-4 w-4" /></a></div></section>
      <section className="grid gap-6 py-12 lg:grid-cols-2"><div><h2 className="text-lg font-extrabold">A studio with direct accountability.</h2><p className="mt-3 text-sm leading-7 text-slate-600">BuiltbyGSV brings product definition, interface design and engineering into one delivery process. Based in Puducherry, we work with businesses in Karaikal, Bengaluru, Thanjavur and remotely across India.</p></div><div><h2 className="text-lg font-extrabold">Clear ownership, from scope to handover.</h2><p className="mt-3 text-sm leading-7 text-slate-600">We agree on what the first release needs to do, review progress together and document what is delivered. You retain the source code and accounts needed to operate and develop the product.</p></div></section>
      <a href="/careers" className="mb-8 flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-6 font-bold">Build your next chapter with BuiltbyGSV. <span className="text-sm text-[#0F8B75]">Explore careers ↗</span></a>
      <section className="brush-banner-dark p-7 text-white lg:p-10"><h2 className="text-2xl font-extrabold">Have something worth building?</h2><p className="mt-3 text-sm text-slate-300">Tell us about what you're building.</p><button onClick={onStartProject} className="mt-6 inline-flex items-center gap-3 rounded-full bg-[#F5C748] px-5 py-3 text-sm font-extrabold text-[#131921]">Start a Project <ArrowRight className="h-4 w-4" /></button></section>
    </div>
  </main>
  </>
);
