export type BriefAnswers = Record<string, string>;
export type BriefField = { id: string; label: string; hint?: string; type?: string; options?: string[]; required?: boolean; services?: string[]; autocomplete?: string };
export const BRIEF_SERVICES = ['Website / web platform', 'Custom software', 'AI solution', 'Automation', 'Multiple services', 'Help me decide'];
export const BRIEF_STEPS: { title: string; description: string; fields: BriefField[] }[] = [
  { title: 'Your business', description: 'Introduce your business and the person we should speak with.', fields: [
    { id: 'name', label: 'Your name', required: true, autocomplete: 'name' },
    { id: 'email', label: 'Email address', type: 'email', required: true, autocomplete: 'email' },
    { id: 'company', label: 'Company or project name', required: true, autocomplete: 'organization' },
    { id: 'role', label: 'Your role', hint: 'For example, founder, marketing lead or project manager.' },
    { id: 'business', label: 'What does your business do?', type: 'textarea', required: true, hint: 'Your industry, products or services, and customers.' },
    { id: 'website', label: 'Existing website or product link', hint: 'Include https:// if you have a link.' },
    { id: 'location', label: 'Location and time zone', hint: 'Helps us plan reviews and communication.' },
    { id: 'phone', label: 'Phone or WhatsApp number', type: 'tel', autocomplete: 'tel' },
  ] },
  { title: 'Goals & audience', description: 'Help us understand the problem before we recommend a solution.', fields: [
    { id: 'service', label: 'What do you need help with?', options: BRIEF_SERVICES, required: true },
    { id: 'stage', label: 'Where is the project today?', options: ['New idea', 'Design or prototype ready', 'Existing product to improve', 'Rescue or rebuild', 'Not sure yet'], required: true },
    { id: 'problem', label: 'What problem should this project solve?', type: 'textarea', required: true, hint: 'What happens today, what is difficult, and why change it now?' },
    { id: 'audience', label: 'Who will use it?', type: 'textarea', required: true, hint: 'Customer or staff groups, countries, languages, and accessibility needs.' },
    { id: 'success', label: 'What would a successful launch achieve?', type: 'textarea', required: true, hint: 'For example, more qualified enquiries, less admin time or faster customer onboarding. Include targets if known.' },
  ] },
  { title: 'Scope & requirements', description: 'Describe the first release. Plain language is enough; “not sure yet” is a useful answer.', fields: [
    { id: 'features', label: 'What must the first version do?', type: 'textarea', required: true, hint: 'List essential features and the main journey from start to finish.' },
    { id: 'later', label: 'What can wait until later?', type: 'textarea', hint: 'Nice-to-have features and anything explicitly out of scope.' },
    { id: 'platforms', label: 'Where should it work?', options: ['Responsive website', 'Web application / dashboard', 'Mobile app', 'Internal tool / background service', 'Multiple platforms', 'Need a recommendation'], required: true },
    { id: 'webScope', label: 'Pages, content and website features', type: 'textarea', hint: 'Approximate page count; CMS, search, booking, checkout, payments, SEO and analytics needs.', services: ['Website / web platform'] },
    { id: 'softwareScope', label: 'Users, permissions and workflows', type: 'textarea', hint: 'Who can view or edit what? Include approvals, reports, dashboards and offline needs.', services: ['Custom software'] },
    { id: 'aiScope', label: 'AI task, source data and human review', type: 'textarea', required: true, hint: 'What should AI do? What documents or data can it use? Describe acceptable accuracy, human approval, and what happens when it is wrong. Say “not sure” where needed.', services: ['AI solution'] },
    { id: 'automationScope', label: 'Automation trigger, steps and exceptions', type: 'textarea', required: true, hint: 'What starts the workflow? Which tools are involved, how often does it run, and who handles failures or approvals?', services: ['Automation'] },
    { id: 'integrations', label: 'Existing tools and integrations', type: 'textarea', hint: 'CRM, payments, accounting, APIs, spreadsheets or other systems. Mention known access or vendor restrictions; do not share credentials.' },
    { id: 'scale', label: 'Expected usage and performance', hint: 'Approximate users, orders, records or tasks per day; peak load and availability needs.' },
    { id: 'constraints', label: 'Data, security and technical constraints', type: 'textarea', hint: 'Data categories, migration, permissions, hosting region, retention, accessibility standards or required technologies. Describe requirements without including private data.' },
  ] },
  { title: 'Design & delivery', description: 'Tell us what is ready and what you need us to create or manage.', fields: [
    { id: 'assets', label: 'What design and content already exist?', options: ['Brand, designs and content ready', 'Some assets ready', 'Need design and content help', 'Not sure yet'], required: true },
    { id: 'references', label: 'Design references and things to avoid', type: 'textarea', hint: 'Links to designs or competitors, what you like about them, brand guidelines and desired tone.' },
    { id: 'content', label: 'Who will provide and approve content?', hint: 'Copy, images, translations, legal text and when they will be ready.' },
    { id: 'hosting', label: 'Domain, hosting and deployment', type: 'textarea', hint: 'Existing setup, ownership and preferred provider, or ask us to recommend one.' },
    { id: 'support', label: 'What will you need after launch?', options: ['Handover and training', 'Ongoing maintenance', 'Continuous product development', 'Need a recommendation'], required: true },
    { id: 'documents', label: 'Supporting document links', type: 'textarea', hint: 'Shareable briefs, wireframes or specifications. You can attach files to the final email instead. Check link permissions; do not share passwords.' },
  ] },
  { title: 'Budget & collaboration', description: 'Set practical boundaries so we can propose the right scope and next steps.', fields: [
    { id: 'currency', label: 'Budget currency', options: ['INR', 'USD', 'EUR', 'GBP', 'Other / discuss'], required: true },
    { id: 'budget', label: 'Estimated budget or range', required: true, hint: 'For example, 1–2 lakh INR, or “need help estimating”. Include whether this is approved and whether it covers ongoing costs.' },
    { id: 'timeline', label: 'Desired start and launch timeline', required: true, hint: 'Dates or a rough timeframe; “flexible” is fine.' },
    { id: 'deadline', label: 'Fixed deadlines or dependencies', type: 'textarea', hint: 'Events, contracts, other vendors or approvals that affect launch. Explain which dates cannot move.' },
    { id: 'stakeholders', label: 'Who approves scope, design and budget?', hint: 'Roles are enough. Include your review process and procurement or NDA needs.' },
    { id: 'communication', label: 'Preferred communication and availability', hint: 'Email, call or WhatsApp; language, time zone and suitable times. Add a number above if needed.' },
    { id: 'extra', label: 'Anything else we should know?', type: 'textarea', hint: 'Risks, previous attempts, concerns or questions for our team.' },
  ] },
];
export function visibleFields(step: number, answers: BriefAnswers) {
  return BRIEF_STEPS[step].fields.filter(field => !field.services || ['Multiple services', 'Help me decide'].includes(answers.service) || field.services.includes(answers.service));
}
export function briefText(answers: BriefAnswers) {
  return ['BUILTBYGSV — PROJECT BRIEF', ...BRIEF_STEPS.flatMap((step, index) => ['\n' + step.title.toUpperCase(), ...visibleFields(index, answers).map(field => `${field.label}:\n${answers[field.id]?.trim() || 'Not provided / to discuss'}\n`)])].join('\n');
}
