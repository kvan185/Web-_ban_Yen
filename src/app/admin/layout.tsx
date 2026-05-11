export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container" style={{ display: 'flex', gap: '30px', padding: '40px 20px' }}>
      <aside style={{ width: '250px', borderRight: '1px solid rgba(255,255,255,0.1)', paddingRight: '20px' }}>
        <h3 style={{ marginBottom: '20px' }}>Admin Panel</h3>
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <li><a href="/admin" style={{ opacity: 0.8 }}>Dashboard</a></li>
          <li><a href="/admin/settings" style={{ opacity: 0.8 }}>Cài đặt Giao diện</a></li>
          <li><a href="/admin/products" style={{ opacity: 0.8 }}>Quản lý Sản phẩm</a></li>
          <li><a href="/admin/blog" style={{ opacity: 0.8 }}>Quản lý Blog</a></li>
        </ul>
      </aside>
      <div style={{ flex: 1 }}>
        {children}
      </div>
    </div>
  );
}
