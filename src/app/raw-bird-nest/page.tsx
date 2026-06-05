import Link from 'next/link';
import AddToCartButton from '@/components/AddToCartButton';
import SafeImage from '@/components/SafeImage';
import { JsonLd, pageMetadata, readProducts, SITE_URL } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Yến thô là gì? Giá yến thô 100g mới nhất tại Yến Tinh Hoa',
  description:
    'Yến thô là tổ yến nguyên chất chưa làm sạch lông, giữ sợi yến tự nhiên, dai giòn và nở nhiều. Xem giá yến thô 100g, cách chọn và các dòng yến thô tại Yến Tinh Hoa.',
  pathname: '/raw-bird-nest',
  keywords: [
    'yến thô',
    'yến thô là gì',
    'tổ yến thô',
    'giá yến thô 100g',
    'mua yến thô',
    'yến thô nguyên chất',
    'yến thô ít lông',
    'yến thô TP.HCM',
  ],
});

function normalizeText(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

function isRawBirdNestProduct(product: ReturnType<typeof readProducts>[number]) {
  const searchText = normalizeText(`${product.name} ${product.category || ''} ${product.description || ''}`);
  return searchText.includes('yen tho');
}

export default function RawBirdNestPage() {
  const rawProducts = readProducts().filter(isRawBirdNestProduct);
  const lowestPrice = rawProducts.length ? Math.min(...rawProducts.map((product) => product.price)) : 0;
  const highestPrice = rawProducts.length ? Math.max(...rawProducts.map((product) => product.price)) : 0;

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Yến thô là gì?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yến thô là tổ yến nguyên chất sau khi thu hoạch, chưa qua làm sạch lông hay tinh chế. Tổ thường còn lông yến và tạp chất nhỏ, cần ngâm nở, nhặt sạch rồi mới chưng.',
        },
      },
      {
        '@type': 'Question',
        name: 'Giá yến thô 100g hiện nay bao nhiêu?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Tại Yến Tinh Hoa, giá yến thô 100g hiện dao động từ ${lowestPrice.toLocaleString('vi-VN')} đ đến ${highestPrice.toLocaleString('vi-VN')} đ tùy loại tổ, độ ít lông, phần chân yến và quy cách sản phẩm.`,
        },
      },
      {
        '@type': 'Question',
        name: 'Yến thô có tốt hơn yến tinh chế không?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yến thô giữ trạng thái tự nhiên, sợi dai và nở tốt nhưng cần thời gian nhặt lông. Yến tinh chế tiện hơn vì đã làm sạch. Chọn loại nào phụ thuộc vào thời gian sơ chế và thói quen sử dụng của từng gia đình.',
        },
      },
      {
        '@type': 'Question',
        name: 'Yến thô phù hợp với ai?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yến thô phù hợp với người muốn tự sơ chế, thích kiểm soát độ sạch của yến, dùng thường xuyên cho gia đình hoặc muốn mua tổ yến nguyên bản với chi phí tốt hơn yến đã tinh chế.',
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
    description: 'Trang giải thích yến thô là gì, cách chọn, giá tham khảo và danh sách sản phẩm yến thô tại Yến Tinh Hoa.',
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
      <div className="container catalog-page raw-bird-nest-page">
        <section className="raw-hero">
          <p className="eyebrow">Yến thô nguyên chất</p>
          <h1>Yến thô là gì? Giá yến thô 100g và cách chọn yến thô ngon</h1>
          <p>
            Yến thô là tổ yến còn giữ trạng thái nguyên bản sau khi thu hoạch, chưa làm sạch lông và chưa tinh chế.
            Đây là lựa chọn phù hợp cho khách muốn tự sơ chế tại nhà, thích sợi yến dai giòn, nở tốt và muốn nhìn rõ
            hình dáng tự nhiên của tổ yến.
          </p>
          {lowestPrice > 0 && (
            <div className="raw-price-band">
              <span>Giá yến thô 100g tại Yến Tinh Hoa</span>
              <strong>
                {lowestPrice.toLocaleString('vi-VN')} đ - {highestPrice.toLocaleString('vi-VN')} đ
              </strong>
            </div>
          )}
        </section>

        <section className="seo-content-block">
          <h2>Yến thô là gì?</h2>
          <div className="raw-article">
            <p>
              Yến thô, hay tổ yến thô, là tổ do chim yến tạo thành từ nước bọt, được thu hoạch rồi sấy khô nhưng chưa
              trải qua công đoạn nhặt lông, làm sạch hay ép khuôn. Vì vậy, tổ yến thô thường còn lẫn lông yến, bụi mịn
              và một ít tạp chất tự nhiên. Trước khi ăn, người dùng cần ngâm mềm, tách sợi, nhặt sạch lông bằng nhíp rồi
              chưng cách thủy.
            </p>
            <p>
              Điểm mạnh của yến thô là giữ được dáng tổ tự nhiên, mùi yến đặc trưng, sợi dày và độ nở tốt. Khi chưng
              đúng cách, sợi yến thường dai giòn hơn so với nhiều dòng đã làm sạch sẵn. Bù lại, yến thô cần nhiều thời
              gian sơ chế hơn, nên phù hợp nhất với người có thời gian hoặc gia đình dùng yến đều đặn.
            </p>
          </div>
        </section>

        <section className="seo-content-block">
          <h2>Đặc điểm của yến thô nguyên chất</h2>
          <div className="seo-info-grid">
            <article>
              <h3>Còn lông và tạp chất tự nhiên</h3>
              <p>Tổ chưa được làm sạch nên vẫn còn lông yến nhỏ. Đây là đặc điểm bình thường của yến thô thật.</p>
            </article>
            <article>
              <h3>Sợi yến dai, nở tốt</h3>
              <p>Sợi yến thô giữ cấu trúc tự nhiên, khi ngâm và chưng đúng cách thường nở nhiều, ăn dai giòn.</p>
            </article>
            <article>
              <h3>Mùi yến tự nhiên</h3>
              <p>Yến thô có mùi tanh nhẹ đặc trưng của tổ yến, không thơm gắt, không mùi hóa chất hay mùi lạ.</p>
            </article>
          </div>
        </section>

        <section className="seo-content-block raw-two-column">
          <div>
            <h2>Công dụng và giá trị dinh dưỡng của yến thô</h2>
            <div className="raw-article">
              <p>
                Yến thô được ưa chuộng vì là dạng tổ yến nguyên bản, chứa protein, carbohydrate, các acid amin và khoáng
                chất vi lượng. Khi dùng đúng lượng, yến sào thường được chọn để bồi bổ cơ thể, hỗ trợ phục hồi sau mệt
                mỏi, chăm sóc sức khỏe người lớn tuổi, phụ nữ sau sinh và người làm việc nhiều.
              </p>
              <p>
                Yến không phải thuốc chữa bệnh. Để dùng hiệu quả, nên ăn lượng vừa phải, chưng cách thủy trong thời gian
                hợp lý và kết hợp chế độ ăn uống cân bằng.
              </p>
            </div>
          </div>
          <div className="raw-note-box">
            <h3>Nên dùng bao nhiêu?</h3>
            <p>Người lớn thường dùng khoảng 3-5g yến khô mỗi lần, 2-3 lần mỗi tuần. Trẻ nhỏ, người bệnh hoặc mẹ sau sinh nên dùng theo tư vấn phù hợp thể trạng.</p>
          </div>
        </section>

        <section className="seo-content-block">
          <h2>Bảng giá yến thô 100g tại Yến Tinh Hoa</h2>
          <div className="raw-price-table">
            {rawProducts.map((product) => (
              <Link key={product.id} href={`/products/${product.id}`}>
                <span>{product.name}</span>
                <strong>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="product-price-original" style={{ display: 'block', textAlign: 'right' }}>
                      {product.originalPrice.toLocaleString('vi-VN')} đ
                    </span>
                  )}
                  {product.price.toLocaleString('vi-VN')} đ
                </strong>
              </Link>
            ))}
          </div>
          <p className="raw-small-note">
            Giá yến thô phụ thuộc vào độ ít lông, kích thước tổ, độ nguyên vẹn, phần tổ hay chân yến và quy cách đóng hộp.
            Khách cần mua số lượng lớn có thể liên hệ để được tư vấn dòng phù hợp ngân sách.
          </p>
        </section>

        <section className="seo-content-block">
          <h2>Nên mua yến thô loại nào?</h2>
          <div className="seo-info-grid">
            <article>
              <h3>Yến thô ít lông</h3>
              <p>Phù hợp người mới dùng yến thô, muốn tiết kiệm thời gian nhặt lông nhưng vẫn thích tổ yến nguyên bản.</p>
            </article>
            <article>
              <h3>Yến thô nguyên lông</h3>
              <p>Phù hợp khách có kinh nghiệm sơ chế, muốn chọn dòng nguyên bản với chi phí mềm hơn.</p>
            </article>
            <article>
              <h3>Chân yến thô</h3>
              <p>Phần chân tổ dày, dai, nở tốt, hợp với người thích cảm giác giòn chắc khi ăn yến chưng.</p>
            </article>
          </div>
        </section>

        <section className="seo-content-block raw-two-column">
          <div>
            <h2>Cách sơ chế yến thô tại nhà</h2>
            <ol className="raw-steps">
              <li>Ngâm tổ yến trong nước sạch 20-40 phút cho sợi mềm và tơi ra.</li>
              <li>Dùng nhíp nhặt lông lớn, sau đó lọc lông nhỏ bằng rây hoặc tô nước sạch.</li>
              <li>Rửa nhẹ, để ráo, chia phần vừa ăn và chưng cách thủy 20-25 phút.</li>
              <li>Không chưng quá lâu để sợi yến không bị nhão và giảm mùi vị tự nhiên.</li>
            </ol>
          </div>
          <div className="raw-note-box">
            <h3>Bảo quản yến thô</h3>
            <p>Yến khô nên để nơi thoáng mát, tránh nắng, tránh ẩm, đóng kín sau khi mở hộp. Yến đã ngâm/làm sạch nên bảo quản lạnh và dùng sớm.</p>
          </div>
        </section>

        <section className="seo-content-block">
          <h2>Câu hỏi thường gặp về yến thô</h2>
          <div className="raw-faq-list">
            <details>
              <summary>Yến thô có khó làm giả không?</summary>
              <p>Yến thô khó làm giả hơn yến đã tinh chế vì còn dáng tổ, chân tổ và lông tự nhiên. Tuy nhiên vẫn cần chọn nơi bán uy tín để tránh yến bị tẩm thêm phụ gia hoặc tăng trọng.</p>
            </details>
            <details>
              <summary>100g yến thô dùng được bao lâu?</summary>
              <p>Nếu mỗi lần dùng 3-5g yến khô, một hộp 100g có thể dùng khoảng 20-30 lần tùy khẩu phần của gia đình.</p>
            </details>
            <details>
              <summary>Yến thô khác yến tinh chế thế nào?</summary>
              <p>Yến thô chưa nhặt lông, cần tự làm sạch nhưng giữ dáng tổ tự nhiên. Yến tinh chế đã làm sạch, tiện dùng hơn nhưng giá thường cao hơn do có thêm công sơ chế.</p>
            </details>
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
                  <Link href={`/products/${product.id}`} className="product-card-title-link">
                    <h2>{product.name}</h2>
                  </Link>
                  <div className="product-card-info">
                    <p className="product-card-desc">{product.shortDescription || product.description}</p>
                    <div className="product-card-footer">
                    <div className="product-price-stack">
                    {product.originalPrice && product.originalPrice > product.price && (
                      <span>{product.originalPrice.toLocaleString('vi-VN')} đ</span>
                    )}
                    <strong>{product.price.toLocaleString('vi-VN')} đ</strong>
                    </div>
                      <AddToCartButton product={{ ...product, imageUrl: product.imageUrl || '' }} style={{ width: 'auto' }} />
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
