import React from 'react';
import { StudioHomeSections } from '../StudioHomeSections';
import { MobileStudioOverview } from '../MobileStudioOverview';
import { ArrowRight, ArrowUpRight, Menu, Mail } from 'lucide-react';
import { motion, stagger, type Variants } from 'motion/react';
import { StudioHeroScene } from '../illustrations/StudioHeroScene';
import { DrawnUnderline } from '../../motion/primitives';
import { EASE, STAGGER } from '../../motion/tokens';

const heroGroup: Variants = { hidden: {}, shown: { transition: { delayChildren: stagger(STAGGER * 1.4) } } };
const heroItem: Variants = {
  hidden: { opacity: 0, y: 14 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE.out } },
};
import { Project, ScreenType } from '../../types';

interface HomeDashboardScreenProps {
  recentProject: Project;
  onNavigate: (screen: ScreenType) => void;
  onOpenProjectDetail: (project: Project) => void;
  onOpenStartProject: () => void;
  onOpenMenu: () => void;
}

export const HomeDashboardScreen: React.FC<HomeDashboardScreenProps> = ({
  recentProject,
  onNavigate,
  onOpenProjectDetail,
  onOpenStartProject,
  onOpenMenu,
}) => {
  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#131921] flex flex-col justify-between font-sans antialiased relative">
      
      {/* ============================================================== */}
      {/* ===================== MOBILE VIEW (lg:hidden) ================ */}
      {/* ============================================================== */}
      <div className="block lg:hidden min-h-screen flex flex-col justify-between pb-6 px-4 pt-3 max-w-xl mx-auto w-full space-y-5">
        
        {/* Mobile navigation and business contact */}
        <div className="flex items-center justify-between pt-1">
          <button
            onClick={onOpenMenu}
            className="p-1 rounded-full text-slate-800 hover:bg-slate-200/60 transition-colors cursor-pointer"
            aria-label="Open Navigation Menu"
            id="btn-mobile-home-menu"
          >
            <Menu className="w-6 h-6 stroke-[2]" />
          </button>

          <button
            onClick={() => onNavigate('contact')}
            className="p-1 rounded-full text-slate-800 hover:bg-slate-200/60 transition-colors relative cursor-pointer"
            aria-label="Contact BuiltbyGSV"
            id="btn-mobile-home-contact"
          >
            <Mail className="w-6 h-6 stroke-[2]" />

          </button>
        </div>

        {/* Greeting & Headline */}
        <div className="space-y-1 pt-1">
          <div className="flex items-center gap-1.5 text-base font-extrabold text-[#131921]">
            <span className="text-[10px] uppercase tracking-widest text-[#0F8B75]">Product &amp; AI Engineering Studio</span>
            <span className="text-lg">✦</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#131921] tracking-tight leading-[1.12]">
            Digital products.<br />
            <span className="text-[#0F8B75] relative inline-block">
              Built for business.
              {/* Hand-drawn green underline curve under build */}
              <svg
                className="absolute -bottom-1 left-0 w-full h-2.5 text-[#0F8B75] overflow-visible pointer-events-none"
                viewBox="0 0 80 10"
                fill="none"
                stroke="currentColor"
                strokeWidth="3.2"
                strokeLinecap="round"
              >
                <path d="M 2 5 C 25 2, 55 8, 78 4" />
              </svg>
            </span>
          </h1>
        </div>

        {/* Dark Brush Banner Card */}
        <button type="button" aria-label="Start a Project"
          onClick={onOpenStartProject}
          id="banner-mobile-brush-cta"
          className="text-left bg-[#051722] text-white rounded-3xl p-5 sm:p-6 relative overflow-hidden shadow-xl cursor-pointer group border border-slate-800/80 my-1"
        >
          {/* Subtle White Doodle Accents */}
          <div className="absolute top-3 left-4 text-white/20 text-xs select-none">✦</div>
          <div className="absolute bottom-3 right-14 text-white/20 text-xs select-none">✚</div>
          
          <div className="flex items-center justify-between gap-3 relative z-10">
            <div className="space-y-1 max-w-[210px]">
              <h3 className="text-lg sm:text-xl font-extrabold leading-snug text-white tracking-tight">
                Product. Software. AI.<br />
                Purpose-built digital<br />
                <span className="relative inline-block pb-0.5">
                  products.
                  {/* Yellow hand-drawn underline */}
                  <svg
                    className="absolute -bottom-1 left-0 w-full h-2 text-[#F5C748] overflow-visible pointer-events-none"
                    viewBox="0 0 90 8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.8"
                    strokeLinecap="round"
                  >
                    <path d="M 2 4 C 30 1, 60 7, 88 3" />
                  </svg>
                </span>
              </h3>
            </div>

            {/* Circular Teal Arrow Button */}
            <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-[#0F8B75] group-hover:bg-[#0c7260] text-white flex items-center justify-center shrink-0 shadow-md transition-all group-hover:scale-105">
              <ArrowRight className="w-6 h-6 stroke-[2.5]" />
            </div>
          </div>
        </button>

        <MobileStudioOverview recentProject={recentProject} onNavigate={onNavigate} onOpenProjectDetail={onOpenProjectDetail} />
      </div>

      {/* ============================================================== */}
      {/* ==================== DESKTOP VIEW (hidden lg:flex) ============= */}
      {/* ============================================================== */}
      <div className="hidden lg:flex flex-col justify-between min-h-screen w-full">
        
        {/* ================= TOP HEADER BAR ================= */}
        <header className="w-full max-w-[1600px] mx-auto px-6 lg:px-10 pt-3 pb-1 flex items-center justify-between z-30 shrink-0">
          <div className="flex justify-end w-full">
            <button
              onClick={onOpenStartProject}
              id="btn-header-lets-talk"
              className="bg-[#09121F] hover:bg-slate-800 text-white pl-4 pr-1.5 py-1.5 rounded-full text-xs sm:text-sm font-bold flex items-center gap-2.5 shadow-xs transition-all cursor-pointer active:scale-95 group"
            >
              <span>Start a Project</span>
              <div className="w-6 h-6 rounded-full bg-[#10B981] text-slate-950 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.8]" />
              </div>
            </button>
          </div>
        </header>

        {/* ================= MAIN HERO BODY ================= */}
        <main className="w-full max-w-[1600px] mx-auto px-6 lg:px-10 py-2 flex-1 flex flex-col justify-between relative min-h-0">
          
          {/* Main Hero Grid - Scaled to fill vertical and horizontal space */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center py-8 lg:py-12">
            
            {/* LEFT COLUMN: HERO TEXT & CTAs */}
            <motion.div className="lg:col-span-6 space-y-4" initial="hidden" animate="shown" variants={heroGroup}>
              
              {/* Status Pill Badge */}
              <motion.div variants={heroItem} className="inline-flex items-center gap-2.5 bg-white border border-slate-200/90 shadow-2xs px-4 py-1.5 rounded-full">
                <span className="w-2 h-2 shrink-0 rounded-full bg-[#10B981]" />
                <span className="text-[10px] xl:text-xs font-extrabold text-slate-700 tracking-wider uppercase">
                  PRODUCT & AI ENGINEERING STUDIO
                </span>
              </motion.div>

              {/* Display Headline - Larger font & impactful line height */}
              <motion.div variants={heroItem} className="space-y-1">
                <h1 className="text-4xl sm:text-5xl lg:text-[3.2rem] xl:text-[3.85rem] font-extrabold tracking-tight text-[#131921] leading-[1.06]">
                  We build digital<br />
                  products that<br />
                  <span className="font-serif italic text-[#0F8B75] relative inline-block font-normal pt-1">
                    create real impact.
                    <DrawnUnderline className="-bottom-2 h-4" delay={0.7} />
                  </span>
                </h1>
              </motion.div>

              {/* Subtitle Description - Enlarged */}
              <motion.div variants={heroItem} className="space-y-1 text-slate-600 text-sm sm:text-base font-medium max-w-lg leading-relaxed pt-1">
                <p className="font-extrabold text-slate-900 text-base sm:text-lg">Product. Software. AI.</p>
                <p className="text-slate-600 font-medium">Custom software, web platforms and AI systems engineered around real business problems.</p>
              </motion.div>

              {/* CTA Buttons Row - Enlarged buttons */}
              <motion.div variants={heroItem} className="flex flex-wrap items-center gap-4 pt-3">
                <button
                  onClick={onOpenStartProject}
                  id="btn-hero-build-something"
                  className="press group bg-[#09121F] hover:bg-slate-800 text-white pl-5 pr-2 py-3 rounded-full text-sm font-bold flex items-center gap-3 shadow-md cursor-pointer"
                >
                  <span>Start a Project</span>
                  <div className="w-6 h-6 rounded-full bg-[#10B981] text-slate-950 flex items-center justify-center shrink-0">
                    <ArrowRight className="nudge-r w-3.5 h-3.5 stroke-[3]" />
                  </div>
                </button>

                <button
                  onClick={() => onNavigate('projects')}
                  id="btn-hero-view-work"
                  className="group text-[#131921] hover:text-[#0F8B75] font-extrabold text-sm flex items-center gap-1.5 transition-colors cursor-pointer px-3 py-2"
                >
                  <span className="u-link">Explore Our Work</span>
                  <ArrowUpRight className="nudge-ur w-4 h-4 stroke-[2.8]" />
                </button>
              </motion.div>

            </motion.div>


            <StudioHeroScene />

          </div>


          <StudioHomeSections onNavigate={onNavigate} onOpenProjectDetail={onOpenProjectDetail} onOpenStartProject={onOpenStartProject} />

        </main>
      </div>

    </div>
  );
};

