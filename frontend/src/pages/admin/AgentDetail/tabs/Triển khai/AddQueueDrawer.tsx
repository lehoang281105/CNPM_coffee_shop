import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import './DeployDrawer.css';

type DistributionStrategy = 'round-robin' | 'least-busy' | 'priority';

const STRATEGY_OPTIONS: { value: DistributionStrategy; label: string }[] = [
  { value: 'round-robin', label: 'Round Robin' },
  { value: 'least-busy', label: 'Least Busy' },
  { value: 'priority', label: 'Priority' },
];

interface AddQueueDrawerProps {
  open: boolean;
  onClose: () => void;
  onSubmit?: (payload: {
    name: string;
    description: string;
    maxAgents: number;
    strategy: DistributionStrategy;
  }) => void;
}

const AddQueueDrawer: React.FC<AddQueueDrawerProps> = ({ open, onClose, onSubmit }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [maxAgents, setMaxAgents] = useState(5);
  const [strategy, setStrategy] = useState<DistributionStrategy>('round-robin');

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

  const handleSubmit = () => {
    onSubmit?.({ name, description, maxAgents, strategy });
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
        className="channel-drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-queue-title"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="channel-drawer-header">
          <h2 id="add-queue-title" className="channel-drawer-title">
            Thêm queue mới
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
            <label className="channel-drawer-label" htmlFor="queue-name">
              Tên queue
            </label>
            <input
              id="queue-name"
              type="text"
              className="channel-drawer-input"
              placeholder="VD: VIP Support"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="channel-drawer-field">
            <label className="channel-drawer-label" htmlFor="queue-desc">
              Mô tả
            </label>
            <textarea
              id="queue-desc"
              className="channel-drawer-textarea"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="channel-drawer-field">
            <label className="channel-drawer-label" htmlFor="queue-max-agents">
              Agent tối đa
            </label>
            <input
              id="queue-max-agents"
              type="number"
              className="channel-drawer-input"
              min={1}
              max={99}
              value={maxAgents}
              onChange={(e) => setMaxAgents(Number(e.target.value) || 1)}
            />
          </div>

          <div className="channel-drawer-field">
            <label className="channel-drawer-label" htmlFor="queue-strategy">
              Chiến lược phân phối
            </label>
            <div className="channel-drawer-select-wrap">
              <select
                id="queue-strategy"
                className="channel-drawer-select"
                value={strategy}
                onChange={(e) => setStrategy(e.target.value as DistributionStrategy)}
              >
                {STRATEGY_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <i className="ti-angle-down channel-drawer-select-chevron" aria-hidden />
            </div>
          </div>
        </div>

        <footer className="channel-drawer-footer">
          <button type="button" className="channel-drawer-btn-cancel" onClick={onClose}>
            Hủy
          </button>
          <button type="button" className="channel-drawer-btn-submit" onClick={handleSubmit}>
            <i className="ti-save" aria-hidden />
            Tạo queue
          </button>
        </footer>
      </aside>
    </div>,
    document.body,
  );
};

export default AddQueueDrawer;
