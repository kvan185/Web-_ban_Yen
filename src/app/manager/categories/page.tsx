import CategoriesAdminClient from './CategoriesAdminClient';
import { getCategories } from '@/lib/dataStore';

export default async function CategoriesAdminPage() {
  return <CategoriesAdminClient initialCategories={await getCategories()} />;
}
