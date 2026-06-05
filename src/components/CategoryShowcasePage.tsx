import Link from 'next/link';
import AddToCartButton from '@/components/AddToCartButton';
import SafeImage from '@/components/SafeImage';
import { normalizeCategoryText } from '@/lib/category-order';
import { JsonLd, readProducts, SITE_URL } from '@/lib/seo';

type Product = ReturnType<typeof readProducts>[number];

type CategoryShowcasePageProps = {
  categoryName: string;
  eyebrow: string;
  title: string;
  intro: string;
  pageName: string;
  pagePath: string;
  pageDescription: string;
  sectionTitle: string;
  whyTitle: string;
  whyParagraphs: string[];
  featureCards: Array<{ title: string; description: string }>;
  audienceTitle: string;
  audienceParagraphs: string[];
  noteTitle: string;
  noteText: string;
  priceTitle: string;
  priceNote: string;
  suggestionsTitle: string;
  suggestions: Array<{ title: string; description: string }>;
  usageTitle: string;
  usageSteps: string[];
  usageNoteTitle: string;
  usageNoteText: string;
  faqTitle: string;
  faqs: Array<{ question: string; answer: string }>;
};

function filterProductsByCategory(categoryName: string) {
  const target = normalizeCategoryText(categoryName);
  return readProducts().filter((product) => normalizeCategoryText(product.category || '') === target);
}

export default function CategoryShowcasePage(props: CategoryShowcasePageProps) {
  const {
    categoryName,
    eyebrow,
    title,
    intro,
    pageName,
    pagePath,
    pageDescription,
    sectionTitle,
    whyTitle,
    whyParagraphs,
    featureCards,
    audienceTitle,
    audienceParagraphs,
    noteTitle,
    noteText,
    priceTitle,
    priceNote,
    suggestionsTitle,
    suggestions,
    usageTitle,
    usageSteps,
    usageNoteTitle,
    usageNoteText,
    faqTitle,
    faqs,
  } = props;

  const products = filterProductsByCategory(categoryName);
  const lowestPrice = products.length ? Math.min(...products.map((product) => product.price)) : 0;
  const highestPrice = products.length ? Math.max(...products.map((product) => product.price)) : 0;

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${SITE_URL}${pagePath}#collection`,
    name: pageName,
    url: `${SITE_URL}${pagePath}`,
    description: pageDescription,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: products.map((product, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${SITE_URL}/products/${product.id}`,
        name: product.name,
      })),
    },
  };

  return (
    <>
      <JsonLd data={[faqJsonLd, collectionJsonLd]} />
      <div className="container catalog-page raw-bird-nest-page">
        <section className="raw-hero">
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p>{intro}</p>
          {lowestPrice > 0 && (
            <div className="raw-price-band">
              <span>Giá tham khảo tại Yến Tinh Hoa</span>
              <strong>
                {lowestPrice.toLocaleString('vi-VN')} đ - {highestPrice.toLocaleString('vi-VN')} đ
              </strong>
            </div>
          )}
        </section>

        <section className="seo-content-block">
          <h2>{whyTitle}</h2>
          <div className="raw-article">
            {whyParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>

        <section className="seo-content-block">
          <h2>{sectionTitle}</h2>
          <div className="seo-info-grid">
            {featureCards.map((card) => (
              <article key={card.title}>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="seo-content-block raw-two-column">
          <div>
            <h2>{audienceTitle}</h2>
            <div className="raw-article">
              {audienceParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div className="raw-note-box">
            <h3>{noteTitle}</h3>
            <p>{noteText}</p>
          </div>
        </section>

        <section className="seo-content-block">
          <h2>{priceTitle}</h2>
          <div className="raw-price-table">
            {products.map((product) => (
              <Link key={product.id} href={`/products/${product.id}`}>
                <span>{product.name}</span>
                <strong>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="product-price-original" style={{ display: 'block', textAlign: 'right' }}>
                      {product.originalPrice.toLocaleString('vi-VN')} đ
                    </span>
                  )}
                  {product.price.toLocaleString('vi-VN')} đ
                </strong>
              </Link>
            ))}
          </div>
          <p className="raw-small-note">{priceNote}</p>
        </section>

        <section className="seo-content-block">
          <h2>{suggestionsTitle}</h2>
          <div className="seo-info-grid">
            {suggestions.map((item) => (
              <article key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="seo-content-block raw-two-column">
          <div>
            <h2>{usageTitle}</h2>
            <ol className="raw-steps">
              {usageSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </div>
          <div className="raw-note-box">
            <h3>{usageNoteTitle}</h3>
            <p>{usageNoteText}</p>
          </div>
        </section>

        <section className="seo-content-block">
          <h2>{faqTitle}</h2>
          <div className="raw-faq-list">
            {faqs.map((faq) => (
              <details key={faq.question}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section>
          <div className="section-heading-row">
            <div>
              <p className="eyebrow">Sản phẩm phù hợp</p>
              <h2 className="section-title">{pageName}</h2>
            </div>
            <Link href="/products" className="section-link">Xem tất cả sản phẩm</Link>
          </div>

          <div className="product-grid">
            {products.map((product: Product) => (
              <article key={product.id} className="glass-card product-card">
                <Link href={`/products/${product.id}`} className="product-card-media">
                  {product.badge && <span className="product-badge">{product.badge}</span>}
                  <SafeImage src={product.imageUrl} alt={product.name} className="product-card-image" />
                </Link>
                <div className="product-card-body">
                  <Link href={`/products/${product.id}`} className="product-card-title-link">
                    <h2>{product.name}</h2>
                  </Link>
                  <div className="product-card-info">
                    <p className="product-card-desc">{product.shortDescription || product.description}</p>
                    <div className="product-card-footer">
                    <div className="product-price-stack">
                    {product.originalPrice && product.originalPrice > product.price && (
                      <span>{product.originalPrice.toLocaleString('vi-VN')} đ</span>
                    )}
                    <strong>{product.price.toLocaleString('vi-VN')} đ</strong>
                    </div>
                      <AddToCartButton product={{ ...product, imageUrl: product.imageUrl || '' }} style={{ width: 'auto' }} />
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
