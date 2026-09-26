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
import { brandEntity } from '../../seo';

interface ContactScreenProps {
  onBack: () => void;
  onStartProject: () => void;
}

const phoneHref = `tel:${brandEntity.phone.replace(/[^+\d]/g, '')}`;
const whatsappHref = `https://wa.me/${brandEntity.phone.replace(/\D/g, '')}`;

export const ContactScreen = ({ onBack, onStartProject }: ContactScreenProps) => (
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
              id="btn-contact-start-project"
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
