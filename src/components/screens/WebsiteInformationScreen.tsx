import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { brandEntity } from '../../seo';

import { WEBSITE_INFORMATION } from '../../data/websiteInformation';

export function WebsiteInformationScreen() {
  return <main className="mx-auto w-full max-w-5xl px-4 py-5 text-[#131921] lg:px-10 lg:py-10">
    <a href="/" className="inline-flex items-center gap-2 text-xs font-bold text-slate-600"><ArrowLeft className="h-4 w-4" />Home</a>
    <p className="mt-8 text-[10px] font-extrabold uppercase tracking-widest text-[#0F8B75]">BuiltbyGSV / Website information</p>
    <h1 className="mt-4 text-3xl font-extrabold tracking-tight lg:text-5xl">Using this website.<br /><span className="font-serif font-normal italic text-[#0F8B75]">Contacting our studio.</span></h1>
    <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-600">How project briefs, applications and external links work on this site, and where to raise a question.</p>
    <div className="my-8 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white px-5 lg:px-8">{WEBSITE_INFORMATION.map(section => <section key={section.title} className="py-6"><h2 className="text-base font-extrabold">{section.title}</h2><p className="mt-3 text-sm leading-7 text-slate-600">{section.text}</p></section>)}</div>
    <a href={`mailto:${brandEntity.email}`} className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#09121F] px-5 py-3 text-sm font-bold text-white">{brandEntity.email}<ArrowUpRight className="h-4 w-4 text-emerald-400" /></a>
  </main>;
}
