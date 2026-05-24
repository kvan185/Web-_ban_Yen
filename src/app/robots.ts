import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/manager/', '/account/', '/login/', '/api/'],
      },
    ],
    sitemap: 'https://yenth.vn/sitemap.xml',
    host: 'https://yenth.vn',
  };
}
