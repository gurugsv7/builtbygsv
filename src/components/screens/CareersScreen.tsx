import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowLeft, ArrowRight, ArrowUpRight, ChevronDown, Code2, Layers } from 'lucide-react';
import { Reveal, RevealGroup, RevealItem } from '../../motion/primitives';
import { DURATION, EASE } from '../../motion/tokens';
import type { Career } from '../../data/careers';
import { CAREERS, careerEmail, careerPath, getCareerFromPath } from '../../data/careers';
import { brandEntity } from '../../seo';

export function CareersScreen() {
  const role = getCareerFromPath(window.location.pathname);
  return <main className="mx-auto w-full max-w-6xl px-4 pb-8 pt-4 text-[#131921] lg:px-10 lg:pb-16">
    <header className="flex items-center justify-between gap-4"><a href={role ? '/careers' : '/'} className="inline-flex items-center gap-2 py-2 text-xs font-bold text-slate-600"><ArrowLeft className="h-4 w-4" />{role ? 'All opportunities' : 'Home'}</a><span className="rounded-full border border-teal-200 bg-[#E2F1ED] px-3 py-1.5 text-[10px] font-extrabold text-[#0F8B75]">We’re hiring</span></header>
    <section className="grid gap-6 py-7 lg:grid-cols-[1.3fr_.7fr] lg:items-center lg:gap-12 lg:py-16">
      <Reveal><p className="text-[10px] font-extrabold uppercase tracking-[.18em] text-[#0F8B75]">Careers at BuiltbyGSV</p>
        <h1 className="mt-4 text-3xl font-extrabold leading-[1.12] tracking-tight sm:text-4xl lg:text-6xl">{role ? role.title : <>Build with purpose.<br /><span className="font-serif font-normal italic text-[#0F8B75]">Grow through the work.</span></>}</h1>
        <p className="mt-4 max-w-xl text-sm leading-7 text-slate-600">{role ? role.description : 'Join a product and AI engineering studio working across software, web platforms and intelligent systems. We’re looking for curious builders who care about making things work well.'}</p>
        <p className="mt-4 font-handwritten text-lg text-[#0F8B75]">{role ? `${role.duration} internship` : 'Two opportunities. Six months of building.'}</p>
      </Reveal>
      <motion.div aria-hidden="true" initial={{ opacity: 0, rotate: 2 }} animate={{ opacity: 1, rotate: 0 }} transition={{ duration: 0.7, ease: EASE.out, delay: 0.1 }} className="relative hidden rounded-[2rem] border border-teal-200 bg-[#E2F1ED] p-8 lg:block">
        <div className="absolute right-5 top-5 h-14 w-14 rounded-full bg-[#F5C748]" />
        <div className="relative -rotate-3 rounded-2xl border-2 border-[#131921] bg-white p-6 shadow-[6px_7px_0_#131921]"><Code2 className="mb-8 h-8 w-8 text-[#0F8B75]" /><p className="text-lg font-extrabold">Think it through.</p><p className="mt-2 font-serif text-2xl italic text-[#0F8B75]">Build it well.</p><div className="mt-6 flex items-center gap-2 text-xs font-bold"><span className="h-2 w-2 rounded-full bg-[#F5C748]" />BuiltbyGSV / Engineering</div></div>
        <p className="mt-7 text-center font-handwritten text-xl">Details make the difference.</p>
      </motion.div>
    </section>
    {role ? <div className="grid gap-5 lg:grid-cols-[1.25fr_.75fr] lg:gap-10">
      <section className="space-y-7 rounded-2xl border border-slate-200 bg-white p-5 lg:p-8"><div><h2 className="text-lg font-extrabold">Work you could contribute to</h2><ul className="mt-4 space-y-4">{role.contributions.map(item => <li key={item} className="flex gap-3 text-sm leading-7 text-slate-600"><span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#F5C748]" />{item}</li>)}</ul></div><div><h2 className="text-lg font-extrabold">What to bring</h2><p className="mt-3 text-sm leading-7 text-slate-600">{role.interests}</p></div><p className="border-t border-slate-200 pt-5 text-xs leading-6 text-slate-500">The internship duration is six months. Start date, work arrangement and compensation will be confirmed during application discussions.</p></section>
      <aside className="self-start rounded-2xl bg-[#09121F] p-5 text-white lg:sticky lg:top-6 lg:p-7"><p className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-400">Apply for this internship</p><h2 className="mt-4 text-xl font-extrabold">Show us how you build.</h2><p className="mt-3 text-xs leading-6 text-slate-300">Include a short introduction, your resume or profile, relevant work links and availability. Explain what you contributed to a project you share.</p><a href={careerEmail(role)} className="press group mt-5 flex items-center justify-between gap-3 rounded-full bg-[#F5C748] px-5 py-3 text-xs font-extrabold text-[#131921]">Apply by email <ArrowUpRight className="nudge-ur h-4 w-4" /></a><p className="mt-4 break-words text-xs leading-6 text-slate-400">Opens a draft in your email app. You can also write to <a className="text-white underline" href={`mailto:${brandEntity.email}`}>{brandEntity.email}</a> with the role in the subject.</p></aside>
    </div> : <>
      <section aria-labelledby="opportunities"><div className="mb-5 flex items-center justify-between"><h2 id="opportunities" className="text-xl font-extrabold lg:text-3xl">Open internships</h2><span className="font-mono text-xs text-[#0F8B75]">02 roles</span></div>
        <RevealGroup as="ul" className="space-y-4">{CAREERS.map((item, index) => <RevealItem as="li" key={item.id}><RoleRow role={item} index={index} /></RevealItem>)}</RevealGroup>
      </section>
      <section className="mt-8 rounded-2xl bg-[#E2F1ED] p-5 lg:mt-12 lg:p-8"><h2 className="text-lg font-extrabold">A useful application starts with your work.</h2><p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">Share your resume or profile, a project you can explain and when you could start. Tell us what interests you about the role. Open a role above to prepare an application email.</p><a href="/projects" className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-[#0F8B75]">Explore our work <ArrowRight className="h-4 w-4" /></a></section>
    </>}
  </main>;
}

/** A role summary that can open in place to preview the work, before visiting the full role page. */
function RoleRow({ role, index }: { role: Career; index: number }) {
  const [open, setOpen] = useState(false);
  const panelId = `role-preview-${role.id}`;
  return (
    <div className={`rounded-2xl border bg-white transition-colors ${open ? 'border-[#0F8B75]/50' : 'border-slate-200 hover:border-[#0F8B75]/50'}`}>
      <div className="flex items-start gap-4 p-5 lg:items-center lg:p-7">
        <span className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#E2F1ED] text-[#0F8B75] sm:flex">{index === 0 ? <Layers className="h-6 w-6" /> : <Code2 className="h-6 w-6" />}</span>
        <a href={careerPath(role)} className="group min-w-0 flex-1">
          <span className="block text-[10px] font-extrabold uppercase tracking-widest text-[#0F8B75]">{role.focus} · {role.duration}</span>
          <span className="mt-2 flex items-center gap-2 text-lg font-extrabold lg:text-2xl"><span className="u-link">{role.title}</span><ArrowUpRight className="nudge-ur h-5 w-5 shrink-0 text-[#0F8B75]" /></span>
          <span className="mt-2 block max-w-2xl text-xs leading-6 text-slate-600 lg:text-sm">{role.description}</span>
        </a>
        <button type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls={panelId}
          className="flex shrink-0 items-center gap-1.5 rounded-full border border-slate-200 px-3 py-2 text-[11px] font-bold text-slate-700 transition-colors hover:border-[#0F8B75] hover:text-[#0F8B75]">
          <span className="hidden sm:inline">{open ? 'Hide' : 'Preview'}</span>
          <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: DURATION.base, ease: EASE.out }}><ChevronDown className="h-4 w-4" /></motion.span>
          <span className="sr-only">{open ? `Hide ${role.title} details` : `Preview ${role.title} details`}</span>
        </button>
      </div>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div id={panelId} key="panel" initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: DURATION.base, ease: EASE.out }}
            className="grid gap-6 border-t border-slate-100 px-5 pb-6 pt-5 lg:grid-cols-[1.3fr_.7fr] lg:px-7 lg:pl-[5.75rem]">
            <div>
              <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-500">Work you could contribute to</p>
              <ul className="mt-3 space-y-2.5">{role.contributions.map(item => <li key={item} className="flex gap-3 text-sm leading-6 text-slate-700"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#F5C748]" />{item}</li>)}</ul>
            </div>
            <div className="flex flex-col justify-between gap-4 rounded-xl bg-[#F8F9FA] p-4">
              <p className="text-xs leading-6 text-slate-600">{role.interests}</p>
              <a href={careerPath(role)} className="group inline-flex items-center gap-2 text-xs font-extrabold text-[#0F8B75]"><span className="u-link">Read the role &amp; apply</span> <ArrowRight className="nudge-r h-4 w-4" /></a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
