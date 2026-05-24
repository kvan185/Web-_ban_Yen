'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { OrderHistoryItem, parseStorageArray } from '@/lib/storage';

export default function OrderHistoryPage() {
  const [orders, setOrders] = useState<OrderHistoryItem[]>([]);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setOrders(parseStorageArray<OrderHistoryItem>(localStorage.getItem('orderHistory')));
    }, 0);

    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <div style={{ minHeight: '100vh', padding: '40px' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <h1>Lịch sử đặt hàng</h1>
        <p style={{ marginBottom: '24px', color: 'rgba(255,255,255,0.8)' }}>
          Xem lại những đơn hàng đã đặt. Nếu chưa có đơn hàng nào, bạn có thể mua sản phẩm ngay hôm nay.
        </p>

        {orders.length > 0 ? (
          <div style={{ display: 'grid', gap: '20px' }}>
            {orders.map((order) => (
              <div key={order.id} className="glass-card" style={{ padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '20px', flexWrap: 'wrap' }}>
                  <div>
                    <h2 style={{ marginBottom: '10px' }}>Đơn hàng #{order.id}</h2>
                    <p style={{ opacity: 0.85 }}>{order.date}</p>
                  </div>
                  <strong style={{ color: 'var(--primary-color)' }}>{order.total?.toLocaleString('vi-VN')} đ</strong>
                </div>
                <div style={{ marginTop: '18px' }}>
                  <h3 style={{ marginBottom: '10px' }}>Sản phẩm</h3>
                  <ul style={{ listStyle: 'disc', paddingLeft: '20px', color: 'rgba(255,255,255,0.9)' }}>
                    {order.items?.map((item) => (
                      <li key={item.id}>{item.name} x {item.quantity}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="glass-card" style={{ padding: '30px', textAlign: 'center' }}>
            <p>Chưa có lịch sử đơn hàng nào.</p>
            <Link href="/san-pham" className="btn-primary" style={{ marginTop: '20px', display: 'inline-block' }}>
              Mua ngay
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
