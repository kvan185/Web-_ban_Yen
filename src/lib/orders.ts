import type { OrderHistoryItem } from '@/lib/storage';

export const ORDER_PAYMENT_STATUSES = [
  'Chưa thanh toán',
  'Chờ xác nhận chuyển khoản',
  'Đã thanh toán',
] as const;

export const ORDER_FULFILLMENT_STATUSES = [
  'Mới đặt',
  'Chờ xử lý',
  'Đang giao',
  'Hoàn thành',
] as const;

export function formatOrderStatus(order: Partial<OrderHistoryItem>) {
  const payment = order.paymentStatus || 'Chưa thanh toán';
  const fulfillment = order.fulfillmentStatus || 'Mới đặt';
  return `${payment}, ${fulfillment}`;
}

export function sanitizeOrderOwner(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, '_')
    .replace(/^_+|_+$/g, '') || 'guest';
}

export function createOrderId(orderOwner: string) {
  const timestamp = new Date()
    .toISOString()
    .replace(/[-:TZ.]/g, '')
    .slice(0, 14);
  return `${timestamp}_${sanitizeOrderOwner(orderOwner)}`;
}
