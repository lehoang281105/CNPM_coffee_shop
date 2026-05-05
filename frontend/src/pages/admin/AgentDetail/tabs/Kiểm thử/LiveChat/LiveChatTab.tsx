import React, { useState, useEffect, useRef } from 'react';
import ConversationList from './components/ConversationList';
import ChatBox from './components/ChatBox';
import UserProfilePanel from './components/UserProfilePanel';
import * as inboxService from '../../../../../../services/admin/inboxService';
import type { InboxConversationItem, InboxMessageItem} from '../../../../../../types';
import './LiveChatTab.css';

interface Props {
  botId: string;
  brandId?: string;
}

const LiveChatTab: React.FC<Props> = ({ botId, brandId }) => {
  const [conversations, setConversations] = useState<InboxConversationItem[]>([]);
  const [activeConv, setActiveConv] = useState<InboxConversationItem | null>(null);
  const [messages, setMessages] = useState<InboxMessageItem[]>([]);
  const [showLeft, setShowLeft] = useState(true);
  const [showRight, setShowRight] = useState(true);

  // Use refs to avoid closure stale state in setInterval
  const activeConvRef = useRef<InboxConversationItem | null>(null);
  activeConvRef.current = activeConv;

  const fetchConversations = async () => {
    if (!brandId) return;
    try {
      const res = await inboxService.getConversations(brandId);
      if (res.data) {
        // Lọc danh sách hội thoại theo bot hiện hành
        const botConvs = res.data.filter(c => c.bot_id === botId);
        setConversations(botConvs);

        // Cập nhật lại trạng thái activeConv nếu data thay đổi (ví dụ có tin nhắn mới làm thay đổi is_read)
        const currentActive = activeConvRef.current;
        if (currentActive) {
          const updatedActive = botConvs.find(c => c.user_id === currentActive.user_id);
          if (updatedActive) {
            setActiveConv(updatedActive);
          }
        }
      }
    } catch (e) {
      console.error("Failed to fetch conversations", e);
    }
  };

  const fetchMessages = async () => {
    const currentActive = activeConvRef.current;
    if (!currentActive) return;
    try {
      const res = await inboxService.getMessages(currentActive.user_id, currentActive.bot_id);
      if (res.data) {
        setMessages(res.data);
      }
    } catch (e) {
      console.error("Failed to fetch messages", e);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchConversations();
    fetchMessages();

    // Setup polling every 2 seconds
    const intervalId = setInterval(() => {
      fetchConversations();
      fetchMessages();
    }, 2000);

    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [botId, brandId]);

  // Refetch messages immediately when selecting a new conversation
  useEffect(() => {
    setMessages([]); // clear current messages while loading
    fetchMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeConv?.user_id]);

  const handleTakeover = async () => {
    if (!activeConv) return;
    try {
      await inboxService.takeoverConversation({
        user_id: activeConv.user_id,
        bot_id: activeConv.bot_id
      });
      fetchConversations(); // refresh state
    } catch (e) {
      console.error("Takeover failed", e);
    }
  };

  const handleResolve = async () => {
    if (!activeConv) return;
    try {
      await inboxService.resolveConversation({
        user_id: activeConv.user_id,
        bot_id: activeConv.bot_id
      });
      fetchConversations(); // refresh state
    } catch (e) {
      console.error("Resolve failed", e);
    }
  };

  const handleSendMessage = async (content: string) => {
    if (!activeConv) return;
    try {
      // Optimistic update
      const tempMsg: InboxMessageItem = {
        id: 'temp-' + Date.now(),
        content,
        sender_type: 'human',
        created_at: new Date().toISOString(),
        is_read: true
      };
      setMessages(prev => [...prev, tempMsg]);

      await inboxService.replyToUser({
        user_id: activeConv.user_id,
        bot_id: activeConv.bot_id,
        content
      });

      // Fetch fresh messages
      fetchMessages();
    } catch (e) {
      console.error("Reply failed", e);
    }
  };

  return (
    <div className="live-chat-container">
      {showLeft && (
        <ConversationList
          conversations={conversations}
          activeConversation={activeConv}
          onSelect={setActiveConv}
          onCollapse={() => setShowLeft(false)}
        />
      )}
      <ChatBox
        conversation={activeConv}
        messages={messages}
        onTakeover={handleTakeover}
        onResolve={handleResolve}
        onSendMessage={handleSendMessage}
        showLeft={showLeft}
        showRight={showRight}
        onExpandLeft={() => setShowLeft(true)}
        onExpandRight={() => setShowRight(true)}
      />
      {showRight && (
        <UserProfilePanel
          conversation={activeConv}
          onCollapse={() => setShowRight(false)}
        />
      )}
    </div>
  );
};

export default LiveChatTab;
