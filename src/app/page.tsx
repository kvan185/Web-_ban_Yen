import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import { cookies } from 'next/headers';
import AddToCartButton from '@/components/AddToCartButton';
import SafeImage from '@/components/SafeImage';

type Product = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  description?: string;
  badge?: string;
  origin?: string;
  category?: string;
};

type BlogPost = {
  id: string;
  title: string;
  description: string;
  slug: string;
  imageUrl: string;
  date: string;
};

function readJsonFile<T>(fileName: string, fallback: T): T {
  const filePath = path.join(process.cwd(), 'src', 'data', fileName);

  try {
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, 'utf8')) as T;
    }
  } catch (error) {
    console.error(error);
  }

  return fallback;
}

function repairText(value = '') {
  if (!/(Ã|Ä|Æ|Â|áº|á»|â€|ðŸ)/.test(value)) {
    return value;
  }

  try {
    return Buffer.from(value, 'latin1').toString('utf8');
  } catch {
    return value;
  }
}

function normalizeProduct(product: Product): Product {
  return {
    ...product,
    name: repairText(product.name),
    description: repairText(product.description),
    badge: repairText(product.badge),
    origin: repairText(product.origin),
    category: repairText(product.category),
  };
}

function normalizeBlog(blog: BlogPost): BlogPost {
  return {
    ...blog,
    title: repairText(blog.title),
    description: repairText(blog.description),
  };
}

export default async function Home() {
  const cookieStore = await cookies();
  const isAdmin = cookieStore.has('admin_session');
  const isUser = cookieStore.has('user_session');
  const accountHref = isAdmin ? '/manager' : isUser ? '/account' : '/login';
  const accountLabel = isAdmin ? 'Quản trị' : isUser ? 'Tài khoản' : 'Đăng nhập';
  const products = readJsonFile<Product[]>('products.json', []);
  const blogs = readJsonFile<BlogPost[]>('blog-metadata.json', []);

  const featuredProducts = products.slice(0, 4).map(normalizeProduct);
  const featuredBlogs = blogs.slice(0, 3).map(normalizeBlog);

  return (
    <div className="home-page">
      <section className="home-hero">
        <div className="home-hero-bg" aria-hidden="true" />
        <div className="container home-hero-inner">
          <div className="home-hero-copy">
            <span className="eyebrow">Yến sạch tuyển chọn tại TP.HCM</span>
            <h1>Yến Tinh Hoa</h1>
            <p>
              Tổ yến nguyên chất, sơ chế thủ công và đóng gói sang trọng cho gia đình,
              quà biếu và những dịp cần chăm sóc sức khỏe thật chỉn chu.
            </p>
            <div className="hero-actions">
              <Link href="/products" className="btn-primary">
                Mua ngay
              </Link>
              <Link href="/about" className="btn-secondary">
                Xem quy trình
              </Link>
              <Link href={accountHref} className="btn-ghost">
                {accountLabel}
              </Link>
            </div>
            <div className="hero-proof">
              <span>Giao nhanh 2-4 giờ</span>
              <span>Truy xuất nguồn gốc</span>
              <span>Cam kết 1000%</span>
            </div>
          </div>

          <div className="hero-showcase" aria-label="Sản phẩm nổi bật">
            <div className="hero-image-frame">
              <SafeImage
                src="/images/products/1779533164416-vi-t_l-i_to-n_b-_ch--_202605231229.jpeg"
                alt="Hộp yến tinh hoa cao cấp"
              />
            </div>
            <div className="hero-floating-card">
              <strong>100g</strong>
              <span>Yến tinh chế sợi dài</span>
              <small>Sẵn sàng chưng, phù hợp biếu tặng</small>
            </div>
          </div>
        </div>
      </section>

      <section className="trust-band">
        <div className="container trust-band-grid">
          {[
            ['100%', 'Tự nhiên', 'Không pha trộn, không tẩy trắng.'],
            ['2-4h', 'Giao nhanh HCM', 'Ưu tiên các quận trung tâm.'],
            ['10+', 'Năm kinh nghiệm', 'Tư vấn đúng nhu cầu sử dụng.'],
            ['1000%', 'Cam kết', 'Bồi thường nếu phát hiện hàng giả.'],
          ].map(([metric, title, desc]) => (
            <div className="trust-metric" key={title}>
              <strong>{metric}</strong>
              <h3>{title}</h3>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-padding home-section">
        <div className="container">
          <div className="section-heading-row">
            <div>
              <span className="eyebrow">Bộ sưu tập nổi bật</span>
              <h2 className="section-title">Dòng yến được chọn nhiều</h2>
            </div>
            <Link href="/products" className="section-link">
              Xem tất cả
            </Link>
          </div>

          <div className="featured-product-grid">
            {featuredProducts.map((product) => (
              <article key={product.id} className="premium-product-card">
                {product.badge && <span className="product-badge">{product.badge}</span>}
                <Link href={`/products/${product.id}`} className="premium-product-media">
                  <SafeImage src={product.imageUrl} alt={product.name} />
                </Link>
                <div className="premium-product-body">
                  <span>{product.category || product.origin || 'Yến tuyển chọn'}</span>
                  <h3>
                    <Link href={`/products/${product.id}`}>{product.name}</Link>
                  </h3>
                  <p>{product.description || 'Sản phẩm yến sào nguyên chất, đóng gói cẩn thận.'}</p>
                  <div className="premium-product-footer">
                    <strong>{product.price.toLocaleString('vi-VN')} đ</strong>
                    <AddToCartButton product={product} style={{ width: 'auto' }} />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding story-section">
        <div className="container story-grid">
          <div className="story-media">
            <SafeImage src="/images/about-process.png" alt="Quy trình sơ chế yến thủ công" />
            <div className="story-stamp">
              <strong>Thủ công</strong>
              <span>Nhặt lông tỉ mỉ từng tổ</span>
            </div>
          </div>
          <div className="story-copy">
            <span className="eyebrow">Khác biệt nằm ở độ thật</span>
            <h2>Đẹp mắt, nhưng vẫn phải đáng tin trước tiên.</h2>
            <p>
              Mỗi sản phẩm được chọn từ nguồn yến rõ ràng, sơ chế bằng tay và kiểm tra lại
              trước khi đóng hộp. Giao diện mới nhấn mạnh điều khách hàng cần thấy ngay:
              chất lượng, minh bạch và sự tiện lợi khi đặt mua.
            </p>
            <div className="process-list">
              <div>
                <span>01</span>
                <strong>Tuyển tổ</strong>
                <p>Chọn tổ dày, thơm tự nhiên, hạn chế tạp chất.</p>
              </div>
              <div>
                <span>02</span>
                <strong>Sơ chế sạch</strong>
                <p>Nhặt lông thủ công, giữ sợi yến dai và ít hao.</p>
              </div>
              <div>
                <span>03</span>
                <strong>Đóng gói đẹp</strong>
                <p>Phù hợp dùng hằng ngày hoặc làm quà biếu.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding delivery-section">
        <div className="container">
          <div className="section-title-wrapper">
            <span className="eyebrow">Giao hàng nội thành</span>
            <h2 className="section-title">Nhận yến nhanh tại TP.HCM</h2>
            <p className="section-subtitle">
              Chọn khu vực của bạn để xem thông tin giao nhanh và đặt sản phẩm phù hợp trong ngày.
            </p>
          </div>
          <div className="delivery-grid">
            {[
              ['Quận 1', '/hcm/quan-1', 'Giao nhanh khu trung tâm, văn phòng và khách sạn.'],
              ['Quận 3', '/hcm/quan-3', 'Phục vụ nhanh các tuyến Võ Văn Tần, Nam Kỳ Khởi Nghĩa.'],
              ['Quận 7', '/hcm/quan-7', 'Ưu tiên Phú Mỹ Hưng và khu đô thị cao cấp.'],
              ['Phú Nhuận', '/hcm/phu-nhuan', 'Thuận tiện cho khu sân bay và trung tâm thành phố.'],
            ].map(([title, href, desc]) => (
              <Link href={href} className="delivery-card" key={href}>
                <h3>{title}</h3>
                <p>{desc}</p>
                <span>Xem khu vực</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding testimonial-section">
        <div className="container">
          <div className="section-heading-row">
            <div>
              <span className="eyebrow">Khách hàng tin dùng</span>
              <h2 className="section-title">Cảm nhận sau khi dùng yến</h2>
            </div>
          </div>
          <div className="testimonial-grid">
            {[
              ['Chị Lan Anh', 'Nội trợ, Quận 7', 'Yến sạch, sợi nở đẹp và rất tiện vì đã được làm kỹ. Mình thường mua cho cả nhà chưng với táo đỏ.'],
              ['Anh Minh Đức', 'Doanh nhân, Quận 1', 'Hộp quà nhìn sang, giao nhanh trong ngày. Tôi dùng để biếu đối tác và phản hồi rất tốt.'],
              ['Cô Thu Hà', 'Giáo viên nghỉ hưu', 'Tổ yến thơm nhẹ, không bị mùi lạ. Tư vấn liều lượng dễ hiểu nên cô dùng rất yên tâm.'],
            ].map(([name, role, text]) => (
              <article className="testimonial-card" key={name}>
                <p>{text}</p>
                <div>
                  <strong>{name}</strong>
                  <span>{role}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding blog-preview-section">
        <div className="container">
          <div className="section-heading-row">
            <div>
              <span className="eyebrow">Kiến thức yến sào</span>
              <h2 className="section-title">Đọc để chọn đúng</h2>
            </div>
            <Link href="/blog" className="section-link">
              Xem blog
            </Link>
          </div>
          <div className="blog-preview-grid">
            {featuredBlogs.map((blog) => (
              <article key={blog.id} className="blog-preview-card">
                <Link href={`/blog/${blog.slug}`} className="blog-preview-media">
                  <SafeImage src={blog.imageUrl} alt={blog.title} />
                </Link>
                <div>
                  <time>{blog.date}</time>
                  <h3>
                    <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
                  </h3>
                  <p>{blog.description}</p>
                  <Link href={`/blog/${blog.slug}`} className="text-link">
                    Đọc tiếp
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="final-cta">
        <div className="container final-cta-inner">
          <div>
            <span className="eyebrow">Sẵn sàng đặt yến?</span>
            <h2>Chọn hộp yến đẹp, nhận tư vấn đúng và giao nhanh trong ngày.</h2>
          </div>
          <Link href="/products" className="btn-primary">
            Mua sắm ngay
          </Link>
        </div>
      </section>
    </div>
  );
}
