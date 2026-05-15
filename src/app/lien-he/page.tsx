export const metadata = {
  title: 'Liên Hệ Với Thượng Yến',
  description: 'Liên hệ với Thượng Yến qua hotline, email hoặc ghé thăm cửa hàng của chúng tôi tại TP.HCM.',
};

export default function ContactPage() {
  return (
    <div className="contact-page">
      <section className="section-padding">
        <div className="container">
          <div className="section-title-wrapper">
            <h2 className="section-title">Liên Hệ Với Chúng Tôi</h2>
            <p className="section-subtitle">Chúng tôi luôn sẵn sàng lắng nghe và giải đáp mọi thắc mắc của bạn</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px' }}>
            <div>
              <div className="glass-card" style={{ marginBottom: '30px' }}>
                <h3 style={{ color: 'var(--primary-color)', marginBottom: '20px' }}>Thông Tin Liên Hệ</h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  <li style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <span style={{ fontSize: '1.5rem' }}>📍</span>
                    <div>
                      <strong>Địa chỉ:</strong><br />
                      631/26 Lê Đức Thọ, Phường 16, Gò Vấp, TP. Hồ Chí Minh
                    </div>
                  </li>
                  <li style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <span style={{ fontSize: '1.5rem' }}>📞</span>
                    <div>
                      <strong>Hotline/Zalo:</strong><br />
                      <a href="tel:0375266538" style={{ color: 'var(--primary-color)' }}>0375266538</a>
                    </div>
                  </li>
                  <li style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <span style={{ fontSize: '1.5rem' }}>✉️</span>
                    <div>
                      <strong>Email:</strong><br />
                      <a href="mailto:khanhvan18052004@gmail.com" style={{ color: 'var(--primary-color)' }}>khanhvan18052004@gmail.com</a>
                    </div>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <span style={{ fontSize: '1.5rem' }}>⏰</span>
                    <div>
                      <strong>Giờ làm việc:</strong><br />
                      8:00 - 21:00 (Thứ 2 - Chủ Nhật)
                    </div>
                  </li>
                </ul>
              </div>

              <div style={{ height: '300px', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}>
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3924.1375799631087!2d106.186295!3d10.410646!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTDCsDI0JzM4LjMiTiAxMDbCsDExJzEwLjciRQ!5e0!3m2!1sen!2s!4v1778469651225!5m2!1sen!2s" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy"
                ></iframe>
              </div>
            </div>

            <div>
              <div className="glass-card">
                <h3 style={{ color: 'var(--primary-color)', marginBottom: '25px' }}>Gửi Tin Nhắn Cho Thượng Yến</h3>
                <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', opacity: 0.8 }}>Họ và tên</label>
                    <input type="text" placeholder="Nhập tên của bạn" style={{ 
                      width: '100%', 
                      padding: '12px', 
                      borderRadius: '4px', 
                      border: '1px solid rgba(255,255,255,0.1)',
                      background: 'rgba(255,255,255,0.05)',
                      color: 'white'
                    }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', opacity: 0.8 }}>Số điện thoại</label>
                    <input type="tel" placeholder="Nhập số điện thoại" style={{ 
                      width: '100%', 
                      padding: '12px', 
                      borderRadius: '4px', 
                      border: '1px solid rgba(255,255,255,0.1)',
                      background: 'rgba(255,255,255,0.05)',
                      color: 'white'
                    }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', opacity: 0.8 }}>Nội dung tin nhắn</label>
                    <textarea rows={5} placeholder="Bạn cần hỗ trợ gì?" style={{ 
                      width: '100%', 
                      padding: '12px', 
                      borderRadius: '4px', 
                      border: '1px solid rgba(255,255,255,0.1)',
                      background: 'rgba(255,255,255,0.05)',
                      color: 'white',
                      resize: 'none'
                    }}></textarea>
                  </div>
                  <button type="button" className="btn-primary" style={{ padding: '15px' }}>Gửi Tin Nhắn</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
