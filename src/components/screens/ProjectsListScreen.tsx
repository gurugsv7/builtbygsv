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
  PawPrint,
  Sprout,
  Video,
} from 'lucide-react';
import { useMemo, useState } from 'react';
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
            <span className="h-2 w-2 rounded-full bg-emerald-500" /> Available for new projects
          </div>
        </header>

        <section className="grid gap-8 py-12 lg:grid-cols-[1.15fr_.85fr] lg:items-end lg:py-16">
          <div>
            <p className="font-mono text-xs font-extrabold uppercase tracking-[0.18em] text-[#0F8B75]">Selected work</p>
            <h1 className="mt-4 max-w-4xl text-4xl font-extrabold leading-[1.04] tracking-tight sm:text-5xl lg:text-7xl">
              Real projects. <span className="text-[#0F8B75]">Useful outcomes.</span>
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
                Start a project <ArrowUpRight className="h-4 w-4 text-emerald-400" />
              </button>
            ) : null}
          </div>
        </section>

        <section aria-labelledby="project-list-heading">
          <div className="border-y border-slate-200 py-4">
            <h2 id="project-list-heading" className="sr-only">Project list</h2>
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar lg:pb-0" aria-label="Filter by category">
                {categories.map((item) => (
                  <button
                    type="button"
                    key={item}
                    onClick={() => setCategory(item)}
                    aria-pressed={category === item}
                    className={`shrink-0 rounded-full px-4 py-2 text-xs font-extrabold transition ${
                      category === item
                        ? 'bg-[#0F8B75] text-white'
                        : 'border border-slate-200 bg-white text-slate-600 hover:border-slate-400'
                    }`}
                  >
                    {item}
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
            <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {visibleProjects.map((project) => {
                const Icon = projectIcons[project.iconName] ?? Briefcase;
                return (
                  <article key={project.id} className="group relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/5">
                    <button
                      type="button"
                      onClick={() => onOpenProjectDetail(project)}
                      className="flex h-full w-full flex-col p-6 text-left sm:p-7"
                      aria-label={`View ${project.title} case study`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <span className={`flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-100 ${project.iconBgColor} ${project.iconTextColor}`}>
                          <Icon className="h-6 w-6" />
                        </span>
                        <span className={`rounded-full border px-2.5 py-1 text-[10px] font-extrabold ${project.statusColor ?? 'border-slate-200 bg-slate-50 text-slate-600'}`}>
                          {project.status}
                        </span>
                      </div>
                      <div className="mt-10 flex-1">
                        <div className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.15em] text-[#0F8B75]">
                          {project.category} {project.featured ? '· Featured' : ''}
                        </div>
                        <h3 className="mt-3 text-2xl font-extrabold tracking-tight transition group-hover:text-[#0F8B75]">{project.title}</h3>
                        <p className="mt-3 text-sm font-medium leading-6 text-slate-600">{project.subtitle}</p>
                        <div className="mt-5 flex flex-wrap gap-1.5">
                          {project.tags.slice(0, 4).map((tag) => (
                            <span key={tag} className="rounded-lg bg-slate-100 px-2.5 py-1 text-[10px] font-bold text-slate-600">{tag}</span>
                          ))}
                        </div>
                      </div>
                      {project.metrics?.length ? (
                        <div className="mt-7 grid grid-cols-2 gap-2 border-t border-slate-100 pt-5">
                          {project.metrics.slice(0, 2).map((metric) => (
                            <div key={metric.label}>
                              <p className="text-sm font-black text-slate-900">{metric.value}</p>
                              <p className="mt-0.5 text-[10px] font-bold text-slate-400">{metric.label}</p>
                            </div>
                          ))}
                        </div>
                      ) : null}
                      <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5 text-xs font-extrabold text-[#0F8B75]">
                        View case study
                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E2F1ED] transition group-hover:bg-[#0F8B75] group-hover:text-white">
                          <ArrowRight className="h-4 w-4" />
                        </span>
                      </div>
                    </button>
                  </article>
                );
              })}
            </div>
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
              Let's talk <ArrowUpRight className="h-4 w-4" />
            </button>
          </section>
        ) : null}
      </div>
    </main>
  );
};
