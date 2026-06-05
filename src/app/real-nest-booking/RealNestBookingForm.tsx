'use client';

import { useMemo, useState } from 'react';

type BookingForm = {
  name: string;
  phone: string;
  nestType: string;
  weight: string;
  purpose: string;
  lotCode: string;
  note: string;
};

const initialForm: BookingForm = {
  name: '',
  phone: '',
  nestType: 'Tổ thô nguyên tổ',
  weight: '100g',
  purpose: 'Dùng cho gia đình',
  lotCode: 'Tư vấn lô phù hợp',
  note: '',
};

export default function RealNestBookingForm() {
  const [form, setForm] = useState(initialForm);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const need = useMemo(
    () =>
      [
        'Đặt tổ theo lô ảnh thực tế',
        `Loại tổ: ${form.nestType}`,
        `Trọng lượng: ${form.weight}`,
        `Mục đích: ${form.purpose}`,
        `Lô ảnh quan tâm: ${form.lotCode}`,
        form.note ? `Ghi chú: ${form.note}` : '',
      ]
        .filter(Boolean)
        .join(' | '),
    [form]
  );

  const updateField = (field: keyof BookingForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setMessage('');

    try {
      const response = await fetch('/api/contact-leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          need,
        }),
      });

      if (!response.ok) throw new Error('Save failed');

      localStorage.setItem(
        'yenth_contact_profile',
        JSON.stringify({ name: form.name, phone: form.phone })
      );
      setForm(initialForm);
      setMessage('Đã gửi yêu cầu giữ tổ. Yến Tinh Hoa sẽ liên hệ xác nhận lô tổ phù hợp.');
    } catch {
      setMessage('Chưa gửi được yêu cầu. Vui lòng thử lại hoặc liên hệ Zalo/Hotline.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form className="real-booking-form" onSubmit={handleSubmit}>
      <label>
        <span>Họ tên</span>
        <input
          value={form.name}
          onChange={(event) => updateField('name', event.target.value)}
          required
          placeholder="Nguyễn Văn A"
        />
      </label>
      <label>
        <span>Số điện thoại</span>
        <input
          value={form.phone}
          onChange={(event) => updateField('phone', event.target.value)}
          required
          inputMode="tel"
          placeholder="0375266538"
        />
      </label>
      <label>
        <span>Loại tổ</span>
        <select value={form.nestType} onChange={(event) => updateField('nestType', event.target.value)}>
          <option>Tổ thô nguyên tổ</option>
          <option>Tổ tinh chế theo yêu cầu</option>
          <option>Chân yến</option>
          <option>Vụn yến</option>
        </select>
      </label>
      <label>
        <span>Trọng lượng</span>
        <select value={form.weight} onChange={(event) => updateField('weight', event.target.value)}>
          <option>50g</option>
          <option>100g</option>
          <option>200g</option>
          <option>500g</option>
        </select>
      </label>
      <label>
        <span>Mục đích</span>
        <select value={form.purpose} onChange={(event) => updateField('purpose', event.target.value)}>
          <option>Dùng cho gia đình</option>
          <option>Biếu tặng</option>
          <option>Đặt định kỳ</option>
          <option>Mua số lượng lớn</option>
        </select>
      </label>
      <label>
        <span>Lô ảnh quan tâm</span>
        <select value={form.lotCode} onChange={(event) => updateField('lotCode', event.target.value)}>
          <option>Tư vấn lô phù hợp</option>
          <option>Lô ảnh 1-4</option>
          <option>Lô ảnh 5-8</option>
          <option>Lô ảnh 9-12</option>
          <option>Muốn xem thêm qua Zalo</option>
        </select>
      </label>
      <label className="real-booking-note">
        <span>Ghi chú</span>
        <textarea
          value={form.note}
          onChange={(event) => updateField('note', event.target.value)}
          placeholder="Ví dụ: muốn giữ tổ đẹp, sợi dày, đóng hộp biếu..."
          rows={4}
        />
      </label>
      <button type="submit" className="btn-primary" disabled={saving}>
        {saving ? 'Đang gửi' : 'Giữ tổ và tư vấn'}
      </button>
      {message && <p className="real-booking-message">{message}</p>}
    </form>
  );
}
