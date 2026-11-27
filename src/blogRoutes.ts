import { blogManifest } from './blogManifest';

export { BLOG_INDEX_METADATA } from './blogIndexMeta';

/** Lightweight route metadata. Article text stays out of the main bundle. */
export const blogRouteMetadata = blogManifest.map((post) => ({ ...post }));

export const getBlogRoute = (pathname: string) =>
  blogRouteMetadata.find(
    (post) => post.path === pathname.replace(/\/$/, '') || post.path === pathname,
  );
