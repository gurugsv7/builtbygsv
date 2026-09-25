import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  BellRing,
  Check,
  ChevronRight,
  FileText,
  Search,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { BottomNavBar } from './BottomNavBar';
import { SCREEN_PATHS } from '../routes';
import { ScreenType } from '../types';
import { LocationPage } from '../seo';
import { ContentPage, PRICE_TABLE } from '../contentPages';
import { PriceBand, ServiceAreaPage, serviceAreaPagesForCity } from '../serviceAreas';
import { HeroIllustration } from './illustrations/HeroIllustration';
import { SoftwareDevIllustration } from './illustrations/SoftwareDevIllustration';
import { WebDevIllustration } from './illustrations/WebDevIllustration';
import { HandTick } from './ServiceAreaContent';
import { BrandLogo } from './BrandLogo';

/*
 * Mobile (<lg) versions of the SEO landing pages.
 *
 * The existing app treats a phone as an app screen, not a shrunk website:
 * px-4 frame, back-arrow header, a 7/5 hero row with a small illustration,
 * white rounded-2xl cards, the navy-strip expandable list from the service
 * screens, chip rows, a full-width brush button and the floating dock. Every
 * block below is copied from HomeDashboardScreen, ServicesOverviewScreen and
 * WebDevServiceScreen so these pages sit inside the same app.
 */

const FEATURE_ICONS = [Zap, FileText, BellRing, Search, BarChart3, ShieldCheck];

const navigateTo = (screen: ScreenType) => {
  const path = SCREEN_PATHS[screen];
  if (path) window.location.href = path;
};

/* ---------- shell ---------- */

const MobileHeader: React.FC<{ backHref: string; backLabel: string }> = ({ backHref, backLabel }) => (
  <div className="flex w-full items-center justify-between border-b border-slate-200/80 pb-2.5">
    <a
      href={backHref}
      aria-label={backLabel}
      className="-ml-1 rounded-xl p-2 text-slate-800 transition-all touch-manipulation hover:bg-slate-200/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F8B75] active:scale-95"
    >
      <ArrowLeft className="h-5 w-5 stroke-[2.2]" />
    </a>
    <a href="/" className="select-none"><BrandLogo nameClassName="text-base" /></a>
    <a
      href="/contact"
      aria-label="Contact"
      className="-mr-1 rounded-xl p-2 text-slate-800 transition-all touch-manipulation hover:bg-slate-200/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F8B75] active:scale-95"
    >
      <ArrowUpRight className="h-5 w-5 stroke-[2.2]" />
    </a>
  </div>
);

const MobileShell: React.FC<{
  backHref: string;
  backLabel: string;
  onStartProject: () => void;
  children: React.ReactNode;
}> = ({ backHref, backLabel, onStartProject, children }) => (
  <>
    <main className="mx-auto flex min-h-screen w-full max-w-xl flex-col gap-5 overflow-x-hidden bg-[#F8F9FA] px-4 pb-28 pt-3 font-sans text-[#131921] antialiased">
      <MobileHeader backHref={backHref} backLabel={backLabel} />
      {children}
    </main>
    <BottomNavBar currentScreen="not-found" onNavigate={navigateTo} onOpenStartProject={onStartProject} />
  </>
);

/* ---------- blocks ---------- */

const Underline: React.FC<{ color?: string }> = ({ color = 'text-[#F5C748]' }) => (
  <svg
    aria-hidden="true"
    className={`pointer-events-none absolute -bottom-1 left-0 h-2.5 w-full overflow-visible ${color}`}
    viewBox="0 0 120 10"
    fill="none"
    stroke="currentColor"
    strokeWidth="3.2"
    strokeLinecap="round"
  >
    <path d="M 2 5 Q 60 1, 118 7" />
  </svg>
);

/** Serif-italic section title with the teal stroke, from the home screen. */
const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="relative inline-block">
    <h2 className="font-serif text-2xl font-extrabold italic tracking-tight text-[#131921] text-balance">{children}</h2>
    <svg aria-hidden="true" className="mt-0.5 h-2 w-28 overflow-visible text-[#0F8B75]" viewBox="0 0 110 8" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <path d="M 2 4 C 35 1, 75 7, 108 3" />
    </svg>
  </div>
);

const MiniDisk: React.FC<{ kind: 'web' | 'software' | 'hero' }> = ({ kind }) => (
  <div className="relative flex h-32 w-32 shrink-0 select-none items-center justify-center sm:h-36 sm:w-36">
    {kind !== 'hero' ? (
      <>
        <div className="absolute h-28 w-28 overflow-hidden rounded-full bg-[#E2F1ED] opacity-95 sm:h-32 sm:w-32">
          <div className="absolute right-2 top-2 h-14 w-14 opacity-30 bg-[radial-gradient(#0F8B75_1.5px,transparent_1.5px)] [background-size:6px_6px]" />
        </div>
        <div className="absolute bottom-3 left-1 h-8 w-8 -rotate-12 transform rounded-md bg-[#F5C748] shadow-xs" />
      </>
    ) : null}
    <div className="relative z-10">
      {kind === 'hero' ? (
        <HeroIllustration className="w-32 sm:w-36" />
      ) : kind === 'web' ? (
        <WebDevIllustration className="h-24 w-24 sm:h-28 sm:w-28" />
      ) : (
        <SoftwareDevIllustration className="h-24 w-24 sm:h-28 sm:w-28" />
      )}
    </div>
  </div>
);

const MobileHero: React.FC<{
  eyebrow: string;
  lead: string;
  tail: string;
  answer: string;
  kind: 'web' | 'software' | 'hero';
}> = ({ eyebrow, lead, tail, answer, kind }) => (
  <div className="grid grid-cols-12 items-start gap-2 pt-1">
    <div className="col-span-7 space-y-2">
      <p className="font-handwritten text-base leading-none text-[#0F8B75]">{eyebrow}</p>
      <h1 className="text-2xl font-extrabold leading-[1.12] tracking-tight text-[#131921] text-balance sm:text-3xl">
        {lead}{' '}
        {tail ? (
          <span className="relative inline-block font-handwritten text-2xl font-normal text-[#0F8B75] sm:text-3xl">
            {tail}
            <Underline />
          </span>
        ) : null}
      </h1>
      <p className="pt-1 text-xs font-medium leading-relaxed text-slate-600">{answer}</p>
    </div>
    <div className="col-span-5 flex justify-end">
      <MiniDisk kind={kind} />
    </div>
  </div>
);

/** Dark brush banner from the home screen. */
const DarkBanner: React.FC<{ onClick: () => void; line1: string; line2: string; accent: string }> = ({
  onClick,
  line1,
  line2,
  accent,
}) => (
  <button
    type="button"
    onClick={onClick}
    className="group relative w-full cursor-pointer overflow-hidden rounded-3xl border border-slate-800/80 bg-[#051722] p-5 text-left text-white shadow-xl touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F8B75]"
  >
    <span aria-hidden="true" className="absolute left-4 top-3 select-none text-xs text-white/20">✦</span>
    <span aria-hidden="true" className="absolute bottom-3 right-14 select-none text-xs text-white/20">✚</span>
    <div className="relative z-10 flex items-center justify-between gap-3">
      <h3 className="max-w-[210px] text-lg font-extrabold leading-snug tracking-tight text-balance">
        {line1}
        <br />
        {line2}{' '}
        <span className="relative inline-block pb-0.5">
          {accent}
          <svg aria-hidden="true" className="pointer-events-none absolute -bottom-1 left-0 h-2 w-full overflow-visible text-[#F5C748]" viewBox="0 0 90 8" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round">
            <path d="M 2 4 C 30 1, 60 7, 88 3" />
          </svg>
        </span>
      </h3>
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#0F8B75] text-white shadow-md transition-all group-hover:scale-105 group-hover:bg-[#0c7260]">
        <ArrowRight className="h-6 w-6 stroke-[2.5]" />
      </div>
    </div>
  </button>
);

/** Cream notes card with hand ticks. */
const NotesCard: React.FC<{ title: string; items: string[] }> = ({ title, items }) => (
  <div className="relative overflow-hidden rounded-2xl border border-amber-200/50 bg-[#F2EFE4] p-4">
    <p className="font-handwritten text-xl font-bold text-[#E85D22]">{title}</p>
    <ul className="mt-2.5 space-y-2">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5 rounded-xl bg-white/70 p-2.5 text-[11px] font-semibold leading-snug text-slate-700">
          <HandTick />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

/** Navy strip + expandable rows, from the service screens. */
const FeatureStack: React.FC<{ items: { title: string; detail: string }[]; included: string }> = ({ items, included }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm">
      <div className="flex">
        <div className="flex w-12 shrink-0 flex-col items-center justify-around bg-[#0D131A] py-4">
          {items.map((item, index) => {
            const Icon = FEATURE_ICONS[index % FEATURE_ICONS.length];
            return (
              <div key={item.title} className="py-2 text-white/80">
                <Icon className="h-5 w-5 stroke-[2]" />
              </div>
            );
          })}
        </div>
        <div className="flex-1 divide-y divide-slate-100">
          {items.map((item, index) => {
            const isOpen = openIndex === index;
            const [firstSentence] = item.detail.split(/(?<=\.)\s/);
            return (
              <button
                type="button"
                key={item.title}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                aria-expanded={isOpen}
                className="group w-full cursor-pointer p-3.5 text-left transition-colors touch-manipulation hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#0F8B75]"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="space-y-0.5">
                    <h3 className="text-xs font-extrabold text-slate-900 transition-colors group-hover:text-[#0F8B75]">{item.title}</h3>
                    {!isOpen ? <p className="line-clamp-2 text-[11px] font-medium leading-snug text-slate-500">{firstSentence}</p> : null}
                  </div>
                  <ChevronRight className={`h-4 w-4 shrink-0 text-slate-400 transition-transform motion-reduce:transition-none ${isOpen ? 'rotate-90' : ''}`} />
                </div>
                {isOpen ? (
                  <div className="mt-2.5 space-y-1 rounded-xl border border-emerald-100/60 bg-emerald-50/50 p-2.5 text-[11px] text-slate-600">
                    <p className="font-medium leading-relaxed">{item.detail}</p>
                    <div className="flex items-center gap-1 pt-1 text-[10px] font-bold text-[#0F8B75]">
                      <Check className="h-3 w-3 stroke-[3]" />
                      {included}
                    </div>
                  </div>
                ) : null}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

/** Horizontal price rail. */
const PriceRail: React.FC<{ bands: PriceBand[] }> = ({ bands }) => (
  <div className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-1" aria-label="Indicative pricing">
    {bands.map((band) => (
      <div key={band.name} className="w-[230px] shrink-0 snap-start rounded-2xl border border-slate-200/90 bg-white p-4 shadow-2xs">
        <p className="text-xs font-extrabold text-[#131921]">{band.name}</p>
        <p className="mt-1 font-mono text-sm font-bold tabular-nums text-[#0F8B75]">{band.range.replace('INR ', '₹')}</p>
        <p className="mt-2 text-[11px] font-medium leading-snug text-slate-600">{band.fits}</p>
      </div>
    ))}
    <a
      href="/pricing"
      className="flex w-[150px] shrink-0 snap-start flex-col justify-between rounded-2xl border border-dashed border-slate-300 p-4 text-xs font-extrabold text-slate-700 touch-manipulation hover:border-[#0F8B75] hover:text-[#0F8B75] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F8B75]"
    >
      Full pricing
      <ArrowUpRight className="h-4 w-4" />
    </a>
  </div>
);

const QuoteCard: React.FC<{ text: string }> = ({ text }) => (
  <div className="rounded-2xl border border-[#CDE3DC] bg-[#EAF3F0] p-4 shadow-2xs">
    <div className="flex items-start gap-2.5">
      <span aria-hidden="true" className="select-none font-serif text-3xl font-extrabold leading-none text-[#0F8B75]">“</span>
      <div>
        <p className="text-xs font-semibold leading-relaxed text-[#131921]">{text}</p>
        <p className="pt-1.5 font-serif text-[11px] font-semibold italic text-[#0F8B75]">— from the work, not the brochure</p>
      </div>
    </div>
  </div>
);

/** One white card of expandable questions. */
const FaqStack: React.FC<{ faqs: { question: string; answer: string }[] }> = ({ faqs }) => (
  <div className="divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm">
    {faqs.map((faq) => (
      <details key={faq.question} className="group">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-3.5 text-xs font-extrabold text-slate-900 touch-manipulation hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#0F8B75] [&::-webkit-details-marker]:hidden">
          <span className="flex items-start gap-2">
            <span aria-hidden="true" className="font-handwritten text-base leading-none text-[#E85D22]">Q.</span>
            <span className="text-pretty">{faq.question}</span>
          </span>
          <ChevronRight className="h-4 w-4 shrink-0 text-slate-400 transition-transform group-open:rotate-90 motion-reduce:transition-none" />
        </summary>
        <p className="px-3.5 pb-4 pl-9 text-[11px] font-medium leading-relaxed text-slate-600">{faq.answer}</p>
      </details>
    ))}
  </div>
);

const ChipRow: React.FC<{ links: { path: string; label: string }[] }> = ({ links }) => (
  <div className="flex flex-wrap gap-1.5">
    {links.map((link) => (
      <a
        key={link.path}
        href={link.path}
        className="rounded-full border border-slate-200/90 bg-white px-2.5 py-1.5 text-[10px] font-bold text-slate-700 shadow-2xs touch-manipulation hover:border-[#0F8B75] hover:text-[#0F8B75] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F8B75]"
      >
        {link.label}
      </a>
    ))}
  </div>
);

const BrushButton: React.FC<{ onClick: () => void; label: string }> = ({ onClick, label }) => (
  <button
    type="button"
    onClick={onClick}
    className="brush-btn-teal group flex w-full cursor-pointer items-center justify-between p-3.5 text-white shadow-lg transition-all touch-manipulation hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0F8B75] active:scale-[0.98]"
  >
    <span className="pl-3 text-base font-extrabold tracking-tight">{label}</span>
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-[#0F8B75] shadow-xs transition-transform group-hover:scale-105">
      <ArrowRight className="h-5 w-5 stroke-[2.5]" />
    </span>
  </button>
);

/* ---------- pages ---------- */

const splitCity = (h1: string, city: string) => {
  const marker = ` in ${city}`;
  const index = h1.lastIndexOf(marker);
  return index === -1 ? { lead: h1, tail: '' } : { lead: h1.slice(0, index), tail: h1.slice(index + 1) };
};

export const MobileServiceAreaPage: React.FC<{ page: ServiceAreaPage; onStartProject: () => void }> = ({ page, onStartProject }) => {
  const { lead, tail } = splitCity(page.h1, page.city);
  const hubPath = `/web-software-developer-${page.citySlug}`;
  const kind: 'web' | 'software' = /automation|software|saas|mvp/i.test(page.serviceName) ? 'software' : 'web';

  return (
    <MobileShell backHref={hubPath} backLabel={`Back to ${page.city}`} onStartProject={onStartProject}>
      <MobileHero eyebrow={page.eyebrow} lead={lead} tail={tail} answer={page.answer} kind={kind} />

      <DarkBanner onClick={onStartProject} line1="Bring the problem." line2="We'll shape" accent="the build." />

      <NotesCard title={`Notes from ${page.city}`} items={page.localContext} />

      <div className="space-y-3 pt-1">
        <SectionTitle>What's included.</SectionTitle>
        <FeatureStack items={page.deliverables} included={`Part of ${page.serviceName.toLowerCase()} work`} />
      </div>

      <div className="space-y-3 pt-1">
        <SectionTitle>What it costs.</SectionTitle>
        <PriceRail bands={page.priceBands} />
        <p className="font-handwritten text-sm text-[#E85D22]">First conversation: free. Including “don’t build it.”</p>
      </div>

      <div className="space-y-3 pt-1">
        <SectionTitle>Proof, not adjectives.</SectionTitle>
        <QuoteCard text={page.proof} />
      </div>

      <div className="space-y-3 pt-1">
        <SectionTitle>Before you ask.</SectionTitle>
        <FaqStack faqs={page.faqs} />
      </div>

      <div className="space-y-2 pt-1">
        <p className="font-handwritten text-base text-slate-700">Also see:</p>
        <ChipRow links={page.related} />
      </div>

      <div className="pt-2">
        <BrushButton onClick={onStartProject} label="Start a Project" />
      </div>
    </MobileShell>
  );
};

export const MobileHubPage: React.FC<{ page: LocationPage; onStartProject: () => void }> = ({ page, onStartProject }) => (
  <MobileShell backHref="/" backLabel="Back to home" onStartProject={onStartProject}>
    <MobileHero eyebrow={page.eyebrow} lead="Website developer" tail={`in ${page.city}.`} answer={page.intro} kind="hero" />

    <DarkBanner onClick={onStartProject} line1="Turning ideas into" line2="impactful digital" accent="products." />

    <NotesCard title={`Notes from ${page.city}`} items={page.localFocus} />

    <div className="space-y-3 pt-1">
      <SectionTitle>Something specific?</SectionTitle>
      <div className="flex flex-col gap-3">
        {serviceAreaPagesForCity(page.slug).map((spoke, index) => (
          <a
            key={spoke.path}
            href={spoke.path}
            className="group space-y-2.5 rounded-2xl border border-slate-200/90 bg-white p-4 shadow-2xs transition-all touch-manipulation hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F8B75]"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-sm font-extrabold text-[#0F8B75]">{String(index + 1).padStart(2, '0')}</span>
              <span aria-hidden="true" className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100/90 text-slate-700 transition-colors group-hover:bg-[#0F8B75] group-hover:text-white">
                <ArrowRight className="h-4 w-4 stroke-[2.2]" />
              </span>
            </div>
            <h3 className="text-base font-extrabold leading-tight text-[#131921] group-hover:text-[#0F8B75]">
              {spoke.serviceName} in {spoke.city}
            </h3>
            <p className="font-serif text-xs font-semibold italic text-[#0F8B75]">{spoke.eyebrow}</p>
            <p className="line-clamp-2 text-[11px] font-medium leading-relaxed text-slate-600">{spoke.answer.split('. ')[0]}.</p>
          </a>
        ))}
      </div>
    </div>

    <div className="space-y-3 pt-1">
      <SectionTitle>A good fit for.</SectionTitle>
      <div className="flex flex-wrap gap-1.5">
        {page.industries.map((industry) => (
          <span key={industry} className="rounded-full border border-slate-200/90 bg-white px-2.5 py-1 text-[10px] font-bold text-slate-700 shadow-2xs">
            {industry}
          </span>
        ))}
      </div>
      <QuoteCard text={page.proof} />
    </div>

    <div className="pt-2">
      <BrushButton onClick={onStartProject} label="Start a Project" />
    </div>
  </MobileShell>
);

export const MobileContentPage: React.FC<{ page: ContentPage; onStartProject: () => void }> = ({ page, onStartProject }) => {
  const trimmed = page.h1.trim();
  const cut = trimmed.lastIndexOf(' ');
  const lead = cut === -1 ? '' : trimmed.slice(0, cut);
  const tail = cut === -1 ? trimmed : trimmed.slice(cut + 1);
  const isPricing = page.path === '/pricing';
  const sections = isPricing ? page.sections.slice(1) : page.sections;

  return (
    <MobileShell backHref="/" backLabel="Back to home" onStartProject={onStartProject}>
      <div className="space-y-2 pt-1">
        <p className="font-handwritten text-base leading-none text-[#0F8B75]">{page.eyebrow}</p>
        <h1 className="text-3xl font-extrabold leading-[1.1] tracking-tight text-[#131921] text-balance">
          {lead}{' '}
          <span className="relative inline-block font-handwritten text-3xl font-normal text-[#0F8B75]">
            {tail}
            <Underline />
          </span>
        </h1>
        <p className="pt-1 text-xs font-medium leading-relaxed text-slate-700">{page.answer}</p>
      </div>

      {isPricing ? (
        <div className="space-y-3">
          <SectionTitle>Indicative ranges.</SectionTitle>
          <div className="divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm">
            {PRICE_TABLE.map((band) => (
              <div key={band.name} className="p-3.5">
                <div className="flex items-baseline justify-between gap-2">
                  <p className="text-xs font-extrabold text-[#131921]">{band.name}</p>
                  <p className="shrink-0 font-mono text-xs font-bold tabular-nums text-[#0F8B75]">{band.range.replace('INR ', '₹')}</p>
                </div>
                <p className="mt-1 text-[11px] font-medium leading-snug text-slate-600">{band.fits}</p>
              </div>
            ))}
          </div>
          <p className="font-handwritten text-sm text-[#E85D22]">First conversation: free. Including “don’t build it.”</p>
        </div>
      ) : (
        <DarkBanner onClick={onStartProject} line1="Bring the problem." line2="We'll shape" accent="the build." />
      )}

      <div className="flex flex-col gap-3">
        {sections.map((section, index) => (
          <article key={section.heading} className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-2xs">
            <div className="flex items-baseline gap-2">
              <span className="font-handwritten text-lg leading-none text-[#0F8B75]">{String(index + 1).padStart(2, '0')}</span>
              <h2 className="text-sm font-extrabold leading-tight text-[#131921] text-balance">{section.heading}</h2>
            </div>
            {section.paragraphs?.map((paragraph) => (
              <p key={paragraph} className="mt-2.5 text-[12px] font-medium leading-relaxed text-slate-600">
                {paragraph}
              </p>
            ))}
            {section.bullets?.length ? (
              <ul className="mt-3 space-y-1.5 rounded-xl bg-[#F2EFE4] p-3">
                {section.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2 text-[11px] font-semibold leading-snug text-slate-700">
                    <HandTick />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </article>
        ))}
      </div>

      <div className="space-y-3 pt-1">
        <SectionTitle>Straight answers.</SectionTitle>
        <FaqStack faqs={page.faqs} />
      </div>

      <div className="space-y-2 pt-1">
        <p className="font-handwritten text-base text-slate-700">Next:</p>
        <ChipRow links={page.related} />
      </div>

      <div className="pt-2">
        <BrushButton onClick={onStartProject} label="Start a Project" />
      </div>
    </MobileShell>
  );
};
