import { BusinessFooter } from './components/BusinessFooter';
import React, { useEffect } from 'react';
import App from './App';
import { BlogArticlePage, BlogIndexPage } from './components/BlogContent';
import { LocationHubPage } from './components/LocationHubPage';
import { ServiceAreaLandingPage, StandaloneContentPage } from './components/ServiceAreaContent';
import { getBlogRoute } from './blogRoutes';
import { getContentPage } from './contentPages';
import { getServiceAreaPage } from './serviceAreas';
import {
  getAppRouteMetadata,
  getProjectFromPath,
  isKnownAppPath,
  normalizePath,
  notFoundMetadata,
} from './routes';
import {
  createContentPageSchema,
  createOrganizationSchema,
  createServiceAreaSchema,
  getLocationPage,
  SITE_URL,
} from './seo';

const blogIndexMetadata = {
  title: 'Karaikal Website & Local SEO Guides | BuiltbyGSV',
  description:
    'Practical guides from BuiltbyGSV about websites, custom software and local search visibility for businesses in Karaikal.',
};

export default function SiteRouter() {
  const [pathname, setPathname] = React.useState(window.location.pathname);
  const normalizedPath = normalizePath(pathname);
  const locationPage = getLocationPage(pathname);
  const serviceAreaPage = getServiceAreaPage(pathname);
  const contentPage = getContentPage(pathname);
  const blogPost = getBlogRoute(pathname);
  const project = getProjectFromPath(pathname);
  const isBlogIndex = pathname.replace(/\/$/, '') === '/insights';
  const appMetadata = getAppRouteMetadata(pathname);
  const isNotFound =
    normalizedPath === '/404' ||
    (!blogPost &&
      !isBlogIndex &&
      !locationPage &&
      !serviceAreaPage &&
      !contentPage &&
      !isKnownAppPath(pathname));

  useEffect(() => {
    const handleRouteChange = () => setPathname(window.location.pathname);
    window.addEventListener('popstate', handleRouteChange);
    return () => window.removeEventListener('popstate', handleRouteChange);
  }, []);

  useEffect(() => {
    const metadata = blogPost
      ? { title: blogPost.seoTitle, description: blogPost.description }
      : isBlogIndex
        ? blogIndexMetadata
        : serviceAreaPage ?? contentPage ?? locationPage ?? appMetadata ?? notFoundMetadata;
    const pagePath =
      isNotFound
        ? '/404'
        : blogPost?.path ??
          (isBlogIndex
            ? '/insights'
            : serviceAreaPage?.path ?? contentPage?.path ?? locationPage?.path ?? normalizePath(pathname));
    const canonicalUrl = `${SITE_URL}${pagePath}`;

    document.title = metadata.title;

    const setMeta = (selector: string, attribute: 'name' | 'property', key: string, value: string) => {
      let element = document.head.querySelector<HTMLMetaElement>(selector);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, key);
        document.head.appendChild(element);
      }
      element.content = value;
    };

    setMeta('meta[name="description"]', 'name', 'description', metadata.description);
    setMeta(
      'meta[name="robots"]',
      'name',
      'robots',
      isNotFound
        ? 'noindex, follow'
        : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    );
    setMeta('meta[property="og:title"]', 'property', 'og:title', metadata.title);
    setMeta('meta[property="og:description"]', 'property', 'og:description', metadata.description);
    setMeta('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);
    setMeta('meta[property="og:type"]', 'property', 'og:type', blogPost ? 'article' : 'website');
    setMeta('meta[property="og:image"]', 'property', 'og:image', project?.detailData?.publicImageUrl ?? `${SITE_URL}/og-cover.png`);
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', metadata.title);
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', metadata.description);
    setMeta('meta[name="twitter:image"]', 'name', 'twitter:image', project?.detailData?.publicImageUrl ?? `${SITE_URL}/og-cover.png`);

    const canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) canonical.href = canonicalUrl;
    const alternate = document.head.querySelector<HTMLLinkElement>('link[rel="alternate"][hreflang="en-IN"]');
    if (alternate) alternate.href = canonicalUrl;

    const schemaElement = document.getElementById('structured-data');
    if (!schemaElement) return;

    const schema = createOrganizationSchema();
    if (!isNotFound) {
      schema['@graph'].push({
        '@type': isBlogIndex ? 'CollectionPage' : normalizedPath === '/contact' ? 'ContactPage' : 'WebPage',
        '@id': `${canonicalUrl}#webpage`,
        name: metadata.title,
        description: metadata.description,
        url: canonicalUrl,
        isPartOf: { '@id': `${SITE_URL}/#website` },
        inLanguage: 'en-IN',
      } as never);
    }
    if (locationPage) {
      schema['@graph'].push({
        '@type': 'Service',
        '@id': `${canonicalUrl}#service`,
        name: `Website and Software Development in ${locationPage.city}`,
        serviceType: ['Web Development', 'Custom Software Development'],
        provider: { '@id': `${SITE_URL}/#organization` },
        areaServed: { '@type': 'City', name: locationPage.city },
        url: canonicalUrl,
      } as never);
    }
    if (serviceAreaPage) {
      for (const node of createServiceAreaSchema(serviceAreaPage)) {
        schema['@graph'].push(node as never);
      }
    }
    if (contentPage) {
      for (const node of createContentPageSchema(contentPage)) {
        schema['@graph'].push(node as never);
      }
    }
    if (blogPost) {
      schema['@graph'].push({
        '@type': 'BlogPosting',
        '@id': `${canonicalUrl}#article`,
        headline: blogPost.title,
        description: blogPost.description,
        datePublished: blogPost.published,
        dateModified: blogPost.updated,
        mainEntityOfPage: canonicalUrl,
        author: { '@id': `${SITE_URL}/#gurusabarivasan` },
        publisher: { '@id': `${SITE_URL}/#organization` },
        inLanguage: 'en-IN',
      } as never);
    }
    if (project) {
      schema['@graph'].push({
        '@type': 'CreativeWork',
        '@id': `${canonicalUrl}#creative-work`,
        name: project.title,
        headline: project.detailData?.seoTitle ?? `${project.title} Case Study`,
        description: project.detailData?.seoDescription ?? project.description,
        url: canonicalUrl,
        image: project.detailData?.publicImageUrl ?? `${SITE_URL}/og-cover.png`,
        creator: { '@id': `${SITE_URL}/#organization` },
        provider: { '@id': `${SITE_URL}/#organization` },
        dateCreated: project.year,
        keywords: [...project.tags, project.category, 'BuiltbyGSV'],
        inLanguage: 'en-IN',
      } as never);
    }
    const serviceNames: Record<string, string> = {
      '/services/web-development': 'Website Development',
      '/services/custom-software-development': 'Custom Software Development',
      '/services/ai-solutions': 'AI Solutions and Agent Development',
      '/services/automation': 'Business Automation and Integrations',
    };
    if (serviceNames[normalizedPath]) {
      schema['@graph'].push({
        '@type': 'Service',
        '@id': `${canonicalUrl}#service`,
        name: serviceNames[normalizedPath],
        description: metadata.description,
        provider: { '@id': `${SITE_URL}/#organization` },
        areaServed: 'IN',
        url: canonicalUrl,
      } as never);
    }
    schemaElement.textContent = JSON.stringify(schema);
  }, [
    appMetadata,
    blogPost,
    contentPage,
    isBlogIndex,
    isNotFound,
    locationPage,
    normalizedPath,
    pathname,
    project,
    serviceAreaPage,
  ]);

  const returnToHomepage = () => {
    window.location.href = '/start-project';
  };

  const withBusinessFooter = (page: React.ReactNode) => <>{page}<div className="pb-24 lg:pb-0"><BusinessFooter /></div></>;

  if (blogPost) {
    return withBusinessFooter(<BlogArticlePage onStartProject={returnToHomepage} />);
  }

  if (isBlogIndex) {
    return withBusinessFooter(<BlogIndexPage />);
  }

  if (serviceAreaPage) {
    return withBusinessFooter(<ServiceAreaLandingPage page={serviceAreaPage} onStartProject={returnToHomepage} />);
  }

  if (contentPage) {
    return withBusinessFooter(<StandaloneContentPage page={contentPage} onStartProject={returnToHomepage} />);
  }

  if (locationPage) {
    return withBusinessFooter(<LocationHubPage page={locationPage} onStartProject={returnToHomepage} />);
  }

  return <App />;
}
