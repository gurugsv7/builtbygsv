import React from 'react';
import { ArrowRight, Code2 } from 'lucide-react';
import { HeroIllustration } from '../illustrations/HeroIllustration';

interface HeroLandingScreenProps {
  onGetStarted: () => void;
}

export const HeroLandingScreen: React.FC<HeroLandingScreenProps> = ({ onGetStarted }) => {
  return (
    <div className="flex h-[100dvh] min-h-[440px] flex-col overflow-hidden bg-[#F8F9FA] px-5 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-[max(1rem,env(safe-area-inset-top))] text-[#131921] sm:px-8">
      {/* Top Header Logo */}
      <div className="z-10 flex shrink-0 items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-[#0F8B75] font-black tracking-tighter">
            <Code2 className="h-5 w-5 stroke-[3]" />
            <span className="text-[13px] font-extrabold tracking-tight text-[#131921] sm:text-sm">
              Builtby<span className="text-[#0F8B75]">GSV</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Heading & Subtitle */}
      <div className="z-10 mt-6 shrink-0 space-y-3 sm:mt-8">
        <h1 className="text-[clamp(1.75rem,8.6vw,3.25rem)] font-extrabold leading-[1.02] tracking-[-0.045em] text-[#131921]">
          <span className="block whitespace-nowrap">I turn ideas into</span>
          <span className="block whitespace-nowrap">
            <span className="brush-teal-highlight text-[#0F8B75]">digital products</span>{' '}
            that
          </span>
          <span className="block whitespace-nowrap">
            make an <span className="oval-loop font-black">impact.</span>
          </span>
        </h1>

        <p className="max-w-sm pt-1 text-[13px] font-medium leading-[1.55] text-slate-600 sm:text-sm">
          Web. Software. AI Solutions.<br />
          Custom builds that solve real problems.
        </p>
      </div>

      {/* Hero Illustration Graphic */}
      <div className="z-10 flex min-h-0 flex-1 items-center justify-center py-1">
        <HeroIllustration className="my-0 w-[min(78vw,340px)] max-h-full mx-auto" />
      </div>

      {/* Bottom Dark Brush Call-to-Action Banner */}
      <div className="z-10 shrink-0">
        <button
          onClick={onGetStarted}
          id="btn-hero-cta"
          className="w-full relative group cursor-pointer text-left focus:outline-none"
        >
          {/* Main Dark Painterly Brush Container */}
          <div className="relative flex min-h-[76px] w-full items-center justify-between overflow-hidden rounded-b-[22px] rounded-t-[12px] border-t border-white/10 bg-[#091322] px-4 py-3.5 text-white shadow-2xl transition-all duration-300 group-hover:bg-[#0c182c] group-active:scale-[0.99] sm:min-h-[88px] sm:px-5">
            
            {/* Top Painterly Brush Stroke Top Edge & Canvas Grain Background */}
            <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:12px_12px]" />
            
            {/* Top-left dry brush paint streaks effect */}
            <svg
              className="absolute top-0 left-0 w-48 h-8 text-white/10 pointer-events-none"
              viewBox="0 0 200 30"
              fill="currentColor"
              preserveAspectRatio="none"
            >
              <path d="M 0 0 C 40 4, 80 2, 120 8 C 150 12, 180 6, 200 15 L 200 0 Z" />
              <path d="M 0 5 C 30 2, 60 8, 90 4 C 110 2, 130 9, 150 6 L 0 0 Z" opacity="0.6" />
            </svg>

            {/* Subtle brush texture slant on top right */}
            <svg
              className="absolute top-0 right-0 w-32 h-6 text-white/5 pointer-events-none"
              viewBox="0 0 150 25"
              fill="currentColor"
              preserveAspectRatio="none"
            >
              <path d="M 0 0 C 40 8, 90 3, 150 12 L 150 0 Z" />
            </svg>

            {/* Left Content: Handwritten Text + Doodle Underline */}
            <div className="relative z-10 flex flex-col justify-center pr-2">
              <span className="font-handwritten text-xl sm:text-2xl font-medium text-slate-50 tracking-wide leading-[1.05] group-hover:text-amber-100 transition-colors">
                <span className="block">Let's build</span>
                <span className="block">something amazing</span>
              </span>

              {/* Hand-drawn Underline Doodle */}
              <div className="mt-1 pl-12 sm:pl-16">
                <svg
                  className="h-2.5 w-24 overflow-visible text-slate-100 sm:w-32"
                  viewBox="0 0 120 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  {/* Primary organic underline curve */}
                  <path d="M 2 4 Q 35 1, 75 7 T 118 4" opacity="0.9" />
                  {/* Secondary subtle accent underline stroke */}
                  <path d="M 12 8 Q 50 5, 102 9" strokeWidth="1.5" opacity="0.65" />
                </svg>
              </div>
            </div>

            {/* Right Content: Bright Warm Yellow Circle Button */}
            <div className="relative z-10 shrink-0 ml-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F3C258] text-[#08101E] shadow-lg transition-all duration-300 group-hover:scale-105 group-hover:bg-[#f5c963] group-hover:shadow-amber-500/20 sm:h-13 sm:w-13">
                <ArrowRight className="h-5 w-5 stroke-[2.5] transition-transform group-hover:translate-x-0.5 sm:h-6 sm:w-6" />
              </div>
            </div>

          </div>
        </button>
      </div>
    </div>
  );
};
