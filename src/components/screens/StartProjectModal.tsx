import React, { useEffect, useState } from 'react';
import { X, Send, CheckCircle2, Sparkles, DollarSign, Calendar } from 'lucide-react';
import { ServiceType } from '../../types';
import { brandEntity } from '../../seo';

interface StartProjectModalProps {
  initialService?: ServiceType;
  onClose: () => void;
}

export const StartProjectModal: React.FC<StartProjectModalProps> = ({
  initialService = 'web-dev',
  onClose,
}) => {
  const [selectedService, setSelectedService] = useState<ServiceType | 'multiple'>(initialService);
  const [budgetRange, setBudgetRange] = useState<string>('$1k - $3k');
  const [timeline, setTimeline] = useState<string>('2-4 Weeks');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const services = [
    { id: 'web-dev', label: 'Web Development', color: 'border-[#0F8B75] text-[#0F8B75] bg-[#E6F4F1]' },
    { id: 'software-dev', label: 'Custom Software', color: 'border-[#E85D22] text-[#E85D22] bg-[#FDF1E7]' },
    { id: 'ai-solutions', label: 'AI Solutions', color: 'border-purple-500 text-purple-600 bg-purple-50' },
    { id: 'automation', label: 'Automation', color: 'border-amber-500 text-amber-600 bg-amber-50' },
  ];

  const budgetOptions = ['$500 - $1k', '$1k - $3k', '$3k - $8k', '$8k+'];
  const timelineOptions = ['< 2 Weeks', '2-4 Weeks', '1-2 Months', 'Flexible'];

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !message) return;
    const subject = `BuiltbyGSV project inquiry: ${selectedService}`;
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Service: ${selectedService}`,
      `Budget: ${budgetRange}`,
      `Timeline: ${timeline}`,
      '',
      message,
    ].join('\n');
    window.location.href = `mailto:${brandEntity.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div role="dialog" aria-modal="true" aria-labelledby="start-project-title" className="bg-[#F8F9FA] w-full max-w-md rounded-t-3xl sm:rounded-3xl max-h-[90vh] overflow-y-auto no-scrollbar shadow-2xl border border-slate-200/80">
        {/* Header */}
        <div className="sticky top-0 bg-[#F8F9FA]/95 backdrop-blur-md px-5 py-4 border-b border-slate-200/80 flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#0F8B75] text-white flex items-center justify-center font-extrabold text-xs">
              &lt;/&gt;
            </div>
            <div>
              <h2 id="start-project-title" className="text-sm font-extrabold text-slate-900">Start a Project</h2>
              <p className="text-[10px] text-slate-500">Create a pre-filled email with your project details</p>
            </div>
          </div>

          <button
            onClick={onClose}
            id="btn-close-start-project"
            className="p-1.5 rounded-full text-slate-500 hover:bg-slate-200/60 active:scale-95 transition-all"
            aria-label="Close project inquiry"
          >
            <X className="w-5 h-5 stroke-[2.2]" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5">
          {isSubmitted ? (
            <div className="py-8 text-center space-y-4 animate-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#0F8B75] flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10 stroke-[2.2]" />
              </div>

              <div className="space-y-1">
                <h3 className="text-lg font-extrabold text-slate-900">Email draft opened</h3>
                <p className="text-xs text-slate-600 max-w-xs mx-auto leading-relaxed">
                  Your email app should contain a draft addressed to BuiltbyGSV. Review it and press send to submit your <span className="font-bold text-[#0F8B75]">{selectedService}</span> inquiry.
                </p>
              </div>

              <div className="bg-white p-3.5 rounded-2xl border border-slate-200 text-left text-xs space-y-1 text-slate-700 max-w-xs mx-auto">
                <p><span className="font-bold">Estimated Range:</span> {budgetRange}</p>
                <p><span className="font-bold">Target Timeline:</span> {timeline}</p>
                <p><span className="font-bold">Contact:</span> {email}</p>
              </div>

              <button
                onClick={onClose}
                className="w-full bg-[#0F8B75] hover:bg-[#0d7966] text-white font-extrabold text-xs py-3 rounded-2xl shadow-xs transition-all"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Service Selection */}
              <div className="space-y-2">
                <label className="text-xs font-extrabold text-slate-900 flex items-center justify-between">
                  <span>1. What service do you need?</span>
                  <Sparkles className="w-3.5 h-3.5 text-[#0F8B75]" />
                </label>

                <div className="grid grid-cols-2 gap-2">
                  {services.map((s) => {
                    const isSelected = selectedService === s.id;
                    return (
                      <button
                        type="button"
                        key={s.id}
                        onClick={() => setSelectedService(s.id as ServiceType)}
                        id={`select-service-${s.id}`}
                        className={`text-left p-2.5 rounded-2xl border transition-all text-xs font-extrabold ${
                          isSelected
                            ? `${s.color} border-2 shadow-2xs`
                            : 'bg-white border-slate-200/90 text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        {s.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Budget Estimator */}
              <div className="space-y-2">
                <label className="text-xs font-extrabold text-slate-900 flex items-center justify-between">
                  <span>2. Estimated Budget Range</span>
                  <DollarSign className="w-3.5 h-3.5 text-amber-500" />
                </label>

                <div className="grid grid-cols-4 gap-1.5">
                  {budgetOptions.map((b) => (
                    <button
                      type="button"
                      key={b}
                      onClick={() => setBudgetRange(b)}
                      id={`budget-opt-${b.replace(/[^a-zA-Z0-9]/g, '')}`}
                      className={`text-[10px] font-bold py-2 rounded-xl border transition-all ${
                        budgetRange === b
                          ? 'bg-[#131921] text-white border-[#131921]'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              {/* Timeline Selector */}
              <div className="space-y-2">
                <label className="text-xs font-extrabold text-slate-900 flex items-center justify-between">
                  <span>3. Expected Timeline</span>
                  <Calendar className="w-3.5 h-3.5 text-blue-500" />
                </label>

                <div className="grid grid-cols-4 gap-1.5">
                  {timelineOptions.map((t) => (
                    <button
                      type="button"
                      key={t}
                      onClick={() => setTimeline(t)}
                      className={`text-[10px] font-bold py-2 rounded-xl border transition-all ${
                        timeline === t
                          ? 'bg-[#0F8B75] text-white border-[#0F8B75]'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-2.5 pt-1">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name *"
                  id="input-inquiry-name"
                  aria-label="Your name"
                  autoComplete="name"
                  className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0F8B75]"
                />

                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your Email Address *"
                  id="input-inquiry-email"
                  aria-label="Your email address"
                  autoComplete="email"
                  className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0F8B75]"
                />

                <textarea
                  required
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Briefly describe what you'd like to build..."
                  id="input-inquiry-message"
                  aria-label="Project description"
                  className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0F8B75] resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                id="btn-submit-inquiry"
                className="w-full bg-[#0F8B75] hover:bg-[#0d7966] text-white font-extrabold text-xs py-3.5 rounded-2xl shadow-md transition-all active:scale-98 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4 stroke-[2.2]" />
                Open Email Draft
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
