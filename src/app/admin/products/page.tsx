'use client';

import { useState, useEffect } from 'react';

type Product = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
};

export default function ProductsAdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploadingId, setUploadingId] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  const uploadImage = async (id: string, file: File | null) => {
    if (!file) return;
    setUploadingId(id);

    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();
    setUploadingId(null);

    if (!response.ok || !result.imageUrl) {
      alert('Tải hình ảnh thất bại. Vui lòng thử lại.');
      return;
    }

    updateProduct(id, 'imageUrl', result.imageUrl);
  };

  const addProduct = () => {
    const id = Date.now().toString();
    setProducts([...products, { id, name: 'Sản phẩm mới', price: 0, imageUrl: '' }]);
  };

  const updateProduct = (id: string, field: keyof Product, value: string | number) => {
    setProducts(products.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const deleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const handleSave = async () => {
    await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(products),
    });
    alert('Đã lưu danh sách sản phẩm');
  };

  if (loading) return <div>Đang tải...</div>;

  return (
    <div className="glass-card">
      <h2 style={{ marginBottom: '20px' }}>Quản lý Sản phẩm (JSON)</h2>
      
      <button onClick={addProduct} className="btn-primary" style={{ marginBottom: '20px' }}>
        + Thêm Sản Phẩm
      </button>

      <div style={{ display: 'grid', gap: '15px' }}>
        {products.map(product => (
          <div key={product.id} style={{ display: 'grid', gridTemplateColumns: '1fr 200px 1fr auto', gap: '10px', alignItems: 'center', background: 'rgba(0,0,0,0.2)', padding: '10px', borderRadius: '4px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '10px', overflow: 'hidden', background: '#111' }}>
                <img
                  src={product.imageUrl || '/images/about-hero.png'}
                  alt={product.name || 'Ảnh sản phẩm'}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
              <label style={{ display: 'flex', flexDirection: 'column', gap: '4px', width: '100%' }}>
                <span style={{ fontSize: '0.85rem', opacity: 0.8 }}>Tên sản phẩm</span>
                <input 
                  value={product.name} 
                  onChange={e => updateProduct(product.id, 'name', e.target.value)} 
                  placeholder="Tên sản phẩm"
                  style={{ width: '100%', padding: '8px' }}
                />
              </label>
            </div>
            <div>
              <label style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ fontSize: '0.85rem', opacity: 0.8 }}>Giá</span>
                <input 
                  type="number" 
                  value={product.price} 
                  onChange={e => updateProduct(product.id, 'price', parseInt(e.target.value) || 0)} 
                  placeholder="Giá"
                  style={{ width: '100%', padding: '8px' }}
                />
              </label>
            </div>
            <div style={{ display: 'grid', gap: '10px' }}>
              <label style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ fontSize: '0.85rem', opacity: 0.8 }}>URL Ảnh</span>
                <input 
                  value={product.imageUrl} 
                  onChange={e => updateProduct(product.id, 'imageUrl', e.target.value)} 
                  placeholder="URL Hình ảnh"
                  style={{ width: '100%', padding: '8px' }}
                />
              </label>
              <label style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ fontSize: '0.85rem', opacity: 0.8 }}>Hoặc tải ảnh</span>
                <input 
                  type="file"
                  accept="image/*"
                  onChange={e => uploadImage(product.id, e.target.files?.[0] ?? null)}
                  style={{ width: '100%' }}
                />
              </label>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'flex-end' }}>
              <button onClick={() => deleteProduct(product.id)} style={{ padding: '8px 12px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '4px' }}>Xóa</button>
              {uploadingId === product.id ? (
                <span style={{ color: '#fff', fontSize: '0.9rem' }}>Đang tải ảnh...</span>
              ) : null}
            </div>
          </div>
        ))}
      </div>

      <button onClick={handleSave} className="btn-primary" style={{ marginTop: '20px', background: '#28a745' }}>
        Lưu Tất Cả
      </button>
    </div>
  );
}
