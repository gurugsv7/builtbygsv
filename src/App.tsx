import { useDialogFocus } from './components/useDialogFocus';
import { CareersScreen } from './components/screens/CareersScreen';
import { WebsiteInformationScreen } from './components/screens/WebsiteInformationScreen';
import { BusinessFooter } from './components/BusinessFooter';
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { ScreenType, Project, ServiceType } from './types';
import { PROJECTS, SERVICES } from './data/mockData';
import { BottomNavBar } from './components/BottomNavBar';
import { Sidebar } from './components/Sidebar';
import { DeviceSimulatorFrame } from './components/DeviceSimulatorFrame';

// Primary Screens
import { HeroLandingScreen } from './components/screens/HeroLandingScreen';
import { HomeDashboardScreen } from './components/screens/HomeDashboardScreen';
import { ServicesOverviewScreen } from './components/screens/ServicesOverviewScreen';
import { WebDevServiceScreen } from './components/screens/WebDevServiceScreen';
import { SoftwareDevServiceScreen } from './components/screens/SoftwareDevServiceScreen';
import { AiSolutionsServiceScreen } from './components/screens/AiSolutionsServiceScreen';
import { AutomationServiceScreen } from './components/screens/AutomationServiceScreen';
import { ProjectsListScreen } from './components/screens/ProjectsListScreen';
import { ProjectDetailScreen } from './components/screens/ProjectDetailScreen';
import { ProcessScreen } from './components/screens/ProcessScreen';
import { AboutScreen } from './components/screens/AboutScreen';
import { ContactScreen } from './components/screens/ContactScreen';
import { NotFoundScreen } from './components/screens/NotFoundScreen';

// Modals and Drawers
import { ProjectDetailModal } from './components/screens/ProjectDetailModal';
import { StartProjectScreen } from './components/screens/StartProjectScreen';
import { getProjectFromPath, getScreenFromPath, SCREEN_PATHS } from './routes';
import { X, Home, LayoutGrid, Briefcase, Building2, GitCommit, Mail } from 'lucide-react';
import { BrandLogo } from './components/BrandLogo';
import { PageTransition } from './motion/primitives';
import { AnimatePresence, motion } from 'motion/react';
import { DURATION, EASE } from './motion/tokens';

const FEATURED_PROJECT = PROJECTS.find((project) => project.id === 'v2-productions') ?? PROJECTS[0];
const QUICK_NAV_ITEMS = [
  { screen: 'home' as const, label: 'Home', icon: Home, color: 'text-[#0F8B75]' },
  { screen: 'projects' as const, label: 'Work', icon: LayoutGrid, color: 'text-[#0F8B75]' },
  { screen: 'services' as const, label: 'Services', icon: Briefcase, color: 'text-[#E85D22]' },
  { screen: 'process' as const, label: 'Process', icon: GitCommit, color: 'text-teal-600' },
  { screen: 'about' as const, label: 'About us', icon: Building2, color: 'text-amber-600' },
  { screen: 'careers' as const, label: 'Careers', icon: Briefcase, color: 'text-[#0F8B75]' },
  { screen: 'contact' as const, label: 'Contact', icon: Mail, color: 'text-emerald-600' },
];

export default function App() {
  const [isMobile, setIsMobile] = useState(() => window.matchMedia('(max-width: 1023px)').matches);
  useEffect(() => {
    const query = window.matchMedia('(max-width: 1023px)');
    const update = () => setIsMobile(query.matches);
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);
  const [currentScreen, setCurrentScreenState] = useState<ScreenType>(() =>
    getScreenFromPath(window.location.pathname)
  );
  const [selectedProject, setSelectedProject] = useState<Project | null>(() =>
    getProjectFromPath(window.location.pathname)
  );
  const [bookmarkedServiceIds, setBookmarkedServiceIds] = useState<string[]>(['web-dev']);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useDialogFocus(isMenuOpen);



  const notifyRouteChange = () => {
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const setCurrentScreen = (screen: ScreenType) => {
    const nextPath = SCREEN_PATHS[screen];
    if (nextPath && window.location.pathname !== nextPath) {
      window.history.pushState({}, '', nextPath);
      notifyRouteChange();
    }
    if (screen !== 'project-detail') setSelectedProject(null);
    setCurrentScreenState(screen);
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const handleOpenProject = (project: Project) => {
    const nextPath = `/projects/${project.id}`;
    if (window.location.pathname !== nextPath) {
      window.history.pushState({}, '', nextPath);
      notifyRouteChange();
    }
    setCurrentScreenState('project-detail');
    setSelectedProject(project);
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const handleCloseProject = () => {
    setSelectedProject(null);
    setCurrentScreenState('projects');
    if (window.location.pathname.startsWith('/projects/')) {
      window.history.pushState({}, '', '/projects');
      notifyRouteChange();
    }
  };

  useEffect(() => {
    if (new URLSearchParams(window.location.search).has('startProject')) {
      window.history.replaceState({}, '', '/start-project');
      setCurrentScreenState('start-project');
      notifyRouteChange();
    }
    const handlePopState = () => {
      setCurrentScreenState(getScreenFromPath(window.location.pathname));
      setSelectedProject(getProjectFromPath(window.location.pathname));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMenuOpen(false);
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isMenuOpen]);

  const handleToggleBookmark = (serviceId: string) => {
    setBookmarkedServiceIds((prev) =>
      prev.includes(serviceId) ? prev.filter((id) => id !== serviceId) : [...prev, serviceId]
    );
  };

  const handleOpenStartProject = (service: ServiceType = 'web-dev') => {
    if (currentScreen === 'start-project') return;
    setSelectedProject(null);
    window.history.pushState({}, '', `/start-project?service=${service}`);
    notifyRouteChange();
    setCurrentScreenState('start-project');
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  // Render current screen content
  const renderScreenContent = () => {
    switch (currentScreen) {
      case 'hero':
        return (
          <>
            {/* Mobile View: Hero Splash Landing Screen */}
            <div className="block lg:hidden min-h-screen">
              <HeroLandingScreen
                onGetStarted={() => setCurrentScreen('home')}
                onStartProject={() => handleOpenStartProject('web-dev')}
              />
            </div>

            {/* Desktop View: Directly show Home Dashboard Screen */}
            <div className="hidden lg:flex flex-col justify-between min-h-screen w-full">
              <HomeDashboardScreen
                recentProject={FEATURED_PROJECT}
                onNavigate={(screen) => setCurrentScreen(screen)}
                onOpenProjectDetail={handleOpenProject}
                onOpenStartProject={() => handleOpenStartProject('web-dev')}
                onOpenMenu={() => setIsMenuOpen(true)}
              />
            </div>
          </>
        );

      case 'home':
        return (
          <HomeDashboardScreen
            recentProject={FEATURED_PROJECT}
            onNavigate={(screen) => setCurrentScreen(screen)}
            onOpenProjectDetail={handleOpenProject}
            onOpenStartProject={() => handleOpenStartProject('web-dev')}
            onOpenMenu={() => setIsMenuOpen(true)}
          />
        );

      case 'services':
        return (
          <ServicesOverviewScreen
            onBack={() => setCurrentScreen('home')}
            onNavigateToService={(screen) => setCurrentScreen(screen)}
            onStartProject={(service) => handleOpenStartProject(service)}
            onOpenMenu={() => setIsMenuOpen(true)}
          />
        );

      case 'web-dev':
        return (
          <WebDevServiceScreen
            service={SERVICES['web-dev']}
            isBookmarked={bookmarkedServiceIds.includes('web-dev')}
            onToggleBookmark={handleToggleBookmark}
            onBack={() => setCurrentScreen('services')}
            onStartProject={() => handleOpenStartProject('web-dev')}
          />
        );

      case 'software-dev':
        return (
          <SoftwareDevServiceScreen
            service={SERVICES['software-dev']}
            isBookmarked={bookmarkedServiceIds.includes('software-dev')}
            onToggleBookmark={handleToggleBookmark}
            onBack={() => setCurrentScreen('services')}
            onStartProject={() => handleOpenStartProject('software-dev')}
          />
        );

      case 'ai-solutions':
        return (
          <AiSolutionsServiceScreen
            service={SERVICES['ai-solutions']}
            isBookmarked={bookmarkedServiceIds.includes('ai-solutions')}
            onToggleBookmark={handleToggleBookmark}
            onBack={() => setCurrentScreen('services')}
            onStartProject={() => handleOpenStartProject('ai-solutions')}
          />
        );

      case 'automation':
        return (
          <AutomationServiceScreen
            service={SERVICES['automation']}
            isBookmarked={bookmarkedServiceIds.includes('automation')}
            onToggleBookmark={handleToggleBookmark}
            onBack={() => setCurrentScreen('services')}
            onStartProject={() => handleOpenStartProject('automation')}
          />
        );

      case 'projects':
        return (
          <ProjectsListScreen
            projects={PROJECTS}
            onOpenProjectDetail={handleOpenProject}
            onBack={() => setCurrentScreen('home')}
            onStartProject={() => handleOpenStartProject('web-dev')}
            onNavigate={(screen) => setCurrentScreen(screen)}
          />
        );

      case 'project-detail':
        return (
          <ProjectDetailScreen
            project={selectedProject || PROJECTS[0]}
            onBack={handleCloseProject}
            onOpenStartProject={() => handleOpenStartProject('web-dev')}
          />
        );

      case 'process':
        return (
          <ProcessScreen
            onBack={() => setCurrentScreen('home')}
            onStartProject={() => handleOpenStartProject('web-dev')}
          />
        );

      case 'about':
        return (
          <AboutScreen
            onBack={() => setCurrentScreen('home')}
            onOpenMenu={() => setIsMenuOpen(true)}
            onStartProject={() => handleOpenStartProject('web-dev')}
          />
        );

      case 'start-project':
        return <StartProjectScreen />;

      case 'careers':
        return <CareersScreen />;

      case 'website-information':
        return <WebsiteInformationScreen />;

      case 'contact':
        return (
          <ContactScreen
            onBack={() => setCurrentScreen('home')}
            onStartProject={() => handleOpenStartProject('web-dev')}
          />
        );

      case 'not-found':
        return <NotFoundScreen onNavigate={(screen) => setCurrentScreen(screen)} />;

      default:
        return <NotFoundScreen onNavigate={(screen) => setCurrentScreen(screen)} />;
    }
  };

  return (
    <DeviceSimulatorFrame>
      <div className="flex min-h-screen bg-[#F8F9FA] text-[#131921] relative">
        {/* Left Desktop Sidebar Navigation */}
        <Sidebar
          currentScreen={currentScreen === 'hero' ? 'home' : currentScreen}
          onNavigate={(screen) => setCurrentScreen(screen)}
          onOpenStartProject={() => handleOpenStartProject('web-dev')}
        />

        {/* Right Main Content Area */}
        <div className="flex-1 flex flex-col justify-between min-w-0 min-h-screen relative overflow-x-hidden">
          {/* Dynamic Screen View Content */}
          <div
            className={`flex-1 flex flex-col justify-between ${
              currentScreen !== 'hero' ? 'pb-24 lg:pb-0' : ''
            }`}
          >
            <PageTransition routeKey={`${currentScreen}:${selectedProject?.id ?? ''}`}>
              {renderScreenContent()}
            </PageTransition>
            <div className={currentScreen === 'hero' ? 'hidden lg:block' : ''}><BusinessFooter /></div>
          </div>

          {/* Bottom Navigation Bar (Mobile only) */}
          {currentScreen !== 'hero' && currentScreen !== 'not-found' && (
            <BottomNavBar
              currentScreen={currentScreen}
              onNavigate={(screen) => setCurrentScreen(screen)}
              onOpenStartProject={() => handleOpenStartProject('web-dev')}
            />
          )}
        </div>

        {/* Quick Menu Slide-over Drawer */}
        <AnimatePresence>
        {isMenuOpen && (
          <motion.div key="quick-menu" className="fixed inset-0 z-50 flex bg-slate-900/60 backdrop-blur-xs"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: DURATION.base }}>
            <motion.div initial={{ x: -24 }} animate={{ x: 0 }} exit={{ x: -24 }} transition={{ duration: DURATION.base, ease: EASE.out }} className="h-full">
            <div ref={menuRef} tabIndex={-1} role="dialog" aria-modal="true" aria-labelledby="quick-menu-title" className="bg-white w-72 h-full overflow-y-auto shadow-2xl p-5 flex flex-col justify-between">
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b pb-4">
                  <div className="flex items-center gap-2">
                    <BrandLogo nameClassName="text-sm" />
                    <span id="quick-menu-title" className="sr-only">BuiltbyGSV Menu</span>
                  </div>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    id="btn-close-menu"
                    aria-label="Close navigation menu"
                    className="p-1 rounded-full text-slate-500 hover:bg-slate-100"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-2">
                  <p className="text-[10px] font-bold uppercase text-slate-400">Navigation</p>

                  {QUICK_NAV_ITEMS.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.screen}
                        onClick={() => {
                          setCurrentScreen(item.screen);
                          setIsMenuOpen(false);
                        }}
                        className="flex w-full items-center gap-2 rounded-xl p-2.5 text-left text-xs font-bold text-slate-800 hover:bg-slate-100"
                      >
                        <Icon className={`h-4 w-4 ${item.color}`} />
                        {item.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 text-center">
                <div className="mb-5 flex flex-wrap justify-center gap-4 text-xs font-bold text-slate-500"><a href="/insights">Insights</a><a href="/pricing">Pricing</a><a href="/faq">FAQs</a></div>
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    handleOpenStartProject('web-dev');
                  }}
                  className="w-full bg-[#0F8B75] text-white text-xs font-extrabold py-3 rounded-2xl shadow-xs"
                >
                  Start a Project
                </button>
              </div>
            </div>
            </motion.div>
          </motion.div>
        )}
        </AnimatePresence>

        {/* Project Case Study Detail Modal (Mobile Only) */}
        {selectedProject && isMobile && (
          <div className="block lg:hidden">
            <ProjectDetailModal
              project={selectedProject}
              onClose={handleCloseProject}
              onStartSimilarProject={() => handleOpenStartProject('web-dev')}
            />
          </div>
        )}


      </div>
    </DeviceSimulatorFrame>
  );
}
