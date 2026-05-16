import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import './DeployDrawer.css';
import './AddBehaviorRuleDrawer.css';

type TriggerId = 'conversation-start' | 'message' | 'timeout' | 'intent';
type Priority = 'high' | 'medium' | 'low';

const TRIGGERS: {
  id: TriggerId;
  label: string;
  icon: string;
  mod: TriggerId;
}[] = [
  { id: 'conversation-start', label: 'Bắt đầu hội thoại', icon: 'ti-comment', mod: 'conversation-start' },
  { id: 'message', label: 'Nhận tin nhắn', icon: 'ti-bell', mod: 'message' },
  { id: 'timeout', label: 'Timeout', icon: 'ti-time', mod: 'timeout' },
  { id: 'intent', label: 'Phát hiện intent', icon: 'ti-bolt', mod: 'intent' },
];

const PRIORITIES: { id: Priority; label: string }[] = [
  { id: 'high', label: 'Ưu tiên cao' },
  { id: 'medium', label: 'Trung bình' },
  { id: 'low', label: 'Thấp' },
];

interface AddBehaviorRuleDrawerProps {
  open: boolean;
  onClose: () => void;
  onSubmit?: (payload: {
    name: string;
    description: string;
    trigger: TriggerId;
    condition: string;
    action: string;
    priority: Priority;
  }) => void;
}

const AddBehaviorRuleDrawer: React.FC<AddBehaviorRuleDrawerProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [trigger, setTrigger] = useState<TriggerId>('message');
  const [condition, setCondition] = useState('');
  const [action, setAction] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    setName('');
    setDescription('');
    setTrigger('message');
    setCondition('');
    setAction('');
    setPriority('medium');
  }, [open]);

  const handleSubmit = () => {
    onSubmit?.({ name, description, trigger, condition, action, priority });
    onClose();
  };

  if (!open) return null;

  return createPortal(
    <div
      className="channel-drawer-overlay"
      role="presentation"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <aside
        className="channel-drawer channel-drawer--behavior"
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-behavior-rule-title"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="channel-drawer-header">
          <h2 id="add-behavior-rule-title" className="channel-drawer-title">
            Thêm quy tắc hành vi
          </h2>
          <button
            type="button"
            className="channel-drawer-close"
            onClick={onClose}
            aria-label="Đóng"
          >
            <i className="ti-close" aria-hidden />
          </button>
        </header>

        <div className="channel-drawer-body">
          <div className="channel-drawer-field">
            <label className="channel-drawer-label" htmlFor="behavior-rule-name">
              Tên quy tắc
            </label>
            <input
              id="behavior-rule-name"
              type="text"
              className="channel-drawer-input"
              placeholder="VD: Greeting tự động"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="channel-drawer-field">
            <label className="channel-drawer-label" htmlFor="behavior-rule-desc">
              Mô tả
            </label>
            <textarea
              id="behavior-rule-desc"
              className="channel-drawer-textarea"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <section className="channel-drawer-field">
            <span className="channel-drawer-label">Trigger</span>
            <div className="behavior-trigger-grid">
              {TRIGGERS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={`behavior-trigger-card behavior-trigger-card--${item.mod}${
                    trigger === item.id ? ' is-selected' : ''
                  }`}
                  onClick={() => setTrigger(item.id)}
                >
                  <span className="behavior-trigger-card-icon">
                    <i className={item.icon} aria-hidden />
                  </span>
                  <span className="behavior-trigger-card-label">{item.label}</span>
                </button>
              ))}
            </div>
          </section>

          <div className="channel-drawer-field">
            <label className="channel-drawer-label" htmlFor="behavior-rule-condition">
              Condition
            </label>
            <textarea
              id="behavior-rule-condition"
              className="channel-drawer-textarea channel-drawer-textarea--code"
              rows={3}
              placeholder="VD: first_message = true"
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
            />
          </div>

          <div className="channel-drawer-field">
            <label className="channel-drawer-label" htmlFor="behavior-rule-action">
              Action
            </label>
            <textarea
              id="behavior-rule-action"
              className="channel-drawer-textarea channel-drawer-textarea--action"
              rows={2}
              placeholder="VD: Send welcome message"
              value={action}
              onChange={(e) => setAction(e.target.value)}
            />
          </div>

          <section className="channel-drawer-field">
            <span className="channel-drawer-label">Mức độ ưu tiên</span>
            <div className="behavior-priority-row">
              {PRIORITIES.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={`behavior-priority-pill${
                    priority === item.id ? ' is-selected' : ''
                  }`}
                  onClick={() => setPriority(item.id)}
                >
                  <span
                    className={`behavior-priority-dot behavior-priority-dot--${item.id}`}
                    aria-hidden
                  />
                  {item.label}
                </button>
              ))}
            </div>
          </section>
        </div>

        <footer className="channel-drawer-footer">
          <button type="button" className="channel-drawer-btn-cancel" onClick={onClose}>
            Hủy
          </button>
          <button type="button" className="channel-drawer-btn-submit" onClick={handleSubmit}>
            <i className="ti-save" aria-hidden />
            Tạo quy tắc
          </button>
        </footer>
      </aside>
    </div>,
    document.body,
  );
};

export default AddBehaviorRuleDrawer;
