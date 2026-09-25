import React from 'react';
import { ArrowLeft, ArrowRight, BookOpen, Check, Clock, Mail, MapPin } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { blogPosts } from '../blog';

const JournalHeader = () => (
  <header className="border-b border-slate-200/80 bg-[#F8F9FA] px-5 py-5 sm:px-8 lg:px-12">
    <div className="mx-auto flex max-w-6xl items-center justify-between">
      <a href="/" aria-label="BuiltbyGSV home"><BrandLogo imageClassName="h-9 w-9" nameClassName="text-base" /></a>
      <nav aria-label="Journal navigation" className="hidden items-center gap-5 sm:flex">
        <a href="/web-software-developer-karaikal" className="flex items-center gap-2 text-xs font-extrabold text-slate-600 transition hover:text-[#0F8B75]">
          <MapPin className="h-4 w-4" /> Karaikal services
        </a>
        <a href="/contact" className="flex items-center gap-2 text-xs font-extrabold text-slate-600 transition hover:text-[#0F8B75]">
          <Mail className="h-4 w-4" /> Contact
        </a>
      </nav>
    </div>
  </header>
);

export const BlogIndexPage: React.FC = () => (
  <main className="min-h-screen bg-[#F1F4F2] text-[#131921]">
    <JournalHeader />
    <section className="px-5 pb-16 pt-14 sm:px-8 lg:px-12 lg:pb-24 lg:pt-20">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-teal-800/15 bg-white/70 px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#0F8B75]">
            <BookOpen className="h-3.5 w-3.5" /> BuiltbyGSV field notes
          </div>
          <h1 className="mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
            Useful notes for building a better{' '}
            <span className="brush-teal-highlight text-[#0F8B75]">local business.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base font-medium leading-8 text-slate-600">
            Practical guides from Gurusabarivasan M (GuruGSV / Guru GSV) about websites, software
            and local visibility, starting with the questions Karaikal businesses ask before they
            build.
          </p>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {blogPosts.map((post, index) => (
            <article
              key={post.slug}
              className="group flex min-h-[25rem] flex-col justify-between rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/5"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] font-extrabold uppercase tracking-[0.14em]">
                  <span className="text-[#0F8B75]">{post.category}</span>
                  <span className="font-mono text-slate-400">0{index + 1}</span>
                </div>
                <h2 className="mt-12 text-2xl font-extrabold leading-tight tracking-tight">
                  <a href={post.path} className="transition group-hover:text-[#0F8B75]">
                    {post.title}
                  </a>
                </h2>
                <p className="mt-5 text-sm font-medium leading-7 text-slate-600">{post.excerpt}</p>
              </div>
              <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-5">
                <span className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
                  <Clock className="h-3.5 w-3.5" /> {post.readTime}
                </span>
                <a
                  href={post.path}
                  aria-label={`Read ${post.title}`}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#101A19] text-white transition group-hover:bg-[#0F8B75]"
                >
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  </main>
);

interface BlogArticleProps {
  onStartProject: () => void;
}

export const BlogArticlePage: React.FC<BlogArticleProps> = ({ onStartProject }) => {
  const post = blogPosts.find(
    (candidate) =>
      candidate.path === window.location.pathname.replace(/\/$/, '') ||
      candidate.path === window.location.pathname,
  )!;
  const relatedPosts = blogPosts.filter((candidate) => candidate.slug !== post.slug).slice(0, 2);

  return (
    <main className="min-h-screen bg-[#F8F9FA] text-[#131921]">
      <JournalHeader />
      <article>
        <header className="border-b border-slate-200 bg-[#F1F4F2] px-5 py-14 sm:px-8 lg:px-12 lg:py-20">
          <div className="mx-auto max-w-4xl">
            <a
              href="/insights"
              className="inline-flex items-center gap-2 text-xs font-extrabold text-slate-500 transition hover:text-[#0F8B75]"
            >
              <ArrowLeft className="h-4 w-4" /> All field notes
            </a>
            <div className="mt-9 flex flex-wrap items-center gap-3 text-[11px] font-extrabold uppercase tracking-[0.14em]">
              <span className="rounded-full bg-[#E2F1ED] px-3 py-1.5 text-[#0F8B75]">{post.category}</span>
              <span className="text-slate-400">{post.readTime}</span>
            </div>
            <h1 className="mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
              {post.title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg font-medium leading-8 text-slate-600">{post.excerpt}</p>
            <div className="mt-9 flex items-center gap-3 border-t border-slate-300/70 pt-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#101A19] font-mono text-xs font-black text-[#48C9A9]">
                GSV
              </div>
              <div className="text-xs">
                <p className="font-extrabold text-slate-900">Gurusabarivasan M · GuruGSV</p>
                <p className="mt-1 font-semibold text-slate-500">
                  Published {new Date(`${post.published}T00:00:00`).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
              </div>
            </div>
          </div>
        </header>

        <div className="px-5 py-14 sm:px-8 lg:px-12 lg:py-20">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[minmax(0,1fr)_18rem]">
            <div className="max-w-3xl">
              <aside className="mb-12 rounded-[1.5rem] border-l-4 border-[#0F8B75] bg-[#E2F1ED]/70 p-6">
                <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#0F8B75]">
                  The short answer
                </p>
                <p className="mt-3 text-base font-bold leading-7 text-slate-800">{post.takeaway}</p>
              </aside>

              <div className="space-y-12">
                {post.sections.map((section) => (
                  <section key={section.heading}>
                    <h2 className="text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl">
                      {section.heading}
                    </h2>
                    <div className="mt-5 space-y-5">
                      {section.paragraphs.map((paragraph) => (
                        <p key={paragraph} className="text-[15px] font-medium leading-8 text-slate-600 sm:text-base">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                    {section.bullets ? (
                      <ul className="mt-6 space-y-3">
                        {section.bullets.map((bullet) => (
                          <li key={bullet} className="flex gap-3 text-[15px] font-semibold leading-7 text-slate-700">
                            <Check className="mt-1 h-4 w-4 shrink-0 stroke-[3] text-[#0F8B75]" />
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </section>
                ))}
              </div>
            </div>

            <aside className="h-fit rounded-[1.75rem] bg-[#101A19] p-6 text-white lg:sticky lg:top-6">
              <p className="font-handwritten text-xl text-[#F3C258]">Need a sharper website?</p>
              <p className="mt-3 text-sm font-medium leading-6 text-slate-300">
                BuiltbyGSV plans and builds fast websites and custom software for Karaikal businesses.
              </p>
              <button
                type="button"
                onClick={onStartProject}
                className="mt-6 inline-flex w-full items-center justify-between rounded-full bg-[#F3C258] px-4 py-3 text-xs font-extrabold text-[#101A19] transition hover:bg-amber-300"
              >
                Discuss your project <ArrowRight className="h-4 w-4" />
              </button>
            </aside>
          </div>
        </div>
      </article>

      <section className="border-t border-slate-200 bg-[#F1F4F2] px-5 py-14 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-extrabold tracking-tight">Continue reading</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {relatedPosts.map((related) => (
              <a
                key={related.slug}
                href={related.path}
                className="group rounded-2xl border border-slate-200 bg-white p-5 font-extrabold transition hover:border-teal-700/25 hover:text-[#0F8B75]"
              >
                <span className="text-[10px] uppercase tracking-[0.14em] text-slate-400">{related.category}</span>
                <span className="mt-2 flex items-center justify-between gap-4">
                  {related.title} <ArrowRight className="h-4 w-4 shrink-0 transition group-hover:translate-x-1" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};
