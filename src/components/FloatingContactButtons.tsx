'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

type ChatMessage = {
  id?: string;
  sender: 'customer' | 'manager' | 'system';
  text: string;
  createdAt?: string;
};

type ChatSession = {
  id: string;
  messages: ChatMessage[];
};

type ContactProfile = {
  name?: string;
  phone?: string;
};

const zaloUrl = 'https://zalo.me/0375266538';
const messengerUrl = 'https://m.me/nkhanhvan185';

function getSessionId() {
  const key = 'yenth_chat_session_id';
  const existing = localStorage.getItem(key);
  if (existing) return existing;

  const sessionId = `chat_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  localStorage.setItem(key, sessionId);
  return sessionId;
}

function getContactProfile(): ContactProfile {
  try {
    const leadProfile = JSON.parse(localStorage.getItem('yenth_contact_profile') || '{}');
    const checkoutProfile = JSON.parse(localStorage.getItem('customerProfile') || '{}');

    return {
      name: leadProfile.name || checkoutProfile.fullName || '',
      phone: leadProfile.phone || checkoutProfile.phone || '',
    };
  } catch {
    return {};
  }
}

export default function FloatingContactButtons() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [sessionId, setSessionId] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'system',
      text: 'Xin chào, bạn có thể nhắn tại đây. Quản lý Yến Tinh Hoa sẽ trả lời trong hộp chat này.',
    },
  ]);

  useEffect(() => {
    setSessionId(getSessionId());
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open || !sessionId) return;

    const loadMessages = async () => {
      try {
        const response = await fetch(`/api/manage-chat?sessionId=${encodeURIComponent(sessionId)}`);
        const session = (await response.json()) as ChatSession | null;
        if (session?.messages?.length) {
          setMessages(session.messages);
        }
      } catch {
      }
    };

    loadMessages();
    const timer = window.setInterval(loadMessages, 4000);
    return () => window.clearInterval(timer);
  }, [open, sessionId]);

  useEffect(() => {
    if (!open) return;

    const closeChat = () => setOpen(false);

    const handleScrollClose = () => closeChat();
    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;

      if (!target.closest('.floating-chatbox') && !target.closest('.floating-btn')) {
        closeChat();
      }
    };

    window.addEventListener('scroll', handleScrollClose, { passive: true });
    document.addEventListener('pointerdown', handlePointerDown);

    return () => {
      window.removeEventListener('scroll', handleScrollClose);
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [open]);

  const sendMessage = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const text = input.trim();
    if (!text || !sessionId) return;

    const optimisticMessage: ChatMessage = {
      sender: 'customer',
      text,
      createdAt: new Date().toISOString(),
    };

    setMessages((current) => [...current, optimisticMessage]);
    setInput('');

    const profile = getContactProfile();

    try {
      const response = await fetch('/api/manage-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          sender: 'customer',
          text,
          pagePath: window.location.pathname,
          customerName: profile.name || '',
          customerPhone: profile.phone || '',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send chat message');
      }
    } catch {
      setMessages((current) => current.filter((message) => message !== optimisticMessage));
      alert('Không gửi được tin nhắn. Vui lòng thử lại.');
    }
  };

  return (
    <div className="floating-contacts">
      {open && (
        <div className="floating-chatbox">
          <div className="floating-chat-panel">
            <div className="floating-chat-header">
              <div>
                <strong>Chat với Yến Tinh Hoa</strong>
                <span>Nhắn tin tại đây hoặc chọn liên hệ trực tiếp</span>
              </div>
              <button type="button" onClick={() => setOpen(false)} aria-label="Đóng chat">
                ×
              </button>
            </div>

            <div className="floating-chat-grid">
              <section className="floating-ai-chat">
                <div className="floating-chat-messages">
                  {messages.map((message, index) => (
                    <p key={message.id || `${message.sender}-${index}`} className={`floating-message is-${message.sender}`}>
                      {message.text}
                    </p>
                  ))}
                </div>
                <form onSubmit={sendMessage} className="floating-chat-form">
                  <input
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    placeholder="Nhập tin nhắn..."
                  />
                  <button type="submit">Gửi</button>
                </form>
              </section>

              <section className="floating-direct-contact">
                <strong>Liên hệ trực tiếp</strong>
                <p>Chọn kênh bạn muốn dùng để gặp quản lý ngay.</p>
                <a href={zaloUrl} target="_blank" rel="noopener noreferrer" className="floating-direct-link zalo">
                  Zalo
                </a>
                <a href={messengerUrl} target="_blank" rel="noopener noreferrer" className="floating-direct-link messenger">
                  Messenger
                </a>
              </section>
            </div>
          </div>
        </div>
      )}
      <button type="button" className="floating-btn btn-messenger" title="Mở hộp chat" onClick={() => setOpen((current) => !current)}>
        Chat
      </button>
    </div>
  );
}
