'use client';

import { usePathname } from 'next/navigation';
import SiteHeader from '@/components/SiteHeader';
import VisitTracker from '@/components/VisitTracker';

type PublicChromeProps = {
  isAdmin: boolean;
  isUser: boolean;
};

export default function PublicChrome({ isAdmin, isUser }: PublicChromeProps) {
  const pathname = usePathname() || '';
  const isLoginPage = pathname.startsWith('/login');
  const isManagerPage = pathname.startsWith('/manager');
  const isAdminManagerPage = isManagerPage && isAdmin;

  if (isLoginPage) {
    return <VisitTracker disabled />;
  }

  return (
    <>
      <SiteHeader
        isAdmin={isAdmin}
        isUser={isUser}
        showTopHeader={!isAdminManagerPage}
        enableAutoHide={!isAdminManagerPage}
      />
      <VisitTracker disabled={isManagerPage} />
    </>
  );
}

export function PublicFooter({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || '';
  const isLoginPage = pathname.startsWith('/login');
  const isManagerPage = pathname.startsWith('/manager');

  if (isLoginPage || isManagerPage) return null;

  return <>{children}</>;
}
