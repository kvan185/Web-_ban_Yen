export default function AdminOrdersPage() {
  return (
    <div style={{ minHeight: '100vh', padding: '20px' }}>
      <h1>Quản lý Lịch sử Đơn hàng</h1>
      <p style={{ marginBottom: '24px', color: 'rgba(255,255,255,0.8)' }}>
        Xem và theo dõi các đơn hàng đã được khách hàng đặt.
      </p>
      <div className="glass-card" style={{ padding: '24px' }}>
        <p>Hiện tại chưa có lịch sử đơn hàng cụ thể. Khi khách hàng đặt hàng, dữ liệu sẽ được cập nhật tại đây.</p>
      </div>
    </div>
  );
}
