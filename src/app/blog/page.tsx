import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import SafeImage from '@/components/SafeImage';

type BlogPostMeta = {
  id: string;
  title: string;
  description: string;
  slug: string;
  imageUrl?: string;
  date?: string;
};

export const metadata = {
  title: 'Blog kiến thức tổ yến - Yến Tinh Hoa',
  description: 'Bài viết chuyên sâu về tổ yến, dinh dưỡng, bảo quản và cách dùng yến sào.',
};

function getPosts(): BlogPostMeta[] {
  try {
    const metadataFilePath = path.join(process.cwd(), 'src', 'data', 'blog-metadata.json');
    if (!fs.existsSync(metadataFilePath)) return [];
    return JSON.parse(fs.readFileSync(metadataFilePath, 'utf8')).sort(
      (a: BlogPostMeta, b: BlogPostMeta) =>
        new Date(b.date || '').getTime() - new Date(a.date || '').getTime()
    );
  } catch {
    return [];
  }
}

export default function BlogListPage() {
  const posts = getPosts();

  return (
    <div className="container blog-list-page">
      <div className="catalog-heading">
        <h1>Blog & Kiến thức</h1>
        <p>Chia sẻ kinh nghiệm chọn, bảo quản và dùng tổ yến đúng cách cho từng nhu cầu sức khỏe.</p>
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
  );
}
