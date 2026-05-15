'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CartCounter() {
  const [count, setCount] = useState(0);

  const updateCount = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const totalItems = cart.reduce((acc: number, item: any) => acc + item.quantity, 0);
    setCount(totalItems);
  };

  useEffect(() => {
    updateCount();
    window.addEventListener('cartUpdated', updateCount);
    return () => window.removeEventListener('cartUpdated', updateCount);
  }, []);

  return (
    <Link href="/gio-hang" style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '8px' }}>
      🛒 <span style={{ 
        background: 'var(--primary-color)', 
        color: 'var(--bg-color)', 
        borderRadius: '50%', 
        width: '20px', 
        height: '20px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        fontSize: '0.75rem',
        fontWeight: 'bold'
      }}>{count}</span>
    </Link>
  );
}
