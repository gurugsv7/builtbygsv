import React from 'react';
import { ScreenType } from '../types';
import { Home, LayoutGrid, Code2, Building2, Briefcase, Github, Linkedin, Mail, ArrowRight } from 'lucide-react';
import { SCREEN_PATHS } from '../routes';
import { brandEntity } from '../seo';
import { BrandLogo } from './BrandLogo';


interface SidebarProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  onOpenStartProject: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentScreen,
  onNavigate,
  onOpenStartProject,
}) => {
  const navItems = [
    { id: 'home' as ScreenType, label: 'Home', icon: Home },
    { id: 'projects' as ScreenType, label: 'Work', icon: LayoutGrid },
    { id: 'services' as ScreenType, label: 'Services', icon: Code2 },
    { id: 'about' as ScreenType, label: 'About us', icon: Building2 },
    { id: 'careers' as ScreenType, label: 'Careers', icon: Briefcase },
    { id: 'contact' as ScreenType, label: 'Contact', icon: Mail },
  ];

  return (
    <aside className="w-60 xl:w-64 bg-[#F3F4F6] border-r border-slate-200/80 flex flex-col justify-between p-5 h-screen sticky top-0 overflow-y-auto shrink-0 hidden lg:flex select-none z-30">
      
      {/* Top Section: Brand & Nav Links */}
      <div className="space-y-6">
        
        {/* Brand Logo */}
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2.5 cursor-pointer group px-1 pt-1 text-left"
          aria-label="Go to BuiltbyGSV home"
        >
          <BrandLogo nameClassName="text-xl" />
        </button>

        {/* Navigation Items List - Spaced out to use vertical space */}
        <nav aria-label="Main navigation" className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              currentScreen === item.id ||
              (item.id === 'projects' && currentScreen === 'project-detail') ||
              (item.id === 'services' && ['web-dev', 'software-dev', 'ai-solutions', 'automation'].includes(currentScreen));

            return (
              <a
                key={item.id}
                href={SCREEN_PATHS[item.id]}
                aria-current={isActive ? 'page' : undefined}
                onClick={(event) => {
                  event.preventDefault();
                  onNavigate(item.id);
                }}
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#E2F1ED] text-[#0F8B75] shadow-2xs font-extrabold translate-x-1'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70 hover:translate-x-0.5'
                }`}
              >
                <Icon className={`w-5 h-5 stroke-[2.2] ${isActive ? 'text-[#0F8B75]' : 'text-slate-500'}`} />
                <span>{item.label}</span>
              </a>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section: Inquiry Card Widget & Social Links */}
      <div className="space-y-5">
        
        {/* Project Callout Card - Enlarged */}
        <div className="bg-white/80 backdrop-blur-xs border border-slate-200/90 rounded-2xl p-4.5 space-y-3.5 shadow-xs hover:shadow-md transition-shadow">
          
          {/* Envelope Doodle Graphic */}
          <div className="w-11 h-11 relative flex items-center justify-center bg-[#E2F1ED]/50 rounded-xl border border-[#0F8B75]/20">
            <svg className="w-7 h-7 text-[#0F8B75]" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M 6 14 L 20 25 L 34 14" strokeLinecap="round" strokeLinejoin="round" />
              <rect x="6" y="12" width="28" height="18" rx="3" strokeWidth="1.8" />
              <path d="M 10 12 L 10 7 C 10 6 11 5 12 5 L 28 5 C 29 5 30 6 30 7 L 30 12" fill="#F8F9FA" strokeWidth="1.5" />
              <circle cx="20" cy="18" r="3" fill="#F5C748" stroke="none" />
            </svg>
            <span aria-hidden="true" className="absolute -top-1 -right-1 text-xs text-[#0F8B75] font-bold">✦</span>
          </div>

          <div className="space-y-1">
            <h4 className="font-extrabold text-sm text-[#131921] leading-snug">
              Have a project in mind?
            </h4>
            <p className="text-xs text-slate-500 font-medium leading-relaxed">
              Tell us what you're trying to build. We'll help shape the right way to engineer it.
            </p>
          </div>

          <button
            onClick={onOpenStartProject}
            id="btn-sidebar-start-project"
            className="w-full bg-[#09121F] hover:bg-slate-800 text-white py-1.5 pl-4 pr-1.5 rounded-full text-xs font-bold flex items-center justify-between transition-all cursor-pointer group shadow-xs active:scale-98"
          >
            <span>Start a Project</span>
            <div className="w-6 h-6 rounded-full bg-[#10B981] text-slate-950 flex items-center justify-center group-hover:translate-x-0.5 transition-transform shrink-0">
              <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
            </div>
          </button>
        </div>

        {/* Social Icons Row */}
        <div className="flex items-center justify-between px-2 text-slate-500 pt-1">
          <a href={brandEntity.github} target="_blank" rel="noopener noreferrer" className="hover:text-[#0F8B75] transition-colors p-1.5 hover:bg-slate-200/50 rounded-lg" aria-label="GitHub">
            <Github className="w-4 h-4" />
          </a>
          <a href={brandEntity.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-[#0F8B75] transition-colors p-1.5 hover:bg-slate-200/50 rounded-lg" aria-label="LinkedIn">
            <Linkedin className="w-4 h-4" />
          </a>
          <a href={`mailto:${brandEntity.email}`} className="hover:text-[#0F8B75] transition-colors p-1.5 hover:bg-slate-200/50 rounded-lg" aria-label="Email">
            <Mail className="w-4 h-4" />
          </a>
        </div>

      </div>

    </aside>
  );
};
