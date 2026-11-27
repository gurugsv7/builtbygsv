import assert from 'node:assert/strict';
import test from 'node:test';
import { enquiryReference, HONEYPOT_FIELD, LIMITS, parseEnquiry, parseEvent } from '../src/apiContract.ts';
import { eventForHref } from '../src/analytics.ts';

const now = 1_800_000_000_000;
const human = now - 30_000;

test('valid quick enquiry with a phone number is accepted and normalised', () => {
  const result = parseEnquiry({ kind: 'quick', page: '/contact', startedAt: human, answers: { name: ' Priya ', phone: '+91 90000 00000', message: 'Clinic site', service: 'Website / web platform' } }, now);
  assert.ok(result.ok);
  assert.equal(result.value.name, 'Priya');
  assert.equal(result.value.phone, '+91 90000 00000');
  assert.equal(result.value.email, null);
  assert.equal(result.value.page, '/contact');
});

test('project briefs require an email; quick enquiries need email or phone and a message', () => {
  assert.equal(parseEnquiry({ kind: 'brief', startedAt: human, answers: { name: 'A', phone: '9000000000' } }, now).ok, false);
  assert.equal(parseEnquiry({ kind: 'quick', startedAt: human, answers: { name: 'A', message: 'x' } }, now).ok, false);
  assert.equal(parseEnquiry({ kind: 'quick', startedAt: human, answers: { name: 'A', email: 'a@b.co' } }, now).ok, false);
  assert.equal(parseEnquiry({ kind: 'quick', startedAt: human, answers: { name: 'A', email: 'not-an-email', message: 'x' } }, now).ok, false);
});

test('bots are silently discarded: honeypot filled, or form finished too fast', () => {
  const answers = { name: 'Bot', email: 'b@b.co', message: 'buy now' };
  const trapped = parseEnquiry({ kind: 'quick', startedAt: human, answers, [HONEYPOT_FIELD]: 'http://spam' }, now);
  assert.ok(!trapped.ok && 'silent' in trapped);
  const fast = parseEnquiry({ kind: 'quick', startedAt: now - 500, answers }, now);
  assert.ok(!fast.ok && 'silent' in fast);
});

test('oversized, unknown or malformed input is rejected', () => {
  assert.equal(parseEnquiry({ kind: 'spam', startedAt: human, answers: {} }, now).ok, false);
  assert.equal(parseEnquiry({ kind: 'quick', startedAt: human, answers: { name: 'A', email: 'a@b.co', message: 'x'.repeat(LIMITS.answerChars + 1) } }, now).ok, false);
  assert.equal(parseEnquiry({ kind: 'quick', startedAt: human, answers: { 'bad key': 'x' } }, now).ok, false);
  assert.equal(parseEnquiry([], now).ok, false);
});

test('only whitelisted analytics events are accepted, with cleaned paths and referrers', () => {
  const ok = parseEvent({ name: 'whatsapp_click', path: '/contact', ref: 'Google.COM/<script>' });
  assert.ok(ok.ok);
  assert.equal(ok.value.referrer, 'google.comscript');
  const external = parseEvent({ name: 'page_view', path: 'https://evil.example' });
  assert.ok(external.ok && external.value.path === '/');
  assert.equal(parseEvent({ name: 'delete_everything' }).ok, false);
});

test('references are readable and dated', () => {
  assert.match(enquiryReference(new Date('2026-11-27T10:00:00Z'), () => 0), /^BG-261127-AAAA$/);
});

test('link clicks map to the right conversion events', () => {
  assert.equal(eventForHref('https://wa.me/917448865095?text=hi'), 'whatsapp_click');
  assert.equal(eventForHref('tel:+917448865095'), 'call_click');
  assert.equal(eventForHref('mailto:admin@builtbygsv.in'), 'email_click');
  assert.equal(eventForHref('https://www.builtbygsv.in/builtbygsv.vcf'), 'contact_saved');
  assert.equal(eventForHref('https://www.builtbygsv.in/start-project?service=web-dev'), 'start_project_click');
  assert.equal(eventForHref('https://github.com/gurugsv7/EvoBridge'), 'outbound_click');
  assert.equal(eventForHref('https://www.builtbygsv.in/pricing'), null);
});
