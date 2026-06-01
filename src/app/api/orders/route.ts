import { NextResponse } from 'next/server';
import { getOrders, saveOrder, updateOrder } from '@/lib/dataStore';
import { OrderHistoryItem } from '@/lib/storage';

export async function GET() {
  try {
    return NextResponse.json(await getOrders());
  } catch {
    return NextResponse.json({ error: 'Failed to read orders' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const order = (await request.json()) as OrderHistoryItem & { id: string };
    await saveOrder(order);
    return NextResponse.json({ success: true, order });
  } catch {
    return NextResponse.json({ error: 'Failed to save order' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const orderPatch = (await request.json()) as Partial<OrderHistoryItem> & { id: string };
    await updateOrder(orderPatch);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
  }
}
