'use client';

import { useEffect, useState } from 'react';

type CustomerProfile = {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  gender: string;
  birthday: string;
};

const emptyProfile: CustomerProfile = {
  fullName: '',
  email: '',
  phone: '',
  address: '',
  gender: '',
  birthday: '',
};

export default function CustomerProfileForm({ userName }: { userName: string }) {
  const [profile, setProfile] = useState<CustomerProfile>({ ...emptyProfile, fullName: userName });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      try {
        const stored = localStorage.getItem('customerProfile');
        if (!stored || stored === 'undefined') return;
        setProfile({ ...emptyProfile, fullName: userName, ...JSON.parse(stored) });
      } catch {
        setProfile({ ...emptyProfile, fullName: userName });
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
    localStorage.setItem('customerProfile', JSON.stringify(profile));
    setSaved(true);
  };

  return (
    <form className="glass-card customer-profile-form" onSubmit={handleSubmit}>
      <h2>Thông tin liên hệ</h2>
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
        <label className="profile-address">
          <span>Địa chỉ</span>
          <textarea rows={3} value={profile.address} onChange={(e) => updateField('address', e.target.value)} />
        </label>
      </div>
      {saved && <p className="profile-saved">Đã lưu thông tin khách hàng.</p>}
      <button type="submit" className="btn-primary">Lưu thông tin</button>
    </form>
  );
}
