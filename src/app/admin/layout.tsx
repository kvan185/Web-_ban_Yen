'use client';

import { useRouter } from 'next/navigation';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/admin/logout', { method: 'POST' });
      if (res.ok) {
        router.push('/admin/login');
        router.refresh();
      }
    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  return (
    <div className="admin-container" style={{ 
      display: 'flex', 
      minHeight: '100vh',
      background: 'var(--bg-color)',
      color: 'var(--text-color)'
    }}>
      <aside style={{ 
        width: '280px', 
        borderRight: '1px solid rgba(255,255,255,0.1)', 
        padding: '30px 20px',
        display: 'flex',
        flexDirection: 'column',
        position: 'sticky',
        top: 0,
        height: '100vh'
      }}>
        <div style={{ marginBottom: '40px', padding: '0 10px' }}>
          <h3 style={{ color: 'var(--primary-color)', fontSize: '1.5rem', fontWeight: '700' }}>👑 Thượng Yến</h3>
          <p style={{ opacity: 0.5, fontSize: '0.8rem', marginTop: '5px' }}>Hệ thống Quản trị</p>
        </div>

        <nav style={{ flex: 1 }}>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', padding: 0 }}>
            {[
              { label: 'Bảng điều khiển', href: '/admin', icon: '📊' },
              { label: 'Cài đặt Giao diện', href: '/admin/settings', icon: '🎨' },
              { label: 'Quản lý Sản phẩm', href: '/admin/products', icon: '📦' },
              { label: 'Quản lý Blog', href: '/admin/blog', icon: '📝' },
            ].map((item) => (
              <li key={item.href}>
                <a 
                  href={item.href} 
                  style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 15px',
                    borderRadius: '10px',
                    textDecoration: 'none',
                    color: 'inherit',
                    opacity: 0.8,
                    transition: 'all 0.2s',
                    background: 'transparent'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                    e.currentTarget.style.opacity = '1';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.opacity = '0.8';
                  }}
                >
                  <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
                  <span style={{ fontWeight: '500' }}>{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div style={{ marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <button 
            onClick={handleLogout}
            style={{ 
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 15px',
              borderRadius: '10px',
              border: 'none',
              background: 'rgba(255, 77, 77, 0.1)',
              color: '#ff4d4d',
              cursor: 'pointer',
              fontWeight: '600',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 77, 77, 0.2)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 77, 77, 0.1)'}
          >
            <span>🚪</span> Đăng xuất
          </button>
        </div>
      </aside>
      <main style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
        {children}
      </main>
    </div>
  );
}
