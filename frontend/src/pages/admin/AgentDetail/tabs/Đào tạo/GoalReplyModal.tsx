import React, { useState } from 'react';
import type { ReplySample } from './goalHelpers';

interface GoalReplyModalProps {
  loading?: boolean;
  onClose: () => void;
  onSubmit: (sample: ReplySample) => Promise<void>;
}

const GoalReplyModal: React.FC<GoalReplyModalProps> = ({
  loading = false,
  onClose,
  onSubmit,
}) => {
  const [userText, setUserText] = useState('');
  const [assistantText, setAssistantText] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = userText.trim();
    const assistant = assistantText.trim();

    if (!user) {
      setError('Vui lòng nhập câu khách thường nói.');
      return;
    }
    if (!assistant) {
      setError('Vui lòng nhập câu AI trả lời.');
      return;
    }

    setError('');
    await onSubmit({ user, assistant });
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal goal-reply-modal" role="dialog" aria-modal="true" aria-labelledby="goal-reply-title">
        <div className="modal-header">
          <h2 className="modal-title" id="goal-reply-title">
            Thêm mẫu câu trả lời
          </h2>
          <button className="modal-close" onClick={onClose} aria-label="Đóng" disabled={loading}>
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body goal-reply-body">
            {error && <div className="error-banner">⚠️ {error}</div>}

            <div className="form-group">
              <input
                className="form-input"
                value={userText}
                onChange={(e) => setUserText(e.target.value)}
                placeholder="Câu khách thường nói..."
                autoFocus
              />
            </div>

            <div className="form-group">
              <textarea
                className="form-textarea goal-reply-textarea"
                value={assistantText}
                onChange={(e) => setAssistantText(e.target.value)}
                placeholder="Câu AI trả lời..."
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn--ghost" onClick={onClose} disabled={loading}>
              Hủy
            </button>
            <button type="submit" className="btn btn--primary" disabled={loading}>
              <i className="ti-save"></i> Lưu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GoalReplyModal;

