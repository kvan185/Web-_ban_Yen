'use client';

import { useEffect, useState } from 'react';
import { ORDER_FULFILLMENT_STATUSES, ORDER_PAYMENT_STATUSES, formatOrderStatus } from '@/lib/orders';
import { OrderHistoryItem } from '@/lib/storage';

export default function AdminOrdersClient() {
  const [orders, setOrders] = useState<OrderHistoryItem[]>([]);

  useEffect(() => {
    fetch('/api/orders')
      .then((res) => res.json())
      .then((data) => setOrders(Array.isArray(data) ? data : []))
      .catch(() => setOrders([]));
  }, []);

  const updateOrder = async (orderId: string, patch: Partial<OrderHistoryItem>) => {
    const response = await fetch('/api/orders', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: orderId, ...patch }),
    });

    const data = await response.json();
    const nextOrder = data?.order as OrderHistoryItem | undefined;

    setOrders((current) =>
      current.map((order) =>
        order.id === orderId
          ? nextOrder || { ...order, ...patch, status: formatOrderStatus({ ...order, ...patch }) }
          : order
      )
    );
  };

  return (
    <div style={{ minHeight: '100vh', padding: '20px' }}>
      <h1>Quản lý đơn hàng</h1>
      <p style={{ marginBottom: '24px', color: 'rgba(255,255,255,0.8)' }}>
        Theo dõi các đơn khách đã đặt từ giỏ hàng.
      </p>

      {orders.length === 0 ? (
        <div className="glass-card" style={{ padding: '24px' }}>
          <p>Chưa có đơn hàng nào.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '18px' }}>
          {orders.map((order) => (
            <article key={order.id} className="glass-card" style={{ padding: '24px' }}>
              <div className="admin-order-header">
                <div>
                  <h2>Đơn hàng #{order.id}</h2>
                  <p>{order.date}</p>
                </div>
                <strong>{order.total?.toLocaleString('vi-VN')} đ</strong>
              </div>

              <div className="admin-order-grid">
                <div>
                  <span>Tài khoản</span>
                  <strong>{order.orderOwner || 'guest'}</strong>
                </div>
                <div>
                  <span>Khách hàng</span>
                  <strong>{order.customerName || 'Chưa có tên'}</strong>
                </div>
                <div>
                  <span>Email</span>
                  <strong>{order.email || 'Chưa có'}</strong>
                </div>
                <div>
                  <span>Số điện thoại</span>
                  <strong>{order.phone || 'Chưa có'}</strong>
                </div>
                <div>
                  <span>Địa chỉ</span>
                  <strong>{order.address || 'Chưa có'}</strong>
                </div>
                <div>
                  <span>Phương thức</span>
                  <strong>{order.paymentMethod === 'bank' ? 'Chuyển khoản' : 'Khi nhận hàng'}</strong>
                </div>
                <div>
                  <span>Nội dung CK</span>
                  <strong>{order.transferContent || '-'}</strong>
                </div>
                <div>
                  <span>Trạng thái tổng</span>
                  <strong>{order.status || 'Mới đặt'}</strong>
                </div>
              </div>

              <div className="admin-order-grid" style={{ marginTop: '18px' }}>
                <label>
                  <span>Thanh toán</span>
                  <select
                    value={order.paymentStatus || 'Chưa thanh toán'}
                    onChange={(event) => updateOrder(order.id, { paymentStatus: event.target.value })}
                  >
                    {ORDER_PAYMENT_STATUSES.map((status) => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </label>
                <label>
                  <span>Giao nhận</span>
                  <select
                    value={order.fulfillmentStatus || 'Mới đặt'}
                    onChange={(event) => updateOrder(order.id, { fulfillmentStatus: event.target.value })}
                  >
                    {ORDER_FULFILLMENT_STATUSES.map((status) => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </label>
              </div>

              <div style={{ marginTop: '18px' }}>
                <h3 style={{ marginBottom: '10px' }}>Sản phẩm</h3>
                <ul style={{ listStyle: 'disc', paddingLeft: '20px', color: 'rgba(255,255,255,0.9)' }}>
                  {order.items?.map((item) => (
                    <li key={item.id}>
                      {item.name} x {item.quantity} - {(item.price * item.quantity).toLocaleString('vi-VN')} đ
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
