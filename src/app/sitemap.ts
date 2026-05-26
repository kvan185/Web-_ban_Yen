import type { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';
import { readBlogPosts, readProducts, SITE_URL } from '@/lib/seo';

const staticRoutes: Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
  priority: number;
}> = [
  { path: '/', changeFrequency: 'daily', priority: 1 },
  { path: '/san-pham', changeFrequency: 'daily', priority: 0.95 },
  { path: '/danh-muc', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/gioi-thieu', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/hcm', changeFrequency: 'weekly', priority: 0.85 },
  { path: '/hcm/quan-1', changeFrequency: 'weekly', priority: 0.82 },
  { path: '/hcm/quan-3', changeFrequency: 'weekly', priority: 0.82 },
  { path: '/hcm/quan-7', changeFrequency: 'weekly', priority: 0.82 },
  { path: '/hcm/phu-nhuan', changeFrequency: 'weekly', priority: 0.82 },
  { path: '/blog', changeFrequency: 'weekly', priority: 0.78 },
  { path: '/chung-nhan', changeFrequency: 'monthly', priority: 0.72 },
  { path: '/lich-su', changeFrequency: 'monthly', priority: 0.68 },
  { path: '/lien-he', changeFrequency: 'monthly', priority: 0.7 },
];

function fileModifiedDate(filePath: string) {
  try {
    return fs.statSync(filePath).mtime;
  } catch {
    return new Date();
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const dataModified = fileModifiedDate(path.join(process.cwd(), 'src', 'data', 'products.json'));
  const blogModified = fileModifiedDate(path.join(process.cwd(), 'src', 'data', 'blog-metadata.json'));

  const sitemap: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${SITE_URL}${route.path === '/' ? '' : route.path}`,
    lastModified: route.path.startsWith('/blog') ? blogModified : dataModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  for (const product of readProducts()) {
    sitemap.push({
      url: `${SITE_URL}/san-pham/${product.id}`,
      lastModified: dataModified,
      changeFrequency: 'weekly',
      priority: 0.86,
    });
  }

  for (const post of readBlogPosts()) {
    sitemap.push({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: post.date ? new Date(post.date) : blogModified,
      changeFrequency: 'monthly',
      priority: 0.76,
    });
  }

  return sitemap;
}
