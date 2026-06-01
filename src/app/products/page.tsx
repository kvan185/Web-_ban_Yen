import Link from 'next/link';
import AddToCartButton from '@/components/AddToCartButton';
import SafeImage from '@/components/SafeImage';
import { getProducts } from '@/lib/dataStore';
import { absoluteImageUrl, JsonLd, pageMetadata, SITE_URL, truncateDescription } from '@/lib/seo';

type Product = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  description?: string;
  badge?: string;
};

export const metadata = pageMetadata({
  title: 'Sáº£n pháº©m yáº¿n sÃ o nguyÃªn cháº¥t táº¡i TP.HCM',
  description:
    'Mua tá»• yáº¿n thÃ´, yáº¿n tinh cháº¿ vÃ  quÃ  táº·ng yáº¿n sÃ o nguyÃªn cháº¥t táº¡i Yáº¿n Tinh Hoa. Giao nhanh 2-4 giá» táº¡i TP.HCM.',
  pathname: '/products',
  keywords: ['sáº£n pháº©m yáº¿n sÃ o', 'mua tá»• yáº¿n', 'yáº¿n tinh cháº¿', 'tá»• yáº¿n thÃ´', 'yáº¿n sÃ o TP.HCM'],
});

export default async function ProductsPage() {
  const products = (await getProducts()) as Product[];
  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Sáº£n pháº©m yáº¿n sÃ o Yáº¿n Tinh Hoa',
    itemListElement: products.map((product, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `${SITE_URL}/products/${product.id}`,
      item: {
        '@type': 'Product',
        name: product.name,
        description: truncateDescription(product.description || product.name, 300),
        image: absoluteImageUrl(product.imageUrl),
        offers: {
          '@type': 'Offer',
          priceCurrency: 'VND',
          price: product.price,
          availability: 'https://schema.org/InStock',
        },
      },
    })),
  };

  return (
    <>
      <JsonLd data={itemListJsonLd} />
      <div className="container catalog-page">
        <div className="catalog-heading">
          <h1>Táº¥t cáº£ sáº£n pháº©m</h1>
          <p>
            Chá»n nhanh cÃ¡c dÃ²ng yáº¿n thÃ´, yáº¿n tinh cháº¿ vÃ  quÃ  táº·ng yáº¿n sÃ o phÃ¹ há»£p
            cho gia Ä‘Ã¬nh.
          </p>
        </div>

        <div className="product-grid">
          {products.map((product) => (
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
                <strong>{product.price.toLocaleString('vi-VN')} Ä‘</strong>
                <AddToCartButton product={product} />
              </div>
            </article>
          ))}
          {products.length === 0 && (
            <p className="catalog-empty">ChÆ°a cÃ³ sáº£n pháº©m nÃ o. Vui lÃ²ng thÃªm trong Admin.</p>
          )}
        </div>
      </div>
    </>
  );
}
