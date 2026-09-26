import React from 'react';
import { StudioHomeSections } from '../StudioHomeSections';
import { MobileStudioOverview } from '../MobileStudioOverview';
import { ArrowRight, ArrowUpRight, Menu, Mail } from 'lucide-react';
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
            <div className="lg:col-span-6 space-y-4">
              
              {/* Status Pill Badge */}
              <div className="inline-flex items-center gap-2.5 bg-white border border-slate-200/90 shadow-2xs px-4 py-1.5 rounded-full">
                <span className="w-2 h-2 shrink-0 rounded-full bg-[#10B981]" />
                <span className="text-[10px] xl:text-xs font-extrabold text-slate-700 tracking-wider uppercase">
                  PRODUCT & AI ENGINEERING STUDIO
                </span>
              </div>

              {/* Display Headline - Larger font & impactful line height */}
              <div className="space-y-1">
                <h1 className="text-4xl sm:text-5xl lg:text-[3.2rem] xl:text-[3.85rem] font-extrabold tracking-tight text-[#131921] leading-[1.06]">
                  We build digital<br />
                  products that<br />
                  <span className="font-serif italic text-[#0F8B75] relative inline-block font-normal pt-1">
                    create real impact.
                    <svg
                      className="absolute -bottom-2 left-0 w-full h-4 text-[#F5C748] overflow-visible pointer-events-none"
                      viewBox="0 0 180 14"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path d="M 3 5 C 50 1, 110 9, 175 4" strokeWidth="3.5" strokeLinecap="round" />
                      <path d="M 12 11 C 60 7, 125 12, 160 8" strokeWidth="2.2" strokeLinecap="round" opacity="0.85" />
                    </svg>
                  </span>
                </h1>
              </div>

              {/* Subtitle Description - Enlarged */}
              <div className="space-y-1 text-slate-600 text-sm sm:text-base font-medium max-w-lg leading-relaxed pt-1">
                <p className="font-extrabold text-slate-900 text-base sm:text-lg">Product. Software. AI.</p>
                <p className="text-slate-600 font-medium">Custom software, web platforms and AI systems engineered around real business problems.</p>
              </div>

              {/* CTA Buttons Row - Enlarged buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-3">
                <button
                  onClick={onOpenStartProject}
                  id="btn-hero-build-something"
                  className="bg-[#09121F] hover:bg-slate-800 text-white pl-5 pr-2 py-3 rounded-full text-sm font-bold flex items-center gap-3 shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-95 group"
                >
                  <span>Start a Project</span>
                  <div className="w-6 h-6 rounded-full bg-[#10B981] text-slate-950 flex items-center justify-center group-hover:translate-x-0.5 transition-transform shrink-0">
                    <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                </button>

                <button
                  onClick={() => onNavigate('projects')}
                  id="btn-hero-view-work"
                  className="text-[#131921] hover:text-[#0F8B75] font-extrabold text-sm flex items-center gap-1.5 transition-colors cursor-pointer px-3 py-2"
                >
                  <span>Explore Our Work</span>
                  <ArrowUpRight className="w-4 h-4 stroke-[2.8]" />
                </button>
              </div>

            </div>


            {/* RIGHT COLUMN: ISOMETRIC ARCHITECTURAL ILLUSTRATION - Significantly Enlarged */}
            <div className="lg:col-span-6 relative flex items-center justify-center min-h-[320px] sm:min-h-[380px] lg:min-h-[420px] xl:min-h-[460px] select-none">
              
              <div className="absolute w-72 h-72 sm:w-96 sm:h-96 lg:w-[420px] lg:h-[420px] xl:w-[480px] xl:h-[480px] rounded-full bg-[#3DA081] shadow-inner opacity-95 z-0 transition-transform hover:scale-102 duration-500" />
              <div className="absolute right-2 sm:right-6 top-2 sm:top-4 w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-full bg-[#F5C748] z-10 shadow-xs" />
              <div className="absolute left-2 top-4 w-28 h-28 opacity-30 bg-[radial-gradient(#131921_1.8px,transparent_1.8px)] [background-size:10px_10px]" />

              <div className="relative z-20 w-72 sm:w-[420px] lg:w-[480px] xl:w-[540px] h-56 sm:h-72 lg:h-[310px] xl:h-[350px]">
                <svg className="w-full h-full text-[#131921]" viewBox="0 0 420 350" fill="none" stroke="currentColor">
                  <path d="M 60 210 L 150 170 L 150 290 L 60 320 Z" fill="#FFFFFF" strokeWidth="2.2" strokeLinejoin="round" />
                  <path d="M 150 170 L 230 200 L 230 310 L 150 290 Z" fill="#F8F9FA" strokeWidth="2.2" strokeLinejoin="round" />
                  <path d="M 60 210 L 140 180 L 230 200 L 150 170 Z" fill="#F3C258" strokeWidth="2.2" strokeLinejoin="round" />

                  <path d="M 150 140 L 230 100 L 230 200 L 150 230 Z" fill="#FFFFFF" strokeWidth="2.2" strokeLinejoin="round" />
                  <path d="M 230 100 L 300 130 L 300 230 L 230 200 Z" fill="#0F8B75" strokeWidth="2.2" strokeLinejoin="round" />
                  <path d="M 150 140 L 220 110 L 300 130 L 230 100 Z" fill="#FFFFFF" strokeWidth="2.2" strokeLinejoin="round" />

                  <path d="M 280 190 L 360 160 L 360 290 L 280 320 Z" fill="#FFFFFF" strokeWidth="2.2" strokeLinejoin="round" />
                  <path d="M 360 160 L 400 180 L 400 300 L 360 290 Z" fill="#E2E8F0" strokeWidth="2.2" strokeLinejoin="round" />
                  <path d="M 280 190 L 320 170 L 400 180 L 360 160 Z" fill="#FFFFFF" strokeWidth="2.2" strokeLinejoin="round" />

                  <path d="M 180 230 L 270 190 L 270 300 L 180 330 Z" fill="#FFFFFF" strokeWidth="2.2" strokeLinejoin="round" />
                  <path d="M 270 190 L 320 210 L 320 310 L 270 300 Z" fill="#131921" strokeWidth="2.2" strokeLinejoin="round" fillOpacity="0.8" />
                  <path d="M 180 230 L 230 205 L 320 210 L 270 190 Z" fill="#FFFFFF" strokeWidth="2.2" strokeLinejoin="round" />

                  <rect x="225" y="88" width="80" height="100" rx="10" fill="#FFFFFF" stroke="#131921" strokeWidth="2.5" transform="rotate(-3 225 88)" />
                  <rect x="233" y="96" width="64" height="84" rx="6" fill="#FFFFFF" stroke="#131921" strokeWidth="1.5" transform="rotate(-3 225 88)" />
                  <text x="248" y="142" fontFamily="monospace" fontSize="22" fontWeight="900" fill="#131921">&lt;/&gt;</text>
                  <line x1="255" y1="158" x2="275" y2="158" stroke="#131921" strokeWidth="3" strokeLinecap="round" />

                  <path d="M 345 135 L 355 135 L 352 155 L 348 155 Z" fill="#131921" />
                  <path d="M 350 135 Q 340 120, 335 125 Q 345 130, 350 135 Z" fill="#0F8B75" />
                  <path d="M 350 135 Q 360 118, 365 122 Q 355 128, 350 135 Z" fill="#0F8B75" />
                  <path d="M 350 135 Q 350 115, 350 110" stroke="#131921" strokeWidth="1.5" />

                  <path d="M 20 320 Q 200 345, 390 310" stroke="#0F8B75" strokeWidth="2" strokeDasharray="4 4" />
                </svg>
              </div>

              <div className="absolute top-0 right-0 sm:right-2 lg:-right-2 z-30 text-left space-y-0.5 select-none">
                <p className="font-handwritten text-sm sm:text-base lg:text-lg text-[#131921] font-semibold leading-tight">Clean code.</p>
                <p className="font-handwritten text-sm sm:text-base lg:text-lg text-[#131921] font-semibold leading-tight">Thoughtful design.</p>
                <p className="font-handwritten text-sm sm:text-base lg:text-lg text-[#131921] font-semibold leading-tight">Real results.</p>
                <svg className="w-8 h-10 text-[#131921] mt-1" viewBox="0 0 40 50" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M 5 10 Q 30 2, 25 30 Q 20 45, 10 35" />
                  <polyline points="15 42, 10 35, 18 30" />
                </svg>
              </div>

              <div className="absolute top-4 left-4 text-[#131921] text-xs font-bold">✦</div>
              <div className="absolute top-12 right-24 text-[#131921] text-xs font-bold">✚</div>
              <div className="absolute bottom-6 left-0 text-[#131921] text-xs font-bold">✦</div>

            </div>

          </div>


          <StudioHomeSections onNavigate={onNavigate} onOpenProjectDetail={onOpenProjectDetail} onOpenStartProject={onOpenStartProject} />

        </main>
      </div>

    </div>
  );
};

