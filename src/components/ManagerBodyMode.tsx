'use client';

import { useEffect } from 'react';

export default function ManagerBodyMode() {
  useEffect(() => {
    document.body.classList.add('admin-no-footer');

    return () => {
      document.body.classList.remove('admin-no-footer');
    };
  }, []);

  return null;
}
