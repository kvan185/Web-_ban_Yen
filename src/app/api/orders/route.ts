import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { OrderHistoryItem } from '@/lib/storage';

const ordersFilePath = path.join(process.cwd(), 'src', 'data', 'orders.json');

function ensureOrdersFile() {
  if (!fs.existsSync(ordersFilePath)) {
    fs.writeFileSync(ordersFilePath, '[]', 'utf8');
  }
}

function readOrders(): OrderHistoryItem[] {
  ensureOrdersFile();
  const data = fs.readFileSync(ordersFilePath, 'utf8');
  const parsed = JSON.parse(data);
  return Array.isArray(parsed) ? parsed : [];
}

function writeOrders(orders: OrderHistoryItem[]) {
  ensureOrdersFile();
  fs.writeFileSync(ordersFilePath, JSON.stringify(orders, null, 2), 'utf8');
}

export async function GET() {
  try {
    return NextResponse.json(readOrders());
  } catch {
    return NextResponse.json({ error: 'Failed to read orders' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const order = (await request.json()) as OrderHistoryItem;
    const orders = readOrders();
    const nextOrders = [order, ...orders.filter((item) => item.id !== order.id)];
    writeOrders(nextOrders);
    return NextResponse.json({ success: true, order });
  } catch {
    return NextResponse.json({ error: 'Failed to save order' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const orderPatch = (await request.json()) as Partial<OrderHistoryItem> & { id: string };
    const orders = readOrders();
    const nextOrders = orders.map((order) =>
      order.id === orderPatch.id ? { ...order, ...orderPatch } : order
    );
    writeOrders(nextOrders);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
  }
}
