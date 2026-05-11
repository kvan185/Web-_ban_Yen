import fs from 'fs';
import path from 'path';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const metadataFilePath = path.join(process.cwd(), 'src', 'data', 'blog-metadata.json');
  let title = 'Bài Viết - Thượng Yến';
  try {
    if (fs.existsSync(metadataFilePath)) {
      const posts = JSON.parse(fs.readFileSync(metadataFilePath, 'utf8'));
      const post = posts.find((p: any) => p.slug === decodeURIComponent(slug));
      if (post) title = post.title;
    }
  } catch (e) {}
  return { title };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const metadataFilePath = path.join(process.cwd(), 'src', 'data', 'blog-metadata.json');
  const blogDirPath = path.join(process.cwd(), 'src', 'data', 'blog');
  
  let content = '';
  let meta: any = null;

  try {
    if (fs.existsSync(metadataFilePath)) {
      const posts = JSON.parse(fs.readFileSync(metadataFilePath, 'utf8'));
      meta = posts.find((p: any) => p.slug === decodedSlug);
      
      if (meta) {
        const filePath = path.join(blogDirPath, `${meta.id}.md`);
        if (fs.existsSync(filePath)) {
          content = fs.readFileSync(filePath, 'utf8');
        } else {
          content = '# Nội dung đang được cập nhật';
        }
      } else {
        content = '# Bài viết không tồn tại';
      }
    }
  } catch (e) {
    content = '# Lỗi khi tải bài viết';
  }

  return (
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
  );
}
