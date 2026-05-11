'use client';

import { useState, useEffect } from 'react';

type Post = {
  id: string;
  title: string;
  description: string;
  slug: string;
  content: string;
  date?: string;
};

export default function BlogAdminPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPost, setEditingPost] = useState<Post | null>(null);

  useEffect(() => {
    fetch('/api/blog')
      .then(res => res.json())
      .then(data => {
        setPosts(data);
        setLoading(false);
      });
  }, []);

  const handleEdit = async (post: Post) => {
    const res = await fetch(`/api/blog?id=${post.id}`);
    const fullPost = await res.json();
    setEditingPost(fullPost);
  };

  const toSlug = (str: string) => {
    return str
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[đĐ]/g, 'd')
      .replace(/([^0-9a-z-\s])/g, '')
      .replace(/(\s+)/g, '_')
      .replace(/^-+|-+$/g, '');
  };

  const handleSave = async (post: Post) => {
    if (!post.title || !post.content) {
      alert('Vui lòng nhập tiêu đề và nội dung');
      return;
    }

    // Tự động tạo slug nếu trống hoặc theo yêu cầu người dùng
    const finalSlug = post.slug || toSlug(post.title);

    const res = await fetch('/api/blog', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...post, slug: finalSlug }),
    });
    
    if (res.ok) {
      alert('Đã lưu bài viết');
      setEditingPost(null);
      window.location.reload();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bạn có chắc muốn xóa?')) return;
    await fetch(`/api/blog?id=${id}`, { method: 'DELETE' });
    setPosts(posts.filter(p => p.id !== id));
  };

  if (loading) return <div>Đang tải...</div>;

  if (editingPost) {
    return (
      <div className="glass-card">
        <h2 style={{ marginBottom: '20px' }}>{editingPost.id ? 'Chỉnh sửa' : 'Thêm mới'} Bài viết</h2>
        
        <label style={{ display: 'block', marginBottom: '5px' }}>Tiêu đề:</label>
        <input 
          value={editingPost.title} 
          onChange={e => setEditingPost({ ...editingPost, title: e.target.value })} 
          placeholder="Nhập tiêu đề bài viết"
          style={{ width: '100%', padding: '10px', marginBottom: '15px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.2)', color: 'white' }}
        />

        <label style={{ display: 'block', marginBottom: '5px' }}>Mô tả ngắn (SEO):</label>
        <textarea 
          value={editingPost.description} 
          onChange={e => setEditingPost({ ...editingPost, description: e.target.value })} 
          placeholder="Mô tả ngắn gọn nội dung bài viết..."
          rows={2}
          style={{ width: '100%', padding: '10px', marginBottom: '15px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.2)', color: 'white' }}
        />

        <label style={{ display: 'block', marginBottom: '5px' }}>Slug (Đường dẫn):</label>
        <input 
          value={editingPost.slug} 
          onChange={e => setEditingPost({ ...editingPost, slug: e.target.value })} 
          placeholder="Viết không dấu, gạch ngang (VD: loi-ich-yen-sao)"
          style={{ width: '100%', padding: '10px', marginBottom: '15px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.2)', color: 'white' }}
        />

        <label style={{ display: 'block', marginBottom: '5px' }}>Nội dung (Markdown):</label>
        <textarea 
          value={editingPost.content} 
          onChange={e => setEditingPost({ ...editingPost, content: e.target.value })} 
          placeholder="# Tiêu đề chính\n\nNội dung..."
          rows={15}
          style={{ width: '100%', padding: '10px', marginBottom: '15px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', fontFamily: 'monospace' }}
        />

        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={() => handleSave(editingPost)} className="btn-primary" style={{ background: '#28a745' }}>Lưu</button>
          <button onClick={() => setEditingPost(null)} className="btn-primary" style={{ background: '#6c757d' }}>Hủy</button>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Quản lý Blog</h2>
        <button onClick={() => setEditingPost({ id: '', title: '', description: '', slug: '', content: '' })} className="btn-primary">
          + Bài viết mới
        </button>
      </div>

      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {posts.map(post => (
          <li key={post.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0,0,0,0.2)', padding: '15px', borderRadius: '4px' }}>
            <div>
              <strong style={{ display: 'block', fontSize: '1.1rem' }}>{post.title}</strong>
              <small style={{ opacity: 0.6 }}>Slug: {post.slug} | Ngày: {post.date}</small>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => handleEdit(post)} style={{ padding: '5px 10px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}>Sửa</button>
              <button onClick={() => handleDelete(post.id)} style={{ padding: '5px 10px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '4px' }}>Xóa</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
