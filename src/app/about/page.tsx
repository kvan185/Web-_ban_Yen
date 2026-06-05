import Link from 'next/link';
import SafeImage from '@/components/SafeImage';
import { realNestImages, realNestVideo } from '@/lib/realNestMedia';

export const metadata = {
  title: 'Về Yến Tinh Hoa - Nguồn tổ yến thực tế',
  description:
    'Tìm hiểu Yến Tinh Hoa qua hình ảnh và video thực tế từ nhà yến, quy trình tuyển tổ, sơ chế và đóng gói minh bạch.',
};

export default function AboutPage() {
  return (
    <main className="about-proof-page">
      <section className="about-proof-hero">
        <div className="container about-proof-hero-inner">
          <div className="about-proof-copy">
            <span className="eyebrow">Không dùng ảnh minh họa cho niềm tin</span>
            <h1>Câu chuyện bắt đầu từ nguồn tổ thật</h1>
            <p>
              Yến Tinh Hoa muốn khách hàng nhìn thấy điều quan trọng nhất trước khi mua:
              tổ yến đến từ đâu, bám như thế nào, được tuyển chọn và xử lý ra sao.
            </p>
            <div className="hero-actions">
              <Link href="/real-nest-booking" className="btn-primary">Đặt tổ theo lô ảnh thật</Link>
              <Link href="/products" className="btn-secondary">Xem sản phẩm</Link>
            </div>
          </div>
          <div className="about-proof-hero-media">
            <video src={realNestVideo} controls playsInline preload="metadata" poster={realNestImages[0].src} />
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container about-proof-gallery">
          <div className="section-heading-row">
            <div>
              <span className="eyebrow">Ảnh thực tế</span>
              <h2 className="section-title">Bên trong nhà yến</h2>
            </div>
          </div>
          <div className="about-proof-mosaic">
            {realNestImages.slice(0, 9).map((image, index) => (
              <figure key={image.src} className={index === 0 ? 'is-large' : ''}>
                <SafeImage src={image.src} alt={`Ảnh thực tế nhà yến ${index + 1}`} />
                <figcaption>Ảnh thực tế {index + 1}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding about-proof-process">
        <div className="container">
          <div className="section-title-wrapper">
            <span className="eyebrow">Cách chúng tôi tạo niềm tin</span>
            <h2 className="section-title">Minh bạch theo lô, không hứa mơ hồ</h2>
          </div>
          <div className="about-proof-cards">
            {[
              ['Chụp theo lô/vị trí', 'Ảnh được ghi nhận theo khu vực hoặc lô tổ, phù hợp vận hành thực tế thay vì chụp từng tổ riêng lẻ.'],
              ['Tư vấn trước khi thu', 'Khách gửi nhu cầu, shop xác nhận loại tổ và lô phù hợp trước khi sơ chế hoặc đóng hộp.'],
              ['Giữ chất thật', 'Ưu tiên tổ có cấu trúc rõ, sợi tự nhiên, phù hợp nhu cầu dùng gia đình hoặc biếu tặng.'],
            ].map(([title, desc]) => (
              <article className="glass-card about-proof-card" key={title}>
                <h3>{title}</h3>
                <p>{desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding about-proof-source">
        <div className="container about-proof-source-grid">
          <div>
            <span className="eyebrow">Từ nguồn tổ đến hộp quà</span>
            <h2>Không chỉ đẹp bao bì, phải đáng tin từ gốc.</h2>
            <p>
              Sản phẩm yến có giá trị cao nên khách hàng cần bằng chứng cụ thể. Vì vậy ảnh/video
              thực tế được đặt ở các điểm quan trọng trên web: trang chủ, trang sản phẩm, trang
              chứng nhận và chức năng đặt tổ theo lô.
            </p>
          </div>
          <div className="about-proof-source-images">
            {realNestImages.slice(9, 13).map((image, index) => (
              <SafeImage key={image.src} src={image.src} alt={`Nguồn tổ thực tế ${index + 10}`} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
