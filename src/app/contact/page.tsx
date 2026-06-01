import ContactLeadForm from '@/components/ContactLeadForm';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Liên hệ Yến Tinh Hoa',
  description: 'Liên hệ Yến Tinh Hoa để tư vấn mua yến thô, yến tinh chế, yến sào biếu tặng và giao hàng tại TP.HCM.',
  pathname: '/contact',
  keywords: ['liên hệ Yến Tinh Hoa', 'mua yến TP.HCM', 'tư vấn yến sào', 'yến thô', 'yến tinh chế'],
});

export default function ContactPage() {
  return (
    <div className="container catalog-page">
      <div className="catalog-heading">
        <p className="eyebrow">Liên hệ</p>
        <h1>Yến Tinh Hoa</h1>
        <p>Tư vấn chọn yến thô, yến tinh chế và quà tặng yến sào phù hợp nhu cầu của gia đình bạn.</p>
      </div>

      <ContactLeadForm />

      <div className="manager-grid two-cols">
        <section className="glass-card" style={{ padding: '28px' }}>
          <h2>Thông tin liên hệ</h2>
          <div className="analytics-list" style={{ marginTop: '18px' }}>
            <div><span>Hotline / Zalo</span><strong><a href="tel:0375266538">0375266538</a></strong></div>
            <div><span>Email</span><strong><a href="mailto:khanhvan18052004@gmail.com">khanhvan18052004@gmail.com</a></strong></div>
            <div><span>Facebook</span><strong><a href="https://www.facebook.com/nkhanhvan185" target="_blank" rel="noopener noreferrer">Khánh Văn</a></strong></div>
            <div><span>Địa chỉ</span><strong>105 Ung Văn Khiêm, TP.HCM</strong></div>
          </div>
        </section>

        <section className="glass-card" style={{ padding: '28px' }}>
          <h2>Bản đồ</h2>
          <iframe
            src="https://maps.google.com/maps?q=105%20Ung%20V%C4%83n%20Khi%C3%AAm%2C%20B%C3%ACnh%20Th%E1%BA%A1nh%2C%20H%E1%BB%93%20Ch%C3%AD%20Minh&t=&z=15&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="280"
            style={{ border: 0, borderRadius: '8px', marginTop: '18px' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Bản đồ Yến Tinh Hoa"
          />
        </section>
      </div>
    </div>
  );
}
