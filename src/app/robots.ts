import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/manager/',
          '/account/',
          '/login/',
          '/register/',
          '/gio-hang/',
          '/yeu-thich/',
          '/api/',
          '/tim-kiem',
        ],
      },
    ],
    sitemap: 'https://yenth.vn/sitemap.xml',
    host: 'https://yenth.vn',
  };
}
