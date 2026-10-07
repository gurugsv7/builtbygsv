/**
 * Free tools for college students: the "complete list with official links" from the
 * student freebies reel. Every fact here was checked against the official page on
 * LAST_CHECKED; the page, its prerendered snapshot and its structured data all read
 * from this one file.
 */
import { SITE_URL } from '../seo';

export const STUDENT_PAGE = {
  path: '/student',
  title: 'Free Tools for College Students in India (2026) | BuiltbyGSV',
  description:
    'Free software for college students in India, with official links: GitHub Student Pack, Copilot, Figma, Notion, Autodesk, Adobe and 12 months of Google AI Plus.',
  headline: 'Your student ID unlocks thousands of rupees of software, free.',
  tag: 'College students only',
  tip: 'Keep your college email or a photo of your student ID ready; most offers verify with it.',
  published: '2026-10-07',
  updated: '2026-10-07',
  image: { path: '/og/student-free-tools.jpg', alt: 'Free with your student ID: the free tools list for college students, by BuiltbyGSV' },
} as const;

export const LAST_CHECKED = '7 Oct 2026';

export type ToolCategory = 'Dev' | 'Design' | 'Productivity' | 'AI';
export const TOOL_CATEGORIES: ToolCategory[] = ['Dev', 'Design', 'Productivity', 'AI'];

/** Keys into the component's logo map; kept as strings so Node can load this file. */
export type ToolLogo = 'github' | 'domain' | 'pages' | 'adobe' | 'figma' | 'notion' | 'autodesk' | 'gemini';
export type ToolShot = 'ghpack' | 'namecheap' | 'figma' | 'notion' | 'google';

export interface StudentTool {
  /** Anchor id: /student#github opens this tool. */
  id: string;
  name: string;
  short: string;
  category: ToolCategory;
  logo: ToolLogo;
  /** One line: what you get. */
  gets: string;
  eligibility: string;
  url: string;
  /** Domain shown on the button so people know where they are going. */
  host: string;
  steps: string[];
  /** The catch, shown in clay. */
  caveat?: string;
  tip?: string;
  /** Value claim quoted from an official source, with that source. */
  value?: { text: string; source: string };
  shot?: ToolShot;
}

export const STUDENT_TOOLS: StudentTool[] = [
  {
    id: 'github',
    name: 'GitHub Student Developer Pack',
    short: 'GitHub Pack',
    category: 'Dev',
    logo: 'github',
    gets: 'GitHub Copilot, GitHub Pro and dozens of partner tools: cloud credits, IDEs, courses.',
    eligibility: 'Verified students',
    url: 'https://education.github.com/pack',
    host: 'education.github.com',
    steps: [
      'Sign in to GitHub, or create a free account.',
      'On the Pack page, choose Sign up for Student Developer Pack.',
      'Start an application and verify with your college email or a photo of your student ID showing the current enrolment date.',
      'Review is not instant: wait for the approval email, then claim offers from your GitHub Education portal.',
    ],
    tip: 'Copilot Student gives unlimited code completions plus a monthly allowance of AI credits; chat and agent use are limited.',
    shot: 'ghpack',
  },
  {
    id: 'domain',
    name: 'Free .me domain',
    short: 'Free domain',
    category: 'Dev',
    logo: 'domain',
    gets: 'A .me domain free for one year from Namecheap, a Student Pack partner.',
    eligibility: 'Pack members',
    url: 'https://nc.me',
    host: 'nc.me',
    steps: [
      'Get your GitHub Student Developer Pack approved first.',
      'Find Namecheap in the Pack offers and follow its link to nc.me.',
      'Pick your name, for example yourname.me, and claim the first year free.',
      'Point it at GitHub Pages to get a real portfolio address.',
    ],
    caveat: 'It renews at the normal price after the first year. Signing up on nc.me directly only covers select US, UK, Canadian and Australian universities, so Indian students should claim it through the Pack.',
    tip: 'The Pack also lists a free .TECH domain and a Name.com domain; check the Pack page for current domain partners.',
    shot: 'namecheap',
  },
  {
    id: 'pages',
    name: 'GitHub Pages',
    short: 'Portfolio hosting',
    category: 'Dev',
    logo: 'pages',
    gets: 'Free hosting for your portfolio site, straight from a GitHub repository.',
    eligibility: 'Free for everyone',
    url: 'https://pages.github.com',
    host: 'pages.github.com',
    steps: [
      'Create a repository named yourusername.github.io.',
      'Add an index.html, or start from a template.',
      'Your site goes live at https://yourusername.github.io.',
      'Optional: add a CNAME file with your free .me domain.',
    ],
    tip: 'Free domain + Pages + the link on your résumé = a portfolio recruiters can open.',
  },
  {
    id: 'adobe',
    name: 'Adobe Creative Cloud',
    short: 'Adobe',
    category: 'Design',
    logo: 'adobe',
    gets: 'Photoshop, Premiere Pro and the rest of Creative Cloud, if your college provides it.',
    eligibility: 'Via your college',
    url: 'https://www.adobe.com/education.html',
    host: 'adobe.com',
    steps: [
      'Search your college email for an Adobe or Creative Cloud invite.',
      'No invite? Ask your college IT team or library whether students get Creative Cloud.',
      'If they do, sign in at adobe.com with your college email.',
    ],
    caveat: 'Free only when your college has a Creative Cloud licence. Otherwise it is a paid student discount (Adobe lists US$19.99/mo for the first year on the annual plan), not free.',
  },
  {
    id: 'figma',
    name: 'Figma Education',
    short: 'Figma',
    category: 'Design',
    logo: 'figma',
    gets: 'The Figma Professional plan, free for verified students.',
    eligibility: 'Verified students',
    url: 'https://www.figma.com/education/',
    host: 'figma.com',
    steps: [
      'Open Figma for Education and apply as a student.',
      'Verify your student status.',
      'Create your Education team and design on the Professional plan.',
    ],
    tip: 'Figma says the education plan is 100% free, with no freemium or hidden upgrades.',
    shot: 'figma',
  },
  {
    id: 'notion',
    name: 'Notion for Education',
    short: 'Notion',
    category: 'Productivity',
    logo: 'notion',
    gets: 'Notion’s Education plan, free: unlimited pages and blocks, file uploads, 30-day history.',
    eligibility: 'College email only',
    url: 'https://www.notion.com/product/notion-for-education',
    host: 'notion.com',
    steps: [
      'Make your college email the primary email on your Notion account.',
      'On Notion for Education, choose Get Notion free.',
      'Claim the student offer for one workspace.',
    ],
    caveat: 'Notion does not accept student IDs, only a college email, and Gmail accounts do not qualify. Each college email claims the offer once, for one workspace; re-verify once a year.',
    shot: 'notion',
  },
  {
    id: 'autodesk',
    name: 'Autodesk Education',
    short: 'Autodesk',
    category: 'Design',
    logo: 'autodesk',
    gets: 'Fusion, AutoCAD, 3ds Max, Revit and more for 3D and engineering, free for a year.',
    eligibility: 'Educational use',
    url: 'https://www.autodesk.com/education/home',
    host: 'autodesk.com',
    steps: [
      'Open Autodesk Education and pick a product.',
      'Sign up with your college email.',
      'Confirm eligibility and upload any documents asked for.',
      'Once verified, download from your account. Access renews every year while you are eligible.',
    ],
    caveat: 'Educational use only. Autodesk forbids using education licences for commercial, professional or other for-profit work.',
  },
  {
    id: 'google',
    name: 'Google AI Plus (India)',
    short: 'Google AI Plus',
    category: 'AI',
    logo: 'gemini',
    gets: '12 months free: Gemini with 2× higher usage limits, plus 400 GB of storage.',
    eligibility: 'College in India, 18+',
    url: 'https://one.google.com/ai-student',
    host: 'one.google.com',
    steps: [
      'Open the offer and sign in with your Google account.',
      'Verify your student status (Google uses SheerID).',
      'Add a payment method; nothing is charged during the free year.',
      'Set a reminder for a few days before the year ends.',
    ],
    caveat: 'Claim before 31 Dec 2026. It needs a payment method and auto-renews at the standard monthly price after the free year unless you cancel.',
    value: {
      text: 'Google’s banner shows ₹4,000 → free',
      source: 'https://blog.google/intl/en-in/products/start-the-academic-year-with-one-year-of-gemini-on-us/',
    },
    shot: 'google',
  },
];

/** Extra Pack offers, each read off education.github.com/pack on LAST_CHECKED. */
export const PACK_EXTRAS = [
  'JetBrains IDEs: free annual subscription',
  'Microsoft Azure: US$100 credit (18+)',
  'MongoDB Atlas: US$50 credit',
  '1Password: free for 1 year',
  'Frontend Masters: 6 months free',
  '.TECH domain: free for 1 year',
];

export const STUDENT_FAQS = [
  {
    question: 'Do I need a .edu email?',
    answer:
      'No. Offers accept your own college’s email domain, whatever it ends in. GitHub also accepts a photo of your student ID with the current enrolment date. Notion is the exception: it only verifies with a college email.',
  },
  {
    question: 'What if my college is not listed?',
    answer:
      'GitHub and Autodesk let you upload proof instead, such as your student ID, an enrolment letter or a transcript. Namecheap’s direct sign-up only covers select foreign universities, so claim the free domain through the GitHub Pack.',
  },
  {
    question: 'What happens after the free period?',
    answer:
      'The .me domain renews at the normal price, and Google AI Plus starts charging the standard monthly price unless you cancel. Autodesk and Notion stay free while you re-verify each year as a student.',
  },
  {
    question: 'Can I use these for paid or client work?',
    answer:
      'Usually not. Education licences are meant for learning; Autodesk explicitly bans commercial use. Read each offer’s terms before you use it for freelance or client projects.',
  },
];

export const STUDENT_SOURCES = [
  { label: 'GitHub Student Developer Pack', url: 'https://education.github.com/pack' },
  { label: 'GitHub Education application docs', url: 'https://docs.github.com/en/education/about-github-education/github-education-for-students/apply-to-github-education-as-a-student' },
  { label: 'Namecheap Education FAQ', url: 'https://nc.me/faq' },
  { label: 'GitHub Pages', url: 'https://pages.github.com' },
  { label: 'Adobe Education', url: 'https://www.adobe.com/education.html' },
  { label: 'Figma for Education', url: 'https://www.figma.com/education/' },
  { label: 'Notion for Education help', url: 'https://www.notion.com/help/notion-for-education' },
  { label: 'Autodesk Education', url: 'https://www.autodesk.com/education/home' },
  { label: 'Google India blog', url: 'https://blog.google/intl/en-in/products/start-the-academic-year-with-one-year-of-gemini-on-us/' },
  { label: 'Google One student offer terms', url: 'https://one.google.com/offer/studentoffer8' },
];

export const INSTAGRAM_URL = 'https://www.instagram.com/builtbygsv/';

/** Article + FAQPage nodes, shared by the client router and the prerender. */
export function createStudentPageSchema() {
  const url = `${SITE_URL}${STUDENT_PAGE.path}`;
  return [
    {
      '@type': 'Article',
      '@id': `${url}#article`,
      headline: 'Free tools for college students in India (2026)',
      description: STUDENT_PAGE.description,
      image: `${SITE_URL}${STUDENT_PAGE.image.path}`,
      datePublished: STUDENT_PAGE.published,
      dateModified: STUDENT_PAGE.updated,
      mainEntityOfPage: url,
      author: { '@id': `${SITE_URL}/#gurusabarivasan` },
      publisher: { '@id': `${SITE_URL}/#organization` },
      inLanguage: 'en-IN',
      about: STUDENT_TOOLS.map((tool) => ({ '@type': 'SoftwareApplication', name: tool.name, url: tool.url })),
    },
    {
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      mainEntity: STUDENT_FAQS.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    },
  ];
}
