/**
 * The contract between the website and the BuiltbyGSV API worker (worker/).
 * Pure TypeScript with no DOM or Workers APIs, so both sides and the Node tests share it.
 */

/** Conversion and navigation events the site may record. Anything else is rejected. */
export const EVENT_NAMES = [
  'page_view',
  'whatsapp_click',
  'call_click',
  'email_click',
  'contact_saved',
  'start_project_click',
  'brief_started',
  'brief_submitted',
  'quick_enquiry_submitted',
  'outbound_click',
] as const;
export type EventName = (typeof EVENT_NAMES)[number];

export const ENQUIRY_KINDS = ['brief', 'quick'] as const;
export type EnquiryKind = (typeof ENQUIRY_KINDS)[number];

/** Field name the visible form never fills. Bots that fill every input reveal themselves. */
export const HONEYPOT_FIELD = 'website_url';

export const LIMITS = {
  bodyBytes: 64 * 1024,
  answerKeys: 80,
  answerChars: 5000,
  nameChars: 120,
  pathChars: 200,
  /** Humans do not finish a form in under this many milliseconds. */
  minFillMs: 2500,
  enquiriesPerHour: 5,
  eventsPerHour: 300,
} as const;

export interface EnquiryPayload {
  kind: EnquiryKind;
  answers: Record<string, string>;
  page: string;
  startedAt: number;
  [HONEYPOT_FIELD]?: string;
}

export interface EnquiryRecord {
  kind: EnquiryKind;
  name: string;
  email: string | null;
  phone: string | null;
  company: string | null;
  service: string | null;
  answers: Record<string, string>;
  page: string;
}

export type ParseResult<T> =
  | { ok: true; value: T }
  | { ok: false; status: number; error: string }
  /** Looks like a bot: pretend to succeed and store nothing. */
  | { ok: false; status: 200; error: 'silent'; silent: true };

const EMAIL = /^[^\s@]{1,64}@[^\s@]{1,190}\.[^\s@]{2,}$/;
const KEY = /^[a-zA-Z][a-zA-Z0-9_]{0,40}$/;

const isRecord = (value: unknown): value is Record<string, unknown> =>
  Boolean(value) && typeof value === 'object' && !Array.isArray(value);

const cleanPath = (value: unknown) =>
  typeof value === 'string' && value.startsWith('/') ? value.slice(0, LIMITS.pathChars) : '/';

export const isEmail = (value: string) => EMAIL.test(value);
export const isPhone = (value: string) => value.replace(/\D/g, '').length >= 7 && value.length <= 25;

export function parseEnquiry(body: unknown, now: number): ParseResult<EnquiryRecord> {
  if (!isRecord(body)) return { ok: false, status: 400, error: 'Expected a JSON object.' };
  const honeypot = body[HONEYPOT_FIELD];
  const startedAt = typeof body.startedAt === 'number' ? body.startedAt : 0;
  if ((typeof honeypot === 'string' && honeypot.trim()) || !startedAt || now - startedAt < LIMITS.minFillMs) {
    return { ok: false, status: 200, error: 'silent', silent: true };
  }
  if (!ENQUIRY_KINDS.includes(body.kind as EnquiryKind)) return { ok: false, status: 400, error: 'Unknown enquiry type.' };
  const kind = body.kind as EnquiryKind;
  if (!isRecord(body.answers)) return { ok: false, status: 400, error: 'Missing answers.' };

  const entries = Object.entries(body.answers);
  if (entries.length > LIMITS.answerKeys) return { ok: false, status: 400, error: 'Too many fields.' };
  const answers: Record<string, string> = {};
  for (const [key, value] of entries) {
    if (!KEY.test(key) || typeof value !== 'string') return { ok: false, status: 400, error: `Invalid field: ${key.slice(0, 40)}` };
    const trimmed = value.trim();
    if (trimmed.length > LIMITS.answerChars) return { ok: false, status: 400, error: `Answer too long: ${key}` };
    if (trimmed) answers[key] = trimmed;
  }

  const name = answers.name ?? '';
  if (!name || name.length > LIMITS.nameChars) return { ok: false, status: 422, error: 'Please add your name.' };
  const email = answers.email && isEmail(answers.email) ? answers.email.toLowerCase() : null;
  if (answers.email && !email) return { ok: false, status: 422, error: 'Please check your email address.' };
  const phone = answers.phone && isPhone(answers.phone) ? answers.phone : null;
  if (answers.phone && !phone) return { ok: false, status: 422, error: 'Please check your phone number.' };
  if (kind === 'brief' && !email) return { ok: false, status: 422, error: 'An email address is required for a project brief.' };
  if (kind === 'quick' && !email && !phone) return { ok: false, status: 422, error: 'Add an email address or a phone/WhatsApp number.' };
  if (kind === 'quick' && !answers.message) return { ok: false, status: 422, error: 'Please tell us briefly what you need.' };

  return {
    ok: true,
    value: {
      kind,
      name,
      email,
      phone,
      company: answers.company?.slice(0, 200) ?? null,
      service: answers.service?.slice(0, 120) ?? null,
      answers,
      page: cleanPath(body.page),
    },
  };
}

export interface EventRecord { name: EventName; path: string; referrer: string }

export function parseEvent(body: unknown): ParseResult<EventRecord> {
  if (!isRecord(body)) return { ok: false, status: 400, error: 'Expected a JSON object.' };
  if (!EVENT_NAMES.includes(body.name as EventName)) return { ok: false, status: 400, error: 'Unknown event.' };
  const referrer = typeof body.ref === 'string' ? body.ref.toLowerCase().replace(/[^a-z0-9.-]/g, '').slice(0, 100) : '';
  return { ok: true, value: { name: body.name as EventName, path: cleanPath(body.path), referrer } };
}

/** Human-readable reference such as BG-261127-K7QM. Avoids look-alike characters. */
export function enquiryReference(now: Date, random: () => number = Math.random) {
  const alphabet = 'ABCDEFGHJKMNPQRSTVWXYZ23456789';
  const stamp = now.toISOString().slice(2, 10).replaceAll('-', '');
  let suffix = '';
  for (let i = 0; i < 4; i += 1) suffix += alphabet[Math.floor(random() * alphabet.length)];
  return `BG-${stamp}-${suffix}`;
}

/** Coarse device class from a user agent: enough for analytics, too vague to fingerprint. */
export const deviceClass = (userAgent: string) =>
  /iPad|Tablet/i.test(userAgent) ? 'tablet' : /Mobi|Android|iPhone/i.test(userAgent) ? 'mobile' : 'desktop';
