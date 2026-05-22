import { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://yenth.vn';

  const sitemap: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/gioi-thieu`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/san-pham`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/chung-nhan`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/lien-he`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];

  // Load products
  try {
    const productsPath = path.join(process.cwd(), 'src', 'data', 'products.json');
    if (fs.existsSync(productsPath)) {
      const productsData = fs.readFileSync(productsPath, 'utf8');
      const products = JSON.parse(productsData);
      
      products.forEach((product: any) => {
        sitemap.push({
          url: `${baseUrl}/san-pham/${product.id}`,
          lastModified: new Date(),
          changeFrequency: 'weekly',
          priority: 0.8,
        });
      });
    }
  } catch (error) {
    console.error('Error loading products for sitemap:', error);
  }

  // Load blog posts
  try {
    const blogPath = path.join(process.cwd(), 'src', 'data', 'blog-metadata.json');
    if (fs.existsSync(blogPath)) {
      const blogData = fs.readFileSync(blogPath, 'utf8');
      const blogs = JSON.parse(blogData);
      
      blogs.forEach((blog: any) => {
        sitemap.push({
          url: `${baseUrl}/blog/${blog.slug || blog.id}`,
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 0.7,
        });
      });
    }
  } catch (error) {
    console.error('Error loading blogs for sitemap:', error);
  }

  return sitemap;
}
