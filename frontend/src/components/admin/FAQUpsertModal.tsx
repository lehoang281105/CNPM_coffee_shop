import React, { useState, useEffect } from 'react';
import type { FAQ, FAQCreatePayload, FAQUpdatePayload } from '../../types';

interface FAQUpsertModalProps {
  faq?: FAQ | null;
  botId: string; // Bot ID hiện tại, không cho phép thay đổi
  onClose: () => void;
  onSubmit: (payload: FAQCreatePayload | FAQUpdatePayload) => Promise<void>;
}

const FAQUpsertModal: React.FC<FAQUpsertModalProps> = ({ faq, botId, onClose, onSubmit }) => {
  const isEdit = !!faq;
  const [question, setQuestion] = useState(faq?.question ?? '');
  const [answer, setAnswer] = useState(faq?.answer ?? '');
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (faq) {
      setQuestion(faq.question);
      setAnswer(faq.answer);
    }
  }, [faq]);

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!question.trim()) errs.question = 'Câu hỏi không được để trống';
    if (!answer.trim()) errs.answer = 'Câu trả lời không được để trống';
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
