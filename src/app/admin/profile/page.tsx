'use client';

import { useEffect, useState } from 'react';

export default function AdminProfilePage() {
  const [profile, setProfile] = useState({ username: 'admin', email: 'admin@yentinhhoa.com' });
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('/api/admin/profile')
      .then((res) => res.json())
      .then((data) => setProfile(data))
      .catch(() => {});
  }, []);

  const handlePasswordUpdate = async () => {
    setError('');
    setMessage('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword, confirmPassword }),
      });

      const data = await res.json();
      if (data.success) {
        setMessage(data.message || 'Đổi mật khẩu thành công');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setError(data.message || 'Đã xảy ra lỗi');
      }
    } catch (err) {
      setError('Không thể kết nối tới máy chủ');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Hồ sơ Admin</h1>
      <div className="glass-card" style={{ maxWidth: '700px' }}>
        <div style={{ marginBottom: '30px' }}>
          <h2>Thông tin tài khoản</h2>
          <p>Quản trị viên hệ thống Yến Tinh Hoa.</p>
          <div style={{ display: 'grid', gap: '12px', marginTop: '20px' }}>
            <div>
              <strong>Tên đăng nhập:</strong> <span>{profile.username}</span>
            </div>
            <div>
              <strong>Email:</strong> <span>{profile.email}</span>
            </div>
          </div>
        </div>

        <div>
          <h2>Đổi mật khẩu</h2>
          <p>Nhập mật khẩu hiện tại và mật khẩu mới để cập nhật.</p>

          <div style={{ display: 'grid', gap: '16px', marginTop: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px' }}>Mật khẩu hiện tại</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="••••••••"
                style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.04)', color: 'inherit' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px' }}>Mật khẩu mới</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
                style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.04)', color: 'inherit' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px' }}>Xác nhận mật khẩu mới</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.04)', color: 'inherit' }}
              />
            </div>

            {error && (
              <div style={{ color: '#ff4d4d', background: 'rgba(255,77,77,0.12)', padding: '12px', borderRadius: '10px' }}>
                {error}
              </div>
            )}
            {message && (
              <div style={{ color: '#72ff72', background: 'rgba(114,255,114,0.12)', padding: '12px', borderRadius: '10px' }}>
                {message}
              </div>
            )}

            <button
              onClick={handlePasswordUpdate}
              disabled={loading}
              className="btn-primary"
              style={{ width: 'fit-content', padding: '14px 24px', marginTop: '10px' }}
            >
              {loading ? 'Đang cập nhật...' : 'Cập nhật mật khẩu'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
