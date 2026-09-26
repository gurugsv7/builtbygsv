import type { LucideIcon } from 'lucide-react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  Code2,
  Coins,
  Cross,
  Gamepad2,
  Heart,
  PawPrint,
  Sprout,
  Video,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { WORK_SUMMARIES } from '../../data/studio';
import { DURATION, EASE, SPRING } from '../../motion/tokens';
import v2Preview from '../../assets/v2productions/hero.png';

const PROJECT_PREVIEWS: Record<string, string> = { 'v2-productions': v2Preview };
import type { Project, ScreenType } from '../../types';

interface ProjectsListScreenProps {
  projects: Project[];
  onOpenProjectDetail: (project: Project) => void;
  onBack?: () => void;
  onStartProject?: () => void;
  onNavigate?: (screen: ScreenType) => void;
}

const projectIcons: Record<string, LucideIcon> = {
  Briefcase,
  Coins,
  Cross,
  Gamepad2,
  Heart,
  PawPrint,
  Sprout,
  Video,
};

export const ProjectsListScreen = ({
  projects,
  onOpenProjectDetail,
  onBack,
  onStartProject,
  onNavigate,
}: ProjectsListScreenProps) => {
  const [category, setCategory] = useState<Project['category'] | 'All'>('All');
  const [status, setStatus] = useState<Project['status'] | 'All'>('All');
  const categories = useMemo(
    () => ['All', ...new Set(projects.map((project) => project.category))] as const,
    [projects],
  );
  const statuses = useMemo(
    () => ['All', ...new Set(projects.map((project) => project.status))] as const,
    [projects],
  );
  const visibleProjects = projects.filter(
    (project) =>
      (category === 'All' || project.category === category) &&
      (status === 'All' || project.status === status),
  );
  const goBack = onBack ?? (() => onNavigate?.('home'));

  return (
    <main className="min-h-screen bg-[#F8F9FA] px-4 pb-28 pt-4 text-[#131921] sm:px-6 lg:px-10 lg:pb-16 lg:pt-8">
      <div className="mx-auto max-w-7xl">
        <header className="flex items-center justify-between">
          <button
            type="button"
            onClick={goBack}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-extrabold text-slate-700 transition hover:border-slate-400"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
          <div className="hidden items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-extrabold text-emerald-700 sm:flex">
            <span className="h-2 w-2 rounded-full bg-emerald-500" /> Product & AI Engineering Studio
          </div>
        </header>

        <section className="grid gap-8 py-12 lg:grid-cols-[1.15fr_.85fr] lg:items-end lg:py-16">
          <div>
            <p className="font-mono text-xs font-extrabold uppercase tracking-[0.18em] text-[#0F8B75]">Selected work</p>
            <h1 className="mt-4 max-w-4xl text-4xl font-extrabold leading-[1.04] tracking-tight sm:text-5xl lg:text-7xl">
              Engineered products. <span className="text-[#0F8B75]">Considered systems.</span>
            </h1>
          </div>
          <div className="lg:pb-2">
            <p className="max-w-xl text-sm font-medium leading-7 text-slate-600 sm:text-base">
              A selection of web, software, and AI products—each shaped around a concrete problem, a maintainable implementation, and a clear next step.
            </p>
            {onStartProject ? (
              <button
                type="button"
                onClick={onStartProject}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#09121F] px-5 py-3 text-sm font-extrabold text-white transition hover:bg-slate-800"
              >
                Start a Project <ArrowUpRight className="h-4 w-4 text-emerald-400" />
              </button>
            ) : null}
          </div>
        </section>

        <section aria-labelledby="project-list-heading">
          <div className="border-y border-slate-200 py-4">
            <h2 id="project-list-heading" className="sr-only">Case studies</h2>
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar lg:pb-0" aria-label="Filter by category">
                {categories.map((item) => (
                  <button
                    type="button"
                    key={item}
                    onClick={() => setCategory(item)}
                    aria-pressed={category === item}
                    className={`relative shrink-0 rounded-full px-4 py-2 text-xs font-extrabold transition-colors ${
                      category === item
                        ? 'text-white'
                        : 'border border-slate-200 bg-white text-slate-600 hover:border-slate-400'
                    }`}
                  >
                    {category === item && <motion.span layoutId="work-category" transition={SPRING.gentle} className="absolute inset-0 rounded-full bg-[#0F8B75]" />}
                    <span className="relative">{item}</span>
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar lg:pb-0" aria-label="Filter by status">
                {statuses.map((item) => (
                  <button
                    type="button"
                    key={item}
                    onClick={() => setStatus(item)}
                    aria-pressed={status === item}
                    className={`shrink-0 rounded-full px-3 py-1.5 text-[11px] font-bold transition ${
                      status === item ? 'bg-slate-900 text-white' : 'text-slate-500 hover:bg-slate-200'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {visibleProjects.length ? (
            <motion.div layout className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {visibleProjects.map((project) => {
                const Icon = projectIcons[project.iconName] ?? Briefcase;
                return (
                  <motion.article layout key={project.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ layout: SPRING.gentle, duration: DURATION.reveal, ease: EASE.out }}
                    className="lift group relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white hover:border-[#0F8B75]/50">
                    <button
                      type="button"
                      onClick={() => onOpenProjectDetail(project)}
                      className="flex h-full w-full flex-col text-left"
                      aria-label={`View ${project.title} case study`}
                    >
                      <div className={`zoom-frame relative flex h-44 items-center justify-center border-b border-slate-100 ${project.iconBgColor}`}>
                        {PROJECT_PREVIEWS[project.id] ? (
                          <img src={PROJECT_PREVIEWS[project.id]} alt="" loading="lazy" className="h-full w-full object-cover object-top" />
                        ) : (
                          <>
                            <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(currentColor_1px,transparent_1px)] [background-size:14px_14px] opacity-15" />
                            <span className={`relative flex h-16 w-16 items-center justify-center rounded-2xl border border-white bg-white/80 shadow-sm transition-transform duration-500 group-hover:-translate-y-1 ${project.iconTextColor}`}>
                              <Icon className="h-8 w-8" />
                            </span>
                          </>
                        )}
                        <span className={`absolute right-4 top-4 rounded-full border px-2.5 py-1 text-[10px] font-extrabold ${project.statusColor ?? 'border-slate-200 bg-slate-50 text-slate-600'}`}>
                          {project.status}
                        </span>
                      </div>
                      <div className="flex flex-1 flex-col p-6 sm:p-7">
                        <div className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-[#0F8B75]">{project.detailData?.engagement}</div>
                        <h3 className="mt-2 text-2xl font-extrabold tracking-tight transition group-hover:text-[#0F8B75]">{project.title}</h3>
                        {WORK_SUMMARIES[project.id] ? (
                          <dl className="mt-4 flex-1 space-y-3 text-sm leading-6">
                            <div><dt className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400">Problem</dt><dd className="text-slate-700">{WORK_SUMMARIES[project.id].problem}</dd></div>
                            <div><dt className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400">Built</dt><dd className="text-slate-700">{WORK_SUMMARIES[project.id].built}</dd></div>
                          </dl>
                        ) : (
                          <p className="mt-3 flex-1 text-sm font-medium leading-6 text-slate-600">{project.subtitle}</p>
                        )}
                        <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5">
                          <span className="font-mono text-[11px] text-slate-500">{project.tags.slice(0, 3).join(' · ')}</span>
                          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E2F1ED] text-[#0F8B75] transition group-hover:bg-[#0F8B75] group-hover:text-white">
                            <ArrowRight className="nudge-r h-4 w-4" />
                          </span>
                        </div>
                      </div>
                    </button>
                  </motion.article>
                );
              })}
            </motion.div>
          ) : (
            <div className="mt-8 rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center">
              <Code2 className="mx-auto h-7 w-7 text-slate-400" />
              <p className="mt-3 text-sm font-extrabold text-slate-700">No projects match these filters.</p>
              <button type="button" onClick={() => { setCategory('All'); setStatus('All'); }} className="mt-3 text-xs font-bold text-[#0F8B75] hover:underline">Clear filters</button>
            </div>
          )}
        </section>

        {onStartProject ? (
          <section className="mt-12 flex flex-col gap-5 rounded-[2rem] bg-[#101A19] p-7 text-white sm:flex-row sm:items-center sm:justify-between lg:p-9">
            <div>
              <p className="text-xl font-extrabold">Have an idea worth building?</p>
              <p className="mt-1 text-sm font-medium text-slate-300">Share the problem. We’ll shape the right first version.</p>
            </div>
            <button type="button" onClick={onStartProject} className="inline-flex items-center gap-2 self-start rounded-full bg-emerald-400 px-5 py-3 text-xs font-extrabold text-[#101A19] transition hover:bg-emerald-300 sm:self-auto">
              Start a Project <ArrowUpRight className="h-4 w-4" />
            </button>
          </section>
        ) : null}
      </div>
    </main>
  );
};
