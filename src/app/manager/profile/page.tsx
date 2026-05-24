import { cookies } from 'next/headers';
import CustomerProfileForm from '@/components/CustomerProfileForm';
import { ADMIN_EMAIL, ADMIN_USERNAME } from '@/lib/adminAuth';

export default async function ProfilePage() {
  const cookieStore = await cookies();
  const isAdmin = cookieStore.has('admin_session');
  const userName = cookieStore.get('user_session')?.value || 'Khách hàng';

  return (
    <div>
      <h1>Thông tin tài khoản</h1>
      <div className="glass-card account-summary">
        <h2>{isAdmin ? 'Tài khoản quản trị' : 'Tài khoản khách hàng'}</h2>
        <p>
          {isAdmin
            ? 'Bạn đang đăng nhập bằng quyền quản trị và có thể sử dụng đầy đủ chức năng quản lý.'
            : 'Cập nhật thông tin liên hệ để đặt hàng và nhận tư vấn nhanh hơn.'}
        </p>
        <div className="account-fields">
          <div>
            <strong>Tên đăng nhập</strong>
            <span>{isAdmin ? ADMIN_USERNAME : userName}</span>
          </div>
          <div>
            <strong>Vai trò</strong>
            <span>{isAdmin ? 'Quản trị viên' : 'Khách hàng'}</span>
          </div>
          {isAdmin && (
            <div>
              <strong>Email</strong>
              <span>{ADMIN_EMAIL}</span>
            </div>
          )}
        </div>
      </div>

      {!isAdmin && <CustomerProfileForm userName={userName} />}
    </div>
  );
}
