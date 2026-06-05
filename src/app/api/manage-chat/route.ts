import fs from 'fs';
import path from 'path';
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

function getChatSessionsFilePath() {
  return path.join(process.cwd(), 'src', 'data', 'chat-sessions.json');
}

function readSessionsFromFile(): ChatSession[] {
  try {
    const filePath = getChatSessionsFilePath();
    if (!fs.existsSync(filePath)) return [];

    const raw = fs.readFileSync(filePath, 'utf8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeSessionsToFile(sessions: ChatSession[]) {
  const filePath = getChatSessionsFilePath();
  fs.writeFileSync(filePath, JSON.stringify(sessions, null, 2), 'utf8');
}

async function readSessionFromKv(sessionId: string): Promise<ChatSession | null> {
  const metadata = await kv!.hgetall<Record<string, string>>(`chat:session:${sessionId}`);
  if (!metadata?.id) return null;

  const rawMessages = await kv!.lrange<string>(`chat:session:${sessionId}:messages`, 0, -1);
  const messages = (rawMessages || [])
    .map((entry) => {
      try {
        return JSON.parse(entry) as ChatMessage;
      } catch {
        return null;
      }
    })
    .filter(Boolean) as ChatMessage[];

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

async function readAllSessions() {
  if (isKvConfigured()) {
    try {
      const ids = await kv!.smembers<string[]>('chat:sessions');
      const sessions = await Promise.all((ids || []).map((id) => readSessionFromKv(id)));

      return sessions
        .filter(Boolean)
        .sort((a, b) => new Date(b!.updatedAt).getTime() - new Date(a!.updatedAt).getTime()) as ChatSession[];
    } catch {
      return readSessionsFromFile();
    }
  }

  return readSessionsFromFile();
}

async function readOneSession(sessionId: string) {
  if (isKvConfigured()) {
    try {
      return (await readSessionFromKv(sessionId)) || null;
    } catch {
      return readSessionsFromFile().find((session) => session.id === sessionId) || null;
    }
  }

  return readSessionsFromFile().find((session) => session.id === sessionId) || null;
}

async function persistMessage(params: {
  sessionId: string;
  text: string;
  sender: 'customer' | 'manager';
  pagePath: string;
  customerName: string;
  customerPhone: string;
}) {
  const { sessionId, text, sender, pagePath, customerName, customerPhone } = params;
  const now = new Date().toISOString();

  if (isKvConfigured()) {
    try {
      const sessionKey = `chat:session:${sessionId}`;
      const messagesKey = `${sessionKey}:messages`;
      const existing = await kv!.hgetall<Record<string, string>>(sessionKey);

      await kv!.sadd('chat:sessions', sessionId);
      await kv!.hset(sessionKey, {
        id: sessionId,
        customerName: customerName || existing?.customerName || '',
        customerPhone: customerPhone || existing?.customerPhone || '',
        pagePath: pagePath || existing?.pagePath || '/',
        createdAt: existing?.createdAt || now,
        updatedAt: now,
      });

      if (!existing?.id) {
        const systemText = customerName
          ? `Khách ${customerName} đang chat ở ${pagePath}.`
          : `Khách hàng đang chat ở ${pagePath}.`;
        await kv!.rpush(messagesKey, JSON.stringify(createMessage('system', systemText)));
      }

      await kv!.rpush(messagesKey, JSON.stringify(createMessage(sender, text)));
      return;
    } catch {
      // Fallback to file storage below
    }
  }

  const sessions = readSessionsFromFile();
  const existingIndex = sessions.findIndex((session) => session.id === sessionId);

  if (existingIndex === -1) {
    const systemText = customerName
      ? `Khách ${customerName} đang chat ở ${pagePath}.`
      : `Khách hàng đang chat ở ${pagePath}.`;

    sessions.unshift({
      id: sessionId,
      customerName,
      customerPhone,
      pagePath: pagePath || '/',
      createdAt: now,
      updatedAt: now,
      messages: [createMessage('system', systemText), createMessage(sender, text)],
    });
  } else {
    const existing = sessions[existingIndex];
    sessions[existingIndex] = {
      ...existing,
      customerName: customerName || existing.customerName || '',
      customerPhone: customerPhone || existing.customerPhone || '',
      pagePath: pagePath || existing.pagePath || '/',
      updatedAt: now,
      messages: [...existing.messages, createMessage(sender, text)],
    };
  }

  writeSessionsToFile(
    sessions.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
  );
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('sessionId');

    if (sessionId) {
      return NextResponse.json((await readOneSession(sessionId)) || null);
    }

    return NextResponse.json(await readAllSessions());
  } catch {
    return NextResponse.json({ error: 'Failed to read chat sessions' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
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

    await persistMessage({
      sessionId,
      text,
      sender,
      pagePath,
      customerName,
      customerPhone,
    });

    return NextResponse.json({ success: true, sessionId });
  } catch {
    return NextResponse.json({ error: 'Failed to save chat message' }, { status: 500 });
  }
}
