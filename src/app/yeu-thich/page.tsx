'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import SafeImage from '@/components/SafeImage';
import { FavoriteProduct, parseStorageArray } from '@/lib/storage';

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<FavoriteProduct[]>([]);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setFavorites(parseStorageArray<FavoriteProduct>(localStorage.getItem('favoriteProducts')));
    }, 0);

    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <div style={{ minHeight: '100vh', padding: '40px' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <h1>Sản phẩm yêu thích</h1>
        <p style={{ marginBottom: '24px', color: 'rgba(255,255,255,0.8)' }}>
          Danh sách sản phẩm bạn đã đánh dấu yêu thích. Nếu chưa có sản phẩm nào, bạn có thể tạo danh sách yêu thích bằng cách duyệt sản phẩm.
        </p>

        {favorites.length > 0 ? (
          <div style={{ display: 'grid', gap: '20px' }}>
            {favorites.map((product) => (
              <div key={product.id} className="glass-card" style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '20px', alignItems: 'center' }}>
                <SafeImage src={product.imageUrl || '/images/about-hero.png'} alt={product.name} style={{ width: '120px', height: '120px', borderRadius: '14px', objectFit: 'contain' }} />
                <div>
                  <h2 style={{ marginBottom: '10px' }}>{product.name}</h2>
                  <p style={{ color: 'var(--primary-color)', fontWeight: '700' }}>{product.price.toLocaleString('vi-VN')} đ</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="glass-card" style={{ padding: '30px', textAlign: 'center' }}>
            <p>Hiện chưa có sản phẩm yêu thích.</p>
            <Link href="/san-pham" className="btn-primary" style={{ marginTop: '20px', display: 'inline-block' }}>
              Xem sản phẩm
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
