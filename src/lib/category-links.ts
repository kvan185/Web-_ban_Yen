import { normalizeCategoryText } from '@/lib/category-order';

const CATEGORY_HREFS: Record<string, string> = {
  [normalizeCategoryText('Yến Thô')]: '/raw-bird-nest',
  [normalizeCategoryText('Yến Tinh Chế')]: '/refined-bird-nest',
  [normalizeCategoryText('Yến Chưng')]: '/stewed-bird-nest',
  [normalizeCategoryText('Combo quà tặng phổ thông')]: '/popular-gift-combo',
  [normalizeCategoryText('Combo quà tặng dưỡng sức khoẻ')]: '/wellness-gift-combo',
  [normalizeCategoryText('Combo cho mẹ bầu / phụ nữ')]: '/women-nutrition-combo',
  [normalizeCategoryText('Combo cao cấp')]: '/premium-gift-combo',
};

export function getCategoryHref(categoryName: string) {
  return CATEGORY_HREFS[normalizeCategoryText(categoryName)] || '/categories';
}
