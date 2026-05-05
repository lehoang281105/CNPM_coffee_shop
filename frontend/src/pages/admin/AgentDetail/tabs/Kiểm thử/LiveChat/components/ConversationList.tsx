import React, { useEffect, useState, useRef } from 'react';
import type { InboxConversationItem } from '../../../../../../../types/inbox';

interface Props {
  conversations: InboxConversationItem[];
  activeConversation: InboxConversationItem | null;
  onSelect: (conv: InboxConversationItem) => void;
  onCollapse: () => void;
}

const ConversationList: React.FC<Props> = ({ conversations, activeConversation, onSelect, onCollapse }) => {
  return (
    <div className="conversation-list-panel">
      <div className="conversation-list-header panel-header-fixed">
        <h3>Khách hàng</h3>
        <button className="btn-icon-collapse" onClick={onCollapse} title="Thu gọn">
          <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
        </button>
      </div>
      <div className="conversation-list-content">
        {conversations.length === 0 ? (
          <div style={{ padding: 20, textAlign: 'center', color: '#94a3b8', fontSize: 14 }}>
            Chưa có cuộc trò chuyện nào
          </div>
        ) : (
          conversations.map((conv) => {
            const isActive = activeConversation?.user_id === conv.user_id;
            const name = conv.user_name || 'Khách chưa biết tên';
            const initial = name.charAt(0).toUpperCase();

            // Format date if possible
            let timeStr = conv.last_message_time;
            if (timeStr) {
              try {
                const date = new Date(timeStr);
                timeStr = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
              } catch (e) {
                // Ignore parsing errors
              }
            }

            return (
              <div
                key={conv.user_id}
                className={`conversation-item ${isActive ? 'active' : ''}`}
                onClick={() => onSelect(conv)}
              >
                <div className="conversation-item-avatar">{initial}</div>
                <div className="conversation-item-info">
                  <div className="conversation-item-name">
                    <span>{name}</span>
                    {timeStr && <span className="conversation-item-time">{timeStr}</span>}
                  </div>
                  <div className={`conversation-item-msg ${!conv.is_read ? 'unread' : ''}`}>
                    {conv.last_message_content || 'Bắt đầu cuộc trò chuyện'}
                  </div>
                  <div className="conversation-item-badges">
                    {conv.is_human_takeover && (
                      <span className="badge-takeover">Đang can thiệp</span>
                    )}
                    {!conv.is_read && (
                      <span className="badge-takeover" style={{ background: '#dbeafe', color: '#1d4ed8' }}>Tin nhắn mới</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ConversationList;
