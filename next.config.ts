import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: '/danh-muc', destination: '/categories', permanent: true },
      { source: '/gio-hang', destination: '/cart', permanent: true },
      { source: '/gioi-thieu', destination: '/about', permanent: true },
      { source: '/lich-su', destination: '/order-history', permanent: true },
      { source: '/lien-he', destination: '/contact', permanent: true },
      { source: '/san-pham', destination: '/products', permanent: true },
      { source: '/san-pham/:id', destination: '/products/:id', permanent: true },
      { source: '/tim-kiem', destination: '/search', permanent: true },
      { source: '/yeu-thich', destination: '/favorites', permanent: true },
      { source: '/chung-nhan', destination: '/certifications', permanent: true },
      { source: '/yen-tho', destination: '/raw-bird-nest', permanent: true },
      { source: '/manager/orders', destination: '/manager/order-history', permanent: true },
    ];
  },
};

export default nextConfig;
