'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type LoginFormProps = {
  callbackUrl?: string;
  initialError?: string;
};

function getSafeCallbackUrl(fallback = '') {
  const callbackUrl = new URLSearchParams(window.location.search).get('callbackUrl') || '';
  if (callbackUrl.startsWith('/') && !callbackUrl.startsWith('//')) {
    return callbackUrl;
  }

  return fallback;
}

export default function LoginForm({ callbackUrl = '', initialError = '' }: LoginFormProps) {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(initialError);
  const [loading, setLoading] = useState(false);

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
        const destination = getSafeCallbackUrl(callbackUrl) || (data.isAdmin ? '/manager' : '/account');
        router.push(destination);
        router.refresh();
      } else {
        setError(data.message || 'Đăng nhập thất bại');
      }
    } catch {
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
        <h1 style={{ marginBottom: '20px', color: 'var(--primary-color)', fontSize: '2rem' }}>Đăng nhập</h1>
        <p style={{ marginBottom: '30px', color: 'rgba(255,255,255,0.8)' }}>
          Nếu bạn là admin, đăng nhập bằng tài khoản quản trị. Nếu bạn là khách hàng,
          hãy nhập tên và mật khẩu tùy ý để truy cập trang tài khoản.
        </p>

        <form action="/api/admin/login" method="post" onSubmit={handleSubmit} style={{ display: 'grid', gap: '18px' }}>
          <input type="hidden" name="callbackUrl" value={callbackUrl} />
          <label style={{ display: 'grid', gap: '8px' }}>
            Tên đăng nhập
            <input
              name="username"
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="Tên của bạn hoặc admin"
              style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.05)', color: 'white' }}
              required
            />
          </label>

          <label style={{ display: 'grid', gap: '8px' }}>
            Mật khẩu
            <input
              name="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
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
