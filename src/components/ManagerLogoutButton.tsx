'use client';

import { useRouter } from 'next/navigation';

export default function ManagerLogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/admin/logout', { method: 'POST' });
      if (res.ok) {
        router.push('/login');
        router.refresh();
      }
    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  return (
    <button type="button" onClick={handleLogout} className="manager-logout">
      <span>Thoát</span>
    </button>
  );
}
