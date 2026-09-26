import type { ServiceType } from '../types';

export interface FlowNode { title: string; caption: string }

export interface ServiceVisual {
  accent: string;
  accentSoft: string;
  heading: string;
  intro: string;
  /** Linear pipelines render as a flow; custom software renders as inputs → system → outputs. */
  flow?: FlowNode[];
  fanIn?: { inputs: string[]; system: FlowNode; outputs: string[] };
}

export const SERVICE_VISUALS: Record<ServiceType, ServiceVisual> = {
  'web-dev': {
    accent: '#0F8B75',
    accentSoft: '#E2F1ED',
    heading: 'From idea to production.',
    intro: 'Every layer is designed with the next one in mind, so the interface and the system behind it ship as one product.',
    flow: [
      { title: 'Idea', caption: 'The problem, the users and what the first release must do.' },
      { title: 'Interface', caption: 'Journeys and responsive screens for real devices.' },
      { title: 'Application', caption: 'Components, state and routing that stay maintainable.' },
      { title: 'API', caption: 'Business logic and integrations with your tools.' },
      { title: 'Database', caption: 'Structured data that you own.' },
      { title: 'Production', caption: 'Deployed, documented and handed over.' },
    ],
  },
  'software-dev': {
    accent: '#E85D22',
    accentSoft: '#FDF1E7',
    heading: 'Your operations, in one system.',
    intro: 'Scattered spreadsheets, messages and manual steps become one application shaped around how your team already works.',
    fanIn: {
      inputs: ['Operations', 'Customers', 'Data', 'Team'],
      system: { title: 'Custom system', caption: 'Your workflows, permissions and rules' },
      outputs: ['Dashboards', 'Workflows', 'Reports'],
    },
  },
  'ai-solutions': {
    accent: '#0D9488',
    accentSoft: '#E6F4F1',
    heading: 'AI with a defined source and a reviewer.',
    intro: 'Answers are grounded in your approved material, and uncertain results go to a person before they reach anyone else.',
    flow: [
      { title: 'Business knowledge', caption: 'Approved documents, FAQs and records.' },
      { title: 'Retrieval', caption: 'Find the passages relevant to the question.' },
      { title: 'AI system', caption: 'Draft an answer from those passages only.' },
      { title: 'Human review', caption: 'Check uncertain or sensitive results.' },
      { title: 'Useful output', caption: 'An answer that shows its source.' },
    ],
  },
  automation: {
    accent: '#D97706',
    accentSoft: '#FEF3C7',
    heading: 'One event. Every follow-up handled.',
    intro: 'A trigger in one tool runs a monitored workflow across the others, with a clear path when something needs a person.',
    flow: [
      { title: 'Trigger', caption: 'A form, payment, message or schedule.' },
      { title: 'Validate', caption: 'Check required fields and duplicates.' },
      { title: 'Transform', caption: 'Map data into each tool’s format.' },
      { title: 'API', caption: 'Call the systems involved.' },
      { title: 'Action', caption: 'Create or update the right records.' },
      { title: 'Notification', caption: 'Tell the right person, or flag an exception.' },
    ],
  },
};
