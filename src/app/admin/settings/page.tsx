'use client';

import { useState, useEffect } from 'react';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    primaryColor: '#D4AF37',
    backgroundColor: '#1A1A1A',
    textColor: '#F5F5F5',
    productsPerRow: 4,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch('/api/settings')
      .then((res) => res.json())
      .then((data) => {
        setSettings(data);
        setLoading(false);
      });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: name === 'productsPerRow' ? parseInt(value) : value,
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    await fetch('/api/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings),
    });
    setSaving(false);
    alert('Đã lưu cấu hình. Vui lòng tải lại trang để thấy thay đổi (hoặc Next.js tự cập nhật trong dev mode).');
    window.location.reload();
  };

  if (loading) return <div>Đang tải...</div>;

  return (
    <div className="glass-card">
      <h2 style={{ marginBottom: '20px' }}>Cài đặt Giao diện</h2>
      
      <div style={{ display: 'grid', gap: '20px', maxWidth: '500px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '8px' }}>Màu chủ đạo (Primary Color):</label>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <input 
              type="color" 
              name="primaryColor" 
              value={settings.primaryColor} 
              onChange={handleChange} 
            />
            <span>{settings.primaryColor}</span>
          </div>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '8px' }}>Màu nền (Background Color):</label>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <input 
              type="color" 
              name="backgroundColor" 
              value={settings.backgroundColor} 
              onChange={handleChange} 
            />
            <span>{settings.backgroundColor}</span>
          </div>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '8px' }}>Màu chữ (Text Color):</label>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <input 
              type="color" 
              name="textColor" 
              value={settings.textColor} 
              onChange={handleChange} 
            />
            <span>{settings.textColor}</span>
          </div>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '8px' }}>Số lượng sản phẩm trên 1 hàng (Desktop):</label>
          <input 
            type="number" 
            name="productsPerRow" 
            value={settings.productsPerRow} 
            onChange={handleChange} 
            min="2" max="6"
            style={{ width: '100%', padding: '8px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.2)', color: 'white' }}
          />
        </div>

        <button 
          onClick={handleSave} 
          className="btn-primary" 
          disabled={saving}
          style={{ marginTop: '20px' }}
        >
          {saving ? 'Đang lưu...' : 'Lưu Thay Đổi'}
        </button>
      </div>
    </div>
  );
}
