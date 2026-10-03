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
  'striatum-4-symposium-platform': {
    problem: 'Symposium attendees need one place to discover activities, apply for delegate access and manage registrations.',
    built: 'An event site with searchable listings, delegate access, registration and cart flows, payment-proof submission and organizer review.',
  },
  'e-care-emergency-learning': {
    problem: 'Emergency-care learners need structured practice and feedback, while research needs controlled content and oversight.',
    built: 'A PWA with student learning journeys, authored cases, assessments, Tutor support and researcher tools.',
  },
  'karaikal-one': {
    problem: 'Transport, local services and community help depend on scattered information, calls and informal messages.',
    built: 'One accessible interface for buses, trains, service providers, community requests and local guidance.',
  },
  'neon-rail': {
    problem: 'Most browser runners use standard keyboard controls, leaving room to make movement part of the play.',
    built: 'A three-lane runner where players dodge, jump and slide using body movement or a keyboard.',
  },
  'kamayuu-card-game': {
    problem: 'Many card games rely on visible information, leaving room for one built around memory and reading the table.',
    built: 'A card game with solo practice against AI and private online tables for friends.',
  },
  'tempo-word-game': {
    problem: 'Word puzzles often reveal answers or allow partial and repeated selections.',
    built: 'A timed four-letter game where players build words from shuffled tiles before the clock runs out.',
  },
  'pulse-personal-finance-analyst': {
    problem: 'Reviewing bank transactions by hand makes spending patterns and unusual debits hard to spot.',
    built: 'A local-first app that categorizes transactions, analyzes cash flow, flags anomalies and forecasts expenses.',
  },
  'gsv-os-studio-operations': {
    problem: 'Studio work gets hard to track when decisions and client details live across chats, sheets and tabs.',
    built: 'An internal platform for leads, clients, proposals, delivery, finance, maintenance and decisions.',
  },
};

/** Projects highlighted in the Work page's desktop index and mobile spotlight, in order. */
export const FEATURED_WORK = ['v2-productions', 'striatum-4-symposium-platform', 'karaikal-one', 'neon-rail'];
