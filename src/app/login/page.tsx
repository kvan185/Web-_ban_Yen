'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const callbackUrl = searchParams.get('callbackUrl') || '';

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();

      if (data.success) {
        const destination = callbackUrl || (data.isAdmin ? '/manager' : '/account');
        router.push(destination);
        router.refresh();
      } else {
        setError(data.message || 'Đăng nhập thất bại');
      }
    } catch (err) {
      setError('Đã xảy ra lỗi kết nối');
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
      <div className="glass-card" style={{ width: '100%', maxWidth: '420px', padding: '40px', borderRadius: '24px' }}>
        <h1 style={{ marginBottom: '20px', color: 'var(--primary-color)', fontSize: '2rem' }}>Đăng Nhập</h1>
        <p style={{ marginBottom: '30px', color: 'rgba(255,255,255,0.8)' }}>
          Nếu bạn là admin, đăng nhập bằng tài khoản quản trị. Nếu bạn là khách hàng, hãy nhập tên và mật khẩu tùy ý để truy cập trang tài khoản.
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '18px' }}>
          <label style={{ display: 'grid', gap: '8px' }}>
            Tên đăng nhập
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Tên của bạn hoặc admin"
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

          {error && (
            <div style={{ color: '#ff4d4d', background: 'rgba(255,77,77,0.12)', padding: '12px 14px', borderRadius: '12px' }}>
              {error}
            </div>
          )}

          <button type="submit" className="btn-primary" style={{ padding: '14px 20px', opacity: loading ? 0.7 : 1 }} disabled={loading}>
            {loading ? 'Đang xử lý...' : 'Đăng nhập'}
          </button>
        </form>

        <div style={{ marginTop: '24px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px', textAlign: 'center' }}>
          <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '12px' }}>
            Khách hàng mới? <a href="/register" style={{ color: 'var(--primary-color)' }}>Đăng ký tại đây</a>
          </p>
          <a href="/" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontSize: '0.9rem' }}>← Quay lại trang chủ</a>
        </div>
      </div>
    </div>
  );
}
