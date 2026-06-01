import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProductDetailClient from './ProductDetailClient';
import {
  absoluteImageUrl,
  breadcrumbJsonLd,
  findProduct,
  JsonLd,
  pageMetadata,
  productJsonLd,
  readProducts,
  truncateDescription,
} from '@/lib/seo';

type ProductPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  return (await readProducts()).map((product) => ({ id: product.id }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await findProduct(id);

  if (!product) {
    return pageMetadata({
      title: 'Sản phẩm không tồn tại',
      description: 'Sản phẩm bạn đang tìm không còn tồn tại tại Yến Tinh Hoa.',
      pathname: `/products/${id}`,
    });
  }

  return pageMetadata({
    title: `${product.name} - Giá ${product.price.toLocaleString('vi-VN')}đ`,
    description: truncateDescription(
      `${product.description || product.name} Mua ${product.name} tại Yến Tinh Hoa, giao nhanh 2-4 giờ ở TP.HCM, nguồn gốc minh bạch.`
    ),
    pathname: `/products/${product.id}`,
    image: absoluteImageUrl(product.imageUrl),
    keywords: [
      product.name,
      product.category || 'yến sào',
      'mua yến sào TP.HCM',
      'tổ yến nguyên chất',
      'Yến Tinh Hoa',
    ],
  });
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await findProduct(id);
  const products = await readProducts();

  if (!product) notFound();

  return (
    <>
      <JsonLd
        data={[
          productJsonLd(product),
          breadcrumbJsonLd([
            { name: 'Trang chủ', url: '/' },
            { name: 'Sản phẩm', url: '/products' },
            { name: product.name, url: `/products/${product.id}` },
          ]),
        ]}
      />
      <ProductDetailClient id={id} initialProduct={product} initialProducts={products} />
    </>
  );
}
