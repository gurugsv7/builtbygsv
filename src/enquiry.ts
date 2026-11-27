import { HONEYPOT_FIELD, type EnquiryKind } from './apiContract';
import { API_BASE, track } from './analytics';

export type SubmitResult =
  | { ok: true; reference: string }
  | { ok: false; reason: 'unconfigured' | 'network' | 'rejected'; message: string };

/** True when the site was built with an API endpoint, so forms can submit directly. */
export const canSubmitOnline = () => Boolean(API_BASE);

/** Sends an enquiry to the API worker. Callers keep email and WhatsApp as fallbacks. */
export async function submitEnquiry(
  kind: EnquiryKind,
  answers: Record<string, string>,
  startedAt: number,
  honeypot = '',
): Promise<SubmitResult> {
  if (!API_BASE) return { ok: false, reason: 'unconfigured', message: 'Online sending is not available. Please use email or WhatsApp.' };
  try {
    const response = await fetch(`${API_BASE}/enquiry`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ kind, answers, page: location.pathname, startedAt, [HONEYPOT_FIELD]: honeypot }),
    });
    const data = (await response.json().catch(() => ({}))) as { reference?: string; error?: string };
    if (response.ok && data.reference) {
      track(kind === 'brief' ? 'brief_submitted' : 'quick_enquiry_submitted');
      return { ok: true, reference: data.reference };
    }
    return { ok: false, reason: 'rejected', message: data.error ?? 'We could not send this. Please try again, or use email or WhatsApp.' };
  } catch {
    return { ok: false, reason: 'network', message: 'No connection to our server. Your answers are still here: try again, or use email or WhatsApp.' };
  }
}
