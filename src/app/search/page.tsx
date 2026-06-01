import Link from 'next/link';
import AddToCartButton from '@/components/AddToCartButton';
import SafeImage from '@/components/SafeImage';
import { readProducts } from '@/lib/seo';

type SearchPageProps = {
  searchParams: Promise<{ q?: string }>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q = '' } = await searchParams;
  const keyword = q.trim().toLowerCase();
  const products = readProducts();
  const results = keyword
    ? products.filter((product) =>
        `${product.name} ${product.description || ''} ${product.category || ''}`.toLowerCase().includes(keyword)
      )
    : [];

  return (
    <div className="container catalog-page">
      <div className="catalog-heading">
        <h1>Tìm kiếm</h1>
        <p>{keyword ? `Kết quả cho "${q}"` : 'Nhập từ khóa để tìm sản phẩm phù hợp.'}</p>
      </div>

      {results.length > 0 ? (
        <div className="product-grid">
          {results.map((product) => (
            <article key={product.id} className="glass-card product-card">
              <Link href={`/products/${product.id}`} className="product-card-media">
                {product.badge && <span className="product-badge">{product.badge}</span>}
                <SafeImage src={product.imageUrl} alt={product.name} className="product-card-image" />
              </Link>
              <div className="product-card-body">
                <Link href={`/products/${product.id}`}>
                  <h2>{product.name}</h2>
                </Link>
                <p className="product-card-desc">{product.description}</p>
                <strong>{product.price.toLocaleString('vi-VN')} đ</strong>
                <AddToCartButton product={{ ...product, imageUrl: product.imageUrl || '' }} />
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="glass-card" style={{ padding: '30px', textAlign: 'center' }}>
          <p>Không tìm thấy sản phẩm phù hợp.</p>
          <Link href="/products" className="btn-primary" style={{ marginTop: '20px', display: 'inline-block' }}>
            Xem tất cả sản phẩm
          </Link>
        </div>
      )}
    </div>
  );
}
