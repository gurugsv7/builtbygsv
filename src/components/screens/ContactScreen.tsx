import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  Github,
  Linkedin,
  Mail,
  MessageCircle,
  Phone,
  Send,
} from 'lucide-react';
import { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronRight, FileText } from 'lucide-react';
import { brandEntity } from '../../seo';
import { groupVariants, itemVariants } from '../../motion/primitives';
import { EASE } from '../../motion/tokens';

interface ContactScreenProps {
  onBack: () => void;
  onStartProject: () => void;
}

const phoneHref = `tel:${brandEntity.phone.replace(/[^+\d]/g, '')}`;
const whatsappHref = `https://wa.me/${brandEntity.phone.replace(/\D/g, '')}`;

const FIRST_MESSAGE = ['The problem you need to solve', 'Who will use the product', 'What you use today', 'Any fixed launch date'];

export const ContactScreen = (props: ContactScreenProps) => (
  <>
    <div className="lg:hidden"><MobileContact {...props} /></div>
    <div className="hidden lg:block"><DesktopContact {...props} /></div>
  </>
);

/** Mobile contact: an app-style screen built around one-tap ways to reach the studio. */
function MobileContact({ onBack, onStartProject }: ContactScreenProps) {
  const [ticked, setTicked] = useState<string[]>([]);
  const toggle = (item: string) => setTicked((list) => (list.includes(item) ? list.filter((entry) => entry !== item) : [...list, item]));
  const channels = [
    { href: `mailto:${brandEntity.email}`, label: 'Email', icon: Mail, tone: 'bg-[#E2F1ED] text-[#0F8B75]', external: false },
    { href: phoneHref, label: 'Call', icon: Phone, tone: 'bg-[#FDF1E7] text-[#E85D22]', external: false },
    { href: whatsappHref, label: 'WhatsApp', icon: MessageCircle, tone: 'bg-emerald-50 text-emerald-600', external: true },
  ];

  return (
    <main className="mx-auto max-w-xl space-y-5 px-4 pb-6 pt-3 text-[#131921]">
      <header className="flex items-center justify-between">
        <button type="button" onClick={onBack} aria-label="Back" className="rounded-full p-1.5 text-slate-700 hover:bg-slate-200/60"><ArrowLeft className="h-5 w-5" /></button>
        <span className="text-sm font-extrabold">Contact</span>
        <span className="w-8" aria-hidden="true" />
      </header>

      <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE.out }}>
        <p className="text-[9px] font-extrabold uppercase tracking-widest text-[#0F8B75]">Product enquiries</p>
        <h1 className="mt-2 text-2xl font-extrabold leading-tight tracking-tight">
          Bring the problem.<br />
          <span className="relative inline-block font-serif font-normal italic text-[#0F8B75]">
            We&apos;ll shape the build.
            <svg aria-hidden="true" className="absolute -bottom-1.5 left-0 h-2 w-full overflow-visible text-[#F5C748]" viewBox="0 0 200 8" fill="none">
              <motion.path d="M2 5 C 60 1, 140 8, 198 3" stroke="currentColor" strokeWidth="3" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 0.3, ease: EASE.out }} />
            </svg>
          </span>
        </h1>
        <p className="mt-3 text-xs font-medium leading-6 text-slate-600">Share what is slowing your team down, who the product needs to help and what already exists. We&apos;ll help define a sensible first version.</p>
      </motion.section>

      <motion.ul className="grid grid-cols-3 gap-2.5" aria-label="Contact options" initial="hidden" animate="shown" variants={groupVariants}>
        {channels.map(({ href, label, icon: Icon, tone, external }) => (
          <motion.li key={label} variants={itemVariants}>
            <a href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="flex flex-col items-center gap-2 rounded-2xl border border-slate-200/90 bg-white px-2 py-3.5 shadow-2xs transition-transform active:scale-95">
              <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${tone}`}><Icon className="h-5 w-5" /></span>
              <span className="text-[11px] font-extrabold">{label}</span>
            </a>
          </motion.li>
        ))}
      </motion.ul>
      <p className="-mt-2 text-center text-[10px] font-semibold text-slate-500">{brandEntity.email} · {brandEntity.phone}</p>

      <button type="button" onClick={onStartProject} id="btn-contact-start-project"
        className="relative w-full overflow-hidden rounded-3xl bg-[#101A19] p-5 text-left text-white shadow-lg transition-transform active:scale-[0.99]">
        <span aria-hidden="true" className="absolute -right-10 -top-12 h-36 w-36 rounded-full border-[26px] border-[#174B40]" />
        <span className="relative flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-widest text-emerald-400"><FileText className="h-3.5 w-3.5" /> Guided project brief</span>
        <span className="relative mt-2 block text-lg font-extrabold leading-snug">Start with a short brief.</span>
        <span className="relative mt-4 flex items-center gap-1.5 text-[10px] font-bold text-slate-300" aria-hidden="true">
          {['Answer', 'Review', 'Send by email'].map((step, index) => (
            <span key={step} className="flex items-center gap-1.5">
              {index > 0 && <span className="h-px w-3 bg-emerald-400/60" />}
              <span className="rounded-full border border-white/15 px-2 py-1">{step}</span>
            </span>
          ))}
        </span>
        <span className="relative mt-4 flex items-center justify-between gap-3">
          <span className="text-[11px] leading-5 text-slate-400">You stay in control of what gets sent.</span>
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F5C748] text-[#131921]"><ArrowUpRight className="h-5 w-5" /></span>
        </span>
      </button>

      <section className="rounded-2xl border border-slate-200/80 bg-[#F2EFE4] p-4" aria-labelledby="first-message">
        <div className="flex items-baseline justify-between">
          <h2 id="first-message" className="font-handwritten text-xl font-bold text-[#E85D22]">Before you write</h2>
          <span className="font-mono text-[10px] font-bold text-slate-500">{ticked.length}/4 ready</span>
        </div>
        <p className="text-[11px] text-slate-600">Four details are enough to begin. Tick off what you know.</p>
        <ul className="mt-3 space-y-2">
          {FIRST_MESSAGE.map((item) => {
            const on = ticked.includes(item);
            return (
              <li key={item}>
                <button type="button" onClick={() => toggle(item)} aria-pressed={on}
                  className={`flex w-full items-center gap-2.5 rounded-xl p-2.5 text-left text-xs font-semibold transition-colors ${on ? 'bg-white text-[#131921]' : 'bg-white/60 text-slate-600'}`}>
                  <motion.span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2" initial={false}
                    animate={{ backgroundColor: on ? '#0F8B75' : '#FFFFFF', borderColor: on ? '#0F8B75' : '#CBD5E1', scale: on ? [1, 1.15, 1] : 1 }} transition={{ duration: 0.25 }}>
                    {on && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
                  </motion.span>
                  {item}
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white">
        <a href="/careers" className="flex items-center justify-between gap-3 border-b border-slate-100 p-4 text-xs font-extrabold">
          <span>Careers<span className="mt-0.5 block text-[11px] font-medium text-slate-500">Two six-month engineering internships. View roles and apply.</span></span>
          <ChevronRight className="h-4 w-4 shrink-0 text-slate-400" />
        </a>
        <a href={`mailto:${brandEntity.email}?subject=BuiltbyGSV%20business%20enquiry`} className="flex items-center justify-between gap-3 p-4 text-xs font-extrabold">
          <span>General &amp; business enquiries<span className="mt-0.5 block text-[11px] font-medium text-slate-500">For collaboration, existing projects or other questions.</span></span>
          <ChevronRight className="h-4 w-4 shrink-0 text-slate-400" />
        </a>
      </div>

      <div className="flex items-center justify-center gap-5 text-[11px] font-bold text-slate-500">
        <a href={brandEntity.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5"><Linkedin className="h-4 w-4" /> LinkedIn</a>
        <a href={brandEntity.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5"><Github className="h-4 w-4" /> GitHub</a>
      </div>
    </main>
  );
}

const DesktopContact = ({ onBack, onStartProject }: ContactScreenProps) => (
  <main className="min-h-screen bg-[#F8F9FA] px-4 pb-28 pt-4 text-[#131921] sm:px-6 lg:px-10 lg:pb-16 lg:pt-8">
    <div className="mx-auto max-w-6xl">
      <header className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-extrabold text-slate-700 transition hover:border-slate-400"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
        <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.12em] text-emerald-700">
          Product enquiries
        </span>
      </header>

      <section className="grid gap-10 py-12 lg:grid-cols-[1.1fr_.9fr] lg:items-end lg:py-20">
        <div>
          <p className="font-mono text-xs font-extrabold uppercase tracking-[0.2em] text-[#0F8B75]">Contact BuiltbyGSV</p>
          <h1 className="mt-5 max-w-4xl text-5xl font-black leading-[0.98] tracking-[-0.05em] sm:text-6xl lg:text-8xl">
            Bring the problem.<br />
            <span className="relative text-[#0F8B75]">
              We&apos;ll shape the build.
              <svg aria-hidden="true" className="absolute -bottom-3 left-0 h-3 w-full text-[#F5C748]" viewBox="0 0 520 16" fill="none">
                <path d="M4 10C128 2 330 15 516 6" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
              </svg>
            </span>
          </h1>
        </div>
        <p className="max-w-xl text-base font-medium leading-8 text-slate-600 lg:pb-2">
          Share what is slowing your team down, who the product needs to help and what already exists. We'll review your requirements and help define a sensible first version.
        </p>
      </section>

      <section className="grid gap-5 lg:grid-cols-[1.15fr_.85fr]" aria-label="Contact options">
        <div className="relative overflow-hidden rounded-[2rem] bg-[#101A19] p-7 text-white sm:p-10">
          <div aria-hidden="true" className="absolute -right-16 -top-20 h-64 w-64 rounded-full border-[42px] border-[#174B40]" />
          <div className="relative z-10 max-w-xl">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-400 text-[#101A19]">
              <Send className="h-5 w-5" />
            </div>
            <h2 className="mt-8 text-3xl font-black tracking-tight sm:text-4xl">Start with a short project brief.</h2>
            <p className="mt-4 text-sm font-medium leading-7 text-slate-300">
              The guided brief creates a pre-filled email on your device. You stay in control of what gets sent, and this website stores none of your details.
            </p>
            <button
              type="button"
              onClick={onStartProject}
              id="btn-contact-start-project-desktop"
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-white px-5 py-3 text-sm font-extrabold text-[#101A19] transition hover:bg-emerald-50"
            >
              Start a Project <ArrowUpRight className="h-4 w-4 text-[#0F8B75]" />
            </button>
          </div>
        </div>

        <div className="grid gap-3">
          <a href={`mailto:${brandEntity.email}`} className="group flex items-center justify-between rounded-3xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-[#0F8B75] hover:shadow-lg hover:shadow-slate-900/5">
            <span className="flex items-center gap-4">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#E2F1ED] text-[#0F8B75]"><Mail className="h-5 w-5" /></span>
              <span><span className="block text-xs font-bold text-slate-400">Email</span><span className="block text-sm font-extrabold">{brandEntity.email}</span></span>
            </span>
            <ArrowUpRight className="h-4 w-4 text-slate-400 transition group-hover:text-[#0F8B75]" />
          </a>
          <a href={phoneHref} className="group flex items-center justify-between rounded-3xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-[#E85D22] hover:shadow-lg hover:shadow-slate-900/5">
            <span className="flex items-center gap-4">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#FDF1E7] text-[#E85D22]"><Phone className="h-5 w-5" /></span>
              <span><span className="block text-xs font-bold text-slate-400">Phone</span><span className="block text-sm font-extrabold">{brandEntity.phone}</span></span>
            </span>
            <ArrowUpRight className="h-4 w-4 text-slate-400 transition group-hover:text-[#E85D22]" />
          </a>
          <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between rounded-3xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-emerald-500 hover:shadow-lg hover:shadow-slate-900/5">
            <span className="flex items-center gap-4">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600"><MessageCircle className="h-5 w-5" /></span>
              <span><span className="block text-xs font-bold text-slate-400">WhatsApp</span><span className="block text-sm font-extrabold">Message BuiltbyGSV</span></span>
            </span>
            <ArrowUpRight className="h-4 w-4 text-slate-400 transition group-hover:text-emerald-600" />
          </a>
        </div>
      </section>

      <section className="mt-6 grid gap-5 rounded-[2rem] border border-slate-200 bg-[#F2EFE4] p-7 sm:grid-cols-[.8fr_1.2fr] sm:p-9">
        <div>
          <p className="font-handwritten text-2xl font-bold text-[#E85D22]">A useful first message</p>
          <h2 className="mt-2 text-2xl font-black tracking-tight">Four details are enough to begin.</h2>
        </div>
        <ul className="grid gap-3 text-sm font-semibold text-slate-700 sm:grid-cols-2">
          {['The problem you need to solve', 'Who will use the product', 'What you use today', 'Any fixed launch date'].map((item) => (
            <li key={item} className="flex items-start gap-2 rounded-2xl bg-white/70 p-3"><Check className="mt-0.5 h-4 w-4 shrink-0 text-[#0F8B75]" /> {item}</li>
          ))}
        </ul>
      </section>

      <section className="mt-6 grid gap-3 sm:grid-cols-2" aria-label="Other enquiries">
        <a href="/careers" className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5"><span><span className="block text-sm font-extrabold">Careers</span><span className="mt-1 block text-xs leading-6 text-slate-500">Two six-month engineering internships. View roles and apply.</span></span><ArrowUpRight className="h-4 w-4 shrink-0 text-[#0F8B75]" /></a>
        <a href={`mailto:${brandEntity.email}?subject=BuiltbyGSV%20business%20enquiry`} className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5"><span><span className="block text-sm font-extrabold">General &amp; business enquiries</span><span className="mt-1 block text-xs leading-6 text-slate-500">For collaboration, existing projects or other questions.</span></span><ArrowUpRight className="h-4 w-4 shrink-0 text-[#0F8B75]" /></a>
      </section>

      <footer className="mt-6 flex flex-wrap items-center gap-3 text-xs font-bold text-slate-500">
        <span>Elsewhere:</span>
        <a href={brandEntity.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-[#0F8B75]"><Linkedin className="h-4 w-4" /> LinkedIn</a>
        <a href={brandEntity.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-[#0F8B75]"><Github className="h-4 w-4" /> GitHub</a>
      </footer>
    </div>
  </main>
);
