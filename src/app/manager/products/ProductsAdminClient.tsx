'use client';

import { useState, useEffect } from 'react';

type Product = {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  description: string;
  shortDescription?: string;
  features?: string;
  productInfo?: string;
  targetUsers?: string;
  usageGuide?: string;
  badge?: string;
  weight?: string;
  origin?: string;
  shelfLife?: string;
  usage?: string;
  category?: string;
};

const DEFAULT_PRODUCT: Product = {
  id: '',
  name: '',
  price: 0,
  originalPrice: 0,
  imageUrl: '',
  description: '',
  shortDescription: '',
  features: '',
  productInfo: '',
  targetUsers: '',
  usageGuide: '',
  badge: '',
  weight: '100g',
  origin: 'Tiền Giang',
  shelfLife: '12 tháng',
  usage: 'Ngâm nước 20-30 phút cho mềm, sau đó đem chưng cách thủy khoảng 20-30 phút.',
  category: 'Yến Tinh Hoa',
};

type ProductsAdminClientProps = {
  initialProducts: Product[];
  initialCategories: {id: string, name: string}[];
  initialProductsPerPage: number;
};

const listFromText = (value?: string) => (value || '').split('\n').map(item => item.trim()).filter(Boolean);
const BADGE_OPTIONS = ['Bán chạy', 'Cao cấp', 'Thượng hạng', 'Mới', 'Quà tặng', 'Nguyên chất 100%', 'Tiết kiệm', 'Mẹ Bầu', 'Dưỡng Nhan', 'Premium'];

export default function ProductsAdminClient({
  initialProducts,
  initialCategories,
  initialProductsPerPage,
}: ProductsAdminClientProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [categories, setCategories] = useState<{id: string, name: string}[]>(initialCategories);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(initialProductsPerPage);

  // Modal states
  const [viewProduct, setViewProduct] = useState<Product | null>(null);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [previewImage, setPreviewImage] = useState<Product | null>(null);
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    // Fetch products
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
      })
      .catch(() => {})
      .catch(() => {});

    // Fetch settings
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        if (data.adminProductsPerPage) {
          setProductsPerPage(data.adminProductsPerPage);
        }
      })
      .catch(() => {});

    // Fetch categories
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(() => {});
  }, []);

  const saveProductsList = async (updatedProducts: Product[]) => {
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProducts),
      });
      if (!res.ok) {
        throw new Error('Lưu thất bại');
      }
      return true;
    } catch (err) {
      alert('Lưu dữ liệu lên máy chủ thất bại!');
      return false;
    }
  };

  const handleUploadImage = async (file: File | null) => {
    if (!file || !editProduct) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      if (!response.ok || !result.imageUrl) {
        alert('Tải hình ảnh thất bại. Vui lòng thử lại.');
        return;
      }

      setEditProduct({ ...editProduct, imageUrl: result.imageUrl });
    } catch (err) {
      alert('Đã xảy ra lỗi khi tải ảnh.');
    }
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editProduct) return;

    let updatedProductsList: Product[];

    if (isNew) {
      const newId = 'p_' + Date.now();
      const productToAdd = { ...editProduct, id: newId };
      updatedProductsList = [...products, productToAdd];
    } else {
      updatedProductsList = products.map(p => p.id === editProduct.id ? editProduct : p);
    }

    // Call API immediately
    const success = await saveProductsList(updatedProductsList);
    if (success) {
      setProducts(updatedProductsList);
      setEditProduct(null);
      alert(isNew ? 'Đã thêm sản phẩm thành công!' : 'Đã cập nhật sản phẩm thành công!');
    }
  };

  const handleDeleteProduct = async (id: string, name: string) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa sản phẩm "${name}"?`)) {
      const updatedProductsList = products.filter(p => p.id !== id);
      const success = await saveProductsList(updatedProductsList);
      if (success) {
        setProducts(updatedProductsList);
        // Correct pagination page if out of bounds
        const newTotalPages = Math.ceil(updatedProductsList.length / productsPerPage);
        if (currentPage > newTotalPages && newTotalPages > 0) {
          setCurrentPage(newTotalPages);
        }
        alert('Đã xóa sản phẩm thành công!');
      }
    }
  };

  const openEditModal = (product: Product) => {
    setEditProduct({ ...product });
    setIsNew(false);
  };

  const openAddModal = () => {
    setEditProduct({ ...DEFAULT_PRODUCT });
    setIsNew(true);
  };

  // Pagination Math
  const totalPages = Math.ceil(products.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <>
    <div className="glass-card" style={{ padding: '35px', borderRadius: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', flexWrap: 'wrap', gap: '20px' }}>
        <div>
          <h2 style={{ fontSize: '2rem', color: 'var(--primary-color)', marginBottom: '5px' }}>Quản lý Sản phẩm</h2>
          <p style={{ opacity: 0.7, fontSize: '0.95rem' }}>Quản lý danh sách sản phẩm hiển thị trên website</p>
        </div>
        <button onClick={openAddModal} className="btn-primary" style={{ padding: '12px 24px', borderRadius: '12px', fontSize: '0.95rem' }}>
          + Thêm Sản Phẩm Mới
        </button>
      </div>

      {/* Table Display of Products */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px' }}>
              <th style={{ padding: '15px 10px', opacity: 0.8, fontWeight: 600 }}>Ảnh</th>
              <th style={{ padding: '15px 10px', opacity: 0.8, fontWeight: 600 }}>Tên sản phẩm</th>
              <th style={{ padding: '15px 10px', opacity: 0.8, fontWeight: 600 }}>Phân loại</th>
              <th style={{ padding: '15px 10px', opacity: 0.8, fontWeight: 600, textAlign: 'right' }}>Giá</th>
              <th style={{ padding: '15px 10px', opacity: 0.8, fontWeight: 600, textAlign: 'center' }}>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.length > 0 ? (
              currentProducts.map(product => (
                <tr key={product.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', transition: 'background 0.2s' }} className="table-row-hover">
                  <td style={{ padding: '15px 10px' }}>
                    <div style={{ width: '60px', height: '60px', borderRadius: '10px', overflow: 'hidden', background: '#111', border: '1px solid rgba(255,255,255,0.1)' }}>
                      <img
                        src={product.imageUrl || '/images/about-hero.png'}
                        alt={product.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                  </td>
                  <td style={{ padding: '15px 10px', fontWeight: '500', maxWidth: '250px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {product.name}
                    {product.badge && (
                      <span style={{ 
                        marginLeft: '8px', 
                        fontSize: '0.75rem', 
                        padding: '2px 8px', 
                        borderRadius: '20px', 
                        background: 'rgba(212, 175, 55, 0.2)', 
                        color: 'var(--primary-color)',
                        border: '1px solid var(--primary-color)',
                        fontWeight: 600
                      }}>
                        {product.badge}
                      </span>
                    )}
                  </td>
                  <td style={{ padding: '15px 10px', opacity: 0.8 }}>{product.category || 'Yến Tinh Hoa'}</td>
                  <td style={{ padding: '15px 10px', textAlign: 'right' }}>
                    {product.originalPrice && product.originalPrice > product.price && (
                      <div style={{ color: 'rgba(255,255,255,0.48)', fontSize: '0.82rem', textDecoration: 'line-through' }}>
                        {product.originalPrice.toLocaleString('vi-VN')} đ
                      </div>
                    )}
                    <strong style={{ color: 'var(--primary-color)' }}>{product.price.toLocaleString('vi-VN')} đ</strong>
                  </td>
                  <td style={{ padding: '15px 10px', textAlign: 'center' }}>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                      <button 
                        onClick={() => setViewProduct(product)} 
                        style={{ 
                          padding: '6px 12px', 
                          background: 'rgba(255,255,255,0.08)', 
                          color: '#fff', 
                          border: '1px solid rgba(255,255,255,0.12)', 
                          borderRadius: '6px', 
                          cursor: 'pointer' 
                        }}
                      >
                        Xem
                      </button>
                      <button 
                        onClick={() => openEditModal(product)} 
                        style={{ 
                          padding: '6px 12px', 
                          background: 'rgba(212, 175, 55, 0.15)', 
                          color: 'var(--primary-color)', 
                          border: '1px solid var(--primary-color)', 
                          borderRadius: '6px', 
                          cursor: 'pointer',
                          fontWeight: 600
                        }}
                      >
                        Sửa
                      </button>
                      <button 
                        onClick={() => handleDeleteProduct(product.id, product.name)} 
                        style={{ 
                          padding: '6px 12px', 
                          background: 'rgba(255, 77, 77, 0.15)', 
                          color: '#ff4d4d', 
                          border: '1px solid rgba(255, 77, 77, 0.3)', 
                          borderRadius: '6px', 
                          cursor: 'pointer' 
                        }}
                      >
                        Xóa
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} style={{ padding: '30px 10px', textAlign: 'center', opacity: 0.6 }}>Không có sản phẩm nào.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Beautiful Pagination Bar */}
      {totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', marginTop: '30px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <button 
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            style={{ 
              padding: '8px 16px', 
              background: currentPage === 1 ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.06)', 
              border: '1px solid rgba(255,255,255,0.1)', 
              color: currentPage === 1 ? 'rgba(255,255,255,0.3)' : '#fff',
              borderRadius: '8px', 
              cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
            }}
          >
            Trước
          </button>
          
          {Array.from({ length: totalPages }).map((_, idx) => {
            const pageNum = idx + 1;
            const isActive = pageNum === currentPage;
            return (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '8px',
                  border: '1px solid',
                  borderColor: isActive ? 'var(--primary-color)' : 'rgba(255,255,255,0.1)',
                  background: isActive ? 'var(--primary-color)' : 'rgba(255,255,255,0.05)',
                  color: isActive ? 'var(--bg-color)' : '#fff',
                  fontWeight: isActive ? 'bold' : 'normal',
                  cursor: 'pointer',
                  boxShadow: isActive ? '0 0 10px rgba(212,175,55,0.4)' : 'none',
                  transition: 'all 0.2s'
                }}
              >
                {pageNum}
              </button>
            );
          })}

          <button 
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            style={{ 
              padding: '8px 16px', 
              background: currentPage === totalPages ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.06)', 
              border: '1px solid rgba(255,255,255,0.1)', 
              color: currentPage === totalPages ? 'rgba(255,255,255,0.3)' : '#fff',
              borderRadius: '8px', 
              cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
            }}
          >
            Sau
          </button>
        </div>
      )}

    </div>

      {/* POPUP MODAL: VIEW DETAILS */}
      {viewProduct && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0,0,0,0.75)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999,
          padding: '20px'
        }}>
          <div className="glass-card" style={{
            width: '100%',
            maxWidth: '650px',
            borderRadius: '24px',
            padding: '30px',
            maxHeight: '90vh',
            overflowY: 'auto',
            border: '1px solid var(--primary-color)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '15px', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.5rem', color: 'var(--primary-color)' }}>Chi Tiết Sản Phẩm</h3>
              <button 
                onClick={() => setViewProduct(null)} 
                style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: '1.5rem', cursor: 'pointer' }}
              >
                &times;
              </button>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: '25px', flexWrap: 'wrap' }}>
              <div style={{ width: '200px', height: '200px', borderRadius: '15px', overflow: 'hidden', background: '#111', border: '1px solid rgba(255,255,255,0.1)' }}>
                <img
                  src={viewProduct.imageUrl || '/images/about-hero.png'}
                  alt={viewProduct.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <h4 style={{ fontSize: '1.4rem', color: '#fff' }}>{viewProduct.name}</h4>
                <div>
                  {viewProduct.originalPrice && viewProduct.originalPrice > viewProduct.price && (
                    <p style={{ color: 'rgba(255,255,255,0.48)', textDecoration: 'line-through' }}>
                      {viewProduct.originalPrice.toLocaleString('vi-VN')} đ
                    </p>
                  )}
                  <p style={{ fontSize: '1.3rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>
                    {viewProduct.price.toLocaleString('vi-VN')} đ
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', fontSize: '0.9rem', opacity: 0.85 }}>
                  <span><strong>Phân loại:</strong> {viewProduct.category || 'Yến Tinh Hoa'}</span>
                  <span><strong>Trọng lượng:</strong> {viewProduct.weight || '100g'}</span>
                  <span><strong>Xuất xứ:</strong> {viewProduct.origin || 'Việt Nam'}</span>
                </div>
                {viewProduct.badge && (
                  <div>
                    <span style={{ 
                      fontSize: '0.75rem', 
                      padding: '3px 10px', 
                      borderRadius: '20px', 
                      background: 'rgba(212, 175, 55, 0.2)', 
                      color: 'var(--primary-color)',
                      border: '1px solid var(--primary-color)',
                      fontWeight: 600
                    }}>
                      {viewProduct.badge}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div style={{ marginTop: '25px', display: 'grid', gap: '15px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '20px' }}>
              <div>
                <strong style={{ display: 'block', marginBottom: '5px', color: 'var(--primary-color)' }}>Mô tả ngắn:</strong>
                <p style={{ opacity: 0.85, fontSize: '0.95rem', lineHeight: 1.6 }}>{viewProduct.shortDescription || viewProduct.description || 'Chưa có mô tả.'}</p>
              </div>
              {[
                ['Đặc điểm nổi bật', viewProduct.features],
                ['Thông tin sản phẩm', viewProduct.productInfo],
                ['Đối tượng sử dụng', viewProduct.targetUsers],
                ['Hướng dẫn sử dụng', viewProduct.usageGuide || viewProduct.usage],
              ].map(([title, value]) => {
                const items = listFromText(value);
                return (
                  <div key={title}>
                    <strong style={{ display: 'block', marginBottom: '5px', color: 'var(--primary-color)' }}>{title}:</strong>
                    {items.length > 0 ? (
                      <ul style={{ paddingLeft: '20px', opacity: 0.85, fontSize: '0.95rem', lineHeight: 1.7 }}>
                        {items.map((item) => <li key={item}>{item}</li>)}
                      </ul>
                    ) : (
                      <p style={{ opacity: 0.6 }}>Chưa có nội dung.</p>
                    )}
                  </div>
                );
              })}
              <div style={{ display: 'flex', gap: '20px', fontSize: '0.9rem', opacity: 0.7 }}>
                <span><strong>Hạn sử dụng:</strong> {viewProduct.shelfLife || '24 tháng'}</span>
                <span><strong>ID:</strong> {viewProduct.id}</span>
              </div>
            </div>

            <div style={{ marginTop: '30px', textAlign: 'right' }}>
              <button 
                onClick={() => setViewProduct(null)} 
                className="btn-primary" 
                style={{ padding: '10px 24px', background: 'transparent', border: '1px solid rgba(255,255,255,0.3)', color: '#fff', boxShadow: 'none' }}
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* POPUP MODAL: EDIT / ADD PRODUCT */}
      {editProduct && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0,0,0,0.75)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999,
          padding: '20px'
        }}>
          <form onSubmit={handleSaveProduct} className="glass-card admin-product-modal" style={{
            width: '100%',
            borderRadius: '24px',
            padding: '18px 20px',
            maxHeight: 'calc(100vh - 24px)',
            overflowY: 'hidden',
            border: '1px solid var(--primary-color)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px', marginBottom: '12px' }}>
              <h3 style={{ fontSize: '1.5rem', color: 'var(--primary-color)' }}>
                {isNew ? 'Thêm Sản Phẩm Mới' : 'Chỉnh Sửa Sản Phẩm'}
              </h3>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', flex: '0 0 auto' }}>
                <button
                  type="button"
                  onClick={() => setEditProduct(null)}
                  className="btn-primary"
                  style={{ padding: '10px 22px', background: 'transparent', border: '1px solid rgba(255,255,255,0.3)', color: '#fff', boxShadow: 'none' }}
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                  style={{ padding: '10px 22px' }}
                >
                  Lưu Thay Đổi
                </button>
              </div>
            </div>

            <div className="admin-product-edit-layout">
              <div className="admin-product-main-fields">
                <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Tên sản phẩm *</span>
                  <input 
                    type="text"
                    required
                    value={editProduct.name}
                    onChange={e => setEditProduct({ ...editProduct, name: e.target.value })}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(0,0,0,0.2)', color: '#fff' }}
                    placeholder="Tổ Yến Tinh Chế Vy..."
                  />
                </label>

                <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Phân loại</span>
                  <select
                    value={editProduct.category || ''}
                    onChange={e => setEditProduct({ ...editProduct, category: e.target.value })}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(0,0,0,0.8)', color: '#fff', cursor: 'pointer' }}
                  >
                    <option value="">-- Chọn danh mục --</option>
                    {categories.map(c => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </label>

                <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Giá (VND) *</span>
                  <input
                    type="number"
                    required
                    min={0}
                    value={editProduct.price}
                    onChange={e => setEditProduct({ ...editProduct, price: parseInt(e.target.value) || 0 })}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(0,0,0,0.2)', color: '#fff' }}
                    placeholder="3800000"
                  />
                </label>

                <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Giá gốc (VND)</span>
                  <input
                    type="number"
                    min={0}
                    value={editProduct.originalPrice || 0}
                    onChange={e => setEditProduct({ ...editProduct, originalPrice: parseInt(e.target.value) || 0 })}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(0,0,0,0.2)', color: '#fff' }}
                    placeholder="3500000"
                  />
                </label>

                <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Trọng lượng</span>
                  <input
                    type="text"
                    value={editProduct.weight}
                    onChange={e => setEditProduct({ ...editProduct, weight: e.target.value })}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(0,0,0,0.2)', color: '#fff' }}
                    placeholder="100g, 50g..."
                  />
                </label>

                <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Xuất xứ</span>
                  <input
                    type="text"
                    value={editProduct.origin}
                    onChange={e => setEditProduct({ ...editProduct, origin: e.target.value })}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(0,0,0,0.2)', color: '#fff' }}
                    placeholder="Khánh Hòa..."
                  />
                </label>

                <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Hạn sử dụng</span>
                  <input
                    type="text"
                    value={editProduct.shelfLife}
                    onChange={e => setEditProduct({ ...editProduct, shelfLife: e.target.value })}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(0,0,0,0.2)', color: '#fff' }}
                    placeholder="2 năm..."
                  />
                </label>

                <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Nhãn dán (Badge)</span>
                  <select
                    value={editProduct.badge || ''}
                    onChange={e => setEditProduct({ ...editProduct, badge: e.target.value })}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(0,0,0,0.8)', color: '#fff', cursor: 'pointer' }}
                  >
                    <option value="">-- Chọn nhãn --</option>
                    {BADGE_OPTIONS.map(badge => (
                      <option key={badge} value={badge}>{badge}</option>
                    ))}
                  </select>
                </label>

                <label className="admin-short-description-field" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Mô tả ngắn *</span>
                  <textarea
                    required
                    rows={2}
                    value={editProduct.shortDescription ?? editProduct.description}
                    onChange={e => setEditProduct({ ...editProduct, shortDescription: e.target.value, description: e.target.value })}
                    className="admin-form-field"
                    style={{ resize: 'vertical' }}
                    placeholder="Tóm tắt ngắn gọn để hiển thị trên danh sách sản phẩm..."
                  />
                </label>
              
              </div>

              <div className="admin-product-image-panel">
                <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Hình ảnh sản phẩm</span>
                <div style={{ display: 'grid', gap: '8px' }}>
                  <button type="button" className="admin-image-preview-button" onClick={() => setPreviewImage(editProduct)}>
                    <img
                      src={editProduct.imageUrl || '/images/about-hero.png'}
                      alt="Xem trước"
                    />
                  </button>
                  <label style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <span style={{ fontSize: '0.82rem', opacity: 0.85 }}>Tải ảnh từ máy tính</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={e => handleUploadImage(e.target.files?.[0] ?? null)}
                      style={{ fontSize: '0.82rem' }}
                    />
                  </label>
                </div>
              </div>

              <div className="admin-product-copy-panel">
                <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Thông tin sản phẩm</span>
                  <textarea
                    rows={5}
                    value={editProduct.productInfo || ''}
                    onChange={e => setEditProduct({ ...editProduct, productInfo: e.target.value })}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(0,0,0,0.2)', color: '#fff', resize: 'vertical' }}
                    placeholder="Mỗi ý trên một dòng..."
                  />
                </label>
              </div>

              <div className="admin-product-detail-fields">
              {[
                ['Đặc điểm nổi bật', 'features', 'Mỗi ý trên một dòng...'],
                ['Đối tượng sử dụng', 'targetUsers', 'Mỗi ý trên một dòng...'],
                ['Hướng dẫn sử dụng', 'usageGuide', 'Mỗi bước trên một dòng...'],
              ].map(([label, field, placeholder]) => (
                <label key={field} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{label}</span>
                  <textarea
                    rows={3}
                    value={(editProduct[field as keyof Product] as string | undefined) ?? (field === 'usageGuide' ? editProduct.usage : '') ?? ''}
                    onChange={e => setEditProduct({ ...editProduct, [field]: e.target.value, ...(field === 'usageGuide' ? { usage: e.target.value } : {}) })}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(0,0,0,0.2)', color: '#fff', resize: 'vertical' }}
                    placeholder={placeholder}
                  />
                </label>
              ))}
              </div>
            </div>

          </form>
        </div>
      )}

      {previewImage && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.82)',
          zIndex: 10000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div className="glass-card" style={{ width: 'min(900px, 100%)', padding: '22px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', marginBottom: '16px' }}>
              <div>
                <h3>Kiểm tra ảnh sản phẩm</h3>
                <p style={{ color: 'var(--text-muted)', overflowWrap: 'anywhere' }}>{previewImage.imageUrl || 'Chưa có ảnh'}</p>
              </div>
              <button type="button" onClick={() => setPreviewImage(null)} className="btn-primary" style={{ padding: '8px 14px' }}>
                Đóng
              </button>
            </div>
            <img
              src={previewImage.imageUrl || '/images/about-hero.png'}
              alt={previewImage.name}
              style={{ width: '100%', maxHeight: '70vh', objectFit: 'contain', background: '#111', borderRadius: '8px' }}
            />
          </div>
        </div>
      )}
    </>
  );
}
