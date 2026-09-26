import { CAREERS, careerPath } from './data/careers';
import { PROJECTS } from './data/mockData';
import { ScreenType } from './types';

export const SCREEN_PATHS: Record<ScreenType, string> = {
  hero: '/',
  home: '/',
  projects: '/projects',
  services: '/services',
  process: '/process',
  'web-dev': '/services/web-development',
  'software-dev': '/services/custom-software-development',
  'ai-solutions': '/services/ai-solutions',
  automation: '/services/automation',
  about: '/about',
  contact: '/contact',
  careers: '/careers',
  'start-project': '/start-project',
  'website-information': '/website-information',
  'not-found': '/404',
  'project-detail': '/projects',
};

const PATH_SCREENS: Record<string, ScreenType> = {
  '/projects': 'projects',
  '/services': 'services',
  '/process': 'process',
  '/services/web-development': 'web-dev',
  '/services/custom-software-development': 'software-dev',
  '/services/ai-solutions': 'ai-solutions',
  '/services/automation': 'automation',
  '/about': 'about',
  '/contact': 'contact',
  '/careers': 'careers',
  '/start-project': 'start-project',
  '/website-information': 'website-information',
  ...Object.fromEntries(CAREERS.map(role => [careerPath(role), 'careers' as ScreenType])),
  '/404': 'not-found',
};

export const normalizePath = (pathname: string) =>
  pathname === '/' ? '/' : pathname.replace(/\/+$/, '');

export const getProjectFromPath = (pathname: string) => {
  const match = normalizePath(pathname).match(/^\/projects\/([^/]+)$/);
  return match ? PROJECTS.find((project) => project.id === match[1]) ?? null : null;
};

export const getScreenFromPath = (pathname: string): ScreenType => {
  const normalized = normalizePath(pathname);
  if (getProjectFromPath(normalized)) return 'project-detail';
  if (normalized === '/') return 'hero';
  return PATH_SCREENS[normalized] ?? 'not-found';
};

export const isKnownAppPath = (pathname: string) => {
  const normalized = normalizePath(pathname);
  return normalized === '/' || Boolean(PATH_SCREENS[normalized]) || Boolean(getProjectFromPath(normalized));
};

export const appRouteMetadata: Record<string, { title: string; description: string }> = {
  '/start-project': { title: 'Start a Project | Client Brief | BuiltbyGSV', description: 'Tell BuiltbyGSV about your goals, users, project requirements, budget and timeline. Create, review and share a complete project brief with our studio.' },
  '/careers': { title: 'Careers | Six-Month Engineering Internships | BuiltbyGSV', description: 'Apply for Software Engineer Intern and Web Developer Intern roles at BuiltbyGSV. Both internships run for six months. Explore the roles and apply by email.' },
  '/website-information': { title: 'Website Information & Enquiries | BuiltbyGSV', description: 'How BuiltbyGSV project enquiries, career applications and external links work, plus contact information for website and accessibility questions.' },
  ...Object.fromEntries(CAREERS.map(role => [careerPath(role), { title: `${role.title} | 6-Month Internship | BuiltbyGSV`, description: `${role.description} Explore this six-month internship at BuiltbyGSV and apply by email.` }])),
  '/': {
    title: 'BuiltbyGSV | Product & AI Engineering Studio',
    description:
      'BuiltbyGSV is a Product & AI Engineering Studio designing custom software, web platforms, AI systems and automation around real business problems.',
  },
  '/projects': {
    title: 'Selected Work & Case Studies | BuiltbyGSV',
    description:
      'Explore websites, custom software and AI products built by BuiltbyGSV for businesses, startups and independent product ideas.',
  },
  '/services': {
    title: 'Web, Software, AI & Automation Services | BuiltbyGSV',
    description:
      'Explore product engineering, custom software, AI engineering and automation services from BuiltbyGSV.',
  },
  '/services/web-development': {
    title: 'Website Development Services | BuiltbyGSV',
    description:
      'Fast, responsive and SEO-ready websites built with React, TypeScript and modern web architecture by BuiltbyGSV.',
  },
  '/services/custom-software-development': {
    title: 'Custom Software Development | BuiltbyGSV',
    description:
      'Maintainable custom software, dashboards, portals and API-powered business systems built around real workflows.',
  },
  '/services/ai-solutions': {
    title: 'AI Solutions & Agent Development | BuiltbyGSV',
    description:
      'Practical AI assistants, RAG search, content automation and intelligent product features developed by BuiltbyGSV.',
  },
  '/services/automation': {
    title: 'Business Automation & Integrations | BuiltbyGSV',
    description:
      'Connect tools, automate repetitive work and build reliable webhook, notification and data-sync workflows.',
  },
  '/process': {
    title: 'Product Development Process | BuiltbyGSV',
    description:
      'See how BuiltbyGSV takes a product from discovery and design through development, launch and continuous improvement.',
  },
  '/about': {
    title: 'Company | BuiltbyGSV Product & AI Engineering Studio',
    description:
      'BuiltbyGSV brings product thinking, design and software engineering together to build useful, dependable digital products.',
  },
  '/contact': {
    title: 'Contact BuiltbyGSV | Start a Web or Software Project',
    description:
      'Contact BuiltbyGSV about a website, custom software, AI feature or business automation project.',
  },
};

export const notFoundMetadata = {
  title: 'Page Not Found | BuiltbyGSV',
  description: 'This BuiltbyGSV page does not exist. Browse services, projects and practical web-development guides.',
};

export const getAppRouteMetadata = (pathname: string) => {
  const normalized = normalizePath(pathname);
  const project = getProjectFromPath(normalized);
  if (project) {
    return {
      title: project.detailData?.seoTitle ?? `${project.title} Case Study | BuiltbyGSV`,
      description: project.detailData?.seoDescription ?? project.description,
      image: project.detailData?.publicImageUrl,
    };
  }
  return appRouteMetadata[normalized];
};
