import Link from 'next/link';
import RealNestLotGallery from '@/components/RealNestLotGallery';
import { JsonLd, pageMetadata } from '@/lib/seo';
import { realNestImages, realNestVideo } from '@/lib/realNestMedia';
import RealNestBookingForm from './RealNestBookingForm';

export const metadata = pageMetadata({
  title: 'Đặt tổ yến theo lô ảnh thực tế',
  description:
    'Đặt tổ yến theo lô ảnh thực tế từ nhà yến, phù hợp khách muốn xem nguồn tổ trước khi chọn loại tổ, trọng lượng và phương án sơ chế.',
  pathname: '/real-nest-booking',
  image: realNestImages[0].src,
  keywords: ['đặt tổ yến thực tế', 'chọn tổ yến', 'tổ yến nhà yến', 'đặt yến thô'],
});

export default function RealNestBookingPage() {
  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Đặt tổ yến theo lô ảnh thực tế',
    serviceType: 'Tư vấn và giữ tổ yến theo lô ảnh thực tế',
    provider: {
      '@type': 'Organization',
      name: 'Yến Tinh Hoa',
      url: 'https://yenth.vn',
    },
    areaServed: 'TP.HCM',
  };

  return (
    <>
      <JsonLd data={serviceJsonLd} />
      <main className="real-booking-page">
        <section className="real-booking-hero">
          <div className="container real-booking-hero-inner">
            <div className="real-booking-copy">
              <span className="eyebrow">Xem lô thật trước khi đặt</span>
              <h1>
                <span>Đặt tổ yến</span>
                <span>theo lô thực tế</span>
              </h1>
              <p>
                Không bắt khách chọn từng tổ riêng lẻ. Bạn chọn nhu cầu và lô ảnh quan tâm,
                Yến Tinh Hoa xác nhận vị trí/lô phù hợp rồi mới thu, sơ chế hoặc đóng hộp.
              </p>
              <div className="hero-actions">
                <a href="#booking-form" className="btn-primary">Giữ tổ ngay</a>
                <Link href="/products" className="btn-secondary">Xem sản phẩm sẵn có</Link>
              </div>
            </div>
            <div className="real-booking-video">
              <video src={realNestVideo} controls playsInline preload="metadata" poster={realNestImages[0].src} />
            </div>
          </div>
        </section>

        <section className="section-padding real-booking-selection" id="real-booking-selection">
          <div className="container real-booking-layout">
            <div className="real-booking-gallery-panel">
              <div className="section-heading-row real-booking-gallery-heading">
                <div>
                  <span className="eyebrow">Lô ảnh thực tế</span>
                  <h2 className="section-title">Chọn theo khu/lô, không theo từng tổ</h2>
                </div>
              </div>
              <RealNestLotGallery images={realNestImages.slice(0, 12)} />
            </div>

            <aside id="booking-form" className="real-booking-panel">
              <span className="eyebrow">Tư vấn lô phù hợp</span>
              <h2>Gửi nhu cầu, shop chọn lô giúp bạn</h2>
              <p>
                Điền nhanh thông tin chính. Yến Tinh Hoa sẽ gọi/Zalo lại để gửi lô ảnh phù hợp,
                báo giá thực tế và xác nhận cách sơ chế trước khi chốt đơn.
              </p>
              <div className="real-booking-panel-points" aria-label="Quy trình tư vấn">
                <span>Không cần chọn từng tổ</span>
                <span>Xem lô trước khi đặt</span>
                <span>Chốt sau khi được tư vấn</span>
              </div>
              <RealNestBookingForm />
            </aside>
          </div>
        </section>

        <section className="section-padding real-booking-steps">
          <div className="container">
            <div className="grid-3">
              {[
                ['01', 'Chọn nhu cầu', 'Chọn loại tổ, trọng lượng và mục đích dùng hoặc biếu tặng.'],
                ['02', 'Xác nhận lô/khu tổ', 'Yến Tinh Hoa gửi ảnh/video lô tổ phù hợp để bạn duyệt trước.'],
                ['03', 'Sơ chế hoặc giữ nguyên', 'Khách chọn giữ nguyên tổ, làm sạch hoặc đóng hộp theo yêu cầu.'],
              ].map(([number, title, desc]) => (
                <div className="glass-card real-booking-step" key={title}>
                  <span>{number}</span>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
