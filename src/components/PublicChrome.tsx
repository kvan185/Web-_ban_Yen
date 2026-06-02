'use client';

import { usePathname } from 'next/navigation';
import SiteHeader from '@/components/SiteHeader';
import VisitTracker from '@/components/VisitTracker';
import type { SiteCategory } from '@/lib/categories';

type PublicChromeProps = {
  isAdmin: boolean;
  isUser: boolean;
  categories: SiteCategory[];
};

export default function PublicChrome({ isAdmin, isUser, categories }: PublicChromeProps) {
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
        categories={categories}
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
