import ProductsAdminClient from './ProductsAdminClient';
import { getCategories, getProducts, getSettings } from '@/lib/dataStore';

export default async function ProductsAdminPage() {
  const [products, categories, settings] = await Promise.all([
    getProducts(),
    getCategories(),
    getSettings(),
  ]);

  return (
    <ProductsAdminClient
      initialProducts={products}
      initialCategories={categories}
      initialProductsPerPage={settings.adminProductsPerPage || 5}
    />
  );
}
