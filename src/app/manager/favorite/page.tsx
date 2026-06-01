'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type FavoriteProduct = {
  id: string;
  name: string;
  price: number;
  imageUrl?: string;
  description?: string;
  badge?: string;
};

export default function AdminFavoritePage() {
  const [favorites, setFavorites] = useState<FavoriteProduct[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('favoriteProducts');
    if (!stored) return;

    try {
      setFavorites(JSON.parse(stored));
    } catch {
      setFavorites([]);
    }
  }, []);

  const handleRemoveFavorite = (id: string, name: string) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa "${name}" khỏi danh sách yêu thích?`)) {
      const updated = favorites.filter((product) => product.id !== id);
      localStorage.setItem('favoriteProducts', JSON.stringify(updated));
      setFavorites(updated);
      window.dispatchEvent(new Event('favoritesUpdated'));
      alert(`Đã xóa "${name}" khỏi danh sách yêu thích!`);
    }
  };

  return (
    <div style={{ minHeight: '100vh', padding: '20px' }}>
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ fontSize: '2.2rem', color: 'var(--primary-color)', marginBottom: '10px' }}>
          Quản lý Sản phẩm Yêu thích
        </h1>
        <p style={{ color: 'rgba(245, 245, 245, 0.75)', fontSize: '1.05rem', lineHeight: '1.6' }}>
          Xem và quản lý danh sách các sản phẩm tổ yến được yêu thích và quan tâm nhiều nhất của khách hàng trên hệ thống.
        </p>
      </div>

      {favorites.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '25px' }}>
          {favorites.map((product) => (
            <div key={product.id} className="glass-card" style={{
              display: 'flex',
              flexDirection: 'column',
              borderRadius: '20px',
              padding: '24px',
              border: '1px solid rgba(255,255,255,0.08)',
              height: '100%',
              justifyContent: 'space-between'
            }}>
              <div>
                <div style={{
                  width: '100%',
                  height: '200px',
                  borderRadius: '14px',
                  overflow: 'hidden',
                  background: '#111',
                  marginBottom: '20px',
                  position: 'relative',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}>
                  <img
                    src={product.imageUrl || '/images/about-hero.png'}
                    alt={product.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  {product.badge && (
                    <span style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      fontSize: '0.75rem',
                      padding: '4px 10px',
                      borderRadius: '20px',
                      background: 'var(--primary-color)',
                      color: 'var(--bg-color)',
                      fontWeight: 'bold',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
                    }}>
                      {product.badge}
                    </span>
                  )}
                </div>

                <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '8px', lineHeight: '1.4' }}>
                  {product.name}
                </h3>

                <p style={{ color: 'var(--primary-color)', fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '15px' }}>
                  {product.price.toLocaleString('vi-VN')} đ
                </p>

                <p style={{
                  opacity: 0.8,
                  fontSize: '0.9rem',
                  lineHeight: '1.6',
                  marginBottom: '20px',
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {product.description}
                </p>
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
                <Link
                  href={`/products/${product.id}`}
                  style={{
                    flex: 1.5,
                    padding: '10px 15px',
                    borderRadius: '8px',
                    border: '1px solid var(--primary-color)',
                    background: 'rgba(212, 175, 55, 0.1)',
                    color: 'var(--primary-color)',
                    textAlign: 'center',
                    fontWeight: '600',
                    fontSize: '0.9rem',
                    transition: 'all 0.2s'
                  }}
                >
                  Xem chi tiết
                </Link>
                <button
                  onClick={() => handleRemoveFavorite(product.id, product.name)}
                  style={{
                    flex: 1,
                    padding: '10px 15px',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 77, 77, 0.3)',
                    background: 'rgba(255, 77, 77, 0.1)',
                    color: '#ff4d4d',
                    cursor: 'pointer',
                    fontWeight: '600',
                    fontSize: '0.9rem',
                    transition: 'all 0.2s'
                  }}
                >
                  Bỏ thích
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="glass-card" style={{ padding: '50px 30px', textAlign: 'center', borderRadius: '20px' }}>
          <h3 style={{ fontSize: '1.4rem', color: '#fff', marginBottom: '10px' }}>Chưa có sản phẩm yêu thích nào</h3>
          <p style={{ opacity: 0.7, maxWidth: '500px', margin: '0 auto 25px' }}>
            Khách hàng chưa đánh dấu yêu thích bất kỳ sản phẩm nào. Hãy khám phá ngay các loại tổ yến thô và tinh chế thượng hạng.
          </p>
          <Link href="/products" className="btn-primary" style={{ display: 'inline-block', padding: '12px 30px' }}>
            Xem danh sách sản phẩm
          </Link>
        </div>
      )}
    </div>
  );
}
