import fs from 'fs';
import path from 'path';
import type { Metadata } from 'next';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import SafeImage from '@/components/SafeImage';
import {
  articleJsonLd,
  breadcrumbJsonLd,
  findBlogPost,
  JsonLd,
  pageMetadata,
  readBlogPosts,
  readProducts,
  truncateDescription,
} from '@/lib/seo';

type BlogPostProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return readBlogPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostProps): Promise<Metadata> {
  const { slug } = await params;
  const post = findBlogPost(slug);

  if (!post) {
    return pageMetadata({
      title: 'Bài viết không tồn tại',
      description: 'Bài viết bạn đang tìm không còn tồn tại tại Yến Tinh Hoa.',
      pathname: `/blog/${slug}`,
    });
  }

  return pageMetadata({
    title: post.title,
    description: truncateDescription(post.description),
    pathname: `/blog/${post.slug}`,
    image: post.imageUrl || '/images/about-hero.png',
    type: 'article',
    keywords: [post.title, 'kiến thức tổ yến', 'yến sào', 'Yến Tinh Hoa'],
  });
}

function readPostContent(postId: string) {
  const blogDirPath = path.join(process.cwd(), 'src', 'data', 'blog');
  const filePath = path.join(blogDirPath, `${postId}.md`);
  if (!fs.existsSync(filePath)) return '# Nội dung đang được cập nhật';
  return fs.readFileSync(filePath, 'utf8');
}

export default async function BlogPost({ params }: BlogPostProps) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const meta = findBlogPost(decodedSlug);
  const content = meta ? readPostContent(meta.id) : '# Bài viết không tồn tại';
  const products = readProducts();
  const recommendedProducts = products.slice(0, 2);

  return (
    <>
      {meta && (
        <JsonLd
          data={[
            articleJsonLd(meta),
            breadcrumbJsonLd([
              { name: 'Trang chủ', url: '/' },
              { name: 'Blog', url: '/blog' },
              { name: meta.title, url: `/blog/${meta.slug}` },
            ]),
          ]}
        />
      )}
      <div className="container" style={{ padding: '60px 20px', maxWidth: '900px', margin: '0 auto', minHeight: '80vh' }}>
        <Link href="/blog" style={{ color: 'var(--primary-color)', marginBottom: '20px', display: 'inline-block' }}>
          &larr; Quay lại danh sách Blog
        </Link>

        <div className="glass-card" style={{ padding: '40px' }}>
          {meta && (
            <header style={{ marginBottom: '30px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '20px' }}>
              <h1 style={{ fontSize: '3rem', marginBottom: '10px' }}>{meta.title}</h1>
              <p style={{ opacity: 0.6, fontSize: '0.9rem' }}>Đăng ngày: {meta.date}</p>
            </header>
          )}
          <article className="markdown-body">
            <ReactMarkdown>{content}</ReactMarkdown>
          </article>
        </div>

        {recommendedProducts.length > 0 && (
          <section style={{ marginTop: '40px' }}>
            <div style={{ marginBottom: '25px' }}>
              <h2 style={{ fontSize: '2rem', color: 'var(--primary-color)', marginBottom: '10px' }}>Sản phẩm gợi ý cho bạn</h2>
              <p style={{ opacity: 0.8, lineHeight: '1.7' }}>
                Những sản phẩm này phù hợp với nội dung bài viết và giúp bạn chọn ngay yến nguyên chất phù hợp.
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
              {recommendedProducts.map((product) => (
                <Link key={product.id} href={`/products/${product.id}`} style={{ textDecoration: 'none' }}>
                  <div className="glass-card" style={{ padding: '20px', minHeight: '320px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ width: '100%', height: '180px', overflow: 'hidden', borderRadius: '14px', marginBottom: '18px' }}>
                        <SafeImage src={product.imageUrl} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      <h3 style={{ fontSize: '1.2rem', marginBottom: '12px', color: 'var(--text-color)' }}>{product.name}</h3>
                      <p style={{ opacity: 0.8, lineHeight: '1.6', marginBottom: '18px' }}>{product.description}</p>
                    </div>
                    <div>
                      <p style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--primary-color)', marginBottom: '15px' }}>
                        {product.price.toLocaleString('vi-VN')} đ
                      </p>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontWeight: '600', color: 'var(--primary-color)' }}>
                        Xem chi tiết →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <style dangerouslySetInnerHTML={{__html: `
          .markdown-body h1 { font-size: 2.5rem; margin-bottom: 20px; color: var(--primary-color); }
          .markdown-body h2 { font-size: 1.8rem; margin-top: 30px; margin-bottom: 15px; color: var(--primary-color); }
          .markdown-body p { margin-bottom: 15px; line-height: 1.8; opacity: 0.9; }
          .markdown-body ul, .markdown-body ol { padding-left: 20px; margin-bottom: 15px; }
          .markdown-body li { margin-bottom: 8px; }
          .markdown-body img { max-width: 100%; border-radius: 8px; margin: 20px 0; }
          .markdown-body strong { color: var(--primary-color); }
        `}} />
      </div>
    </>
  );
}
