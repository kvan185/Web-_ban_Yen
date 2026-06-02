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

const listFromText = (value?: string) => (value || '').split('\n').map(item => item.trim()).filter(Boolean);

export default function ProductDetailClient({
  id,
  initialProduct,
  initialProducts,
}: ProductDetailClientProps) {
  const router = useRouter();
  const [product, setProduct] = useState<FavoriteProduct | null>(initialProduct);
  const [allProducts, setAllProducts] = useState<FavoriteProduct[]>(initialProducts);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setAllProducts(data);
        const p = data.find((item: FavoriteProduct) => item.id === id);
        setProduct(p);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

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

  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    if (product) {
      const favs = parseStorageArray<FavoriteProduct>(localStorage.getItem('favoriteProducts'));
      setIsFavorited(favs.some((item) => item.id === product.id));
    }
  }, [product]);

  const toggleFavorite = () => {
    if (!product) return;
    const favs = parseStorageArray<FavoriteProduct>(localStorage.getItem('favoriteProducts'));
    const isFav = favs.some((item) => item.id === product.id);
    let updatedFavs;
    if (isFav) {
      updatedFavs = favs.filter((item) => item.id !== product.id);
      setIsFavorited(false);
      alert(`Đã xóa ${product.name} khỏi danh sách yêu thích!`);
    } else {
      updatedFavs = [...favs, product];
      setIsFavorited(true);
      alert(`Đã thêm ${product.name} vào danh sách yêu thích!`);
    }
    localStorage.setItem('favoriteProducts', JSON.stringify(updatedFavs));
    window.dispatchEvent(new Event('favoritesUpdated'));
  };

  if (loading) return <div className="container" style={{ padding: '100px', textAlign: 'center' }}>Đang tải thông tin sản phẩm...</div>;
  if (!product) return <div className="container" style={{ padding: '100px', textAlign: 'center' }}>Sản phẩm không tồn tại.</div>;

  const relatedProducts = allProducts.filter(p => p.id !== product.id).slice(0, 4);

  return (
    <div className="product-detail-page">
      <div className="container" style={{ padding: '40px 20px' }}>
        <nav style={{ marginBottom: '30px', opacity: 0.7 }}>
          <Link href="/">Trang chủ</Link> / <Link href="/products">Sản phẩm</Link> / <span style={{ color: 'var(--primary-color)' }}>{product.name}</span>
        </nav>

        <div className="product-detail-layout" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '60px' }}>
          {/* Image Gallery */}
          <div className="product-detail-image-card">
            <SafeImage 
              src={product.imageUrl || '/images/about-hero.png'} 
              alt={product.name}
              className="product-detail-main-image"
            />
            <div className="product-image-title-tag">{product.name}</div>
            <div className="product-image-tag product-image-tag-bottom-right">{product.weight || '100g'}</div>
          </div>

          {/* Product Info */}
          <div>
            <h1 style={{ fontSize: '3.2rem', marginBottom: '15px', lineHeight: '1.2' }}>{product.name}</h1>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '14px', marginBottom: '18px', flexWrap: 'wrap' }}>
              <p className="product-price-sale" style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>
                {product.price.toLocaleString('vi-VN')} đ
              </p>
              {product.originalPrice && product.originalPrice > product.price && (
                <p className="product-price-original" style={{ fontSize: '1.15rem' }}>
                  {product.originalPrice.toLocaleString('vi-VN')} đ
                </p>
              )}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '14px', flexWrap: 'wrap' }}>
              <div style={{ color: '#F1C40F', fontSize: '1.2rem' }}>⭐⭐⭐⭐⭐</div>
              <span style={{ opacity: 0.6 }}>(12 đánh giá)</span>
              <span style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>| Đã bán 150+</span>
              {product.badge && <span className="product-detail-badge-chip">{product.badge}</span>}
            </div>

            <div className="product-detail-meta-row">
              <span>Xuất xứ: <strong>{product.origin || 'Việt Nam'}</strong></span>
              <span>Hạn sử dụng: <strong>{product.shelfLife || '24 tháng'}</strong></span>
            </div>
            
            <div className="glass-card" style={{ marginBottom: '35px' }}>
              <p style={{ opacity: 0.9, lineHeight: '1.8', fontSize: '1.05rem' }}>{product.shortDescription || product.description}</p>
            </div>

            <div style={{ display: 'flex', gap: '15px', marginBottom: '40px', alignItems: 'center' }}>
              <button className="btn-primary" style={{ padding: '18px 30px', fontSize: '1.1rem', flex: 2 }} onClick={addToCart}>
                Thêm Vào Giỏ Hàng
              </button>
              <button className="btn-primary" onClick={buyNow} style={{ background: 'transparent', border: '2px solid var(--primary-color)', color: 'var(--primary-color)', padding: '18px 30px', fontSize: '1.1rem', flex: 1.5 }}>
                Mua Ngay
              </button>
              <button 
                onClick={toggleFavorite}
                style={{
                  background: isFavorited ? 'rgba(231, 76, 60, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                  border: isFavorited ? '2px solid #E74C3C' : '2px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '50px',
                  width: '58px',
                  height: '58px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.8rem',
                  cursor: 'pointer',
                  color: isFavorited ? '#E74C3C' : '#fff',
                  transition: 'all 0.3s ease',
                  boxShadow: isFavorited ? '0 0 15px rgba(231, 76, 60, 0.3)' : 'none'
                }}
                title={isFavorited ? 'Bỏ yêu thích' : 'Yêu thích sản phẩm'}
              >
                {isFavorited ? '❤️' : '🤍'}
              </button>
            </div>
          </div>
        </div>

        <div className="product-detail-box-grid">
          {[
            ['Đặc điểm nổi bật', product.features],
            ['Thông tin chi tiết', product.productInfo],
            ['Đối tượng sử dụng', product.targetUsers],
            ['Hướng dẫn sử dụng', product.usageGuide || product.usage || 'Ngâm yến trong nước sạch khoảng 30 phút cho đến khi sợi yến nở đều.\nChưng cách thủy cùng đường phèn, táo đỏ hoặc hạt sen trong khoảng 20-30 phút.'],
          ].map(([title, value]) => {
            const items = listFromText(value);
            return (
              <section key={title} className="glass-card product-detail-info-box">
                <h2>{title}</h2>
                {items.length > 0 ? (
                  <ul className="product-detail-list">
                    {items.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                ) : (
                  <p style={{ color: 'var(--text-muted)' }}>Đang cập nhật.</p>
                )}
              </section>
            );
          })}
        </div>

        {/* Related Products */}
        <div style={{ marginTop: '100px' }}>
          <div className="section-title-wrapper" style={{ textAlign: 'left' }}>
            <h2 className="section-title">Sản Phẩm Tương Tự</h2>
          </div>
          <div className="grid-4">
            {relatedProducts.map((p) => (
              <div key={p.id} className="glass-card" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', height: '100%' }}>
                <Link href={`/products/${p.id}`}>
                  <div style={{ 
                    height: '200px', 
                    width: '100%',
                    overflow: 'hidden',
                    borderRadius: '8px', 
                    marginBottom: '15px'
                  }}>
                    <SafeImage 
                      src={p.imageUrl || '/images/about-hero.png'} 
                      alt={p.name}
                      style={{ width: '100%', height: '100%', objectFit: 'contain', background: 'rgba(0,0,0,0.18)' }}
                    />
                  </div>
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>{p.name}</h3>
                </Link>
                <div className="product-price-stack" style={{ alignItems: 'center' }}>
                  {p.originalPrice && p.originalPrice > p.price && (
                    <span>{p.originalPrice.toLocaleString('vi-VN')} đ</span>
                  )}
                  <strong style={{ color: 'var(--primary-color)' }}>{p.price.toLocaleString('vi-VN')} đ</strong>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
