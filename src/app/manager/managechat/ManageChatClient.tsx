'use client';

import { useEffect, useMemo, useState } from 'react';

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
  updatedAt: string;
  messages: ChatMessage[];
};

function sessionTitle(session: ChatSession) {
  return session.customerName?.trim()
    ? `Khách ${session.customerName} đang chat ở ${session.pagePath || '/'}`
    : `Khách hàng đang chat ở ${session.pagePath || '/'}`;
}

function formatDate(value: string) {
  try {
    return new Intl.DateTimeFormat('vi-VN', {
      dateStyle: 'short',
      timeStyle: 'short',
      timeZone: 'Asia/Ho_Chi_Minh',
    }).format(new Date(value));
  } catch {
    return value;
  }
}

export default function ManageChatClient() {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [activeId, setActiveId] = useState('');
  const [reply, setReply] = useState('');

  const activeSession = useMemo(
    () => sessions.find((session) => session.id === activeId) || sessions[0],
    [activeId, sessions]
  );

  const loadSessions = async () => {
    try {
      const response = await fetch('/api/manage-chat');
      const data = await response.json();
      const nextSessions = Array.isArray(data) ? data : [];
      setSessions(nextSessions);
      setActiveId((current) => current || nextSessions[0]?.id || '');
    } catch {
      setSessions([]);
    }
  };

  useEffect(() => {
    loadSessions();
    const timer = window.setInterval(loadSessions, 4000);
    return () => window.clearInterval(timer);
  }, []);

  const sendReply = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const text = reply.trim();
    if (!text || !activeSession) return;

    await fetch('/api/manage-chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId: activeSession.id,
        sender: 'manager',
        text,
        pagePath: activeSession.pagePath,
        customerName: activeSession.customerName || '',
        customerPhone: activeSession.customerPhone || '',
      }),
    });

    setReply('');
    await loadSessions();
  };

  return (
    <div>
      <h1>Quản lý chat</h1>
      <p className="manager-muted" style={{ marginBottom: '24px' }}>
        Xem từng cuộc trò chuyện và trả lời khách ngay trong website.
      </p>

      {sessions.length === 0 ? (
        <div className="glass-card" style={{ padding: '24px' }}>
          <p>Chưa có cuộc chat nào.</p>
        </div>
      ) : (
        <div className="manager-chat-layout">
          <aside className="glass-card manager-chat-list">
            {sessions.map((session) => {
              const lastMessage = session.messages[session.messages.length - 1];
              const isActive = activeSession?.id === session.id;

              return (
                <button
                  type="button"
                  key={session.id}
                  onClick={() => setActiveId(session.id)}
                  className={`manager-chat-session ${isActive ? 'is-active' : ''}`}
                >
                  <strong>{sessionTitle(session)}</strong>
                  <span>{lastMessage?.text || 'Chưa có tin nhắn'}</span>
                  <small>{formatDate(session.updatedAt)}</small>
                </button>
              );
            })}
          </aside>

          {activeSession && (
            <section className="glass-card manager-chat-detail">
              <div className="manager-chat-detail-header">
                <div>
                  <h2>{sessionTitle(activeSession)}</h2>
                  <p>
                    {activeSession.customerPhone ? `SĐT: ${activeSession.customerPhone}` : 'Chưa có số điện thoại'} · Trang: {activeSession.pagePath}
                  </p>
                </div>
                {activeSession.customerPhone && (
                  <a href={`https://zalo.me/${activeSession.customerPhone}`} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding: '10px 14px' }}>
                    Zalo
                  </a>
                )}
              </div>

              <div className="manager-chat-messages">
                {activeSession.messages.map((message) => (
                  <div key={message.id} className={`manager-chat-message is-${message.sender}`}>
                    <p>{message.text}</p>
                    <time>{formatDate(message.createdAt)}</time>
                  </div>
                ))}
              </div>

              <form onSubmit={sendReply} className="manager-chat-reply">
                <input
                  value={reply}
                  onChange={(event) => setReply(event.target.value)}
                  placeholder="Nhập trả lời cho khách..."
                />
                <button type="submit" className="btn-primary">Gửi</button>
              </form>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
