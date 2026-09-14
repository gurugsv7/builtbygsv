import React from 'react';
import { ArrowRight } from 'lucide-react';
import { LocationPage } from '../seo';
import { serviceAreaPagesForCity } from '../serviceAreas';
import { HeroIllustration } from './illustrations/HeroIllustration';
import { MobileHubPage } from './MobileSeoPages';
import {
  BrushCta,
  CurvedArrow,
  Doodles,
  HandTick,
  InkNumber,
  ProofQuote,
  QuestionList,
  SiteFooter,
  SiteHeader,
  StickyNote,
  TealUnderline,
  YellowUnderline,
} from './ServiceAreaContent';

/*
 * City hub page (/web-software-developer-<city>). Same sketchbook vocabulary as
 * the spokes, with the site's main hero illustration so the hub reads as the
 * front door for that city rather than as another service page.
 */

const HUB_FAQS = [
  {
    question: 'How do I choose the best website or software developer in {city}?',
    answer:
      'Look for relevant shipped work, clear communication, performance-minded engineering and a process that starts with your business problem. BuiltbyGSV is led by Gurusabarivasan M, known as GuruGSV, and shares the approach, expected scope and launch plan before development begins.',
  },
  {
    question: 'What can BuiltbyGSV build?',
    answer:
      'Marketing websites, web applications, internal tools, dashboards, custom business software, AI features and integrations. The stack is selected around the product instead of forcing every brief into one template.',
  },
  {
    question: 'Can we work remotely?',
    answer:
      'Yes. Projects run remotely with structured checkpoints, written progress updates and focused review calls. English and Tamil are both available for project communication.',
  },
];

interface LocationHubPageProps {
  page: LocationPage;
  onStartProject: () => void;
}

export const LocationHubPage: React.FC<LocationHubPageProps> = ({ page, onStartProject }) => (
  <>
  <div className="lg:hidden">
    <MobileHubPage page={page} onStartProject={onStartProject} />
  </div>
  <main className="hidden min-h-screen bg-[#F8F9FA] font-sans text-[#131921] antialiased lg:block">
    <SiteHeader onStartProject={onStartProject} />

    <section className="px-5 pb-12 pt-10 sm:px-8 lg:px-12 lg:pb-16 lg:pt-14">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <p className="font-handwritten text-lg text-[#0F8B75]">{page.eyebrow}</p>
          <h1 className="mt-3 text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl xl:text-[3.4rem]">
            Website developer{' '}
            <span className="relative inline-block font-handwritten text-4xl font-normal text-[#0F8B75] sm:text-5xl xl:text-[3.4rem]">
              in {page.city}.
              <YellowUnderline />
            </span>
          </h1>
          {page.alternateCity ? (
            <p className="mt-4 font-handwritten text-xl text-slate-500">
              {page.alternateCity} businesses are welcome, too.
            </p>
          ) : null}
          <p className="mt-7 max-w-2xl text-base font-medium leading-8 text-slate-700 sm:text-[17px]">{page.intro}</p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={onStartProject}
              className="flex cursor-pointer items-center gap-2 rounded-full bg-[#0B1513] py-2 pl-5 pr-2 text-sm font-extrabold text-white shadow-xs transition-all hover:bg-slate-800 active:scale-95"
            >
              <span>Start a project</span>
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0F8B75] text-white">
                <ArrowRight className="h-4 w-4 stroke-[2.5]" />
              </span>
            </button>
            <a href="/projects" className="relative inline-block font-handwritten text-lg text-slate-800 hover:text-[#0F8B75]">
              See the work first
              <TealUnderline />
            </a>
          </div>
        </div>
        <div className="relative flex flex-col items-center lg:col-span-5">
          <StickyNote lines={[`Rooted in ${page.city}.`, 'Inspired by problems.']} highlight="Driven by impact." className="z-10" />
          <div className="-mt-3">
            <HeroIllustration className="w-[280px]" />
          </div>
        </div>
      </div>
    </section>

    <section className="px-5 sm:px-8 lg:px-12">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-slate-200 bg-[#F2EFE4] p-7 sm:p-9">
        <Doodles />
        <div className="grid gap-6 sm:grid-cols-[.8fr_1.2fr] sm:gap-10">
          <div>
            <p className="font-handwritten text-2xl font-bold text-[#E85D22]">Notes from {page.city}</p>
            <h2 className="mt-2 text-2xl font-black leading-tight tracking-tight">
              Built around the work your business actually does.
            </h2>
            <CurvedArrow className="mt-4 hidden sm:block" />
          </div>
          <ul className="grid gap-3 text-sm font-semibold leading-6 text-slate-700">
            {page.localFocus.map((item) => (
              <li key={item} className="flex items-start gap-3 rounded-2xl bg-white/70 p-3.5">
                <HandTick />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>

    <section className="px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
      <div className="mx-auto grid max-w-6xl items-start gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="flex items-center gap-2">
            <span className="border-b-2 border-[#0F8B75] pb-0.5 font-mono text-xs font-bold text-[#0F8B75]">01</span>
            <span className="pl-1 text-xs font-bold uppercase tracking-widest text-slate-500">A good fit for</span>
          </div>
          <h2 className="mt-4 text-3xl font-extrabold leading-[1.2] tracking-tight xl:text-4xl">
            Local context. <span className="font-serif font-normal italic text-[#0F8B75]">Product standards.</span>
          </h2>
          <div className="mt-6 flex flex-wrap gap-2">
            {page.industries.map((industry) => (
              <span key={industry} className="rounded-xl bg-slate-200/70 px-3 py-1.5 text-xs font-bold text-slate-800">
                {industry}
              </span>
            ))}
          </div>
        </div>
        <div className="lg:col-span-7 lg:pt-9">
          <ProofQuote text={page.proof} />
        </div>
      </div>
    </section>

    {/* Hub -> spoke links. Each spoke owns a query this hub does not target. */}
    <section className="border-t border-slate-200/70 px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="flex items-center gap-2">
            <span className="border-b-2 border-[#0F8B75] pb-0.5 font-mono text-xs font-bold text-[#0F8B75]">02</span>
            <span className="pl-1 text-xs font-bold uppercase tracking-widest text-slate-500">Something specific</span>
          </div>
          <h2 className="mt-4 text-3xl font-extrabold leading-[1.2] tracking-tight">
            One page per job,{' '}
            <span className="font-serif font-normal italic text-[#0F8B75]">not one page for everything.</span>
          </h2>
          <p className="mt-4 max-w-xs text-sm font-medium leading-relaxed text-slate-600">
            Each of these goes deep on one kind of work in {page.city} instead of repeating this page with a new heading.
          </p>
        </div>
        <ol className="lg:col-span-8">
          {serviceAreaPagesForCity(page.slug).map((spoke, index) => (
            <li key={spoke.path} className="border-b border-dotted border-slate-300 first:border-t">
              <a href={spoke.path} className="group flex items-start gap-5 py-5 transition hover:text-[#0F8B75]">
                <InkNumber n={index + 1} />
                <span className="flex-1">
                  <span className="block text-lg font-extrabold tracking-tight text-[#131921] group-hover:text-[#0F8B75]">
                    {spoke.serviceName} in {spoke.city}
                  </span>
                  <span className="mt-1 block max-w-xl text-sm font-medium leading-6 text-slate-600">
                    {spoke.answer.split('. ')[0]}.
                  </span>
                </span>
                <ArrowRight className="mt-1.5 h-4 w-4 shrink-0 -rotate-45 text-slate-400 transition group-hover:rotate-0 group-hover:text-[#0F8B75]" />
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>

    <section className="border-t border-slate-200/70 px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center gap-2">
          <span className="border-b-2 border-[#0F8B75] pb-0.5 font-mono text-xs font-bold text-[#0F8B75]">03</span>
          <span className="pl-1 text-xs font-bold uppercase tracking-widest text-slate-500">Before you ask</span>
        </div>
        <h2 className="mt-4 text-3xl font-extrabold leading-[1.2] tracking-tight xl:text-4xl">
          Choosing a developer in {page.city},{' '}
          <span className="font-serif font-normal italic text-[#0F8B75]">answered straight.</span>
        </h2>
        <div className="mt-6">
          <QuestionList faqs={HUB_FAQS.map((faq) => ({ ...faq, question: faq.question.replace('{city}', page.city) }))} />
        </div>
      </div>
    </section>

    <section className="px-5 pb-6 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <BrushCta onStartProject={onStartProject} line1="Let's build" line2="something amazing" />
      </div>
    </section>

    <SiteFooter note={`Serving ${page.city}${page.alternateCity ? ` (${page.alternateCity})` : ''}, ${page.region}.`} />
  </main>
  </>
);
