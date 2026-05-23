'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (!username.trim() || !password.trim()) {
      setError('Vui lòng nhập tên đăng nhập và mật khẩu.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Mật khẩu xác nhận không khớp.');
      return;
    }

    if (username.toLowerCase() === 'admin') {
      setError('Tên đăng nhập này không được sử dụng. Vui lòng chọn tên khác.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();

      if (data.success) {
        router.push('/account');
        router.refresh();
      } else {
        setError(data.message || 'Đăng ký không thành công.');
      }
    } catch (err) {
      setError('Đã xảy ra lỗi kết nối.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, rgba(10,10,10,0.95), rgba(0,0,0,0.95))',
      padding: '20px'
    }}>
      <div className="glass-card" style={{ width: '100%', maxWidth: '480px', padding: '40px', borderRadius: '24px' }}>
        <h1 style={{ marginBottom: '20px', color: 'var(--primary-color)', fontSize: '2rem' }}>Đăng ký khách hàng mới</h1>
        <p style={{ marginBottom: '30px', color: 'rgba(255,255,255,0.8)' }}>
          Tạo tài khoản mới để lưu yêu thích và xem lịch sử đặt hàng.
        </p>

        <form onSubmit={handleRegister} style={{ display: 'grid', gap: '18px' }}>
          <label style={{ display: 'grid', gap: '8px' }}>
            Tên đăng nhập
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Tên của bạn"
              style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.05)', color: 'white' }}
              required
            />
          </label>

          <label style={{ display: 'grid', gap: '8px' }}>
            Mật khẩu
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.05)', color: 'white' }}
              required
            />
          </label>

          <label style={{ display: 'grid', gap: '8px' }}>
            Xác nhận mật khẩu
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.05)', color: 'white' }}
              required
            />
          </label>

          {error && (
            <div style={{ color: '#ff4d4d', background: 'rgba(255,77,77,0.12)', padding: '12px 14px', borderRadius: '12px' }}>
              {error}
            </div>
          )}

          <button type="submit" className="btn-primary" style={{ padding: '14px 20px', opacity: loading ? 0.7 : 1 }} disabled={loading}>
            {loading ? 'Đang xử lý...' : 'Đăng ký'}
          </button>
        </form>

        <div style={{ marginTop: '24px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px', textAlign: 'center' }}>
          <p style={{ color: 'rgba(255,255,255,0.7)' }}>
            Đã có tài khoản? <a href="/login" style={{ color: 'var(--primary-color)' }}>Đăng nhập ngay</a>
          </p>
        </div>
      </div>
    </div>
  );
}
