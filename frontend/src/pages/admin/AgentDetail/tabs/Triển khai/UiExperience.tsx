import React, { useState } from 'react';
import './UiExperience.css';

const DEFAULT_SUGGESTIONS = [
  'Kiểm tra đơn hàng',
  'Chính sách hoàn tiền',
  'Hỏi về gói Premium',
];

const UiExperience: React.FC = () => {
  const [position, setPosition] = useState('bottom-right');
  const [theme, setTheme] = useState('light');
  const [widgetTitle, setWidgetTitle] = useState('Lumi AI Assistant');
  const [welcomeMessage, setWelcomeMessage] = useState(
    'Xin chào! Lumi AI có thể giúp gì cho bạn?',
  );
  const [primaryColor, setPrimaryColor] = useState('#2563eb');
  const [cornerRadius, setCornerRadius] = useState('medium');
  const [showAgentName, setShowAgentName] = useState(true);
  const [showLogo, setShowLogo] = useState(true);
  const [showTypingDash, setShowTypingDash] = useState(true);
  const [quickReply, setQuickReply] = useState(true);
  const [typingAnimation, setTypingAnimation] = useState(true);
  const [readReceipts, setReadReceipts] = useState(true);
  const [emojiPicker, setEmojiPicker] = useState(true);
  const [fileUpload, setFileUpload] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>(DEFAULT_SUGGESTIONS);
  const [newSuggestion, setNewSuggestion] = useState('');

  const removeSuggestion = (index: number) => {
    setSuggestions((prev) => prev.filter((_, i) => i !== index));
  };

  const addSuggestion = () => {
    const text = newSuggestion.trim();
    if (!text) return;
    setSuggestions((prev) => [...prev, text]);
    setNewSuggestion('');
  };

  const visibleSuggestions = quickReply ? suggestions : [];

  return (
    <div className="ui-experience">
      <header className="ui-experience-header">
        <div className="ui-experience-header-text">
          <h1 className="ui-experience-title">Giao diện & Trải nghiệm</h1>
          <p className="ui-experience-subtitle">
            Cấu hình widget chat và giao diện tin nhắn
          </p>
        </div>
        <div className="ui-experience-header-actions">
          <button type="button" className="ui-experience-btn-ghost">
            <i className="ti-eye" aria-hidden />
            Xem trước
          </button>
          <button type="button" className="ui-experience-btn-primary">
            <i className="ti-save" aria-hidden />
            Lưu thay đổi
          </button>
        </div>
      </header>

      <div className="ui-experience-grid">
        <section className="ui-experience-card">
          <header className="ui-experience-card-head ui-experience-card-head--blue">
            <span className="ui-experience-card-icon ui-experience-card-icon--blue">
              <i className="ti-comment" aria-hidden />
            </span>
            <div>
              <h2 className="ui-experience-card-title">Widget Chat</h2>
              <p className="ui-experience-card-desc">Cấu hình giao diện widget trên website</p>
            </div>
          </header>

          <div className="ui-experience-card-body">
            <div className="ui-experience-form-row">
              <label className="ui-experience-label" htmlFor="widget-position">
                Vị trí
              </label>
              <select
                id="widget-position"
                className="ui-experience-select"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
              >
                <option value="bottom-right">Góc phải dưới</option>
                <option value="bottom-left">Góc trái dưới</option>
              </select>
            </div>

            <div className="ui-experience-form-row">
              <label className="ui-experience-label" htmlFor="widget-theme">
                Giao diện
              </label>
              <select
                id="widget-theme"
                className="ui-experience-select"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
              >
                <option value="light">Sáng</option>
                <option value="dark">Tối</option>
              </select>
            </div>

            <div className="ui-experience-form-row">
              <label className="ui-experience-label" htmlFor="widget-title">
                Tiêu đề widget
              </label>
              <input
                id="widget-title"
                type="text"
                className="ui-experience-input"
                value={widgetTitle}
                onChange={(e) => setWidgetTitle(e.target.value)}
              />
            </div>

            <div className="ui-experience-form-row ui-experience-form-row--full">
              <label className="ui-experience-label" htmlFor="welcome-message">
                Tin nhắn chào mừng
              </label>
              <textarea
                id="welcome-message"
                className="ui-experience-textarea"
                rows={3}
                value={welcomeMessage}
                onChange={(e) => setWelcomeMessage(e.target.value)}
              />
            </div>

            <div className="ui-experience-form-row">
              <label className="ui-experience-label" htmlFor="primary-color">
                Màu chính
              </label>
              <div className="ui-experience-color-wrap">
                <input
                  id="primary-color"
                  type="color"
                  className="ui-experience-color-input"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                />
                <span
                  className="ui-experience-color-bar"
                  style={{ background: primaryColor }}
                  aria-hidden
                />
              </div>
            </div>

            <div className="ui-experience-form-row">
              <label className="ui-experience-label" htmlFor="corner-radius">
                Bo góc
              </label>
              <select
                id="corner-radius"
                className="ui-experience-select"
                value={cornerRadius}
                onChange={(e) => setCornerRadius(e.target.value)}
              >
                <option value="small">Nhỏ</option>
                <option value="medium">Vừa</option>
                <option value="large">Lớn</option>
              </select>
            </div>

            <div className="ui-experience-checks">
              <label className="ui-experience-check">
                <input
                  type="checkbox"
                  checked={showAgentName}
                  onChange={(e) => setShowAgentName(e.target.checked)}
                />
                Hiển thị tên Agent
              </label>
              <label className="ui-experience-check">
                <input
                  type="checkbox"
                  checked={showLogo}
                  onChange={(e) => setShowLogo(e.target.checked)}
                />
                Hiển thị logo
              </label>
              <label className="ui-experience-check">
                <input
                  type="checkbox"
                  checked={showTypingDash}
                  onChange={(e) => setShowTypingDash(e.target.checked)}
                />
                Gạch ngang đang gõ
              </label>
            </div>
          </div>
        </section>

        <section className="ui-experience-card ui-experience-card--tall">
          <header className="ui-experience-card-head ui-experience-card-head--amber">
            <span className="ui-experience-card-icon ui-experience-card-icon--amber">
              T
            </span>
            <div>
              <h2 className="ui-experience-card-title">Tin nhắn & Trải nghiệm</h2>
              <p className="ui-experience-card-desc">
                Cấu hình giao diện tin nhắn và tính năng chat
              </p>
            </div>
          </header>

          <div className="ui-experience-card-body">
            <div className="ui-experience-checks ui-experience-checks--grid">
              <label className="ui-experience-check">
                <input
                  type="checkbox"
                  checked={quickReply}
                  onChange={(e) => setQuickReply(e.target.checked)}
                />
                Gợi ý trả lời nhanh
              </label>
              <label className="ui-experience-check">
                <input
                  type="checkbox"
                  checked={typingAnimation}
                  onChange={(e) => setTypingAnimation(e.target.checked)}
                />
                Animation đang gõ
              </label>
              <label className="ui-experience-check">
                <input
                  type="checkbox"
                  checked={readReceipts}
                  onChange={(e) => setReadReceipts(e.target.checked)}
                />
                Đã xem (read receipts)
              </label>
              <label className="ui-experience-check">
                <input
                  type="checkbox"
                  checked={emojiPicker}
                  onChange={(e) => setEmojiPicker(e.target.checked)}
                />
                Bảng chọn emoji
              </label>
              <label className="ui-experience-check">
                <input
                  type="checkbox"
                  checked={fileUpload}
                  onChange={(e) => setFileUpload(e.target.checked)}
                />
                Tải file lên
              </label>
            </div>

            <div className="ui-experience-suggestions">
              <span className="ui-experience-label">Gợi ý hội thoại</span>
              <ul className="ui-experience-suggestion-list">
                {suggestions.map((item, index) => (
                  <li key={`${item}-${index}`} className="ui-experience-suggestion-item">
                    <input
                      type="text"
                      className="ui-experience-input"
                      value={item}
                      onChange={(e) => {
                        const next = [...suggestions];
                        next[index] = e.target.value;
                        setSuggestions(next);
                      }}
                    />
                    <button
                      type="button"
                      className="ui-experience-suggestion-remove"
                      onClick={() => removeSuggestion(index)}
                      aria-label="Xóa gợi ý"
                    >
                      <i className="ti-close" aria-hidden />
                    </button>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                className="ui-experience-add-suggestion"
                onClick={addSuggestion}
              >
                + Thêm gợi ý
              </button>
            </div>

            <div className="ui-experience-preview">
              <span className="ui-experience-label">Xem trước widget</span>
              <div
                className="ui-experience-preview-window"
                style={{ '--widget-primary': primaryColor } as React.CSSProperties}
              >
                <header className="ui-experience-preview-header">
                  <span
                    className="ui-experience-preview-avatar"
                    style={{ background: primaryColor }}
                  >
                    L
                  </span>
                  <div className="ui-experience-preview-meta">
                    <strong>{widgetTitle}</strong>
                    <span className="ui-experience-preview-online">
                      <span className="ui-experience-preview-dot" aria-hidden />
                      Online
                    </span>
                  </div>
                </header>
                <div className="ui-experience-preview-body">
                  <p className="ui-experience-preview-bubble">{welcomeMessage}</p>
                  {visibleSuggestions.length > 0 && (
                    <div className="ui-experience-preview-chips">
                      {visibleSuggestions.map((chip) => (
                        <span key={chip} className="ui-experience-preview-chip">
                          {chip}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default UiExperience;
