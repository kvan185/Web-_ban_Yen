import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import AddToCartButton from '@/components/AddToCartButton';

export default function Home() {
  const productsFilePath = path.join(process.cwd(), 'src', 'data', 'products.json');
  let products = [];
  try {
    if (fs.existsSync(productsFilePath)) {
      products = JSON.parse(fs.readFileSync(productsFilePath, 'utf8'));
    }
  } catch (e) {
    console.error(e);
  }

  const settingsFilePath = path.join(process.cwd(), 'src', 'data', 'settings.json');
  let settings = { productsPerRow: 4 };
  try {
    if (fs.existsSync(settingsFilePath)) {
      settings = JSON.parse(fs.readFileSync(settingsFilePath, 'utf8'));
    }
  } catch (e) {
    console.error(e);
  }

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${settings.productsPerRow}, 1fr)`,
    gap: '30px',
    marginTop: '40px'
  };

  return (
    <div>
      <section style={{ 
        height: '60vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        textAlign: 'center',
        background: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(https://images.unsplash.com/photo-1610488974577-c35048d88e04?q=80&w=2000&auto=format&fit=crop) center/cover'
      }}>
        <div>
          <h1 style={{ fontSize: '4rem', marginBottom: '20px', color: 'var(--primary-color)' }}>Thượng Yến</h1>
          <p style={{ fontSize: '1.5rem', marginBottom: '30px', opacity: 0.9 }}>Tinh hoa yến sào nguyên chất từ thiên nhiên</p>
          <Link href="/san-pham" className="btn-primary" style={{ fontSize: '1.2rem' }}>
            Khám Phá Ngay
          </Link>
        </div>
      </section>

      <section className="container" style={{ padding: '80px 20px' }}>
        <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '10px' }}>Sản Phẩm Nổi Bật</h2>
        <p style={{ textAlign: 'center', opacity: 0.7 }}>Những sản phẩm yến sào được khách hàng ưa chuộng nhất</p>
        
        <div style={gridStyle}>
          {products.slice(0, settings.productsPerRow * 2).map((p: any) => (
            <div key={p.id} className="glass-card" style={{ textAlign: 'center', transition: 'transform 0.3s', display: 'flex', flexDirection: 'column' }}>
              <Link href={`/san-pham/${p.id}`}>
                <div style={{ height: '200px', background: p.imageUrl ? `url(${p.imageUrl}) center/cover` : 'rgba(255,255,255,0.1)', borderRadius: '4px', marginBottom: '15px', cursor: 'pointer' }}></div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '10px', color: 'var(--text-color)', cursor: 'pointer' }}>{p.name}</h3>
              </Link>
              <p style={{ color: 'var(--primary-color)', fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '15px' }}>{p.price.toLocaleString('vi-VN')} đ</p>
              <div style={{ marginTop: 'auto' }}>
                <AddToCartButton product={p} />
              </div>
            </div>
          ))}
          {products.length === 0 && <p style={{ gridColumn: '1 / -1', textAlign: 'center', opacity: 0.5 }}>Chưa có sản phẩm nào. Vui lòng thêm trong Admin.</p>}
        </div>
      </section>
    </div>
  );
}
