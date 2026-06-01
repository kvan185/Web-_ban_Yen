import CategoryClient from './CategoryClient';
import { getCategories, getProducts } from '@/lib/dataStore';

export const metadata = {
  title: 'Danh Má»¥c Sáº£n Pháº©m - Yáº¿n Tinh Hoa',
  description: 'KhÃ¡m phÃ¡ cÃ¡c danh má»¥c yáº¿n sÃ o cháº¥t lÆ°á»£ng cao táº¡i Yáº¿n Tinh Hoa.',
};

export default async function CategoryPage() {
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);

  return (
    <CategoryClient
      products={products}
      categories={categories}
    />
  );
}
