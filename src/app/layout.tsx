import type { Metadata } from 'next';
import './globals.css';
import fs from 'fs';
import path from 'path';
import SiteHeader from '@/components/SiteHeader';
import { cookies, headers } from 'next/headers';

export const metadata: Metadata = {
  title: 'Yến Tinh Hoa - Tổ Yến Thô Nguyên Chất, Yến Thô Tốt Giá Rẻ',
  description: 'Yến Tinh Hoa chuyên cung cấp các loại tổ yến thô nguyên chất, yến thô ít lông chất lượng tốt nhất, yến tốt cho sức khỏe gia đình bạn. Đảm bảo 100% yến thật tự nhiên.',
  keywords: ['tổ yến', 'yến thô', 'yến tốt', 'yến sào', 'tổ yến thô', 'yến thô nguyên chất'],
  verification: {
    google: 'mCOuhXES7GHQRmVHNd64Hgyct74gyysAggOmqT4V1bg',
  },
};

function getSettings() {
  try {
    const filePath = path.join(process.cwd(), 'src', 'data', 'settings.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    return {
      primaryColor: '#D4AF37',
      backgroundColor: '#1A1A1A',
      textColor: '#F5F5F5',
      productsPerRow: 4,
    };
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = getSettings();
  const cookieStore = await cookies();
  const headersList = await headers();
  const rawPath =
    headersList.get('x-invoke-pathname') ||
    headersList.get('x-pathname') ||
    headersList.get('x-nextjs-rewritten-path') ||
    headersList.get('x-middleware-path') ||
    headersList.get('x-nextjs-rewrite') ||
    '';

  const pathname = rawPath?.toString().startsWith('http')
    ? new URL(rawPath.toString()).pathname
    : rawPath?.toString() || '';

  const isLoginPage = pathname.startsWith('/login');
  const isAdminPage = pathname.startsWith('/admin');

  const hideFooter = isAdminPage || isLoginPage;
  const isAdmin = cookieStore.has('admin_session');
  const isUser = cookieStore.has('user_session');

  return (
    <html lang="vi">
      <body
        style={{
          '--primary-color': settings.primaryColor,
          '--bg-color': settings.backgroundColor,
          '--text-color': settings.textColor,
          overflow: isLoginPage ? 'hidden' : 'auto',
        } as React.CSSProperties}
      >
        {!isLoginPage && (
          <SiteHeader
            isAdmin={isAdmin}
            isUser={isUser}
            showTopHeader={!isAdminPage}
            enableAutoHide={!isAdminPage}
          />
        )}

        <main style={{ paddingTop: isLoginPage ? 0 : undefined }}>{children}</main>

        {!hideFooter && (
          <footer className="site-footer">
          <div className="container footer-grid">
            <div className="footer-info">
              <h3>Yến Tinh Hoa</h3>
              <p>Yến Tinh Hoa - Tinh hoa tổ yến thô nguyên chất từ thiên nhiên. Cam kết mang đến các dòng sản phẩm yến tốt, chất lượng cao và an toàn tuyệt đối cho sức khỏe gia đình bạn.</p>
              <p style={{ marginTop: '15px', opacity: 0.85 }}>Giao hàng nhanh 2-4 giờ tại TP.HCM, ưu tiên Quận 1, Quận 3, Quận 7, Quận Phú Nhuận và Quận Bình Thạnh.</p>
              <div className="footer-map" style={{ marginTop: '20px' }}>
                <iframe 
                  src="https://maps.google.com/maps?q=105%20Ung%20V%C4%83n%20Khi%C3%AAm%2C%20B%C3%ACnh%20Th%E1%BA%A1nh%2C%20H%E1%BB%93%20Ch%C3%AD%20Minh&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                  width="100%" 
                  height="200" 
                  style={{ border: 0, borderRadius: '8px' }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
            <div className="footer-contact">
              <h4>Liên hệ</h4>
              <ul>
                <li><strong>Zalo:</strong> <a href="https://zalo.me/0375266538">0375266538</a></li>
                <li><strong>Facebook:</strong> <a href="https://www.facebook.com/nkhanhvan185" target="_blank" rel="noopener noreferrer">Khánh Văn</a></li>
                <li><strong>Email:</strong> <a href="mailto:khanhvan18052004@gmail.com">khanhvan18052004@gmail.com</a></li>
                <li><strong>Địa chỉ:</strong> 105 Ung Văn Khiêm, Bình Thạnh, Hồ Chí Minh <a href="https://maps.google.com/?q=105%20Ung%20V%C4%83n%20Khi%C3%AAm%2C%20B%C3%ACnh%20Th%E1%BA%A1nh%2C%20H%E1%BB%93%20Ch%C3%AD%20Minh" target="_blank" rel="noopener noreferrer">Xem trên bản đồ</a></li>
              </ul>
            </div>
            <div className="footer-newsletter">
              <h4>Nhận bản tin</h4>
              <p>Đăng ký để nhận ưu đãi mới nhất từ Yến Tinh Hoa</p>
              <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                <input type="email" placeholder="Email của bạn" style={{ 
                  padding: '10px', 
                  borderRadius: '4px', 
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'rgba(255,255,255,0.05)',
                  color: 'white',
                  flex: 1
                }} />
                <button className="btn-primary" style={{ padding: '10px 20px' }}>Gửi</button>
              </div>
            </div>
          </div>
          <div className="container footer-bottom">
          </div>
          </footer>
        )}
        {!hideFooter && (
          <>
            <div className="fixed-footer-bar" style={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: 'rgba(6, 38, 33, 0.95)',
              backdropFilter: 'blur(10px)',
              borderTop: '1px solid rgba(212, 175, 55, 0.3)',
              padding: '10px 20px',
              zIndex: 9999,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '30px',
              fontSize: '0.9rem',
              color: '#fff',
              flexWrap: 'wrap',
              boxShadow: '0 -5px 20px rgba(0,0,0,0.5)',
              transition: 'all 0.3s ease'
            }}>
              <span>📞 <strong>Zalo / Hotline:</strong> <a href="tel:0375266538" style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>0375266538</a></span>
              <span style={{ opacity: 0.5 }}>|</span>
              <span>📍 <strong>Địa chỉ:</strong> <a href="https://maps.google.com/?q=105%20Ung%20V%C4%83n%20Khi%C3%AAm%2C%20B%C3%ACnh%20Th%E1%BA%A1nh%2C%20H%E1%BB%93%20Ch%C3%AD%20Minh" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary-color)' }}>105 Ung Văn Khiêm, Bình Thạnh, Hồ Chí Minh</a></span>
            </div>
            <div className="floating-contacts" style={{ bottom: '75px' }}>
              <a href="https://zalo.me/0375266538" target="_blank" rel="noopener noreferrer" className="floating-btn btn-zalo" title="Chat Zalo">
                <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Zalo</span>
              </a>
              <a href="https://m.me/nkhanhvan185" target="_blank" rel="noopener noreferrer" className="floating-btn btn-messenger" title="Chat Messenger">
                <span style={{ fontSize: '1.5rem' }}>💬</span>
              </a>
              <a href="tel:0375266538" className="floating-btn btn-phone" title="Gọi Hotline">
                <span style={{ fontSize: '1.5rem' }}>📞</span>
              </a>
            </div>
          </>
        )}
      </body>
    </html>
  );
}
