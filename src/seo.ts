import type { ContentPage } from './contentPages';
import type { Faq, ServiceAreaPage } from './serviceAreas';

export const SITE_URL = 'https://www.builtbygsv.in';

export const brandEntity = {
  studioName: 'BuiltbyGSV',
  founderName: 'Gurusabarivasan M',
  founderShortName: 'Gurusabarivasan',
  nickname: 'GuruGSV',
  spacedNickname: 'Guru GSV',
  email: 'gurugsv777@gmail.com',
  phone: '+91-74488-65095',
  location: 'Puducherry, India',
  linkedin: 'https://linkedin.com/in/gurugsv',
  github: 'https://github.com/gurugsv7',
};

export type LocationSlug = 'karaikal' | 'bengaluru' | 'thanjavur';

export interface LocationPage {
  slug: LocationSlug;
  path: string;
  city: string;
  alternateCity?: string;
  region: string;
  title: string;
  description: string;
  eyebrow: string;
  intro: string;
  localFocus: string[];
  industries: string[];
  proof: string;
}

export const locationPages: LocationPage[] = [
  {
    slug: 'karaikal',
    path: '/web-software-developer-karaikal',
    city: 'Karaikal',
    region: 'Puducherry',
    title: 'Web Developer in Karaikal | Websites & Software — BuiltbyGSV',
    description:
      'BuiltbyGSV creates fast websites, custom software and local SEO foundations for Karaikal businesses, led by developer Gurusabarivasan M.',
    eyebrow: 'Web development rooted in Karaikal',
    intro:
      'Modern digital products for Karaikal businesses that need more than a template. BuiltbyGSV, led by Gurusabarivasan M (GuruGSV), combines responsive web design, clean engineering and practical local SEO.',
    localFocus: [
      'Local-business websites designed to convert calls and enquiries',
      'Google-friendly service pages and technical local SEO foundations',
      'Booking, billing and workflow software tailored to daily operations',
    ],
    industries: ['Clinics & healthcare', 'Retail & services', 'Education', 'Local startups'],
    proof:
      'The Thaai Clinic project included a complete website refresh, appointment-focused UX, performance improvements and local-search optimisation for Karaikal.',
  },
  {
    slug: 'bengaluru',
    path: '/web-software-developer-bengaluru',
    city: 'Bengaluru',
    alternateCity: 'Bangalore',
    region: 'Karnataka',
    title: 'Website & Software Developer in Bengaluru | BuiltbyGSV',
    description:
      'BuiltbyGSV builds React websites, custom software and practical AI features for Bengaluru startups and growing teams.',
    eyebrow: 'Building in Bengaluru',
    intro:
      'Fast-moving Bengaluru teams need product work that is thoughtful, shippable and easy to maintain. BuiltbyGSV turns early ideas and operational pain points into polished web software for Bengaluru and Bangalore teams.',
    localFocus: [
      'MVP design and development for founders and small product teams',
      'React, TypeScript, Supabase and API-powered web applications',
      'Practical AI features, internal tools and workflow automation',
    ],
    industries: ['SaaS & startups', 'Consumer apps', 'Professional services', 'AI products'],
    proof:
      'The Budget Diet App is a BuiltbyGSV lab project designed around a distinctly Bengaluru problem: helping PG residents plan affordable, balanced meals.',
  },
  {
    slug: 'thanjavur',
    path: '/web-software-developer-thanjavur',
    city: 'Thanjavur',
    alternateCity: 'Tanjore',
    region: 'Tamil Nadu',
    title: 'Web & Software Developer in Thanjavur | BuiltbyGSV',
    description:
      'BuiltbyGSV creates websites and custom business software for Thanjavur and Tanjore businesses, including SEO-ready sites, dashboards and automation by GuruGSV.',
    eyebrow: 'Serving the Thanjavur region',
    intro:
      'BuiltbyGSV helps established businesses and new ventures in Thanjavur modernise how they present, sell and operate—with clear design and software built around real workflows.',
    localFocus: [
      'Professional websites for regional businesses and institutions',
      'Custom dashboards, customer portals and operations software',
      'Search-ready content structure for Thanjavur and Tanjore audiences',
    ],
    industries: ['Manufacturing', 'Education', 'Healthcare', 'Retail & hospitality'],
    proof:
      'The same product-led process used across BuiltbyGSV projects—understand, design, build, ship and improve—is available to clients across the Thanjavur region.',
  },
];

export const getLocationPage = (pathname: string) =>
  locationPages.find((page) => page.path === pathname.replace(/\/$/, '') || page.path === pathname);

export const homeMetadata = {
  title: 'BuiltbyGSV | GuruGSV - Web, Software & AI Developer',
  description:
    'BuiltbyGSV is Gurusabarivasan M\'s product studio for fast websites, custom software, practical AI features and business automation.',
};

export const createOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: brandEntity.studioName,
      alternateName: ['Built by GSV', 'GuruGSV', 'Guru GSV'],
      url: SITE_URL,
      founder: { '@id': `${SITE_URL}/#gurusabarivasan` },
      email: brandEntity.email,
      telephone: brandEntity.phone,
      sameAs: [brandEntity.linkedin, brandEntity.github],
      areaServed: [
        { '@type': 'City', name: 'Karaikal' },
        { '@type': 'City', name: 'Bengaluru' },
        { '@type': 'City', name: 'Bangalore' },
        { '@type': 'City', name: 'Thanjavur' },
        { '@type': 'City', name: 'Tanjore' },
        { '@type': 'AdministrativeArea', name: 'Puducherry' },
      ],
      knowsAbout: [
        'Web Development',
        'Website Development',
        'Custom Software Development',
        'AI Solutions',
        'AI/ML Engineering',
        'Business Automation',
        'Technical SEO',
        'React',
        'Node.js',
        'Python',
        'MERN Stack',
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        email: brandEntity.email,
        telephone: brandEntity.phone,
        contactType: 'sales',
        areaServed: 'IN',
        availableLanguage: ['English', 'Tamil'],
      },
    },
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/#gurusabarivasan`,
      name: brandEntity.founderName,
      alternateName: [brandEntity.nickname, brandEntity.spacedNickname, brandEntity.founderShortName],
      url: SITE_URL,
      worksFor: { '@id': `${SITE_URL}/#organization` },
      jobTitle: 'Full Stack Developer',
      email: brandEntity.email,
      telephone: brandEntity.phone,
      sameAs: [brandEntity.linkedin, brandEntity.github],
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Puducherry',
        addressCountry: 'IN',
      },
      knowsAbout: [
        'React',
        'TypeScript',
        'Node.js',
        'Python',
        'MERN Stack',
        'Web Development',
        'Full Stack Development',
        'Software Development',
        'Artificial Intelligence',
        'Machine Learning',
        'AI/ML',
        'Technical SEO',
      ],
      hasOccupation: {
        '@type': 'Occupation',
        name: 'Full Stack Developer',
        occupationLocation: [
          { '@type': 'City', name: 'Karaikal' },
          { '@type': 'City', name: 'Bengaluru' },
          { '@type': 'City', name: 'Thanjavur' },
        ],
        skills: 'React, TypeScript, Node.js, Python, AI/ML, Supabase, REST APIs, Docker, AWS',
      },
    },
    {
      '@type': 'ProfessionalService',
      '@id': `${SITE_URL}/#professional-service`,
      name: 'BuiltbyGSV Web and Software Development',
      url: SITE_URL,
      image: `${SITE_URL}/og-cover.png`,
      founder: { '@id': `${SITE_URL}/#gurusabarivasan` },
      email: brandEntity.email,
      telephone: brandEntity.phone,
      priceRange: 'Custom project pricing',
      areaServed: [
        { '@type': 'City', name: 'Karaikal' },
        { '@type': 'City', name: 'Bengaluru' },
        { '@type': 'City', name: 'Thanjavur' },
        { '@type': 'City', name: 'Tanjore' },
        { '@type': 'AdministrativeArea', name: 'Puducherry' },
      ],
      serviceType: [
        'Website Development',
        'Custom Software Development',
        'AI Solutions',
        'Business Automation',
        'Technical SEO',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: brandEntity.studioName,
      alternateName: ['GuruGSV', 'Guru GSV', 'Gurusabarivasan M'],
      publisher: { '@id': `${SITE_URL}/#organization` },
      inLanguage: 'en-IN',
    },
  ],
});

/**
 * Shared JSON-LD builders.
 *
 * Both the browser router and scripts/prerender.ts call these, so the markup a
 * crawler sees in the static HTML is identical to what the SPA maintains after
 * hydration. Keeping one source removes the drift REMEDIATION.md flagged.
 */

export const createFaqSchema = (canonicalUrl: string, faqs: Faq[]) => ({
  '@type': 'FAQPage',
  '@id': `${canonicalUrl}#faq`,
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer },
  })),
});

export const createBreadcrumbSchema = (
  canonicalUrl: string,
  trail: { path: string; label: string }[],
) => ({
  '@type': 'BreadcrumbList',
  '@id': `${canonicalUrl}#breadcrumb`,
  itemListElement: trail.map((crumb, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: crumb.label,
    item: `${SITE_URL}${crumb.path === '/' ? '/' : crumb.path}`,
  })),
});

/** Breadcrumb trail for a city spoke page: Home > City hub > Service. */
export const serviceAreaBreadcrumbTrail = (page: ServiceAreaPage) => [
  { path: '/', label: 'Home' },
  { path: `/web-software-developer-${page.citySlug}`, label: page.city },
  { path: page.path, label: page.serviceName },
];

/**
 * Service node for a city spoke.
 *
 * Note there is deliberately no PostalAddress or LocalBusiness node anywhere in
 * this file: BuiltbyGSV has no verifiable street address, and publishing one it
 * cannot verify would be a fabricated local signal. areaServed carries the
 * geographic relevance instead.
 */
export const createServiceAreaSchema = (page: ServiceAreaPage) => {
  const canonicalUrl = `${SITE_URL}${page.path}`;
  return [
    {
      '@type': 'Service',
      '@id': `${canonicalUrl}#service`,
      name: `${page.serviceName} in ${page.city}`,
      description: page.answer,
      serviceType: page.serviceType,
      provider: { '@id': `${SITE_URL}/#organization` },
      areaServed: [
        { '@type': 'City', name: page.city },
        ...(page.alternateCity ? [{ '@type': 'City', name: page.alternateCity }] : []),
        { '@type': 'AdministrativeArea', name: page.region },
      ],
      url: canonicalUrl,
      offers: page.priceBands.map((band) => ({
        '@type': 'Offer',
        name: band.name,
        description: band.fits,
        priceCurrency: 'INR',
        priceSpecification: {
          '@type': 'PriceSpecification',
          priceCurrency: 'INR',
          description: band.range,
        },
      })),
    },
    createFaqSchema(canonicalUrl, page.faqs),
    createBreadcrumbSchema(canonicalUrl, serviceAreaBreadcrumbTrail(page)),
  ];
};

export const createContentPageSchema = (page: ContentPage) => {
  const canonicalUrl = `${SITE_URL}${page.path}`;
  return [
    createFaqSchema(canonicalUrl, page.faqs),
    createBreadcrumbSchema(canonicalUrl, [
      { path: '/', label: 'Home' },
      { path: page.path, label: page.h1 },
    ]),
  ];
};
