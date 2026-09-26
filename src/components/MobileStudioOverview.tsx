import { ArrowRight, ChevronRight, Code2, Cpu, Laptop, Video, Workflow } from 'lucide-react';
import type { Project, ScreenType } from '../types';
import { motion } from 'motion/react';
import { groupVariants, itemVariants } from '../motion/primitives';

interface Props {
  recentProject: Project;
  onNavigate: (screen: ScreenType) => void;
  onOpenProjectDetail: (project: Project) => void;
}

const capabilities = [
  { screen: 'web-dev', title: 'Product Engineering', icon: Laptop, color: 'bg-[#D5EAE3] text-[#0F8B75]', border: 'border-b-[#0F8B75]' },
  { screen: 'software-dev', title: 'Custom Software', icon: Code2, color: 'bg-[#FEF3C7] text-[#D97706]', border: 'border-b-[#F59E0B]' },
  { screen: 'ai-solutions', title: 'AI Systems', icon: Cpu, color: 'bg-[#E2E8F0] text-[#475569]', border: 'border-b-[#64748B]' },
  { screen: 'automation', title: 'Automation', icon: Workflow, color: 'bg-[#FFEDD5] text-[#EA580C]', border: 'border-b-[#F97316]' },
] as const;

/** Compact app dashboard. Desktop's editorial sections stay in StudioHomeSections. */
export function MobileStudioOverview({ recentProject, onNavigate, onOpenProjectDetail }: Props) {
  return <>
    <section className="space-y-3 pt-1" aria-label="What we build">
      <h2 className="inline-block border-b-2 border-[#0F8B75] pb-1 font-serif text-2xl font-extrabold italic">What we build.</h2>
      <motion.div className="grid grid-cols-2 gap-3" initial="hidden" animate="shown" variants={groupVariants}>
        {capabilities.map(({ screen, title, icon: Icon, color, border }) => (
          <motion.button variants={itemVariants} key={screen} onClick={() => onNavigate(screen)} className={`flex items-center gap-2.5 rounded-2xl border border-slate-200/90 border-b-2 bg-white p-3.5 text-left shadow-2xs transition-transform active:scale-[0.97] ${border}`}>
            <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${color}`}><Icon className="h-5 w-5" /></span>
            <span className="text-xs font-extrabold leading-tight">{title}</span>
          </motion.button>
        ))}
      </motion.div>
    </section>
    <section className="space-y-2.5 pt-1" aria-label="Selected work">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-extrabold">Selected Work</h2>
        <button onClick={() => onNavigate('projects')} id="btn-mobile-recent-projects-view-all" className="py-1 text-xs font-bold text-[#0F8B75]">View all</button>
      </div>
      <button onClick={() => onOpenProjectDetail(recentProject)} id="card-mobile-recent-project" className="flex w-full items-center gap-3 rounded-2xl border border-slate-200/90 bg-white p-4 text-left shadow-2xs transition-transform active:scale-[0.98]">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-teal-100 bg-[#D5EAE3] text-[#0F8B75]"><Video className="h-6 w-6" /></span>
        <span className="min-w-0 flex-1">
          <span className="block text-base font-extrabold">{recentProject.title}</span>
          <span className="mt-1 block text-xs text-slate-500">Creative Studio Platform</span>
          <span className="mt-1 block text-[10px] font-bold text-[#0F8B75]">Client work · Case study</span>
        </span>
        <ChevronRight className="h-5 w-5 shrink-0 text-slate-400" />
      </button>
    </section>
    <div className="grid grid-cols-2 gap-3 pb-3">
      {[{ screen: 'careers', title: 'Careers', subtitle: 'We’re hiring interns' }, { screen: 'process', title: 'How we build', subtitle: 'Scope to release' }].map(item => (
        <button key={item.screen} onClick={() => onNavigate(item.screen as ScreenType)} className="flex items-center justify-between gap-2 rounded-2xl border border-slate-200/80 bg-[#E2F1ED]/40 p-3 text-left transition-transform active:scale-[0.97]">
          <span><span className="block text-xs font-extrabold">{item.title}</span><span className="mt-1 block text-[10px] text-slate-500">{item.subtitle}</span></span>
          <ArrowRight className="h-3.5 w-3.5 shrink-0 text-[#0F8B75]" />
        </button>
      ))}
    </div>
  </>;
}
