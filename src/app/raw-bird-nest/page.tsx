import Link from 'next/link';
import AddToCartButton from '@/components/AddToCartButton';
import SafeImage from '@/components/SafeImage';
import { JsonLd, pageMetadata, readProducts, SITE_URL } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Yến thô nguyên chất tại TP.HCM - Giá yến thô 100g',
  description:
    'Mua yến thô nguyên chất, tổ yến thô ít lông, yến thô xô và chân yến thô tại Yến Tinh Hoa. Tư vấn chọn yến thô phù hợp, giao nhanh tại TP.HCM.',
  pathname: '/raw-bird-nest',
  keywords: ['yến thô', 'mua yến thô', 'tổ yến thô', 'yến thô nguyên chất', 'giá yến thô 100g', 'yến thô TP.HCM'],
});

function isRawBirdNestProduct(product: ReturnType<typeof readProducts>[number]) {
  const searchText = `${product.name} ${product.category || ''} ${product.description || ''}`.toLowerCase();
  return searchText.includes('yến thô') || searchText.includes('yáº¿n thã´') || searchText.includes('yen tho');
}

export default function RawBirdNestPage() {
  const rawProducts = readProducts().filter(isRawBirdNestProduct);
  const lowestPrice = rawProducts.length ? Math.min(...rawProducts.map((product) => product.price)) : 0;

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Yến thô là gì?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yến thô là tổ yến còn giữ trạng thái tự nhiên sau khi thu hoạch, thường còn lông và tạp chất nhỏ. Người dùng cần ngâm, nhặt sạch rồi mới chưng.',
        },
      },
      {
        '@type': 'Question',
        name: 'Yến thô phù hợp với ai?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yến thô phù hợp với khách muốn tự làm sạch, kiểm soát quá trình sơ chế và thích giữ hình dáng tổ yến tự nhiên.',
        },
      },
      {
        '@type': 'Question',
        name: 'Mua yến thô ở đâu tại TP.HCM?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yến Tinh Hoa cung cấp các dòng yến thô, tổ yến thô ít lông, yến thô xô và chân yến thô, hỗ trợ tư vấn và giao nhanh tại TP.HCM.',
        },
      },
    ],
  };

  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${SITE_URL}/raw-bird-nest#collection`,
    name: 'Yến thô nguyên chất',
    url: `${SITE_URL}/raw-bird-nest`,
    description: 'Trang tổng hợp sản phẩm yến thô nguyên chất tại Yến Tinh Hoa.',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: rawProducts.map((product, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${SITE_URL}/products/${product.id}`,
        name: product.name,
      })),
    },
  };

  return (
    <>
      <JsonLd data={[faqJsonLd, collectionJsonLd]} />
      <div className="container catalog-page">
        <div className="catalog-heading">
          <p className="eyebrow">Yến thô nguyên chất</p>
          <h1>Yến thô</h1>
          <p>
            Chọn tổ yến thô, yến thô xô và chân yến thô cho khách muốn tự sơ chế tại nhà. Yến
            Tinh Hoa tư vấn theo nhu cầu sử dụng, ngân sách và thời gian nhặt lông của từng gia đình.
          </p>
          {lowestPrice > 0 && (
            <p className="seo-price-note">
              Giá yến thô tham khảo từ <strong>{lowestPrice.toLocaleString('vi-VN')} đ</strong>.
            </p>
          )}
        </div>

        <section className="seo-content-block">
          <h2>Mua yến thô cần xem gì?</h2>
          <div className="seo-info-grid">
            <article>
              <h3>Độ sạch và lượng lông</h3>
              <p>Tổ càng ít lông thường dễ sơ chế hơn. Nếu mới dùng yến thô, nên ưu tiên dòng ít lông.</p>
            </article>
            <article>
              <h3>Mùi và dáng tổ</h3>
              <p>Yến thô tốt thường có mùi tự nhiên, tổ chắc, sợi rõ và không có mùi lạ.</p>
            </article>
            <article>
              <h3>Nhu cầu sử dụng</h3>
              <p>Dùng hằng tuần có thể chọn yến thô xô hoặc chân yến thô; biếu tặng nên chọn nguyên tổ.</p>
            </article>
          </div>
        </section>

        <section>
          <div className="section-heading-row">
            <div>
              <p className="eyebrow">Sản phẩm phù hợp</p>
              <h2 className="section-title">Các dòng yến thô đang bán</h2>
            </div>
            <Link href="/products" className="section-link">Xem tất cả sản phẩm</Link>
          </div>

          <div className="product-grid">
            {rawProducts.map((product) => (
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
        </section>
      </div>
    </>
  );
}
