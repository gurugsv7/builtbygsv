import { Project, ServiceDetail, NotificationItem } from '../types';

export const PROJECTS: Project[] = [
  {
    id: 'budget-diet-app',
    title: 'Budget Diet App',
    subtitle: 'AI-powered meal planning app that helps PG residents eat better for less.',
    category: 'AI',
    status: 'In Progress',
    statusColor: 'text-[#854D0E] bg-amber-50 border-amber-200',
    iconName: 'Sprout',
    iconBgColor: 'bg-[#EBF7EF]',
    iconTextColor: 'text-[#15803D]',
    description: 'An AI-driven hyper-local meal planner designed specifically for students and PG residents in Bangalore trying to maintain balanced nutrition on a strict budget.',
    tags: ['React Native', 'Supabase', 'Python', 'Machine Learning'],
    metrics: [
      { label: 'Users Saved Avg.', value: '₹3,500/mo' },
      { label: 'Meal Plan Gen Time', value: '< 2.4s' },
      { label: 'Active PG Messes', value: '45+' },
    ],
    problemStatement: 'PG residents and college students in urban hubs like Bangalore struggle with poor diet variety and high food delivery expenses, while local PG messes lack customizable nutritional tracking.',
    solutionProvided: 'Created an intelligent recommendation engine that aggregates local mess menus and affordable grocers, generating personalized daily meal plans under ₹150/day.',
    client: 'BuiltbyGSV Lab Project',
    location: 'Bangalore, India',
    year: '2026',
    featured: true,
    detailData: {
      storyHeadline: 'Every rupee counts.',
      storyParagraphs: [
        'While living in a PG, I realized how tough it is to eat healthy on a budget. Most food delivery apps are either expensive or don\'t help you plan smart.',
        'So I built Budget Diet App to solve this — using real-time ingredient prices, AI meal suggestions, and simple budgeting.'
      ],
      stickyNoteText: 'The goal wasn\'t just to build an app. It was to build a better everyday life for students.',
      stickyNoteHighlight: 'better everyday life for students.',
      heroDoodleText: 'Good meals. Great prices.',
      glimpseScreenshots: [
        { title: "Today's Plan", subtitle: "Daily Budget", metrics: "₹120 /day", badge: "Under Budget" },
        { title: "Find Meals", subtitle: "Search & Filter", metrics: "Poha, Chana Salad", badge: "High Protein" },
        { title: "Price Trends", subtitle: "Local Ingredients", metrics: "Potato 1kg ₹22", badge: "+6%" },
        { title: "Your Progress", subtitle: "Monthly Savings", metrics: "₹1,850 saved", badge: "May Peak" },
      ],
      builtWithTech: [
        { name: 'React Native', iconName: 'React' },
        { name: 'Supabase', iconName: 'Database' },
        { name: 'Python', iconName: 'Code' },
        { name: 'FastAPI', iconName: 'Zap' },
        { name: 'PostgreSQL', iconName: 'Database' },
        { name: 'Vercel', iconName: 'Globe' },
      ],
      timeline: 'Jan 2024 – Apr 2024',
      role: 'Full Stack Developer',
      projectType: 'Personal Project',
      platform: 'Android, iOS, Web',
      impactMetrics: [
        { value: "500+", label: "Active Users", iconName: "Users" },
        { value: "45%", label: "Saved on Food Cost", iconName: "TrendingUp" },
        { value: "4.8/5", label: "User Rating", iconName: "Smile" },
        { value: "Healthier", label: "Meal Choices", iconName: "Heart" },
      ],
      whatsNextItems: [
        'Grocery price alerts',
        'Nutrition insights',
        'Shared budgets for PG groups',
        'AI coach for better habits',
      ],
      quoteText: 'This project is close to my heart. It\'s not just about code, it\'s about solving a real problem I lived.',
      quoteAuthor: 'GSV',
    }
  },
  {
    id: 'v2-productions',
    title: 'V² Productions',
    subtitle: 'A premium creative studio website showcasing video editing, web design, digital marketing and live 1-on-1 courses.',
    category: 'Web',
    status: 'Completed',
    statusColor: 'text-[#0284C7] bg-[#E0F2FE] border-sky-200',
    iconName: 'Video',
    iconBgColor: 'bg-[#E2F1ED]',
    iconTextColor: 'text-[#0F8B75]',
    description: 'A premium, cinematic creative studio website built for V² Productions with React 19, TypeScript, Vite, and Tailwind CSS. Showcases video editing, web design, digital marketing, live 1-on-1 courses, and dual mobile/desktop interactive UX.',
    tags: ['React 19', 'TypeScript', 'Vite', 'Tailwind', 'Motion'],
    metrics: [
      { label: 'Lighthouse Speed', value: '99/100' },
      { label: 'Vite Build', value: '< 2s' },
      { label: '1-on-1 Courses', value: 'Live' },
    ],
    problemStatement: 'Creative agencies require a cinematic visual style and a high-conversion web platform that seamlessly bridges portfolio storytelling, video editing course enrollments, and interactive lead-generation.',
    solutionProvided: 'Architected a responsive dual-experience platform using React 19, TypeScript, Vite, and Framer Motion. Implemented mobile/desktop UI switching, animated hero showcases, lead gen flows, and modular course catalog structures.',
    client: 'V² Productions Studio',
    location: 'Remote / Global',
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
        'I built the V² Productions platform using React 19, TypeScript, and Vite to deliver an immersive, lightning-fast brand experience with dual mobile and desktop layout engines.'
      ],
      stickyNoteText: 'Great design isn\'t just aesthetic. It is brand storytelling that converts visitors into long-term studio clients.',
      stickyNoteHighlight: 'brand storytelling that converts',
      heroDoodleText: 'Cinematic style. Real results.',
      glimpseScreenshots: [
        { title: "Hero Reel", subtitle: "Video Showcase", metrics: "4K 60fps", badge: "Featured" },
        { title: "1-on-1 Courses", subtitle: "Live Video Editing", metrics: "12 Modules", badge: "Enroll Now" },
        { title: "Design Studio", subtitle: "Web & Branding", metrics: "Interactive UI", badge: "New" },
        { title: "Client Portal", subtitle: "Inquiry & Booking", metrics: "Fast Gen", badge: "Live" },
      ],
      builtWithTech: [
        { name: 'React 19', iconName: 'React' },
        { name: 'TypeScript', iconName: 'Code' },
        { name: 'Vite', iconName: 'Zap' },
        { name: 'Tailwind CSS', iconName: 'Globe' },
        { name: 'Framer Motion', iconName: 'Zap' },
        { name: 'Node.js', iconName: 'Database' },
      ],
      timeline: 'Feb 2026 – Mar 2026',
      role: 'Frontend Engineer & UX Architect',
      projectType: 'Agency Brand Platform',
      platform: 'Web, Mobile, PWA',
      impactMetrics: [
        { value: "99/100", label: "Lighthouse Speed", iconName: "TrendingUp" },
        { value: "3.5x", label: "Course Inquiries", iconName: "Users" },
        { value: "4.9/5", label: "Client Satisfaction", iconName: "Smile" },
        { value: "< 2s", label: "Build & Load Time", iconName: "Zap" },
      ],
      whatsNextItems: [
        'Integrated video course streaming',
        'Real-time student chat & feedback',
        'Automated lead scheduling calendar',
        'Client video proofing dashboard',
      ],
      quoteText: 'V² Productions sets a new benchmark for creative studio websites - combining cinematic flair with high-performance engineering.',
      quoteAuthor: 'GSV',
      proofSignals: [
        {
          value: 'Creative Studio',
          label: 'Website Development',
          description: 'A service-led website structure for video editing, web design, digital marketing and course enquiries.',
          iconName: 'Globe',
        },
        {
          value: 'BuiltbyGSV',
          label: 'Project Owner',
          description: 'A public case study showing GuruGSV / Gurusabarivasan M as the developer behind the build.',
          iconName: 'User',
        },
        {
          value: 'React + Vite',
          label: 'Frontend Stack',
          description: 'A fast, component-driven implementation focused on performance, responsive UX and visual polish.',
          iconName: 'Code',
        },
        {
          value: 'Remote / Global',
          label: 'Service Reach',
          description: 'Proof that BuiltbyGSV can support creative businesses beyond one city while staying SEO-ready for local service pages.',
          iconName: 'TrendingUp',
        },
      ],
      relatedLinks: [
        { label: 'Website development services', href: '/services/web-development' },
        { label: 'Explore BuiltbyGSV projects', href: '/projects' },
        { label: 'About GuruGSV', href: '/about' },
      ],
    }
  },
  {
    id: 'thaai-clinic-website',
    title: 'Thaai Clinic',
    subtitle: 'A mobile-first patient companion app that makes appointment booking, records, health tips, and care feel simple, personal, and accessible.',
    category: 'Web',
    status: 'Completed',
    statusColor: 'text-[#E11D48] bg-rose-50 border-rose-200',
    iconName: 'Heart',
    iconBgColor: 'bg-[#FCE7F3]',
    iconTextColor: 'text-[#E11D48]',
    description: 'Thaai Clinic is a React + TypeScript healthcare app that simulates a full patient journey in a polished mobile interface. It includes onboarding, appointment booking, appointment tracking, medical record management, health education content, clinic details, and instant contact options through call and WhatsApp.',
    tags: ['React 19', 'TypeScript', 'Tailwind', 'Vite', 'localStorage'],
    metrics: [
      { label: 'Appointments Booked', value: 'Instant' },
      { label: 'Records Vault', value: '100% Local' },
      { label: 'Patient Rating', value: '4.9/5' },
    ],
    problemStatement: 'Patients at local clinics face long waiting lines, misplaced physical medical records, and fragmented healthcare guidance on mobile devices.',
    solutionProvided: 'Built a mobile-first companion app featuring interactive booking, a searchable health records vault, doctor-written health tips, and direct call/WhatsApp contact with localStorage persistence.',
    client: 'Thaai Clinic Karaikal',
    location: 'Karaikal, Puducherry',
    year: '2024',
    featured: true,
    detailData: {
      seoTitle: 'Thaai Clinic App Case Study | BuiltbyGSV',
      seoDescription: 'See how BuiltbyGSV designed a mobile-first React companion for Thaai Clinic with appointment booking, health records and direct clinic contact.',
      publicImageUrl: 'https://www.builtbygsv.in/og-cover.png',
      answerBlock: {
        question: 'What did BuiltbyGSV build for Thaai Clinic?',
        answer: 'BuiltbyGSV designed and developed Thaai Clinic as a mobile-first patient companion app in React and TypeScript. It features appointment booking, medical record vault, health tips, and direct call/WhatsApp contact with localStorage persistence.',
      },
      storyHeadline: 'Care. Connection. Comfort.',
      storyParagraphs: [
        'Thaai Clinic is a mobile-first patient companion app for a local clinic, built to make everyday healthcare simple, personal, and stress-free.',
        'It simulates a complete healthcare journey around appointment booking, appointment management, medical records, health education, clinic discovery, and direct contact via call or WhatsApp inside a framed mobile experience with local state and localStorage persistence.'
      ],
      stickyNoteText: 'We built Thaai Clinic to bring the clinic experience closer to patients — anytime, anywhere.',
      stickyNoteHighlight: 'anytime, anywhere.',
      heroDoodleText: 'Care that fits in your pocket.',
      glimpseScreenshots: [
        { title: "Home Dashboard", subtitle: "Patient Overview", metrics: "Next: 11:30 AM", badge: "Active" },
        { title: "Book Appointment", subtitle: "Date & Doctor Select", metrics: "24 May 2024", badge: "Live" },
        { title: "Appointments", subtitle: "Upcoming & Past", metrics: "Dr. Karthikeyan", badge: "Confirmed" },
        { title: "Health Records", subtitle: "Secure Digital Vault", metrics: "4 Reports", badge: "Encrypted" },
        { title: "Health Tips", subtitle: "Daily Nutrition & Care", metrics: "5 Habits", badge: "Daily" },
      ],
      builtWithTech: [
        { name: 'React 19', iconName: 'React' },
        { name: 'TypeScript', iconName: 'Code' },
        { name: 'Tailwind CSS', iconName: 'Globe' },
        { name: 'Vite', iconName: 'Zap' },
        { name: 'lucide-react', iconName: 'Laptop' },
        { name: 'localStorage', iconName: 'Database' },
      ],
      timeline: 'Apr 2024 – May 2024',
      role: 'Frontend Developer',
      projectType: 'Personal Project',
      platform: 'Web (Mobile-First)',
      impactMetrics: [
        { value: "Appointments", label: "Booked Easily", iconName: "Calendar" },
        { value: "Records", label: "Stored Securely", iconName: "Database" },
        { value: "Health Tips", label: "Delivered Daily", iconName: "Brain" },
        { value: "Instant", label: "Doctor Connect", iconName: "Zap" },
        { value: "Better", label: "Patient Experience", iconName: "Heart" },
      ],
      whatsNextItems: [
        'Backend integration & auth',
        'Push notifications',
        'In-app payments',
        'Family member profiles',
        'AI health assistant',
      ],
      quoteText: 'Thaai Clinic was a meaningful build that blends care, convenience, and technology to create a better healthcare experience for everyone.',
      quoteAuthor: 'GSV',
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
        { label: 'Explore BuiltbyGSV projects', href: '/projects' },
        { label: 'Website development services', href: '/services/web-development' },
        { label: 'About GuruGSV', href: '/about' },
      ],
    }
  }
];

export const SERVICES: Record<string, ServiceDetail> = {
  'web-dev': {
    id: 'web-dev',
    title: 'Web Development',
    tag: 'SERVICE',
    tagColor: 'teal',
    scriptTagline: 'Fast. Modern. Responsive.',
    description: 'Modern websites that look great and perform even better.',
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
        details: 'Achieve sub-second Core Web Vitals with compressed WebP imagery, lazy loading, code splitting, and edge-cached static distribution.'
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
    title: 'Custom Software Development',
    tag: 'SERVICE',
    tagColor: 'orange',
    scriptTagline: 'Built around your logic.',
    description: 'Custom software solutions built to solve real-world problems.',
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
        details: 'Modular microservice or clean monolith backend design prepared to handle 10x traffic spikes and high concurrent user database transactions.'
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
    title: 'AI Solutions & Agents',
    tag: 'SERVICE',
    tagColor: 'purple',
    scriptTagline: 'Smart. Autonomous. Scalable.',
    description: 'Empower your app with intelligent Gemini AI, vector search, and LLM automation.',
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
        description: 'Query your internal PDFs, databases, and docs with zero hallucination.',
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
    description: 'Eliminate repetitive manual tasks with zero-latency automated pipelines.',
    techStack: ['Zapier', 'Make.com', 'Webhooks', 'AWS Lambda', 'Node.js', 'Google APIs'],
    startingPrice: '$800',
    timeline: '1 - 2 Weeks',
    features: [
      {
        id: 'auto-1',
        title: 'API & Webhook Pipelines',
        description: 'Connect disparate web applications into zero-touch automated workflows.',
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

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Budget Diet App Status',
    message: 'Sprint 2 milestone completed! AI Meal Recommendation Engine is now live in beta testing.',
    time: '10m ago',
    read: false,
    type: 'project',
  },
  {
    id: 'notif-2',
    title: 'Available for Q3/Q4 Projects',
    message: 'Accepting new custom Web & Software Development inquiries for next month!',
    time: '2h ago',
    read: false,
    type: 'general',
  },
  {
    id: 'notif-3',
    title: 'New Service Launched',
    message: 'Explore our new AI Solutions & Gemini Agent integration service tier.',
    time: '1d ago',
    read: true,
    type: 'status',
  }
];

export const SKILLS_LIST = [
  { category: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vite', 'Framer Motion', 'PWA'] },
  { category: 'Backend & APIs', items: ['Node.js', 'Express', 'Python', 'REST APIs', 'GraphQL', 'PostgreSQL', 'Firebase'] },
  { category: 'AI & Automation', items: ['Gemini API', 'LLM Agents', 'Vector Search', 'Webhooks', 'Zapier', 'Docker'] },
];

export const DEV_BIO = {
  name: 'BuiltbyGSV',
  role: 'Full-Stack Web & Software Developer',
  location: 'Bangalore & Remote Worldwide',
  bio: 'I turn complex business ideas into crisp, high-performing digital products. Specializing in modern web applications, scalable software architectures, and pragmatic AI solutions.',
  stats: [
    { label: 'Projects Built', value: '28+' },
    { label: 'Client Rating', value: '5.0 ★' },
    { label: 'Avg Speed', value: '2x Fast' },
    { label: 'Uptime SLA', value: '99.9%' }
  ]
};
