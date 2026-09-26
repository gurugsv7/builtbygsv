import React from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { ServiceAreaPage } from '../serviceAreas';
import { ContentPage, PRICE_TABLE } from '../contentPages';
import { PriceBand } from '../serviceAreas';
import { SoftwareDevIllustration } from './illustrations/SoftwareDevIllustration';
import { WebDevIllustration } from './illustrations/WebDevIllustration';
import { MobileContentPage, MobileServiceAreaPage } from './MobileSeoPages';
import { BrandLogo } from './BrandLogo';

/*
 * Landing pages in the site's own sketchbook language: hand-drawn underlines,
 * a rotated sticky note, Kalam margin notes, the existing illustrations and the
 * hero's dark brush bar. Everything here is lifted from HeroLandingScreen,
 * AboutScreen, ServicesOverviewScreen and ContactScreen so the pages read as
 * the same hand, not a template dropped on top of the palette.
 */

/* ---------- hand-drawn primitives (copied from the app screens) ---------- */

export const YellowUnderline: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    aria-hidden="true"
    className={`pointer-events-none absolute -bottom-2 left-0 h-3 w-full overflow-visible text-[#F5C748] ${className}`}
    viewBox="0 0 200 12"
    fill="none"
    stroke="currentColor"
    strokeWidth="3.5"
    strokeLinecap="round"
  >
    <path d="M 2 6 Q 100 2, 198 8" />
  </svg>
);

export const TealUnderline: React.FC = () => (
  <svg
    aria-hidden="true"
    className="pointer-events-none absolute -bottom-1 left-0 h-2 w-full overflow-visible text-[#0F8B75]/80"
    viewBox="0 0 160 8"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
  >
    <path d="M 2 4 Q 80 1, 158 5" />
  </svg>
);

export const HandTick: React.FC = () => (
  <svg
    aria-hidden="true"
    className="mt-1 h-4 w-5 shrink-0 text-[#0F8B75]"
    viewBox="0 0 24 18"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M 2 10 C 6 12, 8 15, 9 16 C 12 10, 17 4, 22 2" />
  </svg>
);

export const CurvedArrow: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    aria-hidden="true"
    className={`h-10 w-20 text-slate-700 ${className}`}
    viewBox="0 0 80 40"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
  >
    <path d="M 5 15 Q 35 38, 70 20" />
    <path d="M 60 15 L 72 20 L 68 28" />
  </svg>
);

export const Doodles: React.FC = () => (
  <>
    <span aria-hidden="true" className="absolute left-4 top-3 select-none text-[10px] font-bold text-[#131921]/30">✦</span>
    <span aria-hidden="true" className="absolute bottom-3 right-6 select-none text-[10px] font-bold text-[#131921]/30">✚</span>
  </>
);

/** Ink numeral in the handwriting face, used instead of "01" mono badges. */
export const InkNumber: React.FC<{ n: number }> = ({ n }) => (
  <span className="font-handwritten text-2xl leading-none text-[#0F8B75]">{String(n).padStart(2, '0')}</span>
);

/** Rotated paper note with a tape strip, from AboutScreen. */
export const StickyNote: React.FC<{ lines: string[]; highlight: string; className?: string }> = ({
  lines,
  highlight,
  className = '',
}) => (
  <div
    className={`relative max-w-[250px] -rotate-2 transform rounded-xs border border-amber-200/60 bg-[#FAF7EC] p-5 shadow-md ${className}`}
  >
    <div className="absolute -top-3 left-1/2 h-5 w-16 -translate-x-1/2 rotate-1 transform border border-amber-200/50 bg-amber-100/90 shadow-2xs" />
    <div className="space-y-1 font-handwritten text-[15px] font-medium leading-snug text-slate-900">
      {lines.map((line) => (
        <p key={line}>{line}</p>
      ))}
      <p>
        <span className="inline-block rounded-xs bg-[#FDE047] px-1.5 py-0.5 font-bold text-slate-900 shadow-2xs">
          {highlight}
        </span>
      </p>
    </div>
  </div>
);

/** Illustration on the mint disk with the dot-grid corner, from AboutScreen / ServicesOverview. */
export const IllustrationDisk: React.FC<{ kind: 'web' | 'software' }> = ({ kind }) => (
  <div className="relative flex h-56 w-56 items-center justify-center">
    <div className="absolute inset-0 overflow-hidden rounded-full bg-[#E2F1ED] opacity-90">
      <div className="absolute right-3 top-3 h-20 w-20 opacity-30 bg-[radial-gradient(#0F8B75_1.5px,transparent_1.5px)] [background-size:8px_8px]" />
    </div>
    <div className="absolute -left-2 bottom-4 h-12 w-12 -rotate-12 transform rounded-md bg-[#F5C748] shadow-xs" />
    <div className="relative z-10">
      {kind === 'web' ? <WebDevIllustration className="h-44 w-44" /> : <SoftwareDevIllustration className="h-44 w-44" />}
    </div>
    <div className="absolute -right-2 top-4 z-20 text-[#131921]">
      <svg aria-hidden="true" className="h-14 w-10" viewBox="0 0 40 50" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M 10 40 Q 30 40, 25 22 T 15 12 Q 22 5, 32 14" />
        <polyline points="25 6, 32 14, 23 18" />
      </svg>
    </div>
  </div>
);

/* ---------- chrome ---------- */

export const SiteHeader: React.FC<{ onStartProject: () => void }> = ({ onStartProject }) => (
  <header className="px-5 pt-5 sm:px-8 lg:px-12">
    <div className="mx-auto flex max-w-6xl items-center justify-between">
      <a href="/" aria-label="BuiltbyGSV home"><BrandLogo nameClassName="text-sm" /></a>
      <div className="flex items-center gap-3">
        <div className="hidden items-center gap-2 rounded-full border border-slate-200/80 bg-white px-3.5 py-1.5 shadow-2xs sm:flex">
          <span className="h-2 w-2 animate-pulse rounded-full bg-[#10B981]" />
          <span className="text-xs font-semibold text-slate-700">Product & AI Engineering Studio</span>
        </div>
        <button
          type="button"
          onClick={onStartProject}
          className="flex cursor-pointer items-center gap-2 rounded-full bg-[#0B1513] py-1.5 pl-4 pr-1.5 text-xs font-extrabold text-white shadow-xs transition-all hover:bg-slate-800 active:scale-95"
        >
          <span>Start a Project</span>
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#0F8B75] text-white">
            <ArrowRight className="h-3.5 w-3.5 stroke-[2.5]" />
          </span>
        </button>
      </div>
    </div>
  </header>
);

/** The hero's dark brush bar, reused as the closing call to action. */
export const BrushCta: React.FC<{ onStartProject: () => void; line1: string; line2: string }> = ({
  onStartProject,
  line1,
  line2,
}) => (
  <button type="button" onClick={onStartProject} className="group relative w-full cursor-pointer text-left focus:outline-none">
    <div className="relative flex min-h-[88px] w-full items-center justify-between overflow-hidden rounded-b-[22px] rounded-t-[12px] border-t border-white/10 bg-[#091322] px-5 py-4 text-white shadow-2xl transition-all duration-300 group-hover:bg-[#0c182c] group-active:scale-[0.99] sm:px-7">
      <div className="pointer-events-none absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:12px_12px]" />
      <svg aria-hidden="true" className="pointer-events-none absolute left-0 top-0 h-8 w-48 text-white/10" viewBox="0 0 200 30" fill="currentColor" preserveAspectRatio="none">
        <path d="M 0 0 C 40 4, 80 2, 120 8 C 150 12, 180 6, 200 15 L 200 0 Z" />
        <path d="M 0 5 C 30 2, 60 8, 90 4 C 110 2, 130 9, 150 6 L 0 0 Z" opacity="0.6" />
      </svg>
      <div className="relative z-10 flex flex-col justify-center pr-2">
        <span className="font-handwritten text-xl font-medium leading-[1.05] tracking-wide text-slate-50 transition-colors group-hover:text-amber-100 sm:text-2xl">
          <span className="block">{line1}</span>
          <span className="block">{line2}</span>
        </span>
        <div className="mt-1 pl-12 sm:pl-16">
          <svg aria-hidden="true" className="h-2.5 w-24 overflow-visible text-slate-100 sm:w-32" viewBox="0 0 120 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M 2 4 Q 35 1, 75 7 T 118 4" opacity="0.9" />
            <path d="M 12 8 Q 50 5, 102 9" strokeWidth="1.5" opacity="0.65" />
          </svg>
        </div>
      </div>
      <div className="relative z-10 ml-3 shrink-0">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F3C258] text-[#08101E] shadow-lg transition-all duration-300 group-hover:scale-105 group-hover:bg-[#f5c963] sm:h-13 sm:w-13">
          <ArrowRight className="h-5 w-5 stroke-[2.5] transition-transform group-hover:translate-x-0.5 sm:h-6 sm:w-6" />
        </div>
      </div>
    </div>
  </button>
);

export const SiteFooter: React.FC<{ note: string }> = ({ note }) => (
  <p className="px-5 pb-6 text-center font-handwritten text-sm text-slate-500">{note}</p>
);

/* ---------- content blocks ---------- */

/** Menu-style price list with dotted leaders. One surface, no cards. */
export const PriceReceipt: React.FC<{ bands: PriceBand[]; title?: string }> = ({ bands, title = 'What it costs' }) => (
  <div className="relative rotate-[0.4deg] transform rounded-sm border border-slate-200 bg-white px-6 py-6 shadow-md sm:px-8">
    <Doodles />
    <p className="font-handwritten text-2xl text-[#131921]">
      <span className="oval-loop oval-loop-teal">{title}</span>
    </p>
    <p className="mt-3 text-xs font-medium leading-relaxed text-slate-500">
      Ranges, not a single number. Scope moves the price; the scoping call is free.
    </p>
    <dl className="mt-5 space-y-4">
      {bands.map((band) => (
        <div key={band.name}>
          <div className="flex items-baseline gap-2">
            <dt className="shrink-0 text-sm font-extrabold text-[#131921]">{band.name}</dt>
            <span aria-hidden="true" className="mb-1 flex-1 border-b border-dotted border-slate-400" />
            <dd className="shrink-0 font-mono text-sm font-bold text-[#0F8B75]">{band.range.replace('INR ', '₹')}</dd>
          </div>
          <p className="mt-1 text-xs font-medium leading-relaxed text-slate-600">{band.fits}</p>
        </div>
      ))}
    </dl>
    <p className="mt-5 border-t border-dashed border-slate-300 pt-3 font-handwritten text-base text-[#E85D22]">
      First conversation: free. Including “don’t build it.”
    </p>
  </div>
);

/** Open editorial Q&A. Nothing collapsed; the answers are the page. */
export const QuestionList: React.FC<{ faqs: { question: string; answer: string }[] }> = ({ faqs }) => (
  <dl className="divide-y divide-slate-200/80">
    {faqs.map((faq) => (
      <div key={faq.question} className="grid gap-2 py-6 sm:grid-cols-[2.5rem_1fr] sm:gap-4">
        <span aria-hidden="true" className="font-handwritten text-2xl leading-none text-[#E85D22]">
          Q.
        </span>
        <div>
          <dt className="text-base font-extrabold leading-snug tracking-tight text-[#131921] sm:text-lg">{faq.question}</dt>
          <dd className="mt-2 max-w-2xl text-sm font-medium leading-7 text-slate-600">{faq.answer}</dd>
        </div>
      </div>
    ))}
  </dl>
);

/** Pull quote in the sage banner from the Services desktop view. */
export const ProofQuote: React.FC<{ text: string }> = ({ text }) => (
  <div className="relative overflow-hidden rounded-2xl border border-[#CDE3DC] bg-[#EAF3F0] p-5 text-[#131921] shadow-2xs sm:p-6">
    <div className="flex items-start gap-3">
      <span aria-hidden="true" className="select-none font-serif text-4xl font-extrabold leading-none text-[#0F8B75]">“</span>
      <div>
        <p className="text-sm font-semibold leading-7 text-[#131921]">{text}</p>
        <p className="pt-2 font-serif text-xs font-semibold italic text-[#0F8B75]">— from the work, not the brochure</p>
      </div>
    </div>
  </div>
);

export const RelatedRow: React.FC<{ related: { path: string; label: string }[]; heading: string }> = ({ related, heading }) => (
  <nav aria-label="Related pages" className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-bold text-slate-500">
    <span className="font-handwritten text-base text-slate-700">{heading}</span>
    {related.map((link) => (
      <a key={link.path} href={link.path} className="inline-flex items-center gap-1 transition hover:text-[#0F8B75]">
        {link.label} <ArrowUpRight className="h-3.5 w-3.5" />
      </a>
    ))}
  </nav>
);

/** Split "Ecommerce website development in Karaikal." into the ink part and the handwritten city. */
const splitHeadline = (h1: string, city: string) => {
  const marker = ` in ${city}`;
  const index = h1.lastIndexOf(marker);
  if (index === -1) return { lead: h1, tail: '' };
  return { lead: h1.slice(0, index), tail: h1.slice(index + 1) }; // "in Karaikal."
};

const illustrationFor = (serviceName: string): 'web' | 'software' =>
  /automation|software|saas|mvp/i.test(serviceName) ? 'software' : 'web';

/* ---------- pages ---------- */

interface ServiceAreaProps {
  page: ServiceAreaPage;
  onStartProject: () => void;
}

export const ServiceAreaLandingPage: React.FC<ServiceAreaProps> = ({ page, onStartProject }) => {
  const { lead, tail } = splitHeadline(page.h1, page.city);
  const hubPath = `/web-software-developer-${page.citySlug}`;

  return (
    <>
    <div className="lg:hidden">
      <MobileServiceAreaPage page={page} onStartProject={onStartProject} />
    </div>
    <main className="hidden min-h-screen bg-[#F8F9FA] font-sans text-[#131921] antialiased lg:block">
      <SiteHeader onStartProject={onStartProject} />

      {/* Hero: ink headline left, note + illustration right. */}
      <section className="px-5 pb-12 pt-10 sm:px-8 lg:px-12 lg:pb-16 lg:pt-14">
        <div className="mx-auto max-w-6xl">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-[11px] font-bold text-slate-500">
            <a href="/" className="hover:text-[#0F8B75]">Home</a>
            <span aria-hidden="true">/</span>
            <a href={hubPath} className="hover:text-[#0F8B75]">{page.city}</a>
            <span aria-hidden="true">/</span>
            <span className="text-slate-700">{page.serviceName}</span>
          </nav>

          <div className="mt-8 grid items-center gap-10 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-7">
              <p className="font-handwritten text-lg text-[#0F8B75]">{page.eyebrow}</p>
              <h1 className="mt-3 text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl xl:text-[3.4rem]">
                {lead}{' '}
                {tail ? (
                  <span className="relative inline-block font-handwritten text-4xl font-normal text-[#0F8B75] sm:text-5xl xl:text-[3.4rem]">
                    {tail}
                    <YellowUnderline />
                  </span>
                ) : null}
              </h1>
              <p className="mt-7 max-w-2xl text-base font-medium leading-8 text-slate-700 sm:text-[17px]">{page.answer}</p>
              <p className="mt-4 max-w-2xl text-sm font-medium leading-7 text-slate-600">{page.intro}</p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={onStartProject}
                  className="flex cursor-pointer items-center gap-2 rounded-full bg-[#0B1513] py-2 pl-5 pr-2 text-sm font-extrabold text-white shadow-xs transition-all hover:bg-slate-800 active:scale-95"
                >
                  <span>Start a Project</span>
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0F8B75] text-white">
                    <ArrowRight className="h-4 w-4 stroke-[2.5]" />
                  </span>
                </button>
                <a href={hubPath} className="relative inline-block font-handwritten text-lg text-slate-800 hover:text-[#0F8B75]">
                  Everything in {page.city}
                  <TealUnderline />
                </a>
              </div>
            </div>

            <div className="relative flex flex-col items-center lg:col-span-5">
              <StickyNote
                lines={[page.serviceName + '.', `${page.city}${page.alternateCity ? ` / ${page.alternateCity}` : ''}.`]}
                highlight={page.region}
                className="z-10"
              />
              <div className="-mt-4">
                <IllustrationDisk kind={illustrationFor(page.serviceName)} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Notes from the field: cream paper, hand ticks. */}
      <section className="px-5 sm:px-8 lg:px-12">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-slate-200 bg-[#F2EFE4] p-7 sm:p-9">
          <Doodles />
          <div className="grid gap-6 sm:grid-cols-[.8fr_1.2fr] sm:gap-10">
            <div>
              <p className="font-handwritten text-2xl font-bold text-[#E85D22]">Notes from {page.city}</p>
              <h2 className="mt-2 text-2xl font-black leading-tight tracking-tight">
                Why {page.city} changes how this gets built.
              </h2>
              <CurvedArrow className="mt-4 hidden sm:block" />
            </div>
            <ul className="grid gap-3 text-sm font-semibold leading-6 text-slate-700">
              {page.localContext.map((item) => (
                <li key={item} className="flex items-start gap-3 rounded-2xl bg-white/70 p-3.5">
                  <HandTick />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* What's included: a typographic ledger, no cards. */}
      <section className="px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2">
              <span className="border-b-2 border-[#0F8B75] pb-0.5 font-mono text-xs font-bold text-[#0F8B75]">01</span>
              <span className="pl-1 text-xs font-bold uppercase tracking-widest text-slate-500">What's included</span>
            </div>
            <h2 className="mt-4 text-3xl font-extrabold leading-[1.2] tracking-tight xl:text-4xl">
              The {page.serviceName} work,{' '}
              <span className="font-serif font-normal italic text-[#0F8B75]">itemised.</span>
            </h2>
            <p className="mt-4 max-w-xs text-sm font-medium leading-relaxed text-slate-600">
              Six things a quote for this should name. If one is missing from someone's proposal, ask why.
            </p>
          </div>
          <div className="lg:col-span-8">
            <ol className="grid gap-x-10 sm:grid-cols-2">
              {page.deliverables.map((item, index) => (
                <li key={item.title} className="flex gap-4 border-b border-dotted border-slate-300 py-5">
                  <InkNumber n={index + 1} />
                  <div>
                    <h3 className="text-base font-extrabold tracking-tight text-[#131921]">{item.title}</h3>
                    <p className="mt-1.5 text-sm font-medium leading-6 text-slate-600">{item.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Price receipt beside the proof quote. */}
      <section className="px-5 pb-16 sm:px-8 lg:px-12 lg:pb-20">
        <div className="mx-auto grid max-w-6xl items-start gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <PriceReceipt bands={page.priceBands} />
            <a href="/pricing" className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-[#0F8B75]">
              Full pricing, every service <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
          <div className="lg:col-span-7 lg:pt-4">
            <div className="flex items-center gap-2">
              <span className="border-b-2 border-[#0F8B75] pb-0.5 font-mono text-xs font-bold text-[#0F8B75]">02</span>
              <span className="pl-1 text-xs font-bold uppercase tracking-widest text-slate-500">Relevant work</span>
            </div>
            <h2 className="mt-4 text-3xl font-extrabold leading-[1.2] tracking-tight xl:text-4xl">
              Proof,{' '}
              <span className="relative inline-block font-handwritten text-3xl font-normal text-[#0F8B75] xl:text-4xl">
                not adjectives.
                <YellowUnderline />
              </span>
            </h2>
            <div className="mt-6">
              <ProofQuote text={page.proof} />
            </div>
            <div className="mt-8">
              <RelatedRow related={page.related} heading="Also see:" />
            </div>
          </div>
        </div>
      </section>

      {/* Questions, all open. */}
      <section className="border-t border-slate-200/70 px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-4xl">
          <div className="flex items-center gap-2">
            <span className="border-b-2 border-[#0F8B75] pb-0.5 font-mono text-xs font-bold text-[#0F8B75]">03</span>
            <span className="pl-1 text-xs font-bold uppercase tracking-widest text-slate-500">Before you ask</span>
          </div>
          <h2 className="mt-4 text-3xl font-extrabold leading-[1.2] tracking-tight xl:text-4xl">
            {page.serviceName} in {page.city},{' '}
            <span className="font-serif font-normal italic text-[#0F8B75]">answered straight.</span>
          </h2>
          <div className="mt-6">
            <QuestionList faqs={page.faqs} />
          </div>
        </div>
      </section>

      <section className="px-5 pb-6 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <BrushCta onStartProject={onStartProject} line1="Bring the problem." line2="We'll shape the build." />
        </div>
      </section>

      <SiteFooter note={`Serving ${page.city}${page.alternateCity ? ` (${page.alternateCity})` : ''}, ${page.region}.`} />
    </main>
    </>
  );
};

interface ContentPageProps {
  page: ContentPage;
  onStartProject: () => void;
}

/** Take the last word of the H1 for the handwritten accent. */
const splitLastWord = (text: string) => {
  const trimmed = text.trim();
  const index = trimmed.lastIndexOf(' ');
  if (index === -1) return { lead: '', tail: trimmed };
  return { lead: trimmed.slice(0, index), tail: trimmed.slice(index + 1) };
};

export const StandaloneContentPage: React.FC<ContentPageProps> = ({ page, onStartProject }) => {
  const { lead, tail } = splitLastWord(page.h1);
  const isPricing = page.path === '/pricing';

  return (
    <>
    <div className="lg:hidden">
      <MobileContentPage page={page} onStartProject={onStartProject} />
    </div>
    <main className="hidden min-h-screen bg-[#F8F9FA] font-sans text-[#131921] antialiased lg:block">
      <SiteHeader onStartProject={onStartProject} />

      <section className="px-5 pb-12 pt-10 sm:px-8 lg:px-12 lg:pb-16 lg:pt-14">
        <div className="mx-auto max-w-6xl">
          <a href="/" className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 transition hover:text-[#0F8B75]">
            <ArrowLeft className="h-4 w-4" /> BuiltbyGSV
          </a>
          <div className="mt-8 grid items-end gap-10 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <p className="font-handwritten text-lg text-[#0F8B75]">{page.eyebrow}</p>
              <h1 className="mt-3 text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl xl:text-6xl">
                {lead}{' '}
                <span className="relative inline-block font-handwritten text-4xl font-normal text-[#0F8B75] sm:text-5xl xl:text-6xl">
                  {tail}
                  <YellowUnderline />
                </span>
              </h1>
              <p className="mt-7 max-w-2xl text-base font-medium leading-8 text-slate-700 sm:text-[17px]">{page.answer}</p>
              <p className="mt-4 max-w-2xl text-sm font-medium leading-7 text-slate-600">{page.intro}</p>
            </div>
            <div className="hidden justify-center lg:col-span-4 lg:flex">
              <StickyNote
                lines={['One person.', 'Scope agreed first.', 'You own the code.']}
                highlight="No surprises."
              />
            </div>
          </div>
        </div>
      </section>

      {isPricing ? (
        <section className="px-5 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-6xl lg:grid lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-6">
              <PriceReceipt bands={PRICE_TABLE} title="Indicative ranges" />
            </div>
            <div className="mt-8 lg:col-span-6 lg:mt-4">
              <p className="font-handwritten text-2xl font-bold text-[#E85D22]">How to read this</p>
              {page.sections[0]?.paragraphs?.map((paragraph) => (
                <p key={paragraph} className="mt-3 text-sm font-medium leading-7 text-slate-600">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="px-5 py-14 sm:px-8 lg:px-12 lg:py-16">
        <div className="mx-auto max-w-6xl lg:grid lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-8">
            {page.sections.slice(isPricing ? 1 : 0).map((section, index) => (
              <article key={section.heading} className={index > 0 ? 'mt-14' : ''}>
                <div className="flex items-baseline gap-3">
                  <InkNumber n={index + 1} />
                  <h2 className="text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl">{section.heading}</h2>
                </div>
                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph} className="mt-5 text-[15px] font-medium leading-8 text-slate-600 sm:text-base">
                    {paragraph}
                  </p>
                ))}
                {section.bullets?.length ? (
                  <ul className="mt-6 space-y-3 rounded-2xl bg-[#F2EFE4] p-5">
                    {section.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-3 text-sm font-semibold leading-7 text-slate-700">
                        <HandTick />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </article>
            ))}
          </div>
          <aside className="mt-12 lg:col-span-4 lg:mt-0">
            <div className="lg:sticky lg:top-8">
              <ProofQuote text="Good code solves problems. Great solutions create impact." />
              <div className="mt-6">
                <RelatedRow related={page.related} heading="Next:" />
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-t border-slate-200/70 px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-extrabold leading-[1.2] tracking-tight xl:text-4xl">
            Straight{' '}
            <span className="relative inline-block font-handwritten text-3xl font-normal text-[#0F8B75] xl:text-4xl">
              answers.
              <YellowUnderline />
            </span>
          </h2>
          <div className="mt-4">
            <QuestionList faqs={page.faqs} />
          </div>
        </div>
      </section>

      <section className="px-5 pb-6 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <BrushCta onStartProject={onStartProject} line1="Start a Project" line2="Tell us what you’re building." />
        </div>
      </section>

      <SiteFooter note="Karaikal · Thanjavur · Bengaluru · remote across India." />
    </main>
    </>
  );
};
