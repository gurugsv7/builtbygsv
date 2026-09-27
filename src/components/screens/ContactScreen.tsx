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
import { DrawnUnderline, Reveal, RevealGroup, RevealItem, groupVariants, itemVariants, useSequence } from '../../motion/primitives';
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

/**
 * Desktop contact: one screen that answers "how do I reach you, what should I send,
 * and what happens next". The first message is shown as a live email draft that
 * fills in the four details worth including.
 */
function DesktopContact({ onBack, onStartProject }: ContactScreenProps) {
  const [copied, setCopied] = useState(false);
  const draft = useSequence(FIRST_MESSAGE.length + 1, 0.45, 0.4);
  const journey = useSequence(3, 0.3, 0.3);
  const copyEmail = async () => {
    try { await navigator.clipboard.writeText(brandEntity.email); setCopied(true); window.setTimeout(() => setCopied(false), 1800); } catch { /* the mailto link remains available */ }
  };
  const channels = [
    { href: `mailto:${brandEntity.email}`, label: 'Email', value: brandEntity.email, icon: Mail, tone: 'bg-[#E2F1ED] text-[#0F8B75]', external: false },
    { href: phoneHref, label: 'Phone', value: brandEntity.phone, icon: Phone, tone: 'bg-[#FDF1E7] text-[#E85D22]', external: false },
    { href: whatsappHref, label: 'WhatsApp', value: 'Message BuiltbyGSV', icon: MessageCircle, tone: 'bg-emerald-50 text-emerald-600', external: true },
  ];
  const next = [
    { title: 'You send the brief', text: 'From your own email, with the file attached or pasted in.' },
    { title: 'We review it', text: 'Requirements, users and what already exists.' },
    { title: 'We follow up', text: 'To clarify scope and agree sensible next steps.' },
  ];

  return (
    <main className="mx-auto w-full max-w-[1320px] px-10 pb-16 pt-6 text-[#131921] xl:px-14">
      <header className="flex items-center justify-between">
        <button type="button" onClick={onBack} className="group inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-extrabold text-slate-700 transition hover:border-slate-400">
          <ArrowLeft className="nudge-l h-4 w-4" /> Back
        </button>
        <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.12em] text-emerald-700">Product enquiries</span>
      </header>

      <div className="mt-10 grid items-start gap-10 lg:grid-cols-[minmax(0,.9fr)_minmax(0,1.1fr)] xl:gap-14">
        <section>
          <Reveal>
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#0F8B75]">Contact BuiltbyGSV</p>
            <h1 className="mt-4 text-4xl font-extrabold leading-[1.08] tracking-tight xl:text-5xl">
              Bring the problem.<br />
              <span className="relative inline-block font-serif font-normal italic text-[#0F8B75]">
                We&apos;ll shape the build.
                <DrawnUnderline className="-bottom-2 h-3" delay={0.5} />
              </span>
            </h1>
            <p className="mt-6 max-w-md text-sm leading-7 text-slate-600">Share what is slowing your team down, who the product needs to help and what already exists. We&apos;ll review your requirements and help define a sensible first version.</p>
          </Reveal>

          <RevealGroup as="ul" className="mt-8 divide-y divide-slate-200 overflow-hidden rounded-3xl border border-slate-200 bg-white" delay={0.1}>
            {channels.map(({ href, label, value, icon: Icon, tone, external }) => (
              <RevealItem as="li" key={label} className="flex items-center gap-2 pr-3">
                <a href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className="group flex min-w-0 flex-1 items-center gap-4 p-4 transition-colors hover:bg-[#F8F9FA]">
                  <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${tone}`}><Icon className="h-5 w-5" /></span>
                  <span className="min-w-0"><span className="block text-[11px] font-bold text-slate-400">{label}</span><span className="block truncate text-sm font-extrabold">{value}</span></span>
                  <ArrowUpRight className="nudge-ur ml-auto h-4 w-4 shrink-0 text-slate-400 group-hover:text-[#0F8B75]" />
                </a>
                {label === 'Email' && (
                  <button type="button" onClick={copyEmail} className="shrink-0 rounded-full border border-slate-200 px-3 py-1.5 text-[11px] font-bold text-slate-600 transition-colors hover:border-[#0F8B75] hover:text-[#0F8B75]" aria-live="polite">
                    {copied ? 'Copied' : 'Copy'}
                  </button>
                )}
              </RevealItem>
            ))}
          </RevealGroup>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <a href="/careers" className="lift group rounded-2xl border border-slate-200 bg-white p-4">
              <span className="flex items-center justify-between text-sm font-extrabold">Careers <ArrowUpRight className="nudge-ur h-4 w-4 text-[#0F8B75]" /></span>
              <span className="mt-1 block text-xs leading-5 text-slate-500">Two six-month engineering internships. View roles and apply.</span>
            </a>
            <a href={`mailto:${brandEntity.email}?subject=BuiltbyGSV%20business%20enquiry`} className="lift group rounded-2xl border border-slate-200 bg-white p-4">
              <span className="flex items-center justify-between text-sm font-extrabold">General &amp; business <ArrowUpRight className="nudge-ur h-4 w-4 text-[#0F8B75]" /></span>
              <span className="mt-1 block text-xs leading-5 text-slate-500">For collaboration, existing projects or other questions.</span>
            </a>
          </div>
          <div className="mt-5 flex items-center gap-4 text-xs font-bold text-slate-500">
            <span>Elsewhere:</span>
            <a href={brandEntity.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-[#0F8B75]"><Linkedin className="h-4 w-4" /> LinkedIn</a>
            <a href={brandEntity.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-[#0F8B75]"><Github className="h-4 w-4" /> GitHub</a>
          </div>
        </section>

        <section aria-label="Start a project" className="relative overflow-hidden rounded-[2rem] bg-[#101A19] p-8 text-white xl:p-10">
          <div aria-hidden="true" className="absolute -right-32 -top-36 h-72 w-72 rounded-full border-[46px] border-[#174B40]" />
          <div className="relative flex items-start justify-between gap-6">
            <div>
              <p className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-widest text-emerald-400"><Send className="h-3.5 w-3.5" /> Recommended</p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight">Start with a short project brief.</h2>
              <p className="mt-3 max-w-md text-sm leading-7 text-slate-300">The guided brief prepares the email on your device. You stay in control of what gets sent, and this website stores none of your details.</p>
            </div>
          </div>

          {/* The first message, drafting itself. */}
          <div ref={draft.ref} className="relative mt-7 overflow-hidden rounded-2xl bg-white text-[#131921] shadow-2xl" role="img"
            aria-label={`An example first email to ${brandEntity.email} covering: ${FIRST_MESSAGE.join(', ').toLowerCase()}`}>
            <div className="flex items-center gap-1.5 border-b border-slate-100 px-4 py-2.5">
              {['#F87171', '#F5C748', '#34D399'].map((color) => <span key={color} className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: color }} />)}
              <span className="ml-3 font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400">New message</span>
            </div>
            <dl className="divide-y divide-slate-100 px-5 text-xs">
              <div className="flex gap-3 py-2.5"><dt className="w-14 text-slate-400">To</dt><dd className="font-bold">{brandEntity.email}</dd></div>
              <div className="flex gap-3 py-2.5"><dt className="w-14 text-slate-400">Subject</dt><dd className="font-bold">Project brief — your company</dd></div>
            </dl>
            <div className="border-t border-slate-100 px-5 pb-5 pt-4">
              <p className="font-handwritten text-lg text-[#E85D22]">A useful first message covers…</p>
              <ul className="mt-3 grid grid-cols-2 gap-2">
                {FIRST_MESSAGE.map((item, index) => {
                  const on = index < draft.step + 1 && draft.step >= 0;
                  return (
                    <motion.li key={item} className="flex items-center gap-2.5 rounded-xl border px-3 py-2.5 text-xs font-semibold" initial={false}
                      animate={{ borderColor: on ? 'rgba(15,139,117,.35)' : '#E2E8F0', backgroundColor: on ? '#F0F8F5' : '#FFFFFF', opacity: on ? 1 : 0.55 }} transition={{ duration: 0.35 }}>
                      <motion.span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md" initial={false}
                        animate={{ backgroundColor: on ? '#0F8B75' : '#E2E8F0', scale: on ? [1, 1.15, 1] : 1 }} transition={{ duration: 0.3 }}>
                        {on && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
                      </motion.span>
                      {item}
                    </motion.li>
                  );
                })}
              </ul>
            </div>
          </div>

          <div className="relative mt-7 flex flex-wrap items-center gap-4">
            <button type="button" onClick={onStartProject} id="btn-contact-start-project-desktop"
              className="press group inline-flex items-center gap-3 rounded-full bg-[#F5C748] px-5 py-3 text-sm font-extrabold text-[#101A19]">
              Start a Project <ArrowUpRight className="nudge-ur h-4 w-4" />
            </button>
            <span className="text-xs text-slate-400">Six short steps · save a draft any time</span>
          </div>

          <div ref={journey.ref} className="relative mt-8 border-t border-white/10 pt-6">
            <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400">What happens next</p>
            <ol className="relative mt-4 grid grid-cols-3 gap-5">
              <span aria-hidden="true" className="absolute left-0 right-0 top-[5px] h-px bg-white/15" />
              <motion.span aria-hidden="true" className="absolute left-0 right-0 top-[5px] h-px origin-left bg-emerald-400"
                initial={{ scaleX: 0 }} animate={{ scaleX: journey.step < 0 ? 0 : (journey.step + 1) / next.length }} transition={{ duration: 0.4, ease: EASE.out }} />
              {next.map((item, index) => (
                <li key={item.title} className="relative pt-6">
                  <motion.span aria-hidden="true" className="absolute left-0 top-0 h-[11px] w-[11px] rounded-full border-2 border-emerald-400" initial={false}
                    animate={{ backgroundColor: index <= journey.step ? '#34D399' : '#101A19' }} />
                  <p className="text-sm font-extrabold">{item.title}</p>
                  <p className="mt-1 text-xs leading-5 text-slate-400">{item.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </div>
    </main>
  );
}
