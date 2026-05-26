import fs from 'fs';
import path from 'path';
import type { Metadata } from 'next';

export const SITE_URL = 'https://yenth.vn';
export const SITE_NAME = 'Yến Tinh Hoa';
export const BRAND_NAME = 'Yến Tinh Hoa';
export const PHONE = '0375266538';
export const EMAIL = 'khanhvan18052004@gmail.com';
export const STREET_ADDRESS = '105 Ung Văn Khiêm';
export const ADDRESS_LOCALITY = 'Bình Thạnh';
export const ADDRESS_REGION = 'TP.HCM';
export const ADDRESS_COUNTRY = 'VN';
export const DEFAULT_OG_IMAGE = '/logo.jpeg';

export type ProductSeo = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  description?: string;
  badge?: string;
  weight?: string;
  origin?: string;
  shelfLife?: string;
  usage?: string;
  category?: string;
};

export type BlogPostSeo = {
  id: string;
  title: string;
  description: string;
  slug: string;
  imageUrl?: string;
  date?: string;
};

export function absoluteUrl(pathname = '/') {
  if (pathname.startsWith('http')) return pathname;
  return `${SITE_URL}${pathname.startsWith('/') ? pathname : `/${pathname}`}`;
}

export function absoluteImageUrl(imageUrl?: string) {
  if (!imageUrl) return absoluteUrl(DEFAULT_OG_IMAGE);
  return imageUrl.startsWith('http') ? imageUrl : absoluteUrl(imageUrl);
}

export function truncateDescription(value: string, maxLength = 158) {
  const normalized = value.replace(/\s+/g, ' ').trim();
  if (normalized.length <= maxLength) return normalized;
  return `${normalized.slice(0, maxLength - 1).trim()}…`;
}

function readJsonFile<T>(filePath: string): T | null {
  try {
    if (!fs.existsSync(filePath)) return null;
    return JSON.parse(fs.readFileSync(filePath, 'utf8')) as T;
  } catch {
    return null;
  }
}

export function readProducts() {
  return readJsonFile<ProductSeo[]>(
    path.join(process.cwd(), 'src', 'data', 'products.json')
  ) || [];
}

export function readBlogPosts() {
  const posts = readJsonFile<BlogPostSeo[]>(
    path.join(process.cwd(), 'src', 'data', 'blog-metadata.json')
  ) || [];
  return posts.sort(
    (a, b) => new Date(b.date || '').getTime() - new Date(a.date || '').getTime()
  );
}

export function findProduct(id: string) {
  return readProducts().find((product) => product.id === id) || null;
}

export function findBlogPost(slug: string) {
  const decodedSlug = decodeURIComponent(slug);
  return readBlogPosts().find((post) => post.slug === decodedSlug) || null;
}

export function pageMetadata({
  title,
  description,
  pathname,
  image = DEFAULT_OG_IMAGE,
  type = 'website',
  keywords,
}: {
  title: string;
  description: string;
  pathname: string;
  image?: string;
  type?: 'website' | 'article';
  keywords?: string[];
}): Metadata {
  const canonical = absoluteUrl(pathname);
  const finalDescription = truncateDescription(description);

  return {
    title,
    description: finalDescription,
    keywords,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description: finalDescription,
      url: canonical,
      siteName: SITE_NAME,
      locale: 'vi_VN',
      type,
      images: [
        {
          url: absoluteImageUrl(image),
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: finalDescription,
      images: [absoluteImageUrl(image)],
    },
  };
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'LocalBusiness', 'Store'],
    '@id': `${SITE_URL}/#organization`,
    name: BRAND_NAME,
    url: SITE_URL,
    logo: absoluteImageUrl(DEFAULT_OG_IMAGE),
    image: absoluteImageUrl(DEFAULT_OG_IMAGE),
    telephone: PHONE,
    email: EMAIL,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: STREET_ADDRESS,
      addressLocality: ADDRESS_LOCALITY,
      addressRegion: ADDRESS_REGION,
      addressCountry: ADDRESS_COUNTRY,
    },
    areaServed: [
      { '@type': 'City', name: 'Thành phố Hồ Chí Minh' },
      { '@type': 'Country', name: 'Việt Nam' },
    ],
    sameAs: ['https://www.facebook.com/nkhanhvan185', 'https://zalo.me/0375266538'],
  };
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    publisher: { '@id': `${SITE_URL}/#organization` },
    inLanguage: 'vi-VN',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/tim-kiem?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.url),
    })),
  };
}

export function productJsonLd(product: ProductSeo) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${SITE_URL}/san-pham/${product.id}#product`,
    name: product.name,
    description: truncateDescription(product.description || product.name, 500),
    image: [absoluteImageUrl(product.imageUrl)],
    brand: {
      '@type': 'Brand',
      name: BRAND_NAME,
    },
    sku: product.id,
    category: product.category || 'Yến sào',
    offers: {
      '@type': 'Offer',
      url: `${SITE_URL}/san-pham/${product.id}`,
      priceCurrency: 'VND',
      price: product.price,
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: { '@id': `${SITE_URL}/#organization` },
    },
  };
}

export function articleJsonLd(post: BlogPostSeo) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${SITE_URL}/blog/${post.slug}#article`,
    headline: post.title,
    description: truncateDescription(post.description, 300),
    image: [absoluteImageUrl(post.imageUrl)],
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Organization',
      name: BRAND_NAME,
      url: SITE_URL,
    },
    publisher: { '@id': `${SITE_URL}/#organization` },
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
    inLanguage: 'vi-VN',
  };
}

export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}
