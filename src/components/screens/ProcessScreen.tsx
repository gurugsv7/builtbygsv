import { DELIVERY_STEPS } from '../../data/studio';
import React, { useState } from 'react';
import { 
  ArrowLeft, Bookmark, Lightbulb, Pencil, Code2, Rocket, TrendingUp, MessageSquare, ArrowRight 
} from 'lucide-react';

interface ProcessScreenProps {
  onBack?: () => void;
  onStartProject?: () => void;
}

export const ProcessScreen: React.FC<ProcessScreenProps> = ({
  onBack,
  onStartProject,
}) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const icons = [Lightbulb, Pencil, Code2, Rocket, TrendingUp];
  const steps = DELIVERY_STEPS.map((step, index) => ({ ...step, number: `0${index + 1}`, icon: icons[index] }));

  return (
    <div className="min-h-full bg-[#F8F9FA] pb-20 text-[#131921] animate-in fade-in duration-300">
      
      {/* Top Header Navigation */}
      <div className="sticky top-0 z-30 bg-[#F8F9FA]/90 backdrop-blur-md px-4 py-3 flex items-center justify-between border-b border-slate-200/50">
        <button
          onClick={onBack || (() => window.history.back())}
          className="p-1.5 rounded-full text-slate-700 hover:bg-slate-200/60 transition-colors"
          aria-label="Back"
        >
          <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
        </button>

        <button
          onClick={() => setIsBookmarked(!isBookmarked)}
          className="p-1.5 rounded-full text-slate-700 hover:bg-slate-200/60 transition-colors"
          aria-label="Bookmark"
        >
          <Bookmark className={`w-5 h-5 stroke-[2.2] ${isBookmarked ? 'fill-[#131921] text-[#131921]' : 'text-slate-700'}`} />
        </button>
      </div>

      <div className="px-4 sm:px-5 pt-2 space-y-5 max-w-3xl mx-auto">
        
        {/* Screen Headline */}
        <div className="space-y-1.5 pt-1">
          <div className="inline-block relative">
            <h1 className="text-3xl font-extrabold text-[#131921] tracking-tight">
              How We Build
            </h1>
            {/* Hand-drawn green underline */}
            <svg
              className="w-full h-2 text-[#0F8B75] mt-0.5 overflow-visible"
              viewBox="0 0 130 8"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            >
              <path d="M 2 4 C 40 1, 90 7, 128 3" />
            </svg>
          </div>

          <p className="text-xs text-slate-600 font-medium pt-1">
            A clear process. Transparent at every step.
          </p>
        </div>

        {/* Timeline Steps List */}
        <div className="relative pt-2 space-y-6">
          {/* Vertical Connecting Line */}
          <div className="absolute left-[54px] top-6 bottom-6 w-0.5 bg-slate-200 pointer-events-none" />

          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div key={step.number} className="relative flex items-center gap-4 group">
                
                {/* Number Label */}
                <span className="w-6 font-extrabold text-slate-900 text-xs text-center shrink-0">
                  {step.number}
                </span>

                {/* Circle Icon Badge */}
                <div className="w-12 h-12 rounded-full bg-white border border-slate-200 shadow-2xs flex items-center justify-center shrink-0 group-hover:border-[#0F8B75] group-hover:scale-105 transition-all z-10">
                  <Icon className="w-5 h-5 text-slate-700 group-hover:text-[#0F8B75] stroke-[2]" />
                </div>

                {/* Text Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-extrabold text-[#131921]">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-snug mt-0.5 font-medium">
                    {step.description}
                  </p>
                </div>

              </div>
            );
          })}
        </div>

        {/* Abstract Graphic Banner Card */}
        <div className="relative bg-[#D5EAE3] rounded-2xl p-8 overflow-hidden flex items-center justify-center border border-teal-200/60 my-5 min-h-[140px]">
          {/* Abstract green arch shape on left */}
          <div className="absolute -left-6 -bottom-6 w-32 h-32 bg-[#0F8B75]/25 rounded-t-full" />
          
          {/* Dark square block at bottom center */}
          <div className="absolute left-1/3 bottom-2 w-10 h-8 bg-[#04100D] rounded-xs" />
          
          {/* Yellow rectangle block on right */}
          <div className="absolute right-8 top-6 w-12 h-14 bg-[#F5C748] rounded-xs shadow-xs" />
          
          {/* Curved illustration line with arrows */}
          <svg className="absolute inset-0 w-full h-full text-slate-800/40 pointer-events-none" viewBox="0 0 320 120" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3">
            <path d="M 30 90 Q 120 15, 200 80 T 290 30" />
            <path d="M 285 25 L 292 31 L 285 37" fill="none" strokeWidth="2" strokeDasharray="none" />
          </svg>

          {/* Central Code Badge Circle */}
          <div className="relative z-10 w-16 h-16 rounded-full bg-[#04100D] text-white flex items-center justify-center shadow-xl border-2 border-emerald-500/40">
            <Code2 className="w-7 h-7 text-white stroke-[2.5]" />
          </div>
        </div>

        {/* Bottom Call to Action Banner */}
        <button type="button"
          onClick={onStartProject}
          id="banner-process-cta"
          className="group w-full text-left bg-[#EBF7F4] rounded-2xl p-4 flex items-center justify-between gap-3 border border-emerald-200/80 hover:border-[#0F8B75] transition-all cursor-pointer shadow-2xs"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#0F8B75] flex items-center justify-center shrink-0">
              <MessageSquare className="w-5 h-5 stroke-[2]" />
            </div>

            <div>
              <h3 className="text-xs font-extrabold text-[#131921] group-hover:text-[#0F8B75] transition-colors">
                Start a Project
              </h3>
              <p className="text-[11px] font-medium text-slate-600">
                Tell us what you're building.
              </p>
            </div>
          </div>

          <div className="w-9 h-9 rounded-full bg-[#131921] group-hover:bg-[#0F8B75] text-white flex items-center justify-center shrink-0 transition-colors">
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </div>
        </button>

      </div>
    </div>
  );
};
