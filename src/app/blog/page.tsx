import fs from 'fs';
import path from 'path';
import Link from 'next/link';

export const metadata = {
  title: 'Blog Kiến Thức - Thượng Yến',
  description: 'Tin tức, kiến thức và cách sử dụng yến sào hiệu quả.',
};

export default function BlogListPage() {
  const metadataFilePath = path.join(process.cwd(), 'src', 'data', 'blog-metadata.json');
  let posts: any[] = [];
  
  try {
    if (fs.existsSync(metadataFilePath)) {
      posts = JSON.parse(fs.readFileSync(metadataFilePath, 'utf8'));
      // Sắp xếp bài mới nhất lên đầu
      posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }
  } catch (e) {
    console.error(e);
  }

  return (
    <div className="container" style={{ padding: '60px 20px', minHeight: '80vh' }}>
      <h1 style={{ textAlign: 'center', fontSize: '3rem', marginBottom: '20px' }}>Blog & Kiến Thức</h1>
      <p style={{ textAlign: 'center', opacity: 0.7, marginBottom: '40px' }}>Chia sẻ kinh nghiệm sử dụng yến sào mỗi ngày</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '30px' }}>
        {posts.map(post => (
          <div key={post.id} className="glass-card" style={{ display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>
              <Link href={`/blog/${post.slug}`} style={{ color: 'var(--primary-color)' }}>
                {post.title}
              </Link>
            </h3>
            <p style={{ opacity: 0.8, marginBottom: '20px', flex: 1 }}>{post.description}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.8rem', opacity: 0.5 }}>{post.date}</span>
              <Link href={`/blog/${post.slug}`} className="btn-primary" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>
                Đọc Tiếp
              </Link>
            </div>
          </div>
        ))}
        {posts.length === 0 && <p style={{ textAlign: 'center', gridColumn: '1 / -1', opacity: 0.5 }}>Chưa có bài viết nào.</p>}
      </div>
    </div>
  );
}
