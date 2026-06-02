export const CATEGORY_ORDER = [
  'Yến Thô',
  'Yến Tinh Chế',
  'Yến Chưng',
  'Combo quà tặng phổ thông',
  'Combo quà tặng dưỡng sức khoẻ',
  'Combo cho mẹ bầu / phụ nữ',
  'Combo cao cấp',
];

export function normalizeCategoryText(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .trim()
    .toLowerCase();
}

export function sortCategories<T extends { name: string }>(categories: T[]) {
  return [...categories].sort((a, b) => {
    const aIndex = CATEGORY_ORDER.findIndex(
      (item) => normalizeCategoryText(item) === normalizeCategoryText(a.name)
    );
    const bIndex = CATEGORY_ORDER.findIndex(
      (item) => normalizeCategoryText(item) === normalizeCategoryText(b.name)
    );

    if (aIndex === -1 && bIndex === -1) return a.name.localeCompare(b.name, 'vi');
    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;

    return aIndex - bIndex;
  });
}
