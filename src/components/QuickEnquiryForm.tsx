import { useRef, useState } from 'react';
import { Check, Loader2, Send } from 'lucide-react';
import { HONEYPOT_FIELD, isEmail, isPhone } from '../apiContract';
import { BRIEF_SERVICES } from '../data/projectBrief';
import { canSubmitOnline, submitEnquiry } from '../enquiry';
import { brandEntity } from '../seo';

const field = 'mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-[15px] text-slate-900 focus:border-[#0F8B75] focus:outline-2 focus:outline-[#0F8B75]/25';

/**
 * A short enquiry form for people who do not want the full brief. Submits to the API
 * worker and shows a reference number; renders nothing when the site has no API.
 */
export function QuickEnquiryForm({ idPrefix = 'quick' }: { idPrefix?: string }) {
  const [values, setValues] = useState({ name: '', contact: '', service: '', message: '' });
  const [honeypot, setHoneypot] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [reference, setReference] = useState<string | null>(null);
  const startedAt = useRef(Date.now());
  if (!canSubmitOnline()) return null;

  const set = (key: keyof typeof values) => (event: { target: { value: string } }) =>
    setValues((previous) => ({ ...previous, [key]: event.target.value }));

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    const contact = values.contact.trim();
    if (!values.name.trim()) return setError('Please add your name.');
    if (!isEmail(contact) && !isPhone(contact)) return setError('Add an email address or a phone/WhatsApp number we can reply to.');
    if (!values.message.trim()) return setError('Please tell us briefly what you need.');
    setError(''); setSending(true);
    const answers: Record<string, string> = { name: values.name, message: values.message, service: values.service };
    answers[isEmail(contact) ? 'email' : 'phone'] = contact;
    const result = await submitEnquiry('quick', answers, startedAt.current, honeypot);
    setSending(false);
    if (result.ok) setReference(result.reference);
    else setError(result.message);
  }

  if (reference) {
    return (
      <div role="status" className="rounded-2xl border-2 border-[#0F8B75] bg-white p-5">
        <p className="flex items-center gap-2 text-base font-extrabold text-[#0F8B75]"><Check className="h-5 w-5" /> Message received</p>
        <p className="mt-2 text-sm leading-6 text-slate-700">
          Thanks, {values.name.trim().split(' ')[0]}. Your reference is <strong className="font-mono">{reference}</strong>. We will reply
          {isEmail(values.contact.trim()) ? ' by email' : ' on WhatsApp or by phone'}. Urgent? Message us on WhatsApp and quote the reference.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="rounded-2xl border border-slate-200 bg-white p-5" aria-labelledby={`${idPrefix}-title`}>
      <h2 id={`${idPrefix}-title`} className="text-lg font-extrabold tracking-tight">Send us a quick message</h2>
      <p className="mt-1 text-xs leading-5 text-slate-500">Two minutes, no email app needed. For a detailed scope, use the project brief instead.</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <label className="block text-xs font-bold text-slate-800" htmlFor={`${idPrefix}-name`}>Your name
          <input id={`${idPrefix}-name`} autoComplete="name" maxLength={120} value={values.name} onChange={set('name')} className={field} />
        </label>
        <label className="block text-xs font-bold text-slate-800" htmlFor={`${idPrefix}-contact`}>Email or WhatsApp number
          <input id={`${idPrefix}-contact`} autoComplete="email" inputMode="email" maxLength={200} value={values.contact} onChange={set('contact')} className={field} />
        </label>
      </div>
      <label className="mt-3 block text-xs font-bold text-slate-800" htmlFor={`${idPrefix}-service`}>What do you need? <span className="font-normal text-slate-500">(optional)</span>
        <select id={`${idPrefix}-service`} value={values.service} onChange={set('service')} className={field}>
          <option value="">Choose one</option>
          {BRIEF_SERVICES.map((service) => <option key={service}>{service}</option>)}
        </select>
      </label>
      <label className="mt-3 block text-xs font-bold text-slate-800" htmlFor={`${idPrefix}-message`}>Message
        <textarea id={`${idPrefix}-message`} rows={4} maxLength={2000} value={values.message} onChange={set('message')} className={`${field} resize-y`}
          placeholder="The problem, who it is for, and any deadline." />
      </label>
      <label className="absolute left-[-9999px] h-px w-px overflow-hidden" aria-hidden="true">Leave this empty
        <input tabIndex={-1} autoComplete="off" name={HONEYPOT_FIELD} value={honeypot} onChange={(event) => setHoneypot(event.target.value)} />
      </label>
      {error && <p role="alert" className="mt-3 rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-800">{error}</p>}
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button type="submit" disabled={sending} className="press inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#0F8B75] px-5 text-sm font-bold text-white hover:bg-[#096b59] disabled:opacity-70">
          {sending ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</> : <><Send className="h-4 w-4" /> Send message</>}
        </button>
        <span className="text-[11px] leading-5 text-slate-500">Stored securely by BuiltbyGSV to reply to you. <a href="/website-information" className="underline">How enquiries work</a> · or email {brandEntity.email}</span>
      </div>
    </form>
  );
}
