import Link from 'next/link';
import SafeImage from '@/components/SafeImage';
import { realNestImages, realNestVideo } from '@/lib/realNestMedia';

export const metadata = {
  title: 'Chất lượng & minh bạch - Yến Tinh Hoa',
  description:
    'Yến Tinh Hoa minh bạch nguồn tổ bằng ảnh/video thực tế, kiểm soát theo lô và tư vấn rõ trước khi khách chọn mua.',
};

export default function CertificationsPage() {
  return (
    <main className="quality-proof-page">
      <section className="quality-proof-hero">
        <div className="container quality-proof-hero-inner">
          <div>
            <span className="eyebrow">Chất lượng nhìn được</span>
            <h1>Minh bạch nguồn tổ trước khi nói về cam kết</h1>
            <p>
              Chúng tôi ưu tiên bằng chứng thực tế: ảnh nhà yến, video nguồn tổ, kiểm soát theo lô
              và xác nhận nhu cầu trước khi sơ chế hoặc đóng hộp.
            </p>
          </div>
          <div className="quality-proof-video">
            <video src={realNestVideo} controls playsInline preload="metadata" poster={realNestImages[1].src} />
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <div className="quality-proof-grid">
            {[
              ['Nguồn tổ thực tế', 'Ảnh/video được ghi nhận từ khu vực nhà yến để khách nhìn được chất liệu tổ trước khi chọn.'],
              ['Kiểm soát theo lô', 'Mỗi nhu cầu đặt tổ được tư vấn theo lô ảnh, loại tổ và trọng lượng phù hợp thay vì hứa chung chung.'],
              ['Sơ chế theo yêu cầu', 'Khách có thể chọn giữ nguyên tổ, sơ chế sạch hoặc đóng hộp biếu tặng sau khi xác nhận.'],
            ].map(([title, desc], index) => (
              <article className="glass-card quality-proof-card" key={title}>
                <SafeImage src={realNestImages[index + 2].src} alt={title} />
                <div>
                  <h2>{title}</h2>
                  <p>{desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding quality-proof-lots">
        <div className="container">
          <div className="section-heading-row">
            <div>
              <span className="eyebrow">Bằng chứng theo lô</span>
              <h2 className="section-title">Ảnh nguồn tổ đang lưu</h2>
            </div>
            <Link href="/real-nest-booking" className="section-link">
              Đặt theo lô ảnh
            </Link>
          </div>
          <div className="quality-proof-gallery">
            {realNestImages.slice(0, 10).map((image, index) => (
              <figure key={image.src}>
                <SafeImage src={image.src} alt={`Ảnh minh bạch lô tổ ${index + 1}`} />
                <figcaption>Lô ảnh {index + 1}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding quality-proof-process">
        <div className="container">
          <div className="section-title-wrapper">
            <span className="eyebrow">Quy trình xác nhận</span>
            <h2 className="section-title">4 bước trước khi chốt đơn</h2>
          </div>
          <div className="quality-proof-timeline">
            {[
              ['01', 'Tiếp nhận nhu cầu', 'Loại tổ, trọng lượng, mục đích dùng hoặc biếu tặng.'],
              ['02', 'Gửi lô ảnh phù hợp', 'Shop gửi ảnh/video nguồn tổ để khách duyệt trước.'],
              ['03', 'Xác nhận phương án', 'Giữ nguyên tổ, sơ chế sạch hoặc đóng hộp theo yêu cầu.'],
              ['04', 'Giao hàng', 'Đóng gói và giao nhanh tại TP.HCM sau khi xác nhận.'],
            ].map(([number, title, desc]) => (
              <div className="quality-proof-step" key={title}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
