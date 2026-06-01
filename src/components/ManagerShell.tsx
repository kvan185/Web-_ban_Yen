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
  return (
    <div className="manager-shell manager-menu-css">
      <input
        type="checkbox"
        className="manager-menu-control manager-menu-open-control"
        id="manager-menu-open-control"
        defaultChecked
        aria-label="Mở menu quản trị"
      />
      <label className="manager-menu-toggle" htmlFor="manager-menu-open-control" role="button">
        <span />
        <span />
        <span />
      </label>

      <aside className="manager-sidebar" id="manager-sidebar">
        <div className="manager-brand">
          <h3>Yến Tinh Hoa</h3>
          <p>{isAdmin ? 'Hệ thống quản trị' : `Tài khoản ${userName || 'khách hàng'}`}</p>
        </div>

        <nav aria-label="Quản lý tài khoản">
          <ul className="manager-nav">
            {links.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
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
