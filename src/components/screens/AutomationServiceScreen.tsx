import { ServiceEngagement } from '../ServiceEngagement';
import React, { useState } from 'react';
import { ArrowLeft, Bookmark, ArrowRight, ChevronRight, Zap, RefreshCw, BellRing, Clock } from 'lucide-react';
import { ServiceDetail } from '../../types';
import { motion } from 'motion/react';
import { ServiceDesktopLayout } from '../ServiceDesktopLayout';
import { MobileServiceVisual } from '../visuals/ServiceDiagrams';
import { SERVICE_VISUALS } from '../../data/serviceVisuals';

interface AutomationServiceScreenProps {
  service: ServiceDetail;
  isBookmarked: boolean;
  onToggleBookmark: (serviceId: string) => void;
  onBack: () => void;
  onStartProject: () => void;
}

export const AutomationServiceScreen: React.FC<AutomationServiceScreenProps> = ({
  service,
  isBookmarked,
  onToggleBookmark,
  onBack,
  onStartProject,
}) => {
  const [selectedFeatureId, setSelectedFeatureId] = useState<string | null>(null);

  const getFeatureIcon = (iconName: string) => {
    switch (iconName) {
      case 'Zap': return Zap;
      case 'RefreshCw': return RefreshCw;
      case 'BellRing': return BellRing;
      case 'Clock': return Clock;
      default: return Zap;
    }
  };

  return (
    <>
    <div className="hidden lg:block">
      <ServiceDesktopLayout service={service} icons={{ Zap, RefreshCw, BellRing, Clock }} idPrefix="btn-automation" isBookmarked={isBookmarked}
        onToggleBookmark={onToggleBookmark} onBack={onBack} onStartProject={onStartProject} />
    </div>
    <div className="lg:hidden flex flex-col min-h-full px-5 pt-3 pb-8 bg-[#F8F9FA] text-[#131921] relative justify-between space-y-6">
      <div className="flex items-center justify-between py-1 z-10">
        <button
          onClick={onBack}
          id="btn-automation-back"
          className="p-2 -ml-2 rounded-xl text-slate-800 hover:bg-slate-200/60 active:scale-95 transition-all"
        >
          <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
        </button>

        <button
          onClick={() => onToggleBookmark(service.id)}
          id="btn-automation-bookmark"
          className={`p-2 -mr-2 rounded-xl transition-all ${
            isBookmarked ? 'text-amber-600 bg-amber-50' : 'text-slate-700 hover:bg-slate-200/60'
          }`}
        >
          <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : 'stroke-[2]'}`} />
        </button>
      </div>

      <div className="space-y-2 z-10">
        <span className="text-[11px] font-extrabold tracking-widest text-amber-600 uppercase">
          {service.tag}
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#131921] leading-tight">
          {service.title}
        </h1>
        <p className="font-handwritten text-xl text-amber-600 leading-none pt-0.5">
          {service.scriptTagline}
        </p>
        <p className="text-xs font-medium text-slate-600 leading-relaxed pt-1">
          {service.description}
        </p>
      </div>

      <MobileServiceVisual serviceId="automation" visual={SERVICE_VISUALS['automation']} />

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
              className="w-full text-left bg-white border border-slate-200/90 rounded-2xl p-3.5 shadow-2xs hover:border-amber-300 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-100">
                    <IconComp className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <div className="space-y-0.5 min-w-0">
                    <h3 className="text-xs font-extrabold text-slate-900 group-hover:text-amber-600 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-[11px] font-medium text-slate-500 leading-snug">
                      {feature.description}
                    </p>
                  </div>
                </div>
                <ChevronRight className={`w-4 h-4 text-slate-400 ${isExpanded ? 'rotate-90' : ''}`} />
              </div>
              {isExpanded && feature.details && (
                <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="mt-2.5 pt-2 border-t border-slate-100 text-[11px] text-slate-600 space-y-1 bg-amber-50/50 p-2.5 rounded-xl border border-amber-100">
                  <p className="font-medium">{feature.details}</p>
                </motion.div>
              )}
            </button>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-1.5 z-10">
        {service.techStack.map((tech) => (
          <span key={tech} className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-white border border-slate-200 text-slate-700">
            {tech}
          </span>
        ))}
      </div>

      <div className="z-10 pt-2 space-y-6">
        <ServiceEngagement />

      <button
          onClick={onStartProject}
          id="btn-automation-start-project"
          className="w-full bg-amber-600 hover:bg-amber-700 rounded-3xl p-3.5 flex items-center justify-between text-white shadow-lg transition-all active:scale-[0.98]"
        >
          <span className="font-extrabold text-base tracking-tight pl-3">Start a Project</span>
          <div className="w-9 h-9 rounded-full bg-white text-amber-600 flex items-center justify-center shadow-xs">
            <ArrowRight className="w-5 h-5 stroke-[2.5]" />
          </div>
        </button>
      </div>
    </div>
    </>
  );
};
