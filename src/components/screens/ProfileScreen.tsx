import React from 'react';
import { 
  ArrowLeft, Menu, Code2, Smile, Rocket, Infinity, 
  Box, Lightbulb, Pencil, Bike, Coffee, Gamepad2, 
  BookOpen, Calendar, ArrowRight 
} from 'lucide-react';

interface ProfileScreenProps {
  onBack?: () => void;
  onOpenMenu?: () => void;
  onStartProject?: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ 
  onBack, 
  onOpenMenu, 
  onStartProject,
}) => {
  const techStack = [
    'React', 'Next.js', 'Node.js', 'Python', 'Django',
    'PostgreSQL', 'MongoDB', 'Supabase', 'AWS',
    'Docker', 'Tailwind', 'TypeScript', 'Framer'
  ];

  return (
    <div className="min-h-full bg-[#F8F9FA] text-[#131921] animate-in fade-in duration-300">
      
      {/* ========================================== */}
      {/* MOBILE VIEW (Strictly Intact & Unchanged)  */}
      {/* ========================================== */}
      <div className="block lg:hidden min-h-full pb-20">
        {/* Header Navigation Bar */}
        <div className="sticky top-0 z-30 bg-[#F8F9FA]/90 backdrop-blur-md px-4 py-3 flex items-center justify-between border-b border-slate-200/50">
          <button
            onClick={onBack || (() => window.history.back())}
            className="p-1.5 rounded-full text-slate-700 hover:bg-slate-200/60 transition-colors"
            aria-label="Back"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
          </button>

          <button
            onClick={onOpenMenu}
            className="p-1.5 rounded-full text-slate-700 hover:bg-slate-200/60 transition-colors"
            aria-label="Menu"
          >
            <Menu className="w-6 h-6 stroke-[2]" />
          </button>
        </div>

        <div className="px-4 sm:px-5 pt-2 space-y-6 max-w-xl mx-auto">
          {/* Header Hero Section */}
          <div className="flex items-start justify-between gap-3 pt-1">
            <div className="flex-1 space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                About
              </span>
              <h1 className="text-3xl font-black text-[#131921] leading-tight tracking-tight">
                Built by{' '}
                <span className="relative inline-block text-[#131921]">
                  GSV
                  <svg
                    className="absolute -bottom-1 left-0 w-full h-2.5 text-[#F3C258] overflow-visible pointer-events-none"
                    viewBox="0 0 70 8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  >
                    <path d="M 2 4 Q 35 1, 68 5" />
                  </svg>
                </span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed pt-2 font-medium">
                Developer. Problem solver. Builder.<br />
                I turn ideas into products that create real impact.
              </p>
            </div>

            <div className="relative shrink-0 w-28 h-28 flex items-center justify-center">
              <div className="absolute inset-0 bg-[#E2F1ED] rounded-full overflow-hidden">
                <div className="absolute top-2 right-2 w-12 h-12 opacity-30 bg-[radial-gradient(#0F8B75_1px,transparent_1px)] [background-size:6px_6px]" />
              </div>
              <div className="absolute -left-1 bottom-1 w-8 h-8 bg-[#FDE047] rounded-full opacity-90" />
              <svg
                className="relative z-10 w-24 h-24 text-[#131921]"
                viewBox="0 0 100 100"
                fill="none"
                stroke="currentColor"
              >
                <path
                  d="M 45 30 C 45 20, 65 20, 65 30 C 65 35, 60 42, 55 45 C 50 48, 52 55, 50 58 C 45 58, 42 52, 42 45 Z"
                  fill="#131921"
                />
                <path
                  d="M 42 32 Q 38 20, 52 15 Q 65 18, 62 28 Q 50 22, 42 32 Z"
                  fill="#131921"
                />
                <path
                  d="M 25 85 C 25 65, 40 60, 50 60 C 60 60, 75 65, 75 85 Z"
                  fill="#131921"
                />
              </svg>
            </div>
          </div>

          {/* 4 Stats Grid (2x2) */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white rounded-2xl p-3.5 border border-slate-200/80 shadow-2xs space-y-1">
              <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-[#0F8B75]">
                <Code2 className="w-4.5 h-4.5 stroke-[2.2]" />
              </div>
              <p className="text-xl font-extrabold text-[#131921] pt-1">20+</p>
              <p className="text-[11px] font-semibold text-slate-500">Projects Delivered</p>
            </div>

            <div className="bg-white rounded-2xl p-3.5 border border-slate-200/80 shadow-2xs space-y-1">
              <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-[#0F8B75]">
                <Smile className="w-4.5 h-4.5 stroke-[2.2]" />
              </div>
              <p className="text-xl font-extrabold text-[#131921] pt-1">5+</p>
              <p className="text-[11px] font-semibold text-slate-500">Happy Clients</p>
            </div>

            <div className="bg-white rounded-2xl p-3.5 border border-slate-200/80 shadow-2xs space-y-1">
              <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-[#0F8B75]">
                <Rocket className="w-4.5 h-4.5 stroke-[2.2]" />
              </div>
              <p className="text-xl font-extrabold text-[#131921] pt-1">3+</p>
              <p className="text-[11px] font-semibold text-slate-500">Years of Building</p>
            </div>

            <div className="bg-white rounded-2xl p-3.5 border border-slate-200/80 shadow-2xs space-y-1">
              <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-[#0F8B75]">
                <Infinity className="w-4.5 h-4.5 stroke-[2.2]" />
              </div>
              <p className="text-xl font-extrabold text-[#131921] pt-1">∞</p>
              <p className="text-[11px] font-semibold text-slate-500">Curiosity & Learning</p>
            </div>
          </div>

          {/* Tech I work with */}
          <div className="space-y-2.5 pt-2">
            <h2 className="text-xs font-bold text-slate-900 tracking-tight">
              Tech I work with
            </h2>

            <div className="flex flex-wrap gap-1.5">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="text-xs font-bold px-3 py-1.5 rounded-xl bg-slate-200/70 text-slate-800"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Dark Quote Card */}
          <div className="relative bg-[#071815] rounded-2xl p-5 text-white shadow-xl border border-emerald-950 overflow-hidden space-y-3 mt-4">
            <div className="text-3xl font-black text-[#F3C258] leading-none select-none">
              “
            </div>

            <p className="text-sm font-semibold text-slate-100 leading-snug tracking-tight">
              Great code is not just about how it works. It's about how it helps people.
            </p>

            <p className="font-handwritten text-lg text-[#2DD4BF] font-normal pt-1">
              — GSV
            </p>

            <svg
              className="absolute bottom-2 right-3 w-12 h-4 text-emerald-800/60"
              viewBox="0 0 50 15"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M 2 8 C 15 2, 35 12, 48 5" />
              <path d="M 10 12 C 25 8, 40 14, 45 10" />
            </svg>
          </div>
        </div>
      </div>

      {/* ========================================== */}
      {/* DESKTOP VIEW (Exact Replica of Mockup)     */}
      {/* ========================================== */}
      <div className="hidden lg:block min-h-screen p-8 xl:p-10 max-w-7xl mx-auto space-y-10">
        
        {/* Top Desktop Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200/60">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#0F8B75] font-mono border-b-2 border-[#0F8B75] pb-0.5">01</span>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">ABOUT ME</span>
          </div>

          <div className="flex items-center gap-4">
            {/* Available Pill */}
            <div className="bg-white border border-slate-200/80 shadow-2xs px-3.5 py-1.5 rounded-full flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
              <span className="text-xs font-semibold text-slate-700">Available for new projects</span>
            </div>

            {/* Let's Talk Button */}
            <button
              onClick={onStartProject}
              className="bg-[#0B1513] hover:bg-slate-800 text-white pl-4 pr-1.5 py-1.5 rounded-full text-xs font-extrabold flex items-center gap-2 transition-all cursor-pointer shadow-xs active:scale-95"
            >
              <span>Let's Talk</span>
              <div className="w-6 h-6 rounded-full bg-[#0F8B75] text-white flex items-center justify-center">
                <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </div>
            </button>
          </div>
        </div>

        {/* SECTION 01: ABOUT ME HERO */}
        <div className="grid grid-cols-12 gap-8 items-center pt-1">
          
          {/* Left Text Column */}
          <div className="col-span-5 space-y-6">
            <h1 className="text-4xl xl:text-5xl font-extrabold text-[#131921] leading-[1.15] tracking-tight">
              I'm GSV.<br />
              I build things that<br />
              <span className="text-[#0F8B75] font-handwritten text-4xl xl:text-5xl font-normal relative inline-block">
                solve real problems.
                <svg
                  className="absolute -bottom-2 left-0 w-full h-3 text-[#F5C748] overflow-visible pointer-events-none"
                  viewBox="0 0 200 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                >
                  <path d="M 2 6 Q 100 2, 198 8" />
                </svg>
              </span>
            </h1>

            <p className="text-xs xl:text-sm text-slate-600 font-medium leading-relaxed max-w-sm">
              A developer and problem solver at heart.<br />
              I enjoy turning ideas into useful products<br />
              that people genuinely use and love.
            </p>

            <div className="pt-2">
              <p className="font-handwritten text-base text-slate-800 font-medium relative inline-block">
                Always learning. Always building.
                <svg
                  className="absolute -bottom-1 left-0 w-full h-2 text-[#0F8B75]/80 overflow-visible pointer-events-none"
                  viewBox="0 0 160 8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                >
                  <path d="M 2 4 Q 80 1, 158 5" />
                </svg>
              </p>
            </div>
          </div>

          {/* Center Illustration Column */}
          <div className="col-span-4 flex flex-col items-center relative">
            {/* Sticky Note */}
            <div className="bg-[#FAF7EC] p-5 rounded-xs shadow-md border border-amber-200/60 transform -rotate-2 relative max-w-[240px] z-10">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 bg-amber-100/90 backdrop-blur-xs border border-amber-200/50 transform rotate-1 shadow-2xs" />
              <div className="font-handwritten text-sm leading-snug text-slate-900 font-medium space-y-1">
                <p>Building in Bangalore.</p>
                <p>Rooted in Karaikal.</p>
                <p>Inspired by problems.</p>
                <p>
                  Driven by{' '}
                  <span className="bg-[#FDE047] px-1.5 py-0.5 rounded-xs font-bold text-slate-900 inline-block shadow-2xs">
                    impact.
                  </span>
                </p>
              </div>
            </div>

            {/* Hand-drawn doodle sketch below sticky note */}
            <div className="relative w-full h-48 -mt-6 flex items-center justify-center">
              <div className="absolute w-40 h-40 bg-[#E2F1ED] rounded-full overflow-hidden opacity-90">
                <div className="absolute top-2 right-2 w-16 h-16 opacity-25 bg-[radial-gradient(#0F8B75_1px,transparent_1px)] [background-size:6px_6px]" />
              </div>

              <div className="absolute right-8 top-2 w-10 h-10 rounded-full bg-[#FDE047] flex items-center justify-center font-mono text-xs font-bold text-slate-900 shadow-2xs border border-amber-300 z-10">
                &lt;/&gt;
              </div>

              <svg
                className="relative z-10 w-full h-full text-[#131921]"
                viewBox="0 0 240 140"
                fill="none"
                stroke="currentColor"
              >
                <path d="M 20 120 Q 120 118, 220 122" strokeWidth="1.8" strokeLinecap="round" />
                <path d="M 160 122 L 210 135" strokeWidth="1.2" strokeLinecap="round" />
                <path d="M 180 122 L 230 132" strokeWidth="1.2" strokeLinecap="round" />

                {/* Potted Plant */}
                <path d="M 45 105 L 55 105 L 53 120 L 47 120 Z" fill="#131921" strokeWidth="1.5" />
                <path d="M 50 105 Q 42 90, 38 95 Q 48 98, 50 105" fill="#0F8B75" strokeWidth="1" />
                <path d="M 50 105 Q 58 88, 62 94 Q 52 98, 50 105" fill="#0F8B75" strokeWidth="1" />
                <path d="M 50 95 Q 50 82, 50 82" stroke="#131921" strokeWidth="1.5" />

                {/* Isometric 3-tier Block Stairs */}
                <polygon points="120,118 160,98 200,118 160,132" fill="#1E293B" stroke="#131921" strokeWidth="1.8" />
                <polygon points="120,118 160,132 160,105 120,95" fill="#1E293B" stroke="#131921" strokeWidth="1.8" />
                <polygon points="160,132 200,118 200,95 160,105" fill="#0F172A" stroke="#131921" strokeWidth="1.8" />

                <polygon points="135,95 165,80 195,95 165,108" fill="#0F8B75" stroke="#131921" strokeWidth="1.8" />
                <polygon points="135,95 165,108 165,65 135,55" fill="#0F8B75" stroke="#131921" strokeWidth="1.8" />
                <polygon points="165,108 195,95 195,55 165,65" fill="#0D7966" stroke="#131921" strokeWidth="1.8" />

                <polygon points="150,65 170,55 190,65 170,75" fill="#FFFFFF" stroke="#131921" strokeWidth="1.8" />

                <path d="M 35 40 Q 60 70, 80 50 T 120 70" stroke="#131921" strokeWidth="1.5" strokeDasharray="3 3" />
              </svg>
            </div>
          </div>

          {/* Right Stats Column */}
          <div className="col-span-3 space-y-6 pl-6">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200/60 flex items-center justify-center text-slate-800 shrink-0">
                <Box className="w-5 h-5 stroke-[2]" />
              </div>
              <div>
                <p className="text-2xl font-black text-[#0F8B75] leading-none">20+</p>
                <p className="text-xs font-semibold text-slate-600 pt-0.5">Projects Delivered</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200/60 flex items-center justify-center text-slate-800 shrink-0">
                <Smile className="w-5 h-5 stroke-[2]" />
              </div>
              <div>
                <p className="text-2xl font-black text-[#0F8B75] leading-none">5+</p>
                <p className="text-xs font-semibold text-slate-600 pt-0.5">Happy Clients</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200/60 flex items-center justify-center text-slate-800 shrink-0">
                <Code2 className="w-5 h-5 stroke-[2]" />
              </div>
              <div>
                <p className="text-2xl font-black text-[#0F8B75] leading-none">3+</p>
                <p className="text-xs font-semibold text-slate-600 pt-0.5">Years of Building</p>
              </div>
            </div>
          </div>

        </div>

        {/* SECTION 02: MY APPROACH */}
        <div className="pt-8 border-t border-slate-200/60">
          <div className="grid grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Title & Intro */}
            <div className="col-span-4 space-y-4 pr-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#0F8B75] font-mono border-b-2 border-[#0F8B75] pb-0.5">02</span>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">MY APPROACH</span>
              </div>

              <h2 className="text-3xl xl:text-4xl font-extrabold text-[#131921] leading-[1.2]">
                Code with{' '}
                <span className="text-[#0F8B75] font-handwritten text-3xl xl:text-4xl font-normal relative inline-block">
                  purpose.
                </span><br />
                Build with{' '}
                <span className="text-[#0F8B75] font-handwritten text-3xl xl:text-4xl font-normal relative inline-block">
                  empathy.
                  <svg className="absolute -bottom-1 left-0 w-full h-2.5 text-[#F5C748] overflow-visible pointer-events-none" viewBox="0 0 120 10" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round">
                    <path d="M 2 5 Q 60 1, 118 7" />
                  </svg>
                </span>
              </h2>

              <p className="text-xs text-slate-600 font-medium leading-relaxed max-w-xs pt-1">
                I follow a simple process that keeps users at the center and impact as the goal.
              </p>

              {/* Hand-drawn curved arrow pointing to the steps */}
              <div className="pt-3 text-slate-700 pl-8">
                <svg className="w-20 h-10" viewBox="0 0 80 40" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <path d="M 5 15 Q 35 38, 70 20" />
                  <path d="M 60 15 L 72 20 L 68 28" />
                </svg>
              </div>
            </div>

            {/* Right Column: 4 Steps in 1 Horizontal Row */}
            <div className="col-span-8 grid grid-cols-4 gap-4 relative pt-1">
              
              {/* Step 1 */}
              <div className="space-y-3 relative flex flex-col items-start">
                <div className="relative w-full flex items-center justify-start pb-1">
                  <div className="w-13 h-13 rounded-full bg-[#E2F1ED] flex items-center justify-center text-[#131921] border border-emerald-200/60 shadow-2xs shrink-0">
                    <Lightbulb className="w-5 h-5 stroke-[1.8]" />
                  </div>
                  {/* Dashed Arrow 1->2 */}
                  <div className="absolute left-14 right-[-12px] top-1/2 -translate-y-1/2 hidden xl:block pointer-events-none text-slate-400">
                    <svg className="w-full h-6" viewBox="0 0 60 20" fill="none" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 3">
                      <path d="M 5 12 Q 30 2, 52 10" />
                      <path d="M 45 6 L 54 10 L 48 15" strokeDasharray="0" />
                    </svg>
                  </div>
                </div>

                <span className="text-xs font-mono font-bold text-[#0F8B75]">01</span>
                <h3 className="font-extrabold text-sm text-[#0F8B75]">Understand</h3>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  I dive deep into the problem, the people and the why behind it.
                </p>
              </div>

              {/* Step 2 */}
              <div className="space-y-3 relative flex flex-col items-start">
                <div className="relative w-full flex items-center justify-start pb-1">
                  <div className="w-13 h-13 rounded-full bg-[#FEF08A]/80 flex items-center justify-center text-[#131921] border border-amber-200/60 shadow-2xs shrink-0">
                    <Pencil className="w-5 h-5 stroke-[1.8]" />
                  </div>
                  {/* Dashed Arrow 2->3 */}
                  <div className="absolute left-14 right-[-12px] top-1/2 -translate-y-1/2 hidden xl:block pointer-events-none text-slate-400">
                    <svg className="w-full h-6" viewBox="0 0 60 20" fill="none" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 3">
                      <path d="M 5 10 Q 30 18, 52 10" />
                      <path d="M 45 6 L 54 10 L 48 15" strokeDasharray="0" />
                    </svg>
                  </div>
                </div>

                <span className="text-xs font-mono font-bold text-amber-500">02</span>
                <h3 className="font-extrabold text-sm text-[#0F8B75]">Design</h3>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  I design simple, thoughtful experiences that feel natural to use.
                </p>
              </div>

              {/* Step 3 */}
              <div className="space-y-3 relative flex flex-col items-start">
                <div className="relative w-full flex items-center justify-start pb-1">
                  <div className="w-13 h-13 rounded-full bg-[#E2F1ED] flex items-center justify-center text-[#131921] border border-emerald-200/60 shadow-2xs font-mono font-bold text-sm shrink-0">
                    &lt;/&gt;
                  </div>
                  {/* Dashed Arrow 3->4 */}
                  <div className="absolute left-14 right-[-12px] top-1/2 -translate-y-1/2 hidden xl:block pointer-events-none text-slate-400">
                    <svg className="w-full h-6" viewBox="0 0 60 20" fill="none" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 3">
                      <path d="M 5 12 Q 30 2, 52 10" />
                      <path d="M 45 6 L 54 10 L 48 15" strokeDasharray="0" />
                    </svg>
                  </div>
                </div>

                <span className="text-xs font-mono font-bold text-[#0F8B75]">03</span>
                <h3 className="font-extrabold text-sm text-[#0F8B75]">Build</h3>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  I write clean, scalable code that's reliable and easy to maintain.
                </p>
              </div>

              {/* Step 4 */}
              <div className="space-y-3 relative flex flex-col items-start">
                <div className="relative w-full flex items-center justify-start pb-1">
                  <div className="w-13 h-13 rounded-full bg-[#FEF08A]/80 flex items-center justify-center text-[#131921] border border-amber-200/60 shadow-2xs shrink-0">
                    <Rocket className="w-5 h-5 stroke-[1.8]" />
                  </div>
                </div>

                <span className="text-xs font-mono font-bold text-amber-500">04</span>
                <h3 className="font-extrabold text-sm text-[#0F8B75]">Ship &amp; Improve</h3>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  I ship fast, learn from feedback and keep making it better.
                </p>
              </div>

            </div>

          </div>
        </div>

        {/* SECTION 03: THINGS THAT DRIVE ME */}
        <div className="space-y-4 pt-8 border-t border-slate-200/60">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#0F8B75] font-mono border-b-2 border-[#0F8B75] pb-0.5">03</span>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">THINGS THAT DRIVE ME</span>
          </div>

          <div className="grid grid-cols-4 gap-4">
            <div className="bg-white/70 rounded-2xl p-4 border border-slate-200/80 flex items-center gap-3.5 shadow-2xs">
              <div className="w-11 h-11 rounded-xl bg-[#E2F1ED] flex items-center justify-center text-[#0F8B75] shrink-0">
                <Bike className="w-5 h-5 stroke-[2]" />
              </div>
              <div className="space-y-0.5">
                <h4 className="font-extrabold text-xs text-[#131921]">Cycling</h4>
                <p className="text-[11px] text-slate-500 font-medium leading-tight">
                  Clears my mind. Keeps me moving forward.
                </p>
              </div>
            </div>

            <div className="bg-white/70 rounded-2xl p-4 border border-slate-200/80 flex items-center gap-3.5 shadow-2xs">
              <div className="w-11 h-11 rounded-xl bg-[#FEF08A]/80 flex items-center justify-center text-amber-800 shrink-0">
                <Coffee className="w-5 h-5 stroke-[2]" />
              </div>
              <div className="space-y-0.5">
                <h4 className="font-extrabold text-xs text-[#131921]">Coffee</h4>
                <p className="text-[11px] text-slate-500 font-medium leading-tight">
                  Fuel for late nights, ideas and endless iterations.
                </p>
              </div>
            </div>

            <div className="bg-white/70 rounded-2xl p-4 border border-slate-200/80 flex items-center gap-3.5 shadow-2xs">
              <div className="w-11 h-11 rounded-xl bg-[#E2F1ED] flex items-center justify-center text-[#0F8B75] shrink-0">
                <Gamepad2 className="w-5 h-5 stroke-[2]" />
              </div>
              <div className="space-y-0.5">
                <h4 className="font-extrabold text-xs text-[#131921]">Football & FIFA</h4>
                <p className="text-[11px] text-slate-500 font-medium leading-tight">
                  Strategy, teamwork and the love for competition.
                </p>
              </div>
            </div>

            <div className="bg-white/70 rounded-2xl p-4 border border-slate-200/80 flex items-center gap-3.5 shadow-2xs">
              <div className="w-11 h-11 rounded-xl bg-[#FEF08A]/80 flex items-center justify-center text-amber-800 shrink-0">
                <BookOpen className="w-5 h-5 stroke-[2]" />
              </div>
              <div className="space-y-0.5">
                <h4 className="font-extrabold text-xs text-[#131921]">Always Learning</h4>
                <p className="text-[11px] text-slate-500 font-medium leading-tight">
                  New tech, new ideas, new perspectives—I never stop.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM CTA & QUOTE BANNER */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs flex items-center justify-between gap-6 relative mt-6">
          {/* Left Quote */}
          <div className="flex items-start gap-3 flex-1">
            <span className="text-[#0F8B75] font-extrabold text-3xl leading-none select-none">“</span>
            <p className="text-xs xl:text-sm font-semibold text-slate-800 leading-snug">
              I believe good products are built at the intersection of{' '}
              <span className="text-[#0F8B75] font-handwritten text-base xl:text-lg font-normal">
                empathy, technology and obsession for quality.
              </span>
            </p>
          </div>

          {/* Vertical Divider */}
          <div className="w-px h-10 bg-slate-200 shrink-0 hidden md:block" />

          {/* Right CTA Box */}
          <div className="flex items-center gap-4 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-[#131921] text-white flex items-center justify-center shrink-0">
              <Calendar className="w-5 h-5 stroke-[2]" />
            </div>

            <div className="space-y-0.5 pr-2">
              <p className="font-extrabold text-xs text-[#131921]">Let's build something that matters.</p>
              <p className="text-[11px] font-medium text-slate-500">If you have an idea, I'd love to hear about it.</p>
            </div>

            <div className="relative flex items-center">
              <button
                onClick={onStartProject}
                className="bg-[#0B1513] hover:bg-slate-800 text-white pl-4 pr-1.5 py-1.5 rounded-full text-xs font-extrabold flex items-center gap-2 transition-all cursor-pointer shadow-xs active:scale-95"
              >
                <span>Let's Talk</span>
                <div className="w-6 h-6 rounded-full bg-[#0F8B75] text-white flex items-center justify-center">
                  <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
              </button>

              <svg
                className="absolute -right-12 top-1/2 -translate-y-1/2 w-10 h-6 text-slate-800 pointer-events-none hidden xl:block"
                viewBox="0 0 40 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M 5 15 Q 20 2, 35 10" />
                <path d="M 28 8 L 36 10 L 32 16" />
              </svg>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

