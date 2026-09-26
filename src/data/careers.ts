import { brandEntity } from '../seo';

export const CAREERS = [
  {
    id: 'software-engineer-intern',
    title: 'Software Engineer Intern',
    duration: '6 months',
    focus: 'Software engineering',
    description: 'Contribute to application features, APIs and internal tools, with attention to how the whole system works.',
    contributions: [
      'Implement scoped application features and integrations.',
      'Work through bugs, test important workflows and document technical decisions.',
      'Use code review feedback to improve clarity and maintainability.',
    ],
    interests: 'An interest in programming fundamentals, data flow and debugging. Share a project or code sample that shows how you approach a problem.',
  },
  {
    id: 'web-developer-intern',
    title: 'Web Developer Intern',
    duration: '6 months',
    focus: 'Web development',
    description: 'Contribute to responsive websites and web interfaces where clear design and reliable implementation matter.',
    contributions: [
      'Build and refine responsive pages and reusable interface components.',
      'Check mobile layouts, keyboard interactions and browser behavior.',
      'Connect interfaces to application data and improve them through review.',
    ],
    interests: 'An interest in HTML, CSS, JavaScript and the details of a usable interface. Share a website, repository or example of your work.',
  },
] as const;

export type Career = typeof CAREERS[number];
export const careerPath = (role: Career) => `/careers/${role.id}`;
export const getCareerFromPath = (path: string) => CAREERS.find(role => careerPath(role) === path.replace(/\/$/, ''));
export const careerEmail = (role: Career) => {
  const subject = `Application: ${role.title} — ${role.duration}`;
  const body = `Hello BuiltbyGSV,\n\nI would like to apply for the ${role.title} internship (${role.duration}).\n\nName:\nAvailability to start:\nLocation / time zone:\nResume or profile link:\nWork samples or GitHub:\n\nA little about my interests and relevant work:\n`;
  return `mailto:${brandEntity.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};
