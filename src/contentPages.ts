import { Faq, INR_BANDS, PriceBand } from './serviceAreas';

/**
 * Standalone editorial pages that are not city-scoped: pricing, an FAQ hub and a
 * comparison page. These target queries the service-area pages deliberately do
 * not, so nothing here competes with a city page for the same intent.
 */

export interface ContentSectionBlock {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
}

export interface ContentPage {
  path: string;
  title: string;
  description: string;
  eyebrow: string;
  h1: string;
  /** 40-60 word extractable answer for AI engines and featured snippets. */
  answer: string;
  intro: string;
  sections: ContentSectionBlock[];
  faqs: Faq[];
  related: { path: string; label: string }[];
}

/**
 * Real client testimonials only.
 *
 * Leave this empty rather than filling it with invented quotes: fabricated
 * reviews violate Google's structured-data policy and can earn a manual action.
 * Review schema is emitted only when this array has entries.
 */
export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  /** ISO date the testimonial was given. */
  date: string;
}

export const testimonials: Testimonial[] = [];

export const PRICE_TABLE: PriceBand[] = [
  INR_BANDS.starterSite,
  INR_BANDS.growthSite,
  INR_BANDS.ecommerce,
  INR_BANDS.seoFoundations,
  INR_BANDS.automationPilot,
  INR_BANDS.aiBuild,
  INR_BANDS.software,
  INR_BANDS.mvp,
];

export const contentPages: ContentPage[] = [
  {
    path: '/pricing',
    title: 'Website & Software Development Pricing in India | BuiltbyGSV',
    description:
      'What websites, online stores, custom software, SEO and AI automation actually cost in India. Real INR ranges, what moves the price, and how to compare quotes.',
    eyebrow: 'Pricing, stated plainly',
    h1: 'What this work costs.',
    answer:
      'A starter business website in India typically costs INR 18,000 to 45,000, a growth website with proper service pages and SEO foundations INR 60,000 to 1,60,000, an online store INR 85,000 to 2,50,000, and custom software from INR 1,50,000 upward. Scope, integrations and content ownership move the price far more than the technology used.',
    intro:
      'Most development sites refuse to publish numbers, which wastes everyone a week of calls. These are real ranges from real scopes. Your quote will land somewhere inside one of them, and the scoping conversation exists to work out which one and why.',
    sections: [
      {
        heading: 'Indicative ranges',
        paragraphs: [
          'Ranges are stated in INR for clients in Karaikal, Thanjavur, Puducherry and elsewhere in India. International engagements are quoted in USD, starting around 1,200 USD for a website and 2,500 USD for custom software.',
          'Every range is wide for an honest reason: a five-page information site and an appointment-booking site are both called a website, and they are not the same project. The scoping call narrows the number quickly.',
        ],
        bullets: PRICE_TABLE.map((band) => `${band.name}: ${band.range}. ${band.fits}`),
      },
      {
        heading: 'The five decisions that actually move the price',
        paragraphs: [
          'Ask every developer to separate these in their estimate. It makes competing quotes comparable, which is the main thing most quotes are designed to avoid.',
        ],
        bullets: [
          'Content: who writes, edits and translates the service information, and who supplies photography.',
          'Design: custom-designed, or adapted from an existing theme.',
          'Functionality: forms only, or booking, payments, dashboards, logins and third-party systems.',
          'Search foundations: whether page architecture, metadata, structured data and local content are inside the quote or sold separately afterwards.',
          'Ownership and support: who controls the domain, hosting, analytics accounts and source code once it is live.',
        ],
      },
      {
        heading: 'What is not charged for',
        paragraphs: [
          'The first conversation, the scoping discussion and an honest recommendation are free, including the recommendation not to build anything. If a ready-made package covers your process at a monthly fee, you will be told that rather than quoted for a custom build.',
        ],
      },
      {
        heading: 'How payment is structured',
        paragraphs: [
          'Projects run in stages with payment tied to delivered work rather than to elapsed time. Typically a start payment, one or more milestone payments against reviewable releases, and a final payment at handover. Scope changes are quoted before they are built, never invoiced afterwards as a surprise.',
        ],
      },
      {
        heading: 'Why the cheapest quote often costs more',
        paragraphs: [
          'A low initial number usually excludes content, mobile optimisation, analytics, search foundations or source-code ownership. Those either get added as paid extras later or never get done, and the second is worse. The relevant comparison is total cost to a working, owned, findable site, not the first line of the proposal.',
        ],
      },
    ],
    faqs: [
      { question: 'How much does a website cost in Karaikal?', answer: 'A starter business website generally runs INR 18,000 to 45,000 and a growth website with proper service pages, local SEO foundations and analytics runs INR 60,000 to 1,60,000. Online stores start around INR 85,000. The scope, not the location, sets the price.' },
      { question: 'Why do you publish prices when most agencies do not?', answer: 'Because hiding them wastes a week of calls for both sides. If the range does not fit your budget you should know that in the first minute, not after three meetings.' },
      { question: 'Is there a monthly maintenance fee?', answer: 'Only if you want one. Sites are handed over so you own the hosting and code outright. Optional maintenance covers updates, monitoring and small changes, and you can stop it at any time without the site breaking.' },
      { question: 'Do you charge for the initial consultation?', answer: 'No. The first conversation and the scoping discussion are free, including an honest recommendation to buy an existing product instead of commissioning a build when that is the better decision.' },
      { question: 'Can the project be split into phases?', answer: 'Yes, and it usually should be. A focused first release that works, followed by additions driven by real usage, consistently beats committing the whole budget to a specification written before anyone has used anything.' },
    ],
    related: [
      { path: '/insights/website-cost-karaikal', label: 'Website cost guide for Karaikal' },
      { path: '/services', label: 'All services' },
      { path: '/process', label: 'How projects run' },
      { path: '/contact', label: 'Start a project' },
    ],
  },
  {
    path: '/faq',
    title: 'Frequently Asked Questions | BuiltbyGSV',
    description:
      'Answers about working with BuiltbyGSV: cost, timelines, remote working, ownership of code, technology choices, SEO expectations and support after launch.',
    eyebrow: 'Common questions',
    h1: 'Questions people ask before starting.',
    answer:
      'BuiltbyGSV is the remote web, software and AI studio of Gurusabarivasan M, working with clients in Karaikal, Thanjavur, Bengaluru and remotely across India. Projects are fee-based with agreed scope, clients own the source code and accounts at handover, and the first conversation and scoping discussion are free.',
    intro:
      'If your question is not answered here, the fastest route is to describe the problem in an email. A short description is enough to get a useful answer back.',
    sections: [
      {
        heading: 'Who you are working with',
        paragraphs: [
          'BuiltbyGSV is the independent studio of Gurusabarivasan M, known online as GuruGSV. One person handles product definition, interface design and implementation, which means decisions stay close to the code and nothing is lost in a handoff between a sales team and a delivery team.',
          'The studio operates remotely. There is no office you can walk into, and no Google Business Profile listing, because there is no physical address to verify. That is stated plainly here rather than implied otherwise elsewhere on the site.',
        ],
      },
      {
        heading: 'How to get a useful first reply',
        paragraphs: [
          'Describe who has the problem, what they do today, and what has to be different. Screenshots or a link to an existing system help more than a feature list. That is enough to come back with a realistic scope, a range and an honest view of whether this is worth building at all.',
        ],
      },
    ],
    faqs: [
      { question: 'Where is BuiltbyGSV based?', answer: 'BuiltbyGSV operates remotely from Puducherry, India, and works with clients in Karaikal, Thanjavur, Bengaluru and elsewhere in India and abroad. There is no walk-in office, so everything runs on scheduled calls and written updates.' },
      { question: 'Do you work with clients outside your region?', answer: 'Yes. Projects run remotely with structured checkpoints, written progress updates and review calls. Communication is available in English and Tamil.' },
      { question: 'Do I own the code and the accounts?', answer: 'Yes. Source code, database, domain and hosting accounts are transferred to you at handover, with documentation. Nothing stops working if the relationship ends, and any competent developer can maintain it.' },
      { question: 'How long does a project take?', answer: 'A focused website is typically one to three weeks, an online store three to six weeks, custom software four to eight weeks for a first release, and an MVP six to ten weeks. Content and data readiness on your side is the usual cause of delay.' },
      { question: 'What technology do you use?', answer: 'React, TypeScript, Node.js, Python, PostgreSQL, Supabase, Docker and AWS are the common tools, and the choice follows the product and whoever will maintain it. WordPress or Shopify is recommended where it is genuinely the better fit.' },
      { question: 'Can you fix or take over an existing website or system?', answer: 'Yes, starting with an assessment of what exists. Sometimes the honest answer is that extending it is cheaper than rebuilding, and sometimes the foundation is unsound. You get the reasoning either way, before any quote.' },
      { question: 'Do you guarantee Google rankings?', answer: 'No. Google sells ads, not organic positions, and anyone guaranteeing a number-one ranking is selling something that does not exist. What is committed to is technical correctness, one page per real search intent, and visible movement in your own Search Console.' },
      { question: 'What support is there after launch?', answer: 'Launch includes a defined defect-support window. After that, optional maintenance covers updates, monitoring and small changes. It is not compulsory, and declining it does not affect your ownership or the site continuing to run.' },
      { question: 'What does a project cost?', answer: 'Indicative ranges are published rather than hidden: from INR 18,000 for a starter site to INR 1,50,000 and upward for custom software. Full ranges and what moves them are on the pricing page.' },
      { question: 'Do you take equity or revenue share instead of fees?', answer: 'No. Engagements are fee-based against agreed scope, which keeps the incentive on shipping the right small thing rather than on maximising the size of the build.' },
    ],
    related: [
      { path: '/pricing', label: 'Pricing' },
      { path: '/process', label: 'How projects run' },
      { path: '/about', label: 'About Gurusabarivasan M' },
      { path: '/contact', label: 'Contact' },
    ],
  },
  {
    path: '/compare/freelance-developer-vs-web-development-agency',
    title: 'Freelance Developer vs Web Development Agency: How to Choose | BuiltbyGSV',
    description:
      'An honest comparison of hiring a freelance developer, a local web development agency or a studio, including cost, risk, continuity and when each is genuinely the right choice.',
    eyebrow: 'Choosing who builds it',
    h1: 'Freelancer, agency or studio?',
    answer:
      'A freelance developer usually costs least and suits small, well-defined builds, but carries continuity risk. An agency costs most and suits large multi-workstream projects needing guaranteed cover. A small studio sits between: one accountable technical owner, agency-level process, but limited parallel capacity. Match the choice to project size and how much continuity risk you can absorb.',
    intro:
      'This page exists because the comparison is usually written by whichever party wants your business. BuiltbyGSV is a one-person studio, so the bias is declared at the top rather than hidden. There are projects listed below that a studio like this should not take.',
    sections: [
      {
        heading: 'Where a freelance developer is the right call',
        paragraphs: [
          'A well-defined build with a clear specification, a modest budget and no dependency on a long support relationship. If you know exactly what you want, a good freelancer will deliver it faster and cheaper than anyone else.',
        ],
        bullets: [
          'Strongest on: cost, speed on small scopes, direct communication.',
          'Weakest on: continuity if they take a job, become unavailable or move on.',
          'Biggest risk: undocumented code that only one person can maintain.',
          'Protect yourself by: insisting on a repository you own, written documentation and staged payments against delivered work.',
        ],
      },
      {
        heading: 'Where an agency is the right call',
        paragraphs: [
          'Large projects running several workstreams at once, or organisations that need contractual guarantees, defined cover during absence and a team that survives any individual leaving. If the project needs design, content, development and paid media running in parallel, an agency is built for that and a solo studio is not.',
        ],
        bullets: [
          'Strongest on: capacity, continuity, formal process and accountability.',
          'Weakest on: cost, and how far your decisions travel from the people writing the code.',
          'Biggest risk: paying senior rates while a junior does the work, and losing the original intent through internal handoffs.',
          'Protect yourself by: asking who specifically does the work, and asking to meet them.',
        ],
      },
      {
        heading: 'Where a small studio is the right call',
        paragraphs: [
          'Projects that need one person to hold product context, design and implementation together, with proper engineering practice but without agency overhead. This is where BuiltbyGSV fits: enough process to be reliable, small enough that the person you speak to is the person building it.',
        ],
        bullets: [
          'Strongest on: continuity of intent from problem to code, and no cost of internal handoffs.',
          'Weakest on: parallel capacity. Three simultaneous large projects is not realistic.',
          'Biggest risk: the same key-person risk a freelancer carries.',
          'Mitigated by: standard conventional tooling, documentation and full handover, so any developer can take over.',
        ],
      },
      {
        heading: 'Questions that work on all three',
        paragraphs: [
          'These separate serious providers from the rest regardless of which type you are talking to.',
        ],
        bullets: [
          'Show me a live project like mine, on my phone, not a screenshot.',
          'Who specifically writes the code, and will I be able to speak to them during the project?',
          'What is explicitly not included in this quote?',
          'Who owns the domain, hosting, analytics and source code when we finish?',
          'What happens if I want to move to another developer in a year?',
          'How will we know after launch whether this worked?',
        ],
      },
      {
        heading: 'The honest summary',
        paragraphs: [
          'Project size and continuity risk decide this, not marketing. Small and well-defined suits a freelancer. Large and multi-stream suits an agency. Something in between, where product thinking and engineering need to stay in the same head, suits a studio. Any of the three can be excellent or poor; the questions above tell you which one you are looking at.',
        ],
      },
    ],
    faqs: [
      { question: 'Is a freelancer cheaper than an agency?', answer: 'Usually on the invoice, yes, often by a factor of two or three. The comparison worth making is total cost including rework, continuity risk and whether search foundations and analytics are inside the quote or added later.' },
      { question: 'What is the biggest risk with a solo developer?', answer: 'Key-person risk. If they become unavailable, you need someone else to pick up the code. Mitigate it by owning the repository from day one, requiring documentation, and insisting on standard conventional tooling rather than a personal framework.' },
      { question: 'How do I check whether a local company is any good?', answer: 'Open their own site on your phone and look at how it is built. If a web development company runs a single page trying to rank for every service, or their site loads slowly on mobile, that is the standard of work you are buying.' },
      { question: 'Should I choose someone local?', answer: 'Local helps for on-site discovery, training and trust, and it matters most where the project involves observing a physical workflow. For most web and software work, relevant experience and communication quality matter considerably more than distance.' },
      { question: 'When should I not hire BuiltbyGSV?', answer: 'When you need several large projects running simultaneously, when you need contractual cover during any absence, or when you need design, development, content and paid media delivered together as one team. An agency serves those properly and a one-person studio does not.' },
    ],
    related: [
      { path: '/pricing', label: 'Pricing' },
      { path: '/insights/website-project-brief-template', label: 'Website project brief template' },
      { path: '/faq', label: 'Frequently asked questions' },
      { path: '/process', label: 'How projects run' },
    ],
  },
];

export const getContentPage = (pathname: string) => {
  const normalized = pathname.replace(/\/+$/, '') || '/';
  return contentPages.find((page) => page.path === normalized);
};
