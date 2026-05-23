export default function AdminDashboard() {
  return (
    <div>
      <h1>Trang Quản Trị</h1>
      <p>Chọn một mục bên trái để quản lý sản phẩm, danh sách yêu thích hoặc theo dõi đơn hàng.</p>
      
      <div style={{ marginTop: '40px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
        <div className="glass-card" style={{ textAlign: 'center' }}>
          <h3>Cài đặt giao diện</h3>
          <p>Thay đổi màu sắc và bố cục</p>
          <a href="/admin/settings" className="btn-primary" style={{ display: 'inline-block', marginTop: '10px' }}>Mở</a>
        </div>
        <div className="glass-card" style={{ textAlign: 'center' }}>
          <h3>Quản lý sản phẩm</h3>
          <p>Danh sách sản phẩm và chỉnh sửa</p>
          <a href="/admin/products" className="btn-primary" style={{ display: 'inline-block', marginTop: '10px' }}>Mở</a>
        </div>
        <div className="glass-card" style={{ textAlign: 'center' }}>
          <h3>Yêu thích</h3>
          <p>Xem sản phẩm khách hàng yêu thích</p>
          <a href="/admin/favorite" className="btn-primary" style={{ display: 'inline-block', marginTop: '10px' }}>Mở</a>
        </div>
        <div className="glass-card" style={{ textAlign: 'center' }}>
          <h3>Lịch sử đơn hàng</h3>
          <p>Danh sách đơn hàng khách hàng</p>
          <a href="/admin/orders" className="btn-primary" style={{ display: 'inline-block', marginTop: '10px' }}>Mở</a>
        </div>
      </div>
    </div>
  );
}
