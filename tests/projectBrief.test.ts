import test from 'node:test';
import assert from 'node:assert/strict';
import { briefText, visibleFields } from '../src/data/projectBrief.ts';
import { getScreenFromPath } from '../src/routes.ts';

test('dedicated project route and service-specific questions', () => {
  assert.equal(getScreenFromPath('/start-project'), 'start-project');
  assert.ok(visibleFields(2, { service: 'AI solution' }).some(field => field.id === 'aiScope'));
  assert.ok(!visibleFields(2, { service: 'AI solution' }).some(field => field.id === 'automationScope'));
  assert.ok(visibleFields(2, { service: 'Multiple services' }).some(field => field.id === 'automationScope'));
});
test('export keeps long answers and omits stale conditional answers', () => {
  const features = 'A detailed requirement. '.repeat(200);
  const text = briefText({ service: 'Automation', features, aiScope: 'Old AI answer', automationScope: 'CRM trigger', currency: 'INR' });
  assert.ok(text.includes(features.trim()));
  assert.ok(text.includes('CRM trigger'));
  assert.ok(text.includes('Budget currency:\nINR'));
  assert.ok(!text.includes('Old AI answer'));
});
