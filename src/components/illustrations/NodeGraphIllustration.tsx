import React from 'react';
import { Globe, Code, Brain, Zap } from 'lucide-react';
import { ScreenType } from '../../types';

interface NodeGraphIllustrationProps {
  onSelectService: (serviceScreen: ScreenType) => void;
}

export const NodeGraphIllustration: React.FC<NodeGraphIllustrationProps> = ({ onSelectService }) => {
  return (
    <div className="relative w-full max-w-sm mx-auto my-3 p-2">
      {/* SVG Connecting Dashed Paths */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 340 180" fill="none">
        {/* Curving dashed line from Top Left to Center */}
        <path
          d="M 80 40 Q 120 40 170 90"
          stroke="#0F8B75"
          strokeWidth="2"
          strokeDasharray="4 4"
          className="animated-dash"
        />
        {/* Curving dashed line from Top Right to Center */}
        <path
          d="M 260 40 Q 220 40 170 90"
          stroke="#E85D22"
          strokeWidth="2"
          strokeDasharray="4 4"
          className="animated-dash"
        />
        {/* Curving dashed line from Bottom Left to Center */}
        <path
          d="M 80 140 Q 120 140 170 90"
          stroke="#9333EA"
          strokeWidth="2"
          strokeDasharray="4 4"
          className="animated-dash"
        />
        {/* Curving dashed line from Bottom Right to Center */}
        <path
          d="M 260 140 Q 220 140 170 90"
          stroke="#D97706"
          strokeWidth="2"
          strokeDasharray="4 4"
          className="animated-dash"
        />
      </svg>

      {/* Grid Layout of Nodes */}
      <div className="relative z-10 grid grid-cols-2 gap-x-12 gap-y-10 items-center justify-items-center py-2">
        {/* Top Left Node: Web Experiences */}
        <button
          onClick={() => onSelectService('web-dev')}
          id="node-web-experiences"
          className="bg-white border-2 border-slate-200/90 rounded-full px-3.5 py-2 flex items-center gap-2 shadow-sm hover:shadow-md hover:border-[#0F8B75] transition-all active:scale-95 group w-[140px] justify-start"
        >
          <div className="w-8 h-8 rounded-full bg-[#E6F4F1] flex items-center justify-center text-[#0F8B75] group-hover:scale-110 transition-transform shrink-0">
            <Globe className="w-4 h-4 stroke-[2.2]" />
          </div>
          <span className="text-xs font-bold text-slate-800 leading-tight text-left">
            Web<br /><span className="font-normal text-slate-500 text-[11px]">Experiences</span>
          </span>
        </button>

        {/* Top Right Node: Custom Software */}
        <button
          onClick={() => onSelectService('software-dev')}
          id="node-custom-software"
          className="bg-white border-2 border-slate-200/90 rounded-full px-3.5 py-2 flex items-center gap-2 shadow-sm hover:shadow-md hover:border-[#E85D22] transition-all active:scale-95 group w-[140px] justify-start"
        >
          <div className="w-8 h-8 rounded-full bg-[#FDF1E7] flex items-center justify-center text-[#E85D22] group-hover:scale-110 transition-transform shrink-0">
            <Code className="w-4 h-4 stroke-[2.2]" />
          </div>
          <span className="text-xs font-bold text-slate-800 leading-tight text-left">
            Custom<br /><span className="font-normal text-slate-500 text-[11px]">Software</span>
          </span>
        </button>

        {/* Bottom Left Node: AI Solutions */}
        <button
          onClick={() => onSelectService('ai-solutions')}
          id="node-ai-solutions"
          className="bg-white border-2 border-slate-200/90 rounded-full px-3.5 py-2 flex items-center gap-2 shadow-sm hover:shadow-md hover:border-purple-500 transition-all active:scale-95 group w-[140px] justify-start"
        >
          <div className="w-8 h-8 rounded-full bg-[#F3E8FF] flex items-center justify-center text-purple-600 group-hover:scale-110 transition-transform shrink-0">
            <Brain className="w-4 h-4 stroke-[2.2]" />
          </div>
          <span className="text-xs font-bold text-slate-800 leading-tight text-left">
            AI<br /><span className="font-normal text-slate-500 text-[11px]">Solutions</span>
          </span>
        </button>

        {/* Bottom Right Node: Automation & Integrations */}
        <button
          onClick={() => onSelectService('automation')}
          id="node-automation"
          className="bg-white border-2 border-slate-200/90 rounded-full px-3.5 py-2 flex items-center gap-2 shadow-sm hover:shadow-md hover:border-amber-500 transition-all active:scale-95 group w-[140px] justify-start"
        >
          <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center text-amber-600 group-hover:scale-110 transition-transform shrink-0">
            <Zap className="w-4 h-4 stroke-[2.2]" />
          </div>
          <span className="text-xs font-bold text-slate-800 leading-tight text-left">
            Automation<br /><span className="font-normal text-slate-500 text-[10px] truncate">& Integrations</span>
          </span>
        </button>

        {/* Center Node: Dark Teal Circle with </> */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-12 h-12 rounded-full bg-[#131921] text-[#2DD4BF] border-4 border-white shadow-lg flex items-center justify-center font-extrabold text-base tracking-tighter">
            &lt;/&gt;
          </div>
        </div>
      </div>
    </div>
  );
};
