import Link from 'next/link';

const districtData: Record<string, { title: string; heading: string; description: string; coverage: string; promise: string; example: string; }> = {
  'quan-1': {
    title: 'Yến Sào Thượng Hạng Giao Nhanh 2h tại Quận 1',
    heading: 'Giao hàng nhanh 2h cho Quận 1',
    description: 'Yến Tinh Hoa cung cấp dịch vụ giao hàng nhanh trong nội thành TP.HCM, đặc biệt ưu tiên Quận 1 với thời gian giao từ 2-3 giờ.',
    coverage: 'Chúng tôi phục vụ các tuyến Quận 1, Bến Nghé, Nguyễn Thái Bình, Tân Định và những khu vực trung tâm tài chính.',
    promise: 'Giao ngay trong ngày cho đơn hàng đặt trước 15h và bảo quản sản phẩm bằng quy trình lạnh chuyên biệt.',
    example: 'Nếu bạn đang ở gần Diamond Plaza hoặc khu vực phố đi bộ Bùi Viện, đơn hàng sẽ được giao trong vòng 2 giờ.'
  },
  'quan-3': {
    title: 'Yến Sào Thượng Hạng Giao Nhanh 2h tại Quận 3',
    heading: 'Giao hàng nhanh 2h cho Quận 3',
    description: 'Quận 3 được phục vụ bởi đội giao hàng chuyên nghiệp, đảm bảo yến sào đến tay bạn tươi ngon và đúng giờ.',
    coverage: 'Phục vụ đầy đủ các khu vực như Võ Văn Tần, Nam Kỳ Khởi Nghĩa, Lê Văn Sỹ và các con đường trung tâm.',
    promise: 'Cam kết giao hàng 2-3 giờ trong ngày cho Quận 3 với bảo quản lạnh và đóng gói sang trọng.',
    example: 'Đặt ngay nếu bạn ở gần Công viên Lê Văn Tám hoặc khu vực Phú Nhuận giáp ranh.',
  },
  'quan-7': {
    title: 'Yến Sào Thượng Hạng Giao Nhanh 2h tại Quận 7',
    heading: 'Giao hàng nhanh 2h cho Quận 7',
    description: 'Quận 7 đặc biệt phù hợp với dịch vụ giao hàng nhanh của chúng tôi, nhất là khu vực Phú Mỹ Hưng và các chung cư cao cấp.',
    coverage: 'Phục vụ các tuyến Nguyễn Thị Thập, Lotte, SC VivoCity, và các khu đô thị tại Quận 7.',
    promise: 'Đơn hàng Quận 7 thường được giao trong vòng 2-3 giờ với đóng gói chống sốc và bảo quản an toàn.',
    example: 'Nếu bạn đặt tại khu Cityland hoặc khu Nam Long, chúng tôi sẽ giao hàng nhanh trong ngày.',
  },
  'phu-nhuan': {
    title: 'Yến Sào Thượng Hạng Giao Nhanh 2h tại Phú Nhuận',
    heading: 'Giao hàng nhanh 2h cho Quận Phú Nhuận',
    description: 'Quận Phú Nhuận là quận nội thành trọng điểm, nhận đơn hàng yến sào nhanh chóng và chính xác.',
    coverage: 'Phù hợp với khu vực Phan Xích Long, Lê Văn Sỹ, Trường Sa và các con đường gần sân bay Tân Sơn Nhất.',
    promise: 'Giao hàng 2-4 giờ trong khu vực Phú Nhuận với dịch vụ chuyên biệt cho yến sào thượng hạng.',
    example: 'Đơn hàng gần khu vực Hoàng Văn Thụ hoặc cư xá Bắc Hải sẽ được giao trong buổi chiều cùng ngày.',
  }
};

export async function generateStaticParams() {
  return Object.keys(districtData).map((slug) => ({ district: slug }));
}

export function generateMetadata({ params }: { params: { district: string } }) {
  const district = districtData[params.district];
  return {
    title: district?.title || 'Giao Hàng Nhanh TP.HCM - Yến Tinh Hoa',
    description: district?.description || 'Dịch vụ giao hàng nhanh yến sào TP.HCM của Yến Tinh Hoa.',
  };
}

export default function DistrictLandingPage({ params }: { params: { district: string } }) {
  const district = districtData[params.district] || districtData['quan-1'];

  return (
    <div className="container" style={{ padding: '60px 20px', minHeight: '80vh' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '3.5rem', color: 'var(--primary-color)', marginBottom: '20px' }}>{district.heading}</h1>
        <p style={{ fontSize: '1.2rem', maxWidth: '760px', margin: '0 auto', opacity: 0.9 }}>{district.description}</p>
      </div>

      <div className="glass-card" style={{ padding: '40px', marginBottom: '30px' }}>
        <h2 style={{ marginBottom: '18px' }}>Tại sao chọn Yến Tinh Hoa?</h2>
        <ul style={{ paddingLeft: '20px', lineHeight: '2', color: 'var(--text-muted)' }}>
          <li>Giao hàng nhanh 2-4 giờ tại nội thành TP.HCM.</li>
          <li>Đóng gói sang trọng, phù hợp làm quà biếu.</li>
          <li>Bảo quản lạnh chuyên nghiệp để giữ độ tươi ngon.</li>
          <li>Cam kết yến thật nguyên chất, phục vụ 10+ năm.</li>
        </ul>
      </div>

      <div className="glass-card" style={{ padding: '40px', marginBottom: '30px' }}>
        <h3 style={{ marginBottom: '18px' }}>Khu vực phục vụ chính</h3>
        <p style={{ marginBottom: '18px', color: 'var(--text-muted)', lineHeight: '1.8' }}>{district.coverage}</p>
        <p style={{ marginBottom: '18px', color: 'var(--text-muted)', lineHeight: '1.8' }}><strong>Lời hứa:</strong> {district.promise}</p>
        <p style={{ marginBottom: 0, color: 'var(--text-muted)', lineHeight: '1.8' }}><em>{district.example}</em></p>
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link href={`/products?district=${params.district}`} className="btn-primary" style={{ fontSize: '1.2rem', padding: '18px 50px' }}>
          Xem sản phẩm và đặt ngay
        </Link>
      </div>
    </div>
  );
}
