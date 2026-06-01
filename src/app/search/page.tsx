import Link from 'next/link';
import AddToCartButton from '@/components/AddToCartButton';
import SafeImage from '@/components/SafeImage';
import { readProducts } from '@/lib/seo';

type SearchPageProps = {
  searchParams: Promise<{ q?: string }>;
};

const suggestions = ['Yến thô', 'Yến tinh hoa', 'Chân yến', 'Yến vụn'];

function normalizeKeyword(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q = '' } = await searchParams;
  const displayQuery = q.replace(/\s+/g, ' ').trim();
  const keyword = normalizeKeyword(displayQuery);
  const products = readProducts();
  const results = keyword
    ? products.filter((product) => {
        const searchableText = normalizeKeyword(
          `${product.name} ${product.description || ''} ${product.category || ''} ${product.badge || ''}`
        );

        return searchableText.includes(keyword);
      })
    : [];

  return (
    <div className="container catalog-page search-page">
      <section className="search-hero" aria-labelledby="search-title">
        <span className="search-eyebrow">Tìm kiếm sản phẩm</span>
        <h1 id="search-title">{displayQuery ? `Kết quả cho "${displayQuery}"` : 'Bạn đang tìm món yến nào?'}</h1>
        <p>
          {displayQuery
            ? `Tìm thấy ${results.length} sản phẩm phù hợp. Từ khóa được tự động lọc dấu và khoảng trắng để ra kết quả chính xác hơn.`
            : 'Nhập tên sản phẩm, loại yến hoặc nhu cầu của bạn để xem các lựa chọn phù hợp.'}
        </p>
        <div className="search-suggestions" aria-label="Gợi ý tìm kiếm">
          {suggestions.map((item) => (
            <Link key={item} href={`/search?q=${encodeURIComponent(item)}`}>
              {item}
            </Link>
          ))}
        </div>
      </section>

      {results.length > 0 ? (
        <>
          <div className="search-summary">
            <strong>{results.length} sản phẩm</strong>
            <span>Sắp xếp theo độ phù hợp với từ khóa của bạn.</span>
          </div>
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
        </>
      ) : (
        <div className="search-empty">
          <h2>Chưa tìm thấy sản phẩm phù hợp</h2>
          <p>Hãy thử từ khóa ngắn hơn như "yến thô", "chân yến" hoặc xem toàn bộ sản phẩm hiện có.</p>
          <Link href="/products" className="btn-primary">
            Xem tất cả sản phẩm
          </Link>
        </div>
      )}
    </div>
  );
}
