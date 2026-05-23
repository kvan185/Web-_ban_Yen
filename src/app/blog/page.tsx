import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import SafeImage from '@/components/SafeImage';

export const metadata = {
  title: 'Blog Kiến Thức Tổ Yến - Yến Tinh Hoa',
  description: 'Bộ bài viết chuyên sâu từ Yến Tinh Hoa với hơn 10 năm kinh nghiệm: phân tích dưỡng chất vi lượng, kiểm soát chất lượng đảo yến và kỹ thuật chưng yến thô chuẩn cao cấp.',
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
      <h1 style={{ textAlign: 'center', fontSize: '3.5rem', marginBottom: '20px', color: 'var(--primary-color)', fontWeight: '700' }}>Blog & Kiến Thức</h1>
      <p style={{ textAlign: 'center', opacity: 0.8, marginBottom: '50px', fontSize: '1.2rem' }}>Chia sẻ chuyên sâu từ hơn 10 năm nghiên cứu yến sào: dinh dưỡng vi lượng, kiểm soát chất lượng đảo yến, và hướng dẫn chưng yến thô chuẩn cao cấp.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '40px' }}>
        {posts.map(post => (
          <div key={post.id} className="glass-card" style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            padding: 0, 
            overflow: 'hidden',
            borderRadius: '20px',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease'
          }}>
            {/* Blog Image */}
            <Link href={`/blog/${post.slug}`}>
              <div style={{ height: '220px', overflow: 'hidden', cursor: 'pointer' }}>
                <SafeImage 
                  src={post.imageUrl} 
                  alt={post.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            </Link>

            <div style={{ padding: '25px', display: 'flex', flexDirection: 'column', flex: 1 }}>
              <span style={{ fontSize: '0.8rem', opacity: 0.6, marginBottom: '10px', display: 'block' }}>📅 {post.date}</span>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '15px', lineHeight: '1.4' }}>
                <Link href={`/blog/${post.slug}`} style={{ color: 'var(--primary-color)', textDecoration: 'none' }}>
                  {post.title}
                </Link>
              </h3>
              <p style={{ opacity: 0.7, marginBottom: '25px', flex: 1, lineHeight: '1.6', fontSize: '0.95rem' }}>
                {post.description}
              </p>
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <Link href={`/blog/${post.slug}`} className="btn-primary" style={{ 
                  padding: '10px 24px', 
                  fontSize: '0.9rem',
                  borderRadius: '30px'
                }}>
                  Đọc Bài Viết
                </Link>
              </div>
            </div>
          </div>
        ))}
        {posts.length === 0 && <p style={{ textAlign: 'center', gridColumn: '1 / -1', opacity: 0.5 }}>Chưa có bài viết nào.</p>}
      </div>
    </div>
  );
}
