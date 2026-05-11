import fs from 'fs';
import path from 'path';

export const metadata = {
  title: 'Sản Phẩm - Thượng Yến',
  description: 'Danh sách các sản phẩm yến sào nguyên chất, yến tinh chế, yến hũ.',
};

export default function ProductsPage() {
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
    <div className="container" style={{ padding: '60px 20px', minHeight: '80vh' }}>
      <h1 style={{ textAlign: 'center', fontSize: '3rem', marginBottom: '20px' }}>Tất Cả Sản Phẩm</h1>
      <p style={{ textAlign: 'center', opacity: 0.7, marginBottom: '40px' }}>Mang tinh hoa yến sào đến gia đình bạn</p>

      <div style={gridStyle}>
        {products.map((p: any) => (
          <div key={p.id} className="glass-card" style={{ textAlign: 'center', transition: 'transform 0.3s' }}>
            <div style={{ height: '200px', background: p.imageUrl ? `url(${p.imageUrl}) center/cover` : 'rgba(255,255,255,0.1)', borderRadius: '4px', marginBottom: '15px' }}></div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '10px', color: 'var(--text-color)' }}>{p.name}</h3>
            <p style={{ color: 'var(--primary-color)', fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '15px' }}>{p.price.toLocaleString('vi-VN')} đ</p>
            <button className="btn-primary" style={{ width: '100%' }}>Thêm Vào Giỏ</button>
          </div>
        ))}
        {products.length === 0 && <p style={{ gridColumn: '1 / -1', textAlign: 'center', opacity: 0.5 }}>Chưa có sản phẩm nào. Vui lòng thêm trong Admin.</p>}
      </div>
    </div>
  );
}
