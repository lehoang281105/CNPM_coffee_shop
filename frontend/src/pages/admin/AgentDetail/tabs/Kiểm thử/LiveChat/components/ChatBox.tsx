import React, { useState, useEffect, useRef } from 'react';
import type { InboxMessageItem, InboxConversationItem } from '../../../../../../../types/inbox';

interface Props {
  conversation: InboxConversationItem | null;
  messages: InboxMessageItem[];
  onTakeover: () => void;
  onResolve: () => void;
  onSendMessage: (content: string) => void;
  showLeft: boolean;
  showRight: boolean;
  onExpandLeft: () => void;
  onExpandRight: () => void;
}

const ChatBox: React.FC<Props> = ({ 
  conversation, messages, onTakeover, onResolve, onSendMessage,
  showLeft, showRight, onExpandLeft, onExpandRight 
}) => {
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length]);

  if (!conversation) {
    return (
      <div className="chat-box-panel" style={{ alignItems: 'center', justifyContent: 'center', color: '#94a3b8', position: 'relative' }}>
        {!showLeft && (
          <button className="btn-icon-collapse btn-expand-left" onClick={onExpandLeft} title="Mở rộng danh sách">
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>
        )}
        Chọn một cuộc trò chuyện để bắt đầu
        {!showRight && (
          <button className="btn-icon-collapse btn-expand-right" onClick={onExpandRight} title="Mở rộng thông tin">
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>
        )}
      </div>
    );
  }

  const isTakeover = conversation.is_human_takeover;

  const handleSend = () => {
    if (inputText.trim() && isTakeover) {
      onSendMessage(inputText.trim());
      setInputText('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="chat-box-panel">
      {/* Header */}
      <div className="chat-box-header panel-header-fixed">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {!showLeft && (
            <button className="btn-icon-collapse" onClick={onExpandLeft} title="Mở rộng danh sách">
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
          )}
          <div>
            <h3>{conversation.user_name || 'Khách chưa biết tên'}</h3>
            <div style={{ fontSize: 12, color: 'var(--color-text-sub)', marginTop: 4 }}>
              Trạng thái: {isTakeover ? <span style={{ color: '#d97706', fontWeight: 600 }}>Nhân viên đang chat</span> : <span style={{ color: '#16a34a', fontWeight: 600 }}>Bot đang trả lời tự động</span>}
            </div>
          </div>
        </div>
        <div className="chat-box-header-actions" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {isTakeover ? (
            <button className="btn-resolve" onClick={onResolve}>
              Giải quyết & Trả cho Bot
            </button>
          ) : (
            <button className="btn-takeover" onClick={onTakeover}>
              Can thiệp cuộc gọi
            </button>
          )}
          {!showRight && (
            <button className="btn-icon-collapse" onClick={onExpandRight} title="Mở rộng thông tin">
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
            </button>
          )}
        </div>
      </div>

      {/* Message List */}
      <div className="chat-box-messages">
        {messages.map((msg) => {
          let timeStr = msg.created_at;
          try {
            const date = new Date(timeStr);
            timeStr = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          } catch (e) { }

          let msgClass = 'bot';
          if (msg.sender_type === 'user') msgClass = 'user';
          if (msg.sender_type === 'human') msgClass = 'human';

          return (
            <div key={msg.id} className={`chat-message ${msgClass}`}>
              <div>{msg.content}</div>
              <div className="chat-message-time">{timeStr}</div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="chat-box-input-area">
        <input
          type="text"
          className="chat-box-input"
          placeholder={isTakeover ? "Nhập tin nhắn..." : "Chỉ có thể nhắn tin khi đã Can thiệp"}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={!isTakeover}
        />
        <button
          className="chat-box-send-btn"
          onClick={handleSend}
          disabled={!isTakeover || !inputText.trim()}
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
