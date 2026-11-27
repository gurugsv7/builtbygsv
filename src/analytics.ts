/**
 * First-party, cookieless analytics sent to the BuiltbyGSV API worker.
 *
 * No cookies, no third-party script and no personal data: the worker stores the event
 * name, path, referring site, a coarse device class and a daily-rotating visitor hash.
 * Disabled when VITE_API_BASE is unset, on localhost, for automated browsers, and when
 * the visitor sends Do Not Track or Global Privacy Control.
 */
import type { EventName } from './apiContract';

export const API_BASE = (import.meta.env?.VITE_API_BASE as string | undefined)?.replace(/\/$/, '') ?? '';

const enabled = () => {
  if (!API_BASE || typeof window === 'undefined') return false;
  const nav = navigator as Navigator & { globalPrivacyControl?: boolean };
  if (nav.webdriver || nav.doNotTrack === '1' || nav.globalPrivacyControl) return false;
  return !/^(localhost|127\.|0\.0\.0\.0)/.test(location.hostname) || import.meta.env?.VITE_ANALYTICS_DEBUG === 'true';
};

const referrerHost = () => {
  try {
    const host = document.referrer ? new URL(document.referrer).hostname : '';
    return host === location.hostname ? '' : host;
  } catch { return ''; }
};

export function track(name: EventName, path = location.pathname) {
  if (!enabled()) return;
  // text/plain keeps this a "simple" request: no CORS preflight, and sendBeacon survives navigation.
  const body = JSON.stringify({ name, path, ref: name === 'page_view' ? referrerHost() : '' });
  const url = `${API_BASE}/event`;
  try {
    if (navigator.sendBeacon?.(url, new Blob([body], { type: 'text/plain' }))) return;
    void fetch(url, { method: 'POST', body, keepalive: true, headers: { 'content-type': 'text/plain' } }).catch(() => undefined);
  } catch { /* analytics must never break the page */ }
}

/** Which conversion, if any, a clicked link represents. Exported for tests. */
export function eventForHref(href: string, pageHost = 'www.builtbygsv.in'): EventName | null {
  if (href.startsWith('tel:')) return 'call_click';
  if (href.startsWith('mailto:')) return 'email_click';
  if (/^https:\/\/(wa\.me|api\.whatsapp\.com)\//.test(href)) return 'whatsapp_click';
  if (/\.vcf(\?|$)/.test(href)) return 'contact_saved';
  if (/\/start-project(\?|$|#)/.test(href)) return 'start_project_click';
  try {
    const url = new URL(href);
    if (/^https?:$/.test(url.protocol) && url.hostname !== pageHost && !url.hostname.endsWith('builtbygsv.in')) return 'outbound_click';
  } catch { /* relative or malformed */ }
  return null;
}

let started = false;
let lastPath = '';

/** Records the page view and listens for conversion clicks anywhere on the page. */
export function initAnalytics() {
  if (started || !enabled()) return;
  started = true;
  const view = () => {
    if (location.pathname === lastPath) return;
    lastPath = location.pathname;
    track('page_view');
  };
  view();
  window.addEventListener('popstate', view);
  document.addEventListener('click', (event) => {
    const anchor = (event.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null;
    if (!anchor) return;
    const name = eventForHref(anchor.href, location.hostname);
    if (name) track(name);
  }, { capture: true });
}
