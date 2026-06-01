import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

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

const chatSessionsFilePath = path.join(process.cwd(), 'src', 'data', 'chat-sessions.json');

function ensureChatSessionsFile() {
  if (!fs.existsSync(chatSessionsFilePath)) {
    fs.writeFileSync(chatSessionsFilePath, '[]', 'utf8');
  }
}

function readChatSessions(): ChatSession[] {
  ensureChatSessionsFile();
  const data = fs.readFileSync(chatSessionsFilePath, 'utf8');
  const parsed = JSON.parse(data);
  return Array.isArray(parsed) ? parsed : [];
}

function writeChatSessions(sessions: ChatSession[]) {
  ensureChatSessionsFile();
  fs.writeFileSync(chatSessionsFilePath, JSON.stringify(sessions, null, 2), 'utf8');
}

function createMessage(sender: ChatMessage['sender'], text: string): ChatMessage {
  return {
    id: `msg_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    sender,
    text,
    createdAt: new Date().toISOString(),
  };
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('sessionId');
    const sessions = readChatSessions().sort(
      (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );

    if (sessionId) {
      return NextResponse.json(sessions.find((session) => session.id === sessionId) || null);
    }

    return NextResponse.json(sessions);
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

    const sessions = readChatSessions();
    const sessionIndex = sessions.findIndex((session) => session.id === sessionId);
    const now = new Date().toISOString();

    if (sessionIndex >= 0) {
      const session = sessions[sessionIndex];
      sessions[sessionIndex] = {
        ...session,
        customerName: customerName || session.customerName,
        customerPhone: customerPhone || session.customerPhone,
        pagePath: pagePath || session.pagePath,
        updatedAt: now,
        messages: [...session.messages, createMessage(sender, text)],
      };
    } else {
      sessions.unshift({
        id: sessionId,
        customerName,
        customerPhone,
        pagePath,
        createdAt: now,
        updatedAt: now,
        messages: [
          createMessage('system', customerName ? `${customerName} bắt đầu chat.` : `Khách hàng ở ${pagePath} bắt đầu chat.`),
          createMessage(sender, text),
        ],
      });
    }

    writeChatSessions(sessions);
    return NextResponse.json({ success: true, sessionId });
  } catch {
    return NextResponse.json({ error: 'Failed to save chat message' }, { status: 500 });
  }
}
