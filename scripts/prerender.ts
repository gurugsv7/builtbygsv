import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { blogPosts } from '../src/blog.ts';
import { contentPages } from '../src/contentPages.ts';
import { PROJECTS, SERVICES } from '../src/data/mockData.ts';
import { appRouteMetadata, notFoundMetadata } from '../src/routes.ts';
import {
  createContentPageSchema,
  createOrganizationSchema,
  createServiceAreaSchema,
  locationPages,
  SITE_URL,
} from '../src/seo.ts';
import { serviceAreaPages, serviceAreaPagesForCity } from '../src/serviceAreas.ts';

const distDir = resolve('dist');
const template = await readFile(resolve(distDir, 'index.html'), 'utf8');

type ContentSection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
};

type RenderPage = {
  path: string;
  title: string;
  description: string;
  eyebrow: string;
  heading: string;
  intro: string;
  sections: ContentSection[];
  schemaNodes?: Record<string, unknown>[];
};

const escapeHtml = (value: unknown) =>
  String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

const primaryLinks = [
  ['/', 'Home'],
  ['/projects', 'Projects'],
  ['/services', 'Services'],
  ['/process', 'Process'],
  ['/about', 'About'],
  ['/insights', 'Insights'],
  ['/contact', 'Contact'],
] as const;

const servicePaths: Record<string, string> = {
  'web-dev': '/services/web-development',
  'software-dev': '/services/custom-software-development',
  'ai-solutions': '/services/ai-solutions',
  automation: '/services/automation',
};

const staticPageContent: Record<string, Omit<RenderPage, 'path' | 'title' | 'description'>> = {
  '/': {
    eyebrow: 'Independent product studio',
    heading: 'Websites, software and practical AI built by Gurusabarivasan M.',
    intro:
      'BuiltbyGSV helps businesses and founders turn a specific customer problem or internal bottleneck into a product people can use. The work covers responsive websites, custom software, AI-assisted features and reliable automation.',
    sections: [
      {
        heading: 'What BuiltbyGSV builds',
        paragraphs: [
          'Website projects combine clear information architecture, responsive design, accessible interaction and search-ready technical foundations. Software projects start with the team workflow, then shape dashboards, portals and integrations around the people who will use them.',
          'AI work focuses on useful tasks such as search, extraction, assistance and content operations. Each feature needs a defined source of truth, cost boundary and human fallback before it reaches production.',
        ],
      },
      {
        heading: 'A small studio with direct accountability',
        paragraphs: [
          'Clients work with Gurusabarivasan from discovery through launch. That keeps product decisions close to implementation and gives every project one technical owner who understands the original goal.',
        ],
        bullets: ['Based in Puducherry, working across Karaikal, Bengaluru and Thanjavur', 'React, TypeScript, Node.js, Python and modern cloud tooling', 'Project scope, ownership and launch criteria agreed before the build'],
      },
      {
        heading: 'Where BuiltbyGSV works',
        paragraphs: [
          'Each city page covers the broad service, and the pages beneath it go into one service in depth rather than repeating the same copy with a different heading.',
        ],
        bullets: [
          ...locationPages.map((page) => `${page.city}: ${SITE_URL}${page.path}`),
          ...serviceAreaPages.map((page) => `${page.serviceName} in ${page.city}: ${SITE_URL}${page.path}`),
        ],
      },
      {
        heading: 'Reference',
        paragraphs: ['Pricing, common questions and how to choose between a freelancer, an agency and a studio.'],
        bullets: contentPages.map((page) => `${page.h1} ${SITE_URL}${page.path}`),
      },
      {
        heading: 'Start with the problem',
        paragraphs: [
          'A useful first message explains who needs help, what they do today and what must improve. BuiltbyGSV can then recommend a focused first release instead of filling the scope with features that do not support the outcome.',
        ],
      },
    ],
  },
  '/projects': {
    eyebrow: 'Selected work',
    heading: 'Web, software and AI projects shaped around real constraints.',
    intro:
      'Each case study explains the user problem, the product response and the technical choices behind the build. Browse the full project pages for scope, stack and next steps.',
    sections: [
      {
        heading: 'Case studies',
        paragraphs: PROJECTS.map(
          (project) => `${project.title}: ${project.description} ${project.solutionProvided ?? ''}`,
        ),
        bullets: PROJECTS.map((project) => `${project.category} case study: ${SITE_URL}/projects/${project.id}`),
      },
      {
        heading: 'How to read the work',
        paragraphs: [
          'Projects include finished client work, active builds and BuiltbyGSV lab products. The status on each card distinguishes shipped work from concepts still being developed, while the case study records the current scope without presenting future features as complete.',
        ],
      },
    ],
  },
  '/services': {
    eyebrow: 'Services',
    heading: 'Product work that connects design decisions to maintainable code.',
    intro:
      'Choose a focused website, a custom operating tool, an AI-assisted feature or an automation project. Every engagement starts with the business problem and the people who need the result.',
    sections: [
      {
        heading: 'Website development',
        paragraphs: ['Responsive business websites and web applications with accessible components, clear content structure, performance checks and technical SEO included in the build.'],
      },
      {
        heading: 'Custom software',
        paragraphs: ['Dashboards, portals and API-powered systems designed around the workflow your team already understands, with room to improve the parts that create delays or duplicate work.'],
      },
      {
        heading: 'AI and automation',
        paragraphs: ['Practical assistants, retrieval-based search, document extraction and tool integrations with usage boundaries, validation and a clear route for human review.'],
      },
    ],
  },
  '/process': {
    eyebrow: 'Product process',
    heading: 'A clear route from the first question to a supportable release.',
    intro:
      'The process keeps scope, design and engineering decisions visible. Each stage ends with something concrete to review before more time is committed.',
    sections: [
      { heading: 'Discover', paragraphs: ['Define the audience, current workflow, business goal and evidence that would make the project worth continuing. Existing products, analytics and customer questions are more useful here than a long feature wishlist.'] },
      { heading: 'Plan and design', paragraphs: ['Turn the discovery notes into user flows, a release boundary and interface direction. High-risk interactions are tested before the team builds the full product.'] },
      { heading: 'Build and verify', paragraphs: ['Implement in reviewable slices, test important routes and keep performance, accessibility and search behavior in the release checklist.'] },
      { heading: 'Launch and improve', paragraphs: ['Deploy with ownership, monitoring and handover documented. Later work follows observed use and support needs instead of assumptions made before launch.'] },
    ],
  },
  '/about': {
    eyebrow: 'About BuiltbyGSV',
    heading: 'Gurusabarivasan M builds products across design, software and AI.',
    intro:
      'BuiltbyGSV is the independent development studio of Gurusabarivasan M, also known online as GuruGSV and Guru GSV. He works directly across product definition, interface design and implementation.',
    sections: [
      {
        heading: 'Working style',
        paragraphs: [
          'Gurusabarivasan starts with the user and the operating constraint, then chooses technology that fits the release. Clients have one person connecting business context to the code rather than passing decisions between separate sales and delivery teams.',
          'The studio works with React, TypeScript, Node.js, Python, PostgreSQL, Supabase, Docker and AWS. The exact stack follows the product, team and maintenance plan.',
        ],
      },
      {
        heading: 'Where the work happens',
        paragraphs: ['BuiltbyGSV is based in Puducherry and works with businesses in Karaikal, Bengaluru, Thanjavur and remote teams elsewhere in India. English and Tamil are available for project communication.'],
      },
    ],
  },
  '/contact': {
    eyebrow: 'Contact BuiltbyGSV',
    heading: 'Bring the problem. We will shape a sensible first build.',
    intro:
      'Contact Gurusabarivasan about a website, custom software product, AI feature or business automation. A short description is enough to begin.',
    sections: [
      {
        heading: 'What to include',
        paragraphs: ['Describe the problem, who experiences it, what you use today and any fixed launch date. Screenshots or examples help when an existing workflow is involved.'],
        bullets: ['Email: gurugsv777@gmail.com', 'Phone and WhatsApp: +91-74488-65095', 'Location: Puducherry, India'],
      },
      {
        heading: 'What happens next',
        paragraphs: ['Gurusabarivasan will review the context and ask for the missing details needed to define scope. The guided project brief on this site creates an email draft on your device and does not store the information you enter.'],
      },
    ],
  },
};

const renderHeader = () => `
  <header style="border-bottom:1px solid #d9dfdd;padding-bottom:20px;margin-bottom:48px">
    <a href="/" style="font-weight:900;color:#131921;text-decoration:none">Builtby<span style="color:#0F8B75">GSV</span></a>
    <nav aria-label="Primary navigation" style="display:flex;flex-wrap:wrap;gap:14px;margin-top:18px">
      ${primaryLinks.map(([href, label]) => `<a href="${href}" style="color:#0F8B75">${label}</a>`).join('')}
    </nav>
  </header>`;

const renderSections = (sections: ContentSection[]) =>
  sections
    .map(
      (section) => `
        <section style="margin-top:42px">
          <h2 style="font-size:26px;line-height:1.2;margin:0 0 14px">${escapeHtml(section.heading)}</h2>
          ${(section.paragraphs ?? []).map((paragraph) => `<p style="line-height:1.75;color:#475569">${escapeHtml(paragraph)}</p>`).join('')}
          ${section.bullets?.length ? `<ul style="line-height:1.75;color:#334155">${section.bullets.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>` : ''}
        </section>`,
    )
    .join('');

const renderSnapshot = (page: RenderPage) => `
  <!-- SEO_SNAPSHOT_START -->
  <main style="max-width:980px;margin:0 auto;padding:40px 24px 64px;font-family:Arial,sans-serif;color:#131921">
    ${renderHeader()}
    <article>
      <p style="color:#0F8B75;font-weight:800;letter-spacing:.12em;text-transform:uppercase">${escapeHtml(page.eyebrow)}</p>
      <h1 style="font-size:clamp(38px,7vw,68px);line-height:1.04;margin:18px 0;max-width:850px">${escapeHtml(page.heading)}</h1>
      <p style="font-size:19px;line-height:1.75;color:#475569;max-width:780px">${escapeHtml(page.intro)}</p>
      ${renderSections(page.sections)}
    </article>
    <footer style="border-top:1px solid #d9dfdd;margin-top:52px;padding-top:24px">
      <p style="font-weight:700">Have a project to discuss? <a href="/contact" style="color:#0F8B75">Contact BuiltbyGSV</a>.</p>
    </footer>
  </main>
  <!-- SEO_SNAPSHOT_END -->`;

const breadcrumbNode = (page: RenderPage) => {
  if (page.path === '/') return null;
  const segments = page.path.split('/').filter(Boolean);
  return {
    '@type': 'BreadcrumbList',
    '@id': `${SITE_URL}${page.path}#breadcrumb`,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      ...segments.map((segment, index) => ({
        '@type': 'ListItem',
        position: index + 2,
        name: index === segments.length - 1 ? page.heading : segment.replaceAll('-', ' '),
        item: `${SITE_URL}/${segments.slice(0, index + 1).join('/')}`,
      })),
    ],
  };
};

const renderDocument = (page: RenderPage, options: { noindex?: boolean } = {}) => {
  const canonical = `${SITE_URL}${page.path === '/' ? '/' : page.path}`;
  const schema = createOrganizationSchema();
  if (!options.noindex) {
    schema['@graph'].push({
      '@type': page.path === '/contact' ? 'ContactPage' : 'WebPage',
      '@id': `${canonical}#webpage`,
      name: page.heading,
      description: page.description,
      url: canonical,
      isPartOf: { '@id': `${SITE_URL}/#website` },
      inLanguage: 'en-IN',
    } as never);
    const breadcrumb = breadcrumbNode(page);
    if (breadcrumb) schema['@graph'].push(breadcrumb as never);
    for (const node of page.schemaNodes ?? []) schema['@graph'].push(node as never);

    // Pages that supply their own breadcrumb (service areas, reference pages) would
    // otherwise collide with the generic one above on the same @id, which makes the
    // graph invalid. Last node wins, so the page-specific version is kept.
    const byId = new Map<string, unknown>();
    const anonymous: unknown[] = [];
    for (const node of schema['@graph'] as { '@id'?: string }[]) {
      if (node['@id']) byId.set(node['@id'], node);
      else anonymous.push(node);
    }
    schema['@graph'] = [...byId.values(), ...anonymous] as typeof schema['@graph'];
  }

  return template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(page.title)}</title>`)
    .replace(/<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${escapeHtml(page.description)}" />`)
    .replace(/<meta name="robots" content="[^"]*" \/>/, `<meta name="robots" content="${options.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'}" />`)
    .replace(/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${canonical}" />`)
    .replace(/<link rel="alternate" hreflang="en-IN" href="[^"]*" \/>/, `<link rel="alternate" hreflang="en-IN" href="${canonical}" />`)
    .replace(/<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${escapeHtml(page.title)}" />`)
    .replace(/<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${escapeHtml(page.description)}" />`)
    .replace(/<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${canonical}" />`)
    .replace(/<meta name="twitter:title" content="[^"]*" \/>/, `<meta name="twitter:title" content="${escapeHtml(page.title)}" />`)
    .replace(/<meta name="twitter:description" content="[^"]*" \/>/, `<meta name="twitter:description" content="${escapeHtml(page.description)}" />`)
    .replace(/<script id="structured-data" type="application\/ld\+json">[\s\S]*?<\/script>/, `<script id="structured-data" type="application/ld+json">${JSON.stringify(schema).replaceAll('<', '\\u003c')}</script>`)
    .replace(/<!-- SEO_SNAPSHOT_START -->[\s\S]*?<!-- SEO_SNAPSHOT_END -->/, renderSnapshot(page).trim());
};

const writeRoute = async (page: RenderPage) => {
  const outputDir = page.path === '/' ? distDir : resolve(distDir, page.path.slice(1));
  await mkdir(outputDir, { recursive: true });
  await writeFile(resolve(outputDir, 'index.html'), renderDocument(page));
};

for (const service of Object.values(SERVICES)) {
  const path = servicePaths[service.id];
  staticPageContent[path] = {
    eyebrow: 'BuiltbyGSV service',
    heading: service.title,
    intro: service.description,
    sections: [],
  };
}

const appPages: RenderPage[] = Object.entries(appRouteMetadata).map(([path, metadata]) => {
  const content = staticPageContent[path];
  if (!content) throw new Error(`Missing prerender content for ${path}`);
  return { path, ...metadata, ...content };
});

for (const service of Object.values(SERVICES)) {
  const path = servicePaths[service.id];
  const page = appPages.find((candidate) => candidate.path === path);
  if (!page) continue;
  page.sections = [
    {
      heading: `What ${service.title.toLowerCase()} includes`,
      paragraphs: [service.description, 'The release is scoped around a real user journey, with accessibility, performance, security and maintainability reviewed before launch.'],
      bullets: service.features.map((feature) => `${feature.title}: ${feature.details ?? feature.description}`),
    },
    {
      heading: 'Technology and delivery',
      paragraphs: [`The working stack may include ${service.techStack.join(', ')}. The final choice follows the product constraints and the team that will maintain it.`],
      bullets: [`Typical starting point: ${service.startingPrice}`, `Typical timeline: ${service.timeline}`],
    },
    {
      heading: 'A focused first release',
      paragraphs: ['Before development starts, BuiltbyGSV identifies the core outcome, the smallest useful release and the checks that prove it is ready. Optional features stay separate so the launch does not depend on untested assumptions.'],
    },
  ];
  page.schemaNodes = [{
    '@type': 'Service',
    '@id': `${SITE_URL}${path}#service`,
    name: service.title,
    description: service.description,
    provider: { '@id': `${SITE_URL}/#organization` },
    areaServed: 'IN',
    url: `${SITE_URL}${path}`,
  }];
}

const projectPages: RenderPage[] = PROJECTS.map((project) => {
  const path = `/projects/${project.id}`;
  const title = project.detailData?.seoTitle ?? `${project.title} Case Study | BuiltbyGSV`;
  const description = project.detailData?.seoDescription ?? project.description;
  const answer = project.detailData?.answerBlock;
  return {
    path,
    title,
    description,
    eyebrow: `${project.category} case study · ${project.status}`,
    heading: project.title,
    intro: project.description,
    sections: [
      { heading: 'The problem', paragraphs: [project.problemStatement ?? project.description] },
      { heading: 'The product response', paragraphs: [project.solutionProvided ?? project.subtitle, ...(project.detailData?.storyParagraphs ?? [])] },
      {
        heading: 'Scope and technology',
        paragraphs: [typeof answer === 'string' ? answer : answer?.answer ?? `${project.title} was built around a defined user problem and a maintainable release path.`],
        bullets: [`Status: ${project.status}`, `Project type: ${project.detailData?.projectType ?? project.category}`, `Technology: ${project.tags.join(', ')}`, `Year: ${project.year ?? 'Current'}`],
      },
      { heading: 'Next steps', paragraphs: [(project.detailData?.whatsNextItems ?? ['Measure real use, resolve launch feedback and prioritize the next release from evidence.']).join(' ')] },
    ],
    schemaNodes: [{
      '@type': 'CreativeWork',
      '@id': `${SITE_URL}${path}#creative-work`,
      name: project.title,
      headline: title,
      description,
      url: `${SITE_URL}${path}`,
      image: project.detailData?.publicImageUrl ?? `${SITE_URL}/og-cover.png`,
      creator: { '@id': `${SITE_URL}/#gurusabarivasan` },
      dateCreated: project.year,
      keywords: [...project.tags, project.category, 'BuiltbyGSV'],
      inLanguage: 'en-IN',
    }],
  };
});

const locationRenderPages: RenderPage[] = locationPages.map((page) => ({
  path: page.path,
  title: page.title,
  description: page.description,
  eyebrow: `${page.region} · ${page.eyebrow}`,
  heading: `Website and software development in ${page.city}.`,
  intro: page.intro,
  sections: [
    { heading: `Work for ${page.city} businesses`, paragraphs: ['BuiltbyGSV works directly with local businesses and product teams that need a clearer website, a custom operating tool or a practical way to automate repetitive work.'], bullets: page.localFocus },
    { heading: 'Relevant sectors', paragraphs: [`The service fits ${page.industries.join(', ')}. Scope follows the customer journey and the operational work behind it rather than a fixed industry template.`] },
    { heading: 'Local proof', paragraphs: [page.proof] },
    {
      heading: `Specific services in ${page.city}`,
      paragraphs: [`Each of these pages covers one service in depth rather than repeating this page with a different heading.`],
      bullets: serviceAreaPagesForCity(page.slug).map(
        (spoke) => `${spoke.serviceName} in ${spoke.city}: ${SITE_URL}${spoke.path}`,
      ),
    },
    { heading: 'Planning a project', paragraphs: [`Start with the customer action or team workflow that needs to improve. BuiltbyGSV can then recommend the right mix of website content, software, local search work and integrations for a ${page.city} project.`] },
  ],
  schemaNodes: [{
    '@type': 'Service',
    '@id': `${SITE_URL}${page.path}#service`,
    name: `Website and Software Development in ${page.city}`,
    serviceType: ['Web Development', 'Custom Software Development'],
    provider: { '@id': `${SITE_URL}/#organization` },
    areaServed: { '@type': 'City', name: page.city },
    url: `${SITE_URL}${page.path}`,
  }],
}));

const blogIndex: RenderPage = {
  path: '/insights',
  title: 'Karaikal Website & Local SEO Guides | BuiltbyGSV',
  description: 'Practical guides about website planning, local SEO and launch decisions for Karaikal businesses, written by Gurusabarivasan M.',
  eyebrow: 'BuiltbyGSV field notes',
  heading: 'Practical notes for a stronger business website.',
  intro: 'These guides answer the questions local business owners ask before they hire a developer, publish a new site or invest in search visibility.',
  sections: [
    {
      heading: 'Website planning and local search',
      paragraphs: blogPosts.map((post) => `${post.title}: ${post.excerpt} The main takeaway is ${post.takeaway}`),
      bullets: blogPosts.map((post) => `${post.title}: ${SITE_URL}${post.path}`),
    },
    {
      heading: 'Written for decisions, not traffic alone',
      paragraphs: ['Each article gives a business owner a concrete way to assess scope, ownership, local information and launch readiness. The advice comes from the same checks used in BuiltbyGSV website work.'],
    },
  ],
};

const blogRenderPages: RenderPage[] = blogPosts.map((post) => ({
  path: post.path,
  title: post.seoTitle,
  description: post.description,
  eyebrow: `${post.category} · ${post.readTime}`,
  heading: post.title,
  intro: post.excerpt,
  sections: [
    { heading: 'The short answer', paragraphs: [post.takeaway] },
    ...post.sections.map((section) => ({ heading: section.heading, paragraphs: section.paragraphs, bullets: section.bullets })),
  ],
  schemaNodes: [{
    '@type': 'BlogPosting',
    '@id': `${SITE_URL}${post.path}#article`,
    headline: post.title,
    description: post.description,
    datePublished: post.published,
    dateModified: post.updated,
    mainEntityOfPage: `${SITE_URL}${post.path}`,
    author: { '@id': `${SITE_URL}/#gurusabarivasan` },
    publisher: { '@id': `${SITE_URL}/#organization` },
    inLanguage: 'en-IN',
  }],
}));

/** City spoke pages: one distinct service intent each. */
const serviceAreaRenderPages: RenderPage[] = serviceAreaPages.map((page) => ({
  path: page.path,
  title: page.title,
  description: page.description,
  eyebrow: `${page.region} · ${page.eyebrow}`,
  heading: page.h1,
  intro: page.answer,
  sections: [
    {
      heading: `${page.serviceName} work in ${page.city}, itemised`,
      paragraphs: [page.intro],
      bullets: page.deliverables.map((item) => `${item.title}: ${item.detail}`),
    },
    {
      heading: `Why ${page.city} changes the build`,
      paragraphs: [
        `Context that applies to ${page.city}${page.alternateCity ? ` and ${page.alternateCity}` : ''} specifically, rather than generic service copy.`,
      ],
      bullets: page.localContext,
    },
    {
      heading: 'Indicative investment',
      paragraphs: ['Ranges rather than one number, because scope is what moves the price. The scoping conversation is free.'],
      bullets: page.priceBands.map((band) => `${band.name}: ${band.range}. ${band.fits}`),
    },
    { heading: 'Relevant experience', paragraphs: [page.proof] },
    {
      heading: 'Common questions',
      paragraphs: page.faqs.map((faq) => `${faq.question} ${faq.answer}`),
    },
    {
      heading: 'Related pages',
      paragraphs: ['Other services and guides relevant to this project.'],
      bullets: page.related.map((link) => `${link.label}: ${SITE_URL}${link.path}`),
    },
  ],
  schemaNodes: createServiceAreaSchema(page) as Record<string, unknown>[],
}));

/** Pricing, FAQ and comparison pages. */
const contentRenderPages: RenderPage[] = contentPages.map((page) => ({
  path: page.path,
  title: page.title,
  description: page.description,
  eyebrow: page.eyebrow,
  heading: page.h1,
  intro: page.answer,
  sections: [
    { heading: 'Overview', paragraphs: [page.intro] },
    ...page.sections.map((section) => ({
      heading: section.heading,
      paragraphs: section.paragraphs,
      bullets: section.bullets,
    })),
    {
      heading: 'Common questions',
      paragraphs: page.faqs.map((faq) => `${faq.question} ${faq.answer}`),
    },
    {
      heading: 'Related pages',
      paragraphs: ['Where to go next.'],
      bullets: page.related.map((link) => `${link.label}: ${SITE_URL}${link.path}`),
    },
  ],
  schemaNodes: createContentPageSchema(page) as Record<string, unknown>[],
}));

const allRenderPages = [
  ...appPages,
  ...projectPages,
  ...locationRenderPages,
  ...serviceAreaRenderPages,
  ...contentRenderPages,
  blogIndex,
  ...blogRenderPages,
];

for (const page of allRenderPages) {
  await writeRoute(page);
}

const notFoundPage: RenderPage = {
  path: '/404',
  ...notFoundMetadata,
  eyebrow: 'Error 404 · route missing',
  heading: 'This route never made it into production.',
  intro: 'The address may be old, mistyped or moved. Use the links below to return to working pages on BuiltbyGSV.',
  sections: [{
    heading: 'Try a working route',
    bullets: ['Browse web, software and AI projects', 'Review BuiltbyGSV services', 'Read practical website guides', 'Contact Gurusabarivasan about a project'],
  }],
};
await writeFile(resolve(distDir, '404.html'), renderDocument(notFoundPage, { noindex: true }));

/**
 * Sitemap and llms.txt are generated from the same page list that was just
 * rendered, so a new page cannot be published without appearing in both. The
 * previous hand-maintained sitemap could silently drift out of date.
 */
const CHANGE_FREQUENCY: { match: (path: string) => boolean; freq: string; priority: string }[] = [
  { match: (path) => path === '/', freq: 'weekly', priority: '1.0' },
  { match: (path) => path === '/insights', freq: 'weekly', priority: '0.8' },
  { match: (path) => path.startsWith('/insights/'), freq: 'monthly', priority: '0.7' },
  { match: (path) => path.startsWith('/projects/'), freq: 'monthly', priority: '0.7' },
  { match: (path) => path.startsWith('/compare/'), freq: 'yearly', priority: '0.6' },
  { match: () => true, freq: 'monthly', priority: '0.8' },
];

const today = new Date().toISOString().slice(0, 10);

const sitemapXml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...allRenderPages.map((page) => {
    const rule = CHANGE_FREQUENCY.find((entry) => entry.match(page.path))!;
    const lastmod = blogPosts.find((post) => post.path === page.path)?.updated ?? today;
    return [
      '  <url>',
      `    <loc>${SITE_URL}${page.path === '/' ? '/' : page.path}</loc>`,
      `    <lastmod>${lastmod}</lastmod>`,
      `    <changefreq>${rule.freq}</changefreq>`,
      `    <priority>${rule.priority}</priority>`,
      '  </url>',
    ].join('\n');
  }),
  '</urlset>',
  '',
].join('\n');

// dist is what ships; public keeps the repo copy in sync for the route tests.
await writeFile(resolve(distDir, 'sitemap.xml'), sitemapXml);
await writeFile(resolve('public', 'sitemap.xml'), sitemapXml);

/**
 * llms.txt gives answer engines a clean map of the site. ChatGPT, Perplexity and
 * Claude read it; Google states it needs no such file and ignores it harmlessly.
 */
const llmsTxt = [
  '# BuiltbyGSV',
  '',
  '> BuiltbyGSV is the independent web, software and AI development studio of Gurusabarivasan M (GuruGSV).',
  '> It builds websites, custom business software, AI features and workflow automation for clients in',
  '> Karaikal, Thanjavur and Bengaluru, and remotely across India. It is a remote studio with no walk-in',
  '> office and no Google Business Profile listing.',
  '',
  `Contact: gurugsv777@gmail.com | +91-74488-65095 | ${SITE_URL}/contact`,
  '',
  '## Services',
  ...Object.values(SERVICES).map(
    (service) => `- [${service.title}](${SITE_URL}${servicePaths[service.id]}): ${service.description}`,
  ),
  '',
  '## Locations',
  ...locationPages.map((page) => `- [${page.title}](${SITE_URL}${page.path}): ${page.description}`),
  '',
  '## Service areas',
  ...serviceAreaPages.map((page) => `- [${page.title}](${SITE_URL}${page.path}): ${page.answer}`),
  '',
  '## Reference',
  ...contentPages.map((page) => `- [${page.title}](${SITE_URL}${page.path}): ${page.answer}`),
  '',
  '## Case studies',
  ...PROJECTS.map(
    (project) => `- [${project.title}](${SITE_URL}/projects/${project.id}): ${project.description}`,
  ),
  '',
  '## Guides',
  ...blogPosts.map((post) => `- [${post.title}](${SITE_URL}${post.path}): ${post.description}`),
  '',
].join('\n');

await writeFile(resolve(distDir, 'llms.txt'), llmsTxt);
await writeFile(resolve('public', 'llms.txt'), llmsTxt);

console.log(
  `Prerendered ${allRenderPages.length} pages (${appPages.length} app, ${projectPages.length} project, ${locationRenderPages.length} location hub, ${serviceAreaRenderPages.length} service area, ${contentRenderPages.length} reference, ${blogRenderPages.length + 1} insight) plus a custom 404, sitemap.xml and llms.txt.`,
);
