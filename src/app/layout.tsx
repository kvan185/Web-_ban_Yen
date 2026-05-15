import type { Metadata } from 'next';
import './globals.css';
import fs from 'fs';
import path from 'path';
import CartCounter from '@/components/CartCounter';

export const metadata: Metadata = {
  title: 'Thượng Yến - Yến Sào Cao Cấp HCM',
  description: 'Chuyên cung cấp Yến Sào nguyên chất, chất lượng cao tại TP.HCM.',
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = getSettings();

  return (
    <html lang="vi">
      <body
        style={{
          '--primary-color': settings.primaryColor,
          '--bg-color': settings.backgroundColor,
          '--text-color': settings.textColor,
        } as React.CSSProperties}
      >
        <header className="site-header">
          <div className="container header-inner">
            <div className="logo">
              <a href="/">Thượng Yến</a>
            </div>
            <nav>
              <ul className="nav-links">
                <li><a href="/">Trang chủ</a></li>
                <li><a href="/san-pham">Sản phẩm</a></li>
                <li><a href="/blog">Blog</a></li>
                <li><a href="/admin">Admin</a></li>
                <li className="cart-link">
                  <CartCounter />
                </li>
              </ul>
            </nav>
          </div>
        </header>

        <main>{children}</main>

        <footer className="site-footer">
          <div className="container footer-grid">
            <div className="footer-info">
              <h3>Thượng Yến</h3>
              <p>Tinh hoa yến sào nguyên chất từ thiên nhiên. Cam kết chất lượng và an toàn cho sức khỏe gia đình bạn.</p>
              <div className="footer-map" style={{ marginTop: '20px' }}>
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3924.1375799631087!2d106.186295!3d10.410646!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTDCsDI0JzM4LjMiTiAxMDbCsDExJzEwLjciRQ!5e0!3m2!1sen!2s!4v1778469651225!5m2!1sen!2s" 
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
                <li><strong>Địa chỉ:</strong> <a href="https://maps.app.goo.gl/U7FJXdqjwmtLBhR38" target="_blank" rel="noopener noreferrer">Xem trên bản đồ</a></li>
              </ul>
            </div>
          </div>
          <div className="container footer-bottom">
            <p>&copy; {new Date().getFullYear()} Thượng Yến. Tất cả quyền được bảo lưu.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
