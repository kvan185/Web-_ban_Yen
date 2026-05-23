import fs from 'fs';
import path from 'path';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const metadataFilePath = path.join(process.cwd(), 'src', 'data', 'blog-metadata.json');
  let title = 'Bài Viết - Yến Tinh Hoa';
  try {
    if (fs.existsSync(metadataFilePath)) {
      const posts = JSON.parse(fs.readFileSync(metadataFilePath, 'utf8'));
      const post = posts.find((p: any) => p.slug === decodeURIComponent(slug));
      if (post) title = `${post.title} - Yến Tinh Hoa`;
    }
  } catch (e) {}
  return { title };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const metadataFilePath = path.join(process.cwd(), 'src', 'data', 'blog-metadata.json');
  const blogDirPath = path.join(process.cwd(), 'src', 'data', 'blog');
  const productsFilePath = path.join(process.cwd(), 'src', 'data', 'products.json');
  
  let content = '';
  let meta: any = null;
  let recommendedProducts: any[] = [];

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

    if (fs.existsSync(productsFilePath)) {
      const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf8'));
      const relatedIds: Record<string, string[]> = {
        'cach_chung_yen': ['p2', 'p1'],
        'phan_biet_yen_that_gia': ['p2', 'p9'],
        'loi_ich_yen_sao': ['p1', 'p2'],
        'yen_sao_me_bau': ['p1', 'p7'],
        'mua_yen_hcm': ['p2', 'p7'],
        'thoi_diem_an_yen': ['p1', 'p9'],
        'tan_suat_an_yen': ['p1', 'p8'],
        'bao_quan_yen_sao': ['p2', 'p9'],
        'yen_sao_nguoi_gia': ['p1', 'p9'],
        'phan_biet_yen_dao_nha': ['p2', 'p4'],
        'yen_sao_me_bau_thang_may': ['p1', 'p7'],
        'cach_chung_yen_nguoi_gia_sau_phau_thuat': ['p2', 'p1']
      };
      const relatedIdsForSlug = relatedIds[decodedSlug] || ['p2', 'p1'];
      recommendedProducts = relatedIdsForSlug
        .map((id) => products.find((product: any) => product.id === id))
        .filter(Boolean);
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

      {recommendedProducts.length > 0 && (
        <section style={{ marginTop: '40px' }}>
          <div style={{ marginBottom: '25px' }}>
            <h2 style={{ fontSize: '2rem', color: 'var(--primary-color)', marginBottom: '10px' }}>Sản phẩm gợi ý cho bạn</h2>
            <p style={{ opacity: 0.8, lineHeight: '1.7' }}>
              Những sản phẩm này phù hợp với nội dung bài viết và giúp bạn chọn ngay yến nguyên chất phù hợp.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
            {recommendedProducts.map((product: any) => (
              <Link key={product.id} href={`/san-pham/${product.id}`} style={{ textDecoration: 'none' }}>
                <div className="glass-card" style={{ padding: '20px', minHeight: '320px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ width: '100%', height: '180px', overflow: 'hidden', borderRadius: '14px', marginBottom: '18px' }}>
                      <img src={product.imageUrl} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '12px', color: 'var(--text-color)' }}>{product.name}</h3>
                    <p style={{ opacity: 0.8, lineHeight: '1.6', marginBottom: '18px' }}>{product.description}</p>
                  </div>
                  <div>
                    <p style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--primary-color)', marginBottom: '15px' }}>{product.price.toLocaleString('vi-VN')} đ</p>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontWeight: '600', color: 'var(--primary-color)' }}>Xem chi tiết →</span>
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
  );
}
