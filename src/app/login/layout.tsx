'use client';

import { useEffect } from 'react';

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    document.body.classList.add('no-footer');
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.classList.remove('no-footer');
      document.body.style.overflow = '';
    };
  }, []);

  return <>{children}</>;
}
