import Link from 'next/link';
import SafeImage from '@/components/SafeImage';
import { JsonLd, pageMetadata, readBlogPosts, SITE_URL, truncateDescription } from '@/lib/seo';

type BlogPostMeta = {
  id: string;
  title: string;
  description: string;
  slug: string;
  imageUrl?: string;
  date?: string;
};

export const metadata = pageMetadata({
  title: 'Blog kiến thức tổ yến, yến sào và sức khỏe',
  description:
    'Kinh nghiệm chọn mua, phân biệt, bảo quản và chưng tổ yến đúng cách từ Yến Tinh Hoa. Nội dung hữu ích cho khách mua yến sào tại TP.HCM.',
  pathname: '/blog',
  keywords: ['blog yến sào', 'kiến thức tổ yến', 'cách chưng yến', 'phân biệt yến thật giả'],
});

export default async function BlogListPage() {
  const posts = (await readBlogPosts()) as BlogPostMeta[];
  const blogJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Blog kiến thức tổ yến Yến Tinh Hoa',
    url: `${SITE_URL}/blog`,
    inLanguage: 'vi-VN',
    blogPost: posts.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      description: truncateDescription(post.description, 240),
      url: `${SITE_URL}/blog/${post.slug}`,
      datePublished: post.date,
      dateModified: post.date,
    })),
  };

  return (
    <>
      <JsonLd data={blogJsonLd} />
      <div className="container blog-list-page">
        <div className="catalog-heading">
          <h1>Blog & Kiến thức</h1>
          <p>
            Chia sẻ kinh nghiệm chọn, bảo quản và dùng tổ yến đúng cách cho từng
            nhu cầu sức khỏe.
          </p>
        </div>

        <div className="blog-grid">
          {posts.map((post) => (
            <article key={post.id} className="glass-card blog-card">
              <Link href={`/blog/${post.slug}`} className="blog-card-media">
                <SafeImage src={post.imageUrl || '/images/about-hero.png'} alt={post.title} />
              </Link>
              <div className="blog-card-body">
                <span>{post.date}</span>
                <h2>
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>
                <p>{post.description}</p>
                <Link href={`/blog/${post.slug}`} className="btn-primary blog-read-more">
                  Đọc bài viết
                </Link>
              </div>
            </article>
          ))}
          {posts.length === 0 && <p className="catalog-empty">Chưa có bài viết nào.</p>}
        </div>
      </div>
    </>
  );
}
