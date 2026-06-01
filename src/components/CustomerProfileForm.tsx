'use client';

import { useEffect, useState } from 'react';
import AddressFields from '@/components/AddressFields';
import { CustomerProfile } from '@/components/CheckoutProfileModal';
import { AddressSelection, composeAddress, emptyAddressSelection, splitStoredAddress } from '@/lib/vietnamAddress';

const emptyProfile: CustomerProfile = {
  fullName: '',
  email: '',
  phone: '',
  address: '',
  gender: '',
  birthday: '',
};

export default function CustomerProfileForm({ userName }: { userName: string }) {
  const [profile, setProfile] = useState<CustomerProfile>(emptyProfile);
  const [address, setAddress] = useState<AddressSelection>(emptyAddressSelection);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      try {
        const stored = localStorage.getItem('customerProfile');
        if (!stored || stored === 'undefined') return;
        const storedProfile = { ...emptyProfile, ...JSON.parse(stored) };
        setProfile(storedProfile);
        setAddress(splitStoredAddress(storedProfile.address));
      } catch {
        setProfile(emptyProfile);
        setAddress(emptyAddressSelection);
      }
    }, 0);

    return () => window.clearTimeout(timeout);
  }, [userName]);

  const updateField = (field: keyof CustomerProfile, value: string) => {
    setSaved(false);
    setProfile((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    localStorage.setItem('customerProfile', JSON.stringify({ ...profile, address: composeAddress(address) }));
    setSaved(true);
  };

  return (
    <form className="glass-card customer-profile-form" onSubmit={handleSubmit}>
      <h2>Thông tin liên hệ</h2>
      <p className="profile-login-note">
        Tên đăng nhập: <strong>{userName}</strong>
      </p>
      <div className="profile-form-grid">
        <label>
          <span>Họ và tên</span>
          <input value={profile.fullName} onChange={(e) => updateField('fullName', e.target.value)} />
        </label>
        <label>
          <span>Email</span>
          <input type="email" value={profile.email} onChange={(e) => updateField('email', e.target.value)} />
        </label>
        <label>
          <span>Số điện thoại</span>
          <input value={profile.phone} onChange={(e) => updateField('phone', e.target.value)} />
        </label>
        <label>
          <span>Giới tính</span>
          <select value={profile.gender} onChange={(e) => updateField('gender', e.target.value)}>
            <option value="">Chưa chọn</option>
            <option value="Nam">Nam</option>
            <option value="Nữ">Nữ</option>
            <option value="Khác">Khác</option>
          </select>
        </label>
        <label>
          <span>Ngày sinh</span>
          <input type="date" value={profile.birthday} onChange={(e) => updateField('birthday', e.target.value)} />
        </label>
        <div className="profile-address">
          <span>Địa chỉ</span>
          <AddressFields
            value={address}
            onChange={(nextAddress) => {
              setSaved(false);
              setAddress(nextAddress);
            }}
          />
        </div>
      </div>
      {saved && <p className="profile-saved">Đã lưu thông tin khách hàng.</p>}
      <button type="submit" className="btn-primary">
        Lưu thông tin
      </button>
    </form>
  );
}
