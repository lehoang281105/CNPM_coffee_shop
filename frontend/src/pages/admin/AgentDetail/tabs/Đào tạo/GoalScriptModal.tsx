import React, { useMemo, useState } from 'react';

interface GoalScriptModalProps {
  mode?: 'create' | 'edit';
  initialScript?: string;
  loading?: boolean;
  onClose: () => void;
  onSubmit: (script: string) => Promise<void>;
}

const QUICK_HINTS = [
  'Khi khách hỏi giá, AI báo ưu đãi trải nghiệm (không báo giá gốc), gợi ý dịch vụ phù hợp và xin số điện thoại để đặt lịch.',
  'Khi khách phản nàn về dịch vụ, AI xin lỗi, hỏi thêm chi tiết, nếu nghiêm trọng thì chuyển tư vấn viên.',
  'Khi khách hỏi về khuyến mãi, AI kiểm tra chương trình hiện tại, áp dụng nếu đủ điều kiện và hướng dẫn sử dụng.',
];

const GoalScriptModal: React.FC<GoalScriptModalProps> = ({
  mode = 'create',
  initialScript = '',
  loading = false,
  onClose,
  onSubmit,
}) => {
  const [script, setScript] = useState(initialScript);
  const [error, setError] = useState('');

  const title = useMemo(
    () => (mode === 'edit' ? 'Chỉnh sửa kịch bản' : 'Tạo kịch bản mới'),
    [mode]
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const value = script.trim();
    if (!value) {
      setError('Vui lòng nhập mô tả kịch bản.');
      return;
    }
    setError('');
    await onSubmit(value);
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal goal-script-modal" role="dialog" aria-modal="true" aria-labelledby="goal-script-title">
        <div className="modal-header">
          <h2 className="modal-title" id="goal-script-title">
            {title}
          </h2>
          <button className="modal-close" onClick={onClose} aria-label="Đóng" disabled={loading}>
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body goal-script-body">
            {error && <div className="error-banner">⚠️ {error}</div>}

            <div className="form-group">
              <label className="form-label" htmlFor="goal-script-input">
                Mô tả kịch bản bằng tiếng Việt
              </label>
              <textarea
                id="goal-script-input"
                className="form-textarea goal-script-textarea"
                value={script}
                onChange={(e) => setScript(e.target.value)}
                placeholder="VD: Khi khách hỏi giá dịch vụ, AI báo giá ưu đãi (không báo giá gốc), gợi ý dịch vụ phù hợp và xin SĐT để đặt lịch..."
                autoFocus
              />
            </div>

            <div className="goal-script-hints">
              <p>Gợi ý nhanh:</p>
              <div className="goal-script-hint-list">
                {QUICK_HINTS.map((hint) => (
                  <button
                    key={hint}
                    type="button"
                    className="goal-script-hint-item"
                    onClick={() => setScript(hint)}
                  >
                    <i className="ti-bolt-alt"></i>
                    <span>{hint}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn--ghost" onClick={onClose} disabled={loading}>
              Hủy
            </button>
            <button type="submit" className="btn btn--primary" disabled={loading}>
              <i className="ti-star"></i> {mode === 'edit' ? 'Lưu kịch bản' : 'AI tự sinh kịch bản'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GoalScriptModal;

