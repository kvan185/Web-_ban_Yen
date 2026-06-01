'use client';

import { useEffect, useMemo, useState } from 'react';
import AddressFields from '@/components/AddressFields';
import {
  AddressSelection,
  composeAddress,
  emptyAddressSelection,
  splitStoredAddress,
} from '@/lib/vietnamAddress';

export type CustomerProfile = {
  fullName: string;
  email?: string;
  phone: string;
  address: string;
  gender?: string;
  birthday?: string;
};

export type CheckoutPayment = {
  method: 'bank' | 'cod';
  transferContent: string;
};

const emptyProfile: CustomerProfile = {
  fullName: '',
  email: '',
  phone: '',
  address: '',
  gender: '',
  birthday: '',
};

export function readCustomerProfile(): CustomerProfile {
  try {
    const stored = localStorage.getItem('customerProfile');
    if (!stored || stored === 'undefined' || stored === 'null') return emptyProfile;
    return { ...emptyProfile, ...JSON.parse(stored) };
  } catch {
    return emptyProfile;
  }
}

export function hasRequiredCheckoutProfile(profile: CustomerProfile) {
  return Boolean(profile.fullName.trim() && profile.phone.trim() && profile.address.trim());
}

type CheckoutProfileModalProps = {
  open: boolean;
  onClose: () => void;
  onComplete: (profile: CustomerProfile, payment: CheckoutPayment) => void;
};

export default function CheckoutProfileModal({ open, onClose, onComplete }: CheckoutProfileModalProps) {
  const [profile, setProfile] = useState<CustomerProfile>(emptyProfile);
  const [address, setAddress] = useState<AddressSelection>(emptyAddressSelection);
  const [editingProfile, setEditingProfile] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'bank' | 'cod'>('cod');
  const [transferContent, setTransferContent] = useState('');

  useEffect(() => {
    if (!open) return;
    const storedProfile = readCustomerProfile();
    setProfile(storedProfile);
    setAddress(splitStoredAddress(storedProfile.address));
    setEditingProfile(!hasRequiredCheckoutProfile(storedProfile));
    setPaymentMethod('cod');
    setTransferContent(`YTH ${Date.now().toString().slice(-8)}`);
  }, [open]);

  const currentAddressText = useMemo(() => composeAddress(address) || profile.address, [address, profile.address]);

  if (!open) return null;

  const saveProfile = () => {
    const nextProfile = { ...profile, address: composeAddress(address) };
    localStorage.setItem('customerProfile', JSON.stringify(nextProfile));
    setProfile(nextProfile);
    setEditingProfile(false);
    return nextProfile;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextProfile = editingProfile ? saveProfile() : profile;
    if (!hasRequiredCheckoutProfile(nextProfile)) {
      setEditingProfile(true);
      return;
    }

    onComplete(nextProfile, { method: paymentMethod, transferContent });
  };

  return (
    <div className="checkout-modal-backdrop" role="dialog" aria-modal="true">
      <form className="glass-card checkout-modal checkout-order-modal" onSubmit={handleSubmit}>
        <div className="checkout-modal-header">
          <div>
            <h2>Thông tin thanh toán</h2>
            <p>Kiểm tra thông tin mua hàng và chọn phương thức thanh toán trước khi đặt đơn.</p>
          </div>
          <button type="button" onClick={onClose} aria-label="Đóng popup">
            x
          </button>
        </div>

        <section className="checkout-section">
          <div className="checkout-section-heading">
            <h3>Thông tin mua hàng</h3>
            <button type="button" onClick={() => setEditingProfile((value) => !value)}>
              {editingProfile ? 'Xem thông tin' : 'Cập nhật'}
            </button>
          </div>

          {editingProfile ? (
            <>
              <div className="checkout-modal-grid">
                <label>
                  <span>Họ và tên</span>
                  <input
                    value={profile.fullName}
                    onChange={(event) => setProfile((current) => ({ ...current, fullName: event.target.value }))}
                    placeholder="Tên người nhận"
                    required
                  />
                </label>
                <label>
                  <span>Số điện thoại</span>
                  <input
                    value={profile.phone}
                    onChange={(event) => setProfile((current) => ({ ...current, phone: event.target.value }))}
                    placeholder="Số điện thoại liên hệ"
                    required
                  />
                </label>
              </div>
              <AddressFields value={address} onChange={setAddress} compact />
              <button type="button" className="checkout-save-profile" onClick={saveProfile}>
                Lưu thông tin nhận hàng
              </button>
            </>
          ) : (
            <div className="checkout-info-list">
              <div>
                <span>Người nhận</span>
                <strong>{profile.fullName || 'Chưa có tên'}</strong>
              </div>
              <div>
                <span>Số điện thoại</span>
                <strong>{profile.phone || 'Chưa có số điện thoại'}</strong>
              </div>
              <div>
                <span>Địa chỉ</span>
                <strong>{currentAddressText || 'Chưa có địa chỉ'}</strong>
              </div>
            </div>
          )}
        </section>

        <section className="checkout-section">
          <h3>Phương thức thanh toán</h3>
          <div className="payment-options">
            <label className={paymentMethod === 'cod' ? 'is-active' : ''}>
              <input
                type="radio"
                name="paymentMethod"
                value="cod"
                checked={paymentMethod === 'cod'}
                onChange={() => setPaymentMethod('cod')}
              />
              <span>Thanh toán khi nhận hàng</span>
            </label>
            <label className={paymentMethod === 'bank' ? 'is-active' : ''}>
              <input
                type="radio"
                name="paymentMethod"
                value="bank"
                checked={paymentMethod === 'bank'}
                onChange={() => setPaymentMethod('bank')}
              />
              <span>Chuyển khoản MB Bank</span>
            </label>
          </div>

          {paymentMethod === 'bank' && (
            <p className="checkout-payment-note">
              Bạn sẽ được chuyển sang trang thanh toán riêng để quét mã QR MB Bank.
            </p>
          )}
        </section>

        <div className="checkout-modal-actions">
          <button type="button" onClick={onClose}>
            Hủy
          </button>
          <button type="submit" className="btn-primary">
            {paymentMethod === 'bank' ? 'Tiếp tục chuyển khoản' : 'Xác nhận đặt hàng'}
          </button>
        </div>
      </form>
    </div>
  );
}
