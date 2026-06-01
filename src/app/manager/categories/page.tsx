import fs from 'fs';
import path from 'path';
import CategoriesAdminClient from './CategoriesAdminClient';

const categoriesFilePath = path.join(process.cwd(), 'src', 'data', 'categories.json');

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

export default function CategoriesAdminPage() {
  return <CategoriesAdminClient initialCategories={readJsonFile(categoriesFilePath, [])} />;
}
