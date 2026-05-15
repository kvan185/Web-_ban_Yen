import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import AddToCartButton from '@/components/AddToCartButton';
import SafeImage from '@/components/SafeImage';

export default function Home() {
  const productsFilePath = path.join(process.cwd(), 'src', 'data', 'products.json');
  let products = [];
  try {
    if (fs.existsSync(productsFilePath)) {
      products = JSON.parse(fs.readFileSync(productsFilePath, 'utf8'));
    }
  } catch (e) {
    console.error(e);
  }

  const blogsFilePath = path.join(process.cwd(), 'src', 'data', 'blog-metadata.json');
  let blogs = [];
  try {
    if (fs.existsSync(blogsFilePath)) {
      blogs = JSON.parse(fs.readFileSync(blogsFilePath, 'utf8'));
    }
  } catch (e) {
    console.error(e);
  }

  const settingsFilePath = path.join(process.cwd(), 'src', 'data', 'settings.json');
  let settings = { productsPerRow: 4 };
  try {
    if (fs.existsSync(settingsFilePath)) {
      settings = JSON.parse(fs.readFileSync(settingsFilePath, 'utf8'));
    }
  } catch (e) {
    console.error(e);
  }

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero" style={{ 
        height: '90vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(https://images.unsplash.com/photo-1621266304191-9c096d722329?q=80&w=2000&auto=format&fit=crop) center/cover'
      }}>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="glass-card" style={{ maxWidth: '800px', margin: '0 auto', padding: '60px' }}>
            <div className="trust-badge-hero">
              <span>🛡️</span> Cam kết bồi thường 1000% nếu phát hiện hàng giả
            </div>
            <h1 style={{ 
              fontSize: '4.5rem', 
              marginBottom: '20px', 
              color: 'var(--primary-color)',
              lineHeight: '1.1',
              fontFamily: 'var(--font-serif)'
            }}>Thượng Yến</h1>
            <p style={{ 
              fontSize: '1.8rem', 
              marginBottom: '40px', 
              color: 'var(--text-color)',
              fontWeight: '300'
            }}>Tinh hoa yến sào nguyên chất - Gửi trọn tâm tình trong từng sợi yến</p>
            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
              <Link href="/san-pham" className="btn-primary" style={{ fontSize: '1.2rem', padding: '15px 40px' }}>
                Mua Ngay
              </Link>
              <Link href="/blog" style={{ 
                fontSize: '1.2rem', 
                padding: '15px 40px', 
                border: '1px solid var(--primary-color)',
                borderRadius: '4px',
                color: 'var(--primary-color)',
                fontWeight: '600'
              }}>
                Tìm Hiểu Thêm
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Signals Section */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="grid-4">
            <div className="trust-signal">
              <span className="trust-icon">✨</span>
              <h3 className="trust-title">100% Tự Nhiên</h3>
              <p className="trust-desc">Yến sào được khai thác trực tiếp từ các nhà yến và đảo yến tự nhiên.</p>
            </div>
            <div className="trust-signal">
              <span className="trust-icon">🌿</span>
              <h3 className="trust-title">Sơ Chế Thủ Công</h3>
              <p className="trust-desc">Quy trình nhặt lông hoàn toàn bằng tay, không sử dụng hóa chất tẩy rửa.</p>
            </div>
            <div className="trust-signal">
              <span className="trust-icon">🏆</span>
              <h3 className="trust-title">Chứng Nhận ATTP</h3>
              <p className="trust-desc">Đạt đầy đủ các chứng nhận về an toàn vệ sinh thực phẩm của Bộ Y Tế.</p>
            </div>
            <div className="trust-signal">
              <span className="trust-icon">🚚</span>
              <h3 className="trust-title">Giao Hàng Nhanh</h3>
              <p className="trust-desc">Miễn phí giao hàng nội thành HCM cho đơn hàng từ 1.000.000đ.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section-padding">
        <div className="container">
          <div className="section-title-wrapper">
            <h2 className="section-title">Sản Phẩm Nổi Bật</h2>
            <p className="section-subtitle">Khám phá những dòng yến thượng hạng được tinh tuyển kỹ lưỡng</p>
          </div>
          
          <div className="grid-4">
            {products.slice(0, 4).map((p: any) => (
              <div key={p.id} className="glass-card" style={{ 
                textAlign: 'center', 
                display: 'flex', 
                flexDirection: 'column', 
                height: '100%', 
                position: 'relative',
                padding: 0,
                overflow: 'hidden'
              }}>
                {p.badge && (
                  <div className={`badge ${p.badge === 'Giảm giá' ? 'badge-sale' : 'badge-best'}`} style={{ zIndex: 10 }}>
                    {p.badge}
                  </div>
                )}
                <Link href={`/san-pham/${p.id}`}>
                  <div style={{ height: '240px', width: '100%', overflow: 'hidden', marginBottom: '20px' }}>
                    <SafeImage 
                      src={p.imageUrl} 
                      alt={p.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <div style={{ padding: '0 20px' }}>
                    <h3 style={{ fontSize: '1.3rem', marginBottom: '10px', color: 'var(--text-color)', minHeight: '2.4em', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{p.name}</h3>
                  </div>
                </Link>
                <div style={{ padding: '0 20px 25px 20px', marginTop: 'auto' }}>
                  <p style={{ color: 'var(--primary-color)', fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '20px' }}>
                    {p.price.toLocaleString('vi-VN')} đ
                  </p>
                  <AddToCartButton product={p} />
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <Link href="/san-pham" style={{ color: 'var(--primary-color)', fontWeight: '600', textDecoration: 'underline' }}>
              Xem tất cả sản phẩm &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-secondary)', position: 'relative' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
            <div style={{ position: 'relative' }}>
              <img 
                src="https://images.unsplash.com/photo-1610488974577-c35048d88e04?q=80&w=1000&auto=format&fit=crop" 
                alt="About Thượng Yến" 
                style={{ width: '100%', borderRadius: '15px', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}
              />
              <div style={{ 
                position: 'absolute', 
                bottom: '-30px', 
                right: '-30px', 
                backgroundColor: 'var(--primary-color)', 
                color: 'var(--bg-color)', 
                padding: '30px', 
                borderRadius: '10px',
                fontWeight: 'bold',
                textAlign: 'center'
              }}>
                <span style={{ fontSize: '2rem', display: 'block' }}>10+</span>
                Năm Kinh Nghiệm
              </div>
            </div>
            <div>
              <h2 style={{ fontSize: '3rem', marginBottom: '25px', color: 'var(--primary-color)' }}>Về Thượng Yến</h2>
              <p style={{ marginBottom: '20px', fontSize: '1.1rem', opacity: 0.9 }}>
                Khởi nguồn từ niềm đam mê với món quà vô giá của thiên nhiên, Thượng Yến ra đời với sứ mệnh mang đến những sản phẩm yến sào nguyên chất nhất cho sức khỏe người Việt.
              </p>
              <p style={{ marginBottom: '30px', fontSize: '1.1rem', opacity: 0.9 }}>
                Chúng tôi kiểm soát chặt chẽ từ khâu thu hoạch tại các đảo yến đến quy trình sơ chế thủ công tỉ mỉ, đảm bảo mỗi tổ yến đến tay khách hàng đều giữ trọn vẹn 18 loại acid amin và 31 nguyên tố vi lượng.
              </p>
              <Link href="/blog/mua_yen_hcm" className="btn-primary">
                Tìm Hiểu Câu Chuyện Của Chúng Tôi
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding">
        <div className="container">
          <div className="section-title-wrapper">
            <h2 className="section-title">Khách Hàng Nói Gì</h2>
            <p className="section-subtitle">Hơn 5.000 khách hàng đã tin tưởng và sử dụng sản phẩm của chúng tôi</p>
          </div>
          <div className="grid-3">
            {[
              { name: 'Chị Lan Anh', role: 'Nội trợ (Quận 7)', text: 'Yến ở đây sợi rất dai và thơm, không bị nát như những chỗ khác mình từng mua. Đóng gói lại cực kỳ sang trọng, rất hợp để đem biếu.' },
              { name: 'Anh Minh Đức', role: 'Doanh nhân (Quận 1)', text: 'Mình thường mua nước yến chưng sẵn cho bố mẹ bồi bổ. Tiện lợi mà chất lượng vẫn đảm bảo, cảm nhận rõ sự khác biệt so với các loại nước yến đóng chai công nghiệp.' },
              { name: 'Cô Thu Hà', role: 'Giáo viên nghỉ hưu', text: 'Yến thô ở Thượng Yến rất sạch, ít lông và tạp chất, nhặt rất nhanh. Ăn vào thấy ngủ ngon và da dẻ hồng hào hơn hẳn.' }
            ].map((t, i) => (
              <div key={i} className="glass-card" style={{ fontStyle: 'italic', position: 'relative' }}>
                <span style={{ fontSize: '4rem', color: 'rgba(212, 175, 55, 0.2)', position: 'absolute', top: '10px', left: '20px', fontFamily: 'serif' }}>"</span>
                <p style={{ marginBottom: '25px', paddingTop: '20px', lineHeight: '1.8' }}>{t.text}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: 'var(--primary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'var(--bg-color)' }}>
                    {t.name[0]}
                  </div>
                  <div>
                    <h4 style={{ color: 'var(--primary-color)', margin: 0 }}>{t.name}</h4>
                    <small style={{ opacity: 0.6 }}>{t.role}</small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Blog Posts */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="section-title-wrapper">
            <h2 className="section-title">Kiến Thức Yến Sào</h2>
            <p className="section-subtitle">Cập nhật những bí quyết chăm sóc sức khỏe và phân biệt yến sào thật giả</p>
          </div>
          <div className="grid-3">
            {blogs.slice(0, 3).map((b: any) => (
              <div key={b.id} className="glass-card" style={{ padding: 0, overflow: 'hidden', borderRadius: '15px' }}>
                <Link href={`/blog/${b.slug}`}>
                  <div style={{ height: '200px', overflow: 'hidden', cursor: 'pointer' }}>
                    <SafeImage 
                      src={b.imageUrl} 
                      alt={b.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                </Link>
                <div style={{ padding: '25px' }}>
                  <small style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>📅 {b.date}</small>
                  <h3 style={{ margin: '15px 0', fontSize: '1.2rem', minHeight: '3em', lineHeight: '1.4' }}>{b.title}</h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '20px', minHeight: '4em', lineHeight: '1.6' }}>{b.description}</p>
                  <Link href={`/blog/${b.slug}`} style={{ fontWeight: '600', color: 'var(--primary-color)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    Đọc tiếp <span>&rarr;</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <Link href="/blog" className="btn-primary">Xem Tất Cả Bài Viết</Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="section-title-wrapper">
            <h2 className="section-title">Câu Hỏi Thường Gặp</h2>
            <p className="section-subtitle">Giải đáp những thắc mắc phổ biến của khách hàng về yến sào</p>
          </div>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            {[
              {
                q: "Làm thế nào để phân biệt yến thật và yến giả?",
                a: "Yến thật có mùi tanh đặc trưng, khi ngâm nước sợi yến nở to nhưng không bị tan. Yến giả thường có mùi hắc của hóa chất, tan nhanh trong nước hoặc có vị ngọt do tẩm đường."
              },
              {
                q: "Yến sào có thể bảo quản được bao lâu?",
                a: "Yến thô và yến tinh chế có thể bảo quản từ 1 - 2 năm ở nơi khô thoáng. Yến tươi (đã ngâm) để được 7 ngày trong ngăn mát hoặc 3 tháng trong ngăn đông."
              },
              {
                q: "Trẻ em bao nhiêu tuổi có thể bắt đầu ăn yến?",
                a: "Trẻ từ 1 tuổi trở lên có thể bắt đầu ăn yến với liều lượng nhỏ để tăng cường hệ miễn dịch và phát triển trí não."
              },
              {
                q: "Thời gian giao hàng mất bao lâu?",
                a: "Thượng Yến giao hàng nội thành TP.HCM trong vòng 2-4 giờ. Các tỉnh thành khác sẽ mất từ 2-3 ngày làm việc."
              },
              {
                q: "Nếu tôi phát hiện hàng kém chất lượng thì sao?",
                a: "Chúng tôi cam kết bồi thường 1000% giá trị đơn hàng nếu khách hàng chứng minh được sản phẩm không nguyên chất hoặc có pha trộn."
              }
            ].map((item, index) => (
              <div key={index} className="glass-card" style={{ marginBottom: '20px', textAlign: 'left' }}>
                <h4 style={{ color: 'var(--primary-color)', fontSize: '1.2rem', marginBottom: '10px' }}>{item.q}</h4>
                <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding" style={{ textAlign: 'center' }}>
        <div className="container">
          <div className="glass-card" style={{ padding: '80px 40px', background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.1), rgba(6, 38, 33, 0.8))' }}>
            <h2 style={{ fontSize: '3.5rem', marginBottom: '20px', fontFamily: 'var(--font-serif)' }}>Sẵn Sàng Trải Nghiệm?</h2>
            <p style={{ fontSize: '1.2rem', marginBottom: '40px', maxWidth: '700px', margin: '0 auto 40px' }}>
              Hãy để Thượng Yến cùng bạn chăm sóc sức khỏe cho những người thân yêu bằng những sản phẩm yến sào chất lượng nhất.
            </p>
            <Link href="/san-pham" className="btn-primary" style={{ fontSize: '1.3rem', padding: '18px 50px' }}>
              Bắt Đầu Mua Sắm
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
