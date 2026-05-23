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
        background: 'linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url(https://images.unsplash.com/photo-1583094896752-0c91ee0a6ca5?q=80&w=2000&auto=format&fit=crop) center/cover'
      }}>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="glass-card" style={{ maxWidth: '800px', margin: '0 auto', padding: '60px' }}>
            <div className="trust-badge-hero">
              <span>🛡️</span> Cam kết bồi thường 1000% nếu phát hiện hàng giả hay pha trộn
            </div>
            <h1 style={{ 
              fontSize: '4.5rem', 
              marginBottom: '20px', 
              color: 'var(--primary-color)',
              lineHeight: '1.1',
              fontFamily: 'var(--font-serif)'
            }}>Yến Tinh Hoa</h1>
            <p style={{ 
              fontSize: '1.9rem', 
              marginBottom: '40px', 
              color: 'var(--text-color)',
              fontWeight: '300',
              letterSpacing: '0.04em'
            }}>Tổ yến thiên nhiên nguyên chất - Món quà vô giá cho sức khỏe gia đình</p>
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
              <p className="trust-desc">Yến thô được khai thác trực tiếp từ nhà yến.</p>
            </div>
            <div className="trust-signal">
              <span className="trust-icon">🌿</span>
              <h3 className="trust-title">Sơ Chế Thủ Công</h3>
              <p className="trust-desc">Quy trình nhặt lông hoàn toàn bằng tay, không sử dụng hóa chất tẩy rửa.</p>
            </div>
            <div className="trust-signal">
              <span className="trust-icon">📜</span>
              <h3 className="trust-title">Nguồn Gốc Minh Bạch</h3>
              <p className="trust-desc">Mỗi lô yến thô có thể truy xuất nguồn gốc từ nhà yến, phù hợp với sản phẩm thô tự nhiên.</p>
            </div>
            <div className="trust-signal">
              <span className="trust-icon">🚚</span>
              <h3 className="trust-title">Giao Hàng Nhanh</h3>
              <p className="trust-desc">Miễn phí giao hàng nội thành HCM cho đơn hàng từ 1.000.000đ.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Local HCM Landing Pages */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="section-title-wrapper">
            <h2 className="section-title">Giao hàng nhanh TP.HCM</h2>
            <p className="section-subtitle">Chọn quận của bạn để xem trang dịch vụ giao hàng nhanh 2-4 giờ và đặt yến sào thượng hạng ngay trong ngày.</p>
          </div>
          <div className="grid-4">
            <Link href="/hcm/quan-1" className="glass-card" style={{ padding: '30px' }}>
              <h3>Quận 1</h3>
              <p>Giao nhanh 2-3 giờ cho trung tâm tài chính và khu thương mại.</p>
            </Link>
            <Link href="/hcm/quan-3" className="glass-card" style={{ padding: '30px' }}>
              <h3>Quận 3</h3>
              <p>Phục vụ nhanh cho đường Võ Văn Tần, Nam Kỳ Khởi Nghĩa và khu vực lân cận.</p>
            </Link>
            <Link href="/hcm/quan-7" className="glass-card" style={{ padding: '30px' }}>
              <h3>Quận 7</h3>
              <p>Ưu tiên giao hàng nhanh cho Phú Mỹ Hưng và khu đô thị cao cấp.</p>
            </Link>
            <Link href="/hcm/phu-nhuan" className="glass-card" style={{ padding: '30px' }}>
              <h3>Phú Nhuận</h3>
              <p>Giao nhanh trong ngày cho khu vực sân bay và trung tâm thành phố.</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section-padding">
        <div className="container">
          <div className="section-title-wrapper">
            <h2 className="section-title">Sản Phẩm Yến Nổi Bật</h2>
            <p className="section-subtitle">Khám phá các dòng tổ yến thô nguyên chất và yến tốt tuyển chọn kỹ lưỡng</p>
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
                alt="About Yến Tinh Hoa" 
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
              <h2 style={{ fontSize: '3rem', marginBottom: '25px', color: 'var(--primary-color)' }}>Về Yến Tinh Hoa</h2>
              <p style={{ marginBottom: '20px', fontSize: '1.1rem', opacity: 0.9 }}>
                Khởi nguồn từ niềm đam mê với tổ yến thô thiên nhiên quý giá, Yến Tinh Hoa ra đời với sứ mệnh mang đến các sản phẩm yến sào nguyên chất và dòng yến tốt nhất cho sức khỏe người Việt.
              </p>
              <p style={{ marginBottom: '30px', fontSize: '1.1rem', opacity: 0.9 }}>
                Chúng tôi kiểm soát chặt chẽ từ khâu thu hoạch tại các đảo yến đến quy trình sơ chế thủ công tỉ mỉ. Toàn bộ dòng yến thô ít lông và yến tinh chế tại Yến Tinh Hoa cam kết giữ trọn vẹn 100% dưỡng chất tự nhiên.
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
              { name: 'Chị Lan Anh', role: 'Nội trợ (Quận 7)', text: 'Mình thường mua yến tinh chế về cho gia đình chưng. Rất tiện lợi vì yến đã được làm sạch lông hoàn toàn, sợi yến nấu lên nở to, dai và đặc biệt rất thơm.', imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop' },
              { name: 'Anh Minh Đức', role: 'Doanh nhân (Quận 1)', text: 'Công việc bận rộn nên tôi hay chọn yến tinh chế làm quà biếu đối tác. Bao bì sang trọng, tổ yến đều đẹp, đối tác nhận xong ai cũng khen nức nở.', imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop' },
              { name: 'Cô Thu Hà', role: 'Giáo viên nghỉ hưu', text: 'Yến thô ở đây tổ to, dày và rất ít lông. Cô tự tay nhặt nên thấy cực kỳ an tâm. Cả nhà ăn vào ai cũng thấy ngủ ngon và da dẻ hồng hào hẳn ra.', imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop' }
            ].map((t, i) => (
              <div key={i} className="glass-card" style={{ fontStyle: 'italic', position: 'relative', overflow: 'hidden', padding: 0 }}>
                <div style={{ position: 'relative', width: '100%', height: '220px' }}>
                  <SafeImage src={t.imageUrl} alt={t.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.05), rgba(0,0,0,0.65))' }} />
                  <div style={{ position: 'absolute', bottom: '18px', left: '18px', zIndex: 2, color: '#fff' }}>
                    <h4 style={{ margin: 0, fontSize: '1.1rem' }}>{t.name}</h4>
                    <small style={{ opacity: 0.85 }}>{t.role}</small>
                  </div>
                </div>
                <div style={{ padding: '28px 24px 24px', backgroundColor: 'rgba(6, 38, 33, 0.95)' }}>
                  <span style={{ fontSize: '4rem', color: 'rgba(212, 175, 55, 0.15)', position: 'absolute', top: '242px', left: '24px', fontFamily: 'serif' }}>
                    "
                  </span>
                  <p style={{ marginBottom: '25px', paddingTop: '10px', lineHeight: '1.8', position: 'relative' }}>{t.text}</p>
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Blog Posts */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="section-title-wrapper">
            <h2 className="section-title">Kiến Thức Tổ Yến</h2>
            <p className="section-subtitle">Cập nhật bí quyết chưng yến thô, lựa chọn yến tốt và nội dung chuyên sâu từ hơn 10 năm kinh nghiệm Yến Tinh Hoa.</p>
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
                a: "Yến thô và yến tinh chế có thể bảo quản từ 1 - 2 năm ở nơi khô thoáng. Yến tươi (đã ngâm) để được 7 ngày trong ngăn mát hoặc 3 tháng trong ngăn đông.",
                cta: { text: 'Mua ngay Yến Tinh Chế để được hướng dẫn bảo quản chi tiết', href: '/san-pham?category=Yến Tinh Chế' }
              },
              {
                q: "Trẻ em bao nhiêu tuổi có thể bắt đầu ăn yến?",
                a: "Trẻ từ 1 tuổi trở lên có thể bắt đầu ăn yến với liều lượng nhỏ để tăng cường hệ miễn dịch và phát triển trí não."
              },
              {
                q: "Thời gian giao hàng mất bao lâu?",
                a: "Yến Tinh Hoa giao hàng nhanh 2-4 giờ tại TP.HCM, đặc biệt ưu tiên các quận Quận 1, Quận 3, Quận 7, Quận Phú Nhuận và Quận Bình Thạnh. Nếu bạn ở quận gần trung tâm như Quận 1 hay Quận 7, đơn hàng sẽ đến rất nhanh trong ngày."
              },
              {
                q: "Tôi ở Quận 7 hay Quận 1 thì bao lâu nhận được hàng?",
                a: "Với dịch vụ giao hàng nội thành TP.HCM của chúng tôi, đơn hàng tại Quận 1, Quận 7, Quận 3 và Quận Phú Nhuận thường được giao trong 2-3 giờ. Quận Bình Thạnh, Tân Bình và các quận lân cận khác sẽ nhận trong 3-4 giờ."
              },
              {
                q: "Nếu tôi phát hiện hàng kém chất lượng thì sao?",
                a: "Chúng tôi cam kết bồi thường 1000% giá trị đơn hàng nếu khách hàng chứng minh được sản phẩm không nguyên chất hoặc có pha trộn."
              }
            ].map((item, index) => (
              <div key={index} className="glass-card" style={{ marginBottom: '20px', textAlign: 'left' }}>
                <h4 style={{ color: 'var(--primary-color)', fontSize: '1.2rem', marginBottom: '10px' }}>{item.q}</h4>
                <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>{item.a}</p>
                {item.cta && (
                  <Link href={item.cta.href} className="btn-primary" style={{ marginTop: '16px', display: 'inline-flex' }}>
                    {item.cta.text}
                  </Link>
                )}
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
              Hãy để Yến Tinh Hoa cùng bạn lựa chọn những dòng yến tốt, tổ yến thô chất lượng nhất để chăm sóc sức khỏe toàn diện cho gia đình.
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
