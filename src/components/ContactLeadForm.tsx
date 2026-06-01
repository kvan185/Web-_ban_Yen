'use client';

import { useState } from 'react';

type FormState = {
  name: string;
  phone: string;
  need: string;
};

const initialForm: FormState = {
  name: '',
  phone: '',
  need: '',
};

export default function ContactLeadForm() {
  const [form, setForm] = useState(initialForm);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const updateField = (field: keyof FormState, value: string) => {
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
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error('Save failed');
      }

      localStorage.setItem('yenth_contact_profile', JSON.stringify({
        name: form.name,
        phone: form.phone,
      }));
      setForm(initialForm);
      setMessage('Đã lưu thông tin. Yến Tinh Hoa sẽ liên hệ lại sớm.');
    } catch {
      setMessage('Chưa lưu được thông tin. Vui lòng thử lại.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="glass-card" style={{ padding: '24px', marginBottom: '28px' }}>
      <h2 style={{ marginBottom: '16px' }}>Thông tin liên hệ</h2>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '14px', alignItems: 'end' }}>
        <label style={{ display: 'grid', gap: '8px' }}>
          <span>Họ tên</span>
          <input
            value={form.name}
            onChange={(event) => updateField('name', event.target.value)}
            required
            placeholder="Nguyễn Văn A"
            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(0,0,0,0.2)', color: '#fff' }}
          />
        </label>
        <label style={{ display: 'grid', gap: '8px' }}>
          <span>Số điện thoại</span>
          <input
            value={form.phone}
            onChange={(event) => updateField('phone', event.target.value)}
            required
            inputMode="tel"
            placeholder="0375266538"
            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(0,0,0,0.2)', color: '#fff' }}
          />
        </label>
        <label style={{ display: 'grid', gap: '8px' }}>
          <span>Nhu cầu</span>
          <input
            value={form.need}
            onChange={(event) => updateField('need', event.target.value)}
            placeholder="Tư vấn yến tinh chế, quà biếu..."
            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(0,0,0,0.2)', color: '#fff' }}
          />
        </label>
        <button type="submit" className="btn-primary" disabled={saving} style={{ padding: '12px 20px', minWidth: '120px', height: '45px' }}>
          {saving ? 'Đang lưu' : 'Gửi'}
        </button>
      </form>
      {message && <p style={{ marginTop: '14px', color: 'var(--primary-color)' }}>{message}</p>}
    </section>
  );
}
