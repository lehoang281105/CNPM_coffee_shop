import React, { useState, useEffect, useRef } from 'react';
import type { InboxMessageItem, InboxConversationItem } from '../../../../../../../types/inbox';
import { feedbackService } from '../../../../../../../services/admin/feedbackService';
import NotificationModal from '../../../../../../../components/common/NotificationModal';

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
  const [hoveredMessageId, setHoveredMessageId] = useState<string | null>(null);

  // Local state for tracking feedback creation in UI
  const [localRatings, setLocalRatings] = useState<Record<string, { feedbackId: string, rating: string }>>({});
  const [activeDropdownId, setActiveDropdownId] = useState<string | null>(null);

  // Fetch existing feedbacks when conversation changes so we don't lose ratings on tab reload
  useEffect(() => {
    if (conversation) {
      feedbackService.getByBot(conversation.bot_id, { page_size: 1000 }).then(res => {
        const mapping: Record<string, { feedbackId: string, rating: string }> = {};
        res.data?.forEach(fb => {
          if (fb.message_id) {
            mapping[fb.message_id] = { feedbackId: fb.id, rating: fb.rating };
          }
        });
        setLocalRatings(prev => ({ ...mapping, ...prev }));
      }).catch(console.error);
    }
  }, [conversation?.user_id]);

  // Modals state
  const [showEditModal, setShowEditModal] = useState<InboxMessageItem | null>(null);
  const [correctedAnswer, setCorrectedAnswer] = useState('');
  const [editNote, setEditNote] = useState('');
  const [savingFAQ, setSavingFAQ] = useState(false);

  const [showReportModal, setShowReportModal] = useState<InboxMessageItem | null>(null);
  const [reportNote, setReportNote] = useState('');
  const [reporting, setReporting] = useState(false);
  const [notification, setNotification] = useState<{ title: string; message: string; type: 'success' | 'error' } | null>(null);

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

  const getOrCreateFeedback = async (msg: InboxMessageItem, initialRating: string) => {
    const existingFeedbackId = localRatings[msg.id]?.feedbackId || msg.feedback_id;
    if (existingFeedbackId) {
      return existingFeedbackId;
    }

    // Find original question (last user message before this bot message)
    const msgIndex = messages.findIndex(m => m.id === msg.id);
    let originalQuestion = "Không xác định";
    for (let i = msgIndex - 1; i >= 0; i--) {
      if (messages[i].sender_type === 'user') {
        originalQuestion = messages[i].content;
        break;
      }
    }

    try {
      const res = await feedbackService.create({
        bot_id: conversation.bot_id,
        message_id: msg.id,
        original_question: originalQuestion,
        original_answer: msg.content,
        rating: initialRating
      });
      const newFeedbackId = res.data.id;
      setLocalRatings(prev => ({ ...prev, [msg.id]: { feedbackId: newFeedbackId, rating: initialRating } }));
      return newFeedbackId;
    } catch (err) {
      console.error("Failed to create feedback", err);
      return null;
    }
  };

  const handleRate = async (msg: InboxMessageItem, rating: 'thumbs_up' | 'thumbs_down') => {
    const existingFeedbackId = localRatings[msg.id]?.feedbackId || msg.feedback_id;
    const currentRating = localRatings[msg.id]?.rating || msg.rating;

    // Toggle to 'pending' if clicking the same rating again
    const finalRating = (currentRating === rating) ? 'pending' : rating;

    if (!existingFeedbackId) {
      if (finalRating === 'pending') return; // nothing to unrate
      // Create new with rating
      await getOrCreateFeedback(msg, finalRating);
    } else {
      // Patch rating
      try {
        await feedbackService.rate(existingFeedbackId, { rating: finalRating });
        setLocalRatings(prev => ({ ...prev, [msg.id]: { feedbackId: existingFeedbackId, rating: finalRating } }));
      } catch (err) {
        console.error("Failed to rate feedback", err);
      }
    }

    if (finalRating === 'thumbs_down') {
      setActiveDropdownId(activeDropdownId === msg.id ? null : msg.id);
    } else {
      setActiveDropdownId(null);
    }
  };

  const handleSaveToFAQ = async () => {
    if (!showEditModal || !correctedAnswer.trim()) return;
    setSavingFAQ(true);
    const feedbackId = localRatings[showEditModal.id]?.feedbackId || showEditModal.feedback_id;
    try {
      if (feedbackId) {
        await feedbackService.saveToFAQ(feedbackId, {
          corrected_answer: correctedAnswer.trim(),
          note: editNote.trim() || undefined
        });
        setNotification({ title: 'Thành công', message: 'Đã lưu vào FAQ', type: 'success' });
        setShowEditModal(null);
      }
    } catch (err) {
      setNotification({ title: 'Thất bại', message: 'Không thể lưu vào FAQ', type: 'error' });
    } finally {
      setSavingFAQ(false);
      setActiveDropdownId(null);
    }
  };

  const handleReportDev = async () => {
    if (!showReportModal || !reportNote.trim()) return;
    setReporting(true);
    const feedbackId = localRatings[showReportModal.id]?.feedbackId || showReportModal.feedback_id;
    try {
      if (feedbackId) {
        await feedbackService.reportToDev(feedbackId, { note: reportNote.trim() });
        setNotification({ title: 'Thành công', message: 'Đã báo cáo Dev Team', type: 'success' });
        setShowReportModal(null);
      }
    } catch (err) {
      setNotification({ title: 'Thất bại', message: 'Không thể báo cáo', type: 'error' });
    } finally {
      setReporting(false);
      setActiveDropdownId(null);
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
              Giải quyết &amp; Trả cho Bot
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
      <div className="chat-box-messages" onClick={() => setActiveDropdownId(null)}>
        {messages.map((msg) => {
          let timeStr = msg.created_at;
          try {
            const date = new Date(timeStr);
            timeStr = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          } catch (e) { }

          let msgClass = 'bot';
          if (msg.sender_type === 'user') msgClass = 'user';
          if (msg.sender_type === 'human') msgClass = 'human';

          const currentRating = localRatings[msg.id]?.rating || msg.rating;

          return (
            <div
              key={msg.id}
              className={`chat-message ${msgClass}`}
              onMouseEnter={() => setHoveredMessageId(msg.id)}
              onMouseLeave={() => setHoveredMessageId(null)}
              style={{ position: 'relative' }}
            >
              <div>{msg.content}</div>
              <div className="chat-message-time" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
                <span>{timeStr}</span>
                {msgClass === 'bot' && (
                  <div style={{ position: 'relative' }}>
                    {/* Persistent small rating indicator (visible when NOT hovering) */}
                    {(currentRating && currentRating !== 'pending' && hoveredMessageId !== msg.id && activeDropdownId !== msg.id) && (
                      <div style={{
                        position: 'absolute',
                        bottom: '-16px',
                        right: '10px',
                        background: '#ffffff',
                        border: '1px solid #e2e8f0',
                        borderRadius: '12px',
                        padding: '2px 4px',
                        fontSize: '12px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                        zIndex: 5,
                        lineHeight: 1
                      }}>
                        {currentRating === 'thumbs_up' ? '👍' : '👎'}
                      </div>
                    )}

                    {/* Full Reaction Bar (visible on hover) */}
                    <div
                      className="chat-message-feedback"
                      style={{
                        position: 'absolute',
                        bottom: '-16px',
                        right: '10px',
                        display: (hoveredMessageId === msg.id || activeDropdownId === msg.id) ? 'flex' : 'none',
                        gap: '8px',
                        background: '#ffffff',
                        padding: '6px 10px',
                        borderRadius: '20px',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                        zIndex: 10,
                        alignItems: 'center',
                        border: '1px solid #e2e8f0'
                      }}
                    >
                      <button
                        title="Tốt"
                        onClick={(e) => { e.stopPropagation(); handleRate(msg, 'thumbs_up'); }}
                        style={{
                          background: 'none', border: 'none', cursor: 'pointer',
                          opacity: currentRating === 'thumbs_up' ? 1 : 0.5,
                          fontSize: '16px', padding: 0,
                          transform: currentRating === 'thumbs_up' ? 'scale(1.15)' : 'scale(1)',
                          transition: 'all 0.2s ease-in-out'
                        }}
                      >
                        👍
                      </button>
                      <button
                        title="Không tốt"
                        onClick={(e) => { e.stopPropagation(); handleRate(msg, 'thumbs_down'); }}
                        style={{
                          background: 'none', border: 'none', cursor: 'pointer',
                          opacity: currentRating === 'thumbs_down' ? 1 : 0.5,
                          fontSize: '16px', padding: 0,
                          transform: currentRating === 'thumbs_down' ? 'scale(1.15)' : 'scale(1)',
                          transition: 'all 0.2s ease-in-out'
                        }}
                      >
                        👎
                      </button>

                      {activeDropdownId === msg.id && (
                        <div className="feedback-dropdown" style={{
                          position: 'absolute', top: '100%', right: 0, marginTop: '8px', background: 'white',
                          boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
                          borderRadius: '8px', border: '1px solid #e2e8f0', zIndex: 20, minWidth: '160px',
                          overflow: 'hidden'
                        }}>
                          <button
                            style={{ display: 'block', width: '100%', padding: '10px 14px', textAlign: 'left', background: 'none', border: 'none', borderBottom: '1px solid #f1f5f9', cursor: 'pointer', fontSize: '13px', color: '#334155' }}
                            onClick={(e) => { e.stopPropagation(); setShowEditModal(msg); setCorrectedAnswer(msg.content); setEditNote(''); setActiveDropdownId(null); }}
                          >
                            Sửa câu trả lời
                          </button>
                          <button
                            style={{ display: 'block', width: '100%', padding: '10px 14px', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px', color: '#ef4444' }}
                            onClick={(e) => { e.stopPropagation(); setShowReportModal(msg); setReportNote(''); setActiveDropdownId(null); }}
                          >
                            Báo Dev
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
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

      {/* Edit Modal (Save to FAQ) */}
      {showEditModal && (
        <div className="modal-overlay" onClick={() => !savingFAQ && setShowEditModal(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 500 }}>
            <div className="modal-header">
              <h2 className="modal-title">Sửa câu trả lời và lưu FAQ</h2>
              <button className="modal-close" onClick={() => setShowEditModal(null)} disabled={savingFAQ}>✕</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label className="form-label">Câu trả lời đúng *</label>
                <textarea
                  className="form-input"
                  rows={5}
                  value={correctedAnswer}
                  onChange={(e) => setCorrectedAnswer(e.target.value)}
                  placeholder="Nhập câu trả lời đã chỉnh sửa..."
                  disabled={savingFAQ}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn--ghost" onClick={() => setShowEditModal(null)} disabled={savingFAQ}>Hủy</button>
              <button className="btn btn--primary" onClick={handleSaveToFAQ} disabled={!correctedAnswer.trim() || savingFAQ}>
                {savingFAQ ? 'Đang lưu...' : 'Lưu vào FAQ'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Report Dev Modal */}
      {showReportModal && (
        <div className="modal-overlay" onClick={() => !reporting && setShowReportModal(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 500 }}>
            <div className="modal-header">
              <h2 className="modal-title">Báo cáo Dev Team</h2>
              <button className="modal-close" onClick={() => setShowReportModal(null)} disabled={reporting}>✕</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label className="form-label">Lý do (Note) *</label>
                <textarea
                  className="form-input"
                  rows={4}
                  value={reportNote}
                  onChange={(e) => setReportNote(e.target.value)}
                  placeholder="Ví dụ: Bot trả lời sai vì thiếu dữ liệu X..."
                  disabled={reporting}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn--ghost" onClick={() => setShowReportModal(null)} disabled={reporting}>Hủy</button>
              <button className="btn btn--primary" onClick={handleReportDev} disabled={!reportNote.trim() || reporting}>
                {reporting ? 'Đang gửi...' : 'Gửi báo cáo'}
              </button>
            </div>
          </div>
        </div>
      )}

      {notification && (
        <NotificationModal
          title={notification.title}
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
};

export default ChatBox;
