import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import AddToCartButton from '@/components/AddToCartButton';
import SafeImage from '@/components/SafeImage';

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ q: string }> }) {
  const { q } = await searchParams;
  return {
    title: `Kết quả tìm kiếm cho "${q || ''}" - Thượng Yến`,
  };
}

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q: string }> }) {
  const { q } = await searchParams;
  const query = q?.toLowerCase() || '';

  const productsFilePath = path.join(process.cwd(), 'src', 'data', 'products.json');
  const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf8'));

  const filteredProducts = products.filter((p: any) => 
    p.name.toLowerCase().includes(query) || 
    p.description.toLowerCase().includes(query) ||
    p.category?.toLowerCase().includes(query)
  );

  return (
    <main style={{ padding: '120px 0 60px 0', minHeight: '80vh' }}>
      <div className="container">
        <div style={{ marginBottom: '40px' }}>
          <h1 style={{ fontSize: '2.5rem', color: 'var(--primary-color)', marginBottom: '10px' }}>
            Kết quả tìm kiếm
          </h1>
          <p style={{ color: 'var(--text-muted)' }}>
            {query ? (
              <>Tìm thấy <strong>{filteredProducts.length}</strong> sản phẩm cho từ khóa "<strong>{q}</strong>"</>
            ) : (
              "Vui lòng nhập từ khóa để tìm kiếm sản phẩm"
            )}
          </p>
        </div>

        {filteredProducts.length > 0 ? (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
            gap: '30px' 
          }}>
            {filteredProducts.map((p: any) => (
              <div key={p.id} className="glass-card" style={{ 
                textAlign: 'center', 
                display: 'flex', 
                flexDirection: 'column',
                padding: 0,
                overflow: 'hidden'
              }}>
                <Link href={`/san-pham/${p.id}`}>
                  <div style={{ height: '220px', width: '100%', overflow: 'hidden', position: 'relative', marginBottom: '15px' }}>
                    <SafeImage 
                      src={p.imageUrl} 
                      alt={p.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  </div>
                  <div style={{ padding: '0 20px' }}>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '10px', color: 'var(--text-color)', minHeight: '2.4em', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{p.name}</h3>
                  </div>
                </Link>
                <div style={{ padding: '0 20px 20px 20px', marginTop: 'auto' }}>
                  <p style={{ color: 'var(--primary-color)', fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '15px' }}>{p.price.toLocaleString('vi-VN')} đ</p>
                  <AddToCartButton product={p} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          query && (
            <div style={{ textAlign: 'center', padding: '100px 0' }}>
              <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🔍</div>
              <h3>Rất tiếc, chúng tôi không tìm thấy sản phẩm nào!</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>Hãy thử lại với từ khóa khác nhé.</p>
              <Link href="/san-pham" className="btn-primary">Xem Tất Cả Sản Phẩm</Link>
            </div>
          )
        )}
      </div>
    </main>
  );
}
