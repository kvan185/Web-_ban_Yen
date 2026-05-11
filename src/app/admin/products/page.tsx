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

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

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
          <div key={product.id} style={{ display: 'flex', gap: '10px', background: 'rgba(0,0,0,0.2)', padding: '10px', borderRadius: '4px' }}>
            <input 
              value={product.name} 
              onChange={e => updateProduct(product.id, 'name', e.target.value)} 
              placeholder="Tên sản phẩm"
              style={{ flex: 1, padding: '8px' }}
            />
            <input 
              type="number" 
              value={product.price} 
              onChange={e => updateProduct(product.id, 'price', parseInt(e.target.value))} 
              placeholder="Giá"
              style={{ width: '120px', padding: '8px' }}
            />
            <input 
              value={product.imageUrl} 
              onChange={e => updateProduct(product.id, 'imageUrl', e.target.value)} 
              placeholder="URL Hình ảnh"
              style={{ flex: 1, padding: '8px' }}
            />
            <button onClick={() => deleteProduct(product.id)} style={{ padding: '8px 12px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '4px' }}>Xóa</button>
          </div>
        ))}
      </div>

      <button onClick={handleSave} className="btn-primary" style={{ marginTop: '20px', background: '#28a745' }}>
        Lưu Tất Cả
      </button>
    </div>
  );
}
