import { pageMetadata } from '@/lib/seo';
import OrderHistoryClient from './OrderHistoryClient';

export const metadata = pageMetadata({
  title: 'Lịch sử mua hàng',
  description: 'Xem lịch sử đơn hàng đã đặt tại Yến Tinh Hoa.',
  pathname: '/order-history',
});

export default function OrderHistoryPage() {
  return <OrderHistoryClient />;
}
