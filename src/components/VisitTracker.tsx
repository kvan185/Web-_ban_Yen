'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

type VisitTrackerProps = {
  disabled?: boolean;
};

export default function VisitTracker({ disabled = false }: VisitTrackerProps) {
  const pathname = usePathname();

  useEffect(() => {
    if (disabled || !pathname) return;

    const storageKey = 'yenth_visit_session';
    const sessionId =
      window.sessionStorage.getItem(storageKey) ||
      `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;

    window.sessionStorage.setItem(storageKey, sessionId);

    const payload = JSON.stringify({
      path: pathname,
      referrer: document.referrer || '',
      width: window.innerWidth,
      language: navigator.language || '',
      platform: navigator.platform || '',
      sessionId,
    });

    if (navigator.sendBeacon) {
      navigator.sendBeacon('/api/analytics/visit', new Blob([payload], { type: 'application/json' }));
      return;
    }

    fetch('/api/analytics/visit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: payload,
      keepalive: true,
    }).catch(() => {});
  }, [disabled, pathname]);

  return null;
}
