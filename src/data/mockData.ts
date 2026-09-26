import { Project, ServiceDetail, NotificationItem } from '../types';

export const PROJECTS: Project[] = [
  {
    id: 'budget-diet-app',
    title: 'Budget Diet App',
    subtitle: 'An internal AI meal-planning product exploring affordable nutrition for PG residents. In development.',
    category: 'AI',
    status: 'In Progress',
    statusColor: 'text-[#854D0E] bg-amber-50 border-amber-200',
    iconName: 'Sprout',
    iconBgColor: 'bg-[#EBF7EF]',
    iconTextColor: 'text-[#15803D]',
    description: 'An AI-driven hyper-local meal planner designed specifically for students and PG residents in Bangalore trying to maintain balanced nutrition on a strict budget.',
    tags: ['React Native', 'Supabase', 'Python', 'Machine Learning'],
    metrics: [],
    problemStatement: 'PG residents and college students in urban hubs like Bangalore struggle with poor diet variety and high food delivery expenses, while local PG messes lack customizable nutritional tracking.',
    solutionProvided: 'Developing meal recommendations and daily budgeting around local food options. The lab build explores how AI can support affordable meal planning.',
    client: 'BuiltbyGSV Lab Project',
    location: 'Bangalore, India',
    year: '2026',
    featured: true,
    detailData: {
      storyHeadline: 'Every rupee counts.',
      storyParagraphs: [
        'Budget Diet App explores a familiar problem for PG residents: planning balanced meals within a daily budget.',
        'The internal product explores meal suggestions and budgeting. It remains in development; production adoption and savings have not been established.'
      ],
      stickyNoteText: 'The goal wasn\'t just to build an app. It was to build a better everyday life for students.',
      stickyNoteHighlight: 'better everyday life for students.',
      heroDoodleText: 'Good meals. Great prices.',
      glimpseScreenshots: [],
      builtWithTech: [
        { name: 'React Native', iconName: 'React' },
        { name: 'Supabase', iconName: 'Database' },
        { name: 'Python', iconName: 'Code' },
        { name: 'FastAPI', iconName: 'Zap' },
        { name: 'PostgreSQL', iconName: 'Database' },
        { name: 'Vercel', iconName: 'Globe' },
      ],
      timeline: 'In development',
      capabilities: 'Application Architecture · AI Integration',
      engagement: 'BuiltbyGSV Lab',
      platform: 'Android, iOS, Web',
      impactMetrics: [],
      whatsNextItems: [
        'Grocery price alerts',
        'Nutrition insights',
        'Shared budgets for PG groups',
        'AI coach for better habits',
      ],
    }
  },
  {
    id: 'v2-productions',
    title: 'V² Productions',
    subtitle: 'Creative Studio Platform. Responsive service showcases, course discovery and enquiry flows.',
    category: 'Web',
    status: 'Completed',
    statusColor: 'text-[#0284C7] bg-[#E0F2FE] border-sky-200',
    iconName: 'Video',
    iconBgColor: 'bg-[#E2F1ED]',
    iconTextColor: 'text-[#0F8B75]',
    description: 'A premium, cinematic creative studio website built for V² Productions with React 19, TypeScript, Vite, and Tailwind CSS. Showcases video editing, web design, digital marketing, live 1-on-1 courses, and dual mobile/desktop interactive UX.',
    tags: ['React 19', 'TypeScript', 'Vite', 'Tailwind', 'Motion'],
    metrics: [],
    problemStatement: 'Creative agencies require a cinematic visual style and a high-conversion web platform that seamlessly bridges portfolio storytelling, video editing course enrollments, and interactive lead-generation.',
    solutionProvided: 'Architected a responsive dual-experience platform using React 19, TypeScript, Vite, and Framer Motion. Implemented mobile/desktop UI switching, animated hero showcases, lead gen flows, and modular course catalog structures.',
    client: 'V² Productions Studio',
    location: 'Remote',
    year: '2026',
    featured: true,
    detailData: {
      seoTitle: 'V² Productions Website Case Study | BuiltbyGSV',
      seoDescription: 'BuiltbyGSV designed a responsive React website for V² Productions to present video editing, web design, digital marketing and live courses.',
      publicImageUrl: 'https://www.builtbygsv.in/og-cover.png',
      answerBlock: {
        question: 'What did BuiltbyGSV build for V² Productions?',
        answer: 'BuiltbyGSV designed and developed a premium creative studio website for V² Productions using React, TypeScript, Vite, Tailwind CSS and motion-led UI. The project presents video editing, web design, digital marketing and live 1-on-1 course offerings through a cinematic, responsive experience.',
      },
      storyHeadline: 'Cinematic visual storytelling.',
      storyParagraphs: [
        'Creative agencies need a digital platform that conveys high production value from the first frame. Static business card sites fail to capture the energy of live video editing and creative studio courses.',
        'We engineered the platform with React 19, TypeScript and Vite, with distinct mobile and desktop layouts for service discovery and enquiries.'
      ],
      stickyNoteText: 'Great design isn\'t just aesthetic. It is clear service discovery and straightforward enquiries.',
      stickyNoteHighlight: 'clear service discovery',
      heroDoodleText: 'Cinematic style. Real results.',
      glimpseScreenshots: [{ title: 'Creative services' }, { title: 'Course discovery' }, { title: 'Studio experience' }, { title: 'Enquiry journey' }],
      builtWithTech: [
        { name: 'React 19', iconName: 'React' },
        { name: 'TypeScript', iconName: 'Code' },
        { name: 'Vite', iconName: 'Zap' },
        { name: 'Tailwind CSS', iconName: 'Globe' },
        { name: 'Framer Motion', iconName: 'Zap' },
        { name: 'Node.js', iconName: 'Database' },
      ],
      timeline: 'Feb 2026 – Mar 2026',
      capabilities: 'UX Design · Frontend Engineering',
      engagement: 'Client Work',
      platform: 'Web, Mobile, PWA',
      impactMetrics: [],
      whatsNextItems: [
        'Integrated video course streaming',
        'Real-time student chat & feedback',
        'Automated lead scheduling calendar',
        'Client video proofing dashboard',
      ],
      proofSignals: [
        {
          value: 'Creative Studio',
          label: 'Website Development',
          description: 'A service-led website structure for video editing, web design, digital marketing and course enquiries.',
          iconName: 'Globe',
        },
        {
          value: 'BuiltbyGSV',
          label: 'Engineering Studio',
          description: 'Product experience and frontend implementation by BuiltbyGSV.',
          iconName: 'User',
        },
        {
          value: 'React + Vite',
          label: 'Frontend Stack',
          description: 'A fast, component-driven implementation focused on performance, responsive UX and visual polish.',
          iconName: 'Code',
        },
        {
          value: 'Remote',
          label: 'Service Reach',
          description: 'A remotely delivered web platform for a creative business.',
          iconName: 'TrendingUp',
        },
      ],
      relatedLinks: [
        { label: 'Website development services', href: '/services/web-development' },
        { label: 'Explore BuiltbyGSV work', href: '/projects' },
        { label: 'About us', href: '/about' },
      ],
    }
  },
  {
    id: 'thaai-clinic-website',
    title: 'Thaai Clinic',
    subtitle: 'A patient companion prototype exploring appointment booking, local records and clinic contact.',
    category: 'Web',
    status: 'Completed',
    statusColor: 'text-[#E11D48] bg-rose-50 border-rose-200',
    iconName: 'Heart',
    iconBgColor: 'bg-[#FCE7F3]',
    iconTextColor: 'text-[#E11D48]',
    description: 'Thaai Clinic is a React + TypeScript healthcare app that simulates a full patient journey in a polished mobile interface. It includes onboarding, appointment booking, appointment tracking, medical record management, health education content, clinic details, and instant contact options through call and WhatsApp.',
    tags: ['React 19', 'TypeScript', 'Tailwind', 'Vite', 'localStorage'],
    metrics: [],
    problemStatement: 'Patients at local clinics face long waiting lines, misplaced physical medical records, and fragmented healthcare guidance on mobile devices.',
    solutionProvided: 'Built a mobile-first prototype with simulated booking, local record management, sample health content and call/WhatsApp links. Backend integration and authentication remain future work.',
    client: 'BuiltbyGSV Lab',
    location: 'Karaikal, Puducherry',
    year: '2024',
    featured: true,
    detailData: {
      seoTitle: 'Thaai Clinic App Case Study | BuiltbyGSV',
      seoDescription: 'Explore the Thaai Clinic concept build: a mobile-first React prototype with simulated booking, local records and clinic contact.',
      publicImageUrl: 'https://www.builtbygsv.in/og-cover.png',
      answerBlock: {
        question: 'What did BuiltbyGSV build for Thaai Clinic?',
        answer: 'BuiltbyGSV developed Thaai Clinic as a React and TypeScript concept prototype. It simulates booking and record management using localStorage; it is not a production patient-record system.',
      },
      storyHeadline: 'Care. Connection. Comfort.',
      storyParagraphs: [
        'Thaai Clinic is a mobile-first patient companion prototype for a local clinic, built to make everyday healthcare simple, personal, and stress-free.',
        'It simulates a complete healthcare journey around appointment booking, appointment management, medical records, health education, clinic discovery, and direct contact via call or WhatsApp inside a framed mobile experience with local state and localStorage persistence.'
      ],
      stickyNoteText: 'A concept build for exploring a simpler patient journey.',
      stickyNoteHighlight: 'a simpler patient journey.',
      heroDoodleText: 'Care that fits in your pocket.',
      glimpseScreenshots: [],
      builtWithTech: [
        { name: 'React 19', iconName: 'React' },
        { name: 'TypeScript', iconName: 'Code' },
        { name: 'Tailwind CSS', iconName: 'Globe' },
        { name: 'Vite', iconName: 'Zap' },
        { name: 'lucide-react', iconName: 'Laptop' },
        { name: 'localStorage', iconName: 'Database' },
      ],
      timeline: 'Apr 2024 – May 2024',
      capabilities: 'Frontend Engineering · Interaction Design',
      engagement: 'Concept Build · Prototype',
      platform: 'Web (Mobile-First)',
      impactMetrics: [],
      whatsNextItems: [
        'Backend integration & auth',
        'Push notifications',
        'In-app payments',
        'Family member profiles',
        'AI health assistant',
      ],
      proofSignals: [
        {
          value: 'Mobile-First App',
          label: 'Architecture',
          description: 'Built a mobile-first clinic patient app in React and TypeScript with a custom phone-frame UI and bottom-tab navigation.',
          iconName: 'Smartphone',
        },
        {
          value: 'Full Journey',
          label: 'Feature Set',
          description: 'Implemented appointment booking, management, notifications, medical record vault, health tips, and clinic info screens.',
          iconName: 'Layers',
        },
        {
          value: 'Local Vault',
          label: 'Persistence',
          description: 'Added local persistence with localStorage for appointments, records, tips, and notification state.',
          iconName: 'Database',
        },
        {
          value: 'Branded UI',
          label: 'Support Flows',
          description: 'Designed a branded healthcare experience with responsive Tailwind layouts, modals, filters, and direct support contact flows.',
          iconName: 'Heart',
        },
      ],
      relatedLinks: [
        { label: 'Explore BuiltbyGSV work', href: '/projects' },
        { label: 'Website development services', href: '/services/web-development' },
        { label: 'About us', href: '/about' },
      ],
    }
  }
];

export const SERVICES: Record<string, ServiceDetail> = {
  'web-dev': {
    id: 'web-dev',
    title: 'Product Engineering',
    tag: 'SERVICE',
    tagColor: 'teal',
    scriptTagline: 'Fast. Modern. Responsive.',
    description: 'We design and engineer websites, web applications and customer-facing platforms around the people using them.',
    techStack: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vite', 'Framer Motion'],
    startingPrice: '$1,200',
    timeline: '1 - 3 Weeks',
    features: [
      {
        id: 'web-1',
        title: 'Custom & Responsive',
        description: 'Pixel-perfect websites that work on every device.',
        icon: 'Monitor',
        details: 'Every screen layout is tailored for desktop, tablet, and mobile with fluid typographic scales, smooth transitions, and high DPR assets.'
      },
      {
        id: 'web-2',
        title: 'SEO Optimized',
        description: 'Built with best practices for higher rankings and visibility.',
        icon: 'Rocket',
        details: 'Includes clean semantic HTML5 markup, structured JSON-LD schema, open graph tags, automated XML sitemaps, and optimized meta descriptions.'
      },
      {
        id: 'web-3',
        title: 'Lightning Fast',
        description: 'Optimized for speed, performance and better user experience.',
        icon: 'Gauge',
        details: 'Improve load performance with compressed WebP imagery, lazy loading, code splitting, and edge-cached static distribution.'
      },
      {
        id: 'web-4',
        title: 'Secure & Reliable',
        description: 'Clean code, best practices and security at the core.',
        icon: 'ShieldCheck',
        details: 'Adheres to OWASP security guidelines, SSL/TLS setup, strict Content Security Policies (CSP), and automated dependency audits.'
      }
    ]
  },
  'software-dev': {
    id: 'software-dev',
    title: 'Software Engineering',
    tag: 'SERVICE',
    tagColor: 'orange',
    scriptTagline: 'Built around your logic.',
    description: 'We build custom applications, dashboards and backend systems around your business workflows.',
    techStack: ['Node.js', 'Express', 'Python', 'PostgreSQL', 'Docker', 'Redis', 'REST APIs'],
    startingPrice: '$2,500',
    timeline: '3 - 6 Weeks',
    features: [
      {
        id: 'soft-1',
        title: 'Tailored Solutions',
        description: 'Software built specifically for your unique business needs.',
        icon: 'Maximize2',
        details: 'Designed ground-up around your exact business workflows without bloated third-party template compromises.'
      },
      {
        id: 'soft-2',
        title: 'Scalable Architecture',
        description: 'Built for growth, performance and long-term success.',
        icon: 'GitBranch',
        details: 'Modular microservice or clean monolith backend design designed around expected traffic, data access and operational constraints.'
      },
      {
        id: 'soft-3',
        title: 'Powerful Integrations',
        description: 'Connect with third-party APIs, tools and platforms.',
        icon: 'Share2',
        details: 'Seamless two-way synchronization with Stripe, Google Workspace, OpenAI, Twilio, Slack, HubSpot, and custom REST/GraphQL endpoints.'
      },
      {
        id: 'soft-4',
        title: 'Maintainable Code',
        description: 'Clean, modular and documented for future-proof development.',
        icon: 'Sliders',
        details: 'Comprehensive TypeScript typing, unit/integration test coverage, inline OpenAPI/Swagger docs, and well-structured Git commit history.'
      }
    ]
  },
  'ai-solutions': {
    id: 'ai-solutions',
    title: 'AI Engineering',
    tag: 'SERVICE',
    tagColor: 'purple',
    scriptTagline: 'Smart. Autonomous. Scalable.',
    description: 'We build AI assistants, retrieval-based search and model integrations for defined business tasks.',
    techStack: ['Gemini 2.5 API', 'LangChain', 'Python', 'Vector DB', 'RAG Engine'],
    startingPrice: '$1,800',
    timeline: '2 - 4 Weeks',
    features: [
      {
        id: 'ai-1',
        title: 'Smart Assistant Integration',
        description: 'In-app conversational AI assistants and copilots tailored to your data.',
        icon: 'Brain',
        details: 'Custom prompt engineering, context retention, and fine-tuned system instructions using Gemini models.'
      },
      {
        id: 'ai-2',
        title: 'RAG & Vector Search',
        description: 'Search internal documents with source-grounded answers and checks for uncertain results.',
        icon: 'Search',
        details: 'Chunking, embedding generation, and fast semantic search across your proprietary company knowledge base.'
      },
      {
        id: 'ai-3',
        title: 'Automated Content & Vision',
        description: 'Auto-generate summaries, analyze images, and transform raw text.',
        icon: 'Sparkles',
        details: 'Multimodal processing for invoice extraction, visual asset classification, and automated email reply generation.'
      },
      {
        id: 'ai-4',
        title: 'Guardrails & Safety',
        description: 'Reliable, deterministic fallback logic and token cost optimization.',
        icon: 'Lock',
        details: 'Rate limiting, prompt sanitization, cost budgets, and fallback strategy for enterprise reliability.'
      }
    ]
  },
  'automation': {
    id: 'automation',
    title: 'Automation & Integrations',
    tag: 'SERVICE',
    tagColor: 'amber',
    scriptTagline: 'Seamless. Efficient. Connected.',
    description: 'We connect existing tools with workflows that reduce repeated data entry and manual follow-up.',
    techStack: ['Zapier', 'Make.com', 'Webhooks', 'AWS Lambda', 'Node.js', 'Google APIs'],
    startingPrice: '$800',
    timeline: '1 - 2 Weeks',
    features: [
      {
        id: 'auto-1',
        title: 'API & Webhook Pipelines',
        description: 'Connect disparate web applications into monitored automated workflows.',
        icon: 'Zap',
        details: 'Instant event triggering between forms, CRM software, communication channels, and databases.'
      },
      {
        id: 'auto-2',
        title: 'Data Extraction & Sync',
        description: 'Bi-directional data synchronization between sheets, databases, and apps.',
        icon: 'RefreshCw',
        details: 'Automatic schema mapping, record deduplication, and error logging dashboards.'
      },
      {
        id: 'auto-3',
        title: 'Notification Systems',
        description: 'Real-time transactional alerts via WhatsApp, SMS, Email, and Slack.',
        icon: 'BellRing',
        details: 'Instant alerts triggered when customer leads submit forms or complete payment transactions.'
      },
      {
        id: 'auto-4',
        title: 'Custom Cron Scheduled Tasks',
        description: 'Background batch jobs for reporting, database cleanups, and backups.',
        icon: 'Clock',
        details: 'Scheduled cloud functions executing daily analytics summaries and report exports.'
      }
    ]
  }
};

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [];
