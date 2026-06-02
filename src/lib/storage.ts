export type CartItem = {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  imageUrl?: string;
  quantity: number;
};

export type FavoriteProduct = {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  imageUrl?: string;
  description?: string;
  shortDescription?: string;
  features?: string;
  productInfo?: string;
  targetUsers?: string;
  usageGuide?: string;
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
  orderOwner?: string;
  guestSession?: string;
  customerName?: string;
  email?: string;
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
