import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Check, Copy, Download, FileText, Mail } from 'lucide-react';
import { BRIEF_STEPS, BriefAnswers, briefText, visibleFields } from '../../data/projectBrief';
import { brandEntity } from '../../seo';

const DRAFT_KEY = 'builtbygsv-project-brief-v1';
const initialAnswers = (): BriefAnswers => {
  const service = new URLSearchParams(window.location.search).get('service');
  const services: Record<string, string> = { 'web-dev': 'Website / web platform', 'software-dev': 'Custom software', 'ai-solutions': 'AI solution', automation: 'Automation' };
  return service && services[service] ? { service: services[service] } : {};
};
const controlClass = 'mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 focus:border-[#0F8B75] focus:outline-2 focus:outline-[#0F8B75]/25';

export function StartProjectScreen() {
  const [answers, setAnswers] = useState<BriefAnswers>(initialAnswers);
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState('');
  const [hasDraft, setHasDraft] = useState(() => { try { return Boolean(localStorage.getItem(DRAFT_KEY)); } catch { return false; } });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [prepared, setPrepared] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);
  const review = step === BRIEF_STEPS.length;
  const text = briefText(answers);

  useEffect(() => {
    if (firstRender.current) { firstRender.current = false; return; }
    heading.current?.focus();
    heading.current?.scrollIntoView({ block: 'start', behavior: 'instant' });
  }, [step]);
  useEffect(() => {
    if (!Object.keys(answers).some(key => key !== 'service')) return;
    const warn = (event: BeforeUnloadEvent) => { event.preventDefault(); };
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [answers]);

  useEffect(() => { setPrepared(false); }, [answers]);

  function changeStep(next: number) { setErrors({}); setStatus(''); setStep(next); }
  function nextStep() {
    const invalid: Record<string, string> = {};
    for (const field of visibleFields(step, answers)) {
      const value = answers[field.id]?.trim() || '';
      if (field.required && !value) invalid[field.id] = `Please answer: ${field.label.toLowerCase()}.`;
      else if (field.type === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) invalid[field.id] = 'Enter a valid email address, such as name@company.com.';
    }
    setErrors(invalid);
    if (Object.keys(invalid).length) {
      document.getElementById(`brief-${Object.keys(invalid)[0]}`)?.focus();
      return;
    }
    changeStep(step + 1);
  }
  function saveDraft() {
    try { localStorage.setItem(DRAFT_KEY, JSON.stringify(answers)); setHasDraft(true); setStatus('Draft saved on this browser. Save again after making changes.'); }
    catch { setStatus('This browser could not save your draft. Download a copy instead.'); }
  }
  function restoreDraft() {
    try {
      const stored: unknown = JSON.parse(localStorage.getItem(DRAFT_KEY) || '{}');
      if (!stored || typeof stored !== 'object' || Array.isArray(stored)) throw new Error('Invalid draft');
      const clean: BriefAnswers = {};
      for (const field of BRIEF_STEPS.flatMap(item => item.fields)) {
        const value = (stored as BriefAnswers)[field.id];
        if (typeof value === 'string' && (!field.options || field.options.includes(value))) clean[field.id] = value.slice(0, 5000);
      }
      setAnswers(clean); changeStep(0); setStatus('Saved draft restored.');
    } catch { setStatus('The saved draft could not be read. Your current answers have been kept.'); }
  }
  function download() {
    const url = URL.createObjectURL(new Blob([text], { type: 'text/plain;charset=utf-8' }));
    const anchor = document.createElement('a'); anchor.href = url; anchor.download = 'BuiltbyGSV-project-brief.txt'; anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setPrepared(true); setStatus('Brief downloaded. Attach it to your email before sending.');
  }
  async function copy() {
    try { await navigator.clipboard.writeText(text); setPrepared(true); setStatus('Complete brief copied. Paste it into your email before sending.'); }
    catch { setStatus('Copy is unavailable. Download the brief or select and copy the text below.'); }
  }
  const emailHref = `mailto:${brandEntity.email}?subject=${encodeURIComponent(`Project brief — ${(answers.company || 'New project').replace(/[\r\n]/g, ' ').slice(0, 120)}`)}&body=${encodeURIComponent('Hello BuiltbyGSV,\n\nPlease find my project brief attached or pasted below.\n\n[Attach BuiltbyGSV-project-brief.txt or paste your copied brief here before sending.]')}`;

  return <main className="mx-auto w-full max-w-7xl px-5 py-7 lg:px-10 lg:py-12 xl:px-16">
    <a href="/contact" className="inline-flex items-center gap-2 text-xs font-bold text-slate-600"><ArrowLeft size={15} /> Contact the studio</a>
    <header className="mb-8 mt-6 lg:mb-12">
      <p className="text-[11px] font-extrabold uppercase tracking-[.2em] text-[#0F8B75]">Let’s build something useful</p>
      <h1 className="mt-3 text-4xl font-black tracking-tight lg:text-6xl">Start a Project<span className="text-[#E85D22]">.</span></h1>
      <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 lg:text-base">A clear brief makes a better beginning. Tell us what your business needs, then review and email your brief to our team.</p>
    </header>
    <div className="grid items-start gap-8 xl:grid-cols-[240px_minmax(0,1fr)] xl:gap-12">
      <aside className="xl:sticky xl:top-8">
        <div className="hidden xl:block"><FileText className="mb-5 text-[#0F8B75]" size={32} /><p className="mb-5 text-sm font-bold">Your project, on paper.</p></div>
        <nav aria-label="Project brief progress" className="hidden xl:block"><ol className="space-y-2">{[...BRIEF_STEPS.map(item => item.title), 'Review & send'].map((title, index) => <li key={title}><button type="button" disabled={index > step} onClick={() => changeStep(index)} aria-current={index === step ? 'step' : undefined} className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-xs font-bold disabled:opacity-50 ${index === step ? 'bg-[#E6F4F1] text-[#0F8B75]' : 'text-slate-600'}`}><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-current">{index < step ? <Check size={13} /> : index + 1}</span>{title}</button></li>)}</ol></nav>
        <div className="xl:hidden"><div className="flex justify-between text-xs font-bold"><span>Step {step + 1} of 6</span><span>{review ? 'Review & send' : BRIEF_STEPS[step].title}</span></div><div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-200"><div className="h-full rounded-full bg-[#0F8B75]" style={{ width: `${((step + 1) / 6) * 100}%` }} /></div></div>
        <p className="mt-6 hidden text-xs leading-6 text-slate-500 xl:block">Answer what you know. We will clarify open questions before agreeing on scope, cost and delivery.</p>
      </aside>
      <div className="min-w-0">
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:rounded-3xl lg:p-8">
          <h2 ref={heading} tabIndex={-1} className="scroll-mt-6 text-2xl font-extrabold tracking-tight outline-none">{review ? 'Review your project brief' : BRIEF_STEPS[step].title}</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">{review ? 'Check every section before sharing. Nothing has been sent to BuiltbyGSV yet.' : BRIEF_STEPS[step].description}</p>
          {!review ? <form noValidate onSubmit={event => { event.preventDefault(); nextStep(); }} className="mt-7 space-y-6">
            <p className="text-xs text-slate-500">Optional questions are marked. Use “not sure yet” where you need our guidance.</p>
            {Object.keys(errors).length > 0 && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-800">Please check the highlighted questions to continue.</p>}
            {visibleFields(step, answers).map(field => <div key={field.id}>
              <label htmlFor={`brief-${field.id}`} className="block text-sm font-bold text-slate-900">{field.label}{!field.required && <span className="ml-1 font-normal text-slate-500">(optional)</span>}</label>
              {field.hint && <p id={`${field.id}-hint`} className="mt-1 text-xs leading-6 text-slate-500">{field.hint}</p>}
              {field.options ? <select id={`brief-${field.id}`} required={field.required} aria-invalid={Boolean(errors[field.id])} aria-describedby={errors[field.id] ? `${field.id}-error` : undefined} value={answers[field.id] || ''} onChange={event => setAnswers(previous => ({ ...previous, [field.id]: event.target.value }))} className={controlClass}><option value="">Choose an option</option>{field.options.map(option => <option key={option}>{option}</option>)}</select>
                : field.type === 'textarea' ? <textarea id={`brief-${field.id}`} required={field.required} rows={4} maxLength={5000} aria-invalid={Boolean(errors[field.id])} aria-describedby={[field.hint && `${field.id}-hint`, errors[field.id] && `${field.id}-error`].filter(Boolean).join(' ') || undefined} value={answers[field.id] || ''} onChange={event => setAnswers(previous => ({ ...previous, [field.id]: event.target.value }))} className={`${controlClass} resize-y`} />
                : <input id={`brief-${field.id}`} type={field.type || 'text'} autoComplete={field.autocomplete} required={field.required} maxLength={500} aria-invalid={Boolean(errors[field.id])} aria-describedby={[field.hint && `${field.id}-hint`, errors[field.id] && `${field.id}-error`].filter(Boolean).join(' ') || undefined} value={answers[field.id] || ''} onChange={event => setAnswers(previous => ({ ...previous, [field.id]: event.target.value }))} className={controlClass} />}
              {errors[field.id] && <p id={`${field.id}-error`} className="mt-2 text-xs font-semibold text-red-700">{errors[field.id]}</p>}
            </div>)}
            <div className="flex items-center justify-between gap-3 border-t border-slate-100 pt-6">{step > 0 ? <button type="button" onClick={() => changeStep(step - 1)} className="inline-flex min-h-11 items-center gap-2 text-sm font-bold"><ArrowLeft size={16} /> Back</button> : <span className="text-xs text-slate-400">01 / 06</span>}<button type="submit" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#0F8B75] px-5 text-sm font-bold text-white hover:bg-[#096b59]">{step === 4 ? 'Review brief' : 'Continue'}<ArrowRight size={16} /></button></div>
          </form> : <div className="mt-6 space-y-6">
            {BRIEF_STEPS.map((section, index) => <section key={section.title} className="border-t border-slate-200 pt-5"><div className="flex items-center justify-between gap-3"><h3 className="font-extrabold">{section.title}</h3><button onClick={() => changeStep(index)} aria-label={`Edit ${section.title}`} className="min-h-11 px-2 text-sm font-bold text-[#0F8B75] underline">Edit</button></div><dl className="mt-3 space-y-4">{visibleFields(index, answers).map(field => <div key={field.id}><dt className="text-xs font-bold text-slate-500">{field.label}</dt><dd className="mt-1 whitespace-pre-wrap break-words text-sm leading-6">{answers[field.id]?.trim() || 'Not provided / to discuss'}</dd></div>)}</dl></section>)}
            <div className="rounded-2xl bg-[#E6F4F1] p-5"><h3 className="text-lg font-extrabold">Ready to share?</h3><p className="mt-2 text-sm leading-6">1. Download or copy your complete brief.<br />2. Open your email, attach the file or paste the brief, then send it to <strong className="break-all">{brandEntity.email}</strong>.</p><div className="mt-5 flex flex-wrap gap-3"><button onClick={download} className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#131921] px-4 text-sm font-bold text-white"><Download size={16} /> Download brief</button><button onClick={copy} className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-[#0F8B75]/30 px-4 text-sm font-bold"><Copy size={16} /> Copy brief</button></div>{prepared && <a href={emailHref} className="mt-4 inline-flex min-h-12 items-center gap-2 rounded-xl bg-[#0F8B75] px-5 text-sm font-bold text-white"><Mail size={16} /> Open email to send</a>}<p className="mt-4 text-xs leading-6 text-slate-600">Downloads are not attached automatically. This website does not submit your enquiry. Our team receives it after you send the email, then reviews the brief and follows up to clarify scope and next steps.</p></div>
            <details><summary className="cursor-pointer text-sm font-bold text-[#0F8B75]">View plain-text brief</summary><textarea readOnly aria-label="Complete project brief" value={text} rows={12} className={`${controlClass} mt-3 text-sm`} /></details>
          </div>}
        </section>
        <div className="mt-5 rounded-2xl border border-dashed border-slate-300 p-4"><div className="flex flex-wrap gap-x-5 gap-y-2"><button onClick={saveDraft} className="min-h-11 text-xs font-bold text-[#0F8B75]">Save draft on this device</button>{hasDraft && <><button onClick={restoreDraft} className="min-h-11 text-xs font-bold text-slate-700">Restore saved draft</button><button onClick={() => { try { localStorage.removeItem(DRAFT_KEY); setHasDraft(false); setStatus('Saved copy removed. Your current answers are still on this page.'); } catch { setStatus('Could not remove the saved copy. Check your browser storage settings.'); } }} className="min-h-11 text-xs font-bold text-slate-500">Delete saved copy</button></>}{!review && <button onClick={download} className="min-h-11 text-xs font-bold text-slate-700">Download draft</button>}</div><p className="text-xs leading-6 text-slate-500">Saving is optional and keeps a copy in this browser until you delete it. Avoid saving on shared devices. Include requirements, not passwords or private customer records. <a href="/website-information" className="underline">How enquiries work</a></p></div>
        <p role="status" aria-live="polite" className="mt-3 text-sm font-semibold text-[#0F8B75]">{status}</p>
      </div>
    </div>
  </main>;
}
