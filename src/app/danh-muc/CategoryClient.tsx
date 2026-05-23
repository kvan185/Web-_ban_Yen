'use client';

import { useState } from 'react';
import Link from 'next/link';
import AddToCartButton from '@/components/AddToCartButton';
import SafeImage from '@/components/SafeImage';

type CategoryClientProps = {
  products: any[];
  categories: any[];
  settings: any;
};

export default function CategoryClient({ products, categories, settings }: CategoryClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${settings.productsPerRow || 4}, 1fr)`,
    gap: '30px',
    marginTop: '40px'
  };

  return (
    <div className="container" style={{ padding: '60px 20px', minHeight: '80vh' }}>
      <h1 style={{ textAlign: 'center', fontSize: '3rem', marginBottom: '20px' }}>Danh Mục Sản Phẩm</h1>
      
      {/* Category Filter Buttons */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap', marginBottom: '40px' }}>
        <button
          onClick={() => setSelectedCategory('all')}
          style={{
            padding: '10px 24px',
            borderRadius: '30px',
            border: '1px solid var(--primary-color)',
            background: selectedCategory === 'all' ? 'var(--primary-color)' : 'transparent',
            color: selectedCategory === 'all' ? 'var(--bg-color)' : 'var(--primary-color)',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'all 0.3s'
          }}
        >
          Tất cả
        </button>
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.name)}
            style={{
              padding: '10px 24px',
              borderRadius: '30px',
              border: '1px solid var(--primary-color)',
              background: selectedCategory === cat.name ? 'var(--primary-color)' : 'transparent',
              color: selectedCategory === cat.name ? 'var(--bg-color)' : 'var(--primary-color)',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div style={gridStyle}>
        {filteredProducts.map((p: any) => (
          <div key={p.id} className="glass-card" style={{ 
            textAlign: 'center', 
            transition: 'transform 0.3s', 
            display: 'flex', 
            flexDirection: 'column',
            overflow: 'hidden',
            padding: 0
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
                <h3 style={{ fontSize: '1.2rem', marginBottom: '10px', color: 'var(--text-color)', cursor: 'pointer', minHeight: '2.4em', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{p.name}</h3>
              </div>
            </Link>
            <div style={{ padding: '0 20px 20px 20px', marginTop: 'auto' }}>
              <p style={{ color: 'var(--primary-color)', fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '15px' }}>{p.price.toLocaleString('vi-VN')} đ</p>
              <AddToCartButton product={p} />
            </div>
          </div>
        ))}
        {filteredProducts.length === 0 && (
          <p style={{ gridColumn: '1 / -1', textAlign: 'center', opacity: 0.5 }}>
            Không tìm thấy sản phẩm nào trong danh mục này.
          </p>
        )}
      </div>
    </div>
  );
}
