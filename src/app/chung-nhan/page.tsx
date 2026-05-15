import Link from 'next/link';

export const metadata = {
  title: 'Chứng Nhận Chất Lượng - Thượng Yến',
  description: 'Cam kết chất lượng yến sào nguyên chất với đầy đủ chứng nhận ATVSTP, ISO và kiểm định định kỳ.',
};

export default function CertificationsPage() {
  const certifications = [
    {
      title: "Chứng Nhận ISO 22000:2018",
      desc: "Tiêu chuẩn quốc tế về hệ thống quản lý an toàn thực phẩm, đảm bảo quy trình sản xuất đạt chuẩn toàn cầu.",
      iconUrl: "https://vipsen.vn/wp-content/uploads/2021/04/iso-22000-icon.png"
    },
    {
      title: "Tiêu Chuẩn HACCP",
      desc: "Hệ thống phân tích mối nguy và kiểm soát điểm tới hạn, cam kết loại bỏ mọi rủi ro về nhiễm khuẩn.",
      iconUrl: "https://vipsen.vn/wp-content/uploads/2021/04/haccp-icon.png"
    },
    {
      title: "Chứng Nhận ATVSTP",
      desc: "Cấp bởi Chi cục An toàn vệ sinh thực phẩm TP.HCM, chứng nhận cơ sở đủ điều kiện sản xuất kinh doanh.",
      iconUrl: "https://vipsen.vn/wp-content/uploads/2021/04/atvstp-icon.png"
    }
  ];

  return (
    <div className="certifications-page">
      {/* Hero Section */}
      <section className="section-padding" style={{ 
        background: 'linear-gradient(rgba(6, 38, 33, 0.9), rgba(6, 38, 33, 0.9)), url(https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2000&auto=format&fit=crop) center/cover',
        textAlign: 'center'
      }}>
        <div className="container">
          <h1 style={{ fontSize: '3.5rem', color: 'var(--primary-color)', marginBottom: '20px' }}>Chất Lượng & Chứng Nhận</h1>
          <p style={{ fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto', opacity: 0.9 }}>
            Thượng Yến cam kết mang đến những sản phẩm tinh túy nhất với quy trình kiểm soát chất lượng nghiêm ngặt từ khâu thu hoạch đến tay người tiêu dùng.
          </p>
        </div>
      </section>

      {/* Main Certs */}
      <section className="section-padding">
        <div className="container">
          <div className="grid-3">
            {certifications.map((cert, index) => (
              <div key={index} className="glass-card" style={{ textAlign: 'center', padding: '40px' }}>
                <div style={{ marginBottom: '25px', display: 'flex', justifyContent: 'center' }}>
                  <img src={cert.iconUrl} alt={cert.title} style={{ width: '80px', height: '80px', objectFit: 'contain' }} />
                </div>
                <h3 style={{ fontSize: '1.5rem', color: 'var(--primary-color)', marginBottom: '15px' }}>{cert.title}</h3>
                <p style={{ color: 'var(--text-muted)', lineHeight: '1.8' }}>{cert.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lab Results */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
            <div>
              <h2 className="section-title" style={{ textAlign: 'left' }}>Kiểm Định Định Kỳ</h2>
              <p style={{ marginBottom: '25px', fontSize: '1.1rem' }}>
                Tất cả các lô hàng của Thượng Yến đều được gửi mẫu kiểm nghiệm tại các trung tâm uy tín như <strong>Eurofins</strong> hoặc <strong>Quatest 3</strong>.
              </p>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {[
                  "Kiểm tra hàm lượng Protein (>50%)",
                  "Kiểm tra các acid amin thiết yếu",
                  "Kiểm tra kim loại nặng (Chì, Thủy ngân)",
                  "Kiểm tra vi sinh vật gây hại"
                ].map((item, i) => (
                  <li key={i} style={{ marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ color: 'var(--primary-color)' }}>✔</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="glass-card" style={{ padding: '40px', textAlign: 'center' }}>
              <div style={{ 
                border: '2px dashed var(--primary-color)', 
                padding: '40px', 
                borderRadius: '10px',
                backgroundColor: 'rgba(212, 175, 55, 0.05)'
              }}>
                <span style={{ fontSize: '3rem', display: 'block', marginBottom: '20px' }}>📊</span>
                <h3 style={{ marginBottom: '10px' }}>Kết Quả Kiểm Nghiệm</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Mẫu thử đạt chuẩn 100% về độ nguyên chất và an toàn.</p>
                <button className="btn-primary" style={{ marginTop: '20px' }}>Xem Bản Scan</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding">
        <div className="container">
          <div className="section-title-wrapper">
            <h2 className="section-title">Quy Trình 5 Bước</h2>
            <p className="section-subtitle">Mỗi tổ yến đều trải qua hành trình khắt khe để đảm bảo sự tinh khiết</p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
            {[
              { step: "01", title: "Khai Thác", desc: "Thu hoạch từ các đảo yến và nhà yến lâu năm." },
              { step: "02", title: "Phân Loại", desc: "Tuyển chọn những tổ yến to, già và sạch nhất." },
              { step: "03", title: "Sơ Chế", desc: "Nhặt lông thủ công hoàn toàn bằng nước sạch." },
              { step: "04", title: "Sấy Khô", desc: "Sấy lạnh hiện đại giúp giữ trọn dưỡng chất." },
              { step: "05", title: "Đóng Gói", desc: "Kiểm tra cuối cùng và niêm phong chống giả." }
            ].map((s, i) => (
              <div key={i} style={{ flex: '1', minWidth: '180px', textAlign: 'center' }}>
                <div style={{ 
                  width: '60px', 
                  height: '60px', 
                  borderRadius: '50%', 
                  backgroundColor: 'var(--primary-color)', 
                  color: 'var(--bg-color)',
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  margin: '0 auto 20px'
                }}>{s.step}</div>
                <h4 style={{ marginBottom: '10px' }}>{s.title}</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-secondary)', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ fontSize: '2.5rem', marginBottom: '30px' }}>Yên Tâm Mua Sắm Tại Thượng Yến</h2>
          <Link href="/san-pham" className="btn-primary" style={{ padding: '15px 50px' }}>Xem Sản Phẩm</Link>
        </div>
      </section>
    </div>
  );
}
