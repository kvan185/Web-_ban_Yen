import type { Metadata } from 'next';
import fs from 'fs';
import path from 'path';
import { cookies } from 'next/headers';
import FloatingContactButtons from '@/components/FloatingContactButtons';
import PublicChrome, { PublicFooter } from '@/components/PublicChrome';
import { readCategories } from '@/lib/categories';
import { DEFAULT_OG_IMAGE, JsonLd, organizationJsonLd, SITE_URL, websiteJsonLd } from '@/lib/seo';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: 'Yến Tinh Hoa',
  title: {
    default: 'Yến Thô - Tổ yến nguyên chất tại TP.HCM',
    template: '%s | Yến Tinh Hoa',
  },
  description:
    'Yến Tinh Hoa cung cấp tổ yến thô, yến tinh chế và quà tặng yến sào nguyên chất tại TP.HCM. Giao nhanh 2-4 giờ, nguồn gốc minh bạch.',
  keywords: ['Yến Tinh Hoa', 'tổ yến', 'yến thô', 'yến sào', 'tổ yến nguyên chất', 'mua yến TP.HCM'],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Yến Tinh Hoa - Tổ yến nguyên chất tại TP.HCM',
    description: 'Tổ yến nguyên chất, nguồn gốc minh bạch, giao nhanh tại TP.HCM.',
    url: 'https://yenth.vn',
    siteName: 'Yến Tinh Hoa',
    locale: 'vi_VN',
    type: 'website',
    images: ['/logo.jpeg'],
  },
  twitter: {
    card: 'summary_large_image',
    images: [DEFAULT_OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  verification: {
    google: 'mCOuhXES7GHQRmVHNd64Hgyct74gyysAggOmqT4V1bg',
  },
};

function getSettings() {
  try {
    const filePath = path.join(process.cwd(), 'src', 'data', 'settings.json');
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch {
    return {
      primaryColor: '#D4AF37',
      backgroundColor: '#062621',
      textColor: '#F5F5F5',
      productsPerRow: 4,
    };
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = getSettings();
  const cookieStore = await cookies();
  const isAdmin = cookieStore.has('admin_session');
  const isUser = cookieStore.has('user_session');
  const categories = readCategories();

  return (
    <html lang="vi">
      <body
        suppressHydrationWarning
        style={
          {
            '--primary-color': settings.primaryColor,
            '--bg-color': settings.backgroundColor,
            '--text-color': settings.textColor,
            overflow: 'auto',
          } as React.CSSProperties
        }
      >
        <PublicChrome isAdmin={isAdmin} isUser={isUser} categories={categories} />
        <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />

        <main>{children}</main>

        <PublicFooter>
            <footer className="site-footer">
              <div className="container">
                <div className="footer-grid">
                  <div className="footer-info">
                    <span className="footer-kicker">Tổ yến nguyên chất tại TP.HCM</span>
                    <h3>Yến Tinh Hoa</h3>
                    <p>
                      Tuyển chọn kỹ, sơ chế thủ công và tư vấn đúng nhu cầu trước khi giao. Mỗi hộp yến ưu tiên sự
                      minh bạch, chỉn chu và dễ dùng cho gia đình hoặc quà biếu.
                    </p>
                    <div className="footer-promises" aria-label="Cam kết Yến Tinh Hoa">
                      <span>Nguồn tổ rõ</span>
                      <span>Sơ chế thủ công</span>
                      <span>Giao nhanh 2-4 giờ</span>
                    </div>
                  </div>
                  <div className="footer-contact">
                    <h4>Liên hệ nhanh</h4>
                    <ul>
                      <li><strong>Zalo / Hotline</strong><a href="https://zalo.me/0375266538">0375266538</a></li>
                      <li><strong>Facebook</strong><a href="https://www.facebook.com/nkhanhvan185" target="_blank" rel="noopener noreferrer">Khánh Văn</a></li>
                      <li><strong>Email</strong><a href="mailto:khanhvan18052004@gmail.com">khanhvan18052004@gmail.com</a></li>
                      <li>
                        <strong>Địa chỉ</strong>
                        <a href="https://maps.google.com/?q=105%20Ung%20V%C4%83n%20Khi%C3%AAm%2C%20B%C3%ACnh%20Th%E1%BA%A1nh%2C%20H%E1%BB%93%20Ch%C3%AD%20Minh" target="_blank" rel="noopener noreferrer">
                          105 Ung Văn Khiêm, TP.HCM
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="footer-map">
                      <iframe
                        src="https://maps.google.com/maps?q=105%20Ung%20V%C4%83n%20Khi%C3%AAm%2C%20B%C3%ACnh%20Th%E1%BA%A1nh%2C%20H%E1%BB%93%20Ch%C3%AD%20Minh&t=&z=15&ie=UTF8&iwloc=&output=embed"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Bản đồ Yến Tinh Hoa"
                      />
                  </div>
                </div>
              </div>
            </footer>
            <div className="fixed-footer-bar">
              <span><strong>Zalo / Hotline:</strong> <a href="tel:0375266538">0375266538</a></span>
              <span><strong>Địa chỉ:</strong> <a href="https://maps.google.com/?q=105%20Ung%20V%C4%83n%20Khi%C3%AAm%2C%20B%C3%ACnh%20Th%E1%BA%A1nh%2C%20H%E1%BB%93%20Ch%C3%AD%20Minh" target="_blank" rel="noopener noreferrer">105 Ung Văn Khiêm, TP.HCM</a></span>
            </div>
            <FloatingContactButtons />
        </PublicFooter>
      </body>
    </html>
  );
}
