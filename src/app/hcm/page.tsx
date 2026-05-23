import Link from 'next/link';

const districts = [
  { slug: 'quan-1', name: 'Quận 1', description: 'Giao hàng nhanh 2-3 giờ cho trung tâm tài chính TP.HCM.' },
  { slug: 'quan-3', name: 'Quận 3', description: 'Giao nhanh cho các tuyến đường chính gần Quận 1.' },
  { slug: 'quan-7', name: 'Quận 7', description: 'Ưu tiên giao hàng nhanh cho khu vực Phú Mỹ Hưng và quận lân cận.' },
  { slug: 'phu-nhuan', name: 'Quận Phú Nhuận', description: 'Giao nhanh trong ngày cho khách hàng sống tại khu vực trung tâm.' }
];

export const metadata = {
  title: 'Giao Hàng Nhanh TP.HCM - Yến Tinh Hoa',
  description: 'Trang đích giao hàng nhanh TP.HCM của Yến Tinh Hoa. Chọn quận của bạn để xem chi tiết giao hàng 2-4 giờ và ưu đãi yến sào thượng hạng.',
};

export default function HcmLandingPage() {
  return (
    <div className="container" style={{ padding: '60px 20px', minHeight: '80vh' }}>
      <div style={{ textAlign: 'center', marginBottom: '50px' }}>
        <h1 style={{ fontSize: '3.5rem', color: 'var(--primary-color)', marginBottom: '20px' }}>Giao Hàng Nhanh TP.HCM</h1>
        <p style={{ fontSize: '1.2rem', opacity: 0.85, maxWidth: '760px', margin: '0 auto' }}>
          Yến Tinh Hoa phục vụ giao hàng nhanh trong 2-4 giờ cho các quận nội thành TP.HCM. Chọn quận của bạn để nhận yến sào thượng hạng giao ngay trong ngày.
        </p>
      </div>

      <div style={{ display: 'grid', gap: '24px' }}>
        {districts.map((district) => (
          <Link key={district.slug} href={`/hcm/${district.slug}`} className="glass-card" style={{ padding: '28px', borderRadius: '22px', display: 'block' }}>
            <h2 style={{ margin: '0 0 12px', color: 'var(--primary-color)' }}>{district.name}</h2>
            <p style={{ margin: 0, color: 'var(--text-muted)', lineHeight: '1.8' }}>{district.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
