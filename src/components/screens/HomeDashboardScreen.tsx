import React, { useState } from 'react';
import { 
  ArrowRight, ArrowUpRight, Shield, Cross, PawPrint, ArrowUp, ArrowDown, Menu, Bell,
  ChevronRight, Video, Laptop, Code2, Brain, Cpu
} from 'lucide-react';
import { Project, ScreenType } from '../../types';

interface HomeDashboardScreenProps {
  recentProject: Project;
  unreadNotifsCount: number;
  onNavigate: (screen: ScreenType) => void;
  onOpenProjectDetail: (project: Project) => void;
  onOpenNotifications: () => void;
  onOpenStartProject: () => void;
  onOpenMenu: () => void;
}

export const HomeDashboardScreen: React.FC<HomeDashboardScreenProps> = ({
  recentProject,
  unreadNotifsCount,
  onNavigate,
  onOpenProjectDetail,
  onOpenNotifications,
  onOpenStartProject,
  onOpenMenu,
}) => {
  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState(0);

  const testimonials = [
    {
      quote: "GSV understood our needs better than we did. Delivered beyond expectations.",
      author: "Dr. Karthikeyan",
      role: "Thaai Clinic, Karaikal",
    },
    {
      quote: "The speed and attention to detail in our app development was phenomenal.",
      author: "Anand R.",
      role: "Advanti Systems",
    },
    {
      quote: "Our conversion rate jumped 40% after launching the new web experience.",
      author: "Sarah M.",
      role: "My Pet's Choice",
    }
  ];

  const handleNextTestimonial = () => {
    setActiveTestimonialIdx((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrevTestimonial = () => {
    setActiveTestimonialIdx((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[activeTestimonialIdx];

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#131921] flex flex-col justify-between font-sans antialiased relative">
      
      {/* ============================================================== */}
      {/* ===================== MOBILE VIEW (lg:hidden) ================ */}
      {/* ============================================================== */}
      <div className="block lg:hidden min-h-screen flex flex-col justify-between pb-24 px-4 pt-3 max-w-xl mx-auto w-full space-y-5">
        
        {/* Top Navigation Row: Hamburger + Notification Bell */}
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
            onClick={onOpenNotifications}
            className="p-1 rounded-full text-slate-800 hover:bg-slate-200/60 transition-colors relative cursor-pointer"
            aria-label="Notifications"
            id="btn-mobile-home-notifications"
          >
            <Bell className="w-6 h-6 stroke-[2]" />
            {unreadNotifsCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white" />
            )}
          </button>
        </div>

        {/* Greeting & Headline */}
        <div className="space-y-1 pt-1">
          <div className="flex items-center gap-1.5 text-base font-extrabold text-[#131921]">
            <span>Hey GSV</span>
            <span className="text-lg">👋</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#131921] tracking-tight leading-[1.12]">
            What shall<br />
            we <span className="text-[#0F8B75] relative inline-block">
              build
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
            </span> today?
          </h1>
        </div>

        {/* Dark Brush Banner Card */}
        <div 
          onClick={onOpenStartProject}
          id="banner-mobile-brush-cta"
          className="bg-[#051722] text-white rounded-3xl p-5 sm:p-6 relative overflow-hidden shadow-xl cursor-pointer group border border-slate-800/80 my-1"
        >
          {/* Subtle White Doodle Accents */}
          <div className="absolute top-3 left-4 text-white/20 text-xs select-none">✦</div>
          <div className="absolute bottom-3 right-14 text-white/20 text-xs select-none">✚</div>
          
          <div className="flex items-center justify-between gap-3 relative z-10">
            <div className="space-y-1 max-w-[210px]">
              <h3 className="text-lg sm:text-xl font-extrabold leading-snug text-white tracking-tight">
                Turning ideas into<br />
                impactful digital<br />
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
        </div>

        {/* Recent Projects Section */}
        <div className="space-y-2.5 pt-1">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-extrabold text-[#131921]">
              Recent Projects
            </h2>
            <button
              onClick={() => onNavigate('projects')}
              id="btn-mobile-recent-projects-view-all"
              className="text-xs font-bold text-slate-600 hover:text-[#0F8B75] transition-colors cursor-pointer"
            >
              View all
            </button>
          </div>

          {/* Project Card */}
          <button
            type="button"
            onClick={() => onOpenProjectDetail(recentProject)}
            id="card-mobile-recent-project"
            className="w-full text-left bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs hover:shadow-md transition-all cursor-pointer flex items-center gap-3 relative group"
          >
            {/* Video Studio Icon */}
            <div className="w-12 h-12 rounded-2xl bg-[#D5EAE3] text-[#0F8B75] flex items-center justify-center shrink-0 border border-teal-100/80">
              <Video className="w-6 h-6 stroke-[2.2]" />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0 pr-1">
              <div className="flex items-center justify-between gap-1 mb-0.5">
                <h3 className="text-base font-extrabold text-[#131921] truncate group-hover:text-[#0F8B75] transition-colors">
                  {recentProject.title}
                </h3>
                <span className="text-[11px] font-extrabold text-[#65A30D] flex items-center gap-1 shrink-0">
                  ⏱ {recentProject.status}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium leading-relaxed line-clamp-2">
                {recentProject.subtitle}
              </p>
            </div>

            {/* Chevron Arrow */}
            <div className="text-slate-400 group-hover:text-slate-700 transition-colors shrink-0">
              <ChevronRight className="w-5 h-5 stroke-[2]" />
            </div>
          </button>
        </div>

        {/* "What I create." Section */}
        <div className="space-y-3 pt-2">
          {/* Handwritten Style Title + Underline */}
          <div className="inline-block relative">
            <h2 className="font-serif italic text-2xl font-extrabold text-[#131921] tracking-tight">
              What I create.
            </h2>
            <svg
              className="w-28 h-2 text-[#0F8B75] mt-0.5 overflow-visible"
              viewBox="0 0 110 8"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <path d="M 2 4 C 35 1, 75 7, 108 3" />
            </svg>
          </div>

          {/* 2x2 Services Grid */}
          <div className="grid grid-cols-2 gap-3 pt-0.5">
            
            {/* 1. Web Experiences */}
            <div
              onClick={() => onNavigate('web-dev')}
              id="card-mobile-service-web"
              className="bg-white rounded-2xl p-3.5 border border-slate-200/90 border-b-2 border-b-[#0F8B75] shadow-2xs hover:shadow-md transition-all cursor-pointer flex items-center gap-2.5 group"
            >
              <div className="w-10 h-10 rounded-xl bg-[#D5EAE3] text-[#0F8B75] flex items-center justify-center shrink-0 border border-teal-100">
                <Laptop className="w-5 h-5 stroke-[2.2]" />
              </div>
              <span className="font-extrabold text-xs text-[#131921] leading-tight group-hover:text-[#0F8B75] transition-colors">
                Web<br />Experiences
              </span>
            </div>

            {/* 2. Custom Software */}
            <div
              onClick={() => onNavigate('software-dev')}
              id="card-mobile-service-software"
              className="bg-white rounded-2xl p-3.5 border border-slate-200/90 border-b-2 border-b-[#F59E0B] shadow-2xs hover:shadow-md transition-all cursor-pointer flex items-center gap-2.5 group"
            >
              <div className="w-10 h-10 rounded-xl bg-[#FEF3C7] text-[#D97706] flex items-center justify-center shrink-0 border border-amber-100">
                <Code2 className="w-5 h-5 stroke-[2.2]" />
              </div>
              <span className="font-extrabold text-xs text-[#131921] leading-tight group-hover:text-[#D97706] transition-colors">
                Custom<br />Software
              </span>
            </div>

            {/* 3. AI Solutions */}
            <div
              onClick={() => onNavigate('ai-solutions')}
              id="card-mobile-service-ai"
              className="bg-white rounded-2xl p-3.5 border border-slate-200/90 border-b-2 border-b-[#64748B] shadow-2xs hover:shadow-md transition-all cursor-pointer flex items-center gap-2.5 group"
            >
              <div className="w-10 h-10 rounded-xl bg-[#E2E8F0] text-[#475569] flex items-center justify-center shrink-0 border border-slate-200">
                <Brain className="w-5 h-5 stroke-[2.2]" />
              </div>
              <span className="font-extrabold text-xs text-[#131921] leading-tight group-hover:text-[#475569] transition-colors">
                AI<br />Solutions
              </span>
            </div>

            {/* 4. Automation & Integrations */}
            <div
              onClick={() => onNavigate('automation')}
              id="card-mobile-service-automation"
              className="bg-white rounded-2xl p-3.5 border border-slate-200/90 border-b-2 border-b-[#F97316] shadow-2xs hover:shadow-md transition-all cursor-pointer flex items-center gap-2.5 group"
            >
              <div className="w-10 h-10 rounded-xl bg-[#FFEDD5] text-[#EA580C] flex items-center justify-center shrink-0 border border-orange-100">
                <Cpu className="w-5 h-5 stroke-[2.2]" />
              </div>
              <span className="font-extrabold text-xs text-[#131921] leading-tight group-hover:text-[#EA580C] transition-colors">
                Automation<br />& Integrations
              </span>
            </div>

          </div>
        </div>

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
              <span>Let's Talk</span>
              <div className="w-6 h-6 rounded-full bg-[#10B981] text-slate-950 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.8]" />
              </div>
            </button>
          </div>
        </header>

        {/* ================= MAIN HERO BODY ================= */}
        <main className="w-full max-w-[1600px] mx-auto px-6 lg:px-10 py-2 flex-1 flex flex-col justify-between relative min-h-0">
          
          {/* Main Hero Grid - Scaled to fill vertical and horizontal space */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center my-auto py-2">
            
            {/* LEFT COLUMN: HERO TEXT & CTAs */}
            <div className="lg:col-span-6 space-y-4">
              
              {/* Status Pill Badge */}
              <div className="inline-flex items-center gap-2.5 bg-white border border-slate-200/90 shadow-2xs px-4 py-1.5 rounded-full">
                <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                <span className="text-xs font-extrabold text-slate-700 tracking-wider uppercase">
                  AVAILABLE FOR NEW PROJECTS
                </span>
              </div>

              {/* Display Headline - Larger font & impactful line height */}
              <div className="space-y-1">
                <h1 className="text-4xl sm:text-5xl lg:text-[3.2rem] xl:text-[3.85rem] font-extrabold tracking-tight text-[#131921] leading-[1.06]">
                  I build digital<br />
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
                <p className="font-extrabold text-slate-900 text-base sm:text-lg">Web. Software. AI Solutions.</p>
                <p className="text-slate-600 font-medium">Custom builds that solve real problems and create real impact.</p>
              </div>

              {/* CTA Buttons Row - Enlarged buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-3">
                <button
                  onClick={onOpenStartProject}
                  id="btn-hero-build-something"
                  className="bg-[#09121F] hover:bg-slate-800 text-white pl-5 pr-2 py-3 rounded-full text-sm font-bold flex items-center gap-3 shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-95 group"
                >
                  <span>Let's build something amazing</span>
                  <div className="w-6 h-6 rounded-full bg-[#10B981] text-slate-950 flex items-center justify-center group-hover:translate-x-0.5 transition-transform shrink-0">
                    <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                </button>

                <button
                  onClick={() => onNavigate('projects')}
                  id="btn-hero-view-work"
                  className="text-[#131921] hover:text-[#0F8B75] font-extrabold text-sm flex items-center gap-1.5 transition-colors cursor-pointer px-3 py-2"
                >
                  <span>View my work</span>
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


          {/* ================= BOTTOM DARK FEATURED STRIP - Enlarged & Shifted Upwards ================= */}
          <div className="bg-[#09121F] rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-6 border border-slate-800 text-white shadow-2xl relative overflow-hidden mt-3 lg:mt-5 mb-2">
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-center divide-y lg:divide-y-0 lg:divide-x divide-slate-800/90">
              
              <div className="lg:col-span-5 space-y-3 lg:pr-5">
                <span className="text-xs font-black text-[#10B981] tracking-widest uppercase block">
                  FEATURED WORK
                </span>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1.5 max-w-xs">
                    <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                      V² Productions
                    </h3>
                    <p className="text-slate-300 text-xs sm:text-sm font-medium leading-relaxed">
                      Cinematic creative studio website & brand platform featuring video showcases, web design, and 1-on-1 courses.
                    </p>

                    <button
                      onClick={() => onOpenProjectDetail(recentProject)}
                      id="btn-explore-case-study"
                      className="text-[#10B981] hover:text-emerald-300 text-xs sm:text-sm font-bold inline-flex items-center gap-1.5 transition-all cursor-pointer pt-1 group"
                    >
                      <span>Explore Case Study</span>
                      <ArrowRight className="w-3.5 h-3.5 stroke-[2.5] group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <div className="relative w-36 sm:w-40 bg-slate-950 rounded-[20px] border border-slate-700 shadow-2xl p-2 transform -rotate-1 hover:rotate-0 transition-transform duration-300">
                      <div className="bg-slate-900 rounded-[16px] p-2 text-white space-y-1.5 text-[9px]">
                        <div className="flex justify-between items-center text-[7px] font-bold text-slate-400 pb-0.5">
                          <span className="text-[#10B981]">V² PRODUCTIONS</span>
                          <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] block animate-pulse" />
                        </div>

                        <p className="font-extrabold text-[10px] text-white leading-tight">Creative Studio Platform</p>

                        <div className="bg-emerald-950/60 rounded-lg p-1.5 border border-emerald-800/60 flex items-center justify-between">
                          <div>
                            <span className="text-[7px] text-emerald-400 block font-semibold">Speed Score</span>
                            <span className="text-[11px] font-black text-emerald-300">99/100 <span className="text-[7px] text-slate-400 font-normal">Lighthouse</span></span>
                          </div>
                          <Video className="w-5 h-5 text-emerald-400 stroke-[2]" />
                        </div>

                        <div className="space-y-1">
                          <p className="font-bold text-[7px] text-slate-400 uppercase tracking-wider">Features</p>
                          <div className="bg-slate-950 p-1 px-1.5 rounded border border-slate-800 flex items-center justify-between text-[7px]">
                            <p className="font-bold text-slate-300">Video Editing</p>
                            <span className="font-bold text-[#10B981]">Portfolio</span>
                          </div>
                          <div className="bg-slate-950 p-1 px-1.5 rounded border border-slate-800 flex items-center justify-between text-[7px]">
                            <p className="font-bold text-slate-300">1-on-1 Courses</p>
                            <span className="font-bold text-amber-400">Live</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="hidden sm:flex flex-col items-start text-left select-none pointer-events-none space-y-0.5">
                      <svg className="w-7 h-7 text-[#10B981]" viewBox="0 0 30 30" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M 5 25 C 15 15, 20 20, 25 5" />
                        <polyline points="18 5, 25 5, 25 12" />
                      </svg>
                      <p className="font-handwritten text-xs sm:text-sm text-[#10B981] font-medium leading-tight whitespace-nowrap">Cinematic feel.</p>
                      <p className="font-handwritten text-xs sm:text-sm text-[#10B981] font-medium leading-tight whitespace-nowrap">Real results.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-3 pt-4 lg:pt-0 lg:pl-5 space-y-3">
                <span className="text-xs font-black text-[#10B981] tracking-widest uppercase block">
                  TRUSTED BY
                </span>

                <div className="space-y-2.5 pt-0.5">
                  <div className="flex items-center gap-2.5 text-white font-extrabold text-xs sm:text-sm tracking-tight opacity-90 hover:opacity-100 transition-opacity">
                    <Shield className="w-4 h-4 text-emerald-400 stroke-[2.2]" />
                    <span className="font-sans font-black tracking-tight">Advanti <span className="font-light text-[10px] text-slate-400 uppercase tracking-wider">SYSTEMS</span></span>
                  </div>

                  <div className="flex items-center gap-2.5 text-white font-black text-xs sm:text-sm tracking-wider opacity-90 hover:opacity-100 transition-opacity">
                    <Cross className="w-4 h-4 text-emerald-400 stroke-[2.5]" />
                    <span className="font-serif">THAAI <span className="font-sans font-normal text-[10px] text-slate-400">CLINIC</span></span>
                  </div>

                  <div className="flex items-center gap-2.5 text-white font-extrabold text-xs sm:text-sm tracking-tight opacity-90 hover:opacity-100 transition-opacity">
                    <PawPrint className="w-4 h-4 text-emerald-400 stroke-[2]" />
                    <span className="font-sans">My Pet's <span className="font-light text-[#10B981]">Choice</span></span>
                  </div>
                </div>

                <button
                  onClick={() => onNavigate('projects')}
                  className="text-[#10B981] text-xs font-bold hover:underline cursor-pointer pt-0.5 block"
                >
                  and more...
                </button>
              </div>

              <div className="lg:col-span-4 pt-4 lg:pt-0 lg:pl-5 flex items-start justify-between gap-4">
                <div className="space-y-2.5 flex-1">
                  <span className="text-4xl font-extrabold text-[#10B981] leading-none block font-serif">“</span>
                  <p className="text-xs sm:text-sm lg:text-base font-medium text-slate-100 leading-relaxed tracking-tight min-h-[44px]">
                    "{currentTestimonial.quote}"
                  </p>
                  <div className="pt-1">
                    <p className="text-xs sm:text-sm font-extrabold text-[#10B981]">— {currentTestimonial.author}</p>
                    <p className="text-xs font-medium text-slate-400">{currentTestimonial.role}</p>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-2 shrink-0 pt-1">
                  <button
                    onClick={handlePrevTestimonial}
                    id="btn-testimonial-prev"
                    className="w-8 h-8 rounded-full border border-slate-700/80 text-slate-300 hover:border-[#10B981] hover:text-white flex items-center justify-center transition-all cursor-pointer active:scale-95"
                    aria-label="Previous Testimonial"
                  >
                    <ArrowUp className="w-4 h-4 stroke-[2.2]" />
                  </button>

                  <button
                    onClick={handleNextTestimonial}
                    id="btn-testimonial-next"
                    className="w-8 h-8 rounded-full border border-emerald-600/80 text-[#10B981] hover:border-[#10B981] hover:bg-emerald-950/40 flex items-center justify-center transition-all cursor-pointer active:scale-95"
                    aria-label="Next Testimonial"
                  >
                    <ArrowDown className="w-4 h-4 stroke-[2.2]" />
                  </button>
                </div>
              </div>

            </div>
          </div>

        </main>
      </div>

    </div>
  );
};

