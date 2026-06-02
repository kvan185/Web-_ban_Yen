'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import CheckoutProfileModal, { CheckoutPayment, CustomerProfile } from '@/components/CheckoutProfileModal';
import { CartItem, OrderHistoryItem, parseStorageArray } from '@/lib/storage';

export default function CartPage() {
  const router = useRouter();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCheckoutProfile, setShowCheckoutProfile] = useState(false);
  const [checkoutError, setCheckoutError] = useState('');
  const [savingOrder, setSavingOrder] = useState(false);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setCart(parseStorageArray<CartItem>(localStorage.getItem('cart')));
      setLoading(false);
    }, 0);

    return () => window.clearTimeout(timeout);
  }, []);

  const updateQuantity = (id: string, delta: number) => {
    const newCart = cart.map((item) => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    });
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const removeItem = (id: string) => {
    const newCart = cart.filter((item) => item.id !== id);
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const createOrderDraft = (profile: CustomerProfile, payment: CheckoutPayment): OrderHistoryItem => {
    const isBankTransfer = payment.method === 'bank';

    return {
      id: '',
      date: new Date().toLocaleString('vi-VN'),
      total: totalPrice,
      items: cart,
      customerName: profile.fullName,
      email: profile.email || '',
      phone: profile.phone,
      address: profile.address,
      paymentMethod: payment.method,
      paymentStatus: isBankTransfer ? 'Chờ xác nhận chuyển khoản' : 'Chưa thanh toán',
      fulfillmentStatus: 'Mới đặt',
      transferContent: payment.transferContent,
      status: isBankTransfer ? 'Chờ xác nhận chuyển khoản, Mới đặt' : 'Chưa thanh toán, Mới đặt',
    };
  };

  const saveOrder = async (order: OrderHistoryItem) => {
    const response = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order),
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      throw new Error(data?.error || 'Unable to save order');
    }

    return data;
  };

  const completeCheckout = async (profile: CustomerProfile, payment: CheckoutPayment) => {
    setCheckoutError('');
    const order = createOrderDraft(profile, payment);

    if (payment.method === 'bank') {
      localStorage.setItem('pendingBankCheckout', JSON.stringify(order));
      router.push('/check-out');
      return;
    }

    setSavingOrder(true);
    try {
      await saveOrder(order);
      localStorage.removeItem('cart');
      setCart([]);
      window.dispatchEvent(new Event('cartUpdated'));
      router.push('/order-history');
    } catch {
      setCheckoutError('Hệ thống chưa lưu được đơn hàng. Vui lòng thử lại hoặc liên hệ hotline 0375266538.');
    } finally {
      setSavingOrder(false);
    }
  };

  if (loading) return <div className="container" style={{ padding: '100px' }}>Đang tải...</div>;

  return (
    <div className="container" style={{ padding: '60px 20px', minHeight: '80vh' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '40px' }}>Giỏ hàng của bạn</h1>

      {cart.length === 0 ? (
        <div className="glass-card" style={{ textAlign: 'center', padding: '60px' }}>
          <p style={{ fontSize: '1.2rem', marginBottom: '20px', opacity: 0.7 }}>Giỏ hàng của bạn đang trống.</p>
          <Link href="/products" className="btn-primary">Mua sắm ngay</Link>
        </div>
      ) : (
        <div className="cart-layout">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {cart.map((item) => (
              <div key={item.id} className="glass-card cart-item-row">
                <div style={{ width: '100px', height: '100px', background: `url(${item.imageUrl}) center/cover`, borderRadius: '8px' }} />
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '1.2rem' }}>{item.name}</h3>
                  <p style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>{item.price.toLocaleString('vi-VN')} đ</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <button onClick={() => updateQuantity(item.id, -1)} style={{ width: '30px', height: '30px', borderRadius: '50%', border: '1px solid var(--primary-color)', background: 'transparent', color: 'white' }}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)} style={{ width: '30px', height: '30px', borderRadius: '50%', border: '1px solid var(--primary-color)', background: 'transparent', color: 'white' }}>+</button>
                </div>
                <button onClick={() => removeItem(item.id)} style={{ color: '#ff4d4d', background: 'transparent', border: 'none', cursor: 'pointer' }}>Xóa</button>
              </div>
            ))}
          </div>

          <div className="glass-card" style={{ height: 'fit-content' }}>
            <h2 style={{ marginBottom: '20px' }}>Tổng đơn hàng</h2>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span>Tạm tính:</span>
              <span>{totalPrice.toLocaleString('vi-VN')} đ</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', fontSize: '1.2rem', fontWeight: 'bold' }}>
              <span>Tổng cộng:</span>
              <span style={{ color: 'var(--primary-color)' }}>{totalPrice.toLocaleString('vi-VN')} đ</span>
            </div>
            <button className="btn-primary" style={{ width: '100%', padding: '15px' }} onClick={() => setShowCheckoutProfile(true)}>
              {savingOrder ? 'Đang lưu đơn...' : 'Tiến hành thanh toán'}
            </button>
            {checkoutError && (
              <p style={{ marginTop: '14px', color: '#ffd166', fontWeight: 700 }}>{checkoutError}</p>
            )}
          </div>
        </div>
      )}

      <CheckoutProfileModal
        open={showCheckoutProfile}
        onClose={() => setShowCheckoutProfile(false)}
        onComplete={(profile, payment) => {
          setShowCheckoutProfile(false);
          completeCheckout(profile, payment);
        }}
      />
    </div>
  );
}
