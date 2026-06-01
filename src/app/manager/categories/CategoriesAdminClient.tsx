'use client';

import { useState, useEffect } from 'react';

type Category = {
  id: string;
  name: string;
  description: string;
};

const DEFAULT_CATEGORY: Category = {
  id: '',
  name: '',
  description: '',
};

type CategoriesAdminClientProps = {
  initialCategories: Category[];
};

export default function CategoriesAdminClient({ initialCategories }: CategoriesAdminClientProps) {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const categoriesPerPage = 10;

  // Modal states
  const [editCategory, setEditCategory] = useState<Category | null>(null);
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    // Fetch categories
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => {
        setCategories(data);
      })
      .catch(() => {});
  }, []);

  const saveCategoriesList = async (updatedCategories: Category[]) => {
    try {
      const res = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedCategories),
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

  const handleSaveCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editCategory) return;

    let updatedList: Category[];

    if (isNew) {
      const newId = 'cat_' + Date.now();
      const categoryToAdd = { ...editCategory, id: newId };
      updatedList = [...categories, categoryToAdd];
    } else {
      updatedList = categories.map(c => c.id === editCategory.id ? editCategory : c);
    }

    const success = await saveCategoriesList(updatedList);
    if (success) {
      setCategories(updatedList);
      setEditCategory(null);
      alert(isNew ? 'Đã thêm danh mục thành công!' : 'Đã cập nhật danh mục thành công!');
    }
  };

  const handleDeleteCategory = async (id: string, name: string) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa danh mục "${name}"? Các sản phẩm thuộc danh mục này có thể bị ảnh hưởng.`)) {
      const updatedList = categories.filter(c => c.id !== id);
      const success = await saveCategoriesList(updatedList);
      if (success) {
        setCategories(updatedList);
        const newTotalPages = Math.ceil(updatedList.length / categoriesPerPage);
        if (currentPage > newTotalPages && newTotalPages > 0) {
          setCurrentPage(newTotalPages);
        }
        alert('Đã xóa danh mục thành công!');
      }
    }
  };

  const openEditModal = (category: Category) => {
    setEditCategory({ ...category });
    setIsNew(false);
  };

  const openAddModal = () => {
    setEditCategory({ ...DEFAULT_CATEGORY });
    setIsNew(true);
  };

  const totalPages = Math.ceil(categories.length / categoriesPerPage);
  const indexOfLastCategory = currentPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
  const currentCategories = categories.slice(indexOfFirstCategory, indexOfLastCategory);

  return (
    <>
    <div className="glass-card" style={{ padding: '35px', borderRadius: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', flexWrap: 'wrap', gap: '20px' }}>
        <div>
          <h2 style={{ fontSize: '2rem', color: 'var(--primary-color)', marginBottom: '5px' }}>Quản lý Danh mục</h2>
          <p style={{ opacity: 0.7, fontSize: '0.95rem' }}>Thêm, sửa, xóa các danh mục sản phẩm</p>
        </div>
        <button onClick={openAddModal} className="btn-primary" style={{ padding: '12px 24px', borderRadius: '12px', fontSize: '0.95rem' }}>
          + Thêm Danh Mục Mới
        </button>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px' }}>
              <th style={{ padding: '15px 10px', opacity: 0.8, fontWeight: 600 }}>Tên danh mục</th>
              <th style={{ padding: '15px 10px', opacity: 0.8, fontWeight: 600 }}>Mô tả</th>
              <th style={{ padding: '15px 10px', opacity: 0.8, fontWeight: 600, textAlign: 'center' }}>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {currentCategories.length > 0 ? (
              currentCategories.map(category => (
                <tr key={category.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', transition: 'background 0.2s' }} className="table-row-hover">
                  <td style={{ padding: '15px 10px', fontWeight: 'bold', color: 'var(--primary-color)' }}>
                    {category.name}
                  </td>
                  <td style={{ padding: '15px 10px', opacity: 0.8 }}>
                    {category.description || <span style={{ opacity: 0.5, fontStyle: 'italic' }}>Không có mô tả</span>}
                  </td>
                  <td style={{ padding: '15px 10px', textAlign: 'center' }}>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                      <button 
                        onClick={() => openEditModal(category)} 
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
                        onClick={() => handleDeleteCategory(category.id, category.name)} 
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
                <td colSpan={3} style={{ padding: '30px 10px', textAlign: 'center', opacity: 0.6 }}>Không có danh mục nào.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

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

      {/* MODAL */}
      {editCategory && (
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
          <form onSubmit={handleSaveCategory} className="glass-card" style={{
            width: '100%',
            maxWidth: '500px',
            borderRadius: '24px',
            padding: '30px',
            border: '1px solid var(--primary-color)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '15px', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.5rem', color: 'var(--primary-color)' }}>
                {isNew ? 'Thêm Danh Mục Mới' : 'Chỉnh Sửa Danh Mục'}
              </h3>
              <button 
                type="button"
                onClick={() => setEditCategory(null)} 
                style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: '1.5rem', cursor: 'pointer' }}
              >
                &times;
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Tên danh mục *</span>
                <input 
                  type="text"
                  required
                  value={editCategory.name}
                  onChange={e => setEditCategory({ ...editCategory, name: e.target.value })}
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(0,0,0,0.2)', color: '#fff' }}
                  placeholder="Yến Tinh Hoa..."
                />
              </label>

              <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Mô tả</span>
                <textarea 
                  rows={3}
                  value={editCategory.description}
                  onChange={e => setEditCategory({ ...editCategory, description: e.target.value })}
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(0,0,0,0.2)', color: '#fff', resize: 'vertical' }}
                  placeholder="Mô tả danh mục..."
                />
              </label>
            </div>

            <div style={{ marginTop: '30px', display: 'flex', gap: '15px', justifyContent: 'flex-end' }}>
              <button 
                type="button"
                onClick={() => setEditCategory(null)} 
                className="btn-primary" 
                style={{ padding: '12px 24px', background: 'transparent', border: '1px solid rgba(255,255,255,0.3)', color: '#fff', boxShadow: 'none' }}
              >
                Hủy
              </button>
              <button 
                type="submit"
                className="btn-primary" 
                style={{ padding: '12px 24px' }}
              >
                Lưu Thay Đổi
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
