export type ScreenType = 
  | 'hero' 
  | 'home'
  | 'services' 
  | 'process'
  | 'web-dev' 
  | 'software-dev' 
  | 'ai-solutions' 
  | 'automation' 
  | 'projects' 
  | 'project-detail' 
  | 'about'
  | 'contact'
  | 'start-project'
  | 'careers'
  | 'website-information'
  | 'not-found';

export type ServiceType = 'web-dev' | 'software-dev' | 'ai-solutions' | 'automation';

export interface ProjectDetailData {
  heroImage?: string;
  storyImage?: string;
  seoTitle?: string;
  seoDescription?: string;
  publicImageUrl?: string;
  liveUrl?: string;
  sourceCodeUrl?: string;
  answerBlock?: string | { question: string; answer: string };
  storyHeadline?: string;
  storyParagraphs?: string[];
  stickyNoteText?: string;
  stickyNoteHighlight?: string;
  heroDoodleText?: string;
  glimpseScreenshots?: {
    title: string;
    subtitle?: string;
    metrics?: string;
    badge?: string;
    image?: string;
  }[];
  builtWithTech?: {
    name: string;
    iconName: string;
  }[];
  timeline?: string;
  capabilities?: string;
  engagement?: string;
  platform?: string;
  impactMetrics?: {
    value: string;
    label: string;
    iconName: string;
  }[];
  whatsNextItems?: string[];
  quoteText?: string;
  quoteAuthor?: string;
  proofSignals?: { value: string; label: string; description: string; iconName: string }[];
  relatedLinks?: { label: string; href: string }[];
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'Web' | 'Software' | 'AI' | 'Automation';
  status: 'In Progress' | 'Completed' | 'On Hold';
  statusColor?: string;
  iconName: string;
  iconBgColor: string;
  iconTextColor: string;
  description: string;
  tags: string[];
  metrics?: { label: string; value: string }[];
  problemStatement?: string;
  solutionProvided?: string;
  client?: string;
  location?: string;
  year?: string;
  featured?: boolean;
  detailData?: ProjectDetailData;
}

export interface ServiceFeature {
  id: string;
  title: string;
  description: string;
  icon: string;
  details?: string;
}

export interface ServiceDetail {
  id: ServiceType;
  title: string;
  tag: string;
  tagColor: 'teal' | 'orange' | 'purple' | 'amber';
  scriptTagline: string;
  description: string;
  features: ServiceFeature[];
  techStack: string[];
  startingPrice: string;
  timeline: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'project' | 'status' | 'general';
}
