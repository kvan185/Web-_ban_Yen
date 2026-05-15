export const metadata = {
  title: 'Về Thượng Yến - Câu Chuyện Thương Hiệu',
  description: 'Tìm hiểu về hành trình xây dựng thương hiệu Thượng Yến và sứ mệnh mang yến sào nguyên chất đến mọi nhà.',
};

export default function AboutPage() {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="section-padding hero-section" style={{ 
        background: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url(/images/about-hero.png) center/cover no-repeat',
        height: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: '#fff',
        position: 'relative'
      }}>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <h1 style={{ 
            fontSize: '4.5rem', 
            color: 'var(--primary-color)', 
            marginBottom: '20px',
            textShadow: '2px 2px 10px rgba(0,0,0,0.5)',
            fontWeight: '700'
          }}>Câu Chuyện Thượng Yến</h1>
          <p style={{ 
            fontSize: '1.6rem', 
            opacity: 0.95,
            maxWidth: '800px',
            margin: '0 auto',
            lineHeight: '1.6',
            fontWeight: '300'
          }}>Hành trình mang tinh hoa yến sào nguyên chất đến sức khỏe người Việt</p>
        </div>
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '100px',
          background: 'linear-gradient(transparent, var(--bg-color))'
        }}></div>
      </section>

      {/* Story Section */}
      <section className="section-padding">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '80px', alignItems: 'center' }}>
            <div>
              <h2 className="section-title" style={{ textAlign: 'left', fontSize: '2.5rem' }}>Khởi Nguồn Đam Mê</h2>
              <p style={{ marginBottom: '25px', fontSize: '1.15rem', lineHeight: '1.9', color: 'var(--text-secondary)' }}>
                Thượng Yến bắt đầu từ những chuyến đi thực tế đến các vùng đảo yến xa xôi tại Khánh Hòa. Chúng tôi nhận thấy thị trường yến sào đang bị bão hòa bởi những sản phẩm pha trộn, kém chất lượng, làm mất đi niềm tin của người tiêu dùng.
              </p>
              <p style={{ marginBottom: '25px', fontSize: '1.15rem', lineHeight: '1.9', color: 'var(--text-secondary)' }}>
                Với mong muốn khôi phục giá trị thực của "vàng trắng", Thượng Yến đã được thành lập với tôn chỉ: <strong style={{ color: 'var(--primary-color)' }}>Chỉ bán yến sào nguyên chất 100%</strong>. Chúng tôi tin rằng, sức khỏe là vốn quý nhất và mỗi sản phẩm trao đi phải là một lời cam kết về sự tận tâm.
              </p>
              <div style={{ display: 'flex', gap: '30px', marginTop: '40px' }}>
                <div style={{ textAlign: 'center' }}>
                  <h4 style={{ fontSize: '2.5rem', color: 'var(--primary-color)', marginBottom: '5px' }}>10+</h4>
                  <p style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Năm Kinh Nghiệm</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <h4 style={{ fontSize: '2.5rem', color: 'var(--primary-color)', marginBottom: '5px' }}>5000+</h4>
                  <p style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Khách Hàng Tin Dùng</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <h4 style={{ fontSize: '2.5rem', color: 'var(--primary-color)', marginBottom: '5px' }}>100%</h4>
                  <p style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Nguyên Chất</p>
                </div>
              </div>
            </div>
            <div className="glass-card" style={{ padding: 0, overflow: 'hidden', borderRadius: '20px', boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }}>
              <img src="/images/about-source.png" alt="Nguồn gốc yến sào" style={{ width: '100%', height: '500px', objectFit: 'cover', display: 'block' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-secondary)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(var(--primary-color), transparent)', opacity: 0.05 }}></div>
        <div className="container">
          <div className="grid-3">
            <div className="glass-card" style={{ textAlign: 'center', transition: 'transform 0.3s ease' }}>
              <div style={{ fontSize: '3.5rem', marginBottom: '25px' }}>🎯</div>
              <h3 style={{ color: 'var(--primary-color)', marginBottom: '20px', fontSize: '1.5rem' }}>Sứ Mệnh</h3>
              <p style={{ lineHeight: '1.7' }}>Mang đến nguồn dinh dưỡng quý giá và tinh khiết nhất từ thiên nhiên để chăm sóc sức khỏe cho mọi gia đình Việt.</p>
            </div>
            <div className="glass-card" style={{ textAlign: 'center', transition: 'transform 0.3s ease' }}>
              <div style={{ fontSize: '3.5rem', marginBottom: '25px' }}>👁️</div>
              <h3 style={{ color: 'var(--primary-color)', marginBottom: '20px', fontSize: '1.5rem' }}>Tầm Nhìn</h3>
              <p style={{ lineHeight: '1.7' }}>Trở thành biểu tượng niềm tin hàng đầu trong ngành yến sào tại Việt Nam và vươn tầm thế giới với chất lượng vượt trội.</p>
            </div>
            <div className="glass-card" style={{ textAlign: 'center', transition: 'transform 0.3s ease' }}>
              <div style={{ fontSize: '3.5rem', marginBottom: '25px' }}>💎</div>
              <h3 style={{ color: 'var(--primary-color)', marginBottom: '20px', fontSize: '1.5rem' }}>Giá Trị Cốt Lõi</h3>
              <p style={{ lineHeight: '1.7' }}>Trung thực trong kinh doanh - Tận tâm trong phục vụ - Khắt khe trong từng công đoạn chế biến.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '0.8fr 1.2fr', gap: '80px', alignItems: 'center' }}>
            <div className="glass-card" style={{ padding: 0, overflow: 'hidden', borderRadius: '20px', boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }}>
              <img src="/images/about-process.png" alt="Quy trình làm sạch yến" style={{ width: '100%', height: '450px', objectFit: 'cover', display: 'block' }} />
            </div>
            <div>
              <h2 className="section-title" style={{ textAlign: 'left', fontSize: '2.5rem' }}>Cam Kết Chất Lượng</h2>
              <div style={{ marginTop: '30px' }}>
                {[
                  { title: 'Nguyên chất 100%', desc: 'Không pha trộn đường, mủ trôm hay bất kỳ chất độn nào.' },
                  { title: 'Nguồn gốc rõ ràng', desc: 'Khai thác từ các hệ thống nhà yến hiện đại và đảo yến tự nhiên uy tín.' },
                  { title: 'Làm sạch thủ công', desc: 'Quy trình nhặt lông bằng tay tỉ mỉ, giữ trọn vẹn 18 loại axit amin quý giá.' },
                  { title: 'Kiểm định khắt khe', desc: 'Mọi lô hàng đều được kiểm tra vệ sinh an toàn thực phẩm trước khi xuất xưởng.' }
                ].map((item, index) => (
                  <div key={index} style={{ marginBottom: '20px', display: 'flex', gap: '20px' }}>
                    <div style={{ 
                      width: '40px', 
                      height: '40px', 
                      borderRadius: '50%', 
                      backgroundColor: 'var(--primary-color)', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      color: '#fff',
                      flexShrink: 0,
                      fontWeight: 'bold'
                    }}>{index + 1}</div>
                    <div>
                      <h4 style={{ color: 'var(--primary-color)', marginBottom: '5px', fontSize: '1.2rem' }}>{item.title}</h4>
                      <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding" style={{ textAlign: 'center' }}>
        <div className="container">
          <div className="glass-card" style={{ padding: '60px', background: 'linear-gradient(135deg, var(--primary-color), #d4af37)', color: '#fff' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Trải Nghiệm Tinh Hoa Yến Sào</h2>
            <p style={{ fontSize: '1.2rem', marginBottom: '35px', opacity: 0.9 }}>Để Thượng Yến đồng hành cùng sức khỏe của bạn và những người thân yêu.</p>
            <a href="/san-pham" className="btn btn-primary" style={{ backgroundColor: '#fff', color: 'var(--primary-color)', padding: '15px 40px', fontSize: '1.1rem' }}>
              Khám Phá Sản Phẩm
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
