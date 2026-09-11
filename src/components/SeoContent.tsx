import React from 'react';
import { ArrowRight, Code2 } from 'lucide-react';
import { locationPages } from '../seo';

interface SeoContentProps {
  onStartProject: () => void;
}

export const HomepageSeoSection: React.FC<SeoContentProps> = ({ onStartProject }) => (
  <section
    aria-labelledby="builtbygsv-studio-heading"
    className="border-t border-slate-200 bg-[#F1F4F2] px-5 py-16 sm:px-8 lg:px-12 lg:py-24"
  >
    <div className="mx-auto max-w-6xl">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-teal-800/15 bg-white/70 px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#0F8B75]">
            <Code2 className="h-3.5 w-3.5" />
            Independent product studio
          </div>
          <h2
            id="builtbygsv-studio-heading"
            className="max-w-3xl text-3xl font-extrabold leading-tight tracking-tight text-[#131921] sm:text-4xl lg:text-5xl"
          >
            BuiltbyGSV builds useful software with a{' '}
            <span className="brush-teal-highlight text-[#0F8B75]">human pulse.</span>
          </h2>
        </div>
        <p className="max-w-xl text-sm font-medium leading-7 text-slate-600 lg:pb-1">
          BuiltbyGSV is the web and software development practice of{' '}
          <strong className="font-extrabold text-slate-900">Gurusabarivasan M</strong>, known online
          as <strong className="font-extrabold text-slate-900">GuruGSV</strong> and{' '}
          <strong className="font-extrabold text-slate-900">Guru GSV</strong>. The studio creates
          responsive websites, custom business software, AI features and reliable automations for
          teams in Karaikal, Bengaluru, Thanjavur and Puducherry that value clear thinking and
          careful execution.
        </p>
      </div>

      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {locationPages.map((page, index) => (
          <a
            key={page.slug}
            href={page.path}
            className="group rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-teal-700/25 hover:shadow-xl hover:shadow-slate-900/5"
          >
            <div className="flex items-start justify-between">
              <span className="font-mono text-xs font-bold text-[#0F8B75]">0{index + 1}</span>
              <ArrowRight className="h-4 w-4 -rotate-45 text-slate-400 transition group-hover:rotate-0 group-hover:text-[#0F8B75]" />
            </div>
            <h3 className="mt-10 text-xl font-extrabold tracking-tight text-[#131921]">
              {page.city}
              {page.alternateCity ? (
                <span className="block text-sm font-bold text-slate-400">also {page.alternateCity}</span>
              ) : null}
            </h3>
            <p className="mt-3 text-sm font-medium leading-6 text-slate-600">
              Website development, custom software and digital product development for {page.city}
              businesses.
            </p>
          </a>
        ))}
      </div>

      {/* Keeps the reference pages one click from the homepage rather than orphaned. */}
      <nav aria-label="Reference pages" className="mt-10 flex flex-wrap gap-3">
        {[
          { path: '/pricing', label: 'What it costs' },
          { path: '/faq', label: 'Common questions' },
          { path: '/compare/freelance-developer-vs-web-development-agency', label: 'Freelancer, agency or studio?' },
          { path: '/insights', label: 'Field notes' },
        ].map((link) => (
          <a
            key={link.path}
            href={link.path}
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-3 text-xs font-extrabold text-slate-800 transition hover:border-[#0F8B75] hover:text-[#0F8B75]"
          >
            {link.label}
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        ))}
      </nav>

      <div className="mt-10 flex flex-col items-start justify-between gap-5 rounded-[1.75rem] bg-[#101A19] p-6 text-white sm:flex-row sm:items-center lg:p-8">
        <div>
          <p className="font-handwritten text-xl text-[#F3C258]">Have a useful idea?</p>
          <p className="mt-1 text-sm font-semibold text-slate-300">
            Let's turn it into a fast, focused product.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <a
            href="/insights"
            className="rounded-full border border-white/20 px-5 py-3 text-xs font-extrabold text-white transition hover:border-white/50"
          >
            Read field notes
          </a>
          <button
            type="button"
            onClick={onStartProject}
            className="inline-flex items-center gap-2 rounded-full bg-[#F3C258] px-5 py-3 text-xs font-extrabold text-[#101A19] transition hover:-translate-y-0.5 hover:bg-amber-300"
          >
            Start a project <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  </section>
);

