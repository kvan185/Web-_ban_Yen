'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import AddToCartButton from '@/components/AddToCartButton';
import SafeImage from '@/components/SafeImage';
import { sortCategories } from '@/lib/category-order';

type Product = {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  description?: string;
  shortDescription?: string;
  badge?: string;
  category?: string;
};

type Category = {
  id: string;
  name: string;
};

type CategoryClientProps = {
  products: Product[];
  categories: Category[];
};

export default function CategoryClient({ products, categories }: CategoryClientProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const sortedCategories = useMemo(() => sortCategories(categories), [categories]);
  const filteredProducts =
    selectedCategory === 'all'
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <div className="container catalog-page">
      <div className="catalog-heading">
        <h1>Danh mục sản phẩm</h1>
        <p>Lọc nhanh theo từng dòng yến để xem đúng nhóm sản phẩm bạn đang cần.</p>
      </div>

      <div className="category-filter" aria-label="Lọc danh mục">
        <button
          type="button"
          className={selectedCategory === 'all' ? 'is-active' : ''}
          onClick={() => setSelectedCategory('all')}
        >
          Tất cả
        </button>
        {sortedCategories.map((category) => (
          <button
            key={category.id}
            type="button"
            className={selectedCategory === category.name ? 'is-active' : ''}
            onClick={() => setSelectedCategory(category.name)}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="product-grid">
        {filteredProducts.map((product) => (
          <article key={product.id} className="glass-card product-card">
            <Link href={`/products/${product.id}`} className="product-card-media">
              {product.badge && <span className="product-badge">{product.badge}</span>}
              <SafeImage src={product.imageUrl} alt={product.name} className="product-card-image" />
            </Link>
            <div className="product-card-body">
              <Link href={`/products/${product.id}`}>
                <h2>{product.name}</h2>
              </Link>
              <p className="product-card-desc">{product.shortDescription || product.description}</p>
              <div className="product-price-stack">
                {product.originalPrice && product.originalPrice > product.price && (
                  <span>{product.originalPrice.toLocaleString('vi-VN')} đ</span>
                )}
                <strong>{product.price.toLocaleString('vi-VN')} đ</strong>
              </div>
              <AddToCartButton product={product} />
            </div>
          </article>
        ))}
        {filteredProducts.length === 0 && (
          <p className="catalog-empty">Không tìm thấy sản phẩm nào trong danh mục này.</p>
        )}
      </div>
    </div>
  );
}
