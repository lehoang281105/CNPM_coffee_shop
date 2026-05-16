import React, { useEffect, useState } from 'react';
import './DeployDrawer.css';

type GroupType = 'all' | 'rule' | 'tag';

interface AddAudienceGroupDrawerProps {
  open: boolean;
  onClose: () => void;
  onSubmit?: (payload: {
    name: string;
    description: string;
    type: GroupType;
    condition: string;
  }) => void;
}

const TYPE_OPTIONS: { value: GroupType; label: string }[] = [
  { value: 'all', label: 'Tất cả' },
  { value: 'rule', label: 'Theo Rule' },
  { value: 'tag', label: 'Theo Tag' },
];

const AddAudienceGroupDrawer: React.FC<AddAudienceGroupDrawerProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<GroupType>('rule');
  const [condition, setCondition] = useState('');

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

  if (!open) return null;

  const showCondition = type === 'rule' || type === 'tag';

  const handleSubmit = () => {
    onSubmit?.({ name, description, type, condition });
    onClose();
  };

  return (
    <div
      className="channel-drawer-overlay"
      role="presentation"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <aside
        className="channel-drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-audience-group-title"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="channel-drawer-header">
          <h2 id="add-audience-group-title" className="channel-drawer-title">
            Thêm nhóm đối tượng
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
            <label className="channel-drawer-label" htmlFor="audience-group-name">
              Tên nhóm
            </label>
            <input
              id="audience-group-name"
              type="text"
              className="channel-drawer-input"
              placeholder="VD: Khách hàng Premium"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="channel-drawer-field">
            <label className="channel-drawer-label" htmlFor="audience-group-desc">
              Mô tả
            </label>
            <textarea
              id="audience-group-desc"
              className="channel-drawer-textarea"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="channel-drawer-field">
            <label className="channel-drawer-label" htmlFor="audience-group-type">
              Loại
            </label>
            <div className="channel-drawer-select-wrap">
              <select
                id="audience-group-type"
                className="channel-drawer-select"
                value={type}
                onChange={(e) => setType(e.target.value as GroupType)}
              >
                {TYPE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <i className="ti-angle-down channel-drawer-select-chevron" aria-hidden />
            </div>
          </div>

          {showCondition && (
            <div className="channel-drawer-field">
              <label className="channel-drawer-label" htmlFor="audience-group-condition">
                Điều kiện
              </label>
              <textarea
                id="audience-group-condition"
                className="channel-drawer-textarea channel-drawer-textarea--code"
                rows={5}
                placeholder='VD: plan_tier = "premium" AND days_since_signup > 7'
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
              />
            </div>
          )}
        </div>

        <footer className="channel-drawer-footer">
          <button type="button" className="channel-drawer-btn-cancel" onClick={onClose}>
            Hủy
          </button>
          <button type="button" className="channel-drawer-btn-submit" onClick={handleSubmit}>
            <i className="ti-save" aria-hidden />
            Tạo nhóm
          </button>
        </footer>
      </aside>
    </div>
  );
};

export default AddAudienceGroupDrawer;
