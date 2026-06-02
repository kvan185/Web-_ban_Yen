import fs from 'fs';
import path from 'path';
import { sortCategories } from '@/lib/category-order';

export type SiteCategory = {
  id: string;
  name: string;
  description?: string;
};

export function readCategories(): SiteCategory[] {
  try {
    const filePath = path.join(process.cwd(), 'src', 'data', 'categories.json');
    const categories = JSON.parse(fs.readFileSync(filePath, 'utf8')) as SiteCategory[];
    return sortCategories(categories);
  } catch {
    return [];
  }
}
