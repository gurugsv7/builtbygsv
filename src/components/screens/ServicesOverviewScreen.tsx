import React from 'react';
import { 
  Menu, ArrowUpRight, ArrowRight, ArrowLeft, Code2, Cpu, Database, Server, Globe, Layout, 
  Zap, Bot, Layers, Cloud, Calendar, Sparkles, Mail
} from 'lucide-react';
import { ScreenType, ServiceType } from '../../types';

interface ServicesOverviewScreenProps {
  onBack?: () => void;
  onNavigateToService: (screen: ScreenType) => void;
  onStartProject: (serviceType: ServiceType) => void;
  onOpenMenu: () => void;
}

export const ServicesOverviewScreen: React.FC<ServicesOverviewScreenProps> = ({
  onBack,
  onNavigateToService,
  onStartProject,
  onOpenMenu,
}) => {
  const handleServiceKeyDown = (event: React.KeyboardEvent, screen: ScreenType) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onNavigateToService(screen);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#131921] flex flex-col justify-between font-sans antialiased relative">
      
      {/* ================= MOBILE VIEW (lg:hidden) ================= */}
      <div className="lg:hidden flex flex-col gap-4 px-4 pt-2 pb-6">
        
        {/* MOBILE HEADER */}
        <div className="flex items-center justify-between w-full border-b border-slate-200/80 pb-2.5">
          <button
            onClick={onBack}
            className="p-1 text-slate-800 hover:text-[#0F8B75] transition-colors"
            aria-label="Go Back"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
          </button>

          <div className="flex items-center gap-1.5 select-none">
            <div className="font-mono text-base font-black text-[#0F8B75] tracking-tight">
              &lt;/&gt;
            </div>
            <span className="font-extrabold text-base text-[#131921] tracking-tight">
              Builtby<span className="text-[#0F8B75]">GSV</span>
            </span>
          </div>

          <button
            onClick={onOpenMenu}
            className="p-1 text-slate-800 hover:text-[#0F8B75] transition-colors"
            aria-label="Open Navigation Menu"
          >
            <Menu className="w-6 h-6 stroke-[2]" />
          </button>
        </div>

        {/* MOBILE HERO SECTION */}
        <div className="flex items-start justify-between gap-2 pt-1">
          <div className="space-y-2 flex-1">
            {/* Category Tag */}
            <div className="inline-flex items-center gap-2">
              <span className="text-[#0F8B75] text-[11px] font-bold tracking-widest uppercase relative">
                SERVICES
                <svg
                  className="absolute left-0 -bottom-1 w-full h-1.5 text-[#0F8B75] overflow-visible"
                  viewBox="0 0 70 6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M 2 3 C 20 1, 50 5, 68 2" />
                </svg>
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#131921] leading-[1.12]">
              Solutions,<br />
              built around<br />
              <span className="font-serif italic text-[#0F8B75] relative inline-block font-normal pt-0.5">
                your goals.
                <svg
                  className="absolute -bottom-1.5 left-0 w-full h-3 text-[#F5C748] overflow-visible pointer-events-none"
                  viewBox="0 0 160 14"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M 3 5 C 45 1, 100 9, 155 4" strokeWidth="3" strokeLinecap="round" />
                  <path d="M 10 11 C 55 7, 115 12, 145 8" strokeWidth="2" strokeLinecap="round" opacity="0.85" />
                </svg>
              </span>
            </h1>

            {/* Paragraph */}
            <p className="text-slate-600 text-xs font-medium leading-relaxed pt-0.5 pr-1">
              From powerful websites to smart automation, I build digital products that solve real problems and create real impact.
            </p>
          </div>

          {/* Right Hero Graphic */}
          <div className="relative shrink-0 w-32 h-32 sm:w-36 sm:h-36 flex items-center justify-center select-none">
            {/* Soft Green Disc */}
            <div className="absolute w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-[#E2F1ED] opacity-95 z-0 flex items-center justify-center overflow-hidden">
              <div className="absolute top-2 right-2 w-14 h-14 opacity-30 bg-[radial-gradient(#0F8B75_1.5px,transparent_1.5px)] [background-size:6px_6px]" />
            </div>

            {/* Tilted Yellow Square */}
            <div className="absolute left-1 bottom-3 w-8 h-8 bg-[#F5C748] rounded-md transform -rotate-12 shadow-xs z-10" />

            {/* Browser Window */}
            <div className="relative z-20 w-24 h-20 bg-white rounded-xl border-2 border-[#131921] shadow-md flex flex-col overflow-hidden">
              <div className="h-4 border-b-2 border-[#131921] bg-slate-50 px-1.5 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#131921]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#131921]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#131921]" />
              </div>
              <div className="flex-1 flex items-center justify-center bg-white font-mono font-black text-lg text-[#131921]">
                &lt;/&gt;
              </div>
            </div>

            {/* Doodle Arrow */}
            <div className="absolute right-0 top-0 z-30">
              <svg
                className="w-7 h-10 text-[#131921]"
                viewBox="0 0 40 50"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M 10 40 Q 30 40, 25 22 T 15 12 Q 22 5, 32 14" />
                <polyline points="25 6, 32 14, 23 18" />
              </svg>
            </div>
          </div>
        </div>

        {/* MOBILE 4 CARDS LIST */}
        <div className="flex flex-col gap-3.5">
          
          {/* CARD 01: Web Development */}
          <div
            onClick={() => onNavigateToService('web-dev')}
            onKeyDown={(event) => handleServiceKeyDown(event, 'web-dev')}
            role="link"
            tabIndex={0}
            className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs hover:shadow-sm transition-all cursor-pointer space-y-3"
          >
            {/* Top Header: Step Number & Arrow Button */}
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-[#0F8B75] text-sm font-mono">01</span>
              <span aria-hidden="true" className="w-8 h-8 rounded-full bg-slate-100/90 text-slate-700 flex items-center justify-center">
                <ArrowRight className="w-4 h-4 stroke-[2.2]" />
              </span>
            </div>

            {/* Main Body: Left Illustration + Right Title/Text */}
            <div className="flex items-start gap-3.5">
              {/* Left Illustration Box */}
              <div className="relative w-28 h-28 rounded-xl bg-[#E2F1ED] flex items-center justify-center shrink-0 overflow-hidden border border-emerald-100/80">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#0F8B75_1px,transparent_1px)] [background-size:6px_6px]" />
                
                <div className="relative z-10 w-18 h-14 bg-white rounded-lg border border-[#131921] shadow-2xs p-1 flex flex-col gap-0.5">
                  <div className="h-2 flex items-center gap-0.5 border-b border-slate-200 pb-0.5">
                    <span className="w-1 h-1 rounded-full bg-[#131921]" />
                    <span className="w-1 h-1 rounded-full bg-[#131921]" />
                    <span className="w-1 h-1 rounded-full bg-[#131921]" />
                  </div>
                  <div className="flex-1 flex gap-1">
                    <div className="w-5 bg-[#0F8B75] rounded-[2px] flex items-center justify-center text-[7px] text-white font-mono font-bold">
                      =/&gt;
                    </div>
                    <div className="flex-1 flex flex-col gap-1">
                      <div className="h-1.5 bg-slate-100 rounded border border-slate-200" />
                      <div className="h-1.5 bg-slate-100 rounded border border-slate-200" />
                    </div>
                  </div>
                </div>

                <svg className="absolute bottom-1 right-1.5 w-6 h-3 text-[#131921]" viewBox="0 0 30 15" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <path d="M 2 8 Q 12 15, 22 3 T 28 10" />
                </svg>
              </div>

              {/* Right Info */}
              <div className="space-y-1 flex-1 min-w-0">
                <h3 className="text-base font-extrabold text-[#131921] leading-tight">
                  Web Development
                </h3>
                <p className="font-serif italic text-xs text-[#0F8B75] font-semibold">
                  Fast. Modern. Responsive.
                </p>
                <p className="text-slate-600 text-[11px] font-medium leading-relaxed pt-0.5">
                  We build beautiful, high-performance websites that look stunning and convert visitors.
                </p>
              </div>
            </div>

            {/* Bottom Tags / Pills */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="px-2.5 py-1 rounded-lg bg-slate-100/90 border border-slate-200/70 text-slate-700 text-[10px] font-bold flex items-center gap-1.5">
                <span className="text-[#0F8B75] font-black text-[11px]">⚛</span>
                <span>React / Next.js</span>
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-100/90 border border-slate-200/70 text-slate-700 text-[10px] font-bold flex items-center gap-1.5">
                <Layers className="w-3 h-3 text-[#0F8B75]" />
                <span>Headless CMS</span>
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-100/90 border border-slate-200/70 text-slate-700 text-[10px] font-bold flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-[#0F8B75]" />
                <span>SEO Ready</span>
              </span>
            </div>
          </div>


          {/* CARD 02: Custom Software Development */}
          <div
            onClick={() => onNavigateToService('software-dev')}
            onKeyDown={(event) => handleServiceKeyDown(event, 'software-dev')}
            role="link"
            tabIndex={0}
            className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs hover:shadow-sm transition-all cursor-pointer space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-amber-500 text-sm font-mono">02</span>
              <span aria-hidden="true" className="w-8 h-8 rounded-full bg-amber-100/60 text-amber-700 flex items-center justify-center">
                <ArrowRight className="w-4 h-4 stroke-[2.2]" />
              </span>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="relative w-28 h-28 rounded-xl bg-[#FEF08A]/70 flex items-center justify-center shrink-0 overflow-hidden border border-amber-100">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#D97706_1px,transparent_1px)] [background-size:6px_6px]" />
                
                <div className="relative z-10 w-14 h-14 flex items-center justify-center">
                  <svg className="w-12 h-12 stroke-[#131921]" viewBox="0 0 40 40" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="20,4 28,8 20,12 12,8" fill="white" />
                    <polygon points="12,8 20,12 20,20 12,16" fill="#F8FAFC" />
                    <polygon points="20,12 28,8 28,16 20,20" fill="#E2E8F0" />

                    <polygon points="12,16 20,20 12,24 4,20" fill="#F59E0B" />
                    <polygon points="4,20 12,24 12,32 4,28" fill="#D97706" />
                    <polygon points="12,24 20,20 20,28 12,32" fill="#FBBF24" />

                    <polygon points="28,16 36,20 28,24 20,20" fill="white" />
                    <polygon points="20,20 28,24 28,32 20,28" fill="#E2E8F0" />
                    <polygon points="28,24 36,20 36,28 28,32" fill="#CBD5E1" />
                  </svg>
                </div>

                <svg className="absolute bottom-1 right-1.5 w-6 h-3 text-[#131921]" viewBox="0 0 30 15" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <path d="M 2 8 Q 12 15, 22 3 T 28 10" />
                </svg>
              </div>

              <div className="space-y-1 flex-1 min-w-0">
                <h3 className="text-base font-extrabold text-[#131921] leading-tight">
                  Custom Software Development
                </h3>
                <p className="font-serif italic text-xs text-amber-600 font-semibold">
                  Built around your logic.
                </p>
                <p className="text-slate-600 text-[11px] font-medium leading-relaxed pt-0.5">
                  Scalable, secure and custom software solutions that streamline your operations.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="px-2.5 py-1 rounded-lg bg-slate-100/90 border border-slate-200/70 text-slate-700 text-[10px] font-bold flex items-center gap-1.5">
                <Globe className="w-3 h-3 text-amber-600" />
                <span>Web Apps</span>
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-100/90 border border-slate-200/70 text-slate-700 text-[10px] font-bold flex items-center gap-1.5">
                <Layout className="w-3 h-3 text-amber-600" />
                <span>Admin Panels</span>
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-100/90 border border-slate-200/70 text-slate-700 text-[10px] font-bold flex items-center gap-1.5">
                <Cloud className="w-3 h-3 text-amber-600" />
                <span>APIs</span>
              </span>
            </div>
          </div>


          {/* CARD 03: AI & Automation */}
          <div
            onClick={() => onNavigateToService('ai-solutions')}
            onKeyDown={(event) => handleServiceKeyDown(event, 'ai-solutions')}
            role="link"
            tabIndex={0}
            className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs hover:shadow-sm transition-all cursor-pointer space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-purple-600 text-sm font-mono">03</span>
              <span aria-hidden="true" className="w-8 h-8 rounded-full bg-purple-100/60 text-purple-700 flex items-center justify-center">
                <ArrowRight className="w-4 h-4 stroke-[2.2]" />
              </span>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="relative w-28 h-28 rounded-xl bg-[#F3E8FF] flex items-center justify-center shrink-0 overflow-hidden border border-purple-100">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#7C3AED_1px,transparent_1px)] [background-size:6px_6px]" />
                
                <div className="relative z-10 w-14 h-14 flex items-center justify-center">
                  <svg className="w-12 h-12 stroke-[#131921]" viewBox="0 0 36 36" fill="none" strokeWidth="1.5" strokeLinecap="round">
                    <path d="M 12 10 Q 8 6, 6 12 Q 4 18, 10 22 Q 12 26, 18 26 Q 24 26, 26 22 Q 32 18, 30 12 Q 28 6, 24 10 Q 18 6, 12 10 Z" fill="white" />
                    <path d="M 18 8 L 18 26" strokeDasharray="2 2" />
                    <circle cx="10" cy="14" r="1.5" fill="#7C3AED" />
                    <circle cx="26" cy="14" r="1.5" fill="#7C3AED" />
                    <circle cx="14" cy="20" r="1.5" fill="#7C3AED" />
                    <circle cx="22" cy="20" r="1.5" fill="#7C3AED" />
                    <line x1="10" y1="14" x2="14" y2="20" />
                    <line x1="26" y1="14" x2="22" y2="20" />
                  </svg>
                </div>

                <svg className="absolute bottom-1 right-1.5 w-6 h-3 text-[#131921]" viewBox="0 0 30 15" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <path d="M 2 8 Q 12 15, 22 3 T 28 10" />
                </svg>
              </div>

              <div className="space-y-1 flex-1 min-w-0">
                <h3 className="text-base font-extrabold text-[#131921] leading-tight">
                  AI & Automation
                </h3>
                <p className="font-serif italic text-xs text-purple-600 font-semibold">
                  Work smarter. Save hours.
                </p>
                <p className="text-slate-600 text-[11px] font-medium leading-relaxed pt-0.5">
                  Intelligent solutions and automation workflows that remove repetitive work.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="px-2.5 py-1 rounded-lg bg-slate-100/90 border border-slate-200/70 text-slate-700 text-[10px] font-bold flex items-center gap-1.5">
                <Cpu className="w-3 h-3 text-purple-600" />
                <span>AI Integration</span>
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-100/90 border border-slate-200/70 text-slate-700 text-[10px] font-bold flex items-center gap-1.5">
                <Zap className="w-3 h-3 text-purple-600" />
                <span>Workflow Automation</span>
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-100/90 border border-slate-200/70 text-slate-700 text-[10px] font-bold flex items-center gap-1.5">
                <Bot className="w-3 h-3 text-purple-600" />
                <span>RPA</span>
              </span>
            </div>
          </div>


          {/* CARD 04: Backend & Cloud Solutions */}
          <div
            onClick={() => onNavigateToService('automation')}
            onKeyDown={(event) => handleServiceKeyDown(event, 'automation')}
            role="link"
            tabIndex={0}
            className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs hover:shadow-sm transition-all cursor-pointer space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-[#0F8B75] text-sm font-mono">04</span>
              <span aria-hidden="true" className="w-8 h-8 rounded-full bg-emerald-100/60 text-[#0F8B75] flex items-center justify-center">
                <ArrowRight className="w-4 h-4 stroke-[2.2]" />
              </span>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="relative w-28 h-28 rounded-xl bg-[#E6F4F1] flex items-center justify-center shrink-0 overflow-hidden border border-teal-100">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#0F8B75_1px,transparent_1px)] [background-size:6px_6px]" />
                
                <div className="relative z-10 w-14 h-14 flex items-center justify-center">
                  <svg className="w-12 h-12 stroke-[#131921]" viewBox="0 0 36 36" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M 8 22 C 4 22, 3 17, 7 14 C 6 10, 11 8, 15 10 C 18 7, 24 8, 25 12 C 29 12, 31 16, 28 20 C 31 24, 27 26, 23 25 L 8 25 Z" fill="white" />
                    <path d="M 18 16 L 22 18 V 22 C 22 24.5 18 26 18 26 C 18 26 14 24.5 14 22 V 18 L 18 16 Z" fill="#E2F1ED" stroke="#0F8B75" strokeWidth="1.5" />
                    <polyline points="16.5,21 17.5,22.5 19.5,19.5" stroke="#0F8B75" strokeWidth="1.5" />
                  </svg>
                </div>

                <svg className="absolute bottom-1 right-1.5 w-6 h-3 text-[#131921]" viewBox="0 0 30 15" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <path d="M 2 8 Q 12 15, 22 3 T 28 10" />
                </svg>
              </div>

              <div className="space-y-1 flex-1 min-w-0">
                <h3 className="text-base font-extrabold text-[#131921] leading-tight">
                  Backend & Cloud Solutions
                </h3>
                <p className="font-serif italic text-xs text-[#0F8B75] font-semibold">
                  Secure. Scalable. Reliable.
                </p>
                <p className="text-slate-600 text-[11px] font-medium leading-relaxed pt-0.5">
                  Robust backend systems and cloud infrastructure that grow with your business.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="px-2.5 py-1 rounded-lg bg-slate-100/90 border border-slate-200/70 text-slate-700 text-[10px] font-bold flex items-center gap-1.5">
                <Code2 className="w-3 h-3 text-[#0F8B75]" />
                <span>Node.js / Python</span>
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-100/90 border border-slate-200/70 text-slate-700 text-[10px] font-bold flex items-center gap-1.5">
                <Server className="w-3 h-3 text-[#0F8B75]" />
                <span>AWS / Cloud</span>
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-100/90 border border-slate-200/70 text-slate-700 text-[10px] font-bold flex items-center gap-1.5">
                <Database className="w-3 h-3 text-[#0F8B75]" />
                <span>Database Design</span>
              </span>
            </div>
          </div>

        </div>

        {/* MOBILE BOTTOM BANNER */}
        <div
          onClick={() => onStartProject('web-dev')}
          className="bg-[#0B1513] rounded-2xl p-4 border border-slate-800 text-white shadow-md cursor-pointer flex items-center justify-between gap-3 mt-1"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-800/90 border border-slate-700 flex items-center justify-center shrink-0 relative">
              <Mail className="w-5 h-5 text-white" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#F5C748]" />
            </div>

            <div className="space-y-0.5">
              <h3 className="text-sm font-extrabold text-white tracking-tight">
                Have a project in mind?
              </h3>
              <p className="text-[11px] text-slate-300 font-medium">
                Let's build something amazing together.
              </p>
            </div>
          </div>

          <div className="w-10 h-10 rounded-full bg-[#B3E635] text-[#0B1513] flex items-center justify-center shrink-0 font-bold shadow-sm">
            <ArrowRight className="w-5 h-5 stroke-[2.8]" />
          </div>
        </div>

      </div>


      {/* ================= DESKTOP VIEW (hidden lg:flex) ================= */}
      <div className="hidden lg:flex flex-col justify-between flex-1 min-h-screen">
        
        {/* DESKTOP HEADER */}
        <header className="w-full max-w-[1600px] mx-auto px-6 lg:px-8 pt-2 pb-1 flex items-center justify-between z-30 shrink-0">
          <div className="flex items-center justify-between w-full pt-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
              <span className="text-xs font-semibold text-slate-600">
                Available for new projects
              </span>
            </div>

            <button
              onClick={() => onStartProject('web-dev')}
              id="btn-header-services-lets-talk"
              className="bg-[#09121F] hover:bg-slate-800 text-white pl-3.5 pr-1 py-1 rounded-full text-xs font-bold flex items-center gap-2 shadow-xs transition-all cursor-pointer active:scale-95 group"
            >
              <span>Let's Talk</span>
              <div className="w-5 h-5 rounded-full bg-[#10B981] text-slate-950 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                <ArrowUpRight className="w-3 h-3 stroke-[2.8]" />
              </div>
            </button>
          </div>
        </header>

        {/* DESKTOP MAIN BODY */}
        <main className="w-full max-w-[1600px] mx-auto px-6 lg:px-8 py-2 flex-1 flex flex-col justify-between relative min-h-0">
          
          {/* Top Section */}
          <div className="grid grid-cols-12 gap-8 items-center my-auto py-1">
            
            {/* LEFT COLUMN: HERO TEXT */}
            <div className="col-span-7 space-y-2">
              <div className="inline-flex items-center gap-2">
                <span className="text-[#0F8B75] text-[10px] font-bold tracking-widest uppercase relative">
                  SERVICES
                  <svg
                    className="absolute left-0 -bottom-1 w-full h-1.5 text-[#0F8B75] overflow-visible"
                    viewBox="0 0 70 6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <path d="M 2 3 C 20 1, 50 5, 68 2" />
                  </svg>
                </span>
              </div>

              <h1 className="text-4xl xl:text-5xl font-extrabold tracking-tight text-[#131921] leading-[1.08]">
                Solutions,<br />
                built around<br />
                <span className="font-serif italic text-[#0F8B75] relative inline-block font-normal pt-0.5">
                  your goals.
                  <svg
                    className="absolute -bottom-1.5 left-0 w-full h-3 text-[#F5C748] overflow-visible pointer-events-none"
                    viewBox="0 0 160 14"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M 3 5 C 45 1, 100 9, 155 4" strokeWidth="3" strokeLinecap="round" />
                    <path d="M 10 11 C 55 7, 115 12, 145 8" strokeWidth="2" strokeLinecap="round" opacity="0.85" />
                  </svg>
                </span>
              </h1>

              <p className="text-slate-600 text-sm font-medium max-w-md leading-relaxed pt-1">
                From powerful websites to smart automation, I build digital products that solve real problems and create real impact.
              </p>
            </div>

            {/* RIGHT COLUMN: HERO ILLUSTRATION */}
            <div className="col-span-5 relative flex items-center justify-center min-h-[200px] select-none">
              <div className="absolute w-52 h-52 rounded-full bg-[#E2F1ED] opacity-90 z-0 flex items-center justify-center overflow-hidden">
                <div className="absolute top-3 right-3 w-20 h-20 opacity-30 bg-[radial-gradient(#0F8B75_1.5px,transparent_1.5px)] [background-size:8px_8px]" />
              </div>

              <div className="absolute left-14 bottom-6 w-12 h-12 bg-[#F5C748] rounded-md transform -rotate-12 shadow-xs z-10" />

              <div className="relative z-20 w-44 h-34 bg-white rounded-xl border-2 border-[#131921] shadow-xl flex flex-col overflow-hidden">
                <div className="h-6 border-b-2 border-[#131921] bg-slate-50 px-2 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#131921]" />
                  <span className="w-2 h-2 rounded-full bg-[#131921]" />
                  <span className="w-2 h-2 rounded-full bg-[#131921]" />
                </div>
                <div className="flex-1 flex items-center justify-center bg-white font-mono font-black text-3xl text-[#131921] tracking-tighter">
                  &lt;/&gt;
                </div>
              </div>

              <div className="absolute right-8 top-2 z-30">
                <svg
                  className="w-10 h-14 text-[#131921]"
                  viewBox="0 0 40 50"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M 10 40 Q 30 40, 25 22 T 15 12 Q 22 5, 32 14" />
                  <polyline points="25 6, 32 14, 23 18" />
                </svg>
              </div>

              <div className="absolute top-2 left-8 text-[#131921] text-[10px] font-bold">✦</div>
              <div className="absolute bottom-3 right-6 text-[#131921] text-[10px] font-bold">✚</div>
            </div>

          </div>

          {/* DESKTOP 4 SERVICE CARDS GRID */}
          <div className="grid grid-cols-4 gap-4 my-2">
            
            {/* CARD 01: WEB DEVELOPMENT */}
            <div
              onClick={() => onNavigateToService('web-dev')}
              onKeyDown={(event) => handleServiceKeyDown(event, 'web-dev')}
              role="link"
              tabIndex={0}
              id="card-service-01"
              className="group bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between relative overflow-hidden"
            >
              <div className="space-y-3">
                <div className="relative w-full h-32 rounded-xl bg-[#E2F1ED] flex items-center justify-center overflow-hidden border border-emerald-100/80">
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#0F8B75_1px,transparent_1px)] [background-size:6px_6px]" />
                  <span className="absolute top-2 left-2.5 font-extrabold text-[#0F8B75] text-sm font-mono">01</span>

                  <div className="relative z-10 w-20 h-16 bg-white rounded-lg border border-[#131921] shadow-sm p-1.5 flex flex-col gap-1">
                    <div className="h-2 flex items-center gap-1 border-b border-slate-200 pb-0.5">
                      <span className="w-1 h-1 rounded-full bg-[#131921]" />
                      <span className="w-1 h-1 rounded-full bg-[#131921]" />
                      <span className="w-1 h-1 rounded-full bg-[#131921]" />
                    </div>
                    <div className="flex-1 flex gap-1">
                      <div className="w-6 bg-[#0F8B75] rounded-[3px] flex items-center justify-center text-[8px] text-white font-mono font-bold">
                        =/&gt;
                      </div>
                      <div className="flex-1 flex flex-col gap-1">
                        <div className="h-2 bg-slate-100 rounded border border-slate-200" />
                        <div className="h-2 bg-slate-100 rounded border border-slate-200" />
                      </div>
                    </div>
                  </div>

                  <svg className="absolute bottom-1 right-2 w-8 h-4 text-[#131921]" viewBox="0 0 30 15" fill="none" stroke="currentColor" strokeWidth="1.2">
                    <path d="M 2 8 Q 12 15, 22 3 T 28 10" />
                  </svg>
                </div>

                <div className="space-y-0.5">
                  <h3 className="text-base font-extrabold text-slate-900 group-hover:text-[#0F8B75] transition-colors">
                    Web Development
                  </h3>
                  <p className="font-serif italic text-xs text-[#0F8B75] font-normal">
                    Fast. Modern. Responsive.
                  </p>
                  <p className="text-slate-600 text-[11px] font-medium leading-relaxed pt-1">
                    We build beautiful, high-performance websites that look stunning and convert visitors.
                  </p>
                </div>

                <div className="space-y-1.5 pt-1 text-[11px] font-bold text-slate-700">
                  <div className="flex items-center gap-2">
                    <span className="text-[#0F8B75]">⚛</span>
                    <span>React / Next.js</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Layers className="w-3.5 h-3.5 text-[#0F8B75]" />
                    <span>Headless CMS</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-[#0F8B75]" />
                    <span>SEO Ready</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-3">
                <div className="w-7 h-7 rounded-full bg-[#E2F1ED] text-[#0F8B75] group-hover:bg-[#0F8B75] group-hover:text-white flex items-center justify-center transition-all">
                  <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
              </div>
            </div>

            {/* CARD 02: CUSTOM SOFTWARE DEVELOPMENT */}
            <div
              onClick={() => onNavigateToService('software-dev')}
              onKeyDown={(event) => handleServiceKeyDown(event, 'software-dev')}
              role="link"
              tabIndex={0}
              id="card-service-02"
              className="group bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between relative overflow-hidden"
            >
              <div className="space-y-3">
                <div className="relative w-full h-32 rounded-xl bg-[#FEF3C7] flex items-center justify-center overflow-hidden border border-amber-100/80">
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#D97706_1px,transparent_1px)] [background-size:6px_6px]" />
                  <span className="absolute top-2 left-2.5 font-extrabold text-[#D97706] text-sm font-mono">02</span>

                  <div className="relative z-10 w-16 h-16 flex items-center justify-center">
                    <svg className="w-14 h-14 stroke-[#131921]" viewBox="0 0 40 40" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="20,4 28,8 20,12 12,8" fill="white" />
                      <polygon points="12,8 20,12 20,20 12,16" fill="#F8FAFC" />
                      <polygon points="20,12 28,8 28,16 20,20" fill="#E2E8F0" />

                      <polygon points="12,16 20,20 12,24 4,20" fill="#F59E0B" />
                      <polygon points="4,20 12,24 12,32 4,28" fill="#D97706" />
                      <polygon points="12,24 20,20 20,28 12,32" fill="#FBBF24" />

                      <polygon points="28,16 36,20 28,24 20,20" fill="white" />
                      <polygon points="20,20 28,24 28,32 20,28" fill="#E2E8F0" />
                      <polygon points="28,24 36,20 36,28 28,32" fill="#CBD5E1" />
                    </svg>
                  </div>

                  <svg className="absolute bottom-1 right-2 w-8 h-4 text-[#131921]" viewBox="0 0 30 15" fill="none" stroke="currentColor" strokeWidth="1.2">
                    <path d="M 2 8 Q 12 15, 22 3 T 28 10" />
                  </svg>
                </div>

                <div className="space-y-0.5">
                  <h3 className="text-base font-extrabold text-slate-900 group-hover:text-[#D97706] transition-colors">
                    Custom Software Development
                  </h3>
                  <p className="font-serif italic text-xs text-[#D97706] font-normal">
                    Built around your logic.
                  </p>
                  <p className="text-slate-600 text-[11px] font-medium leading-relaxed pt-1">
                    Scalable, secure and custom software solutions that streamline your operations.
                  </p>
                </div>

                <div className="space-y-1.5 pt-1 text-[11px] font-bold text-slate-700">
                  <div className="flex items-center gap-2">
                    <Globe className="w-3.5 h-3.5 text-[#D97706]" />
                    <span>Web Apps</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Layout className="w-3.5 h-3.5 text-[#D97706]" />
                    <span>Admin Panels</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Cloud className="w-3.5 h-3.5 text-[#D97706]" />
                    <span>APIs</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-3">
                <div className="w-7 h-7 rounded-full bg-[#FEF3C7] text-[#D97706] group-hover:bg-[#D97706] group-hover:text-white flex items-center justify-center transition-all">
                  <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
              </div>
            </div>

            {/* CARD 03: AI & AUTOMATION */}
            <div
              onClick={() => onNavigateToService('ai-solutions')}
              onKeyDown={(event) => handleServiceKeyDown(event, 'ai-solutions')}
              role="link"
              tabIndex={0}
              id="card-service-03"
              className="group bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between relative overflow-hidden"
            >
              <div className="space-y-3">
                <div className="relative w-full h-32 rounded-xl bg-[#F3E8FF] flex items-center justify-center overflow-hidden border border-purple-100/80">
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#7C3AED_1px,transparent_1px)] [background-size:6px_6px]" />
                  <span className="absolute top-2 left-2.5 font-extrabold text-[#7C3AED] text-sm font-mono">03</span>

                  <div className="relative z-10 w-16 h-16 flex items-center justify-center">
                    <svg className="w-14 h-14 stroke-[#131921]" viewBox="0 0 36 36" fill="none" strokeWidth="1.5" strokeLinecap="round">
                      <path d="M 12 10 Q 8 6, 6 12 Q 4 18, 10 22 Q 12 26, 18 26 Q 24 26, 26 22 Q 32 18, 30 12 Q 28 6, 24 10 Q 18 6, 12 10 Z" fill="white" />
                      <path d="M 18 8 L 18 26" strokeDasharray="2 2" />
                      <circle cx="10" cy="14" r="1.5" fill="#7C3AED" />
                      <circle cx="26" cy="14" r="1.5" fill="#7C3AED" />
                      <circle cx="14" cy="20" r="1.5" fill="#7C3AED" />
                      <circle cx="22" cy="20" r="1.5" fill="#7C3AED" />
                      <line x1="10" y1="14" x2="14" y2="20" />
                      <line x1="26" y1="14" x2="22" y2="20" />
                    </svg>
                  </div>

                  <svg className="absolute bottom-1 right-2 w-8 h-4 text-[#131921]" viewBox="0 0 30 15" fill="none" stroke="currentColor" strokeWidth="1.2">
                    <path d="M 2 8 Q 12 15, 22 3 T 28 10" />
                  </svg>
                </div>

                <div className="space-y-0.5">
                  <h3 className="text-base font-extrabold text-slate-900 group-hover:text-[#7C3AED] transition-colors">
                    AI & Automation
                  </h3>
                  <p className="font-serif italic text-xs text-[#7C3AED] font-normal">
                    Work smarter. Save hours.
                  </p>
                  <p className="text-slate-600 text-[11px] font-medium leading-relaxed pt-1">
                    Intelligent solutions and automation workflows that remove repetitive work.
                  </p>
                </div>

                <div className="space-y-1.5 pt-1 text-[11px] font-bold text-slate-700">
                  <div className="flex items-center gap-2">
                    <Cpu className="w-3.5 h-3.5 text-[#7C3AED]" />
                    <span>AI Integration</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="w-3.5 h-3.5 text-[#7C3AED]" />
                    <span>Workflow Automation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bot className="w-3.5 h-3.5 text-[#7C3AED]" />
                    <span>RPA</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-3">
                <div className="w-7 h-7 rounded-full bg-[#F3E8FF] text-[#7C3AED] group-hover:bg-[#7C3AED] group-hover:text-white flex items-center justify-center transition-all">
                  <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
              </div>
            </div>

            {/* CARD 04: BACKEND & CLOUD SOLUTIONS */}
            <div
              onClick={() => onNavigateToService('automation')}
              onKeyDown={(event) => handleServiceKeyDown(event, 'automation')}
              role="link"
              tabIndex={0}
              id="card-service-04"
              className="group bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between relative overflow-hidden"
            >
              <div className="space-y-3">
                <div className="relative w-full h-32 rounded-xl bg-[#E6F4F1] flex items-center justify-center overflow-hidden border border-teal-100/80">
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#0F8B75_1px,transparent_1px)] [background-size:6px_6px]" />
                  <span className="absolute top-2 left-2.5 font-extrabold text-[#0F8B75] text-sm font-mono">04</span>

                  <div className="relative z-10 w-16 h-16 flex items-center justify-center">
                    <svg className="w-14 h-14 stroke-[#131921]" viewBox="0 0 36 36" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M 8 22 C 4 22, 3 17, 7 14 C 6 10, 11 8, 15 10 C 18 7, 24 8, 25 12 C 29 12, 31 16, 28 20 C 31 24, 27 26, 23 25 L 8 25 Z" fill="white" />
                      <path d="M 18 16 L 22 18 V 22 C 22 24.5 18 26 18 26 C 18 26 14 24.5 14 22 V 18 L 18 16 Z" fill="#E2F1ED" stroke="#0F8B75" strokeWidth="1.5" />
                      <polyline points="16.5,21 17.5,22.5 19.5,19.5" stroke="#0F8B75" strokeWidth="1.5" />
                    </svg>
                  </div>

                  <svg className="absolute bottom-1 right-2 w-8 h-4 text-[#131921]" viewBox="0 0 30 15" fill="none" stroke="currentColor" strokeWidth="1.2">
                    <path d="M 2 8 Q 12 15, 22 3 T 28 10" />
                  </svg>
                </div>

                <div className="space-y-0.5">
                  <h3 className="text-base font-extrabold text-slate-900 group-hover:text-[#0F8B75] transition-colors">
                    Backend & Cloud Solutions
                  </h3>
                  <p className="font-serif italic text-xs text-[#0F8B75] font-normal">
                    Secure. Scalable. Reliable.
                  </p>
                  <p className="text-slate-600 text-[11px] font-medium leading-relaxed pt-1">
                    Robust backend systems and cloud infrastructure that grow with your business.
                  </p>
                </div>

                <div className="space-y-1.5 pt-1 text-[11px] font-bold text-slate-700">
                  <div className="flex items-center gap-2">
                    <Code2 className="w-3.5 h-3.5 text-[#0F8B75]" />
                    <span>Node.js / Python</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Server className="w-3.5 h-3.5 text-[#0F8B75]" />
                    <span>AWS / Cloud</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Database className="w-3.5 h-3.5 text-[#0F8B75]" />
                    <span>Database Design</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-3">
                <div className="w-7 h-7 rounded-full bg-[#E6F4F1] text-[#0F8B75] group-hover:bg-[#0F8B75] group-hover:text-white flex items-center justify-center transition-all">
                  <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
              </div>
            </div>

          </div>

          {/* DESKTOP BOTTOM SAGE BANNER */}
          <div className="bg-[#EAF3F0] rounded-2xl p-4 border border-[#CDE3DC] text-[#131921] shadow-2xs relative overflow-hidden mt-3">
            <div className="relative z-10 flex items-center justify-between gap-4">
              
              <div className="flex items-start gap-3 flex-1">
                <span className="text-3xl font-extrabold text-[#0F8B75] leading-none font-serif select-none">
                  “
                </span>
                <div className="space-y-0.5">
                  <p className="text-sm font-extrabold text-[#131921] tracking-tight">
                    Good code solves problems.
                  </p>
                  <p className="text-sm font-extrabold text-[#131921] tracking-tight">
                    Great solutions create impact.
                  </p>
                  <p className="text-xs font-serif italic text-[#0F8B75] pt-0.5 font-semibold">
                    — GSV
                  </p>
                </div>
              </div>

              <div className="w-px h-10 bg-[#CDE3DC]" />

              <div className="flex items-center justify-end gap-3 flex-1">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#09121F] text-white flex items-center justify-center shrink-0">
                    <Calendar className="w-4 h-4" />
                  </div>

                  <div className="space-y-0.5">
                    <h4 className="text-xs font-extrabold text-[#131921] tracking-tight">
                      Let's build something that matters.
                    </h4>
                    <p className="text-[11px] text-slate-600 font-medium leading-tight">
                      Book a free consultation call and let's talk about your ideas.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => onStartProject('web-dev')}
                  id="btn-services-schedule-call"
                  className="bg-[#09121F] hover:bg-slate-800 text-white pl-3.5 pr-1 py-1 rounded-full text-xs font-bold flex items-center gap-2 shadow-xs transition-all cursor-pointer active:scale-95 group shrink-0"
                >
                  <span>Schedule a Call</span>
                  <div className="w-5 h-5 rounded-full bg-[#10B981] text-slate-950 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                    <ArrowRight className="w-3 h-3 stroke-[2.8]" />
                  </div>
                </button>
              </div>

            </div>
          </div>

        </main>
      </div>

    </div>
  );
};
