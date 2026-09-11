import { blogPosts } from './blog';

export const blogRouteMetadata = blogPosts.map(
  ({ path, title, seoTitle, description, published, updated }) => ({
    path,
    title,
    seoTitle,
    description,
    published,
    updated,
  }),
);

export const getBlogRoute = (pathname: string) =>
  blogRouteMetadata.find(
    (post) => post.path === pathname.replace(/\/$/, '') || post.path === pathname,
  );
