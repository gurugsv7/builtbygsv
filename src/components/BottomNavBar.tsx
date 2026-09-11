import React from 'react';
import { Home, LayoutGrid, Briefcase, User, Code2 } from 'lucide-react';
import { ScreenType } from '../types';
import { SCREEN_PATHS } from '../routes';

interface BottomNavBarProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  onOpenStartProject: () => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  currentScreen,
  onNavigate,
  onOpenStartProject,
}) => {
  const navItems = [
    { id: 'home' as ScreenType, label: 'Home', icon: Home },
    { id: 'projects' as ScreenType, label: 'Projects', icon: LayoutGrid },
    { id: 'start-action', label: 'Start', icon: Code2, isCenter: true },
    { id: 'services' as ScreenType, label: 'Services', icon: Briefcase },
    { id: 'profile' as ScreenType, label: 'Me', icon: User },
  ];

  return (
    <nav
      aria-label="Primary navigation"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-5 bg-gradient-to-t from-[#F8F9FA] via-[#F8F9FA]/95 to-transparent pointer-events-none"
    >
      <div className="bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-full shadow-lg shadow-slate-900/5 px-3 py-2 flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          if (item.isCenter) {
            return (
              <button
                key="center-cta"
                onClick={onOpenStartProject}
                className="pointer-events-auto relative -top-5 bg-[#00C4CC] hover:bg-[#00b2b8] text-white w-13 h-13 rounded-full flex items-center justify-center shadow-lg shadow-[#00C4CC]/35 transition-transform active:scale-95 border-2 border-white cursor-pointer"
                title="Start a Project"
                id="btn-center-start-project"
              >
                <span className="font-mono font-black text-white text-base tracking-tighter">&lt;/&gt;</span>
              </button>
            );
          }

          const Icon = item.icon;
          const isActive =
            currentScreen === item.id ||
            (item.id === 'projects' && currentScreen === 'project-detail') ||
            (item.id === 'services' &&
              (currentScreen === 'services' ||
                currentScreen === 'web-dev' ||
                currentScreen === 'software-dev' ||
                currentScreen === 'ai-solutions' ||
                currentScreen === 'automation'));

          return (
            <a
              key={item.id}
              href={SCREEN_PATHS[item.id as ScreenType]}
              onClick={(event) => {
                event.preventDefault();
                onNavigate(item.id as ScreenType);
              }}
              id={`nav-item-${item.id}`}
              className={`pointer-events-auto flex flex-col items-center gap-0.5 py-1 px-3 rounded-2xl transition-colors ${
                isActive ? 'text-[#0F8B75] font-semibold' : 'text-slate-400 hover:text-slate-700'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
              <span className="text-[10px] tracking-tight">{item.label}</span>
              {isActive && (
                <span className="w-1 h-1 rounded-full bg-[#0F8B75] mt-0.5 animate-pulse" />
              )}
            </a>
          );
        })}
      </div>
    </nav>
  );
};
