'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import SafeImage from '@/components/SafeImage';
import { CartItem, FavoriteProduct, parseStorageArray } from '@/lib/storage';

type ProductDetailClientProps = {
  id: string;
  initialProduct: FavoriteProduct;
  initialProducts: FavoriteProduct[];
};

const listFromText = (value?: string) =>
  (value || '')
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean);

export default function ProductDetailClient({
  id,
  initialProduct,
  initialProducts,
}: ProductDetailClientProps) {
  const router = useRouter();
  const [product, setProduct] = useState<FavoriteProduct | null>(initialProduct);
  const [allProducts, setAllProducts] = useState<FavoriteProduct[]>(initialProducts);
  const [loading, setLoading] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data);
        const currentProduct = data.find((item: FavoriteProduct) => item.id === id);
        setProduct(currentProduct);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (!product) return;

    const favorites = parseStorageArray<FavoriteProduct>(localStorage.getItem('favoriteProducts'));
    setIsFavorited(favorites.some((item) => item.id === product.id));
  }, [product]);

  useEffect(() => {
    if (!isImageViewerOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsImageViewerOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isImageViewerOpen]);

  const addToCart = () => {
    if (!product) return;

    const cart = parseStorageArray<CartItem>(localStorage.getItem('cart'));
    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, imageUrl: product.imageUrl || '', quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cartUpdated'));
    alert(`Đã thêm ${product.name} vào giỏ hàng!`);
  };

  const buyNow = () => {
    addToCart();
    router.push('/cart');
  };

  const toggleFavorite = () => {
    if (!product) return;

    const favorites = parseStorageArray<FavoriteProduct>(localStorage.getItem('favoriteProducts'));
    const isExistingFavorite = favorites.some((item) => item.id === product.id);
    const updatedFavorites = isExistingFavorite
      ? favorites.filter((item) => item.id !== product.id)
      : [...favorites, product];

    setIsFavorited(!isExistingFavorite);
    localStorage.setItem('favoriteProducts', JSON.stringify(updatedFavorites));
    window.dispatchEvent(new Event('favoritesUpdated'));
    alert(
      isExistingFavorite
        ? `Đã xóa ${product.name} khỏi danh sách yêu thích!`
        : `Đã thêm ${product.name} vào danh sách yêu thích!`
    );
  };

  if (loading) {
    return <div className="container product-detail-feedback">Đang tải thông tin sản phẩm...</div>;
  }

  if (!product) {
    return <div className="container product-detail-feedback">Sản phẩm không tồn tại.</div>;
  }

  const relatedProducts = allProducts.filter((item) => item.id !== product.id).slice(0, 4);

  return (
    <div className="product-detail-page">
      <div className="container product-detail-shell">
        <nav className="product-detail-breadcrumb">
          <Link href="/">Trang chủ</Link> / <Link href="/products">Sản phẩm</Link> /{' '}
          <span>{product.name}</span>
        </nav>

        <div className="product-detail-layout">
          <div className="product-detail-visual">
            <button
              type="button"
              className="product-detail-image-card product-detail-image-trigger"
              onClick={() => setIsImageViewerOpen(true)}
              aria-label={`Xem ảnh lớn của ${product.name}`}
            >
              {product.badge && <div className="product-image-tag product-image-tag-top-left">{product.badge}</div>}
              <div className="product-image-title-tag">{product.name}</div>
              <div className="product-image-tag product-image-tag-bottom-right">{product.weight || '100g'}</div>
              <SafeImage
                src={product.imageUrl || '/images/about-hero.png'}
                alt={product.name}
                className="product-detail-main-image"
              />
              <div className="product-image-zoom-hint">Chạm để xem ảnh lớn</div>
            </button>
            <div className="product-visual-caption">
              <span>Hình ảnh sản phẩm</span>
              <strong>Khung quà đẹp, dễ dùng hằng ngày hoặc biếu tặng</strong>
            </div>
          </div>

          <section className="glass-card product-detail-summary">
            <div className="product-detail-kicker">Yến tuyển chọn</div>
            <h1 className="product-detail-title">{product.name}</h1>

            <div className="product-detail-price-row">
              <p className="product-price-sale product-detail-price-sale">
                {product.price.toLocaleString('vi-VN')} đ
              </p>
              {product.originalPrice && product.originalPrice > product.price && (
                <p className="product-price-original product-detail-price-original">
                  {product.originalPrice.toLocaleString('vi-VN')} đ
                </p>
              )}
            </div>

            <div className="product-detail-proof-row">
              <div className="product-detail-stars">★★★★★</div>
              <span>(12 đánh giá)</span>
              <span>Đã bán 150+</span>
            </div>

            <div className="product-detail-meta-row">
              <span>Xuất xứ: <strong>{product.origin || 'Việt Nam'}</strong></span>
              <span>Hạn sử dụng: <strong>{product.shelfLife || '24 tháng'}</strong></span>
              {product.badge && <span className="product-detail-badge-chip">{product.badge}</span>}
            </div>

            <div className="product-detail-description">
              <p>{product.shortDescription || product.description}</p>
            </div>

            <div className="product-detail-highlight-grid">
              <div>
                <strong>Sợi yến</strong>
                <span>Dễ nhìn chất thật, hợp người muốn chọn kỹ trước khi mua.</span>
              </div>
              <div>
                <strong>Biếu tặng</strong>
                <span>Khung hộp sang và gọn, phù hợp gia đình và đối tác.</span>
              </div>
            </div>

            <div className="product-detail-action-row">
              <button className="btn-primary product-detail-primary-btn" onClick={addToCart}>
                Thêm vào giỏ hàng
              </button>
              <button className="product-detail-secondary-btn" onClick={buyNow}>
                Mua ngay
              </button>
              <button
                onClick={toggleFavorite}
                className={`product-detail-favorite-btn ${isFavorited ? 'is-active' : ''}`}
                title={isFavorited ? 'Bỏ yêu thích' : 'Yêu thích sản phẩm'}
              >
                {isFavorited ? '♥' : '♡'}
              </button>
            </div>
          </section>
        </div>

        <div className="product-detail-box-grid">
          {[
            ['Đặc điểm nổi bật', product.features],
            ['Thông tin chi tiết', product.productInfo],
            ['Đối tượng sử dụng', product.targetUsers],
            [
              'Hướng dẫn sử dụng',
              product.usageGuide ||
                product.usage ||
                'Ngâm yến trong nước sạch khoảng 30 phút cho đến khi sợi yến nở đều.\nChưng cách thủy cùng đường phèn, táo đỏ hoặc hạt sen trong khoảng 20-30 phút.',
            ],
          ].map(([title, value]) => {
            const items = listFromText(value);

            return (
              <section key={title} className="glass-card product-detail-info-box">
                <h2>{title}</h2>
                {items.length > 0 ? (
                  <ul className="product-detail-list">
                    {items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="product-detail-empty">Đang cập nhật.</p>
                )}
              </section>
            );
          })}
        </div>

        <section className="product-detail-related">
          <div className="section-title-wrapper product-detail-related-heading">
            <h2 className="section-title">Sản phẩm tương tự</h2>
          </div>
          <div className="grid-4 product-related-grid">
            {relatedProducts.map((item) => (
              <div key={item.id} className="glass-card product-related-card">
                <Link href={`/products/${item.id}`}>
                  <div className="product-related-media">
                    <SafeImage
                      src={item.imageUrl || '/images/about-hero.png'}
                      alt={item.name}
                      className="product-related-image"
                    />
                  </div>
                  <h3 className="product-related-title">{item.name}</h3>
                </Link>
                <div className="product-price-stack product-related-price">
                  {item.originalPrice && item.originalPrice > item.price && (
                    <span>{item.originalPrice.toLocaleString('vi-VN')} đ</span>
                  )}
                  <strong>{item.price.toLocaleString('vi-VN')} đ</strong>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {isImageViewerOpen && (
        <div
          className="product-image-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`Ảnh lớn của ${product.name}`}
          onClick={() => setIsImageViewerOpen(false)}
        >
          <button
            type="button"
            className="product-image-lightbox-close"
            aria-label="Đóng xem ảnh"
            onClick={() => setIsImageViewerOpen(false)}
          >
            ×
          </button>
          <div
            className="product-image-lightbox-content"
            onClick={(event) => event.stopPropagation()}
          >
            <SafeImage
              src={product.imageUrl || '/images/about-hero.png'}
              alt={product.name}
              className="product-image-lightbox-image"
            />
          </div>
        </div>
      )}
    </div>
  );
}
