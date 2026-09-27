import { ArrowLeft, ArrowUpRight, Code2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { SPRING } from '../../motion/tokens';
import { MobileWorkHero, MobileWorkList, WorkIndexHero, WorkShowcaseRows } from '../visuals/WorkShowcase';
import type { Project, ScreenType } from '../../types';

interface ProjectsListScreenProps {
  projects: Project[];
  onOpenProjectDetail: (project: Project) => void;
  onBack?: () => void;
  onStartProject?: () => void;
  onNavigate?: (screen: ScreenType) => void;
}

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

        <div className="lg:hidden"><MobileWorkHero projects={projects} onOpenProjectDetail={onOpenProjectDetail} /></div>
        <div className="hidden lg:block">
          <WorkIndexHero projects={projects} onOpenProjectDetail={onOpenProjectDetail} onStartProject={onStartProject} />
        </div>

        <section aria-labelledby="project-list-heading">
          <div className="sticky top-0 z-20 -mx-4 border-y border-slate-200 bg-[#F8F9FA]/90 px-4 py-3 backdrop-blur-md sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0 lg:py-4">
            <h2 id="project-list-heading" className="sr-only">Case studies</h2>
            <div className="no-scrollbar flex items-center gap-3 overflow-x-auto lg:justify-between lg:overflow-visible">
              <div className="flex shrink-0 items-center gap-2" aria-label="Filter by category">
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
              <span aria-hidden="true" className="h-5 w-px shrink-0 bg-slate-300 lg:hidden" />
              <div className="flex shrink-0 items-center gap-2" aria-label="Filter by status">
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
            <>
            <div className="hidden lg:block"><WorkShowcaseRows projects={visibleProjects} onOpenProjectDetail={onOpenProjectDetail} /></div>
            <div className="lg:hidden"><MobileWorkList projects={visibleProjects} onOpenProjectDetail={onOpenProjectDetail} /></div>
            </>
          ) : (
            <div className="mt-8 rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center">
              <Code2 className="mx-auto h-7 w-7 text-slate-400" />
              <p className="mt-3 text-sm font-extrabold text-slate-700">No projects match these filters.</p>
              <button type="button" onClick={() => { setCategory('All'); setStatus('All'); }} className="mt-3 text-xs font-bold text-[#0F8B75] hover:underline">Clear filters</button>
            </div>
          )}
        </section>

        {onStartProject ? (
          <section className="mt-8 flex flex-col gap-4 rounded-3xl bg-[#101A19] p-5 text-white sm:flex-row sm:items-center sm:justify-between sm:p-7 lg:mt-12 lg:gap-5 lg:rounded-[2rem] lg:p-9">
            <div>
              <p className="text-lg font-extrabold lg:text-xl">Have an idea worth building?</p>
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
