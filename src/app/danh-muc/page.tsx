import fs from 'fs';
import path from 'path';
import CategoryClient from './CategoryClient';

export const metadata = {
  title: 'Danh Mục Sản Phẩm - Yến Tinh Hoa',
  description: 'Khám phá các danh mục yến sào chất lượng cao tại Yến Tinh Hoa.',
};

export default function CategoryPage() {
  const productsFilePath = path.join(process.cwd(), 'src', 'data', 'products.json');
  let products = [];
  try {
    if (fs.existsSync(productsFilePath)) {
      products = JSON.parse(fs.readFileSync(productsFilePath, 'utf8'));
    }
  } catch (e) {
    console.error(e);
  }

  const categoriesFilePath = path.join(process.cwd(), 'src', 'data', 'categories.json');
  let categories = [];
  try {
    if (fs.existsSync(categoriesFilePath)) {
      categories = JSON.parse(fs.readFileSync(categoriesFilePath, 'utf8'));
    }
  } catch (e) {
    console.error(e);
  }

  return (
    <CategoryClient 
      products={products} 
      categories={categories} 
    />
  );
}
