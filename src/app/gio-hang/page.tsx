'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CartPage() {
  const [cart, setCart] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(savedCart);
    setLoading(false);
  }, []);

  const updateQuantity = (id: string, delta: number) => {
    const newCart = cart.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    });
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const removeItem = (id: string) => {
    const newCart = cart.filter(item => item.id !== id);
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (loading) return <div className="container" style={{ padding: '100px' }}>Đang tải...</div>;

  return (
    <div className="container" style={{ padding: '60px 20px', minHeight: '80vh' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '40px' }}>Giỏ Hàng Của Bạn</h1>

      {cart.length === 0 ? (
        <div className="glass-card" style={{ textAlign: 'center', padding: '60px' }}>
          <p style={{ fontSize: '1.2rem', marginBottom: '20px', opacity: 0.7 }}>Giỏ hàng của bạn đang trống.</p>
          <Link href="/san-pham" className="btn-primary">Mua Sắm Ngay</Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '40px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {cart.map(item => (
              <div key={item.id} className="glass-card" style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                <div style={{ width: '100px', height: '100px', background: `url(${item.imageUrl}) center/cover`, borderRadius: '8px' }}></div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '1.2rem' }}>{item.name}</h3>
                  <p style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>{item.price.toLocaleString('vi-VN')} đ</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <button onClick={() => updateQuantity(item.id, -1)} style={{ width: '30px', height: '30px', borderRadius: '50%', border: '1px solid var(--primary-color)', background: 'transparent', color: 'white' }}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)} style={{ width: '30px', height: '30px', borderRadius: '50%', border: '1px solid var(--primary-color)', background: 'transparent', color: 'white' }}>+</button>
                </div>
                <button onClick={() => removeItem(item.id)} style={{ color: '#ff4d4d', background: 'transparent', border: 'none', cursor: 'pointer' }}>Xóa</button>
              </div>
            ))}
          </div>

          <div className="glass-card" style={{ height: 'fit-content' }}>
            <h2 style={{ marginBottom: '20px' }}>Tổng Đơn Hàng</h2>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span>Tạm tính:</span>
              <span>{totalPrice.toLocaleString('vi-VN')} đ</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', fontSize: '1.2rem', fontWeight: 'bold' }}>
              <span>Tổng cộng:</span>
              <span style={{ color: 'var(--primary-color)' }}>{totalPrice.toLocaleString('vi-VN')} đ</span>
            </div>
            <button className="btn-primary" style={{ width: '100%', padding: '15px' }} onClick={() => alert('Chức năng đặt hàng sẽ được cập nhật ở bản PRO!')}>
              TIẾN HÀNH THANH TOÁN
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
