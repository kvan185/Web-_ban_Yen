'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { OrderHistoryItem } from '@/lib/storage';

export default function OrderHistoryClient() {
  const [orders, setOrders] = useState<OrderHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/orders', { cache: 'no-store' })
      .then((res) => res.json())
      .then((data) => setOrders(Array.isArray(data) ? data : []))
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container catalog-page">
      <div className="catalog-heading">
        <p className="eyebrow">Tài khoản</p>
        <h1>Lịch sử mua hàng</h1>
        <p>Theo dõi các đơn hàng đã đặt tại Yến Tinh Hoa.</p>
      </div>

      {loading ? (
        <div className="glass-card" style={{ padding: '28px', textAlign: 'center' }}>Đang tải đơn hàng...</div>
      ) : orders.length === 0 ? (
        <div className="glass-card" style={{ padding: '34px', textAlign: 'center' }}>
          <p>Chưa có đơn hàng nào.</p>
          <Link href="/products" className="btn-primary" style={{ display: 'inline-block', marginTop: '18px' }}>
            Xem sản phẩm
          </Link>
        </div>
      ) : (
        <div className="manager-grid">
          {orders.map((order) => (
            <article key={order.id} className="glass-card admin-order-card">
              <div className="admin-order-header">
                <div>
                  <h2>Đơn #{order.id}</h2>
                  <p>{order.date}</p>
                </div>
                <strong>{(order.total || 0).toLocaleString('vi-VN')} đ</strong>
              </div>
              <div className="admin-order-grid">
                <div><span>Khách hàng</span><strong>{order.customerName || 'Chưa có'}</strong></div>
                <div><span>Số điện thoại</span><strong>{order.phone || 'Chưa có'}</strong></div>
                <div><span>Địa chỉ</span><strong>{order.address || 'Chưa có'}</strong></div>
                <div><span>Thanh toán</span><strong>{order.paymentStatus || 'Chưa cập nhật'}</strong></div>
                <div><span>Trạng thái</span><strong>{order.fulfillmentStatus || order.status || 'Đã nhận'}</strong></div>
              </div>
              <div className="analytics-list" style={{ marginTop: '18px' }}>
                {(order.items || []).map((item) => (
                  <div key={`${order.id}-${item.id}`}>
                    <span>{item.name} x {item.quantity}</span>
                    <strong>{(item.price * item.quantity).toLocaleString('vi-VN')} đ</strong>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
