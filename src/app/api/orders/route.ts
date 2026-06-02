import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { isKvConfigured, kv } from '@/lib/kv';
import { sendNewOrderNotification } from '@/lib/order-notify';
import { createOrderId, formatOrderStatus } from '@/lib/orders';
import type { OrderHistoryItem } from '@/lib/storage';

async function readOrder(orderId: string): Promise<OrderHistoryItem | null> {
  const order = await kv!.hgetall<Record<string, unknown>>(`orders:item:${orderId}`);
  if (!order?.id) return null;

  return {
    id: String(order.id),
    date: String(order.date || ''),
    orderOwner: String(order.orderOwner || ''),
    guestSession: String(order.guestSession || ''),
    customerName: String(order.customerName || ''),
    email: String(order.email || ''),
    phone: String(order.phone || ''),
    address: String(order.address || ''),
    paymentMethod: (order.paymentMethod === 'bank' ? 'bank' : 'cod') as 'bank' | 'cod',
    paymentStatus: String(order.paymentStatus || ''),
    fulfillmentStatus: String(order.fulfillmentStatus || ''),
    transferContent: String(order.transferContent || ''),
    status: String(order.status || ''),
    total: Number(order.total || 0),
    items: order.items ? JSON.parse(String(order.items)) : [],
  };
}

async function readOrders() {
  const ids = await kv!.lrange<string>('orders:list', 0, -1);
  const orders = await Promise.all((ids || []).map((id) => readOrder(id)));
  return orders.filter(Boolean) as OrderHistoryItem[];
}

export async function GET() {
  try {
    if (!isKvConfigured()) {
      return NextResponse.json([]);
    }

    const cookieStore = await cookies();
    const isAdmin = cookieStore.has('admin_session');
    const userName = cookieStore.get('user_session')?.value || '';
    const guestSession = cookieStore.get('guest_order_session')?.value || '';
    const orders = await readOrders();

    if (isAdmin) {
      return NextResponse.json(orders);
    }

    if (!userName) {
      if (!guestSession) {
        return NextResponse.json([]);
      }

      return NextResponse.json(orders.filter((order) => order.guestSession === guestSession));
    }

    return NextResponse.json(orders.filter((order) => order.orderOwner === userName));
  } catch {
    return NextResponse.json({ error: 'Failed to read orders' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    if (!isKvConfigured()) {
      return NextResponse.json({ error: 'KV not configured' }, { status: 500 });
    }

    const redis = kv!;

    const cookieStore = await cookies();
    const userName = cookieStore.get('user_session')?.value || 'guest';
    const guestSession =
      cookieStore.get('guest_order_session')?.value ||
      `guest_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    const payload = (await request.json()) as OrderHistoryItem;
    const isBankTransfer = payload.paymentMethod === 'bank';
    const now = new Date();

    const nextOrder: OrderHistoryItem = {
      ...payload,
      id: payload.id || createOrderId(userName),
      date: payload.date || now.toLocaleString('vi-VN'),
      orderOwner: userName,
      guestSession: userName === 'guest' ? guestSession : '',
      email: payload.email || '',
      paymentMethod: isBankTransfer ? 'bank' : 'cod',
      paymentStatus: isBankTransfer
        ? payload.paymentStatus || 'Chờ xác nhận chuyển khoản'
        : payload.paymentStatus || 'Chưa thanh toán',
      fulfillmentStatus: payload.fulfillmentStatus || 'Mới đặt',
    };

    nextOrder.status = formatOrderStatus(nextOrder);

    const orderKey = `orders:item:${nextOrder.id}`;
    const existing = await redis.hget(orderKey, 'id');

    await redis.hset(orderKey, {
      id: nextOrder.id,
      date: nextOrder.date || '',
      orderOwner: nextOrder.orderOwner || '',
      guestSession: nextOrder.guestSession || '',
      customerName: nextOrder.customerName || '',
      email: nextOrder.email || '',
      phone: nextOrder.phone || '',
      address: nextOrder.address || '',
      paymentMethod: nextOrder.paymentMethod || 'cod',
      paymentStatus: nextOrder.paymentStatus || '',
      fulfillmentStatus: nextOrder.fulfillmentStatus || '',
      transferContent: nextOrder.transferContent || '',
      status: nextOrder.status || '',
      total: nextOrder.total || 0,
      items: JSON.stringify(nextOrder.items || []),
    });

    if (!existing) {
      await redis.lrem('orders:list', 0, nextOrder.id);
      await redis.lpush('orders:list', nextOrder.id);
      try {
        await sendNewOrderNotification(nextOrder);
      } catch {
      }
    }

    const response = NextResponse.json({ success: true, order: nextOrder });

    if (userName === 'guest') {
      response.cookies.set('guest_order_session', guestSession, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 30,
        path: '/',
      });
    }

    return response;
  } catch {
    return NextResponse.json({ error: 'Failed to save order' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    if (!isKvConfigured()) {
      return NextResponse.json({ error: 'KV not configured' }, { status: 500 });
    }

    const redis = kv!;

    const cookieStore = await cookies();
    if (!cookieStore.has('admin_session')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const orderPatch = (await request.json()) as Partial<OrderHistoryItem> & { id: string };
    const currentOrder = await readOrder(orderPatch.id);

    if (!currentOrder) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    const nextOrder: OrderHistoryItem = {
      ...currentOrder,
      ...orderPatch,
      status: formatOrderStatus({
        ...currentOrder,
        ...orderPatch,
      }),
    };

    await redis.hset(`orders:item:${nextOrder.id}`, {
      id: nextOrder.id,
      date: nextOrder.date || '',
      orderOwner: nextOrder.orderOwner || '',
      guestSession: nextOrder.guestSession || '',
      customerName: nextOrder.customerName || '',
      email: nextOrder.email || '',
      phone: nextOrder.phone || '',
      address: nextOrder.address || '',
      paymentMethod: nextOrder.paymentMethod || 'cod',
      paymentStatus: nextOrder.paymentStatus || '',
      fulfillmentStatus: nextOrder.fulfillmentStatus || '',
      transferContent: nextOrder.transferContent || '',
      status: nextOrder.status || '',
      total: nextOrder.total || 0,
      items: JSON.stringify(nextOrder.items || []),
    });

    return NextResponse.json({ success: true, order: nextOrder });
  } catch {
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
  }
}
