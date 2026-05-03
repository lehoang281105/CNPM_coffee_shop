import React from 'react';

export interface ConfirmModalProps {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'danger' | 'warning' | 'info';
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  title,
  message,
  confirmText = 'Xác nhận',
  cancelText = 'Hủy',
  type = 'danger',
  onConfirm,
  onCancel,
}) => {
  const colors = {
    danger:  { bg: 'rgba(239,68,68,0.1)',   color: '#ef4444',  btnClass: 'confirm-btn--danger' },
    warning: { bg: 'rgba(234,179,8,0.1)',   color: '#ca8a04',  btnClass: 'confirm-btn--warning' },
    info:    { bg: 'rgba(79,99,210,0.1)',   color: '#4f63d2',  btnClass: 'confirm-btn--info' },
  }[type];

  return (
    <div
      className="modal-overlay"
      onClick={onCancel}
      style={{ zIndex: 9999, backdropFilter: 'blur(4px)' }}
    >
      <style>{`
        @keyframes confirmPopIn {
          0%   { opacity: 0; transform: scale(0.92) translateY(12px); }
          100% { opacity: 1; transform: scale(1)    translateY(0); }
        }
        .confirm-modal-box {
          max-width: 440px;
          width: 90%;
          text-align: center;
          padding: 48px 36px 36px;
          background: var(--color-surface, #fff);
          border-radius: 20px;
          box-shadow: 0 24px 60px -10px rgba(0,0,0,0.22);
          border: 1px solid var(--color-border);
          animation: confirmPopIn 0.25s cubic-bezier(0.16,1,0.3,1);
        }
        .confirm-icon-circle {
          width: 60px; height: 60px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 20px;
          font-size: 26px;
        }
        .confirm-title {
          font-size: 19px; font-weight: 700;
          color: var(--color-text);
          margin-bottom: 8px;
        }
        .confirm-message {
          font-size: 14px; line-height: 1.6;
          color: var(--color-text-sub);
          margin-bottom: 28px;
        }
        .confirm-actions {
          display: flex; gap: 10px;
        }
        .confirm-btn {
          flex: 1; padding: 11px 0;
          border-radius: 10px;
          font-size: 14px; font-weight: 600;
          font-family: inherit;
          cursor: pointer;
          border: 1px solid transparent;
          transition: all 0.18s;
        }
        .confirm-btn--cancel {
          background: var(--color-surface-2);
          border-color: var(--color-border);
          color: var(--color-text-sub);
        }
        .confirm-btn--cancel:hover { background: var(--color-border); color: var(--color-text); }
        .confirm-btn--danger  { background: #ef4444; color: #fff; }
        .confirm-btn--danger:hover  { background: #dc2626; }
        .confirm-btn--warning { background: #f59e0b; color: #fff; }
        .confirm-btn--warning:hover { background: #d97706; }
        .confirm-btn--info    { background: var(--color-primary); color: #fff; }
        .confirm-btn--info:hover    { background: var(--color-primary-dark); }
      `}</style>

      <div className="confirm-modal-box" onClick={e => e.stopPropagation()}>
        <div className="confirm-icon-circle" style={{ background: colors.bg, color: colors.color }}>
          {type === 'danger' ? '⚠' : type === 'warning' ? '⚠' : 'ℹ'}
        </div>

        <div className="confirm-title">{title}</div>
        <div className="confirm-message">{message}</div>

        <div className="confirm-actions">
          <button className="confirm-btn confirm-btn--cancel" onClick={onCancel}>
            {cancelText}
          </button>
          <button className={`confirm-btn ${colors.btnClass}`} onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
