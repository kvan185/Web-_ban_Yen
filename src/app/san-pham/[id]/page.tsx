'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
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

  if (loading) return <div className="container" style={{ padding: '100px' }}>Đang tải...</div>;
  if (!product) return <div className="container" style={{ padding: '100px' }}>Sản phẩm không tồn tại.</div>;

  return (
    <div className="container" style={{ padding: '60px 20px', minHeight: '80vh' }}>
      <Link href="/san-pham" style={{ color: 'var(--primary-color)', marginBottom: '20px', display: 'inline-block' }}>
        &larr; Quay lại danh sách sản phẩm
      </Link>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '50px', marginTop: '20px' }}>
        <div style={{ 
          height: '500px', 
          background: `url(${product.imageUrl}) center/cover`, 
          borderRadius: '12px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
        }}></div>

        <div>
          <h1 style={{ fontSize: '3rem', marginBottom: '10px' }}>{product.name}</h1>
          <p style={{ color: 'var(--primary-color)', fontSize: '2rem', fontWeight: 'bold', marginBottom: '30px' }}>
            {product.price.toLocaleString('vi-VN')} đ
          </p>
          
          <div className="glass-card" style={{ marginBottom: '30px' }}>
            <h3 style={{ marginBottom: '10px', color: 'var(--primary-color)' }}>Mô tả sản phẩm</h3>
            <p style={{ opacity: 0.9, lineHeight: '1.8' }}>{product.description || 'Đang cập nhật nội dung chi tiết cho sản phẩm này.'}</p>
          </div>

          <div style={{ display: 'flex', gap: '20px' }}>
            <button className="btn-primary" style={{ padding: '15px 40px', fontSize: '1.2rem' }} onClick={addToCart}>
              Thêm Vào Giỏ Hàng
            </button>
            <button className="btn-primary" style={{ background: 'transparent', border: '2px solid var(--primary-color)', color: 'var(--primary-color)', padding: '15px 40px', fontSize: '1.2rem' }}>
              Mua Ngay
            </button>
          </div>

          <div style={{ marginTop: '40px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px' }}>
            <p style={{ opacity: 0.7 }}>✓ Cam kết yến sào nguyên chất 100%</p>
            <p style={{ opacity: 0.7 }}>✓ Giao hàng hỏa tốc tại TP.HCM trong 2h</p>
            <p style={{ opacity: 0.7 }}>✓ Đổi trả miễn phí nếu không hài lòng</p>
          </div>
        </div>
      </div>
    </div>
  );
}
