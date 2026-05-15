'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/tim-kiem?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="header-search">
      <input 
        type="text" 
        placeholder="Tìm sản phẩm..." 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ 
          padding: '8px 15px', 
          borderRadius: '20px', 
          border: '1px solid rgba(255,255,255,0.2)',
          background: 'rgba(255,255,255,0.05)',
          color: 'white',
          width: '200px',
          outline: 'none',
          transition: 'all 0.3s'
        }} 
        className="search-input"
      />
    </form>
  );
}
