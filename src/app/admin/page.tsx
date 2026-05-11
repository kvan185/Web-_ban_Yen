export default function AdminDashboard() {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Chào mừng bạn đến với trang quản trị. Vui lòng chọn một mục ở menu bên trái để bắt đầu quản lý nội dung website.</p>
      
      <div style={{ marginTop: '40px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
        <div className="glass-card" style={{ textAlign: 'center' }}>
          <h3>Cài đặt</h3>
          <p>Màu sắc, bố cục</p>
          <a href="/admin/settings" className="btn-primary" style={{ display: 'inline-block', marginTop: '10px' }}>Quản lý</a>
        </div>
        <div className="glass-card" style={{ textAlign: 'center' }}>
          <h3>Sản phẩm</h3>
          <p>Danh sách yến sào</p>
          <a href="/admin/products" className="btn-primary" style={{ display: 'inline-block', marginTop: '10px' }}>Quản lý</a>
        </div>
        <div className="glass-card" style={{ textAlign: 'center' }}>
          <h3>Blog</h3>
          <p>Bài viết hàng ngày</p>
          <a href="/admin/blog" className="btn-primary" style={{ display: 'inline-block', marginTop: '10px' }}>Quản lý</a>
        </div>
      </div>
    </div>
  );
}
