import Link from 'next/link';
import { cookies } from 'next/headers';

export default function AccountPage() {
  const cookieStore = cookies();
  const userName = cookieStore.get('user_session')?.value;
  const isAdmin = cookieStore.has('admin_session');

  return (
    <div style={{ minHeight: '100vh', padding: '40px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1>{isAdmin ? 'Tài khoản Admin' : 'Tài khoản khách hàng'}</h1>
        <p style={{ marginBottom: '24px', color: 'rgba(255,255,255,0.8)' }}>
          {isAdmin
            ? 'Bạn đang đăng nhập với quyền quản trị. Nhấn Quản trị để vào bảng điều khiển.'
            : userName
            ? `Xin chào ${userName}. Đây là trang thông tin tài khoản của bạn.`
            : 'Bạn chưa đăng nhập. Vui lòng đăng nhập để xem tài khoản.'}
        </p>

        {isAdmin ? (
          <Link href="/admin" className="btn-primary" style={{ display: 'inline-block' }}>
            Mở trang quản trị
          </Link>
        ) : (
          <div style={{ display: 'grid', gap: '16px' }}>
            {userName ? (
              <>
                <div className="glass-card" style={{ padding: '25px' }}>
                  <h2>Thông tin của bạn</h2>
                  <p><strong>Tên đăng nhập:</strong> {userName}</p>
                  <p><strong>Vai trò:</strong> Khách hàng</p>
                </div>
                <div style={{ display: 'grid', gap: '14px' }}>
                  <Link href="/yeu-thich" className="btn-primary" style={{ width: 'fit-content' }}>
                    Sản phẩm yêu thích
                  </Link>
                  <Link href="/lich-su" className="btn-primary" style={{ width: 'fit-content' }}>
                    Lịch sử đặt hàng
                  </Link>
                </div>
              </>
            ) : (
              <Link href="/login" className="btn-primary" style={{ display: 'inline-block' }}>
                Đăng nhập
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
