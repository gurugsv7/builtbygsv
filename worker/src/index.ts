/**
 * BuiltbyGSV API worker.
 *
 *   POST /enquiry   store a project brief or quick enquiry, return a reference
 *   POST /event     record a cookieless analytics event (page view or conversion)
 *   GET  /stats     aggregated analytics          (Authorization: Bearer STATS_TOKEN)
 *   GET  /enquiries recent enquiries as JSON      (Authorization: Bearer STATS_TOKEN)
 *   GET  /health    liveness check
 *
 * No cookies, no third-party scripts, no raw IP addresses stored.
 */
import {
  deviceClass,
  enquiryReference,
  LIMITS,
  parseEnquiry,
  parseEvent,
  type EnquiryRecord,
} from '../../src/apiContract';

export interface Env {
  DB: D1Database;
  ALLOWED_ORIGINS: string;
  IP_SALT?: string;
  STATS_TOKEN?: string;
  TELEGRAM_BOT_TOKEN?: string;
  TELEGRAM_CHAT_ID?: string;
}

const HOUR = 60 * 60 * 1000;

const json = (data: unknown, status = 200, headers: HeadersInit = {}) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', ...headers },
  });

const sha256 = async (value: string) => {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value));
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, '0')).join('');
};

/** Constant-time comparison so the stats token cannot be guessed byte by byte. */
const safeEqual = (a: string, b: string) => {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i += 1) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
};

function corsHeaders(request: Request, env: Env): Record<string, string> | null {
  const origin = request.headers.get('origin');
  if (!origin) return {};
  const allowed = env.ALLOWED_ORIGINS.split(',').map((entry) => entry.trim());
  if (!allowed.includes(origin)) return null;
  return {
    'access-control-allow-origin': origin,
    'access-control-allow-methods': 'POST, GET, OPTIONS',
    'access-control-allow-headers': 'content-type',
    'access-control-max-age': '86400',
    vary: 'origin',
  };
}

async function readJson(request: Request): Promise<unknown> {
  const declared = Number(request.headers.get('content-length') ?? 0);
  if (declared > LIMITS.bodyBytes) throw new Error('too-large');
  const text = await request.text();
  if (text.length > LIMITS.bodyBytes) throw new Error('too-large');
  return JSON.parse(text);
}

const clientIp = (request: Request) => request.headers.get('cf-connecting-ip') ?? '0.0.0.0';
const country = (request: Request) => (request as Request & { cf?: { country?: string } }).cf?.country ?? null;

async function notifyTelegram(env: Env, reference: string, record: EnquiryRecord) {
  if (!env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_CHAT_ID) return;
  const summary = record.answers.message ?? record.answers.problem ?? record.answers.business ?? '';
  const lines = [
    `New ${record.kind === 'brief' ? 'project brief' : 'enquiry'} ${reference}`,
    `${record.name}${record.company ? ` · ${record.company}` : ''}`,
    record.email && `Email: ${record.email}`,
    record.phone && `Phone: ${record.phone}`,
    record.service && `Needs: ${record.service}`,
    summary && `\n${summary.slice(0, 600)}`,
  ].filter(Boolean);
  await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ chat_id: env.TELEGRAM_CHAT_ID, text: lines.join('\n'), disable_web_page_preview: true }),
  }).catch(() => undefined);
}

async function handleEnquiry(request: Request, env: Env, ctx: ExecutionContext, cors: Record<string, string>) {
  let body: unknown;
  try { body = await readJson(request); } catch { return json({ error: 'Invalid or oversized request.' }, 400, cors); }

  const now = Date.now();
  const parsed = parseEnquiry(body, now);
  if (!parsed.ok) {
    // Bots get a convincing success so they do not retry with a different strategy.
    if ('silent' in parsed) return json({ reference: enquiryReference(new Date(now)) }, 200, cors);
    return json({ error: parsed.error }, parsed.status, cors);
  }

  const ipHash = await sha256(`${clientIp(request)}|${env.IP_SALT ?? 'builtbygsv'}`);
  const recent = await env.DB
    .prepare('SELECT COUNT(*) AS n FROM enquiries WHERE ip_hash = ? AND created_at > ?')
    .bind(ipHash, now - HOUR)
    .first<{ n: number }>();
  if ((recent?.n ?? 0) >= LIMITS.enquiriesPerHour) {
    return json({ error: 'Too many enquiries from this connection. Please try again later or message us on WhatsApp.' }, 429, cors);
  }

  const record = parsed.value;
  const reference = enquiryReference(new Date(now));
  await env.DB
    .prepare(`INSERT INTO enquiries (reference, kind, name, email, phone, company, service, answers, page, ip_hash, country, created_at)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
    .bind(reference, record.kind, record.name, record.email, record.phone, record.company, record.service,
      JSON.stringify(record.answers), record.page, ipHash, country(request), now)
    .run();

  ctx.waitUntil(notifyTelegram(env, reference, record));
  return json({ reference }, 201, cors);
}

async function handleEvent(request: Request, env: Env, cors: Record<string, string>) {
  let body: unknown;
  try { body = await readJson(request); } catch { return new Response(null, { status: 400, headers: cors }); }
  const parsed = parseEvent(body);
  if (!parsed.ok) return new Response(null, { status: 400, headers: cors });

  const now = new Date();
  const day = now.toISOString().slice(0, 10);
  const userAgent = request.headers.get('user-agent') ?? '';
  if (/bot|crawl|spider|slurp|headless|lighthouse|preview/i.test(userAgent)) return new Response(null, { status: 204, headers: cors });
  const visitorDay = await sha256(`${clientIp(request)}|${userAgent}|${day}|${env.IP_SALT ?? 'builtbygsv'}`);

  const recent = await env.DB
    .prepare('SELECT COUNT(*) AS n FROM events WHERE visitor_day = ? AND created_at > ?')
    .bind(visitorDay, now.getTime() - HOUR)
    .first<{ n: number }>();
  if ((recent?.n ?? 0) >= LIMITS.eventsPerHour) return new Response(null, { status: 204, headers: cors });

  const { name, path, referrer } = parsed.value;
  await env.DB
    .prepare('INSERT INTO events (name, path, referrer, device, country, visitor_day, day, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)')
    .bind(name, path, referrer || null, deviceClass(userAgent), country(request), visitorDay, day, now.getTime())
    .run();
  return new Response(null, { status: 204, headers: cors });
}

function authorised(request: Request, env: Env) {
  const header = request.headers.get('authorization') ?? '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : '';
  return Boolean(env.STATS_TOKEN) && safeEqual(token, env.STATS_TOKEN ?? '');
}

async function handleStats(request: Request, env: Env) {
  if (!authorised(request, env)) return json({ error: 'Unauthorised.' }, 401);
  const days = Math.min(Math.max(Number(new URL(request.url).searchParams.get('days')) || 30, 1), 365);
  const since = new Date(Date.now() - days * 24 * HOUR).toISOString().slice(0, 10);

  const [totals, daily, pages, referrers, devices, enquiries] = await env.DB.batch([
    env.DB.prepare('SELECT name, COUNT(*) AS count FROM events WHERE day >= ? GROUP BY name ORDER BY count DESC').bind(since),
    env.DB.prepare(`SELECT day, COUNT(DISTINCT visitor_day) AS visitors, SUM(name = 'page_view') AS views,
                    SUM(name != 'page_view') AS conversions FROM events WHERE day >= ? GROUP BY day ORDER BY day`).bind(since),
    env.DB.prepare(`SELECT path, COUNT(*) AS views, COUNT(DISTINCT visitor_day) AS visitors FROM events
                    WHERE day >= ? AND name = 'page_view' GROUP BY path ORDER BY views DESC LIMIT 25`).bind(since),
    env.DB.prepare(`SELECT referrer, COUNT(*) AS views FROM events WHERE day >= ? AND name = 'page_view' AND referrer IS NOT NULL
                    GROUP BY referrer ORDER BY views DESC LIMIT 15`).bind(since),
    env.DB.prepare(`SELECT device, COUNT(DISTINCT visitor_day) AS visitors FROM events WHERE day >= ? GROUP BY device`).bind(since),
    env.DB.prepare(`SELECT kind, status, COUNT(*) AS count FROM enquiries WHERE created_at >= ? GROUP BY kind, status`)
      .bind(Date.now() - days * 24 * HOUR),
  ]);
  return json({
    days,
    since,
    events: totals.results,
    daily: daily.results,
    topPages: pages.results,
    referrers: referrers.results,
    devices: devices.results,
    enquiries: enquiries.results,
  });
}

async function handleEnquiryList(request: Request, env: Env) {
  if (!authorised(request, env)) return json({ error: 'Unauthorised.' }, 401);
  const params = new URL(request.url).searchParams;
  const limit = Math.min(Math.max(Number(params.get('limit')) || 50, 1), 200);
  const status = params.get('status');
  const statement = status
    ? env.DB.prepare('SELECT * FROM enquiries WHERE status = ? ORDER BY created_at DESC LIMIT ?').bind(status, limit)
    : env.DB.prepare('SELECT * FROM enquiries ORDER BY created_at DESC LIMIT ?').bind(limit);
  const { results } = await statement.all<Record<string, unknown>>();
  return json(results.map(({ ip_hash: _ipHash, answers, ...row }) => ({ ...row, answers: JSON.parse(String(answers)) })));
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const { pathname } = new URL(request.url);
    const cors = corsHeaders(request, env);
    if (cors === null) return json({ error: 'Origin not allowed.' }, 403);
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });

    try {
      if (request.method === 'POST' && pathname === '/enquiry') return await handleEnquiry(request, env, ctx, cors);
      if (request.method === 'POST' && pathname === '/event') return await handleEvent(request, env, cors);
      if (request.method === 'GET' && pathname === '/stats') return await handleStats(request, env);
      if (request.method === 'GET' && pathname === '/enquiries') return await handleEnquiryList(request, env);
      if (request.method === 'GET' && pathname === '/health') return json({ ok: true });
      return json({ error: 'Not found.' }, 404, cors);
    } catch (error) {
      console.error(error);
      return json({ error: 'Something went wrong. Please message us on WhatsApp or email instead.' }, 500, cors);
    }
  },
} satisfies ExportedHandler<Env>;
