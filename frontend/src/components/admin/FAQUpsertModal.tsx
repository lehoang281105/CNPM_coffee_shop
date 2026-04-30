import React, { useState, useEffect } from 'react';
import type { FAQ, FAQCreatePayload, FAQUpdatePayload, Bot } from '../../types';

interface FAQUpsertModalProps {
  faq?: FAQ | null;
  bots: Bot[];
  onClose: () => void;
  onSubmit: (payload: FAQCreatePayload | FAQUpdatePayload) => Promise<void>;
}

const FAQUpsertModal: React.FC<FAQUpsertModalProps> = ({ faq, bots, onClose, onSubmit }) => {
  const isEdit = !!faq;
  const [question, setQuestion] = useState(faq?.question ?? '');
  const [answer, setAnswer] = useState(faq?.answer ?? '');
  const [botId, setBotId] = useState(faq?.bot_id ?? (bots[0]?.id ?? ''));
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (faq) {
      setQuestion(faq.question);
      setAnswer(faq.answer);
      setBotId(faq.bot_id);
    }
  }, [faq]);

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!question.trim()) errs.question = 'Câu hỏi không được để trống';
    if (!answer.trim()) errs.answer = 'Câu trả lời không được để trống';
    if (!botId) errs.bot_id = 'Vui lòng chọn Bot';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setSaving(true);
    try {
      if (isEdit) {
        await onSubmit({ question, answer, bot_id: botId } as FAQUpdatePayload);
      } else {
        await onSubmit({ question, answer, bot_id: botId } as FAQCreatePayload);
      }
      onClose();
    } catch {
      // error handled by parent
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal faq-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <h2 className="modal-title">
            <i className={isEdit ? 'ti-pencil' : 'ti-plus'} style={{ marginRight: 8 }} />
            {isEdit ? 'Chỉnh sửa FAQ' : 'Thêm FAQ mới'}
          </h2>
          <button className="modal-close" onClick={onClose} title="Đóng">✕</button>
        </div>

        {/* Body */}
        <div className="modal-body">
          {/* Bot select */}
          <div className="form-group">
            <label className="form-label">
              Bot <span className="req">*</span>
            </label>
            <select
              id="faq-bot-select"
              className={`form-select ${errors.bot_id ? 'form-input--error' : ''}`}
              value={botId}
              onChange={(e) => setBotId(e.target.value)}
            >
              <option value="">— Chọn Bot —</option>
              {bots.map((b) => (
                <option key={b.id} value={b.id}>{b.name}</option>
              ))}
            </select>
            {errors.bot_id && <span className="form-error">{errors.bot_id}</span>}
          </div>

          {/* Question */}
          <div className="form-group">
            <label className="form-label">
              Câu hỏi <span className="req">*</span>
            </label>
            <textarea
              id="faq-question-input"
              className={`form-textarea ${errors.question ? 'form-input--error' : ''}`}
              placeholder="Nhập câu hỏi thường gặp..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              rows={3}
            />
            {errors.question && <span className="form-error">{errors.question}</span>}
          </div>

          {/* Answer */}
          <div className="form-group">
            <label className="form-label">
              Câu trả lời <span className="req">*</span>
            </label>
            <textarea
              id="faq-answer-input"
              className={`form-textarea ${errors.answer ? 'form-input--error' : ''}`}
              placeholder="Nhập câu trả lời..."
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              rows={5}
            />
            {errors.answer && <span className="form-error">{errors.answer}</span>}
          </div>
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button className="btn btn--ghost" onClick={onClose} disabled={saving}>
            Hủy
          </button>
          <button
            id="faq-submit-btn"
            className="btn btn--primary"
            onClick={handleSubmit}
            disabled={saving}
          >
            {saving ? (
              <><span className="btn-spinner" /> Đang lưu...</>
            ) : (
              <><i className="ti-check" /> {isEdit ? 'Cập nhật' : 'Tạo mới'}</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FAQUpsertModal;
