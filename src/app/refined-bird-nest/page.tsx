import Link from 'next/link';
import AddToCartButton from '@/components/AddToCartButton';
import SafeImage from '@/components/SafeImage';
import { JsonLd, pageMetadata, ProductSeo, readProducts, SITE_URL } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Yến tinh chế là gì? Yến đã làm sạch tiện dùng tại Yến Tinh Hoa',
  description:
    'Yến tinh chế là tổ yến đã được ngâm, nhặt sạch lông, định hình và sấy khô, tiện chưng tại nhà. Xem giá yến tinh chế, chân yến tinh chế và các dòng yến đã xử lý.',
  pathname: '/refined-bird-nest',
  keywords: [
    'yến tinh chế',
    'yến đã làm sạch',
    'tổ yến tinh chế',
    'yến sào tinh chế',
    'chân yến tinh chế',
    'yến rút lông',
    'mua yến tinh chế',
    'giá yến tinh chế 100g',
  ],
});

function normalizeText(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

function isRefinedBirdNestProduct(product: ProductSeo) {
  const searchText = normalizeText(`${product.name} ${product.category || ''} ${product.description || ''}`);
  return (
    searchText.includes('yen tinh hoa') ||
    searchText.includes('yen tinh che') ||
    searchText.includes('chan yen tinh che') ||
    searchText.includes('yen vun tinh che')
  );
}

export default async function RefinedBirdNestPage() {
  const refinedProducts = (await readProducts()).filter(isRefinedBirdNestProduct);
  const lowestPrice = refinedProducts.length ? Math.min(...refinedProducts.map((product) => product.price)) : 0;
  const highestPrice = refinedProducts.length ? Math.max(...refinedProducts.map((product) => product.price)) : 0;

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Yến tinh chế là gì?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yến tinh chế là tổ yến đã được ngâm nở, nhặt sạch lông và tạp chất, sau đó định hình và sấy khô. Người dùng chỉ cần ngâm lại rồi chưng, không phải tự nhặt lông như yến thô.',
        },
      },
      {
        '@type': 'Question',
        name: 'Yến tinh chế khác yến thô thế nào?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yến thô còn lông và cần tự sơ chế. Yến tinh chế đã làm sạch, tiện dùng hơn, phù hợp người bận rộn hoặc mua biếu tặng. Giá yến tinh chế thường cao hơn vì có thêm công làm sạch.',
        },
      },
      {
        '@type': 'Question',
        name: 'Giá yến tinh chế 100g bao nhiêu?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Tại Yến Tinh Hoa, giá các dòng yến tinh chế hiện dao động từ ${lowestPrice.toLocaleString('vi-VN')} đ đến ${highestPrice.toLocaleString('vi-VN')} đ tùy loại sợi, chân yến, yến vụn hoặc set quà tặng.`,
        },
      },
    ],
  };

  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${SITE_URL}/refined-bird-nest#collection`,
    name: 'Yến tinh chế',
    url: `${SITE_URL}/refined-bird-nest`,
    description: 'Trang giải thích yến tinh chế là gì, cách chọn và danh sách sản phẩm yến đã làm sạch tại Yến Tinh Hoa.',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: refinedProducts.map((product, index) => ({
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
      <div className="container catalog-page raw-bird-nest-page">
        <section className="raw-hero">
          <p className="eyebrow">Yến đã làm sạch</p>
          <h1>Yến tinh chế là gì? Cách chọn yến đã xử lý sạch lông, tiện chưng</h1>
          <p>
            Yến tinh chế, còn được gọi là yến đã làm sạch hoặc tổ yến tinh chế, là dòng yến đã qua xử lý lông và tạp
            chất để khách hàng dùng tiện hơn. Đây là lựa chọn phù hợp cho gia đình bận rộn, người mới dùng yến, hoặc
            khách cần mua yến sào biếu tặng đẹp và dễ sử dụng.
          </p>
          {lowestPrice > 0 && (
            <div className="raw-price-band">
              <span>Giá yến tinh chế tại Yến Tinh Hoa</span>
              <strong>
                {lowestPrice.toLocaleString('vi-VN')} đ - {highestPrice.toLocaleString('vi-VN')} đ
              </strong>
            </div>
          )}
        </section>

        <section className="seo-content-block">
          <h2>Yến tinh chế là gì?</h2>
          <div className="raw-article">
            <p>
              Yến tinh chế là tổ yến thô được ngâm mềm, tách sợi, nhặt sạch lông và loại bỏ tạp chất nhỏ. Sau khi làm
              sạch, yến được định hình lại hoặc sấy thành sợi, chân yến, yến vụn tùy quy cách. Khi dùng, khách chỉ cần
              ngâm nở rồi chưng cách thủy cùng đường phèn, táo đỏ, hạt sen hoặc nguyên liệu yêu thích.
            </p>
            <p>
              So với yến thô, yến tinh chế tiết kiệm nhiều thời gian sơ chế, hạn chế rủi ro nhặt chưa sạch lông và phù
              hợp với người muốn dùng yến đều đặn nhưng không có thời gian xử lý tổ yến từ đầu.
            </p>
          </div>
        </section>

        <section className="seo-content-block">
          <h2>Đặc điểm của yến tinh chế ngon</h2>
          <div className="seo-info-grid">
            <article>
              <h3>Sạch lông, sạch tạp chất</h3>
              <p>Sợi yến được xử lý kỹ, không còn lông lớn, hạn chế lông mịn và bụi tổ, giúp khách chưng nhanh hơn.</p>
            </article>
            <article>
              <h3>Sợi yến rõ, không vụn nát</h3>
              <p>Yến tốt thường có sợi rõ, màu tự nhiên, khi ngâm nở đều và khi chưng vẫn giữ độ dai mềm dễ ăn.</p>
            </article>
            <article>
              <h3>Tiện dùng, dễ biếu tặng</h3>
              <p>Phù hợp người bận rộn, người mới dùng yến hoặc cần hộp quà sức khỏe dễ sử dụng cho gia đình, đối tác.</p>
            </article>
          </div>
        </section>

        <section className="seo-content-block raw-two-column">
          <div>
            <h2>Yến tinh chế phù hợp với ai?</h2>
            <div className="raw-article">
              <p>
                Yến tinh chế phù hợp với khách muốn ưu tiên sự tiện lợi: không phải nhặt lông, không mất nhiều thời gian
                sơ chế, chỉ cần ngâm và chưng. Dòng này cũng hợp cho người lớn tuổi, người mới bắt đầu dùng yến, gia
                đình có trẻ nhỏ hoặc khách mua làm quà vì hình thức sạch đẹp, dễ bảo quản.
              </p>
              <p>
                Nếu bạn thích tự kiểm soát toàn bộ quá trình làm sạch, yến thô là lựa chọn hợp hơn. Nếu bạn cần nhanh,
                đều chất lượng và dễ dùng hằng tuần, yến tinh chế sẽ thực tế hơn.
              </p>
            </div>
          </div>
          <div className="raw-note-box">
            <h3>Nên chọn tên nào để tìm?</h3>
            <p>Khách thường tìm bằng các cụm: yến tinh chế, yến đã làm sạch, tổ yến tinh chế, yến sào tinh chế, chân yến tinh chế hoặc yến rút lông.</p>
          </div>
        </section>

        <section className="seo-content-block">
          <h2>Bảng giá yến tinh chế tại Yến Tinh Hoa</h2>
          <div className="raw-price-table">
            {refinedProducts.map((product) => (
              <Link key={product.id} href={`/products/${product.id}`}>
                <span>{product.name}</span>
                <strong>{product.price.toLocaleString('vi-VN')} đ</strong>
              </Link>
            ))}
          </div>
          <p className="raw-small-note">
            Giá yến tinh chế phụ thuộc vào loại sợi dài, sợi ngắn, chân yến, yến vụn, trọng lượng và quy cách hộp quà.
            Khách có thể chọn theo nhu cầu dùng hằng tuần, bồi bổ gia đình hoặc biếu tặng.
          </p>
        </section>

        <section className="seo-content-block">
          <h2>Nên mua yến tinh chế loại nào?</h2>
          <div className="seo-info-grid">
            <article>
              <h3>Yến tinh chế sợi dài</h3>
              <p>Phù hợp khách muốn sợi đẹp, dai, nở tốt, dùng cho gia đình hoặc biếu tặng trang trọng.</p>
            </article>
            <article>
              <h3>Chân yến tinh chế</h3>
              <p>Phần chân tổ dày, ăn giòn dai hơn, hợp với người thích cảm giác chắc sợi khi chưng.</p>
            </article>
            <article>
              <h3>Yến vụn tinh chế</h3>
              <p>Tiết kiệm hơn, tiện dùng hằng ngày, phù hợp gia đình muốn bổ sung yến đều đặn với chi phí tốt.</p>
            </article>
          </div>
        </section>

        <section className="seo-content-block raw-two-column">
          <div>
            <h2>Cách chưng yến tinh chế</h2>
            <ol className="raw-steps">
              <li>Ngâm yến tinh chế trong nước sạch khoảng 20-30 phút cho sợi mềm và nở đều.</li>
              <li>Cho yến vào thố, thêm nước vừa đủ, chưng cách thủy khoảng 20-25 phút.</li>
              <li>Thêm đường phèn, táo đỏ hoặc hạt sen ở giai đoạn cuối để giữ vị thanh.</li>
              <li>Dùng ấm hoặc để nguội bảo quản lạnh, không chưng quá lâu để tránh sợi bị nhão.</li>
            </ol>
          </div>
          <div className="raw-note-box">
            <h3>Dùng bao nhiêu là vừa?</h3>
            <p>Người lớn thường dùng khoảng 3-5g yến khô mỗi lần, 2-3 lần mỗi tuần. Nên dùng đều đặn thay vì dùng quá nhiều trong một lần.</p>
          </div>
        </section>

        <section className="seo-content-block">
          <h2>Câu hỏi thường gặp về yến tinh chế</h2>
          <div className="raw-faq-list">
            <details>
              <summary>Yến tinh chế có còn dinh dưỡng không?</summary>
              <p>Yến tinh chế vẫn là yến sào đã làm sạch. Điều quan trọng là quy trình xử lý nhẹ, không tẩy trắng, không phụ gia và chưng đúng cách.</p>
            </details>
            <details>
              <summary>Yến tinh chế có cần nhặt lông lại không?</summary>
              <p>Thông thường không cần nhặt lông như yến thô. Khách chỉ cần ngâm, kiểm tra nhanh, rửa nhẹ rồi chưng.</p>
            </details>
            <details>
              <summary>Yến tinh chế hay yến thô tốt hơn?</summary>
              <p>Không có loại nào luôn tốt hơn. Yến thô hợp người có thời gian tự sơ chế; yến tinh chế hợp người cần tiện, sạch và nhanh.</p>
            </details>
          </div>
        </section>

        <section>
          <div className="section-heading-row">
            <div>
              <p className="eyebrow">Sản phẩm phù hợp</p>
              <h2 className="section-title">Các dòng yến tinh chế đang bán</h2>
            </div>
            <Link href="/products" className="section-link">Xem tất cả sản phẩm</Link>
          </div>

          <div className="product-grid">
            {refinedProducts.map((product) => (
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
