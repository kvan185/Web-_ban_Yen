import fs from 'fs';
import path from 'path';
import ProductsAdminClient from './ProductsAdminClient';

const productsFilePath = path.join(process.cwd(), 'src', 'data', 'products.json');
const categoriesFilePath = path.join(process.cwd(), 'src', 'data', 'categories.json');
const settingsFilePath = path.join(process.cwd(), 'src', 'data', 'settings.json');

function readJsonFile<T>(filePath: string, fallback: T): T {
  try {
    if (!fs.existsSync(filePath)) {
      return fallback;
    }

    return JSON.parse(fs.readFileSync(filePath, 'utf8')) as T;
  } catch {
    return fallback;
  }
}

export default function ProductsAdminPage() {
  const settings = readJsonFile<{ adminProductsPerPage?: number }>(settingsFilePath, {});

  return (
    <ProductsAdminClient
      initialProducts={readJsonFile(productsFilePath, [])}
      initialCategories={readJsonFile(categoriesFilePath, [])}
      initialProductsPerPage={settings.adminProductsPerPage || 5}
    />
  );
}
