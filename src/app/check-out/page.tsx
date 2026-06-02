'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { OrderHistoryItem } from '@/lib/storage';

const bankAccount = {
  bank: 'MB Bank',
  accountNumber: '0375266538',
  accountName: 'Nguyễn Khánh Văn',
};

export default function CheckOutPage() {
  const router = useRouter();
  const [order, setOrder] = useState<OrderHistoryItem | null>(null);
  const [paid, setPaid] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      try {
        const stored = localStorage.getItem('pendingBankCheckout');
        setOrder(stored ? JSON.parse(stored) : null);
      } catch {
        setOrder(null);
      }
    }, 0);

    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!paid) return;
    setCountdown(5);

    const interval = window.setInterval(() => {
      setCountdown((current) => {
        if (current <= 1) {
          window.clearInterval(interval);
          router.push('/order-history');
          return 0;
        }
        return current - 1;
      });
    }, 1000);

    return () => window.clearInterval(interval);
  }, [paid, router]);

  const qrUrl = useMemo(() => {
    const params = new URLSearchParams({
      amount: String(Math.max(order?.total || 0, 0)),
      addInfo: order?.transferContent || '',
      accountName: bankAccount.accountName,
    });
    return `https://img.vietqr.io/image/MB-${bankAccount.accountNumber}-compact2.png?${params.toString()}`;
  }, [order]);

  const markPaid = async () => {
    if (!order) return;

    setSaving(true);
    setSaveError('');

    const bankOrder: OrderHistoryItem = {
      ...order,
      paymentStatus: 'Chờ xác nhận chuyển khoản',
      fulfillmentStatus: 'Chờ xử lý',
      status: 'Chờ xác nhận chuyển khoản, Chờ xử lý',
    };

    const response = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bankOrder),
    });

    if (!response.ok) {
      setSaveError('Hệ thống chưa lưu được đơn hàng. Vui lòng thử lại hoặc liên hệ hotline 0375266538.');
      setSaving(false);
      return;
    }

    localStorage.removeItem('pendingBankCheckout');
    localStorage.removeItem('cart');
    window.dispatchEvent(new Event('cartUpdated'));
    setOrder(bankOrder);
    setPaid(true);
    setSaving(false);
  };

  if (paid) {
    return (
      <div className="container checkout-page">
        <div className="glass-card checkout-thank-you">
          <h1>Cảm ơn quý khách đã gửi yêu cầu thanh toán</h1>
          <p>Đơn hàng đang chờ xác nhận chuyển khoản. Sẽ chuyển về lịch sử mua hàng sau {countdown} giây...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container checkout-page">
        <div className="glass-card checkout-thank-you">
          <h1>Không tìm thấy phiên thanh toán</h1>
          <p>Sản phẩm trong giỏ hàng vẫn được giữ nguyên nếu quý khách chưa thanh toán.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container checkout-page">
      <div className="glass-card checkout-bank-panel">
        <div>
          <div className="mb-bank-logo" aria-label="MB Bank logo">
            <span>MB</span>
            <small>BANK</small>
          </div>
          <h1>Thanh toán chuyển khoản</h1>
          <p>Quét mã QR hoặc chuyển khoản theo thông tin bên dưới. Sau khi chuyển xong, hệ thống sẽ ghi nhận đơn ở trạng thái chờ xác nhận.</p>
          <div className="checkout-bank-info">
            <div>
              <span>Ngân hàng</span>
              <strong>{bankAccount.bank}</strong>
            </div>
            <div>
              <span>Số tài khoản</span>
              <strong>{bankAccount.accountNumber}</strong>
            </div>
            <div>
              <span>Chủ tài khoản</span>
              <strong>{bankAccount.accountName}</strong>
            </div>
            <div>
              <span>Số tiền</span>
              <strong>{order.total?.toLocaleString('vi-VN')} đ</strong>
            </div>
            <div className="checkout-transfer-content">
              <span>Nội dung chuyển khoản</span>
              <strong>{order.transferContent}</strong>
            </div>
          </div>
          <button type="button" className="btn-primary" onClick={markPaid} disabled={saving}>
            {saving ? 'Đang lưu đơn...' : 'Tôi đã chuyển khoản'}
          </button>
          {saveError && <p style={{ marginTop: '14px', color: '#ffd166', fontWeight: 700 }}>{saveError}</p>}
        </div>
        <img src={qrUrl} alt="QR chuyển khoản MB Bank" />
      </div>
    </div>
  );
}
