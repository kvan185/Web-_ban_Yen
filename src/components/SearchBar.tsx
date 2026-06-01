'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const normalizedQuery = query.trim().replace(/\s+/g, ' ');

    if (normalizedQuery) {
      router.push(`/search?q=${encodeURIComponent(normalizedQuery)}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="site-search" role="search">
      <input
        type="text"
        placeholder="Tìm yến thô, chân yến..."
        aria-label="Tìm kiếm sản phẩm"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="site-search-input"
      />
      <button type="submit" className="site-search-button" aria-label="Tìm kiếm">
        <span aria-hidden="true" className="site-search-icon" />
        <span>Tìm</span>
      </button>
    </form>
  );
}
