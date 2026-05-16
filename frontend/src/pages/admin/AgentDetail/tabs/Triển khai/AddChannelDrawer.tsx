import React, { useEffect, useState } from 'react';
import './DeployDrawer.css';

export interface ChannelTypeOption {
  id: string;
  name: string;
  description: string;
  icon: string;
}

const CHANNEL_TYPES: ChannelTypeOption[] = [
  {
    id: 'webchat',
    name: 'Webchat',
    description: 'Widget chat trên website',
    icon: 'ti-comment',
  },
  {
    id: 'facebook',
    name: 'Facebook Messenger',
    description: 'Tích hợp Fanpage Facebook',
    icon: 'ti-facebook',
  },
  {
    id: 'instagram',
    name: 'Instagram',
    description: 'Tích hợp Instagram DM + Comment',
    icon: 'ti-instagram',
  },
  {
    id: 'zalo',
    name: 'Zalo OA',
    description: 'Kênh Zalo Official Account',
    icon: 'ti-comment-alt',
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    description: 'WhatsApp Business API',
    icon: 'ti-mobile',
  },
  {
    id: 'email',
    name: 'Email',
    description: 'Hộp thư hỗ trợ email',
    icon: 'ti-email',
  },
];

interface AddChannelDrawerProps {
  open: boolean;
  onClose: () => void;
  onSubmit?: (payload: {
    typeId: string;
    name: string;
    position: string;
    theme: string;
    welcomeMessage: string;
  }) => void;
}

const AddChannelDrawer: React.FC<AddChannelDrawerProps> = ({ open, onClose, onSubmit }) => {
  const [typeId, setTypeId] = useState('webchat');
  const [name, setName] = useState('');
  const [position, setPosition] = useState('bottom-right');
  const [theme, setTheme] = useState('light');
  const [welcomeMessage, setWelcomeMessage] = useState('');

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

  const handleSubmit = () => {
    onSubmit?.({ typeId, name, position, theme, welcomeMessage });
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
        aria-labelledby="add-channel-title"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="channel-drawer-header">
          <h2 id="add-channel-title" className="channel-drawer-title">
            Thêm kênh mới
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
          <section className="channel-drawer-section">
            <h3 className="channel-drawer-section-label">Chọn loại kênh</h3>
            <div className="channel-type-grid">
              {CHANNEL_TYPES.map((type) => (
                <button
                  key={type.id}
                  type="button"
                  className={`channel-type-card${typeId === type.id ? ' is-selected' : ''}`}
                  onClick={() => setTypeId(type.id)}
                >
                  <span className="channel-type-card-icon">
                    <i className={type.icon} aria-hidden />
                  </span>
                  <span className="channel-type-card-text">
                    <strong>{type.name}</strong>
                    <span>{type.description}</span>
                  </span>
                </button>
              ))}
            </div>
          </section>

          <div className="channel-drawer-field">
            <label className="channel-drawer-label" htmlFor="channel-name">
              Tên kênh
            </label>
            <input
              id="channel-name"
              type="text"
              className="channel-drawer-input"
              placeholder="VD: Facebook — Thẩm Viện Seoul"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {typeId === 'webchat' && (
            <>
              <div className="channel-drawer-field">
                <label className="channel-drawer-label" htmlFor="channel-position">
                  Vị trí widget
                </label>
                <div className="channel-drawer-select-wrap">
                  <select
                    id="channel-position"
                    className="channel-drawer-select"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                  >
                    <option value="bottom-right">Góc phải dưới</option>
                    <option value="bottom-left">Góc trái dưới</option>
                  </select>
                  <i className="ti-angle-down channel-drawer-select-chevron" aria-hidden />
                </div>
              </div>

              <div className="channel-drawer-field">
                <label className="channel-drawer-label" htmlFor="channel-theme">
                  Giao diện
                </label>
                <div className="channel-drawer-select-wrap">
                  <select
                    id="channel-theme"
                    className="channel-drawer-select"
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                  >
                    <option value="light">Sáng</option>
                    <option value="dark">Tối</option>
                  </select>
                  <i className="ti-angle-down channel-drawer-select-chevron" aria-hidden />
                </div>
              </div>

              <div className="channel-drawer-field">
                <label className="channel-drawer-label" htmlFor="channel-welcome">
                  Tin nhắn chào mừng
                </label>
                <textarea
                  id="channel-welcome"
                  className="channel-drawer-textarea"
                  rows={4}
                  value={welcomeMessage}
                  onChange={(e) => setWelcomeMessage(e.target.value)}
                />
              </div>
            </>
          )}
        </div>

        <footer className="channel-drawer-footer">
          <button type="button" className="channel-drawer-btn-cancel" onClick={onClose}>
            Hủy
          </button>
          <button type="button" className="channel-drawer-btn-submit" onClick={handleSubmit}>
            <i className="ti-plus" aria-hidden />
            Thêm kênh
          </button>
        </footer>
      </aside>
    </div>
  );
};

export default AddChannelDrawer;
