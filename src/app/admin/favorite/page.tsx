export default function AdminFavoritePage() {
  return (
    <div style={{ minHeight: '100vh', padding: '20px' }}>
      <h1>Quản lý Sản phẩm Yêu Thích</h1>
      <p style={{ marginBottom: '24px', color: 'rgba(255,255,255,0.8)' }}>
        Trang quản trị dành cho quản lý các sản phẩm đang được khách hàng yêu thích.
      </p>
      <div className="glass-card" style={{ padding: '24px' }}>
        <p>Hiện tại chưa có dữ liệu yêu thích thực tế. Các sản phẩm được khách hàng yêu thích sẽ xuất hiện ở đây.</p>
      </div>
    </div>
  );
}
