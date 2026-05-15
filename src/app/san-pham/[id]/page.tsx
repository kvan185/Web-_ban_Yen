'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import SafeImage from '@/components/SafeImage';

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [product, setProduct] = useState<any>(null);
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setAllProducts(data);
        const p = data.find((item: any) => item.id === id);
        setProduct(p);
        setLoading(false);
      });
  }, [id]);

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existing = cart.find((item: any) => item.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cartUpdated'));
    alert(`Đã thêm ${product.name} vào giỏ hàng!`);
  };

  if (loading) return <div className="container" style={{ padding: '100px', textAlign: 'center' }}>Đang tải thông tin sản phẩm...</div>;
  if (!product) return <div className="container" style={{ padding: '100px', textAlign: 'center' }}>Sản phẩm không tồn tại.</div>;

  const relatedProducts = allProducts.filter(p => p.id !== product.id).slice(0, 4);

  return (
    <div className="product-detail-page">
      <div className="container" style={{ padding: '40px 20px' }}>
        <nav style={{ marginBottom: '30px', opacity: 0.7 }}>
          <Link href="/">Trang chủ</Link> / <Link href="/san-pham">Sản phẩm</Link> / <span style={{ color: 'var(--primary-color)' }}>{product.name}</span>
        </nav>

        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '60px' }}>
          {/* Image Gallery */}
          <div style={{ position: 'relative' }}>
          <div style={{ position: 'relative', height: '550px', overflow: 'hidden', borderRadius: '15px', boxShadow: '0 15px 40px rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <SafeImage 
              src={product.imageUrl} 
              alt={product.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
            {product.badge && (
              <div className={`badge ${product.badge === 'Giảm giá' ? 'badge-sale' : 'badge-best'}`} style={{ top: '20px', left: '20px', padding: '8px 20px', fontSize: '1rem' }}>
                {product.badge}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <h1 style={{ fontSize: '3.2rem', marginBottom: '15px', lineHeight: '1.2' }}>{product.name}</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '25px' }}>
              <div style={{ color: '#F1C40F', fontSize: '1.2rem' }}>⭐⭐⭐⭐⭐</div>
              <span style={{ opacity: 0.6 }}>(12 đánh giá)</span>
              <span style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>| Đã bán 150+</span>
            </div>
            
            <p style={{ color: 'var(--primary-color)', fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '30px' }}>
              {product.price.toLocaleString('vi-VN')} đ
            </p>
            
            <div className="glass-card" style={{ marginBottom: '35px' }}>
              <p style={{ opacity: 0.9, lineHeight: '1.8', fontSize: '1.05rem' }}>{product.description}</p>
            </div>

            <div style={{ display: 'flex', gap: '20px', marginBottom: '40px' }}>
              <button className="btn-primary" style={{ padding: '18px 50px', fontSize: '1.2rem', flex: 1 }} onClick={addToCart}>
                Thêm Vào Giỏ Hàng
              </button>
              <button className="btn-primary" style={{ background: 'transparent', border: '2px solid var(--primary-color)', color: 'var(--primary-color)', padding: '18px 50px', fontSize: '1.2rem' }}>
                Mua Ngay
              </button>
            </div>

            <div style={{ gridTemplateColumns: '1fr 1fr', display: 'grid', gap: '20px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '30px' }}>
              <div>
                <p style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                  <span style={{ color: 'var(--primary-color)' }}>🛡️</span> Cam kết nguyên chất 100%
                </p>
                <p style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ color: 'var(--primary-color)' }}>🚚</span> Giao nhanh 2h tại TP.HCM
                </p>
              </div>
              <div>
                <p style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                  <span style={{ color: 'var(--primary-color)' }}>🔄</span> Đổi trả trong 7 ngày
                </p>
                <p style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ color: 'var(--primary-color)' }}>💰</span> Thanh toán khi nhận hàng
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs-like structure */}
        <div style={{ marginTop: '80px' }}>
          <div style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', marginBottom: '40px', display: 'flex', gap: '40px' }}>
            <h2 style={{ borderBottom: '3px solid var(--primary-color)', paddingBottom: '15px', color: 'var(--primary-color)' }}>Chi tiết sản phẩm</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '60px' }}>
            <div className="glass-card">
              <h3 style={{ marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px' }}>Thông số kỹ thuật</h3>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <tbody>
                  {[
                    ['Trọng lượng', product.weight || '100g'],
                    ['Xuất xứ', product.origin || 'Việt Nam'],
                    ['Hạn sử dụng', product.shelfLife || '24 tháng'],
                    ['Phân loại', product.category || 'Yến Sào'],
                    ['Tình trạng', 'Còn hàng']
                  ].map(([label, value], i) => (
                    <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <td style={{ padding: '12px 0', fontWeight: '600', opacity: 0.7 }}>{label}</td>
                      <td style={{ padding: '12px 0', textAlign: 'right' }}>{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="glass-card">
              <h3 style={{ marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px' }}>Hướng dẫn sử dụng</h3>
              <p style={{ lineHeight: '1.8', opacity: 0.9 }}>{product.usage || 'Ngâm yến trong nước sạch khoảng 30 phút cho đến khi sợi yến nở đều. Sau đó chưng cách thủy cùng đường phèn, táo đỏ hoặc hạt sen trong khoảng 20-30 phút.'}</p>
              <div style={{ marginTop: '20px', padding: '15px', backgroundColor: 'rgba(212, 175, 55, 0.1)', borderRadius: '8px', borderLeft: '4px solid var(--primary-color)' }}>
                <strong>Mẹo hay:</strong> Nên ăn yến vào buổi sáng sớm hoặc 30 phút trước khi đi ngủ để cơ thể hấp thụ dưỡng chất tốt nhất.
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div style={{ marginTop: '100px' }}>
          <div className="section-title-wrapper" style={{ textAlign: 'left' }}>
            <h2 className="section-title">Sản Phẩm Tương Tự</h2>
          </div>
          <div className="grid-4">
            {relatedProducts.map((p: any) => (
              <div key={p.id} className="glass-card" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', height: '100%' }}>
                <Link href={`/san-pham/${p.id}`}>
                  <div style={{ 
                    height: '200px', 
                    width: '100%',
                    overflow: 'hidden',
                    borderRadius: '8px', 
                    marginBottom: '15px'
                  }}>
                    <SafeImage 
                      src={p.imageUrl} 
                      alt={p.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>{p.name}</h3>
                </Link>
                <p style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>{p.price.toLocaleString('vi-VN')} đ</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
