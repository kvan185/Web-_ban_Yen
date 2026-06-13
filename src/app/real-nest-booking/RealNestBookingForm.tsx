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

const nestTypeOptions = ['Tổ thô nguyên tổ', 'Tổ tinh chế theo yêu cầu', 'Chân yến', 'Vụn yến'];
const weightOptions = ['100g', '200g', '1kg', '2kg'];
const purposeOptions = [
  'Dùng cho gia đình',
  'Biếu tặng',
  'Bồi bổ người lớn tuổi',
  'Chăm sóc mẹ bầu/phụ nữ',
  'Dùng cho người mới ốm dậy',
  'Làm quà doanh nghiệp',
  'Đặt định kỳ',
  'Mua số lượng lớn',
];
const lotOptions = [
  'Tư vấn lô phù hợp',
  'Lô ảnh 1-4',
  'Lô ảnh 5-8',
  'Lô ảnh 9-12',
  'Lô đẹp để biếu tặng',
  'Lô sợi dày, ít tạp',
  'Lô ưu tiên giá tốt',
  'Lô số lượng lớn',
  'Muốn xem thêm qua Zalo',
];

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
      <div className="real-booking-form-section">
        <strong>1. Thông tin liên hệ</strong>
        <div className="real-booking-field-grid">
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
            <span>Số điện thoại/Zalo</span>
            <input
              value={form.phone}
              onChange={(event) => updateField('phone', event.target.value)}
              required
              inputMode="tel"
              placeholder="0375266538"
            />
          </label>
        </div>
      </div>

      <div className="real-booking-form-section">
        <strong>2. Nhu cầu chọn lô</strong>
        <div className="real-booking-field-grid">
          <label>
            <span>Loại tổ</span>
            <select value={form.nestType} onChange={(event) => updateField('nestType', event.target.value)}>
              {nestTypeOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>
          <label>
            <span>Trọng lượng dự kiến</span>
            <select value={form.weight} onChange={(event) => updateField('weight', event.target.value)}>
              {weightOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>
          <label>
            <span>Mục đích</span>
            <select value={form.purpose} onChange={(event) => updateField('purpose', event.target.value)}>
              {purposeOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>
          <label>
            <span>Lô ảnh muốn xem</span>
            <select value={form.lotCode} onChange={(event) => updateField('lotCode', event.target.value)}>
              {lotOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <label className="real-booking-note">
        <span>Ghi chú thêm</span>
        <textarea
          value={form.note}
          onChange={(event) => updateField('note', event.target.value)}
          placeholder="Ví dụ: muốn tổ đẹp để biếu, ưu tiên sợi dày, cần đóng hộp..."
          rows={3}
        />
      </label>
      <button type="submit" className="btn-primary" disabled={saving}>
        {saving ? 'Đang gửi yêu cầu' : 'Gửi yêu cầu tư vấn'}
      </button>
      {message && <p className="real-booking-message">{message}</p>}
    </form>
  );
}
