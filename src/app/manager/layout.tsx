import { cookies } from 'next/headers';
import ManagerShell from '@/components/ManagerShell';

const customerLinks = [
  { label: 'Thông tin tài khoản', href: '/manager/profile' },
  { label: 'Yêu thích', href: '/manager/favorite' },
  { label: 'Lịch sử đơn hàng', href: '/manager/order-history' },
];

const adminLinks = [
  { label: 'Bảng điều khiển', href: '/manager' },
  ...customerLinks,
  { label: 'Cài đặt giao diện', href: '/manager/settings' },
  { label: 'Quản lý danh mục', href: '/manager/categories' },
  { label: 'Quản lý sản phẩm', href: '/manager/products' },
  { label: 'Quản lý đơn hàng', href: '/manager/oders' },
  { label: 'Khách liên hệ', href: '/manager/contact' },
  { label: 'Quản lý chat', href: '/manager/managechat' },
  { label: 'Quản lý blog', href: '/manager/blog' },
];

export default async function ManagerLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const isAdmin = cookieStore.has('admin_session');
  const userName = cookieStore.get('user_session')?.value;

  return (
    <ManagerShell isAdmin={isAdmin} userName={userName} links={isAdmin ? adminLinks : customerLinks}>
      {children}
    </ManagerShell>
  );
}
