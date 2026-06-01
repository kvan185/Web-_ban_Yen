import type { MetadataRoute } from 'next';
import { readBlogPosts, readProducts, SITE_URL } from '@/lib/seo';

const staticRoutes: Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
  priority: number;
}> = [
  { path: '/', changeFrequency: 'daily', priority: 1 },
  { path: '/raw-bird-nest', changeFrequency: 'daily', priority: 0.98 },
  { path: '/refined-bird-nest', changeFrequency: 'daily', priority: 0.97 },
  { path: '/products', changeFrequency: 'daily', priority: 0.95 },
  { path: '/categories', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/about', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/hcm', changeFrequency: 'weekly', priority: 0.85 },
  { path: '/hcm/quan-1', changeFrequency: 'weekly', priority: 0.82 },
  { path: '/hcm/quan-3', changeFrequency: 'weekly', priority: 0.82 },
  { path: '/hcm/quan-7', changeFrequency: 'weekly', priority: 0.82 },
  { path: '/hcm/phu-nhuan', changeFrequency: 'weekly', priority: 0.82 },
  { path: '/blog', changeFrequency: 'weekly', priority: 0.78 },
  { path: '/certifications', changeFrequency: 'monthly', priority: 0.72 },
  { path: '/order-history', changeFrequency: 'monthly', priority: 0.68 },
  { path: '/contact', changeFrequency: 'monthly', priority: 0.7 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const dataModified = new Date();
  const blogModified = new Date();

  const sitemap: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${SITE_URL}${route.path === '/' ? '' : route.path}`,
    lastModified: route.path.startsWith('/blog') ? blogModified : dataModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  for (const product of await readProducts()) {
    sitemap.push({
      url: `${SITE_URL}/products/${product.id}`,
      lastModified: dataModified,
      changeFrequency: 'weekly',
      priority: 0.86,
    });
  }

  for (const post of await readBlogPosts()) {
    sitemap.push({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: post.date ? new Date(post.date) : blogModified,
      changeFrequency: 'monthly',
      priority: 0.76,
    });
  }

  return sitemap;
}
