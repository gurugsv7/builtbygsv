import { ServiceEngagement } from '../ServiceEngagement';
import React, { useState } from 'react';
import { ArrowLeft, Bookmark, ArrowRight, ChevronRight, Maximize2, GitBranch, Share2, Sliders, Check } from 'lucide-react';
import { ServiceDetail } from '../../types';
import { SoftwareDevIllustration } from '../illustrations/SoftwareDevIllustration';

interface SoftwareDevServiceScreenProps {
  service: ServiceDetail;
  isBookmarked: boolean;
  onToggleBookmark: (serviceId: string) => void;
  onBack: () => void;
  onStartProject: () => void;
}

export const SoftwareDevServiceScreen: React.FC<SoftwareDevServiceScreenProps> = ({
  service,
  isBookmarked,
  onToggleBookmark,
  onBack,
  onStartProject,
}) => {
  const [selectedFeatureId, setSelectedFeatureId] = useState<string | null>(null);

  const getFeatureIcon = (iconName: string) => {
    switch (iconName) {
      case 'Maximize2': return Maximize2;
      case 'GitBranch': return GitBranch;
      case 'Share2': return Share2;
      case 'Sliders': return Sliders;
      default: return Maximize2;
    }
  };

  return (
    <div className="flex flex-col min-h-full px-5 pt-3 pb-8 bg-[#F8F9FA] text-[#131921] relative justify-between space-y-6">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between py-1 z-10">
        <button
          onClick={onBack}
          id="btn-softwaredev-back"
          className="p-2 -ml-2 rounded-xl text-slate-800 hover:bg-slate-200/60 active:scale-95 transition-all"
          title="Back"
        >
          <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
        </button>

        <button
          onClick={() => onToggleBookmark(service.id)}
          id="btn-softwaredev-bookmark"
          className={`p-2 -mr-2 rounded-xl transition-all active:scale-95 ${
            isBookmarked ? 'text-[#E85D22] bg-[#FDF1E7]' : 'text-slate-700 hover:bg-slate-200/60'
          }`}
          title="Bookmark Service"
        >
          <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : 'stroke-[2]'}`} />
        </button>
      </div>

      {/* Main Title Block & Illustration Row */}
      <div className="grid grid-cols-12 gap-2 items-start z-10">
        <div className="col-span-7 space-y-2">
          <span className="text-[11px] font-extrabold tracking-widest text-[#E85D22] uppercase">
            {service.tag}
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#131921] leading-tight">
            {service.title}
          </h1>
          <p className="font-handwritten text-xl text-[#E85D22] leading-none pt-0.5">
            {service.scriptTagline}
          </p>
          <p className="text-xs font-medium text-slate-600 leading-relaxed pt-2">
            {service.description}
          </p>
        </div>

        <div className="col-span-5 flex justify-end">
          <SoftwareDevIllustration className="w-28 h-28 sm:w-32 sm:h-32" />
        </div>
      </div>

      {/* Feature Cards Stack with Clean Light Design & Orange Accents */}
      <div className="space-y-2.5 z-10">
        {service.features.map((feature) => {
          const IconComp = getFeatureIcon(feature.icon);
          const isExpanded = selectedFeatureId === feature.id;

          return (
            <button
              type="button"
              key={feature.id}
              onClick={() => setSelectedFeatureId(isExpanded ? null : feature.id)}
              aria-expanded={isExpanded}
              className="w-full text-left bg-white border border-slate-200/90 rounded-2xl p-3.5 shadow-2xs hover:shadow-sm hover:border-[#E85D22]/50 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FDF1E7] text-[#E85D22] flex items-center justify-center shrink-0 border border-orange-100 group-hover:scale-105 transition-transform">
                    <IconComp className="w-5 h-5 stroke-[2.2]" />
                  </div>

                  <div className="space-y-0.5 min-w-0">
                    <h3 className="text-xs font-extrabold text-slate-900 group-hover:text-[#E85D22] transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-[11px] font-medium text-slate-500 leading-snug">
                      {feature.description}
                    </p>
                  </div>
                </div>

                <ChevronRight
                  className={`w-4 h-4 text-slate-400 group-hover:text-slate-800 transition-transform shrink-0 ${
                    isExpanded ? 'rotate-90' : ''
                  }`}
                />
              </div>

              {/* Expanded Detail Panel */}
              {isExpanded && feature.details && (
                <div className="mt-2.5 pt-2.5 border-t border-slate-100 text-[11px] text-slate-600 space-y-1 bg-amber-50/50 p-2.5 rounded-xl border border-amber-100/60">
                  <p className="font-medium">{feature.details}</p>
                  <div className="flex items-center gap-1 text-[#E85D22] font-bold text-[10px] pt-1">
                    <Check className="w-3 h-3 stroke-[3]" />
                    Included in Custom Software Architecture
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Tech Badges */}
      <div className="flex flex-wrap gap-1.5 z-10 pt-1">
        {service.techStack.map((tech) => (
          <span key={tech} className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-white border border-slate-200/90 text-slate-700 shadow-2xs">
            {tech}
          </span>
        ))}
      </div>

      <ServiceEngagement />

      {/* Bottom Call-To-Action Orange Brush Button */}
      <div className="z-10 pt-2">
        <button
          onClick={onStartProject}
          id="btn-softwaredev-start-project"
          className="w-full brush-btn-orange p-3.5 flex items-center justify-between text-white shadow-lg hover:shadow-xl transition-all active:scale-[0.98] cursor-pointer group"
        >
          <span className="font-extrabold text-base tracking-tight pl-3">
            Start a Project
          </span>
          <div className="w-9 h-9 rounded-full bg-white text-[#E85D22] flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform shrink-0">
            <ArrowRight className="w-5 h-5 stroke-[2.5]" />
          </div>
        </button>
      </div>
    </div>
  );
};
