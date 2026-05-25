'use client';

import { useState } from 'react';
import { useEffect } from 'react';
import ManagerLogoutButton from '@/components/ManagerLogoutButton';

type ManagerLink = {
  label: string;
  href: string;
};

type ManagerShellProps = {
  children: React.ReactNode;
  isAdmin: boolean;
  userName?: string;
  links: ManagerLink[];
};

export default function ManagerShell({ children, isAdmin, userName, links }: ManagerShellProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const syncMenuStateByViewport = () => {
      setMenuOpen(window.innerWidth > 768);
    };

    syncMenuStateByViewport();
    window.addEventListener('resize', syncMenuStateByViewport);
    return () => window.removeEventListener('resize', syncMenuStateByViewport);
  }, []);

  return (
    <div className={`manager-shell ${menuOpen ? 'manager-menu-open' : 'manager-menu-closed'}`}>
      <button
        type="button"
        className="manager-menu-toggle"
        aria-expanded={menuOpen}
        aria-controls="manager-sidebar"
        onClick={() => setMenuOpen((value) => !value)}
      >
        <span />
        <span />
        <span />
      </button>

      <aside className="manager-sidebar" id="manager-sidebar">
        <div className="manager-brand">
          <h3>Yến Tinh Hoa</h3>
          <p>{isAdmin ? 'Hệ thống quản trị' : `Tài khoản ${userName || 'khách hàng'}`}</p>
        </div>

        <nav aria-label="Quản lý tài khoản">
          <ul className="manager-nav">
            {links.map((item) => (
              <li key={item.href}>
                <a href={item.href} onClick={() => setMenuOpen(false)}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <ManagerLogoutButton />
      </aside>
      <main className="manager-main">{children}</main>
    </div>
  );
}
