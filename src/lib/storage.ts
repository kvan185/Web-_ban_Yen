export type CartItem = {
  id: string;
  name: string;
  price: number;
  imageUrl?: string;
  quantity: number;
};

export type FavoriteProduct = {
  id: string;
  name: string;
  price: number;
  imageUrl?: string;
  description?: string;
  badge?: string;
  weight?: string;
  origin?: string;
  shelfLife?: string;
  usage?: string;
  category?: string;
};

export type OrderHistoryItem = {
  id: string;
  date?: string;
  total?: number;
  items?: CartItem[];
  customerName?: string;
  phone?: string;
  address?: string;
  paymentMethod?: 'bank' | 'cod';
  paymentStatus?: string;
  fulfillmentStatus?: string;
  transferContent?: string;
  status?: string;
};

export function parseStorageArray<T>(value: string | null): T[] {
  if (!value || value === 'undefined' || value === 'null') return [];

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}
