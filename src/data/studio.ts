import type { ServiceType } from '../types';

export const STUDIO = {
  positioning: 'Product & AI Engineering Studio',
  description: 'Custom software, web platforms and AI systems engineered around real business problems.',
};

export const CAPABILITIES: { id: ServiceType; title: string; description: string; flow: string[] }[] = [
  { id: 'web-dev', title: 'Product Engineering', description: 'Web applications, platforms and portals, from architecture and prototyping to production.', flow: ['Interface', 'API', 'Data', 'Live'] },
  { id: 'software-dev', title: 'Custom Software', description: 'Purpose-built applications, dashboards and internal systems shaped around your operations.', flow: ['Records', 'Workflow', 'Dashboard'] },
  { id: 'ai-solutions', title: 'AI Systems', description: 'AI applications, assistants and RAG search with defined data sources and human review.', flow: ['Sources', 'Retrieve', 'Model', 'Review'] },
  { id: 'automation', title: 'Automation', description: 'Connected workflows that reduce repetitive work and integrate the tools you already use.', flow: ['Trigger', 'Validate', 'Route', 'Notify'] },
];

export const PRINCIPLES = [
  { title: 'Problem first.', description: 'Understand the people, constraints and desired outcome before choosing a stack or a feature list.' },
  { title: 'Design for actual users.', description: 'Make the important workflows clear, accessible and usable on the devices people have.' },
  { title: 'Build for maintainability.', description: 'Use clear architecture, documented decisions and code that can evolve after handover.' },
  { title: 'Ship, learn, improve.', description: 'Validate the release, then use real usage and feedback to decide what comes next.' },
];

export const DELIVERY_STEPS = [
  { title: 'Understand', description: 'We define the problem, users, constraints and desired outcome.', outputs: ['Problem and users defined', 'Constraints listed', 'Outcome agreed'] },
  { title: 'Design', description: 'We shape the product experience, architecture and technical approach.', outputs: ['Product experience', 'Architecture', 'Technical approach'] },
  { title: 'Build', description: 'We engineer in reviewable stages, with maintainability and performance in mind.', outputs: ['Reviewable stages', 'Maintainable code', 'Performance in mind'] },
  { title: 'Validate & Ship', description: 'We test workflows and edge cases, deploy the release and document the handover.', outputs: ['Workflows and edge cases tested', 'Release deployed', 'Handover documented'] },
  { title: 'Improve', description: 'Where appropriate, we scope further work using real usage and feedback.', outputs: ['Usage and feedback reviewed', 'Next work scoped'] },
];

/** One-line problem and delivery summaries, condensed from each project's case study. */
export const WORK_SUMMARIES: Record<string, { problem: string; built: string }> = {
  'v2-productions': {
    problem: 'A creative studio needed one place for showcases, services, courses and enquiries.',
    built: 'A responsive React platform with distinct mobile and desktop experiences.',
  },
  'thaai-clinic-website': {
    problem: 'Clinic visits depend on queues, phone calls and paper records.',
    built: 'A mobile-first prototype with simulated booking, local records and direct clinic contact.',
  },
  'budget-diet-app': {
    problem: 'Students in PGs struggle to eat balanced meals on a strict daily budget.',
    built: 'An in-development AI meal planner built around local food options and daily budgets.',
  },
};
