import 'server-only';

import nodemailer from 'nodemailer';
import type { OrderHistoryItem } from '@/lib/storage';

function createTransport() {
  const user = process.env.ORDER_NOTIFY_EMAIL_USER;
  const pass = process.env.ORDER_NOTIFY_EMAIL_APP_PASSWORD;

  if (!user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user,
      pass,
    },
  });
}

export async function sendNewOrderNotification(order: OrderHistoryItem) {
  const transporter = createTransport();
  const to = process.env.ORDER_NOTIFY_TO || 'khanhvan18052004@gmail.com';

  if (!transporter) {
    return { sent: false, reason: 'missing-email-config' as const };
  }

  const subject = `[Yến Tinh Hoa] Đơn hàng mới ${order.id}`;
  const text = [
    'Bạn có đơn hàng mới trên yenth.vn',
    '',
    `Mã đơn: ${order.id}`,
    `Thanh toán: ${order.paymentStatus || 'Chưa thanh toán'}`,
    `Giao nhận: ${order.fulfillmentStatus || 'Mới đặt'}`,
    `Tổng tiền: ${(order.total || 0).toLocaleString('vi-VN')} đ`,
    `Số lượng sản phẩm: ${(order.items || []).reduce((total, item) => total + (item.quantity || 0), 0)}`,
    '',
    'Hãy đăng nhập trang quản trị để xem chi tiết đơn hàng.',
  ].join('\n');

  await transporter.sendMail({
    from: `"Yến Tinh Hoa" <${process.env.ORDER_NOTIFY_EMAIL_USER}>`,
    to,
    subject,
    text,
  });

  return { sent: true as const };
}
