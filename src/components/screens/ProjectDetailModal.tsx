import React, { useEffect } from 'react';
import { X, Sprout, Code, Globe, Zap, Video, ExternalLink, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { Project } from '../../types';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
  onStartSimilarProject: (projectCategory: string) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  onStartSimilarProject,
}) => {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  if (!project) return null;

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Video': return Video;
      case 'Sprout': return Sprout;
      case 'Code': return Code;
      case 'Globe': return Globe;
      case 'Zap': return Zap;
      default: return Code;
    }
  };

  const IconComp = getIcon(project.iconName);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div role="dialog" aria-modal="true" aria-labelledby="project-modal-title" className="bg-[#F8F9FA] w-full max-w-lg rounded-t-3xl sm:rounded-3xl max-h-[90vh] overflow-y-auto no-scrollbar shadow-2xl border border-slate-200/80 flex flex-col justify-between">
        {/* Modal Top Header */}
        <div className="sticky top-0 bg-[#F8F9FA]/95 backdrop-blur-md px-5 py-4 border-b border-slate-200/80 flex items-center justify-between z-10">
          <div className="flex items-center gap-2.5">
            <div className={`w-9 h-9 rounded-xl ${project.iconBgColor} ${project.iconTextColor} flex items-center justify-center shrink-0`}>
              <IconComp className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <h2 id="project-modal-title" className="text-sm font-extrabold text-slate-900">{project.title}</h2>
              <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${project.statusColor}`}>
                {project.status}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            id="btn-close-project-modal"
            className="p-1.5 rounded-full text-slate-500 hover:bg-slate-200/60 active:scale-95 transition-all"
            aria-label="Close project details"
          >
            <X className="w-5 h-5 stroke-[2.2]" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-5 space-y-5">
          {/* Subtitle & Info Bar */}
          <div className="space-y-2">
            <p className="text-xs font-semibold text-slate-700 leading-relaxed">
              {project.subtitle}
            </p>

            <div className="flex items-center gap-4 text-[11px] text-slate-500 pt-1">
              {project.client && (
                <span className="flex items-center gap-1">
                  <span className="font-bold text-slate-700">Client:</span> {project.client}
                </span>
              )}
              {project.year && (
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-slate-400" /> {project.year}
                </span>
              )}
              {project.location && (
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-slate-400" /> {project.location}
                </span>
              )}
            </div>
          </div>

          {/* Key Metrics Grid */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="grid grid-cols-2 gap-2.5">
              {project.metrics.map((m, idx) => (
                <div key={idx} className="bg-white border border-slate-200/80 rounded-2xl p-3 shadow-2xs space-y-0.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{m.label}</span>
                  <p className="text-sm font-extrabold text-[#0F8B75]">{m.value}</p>
                </div>
              ))}
            </div>
          )}

          {/* Description */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-2xs space-y-2">
            <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider text-[#0F8B75]">
              Overview
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Problem & Solution */}
          {project.problemStatement && (
            <div className="space-y-3">
              <div className="bg-rose-50/60 border border-rose-100 rounded-2xl p-3.5 space-y-1">
                <h4 className="text-xs font-extrabold text-rose-800">The Problem</h4>
                <p className="text-xs text-rose-950/80 leading-snug">{project.problemStatement}</p>
              </div>

              {project.solutionProvided && (
                <div className="bg-emerald-50/60 border border-emerald-100 rounded-2xl p-3.5 space-y-1">
                  <h4 className="text-xs font-extrabold text-emerald-800 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    The Solution
                  </h4>
                  <p className="text-xs text-emerald-950/80 leading-snug">{project.solutionProvided}</p>
                </div>
              )}
            </div>
          )}

          {/* Tech Stack */}
          <div className="space-y-2">
            <h3 className="text-xs font-extrabold text-slate-900">Tech Stack Used</h3>
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span key={tag} className="text-xs font-bold px-3 py-1 rounded-xl bg-white border border-slate-200/90 text-slate-800 shadow-2xs">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 bg-white border-t border-slate-200/80 rounded-b-3xl flex items-center gap-3">
          <button
            onClick={() => {
              onClose();
              onStartSimilarProject(project.category);
            }}
            id="btn-build-similar-project"
            className="flex-1 bg-[#131921] hover:bg-slate-800 text-white text-xs font-bold py-3 px-4 rounded-2xl transition-all active:scale-95 shadow-xs"
          >
            Build Similar Project
          </button>

          {project.detailData?.liveUrl ? (
            <a
              href={project.detailData.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold p-3 rounded-2xl flex items-center gap-1.5 transition-all"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Live project</span>
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
};
