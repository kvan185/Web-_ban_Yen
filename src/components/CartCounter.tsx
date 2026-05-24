'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { CartItem, parseStorageArray } from '@/lib/storage';

export default function CartCounter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const updateCount = () => {
      const cart = parseStorageArray<CartItem>(localStorage.getItem('cart'));
      setCount(cart.reduce((acc, item) => acc + item.quantity, 0));
    };

    const timeout = window.setTimeout(updateCount, 0);
    window.addEventListener('cartUpdated', updateCount);

    return () => {
      window.clearTimeout(timeout);
      window.removeEventListener('cartUpdated', updateCount);
    };
  }, []);

  return (
    <Link href="/gio-hang" className="cart-link" aria-label={`Giỏ hàng có ${count} sản phẩm`}>
      <span>Giỏ</span>
      <span className="cart-count">{count}</span>
    </Link>
  );
}
