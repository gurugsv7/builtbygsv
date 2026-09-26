import type { ServiceType } from '../types';

export const STUDIO = {
  positioning: 'Product & AI Engineering Studio',
  description: 'Custom software, web platforms and AI systems engineered around real business problems.',
};

export const CAPABILITIES: { id: ServiceType; title: string; description: string }[] = [
  { id: 'web-dev', title: 'Product Engineering', description: 'Web applications, platforms and portals, from architecture and prototyping to production.' },
  { id: 'software-dev', title: 'Custom Software', description: 'Purpose-built applications, dashboards and internal systems shaped around your operations.' },
  { id: 'ai-solutions', title: 'AI Systems', description: 'AI applications, assistants and RAG search with defined data sources and human review.' },
  { id: 'automation', title: 'Automation', description: 'Connected workflows that reduce repetitive work and integrate the tools you already use.' },
];

export const PRINCIPLES = [
  { title: 'Problem first.', description: 'Understand the people, constraints and desired outcome before choosing a stack or a feature list.' },
  { title: 'Design for actual users.', description: 'Make the important workflows clear, accessible and usable on the devices people have.' },
  { title: 'Build for maintainability.', description: 'Use clear architecture, documented decisions and code that can evolve after handover.' },
  { title: 'Ship, learn, improve.', description: 'Validate the release, then use real usage and feedback to decide what comes next.' },
];

export const DELIVERY_STEPS = [
  { title: 'Understand', description: 'We define the problem, users, constraints and desired outcome.' },
  { title: 'Design', description: 'We shape the product experience, architecture and technical approach.' },
  { title: 'Build', description: 'We engineer in reviewable stages, with maintainability and performance in mind.' },
  { title: 'Validate & Ship', description: 'We test workflows and edge cases, deploy the release and document the handover.' },
  { title: 'Improve', description: 'Where appropriate, we scope further work using real usage and feedback.' },
];
