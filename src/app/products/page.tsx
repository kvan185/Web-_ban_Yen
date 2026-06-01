import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import AddToCartButton from '@/components/AddToCartButton';
import SafeImage from '@/components/SafeImage';
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
  title: 'Sản phẩm yến sào nguyên chất tại TP.HCM',
  description:
    'Mua tổ yến thô, yến tinh chế và quà tặng yến sào nguyên chất tại Yến Tinh Hoa. Giao nhanh 2-4 giờ tại TP.HCM.',
  pathname: '/products',
  keywords: ['sản phẩm yến sào', 'mua tổ yến', 'yến tinh chế', 'tổ yến thô', 'yến sào TP.HCM'],
});

function getProducts(): Product[] {
  try {
    const productsFilePath = path.join(process.cwd(), 'src', 'data', 'products.json');
    if (!fs.existsSync(productsFilePath)) return [];
    return JSON.parse(fs.readFileSync(productsFilePath, 'utf8'));
  } catch {
    return [];
  }
}

export default function ProductsPage() {
  const products = getProducts();
  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Sản phẩm yến sào Yến Tinh Hoa',
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
          <h1>Tất cả sản phẩm</h1>
          <p>
            Chọn nhanh các dòng yến thô, yến tinh chế và quà tặng yến sào phù hợp
            cho gia đình.
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
                <strong>{product.price.toLocaleString('vi-VN')} đ</strong>
                <AddToCartButton product={product} />
              </div>
            </article>
          ))}
          {products.length === 0 && (
            <p className="catalog-empty">Chưa có sản phẩm nào. Vui lòng thêm trong Admin.</p>
          )}
        </div>
      </div>
    </>
  );
}
