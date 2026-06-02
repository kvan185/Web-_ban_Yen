import { NextResponse } from 'next/server';
import { isKvConfigured, kv } from '@/lib/kv';

type ChatMessage = {
  id: string;
  sender: 'customer' | 'manager' | 'system';
  text: string;
  createdAt: string;
};

type ChatSession = {
  id: string;
  customerName?: string;
  customerPhone?: string;
  pagePath: string;
  createdAt: string;
  updatedAt: string;
  messages: ChatMessage[];
};

function createMessage(sender: ChatMessage['sender'], text: string): ChatMessage {
  return {
    id: `msg_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    sender,
    text,
    createdAt: new Date().toISOString(),
  };
}

async function readSession(sessionId: string): Promise<ChatSession | null> {
  const metadata = await kv.hgetall<Record<string, string>>(`chat:session:${sessionId}`);
  if (!metadata?.id) return null;

  const rawMessages = await kv.lrange<string>(`chat:session:${sessionId}:messages`, 0, -1);
  const messages = (rawMessages || []).map((entry) => {
    try {
      return JSON.parse(entry) as ChatMessage;
    } catch {
      return null;
    }
  }).filter(Boolean) as ChatMessage[];

  return {
    id: metadata.id,
    customerName: metadata.customerName || '',
    customerPhone: metadata.customerPhone || '',
    pagePath: metadata.pagePath || '/',
    createdAt: metadata.createdAt || metadata.updatedAt || new Date().toISOString(),
    updatedAt: metadata.updatedAt || metadata.createdAt || new Date().toISOString(),
    messages,
  };
}

export async function GET(request: Request) {
  try {
    if (!isKvConfigured()) {
      return NextResponse.json([]);
    }

    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('sessionId');

    if (sessionId) {
      return NextResponse.json(await readSession(sessionId) || null);
    }

    const ids = await kv.smembers<string[]>('chat:sessions');
    const sessions = await Promise.all((ids || []).map((id) => readSession(id)));

    return NextResponse.json(
      sessions
        .filter(Boolean)
        .sort((a, b) => new Date(b!.updatedAt).getTime() - new Date(a!.updatedAt).getTime())
    );
  } catch {
    return NextResponse.json({ error: 'Failed to read chat sessions' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    if (!isKvConfigured()) {
      return NextResponse.json({ error: 'KV not configured' }, { status: 500 });
    }

    const body = await request.json();
    const sessionId = String(body.sessionId || '').trim() || `chat_${Date.now()}`;
    const text = String(body.text || '').trim();
    const sender = body.sender === 'manager' ? 'manager' : 'customer';
    const pagePath = String(body.pagePath || '/');
    const customerName = String(body.customerName || '').trim();
    const customerPhone = String(body.customerPhone || '').trim();

    if (!text) {
      return NextResponse.json({ error: 'Missing message' }, { status: 400 });
    }

    const sessionKey = `chat:session:${sessionId}`;
    const messagesKey = `${sessionKey}:messages`;
    const existing = await kv.hgetall<Record<string, string>>(sessionKey);
    const now = new Date().toISOString();

    await kv.sadd('chat:sessions', sessionId);
    await kv.hset(sessionKey, {
      id: sessionId,
      customerName: customerName || existing?.customerName || '',
      customerPhone: customerPhone || existing?.customerPhone || '',
      pagePath: pagePath || existing?.pagePath || '/',
      createdAt: existing?.createdAt || now,
      updatedAt: now,
    });

    if (!existing?.id) {
      const systemText = customerName
        ? `${customerName} bắt đầu chat.`
        : `Khách hàng ở ${pagePath} bắt đầu chat.`;
      await kv.rpush(messagesKey, JSON.stringify(createMessage('system', systemText)));
    }

    await kv.rpush(messagesKey, JSON.stringify(createMessage(sender, text)));

    return NextResponse.json({ success: true, sessionId });
  } catch {
    return NextResponse.json({ error: 'Failed to save chat message' }, { status: 500 });
  }
}
