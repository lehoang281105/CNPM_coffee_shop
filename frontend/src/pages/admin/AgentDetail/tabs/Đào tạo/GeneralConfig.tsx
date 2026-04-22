import React, { useState, useEffect } from 'react';
import type { Bot, Brand } from '../../../../../types';

const TONES = [
  { id: 'professional', left: 'Trang trọng', right: 'Thoải mái', defaultValue: 80, badge: 'Professional' },
  { id: 'warm', left: 'Ấm áp', right: 'Trung lập', defaultValue: 30, badge: 'High' },
  { id: 'concise', left: 'Ngắn gọn', right: 'Chi tiết', defaultValue: 50, badge: 'Balanced' },
  { id: 'empathy', left: 'Thấu cảm', right: 'Thẳng thắn', defaultValue: 20, badge: 'High' },
  { id: 'technical', left: 'Mức kỹ thuật', right: 'Đơn giản', defaultValue: 70, badge: 'Accessible' },
];

interface GeneralConfigProps {
  bot: Bot;
  brand?: Brand | null;
  onSave: (payload: any) => Promise<void>;
}

const GeneralConfig: React.FC<GeneralConfigProps> = ({ bot, brand, onSave }) => {
  const [name, setName] = useState(bot.name || '');
  const [rolePrompt, setRolePrompt] = useState(bot.role_prompt || '');
  const [role, setRole] = useState('');
  const [maxTokens, setMaxTokens] = useState(bot.max_tokens || 100);
  const [tones, setTones] = useState(TONES.map(t => ({ ...t, value: t.defaultValue })));

  useEffect(() => {
    if (bot) {
      setName(bot.name || '');
      setRolePrompt(bot.role_prompt || '');
      setMaxTokens(bot.max_tokens || 100);
    }
  }, [bot]);

  const handleSave = () => {
    onSave({
      ...bot,
      name,
      role_prompt: rolePrompt,
      max_tokens: maxTokens,
    });
  };

  const handleToneChange = (id: string, val: number) => {
    setTones(tones.map(t => t.id === id ? { ...t, value: val } : t));
  };

  return (
    <>
      <div className="config-header">
        <div>
          <h1 className="config-title">Cấu hình chung</h1>
          <p className="config-subtitle">Persona, tông giọng và độ dài phản hồi của AI</p>
        </div>
        <div className="config-actions">
          <button className="btn btn--primary" onClick={handleSave}>Lưu thay đổi</button>
        </div>
      </div>

      <div className="general-config-grid">
        {/* Left Column: Persona */}
        <div className="config-section">
          <div className="config-section-header">
            <div className="config-section-icon">👤</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14 }}>Persona</div>
              <div style={{ fontSize: 12, color: 'var(--color-text-sub)' }}>Định danh và vai trò của AI</div>
            </div>
          </div>
          <div className="config-section-body">
            <div className="form-group">
              <label className="form-label">Tên Agent</label>
              <input className="form-input" value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Vai trò</label>
              <input className="form-input" value={role} onChange={e => setRole(e.target.value)} placeholder="Để trống" />
            </div>
            <div className="form-group">
              <label className="form-label">Thương hiệu</label>
              <input className="form-input" value={brand?.name || 'Không có thương hiệu'} readOnly disabled style={{ backgroundColor: 'var(--color-bg-sub)' }} />
            </div>
            <div className="form-group">
              <label className="form-label">Mô tả</label>
              <textarea 
                className="form-textarea" 
                value={rolePrompt}
                onChange={e => setRolePrompt(e.target.value)}
              />
            </div>
            <p style={{ fontSize: 11, color: 'var(--color-text-sub)' }}>
              Mô tả này định hình cách AI tự nhận diện và tương tác.
            </p>
          </div>
        </div>

        {/* Right Column: Tổng giọng */}
        <div className="config-section">
          <div className="config-section-header">
            <div className="config-section-icon yellow">🗣️</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14 }}>Tông giọng</div>
              <div style={{ fontSize: 12, color: 'var(--color-text-sub)' }}>Phong cách giao tiếp của AI</div>
            </div>
          </div>
          <div className="config-section-body">
            {tones.map(tone => (
              <div key={tone.id}>
                <div className="tone-slider-group">
                  <span>{tone.left}</span>
                  <span className="tone-badge">{tone.badge}</span>
                </div>
                <div className="tone-slider-wrap" style={{ position: 'relative' }}>
                  <div className="tone-slider-track" />
                  <div className="tone-slider-thumb" style={{ left: `${tone.value}%` }} />
                  <input 
                    type="range" 
                    min="0" max="100" 
                    value={tone.value} 
                    onChange={e => handleToneChange(tone.id, parseInt(e.target.value))}
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }}
                  />
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', fontSize: 11, color: 'var(--color-text-sub)', marginTop: -20 }}>
                  {tone.right}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom: Độ dài */}
      <div className="config-section" style={{ marginTop: 20 }}>
        <div className="config-section-header">
          <div className="config-section-icon blue-gray">📏</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 14 }}>Độ dài phản hồi</div>
            <div style={{ fontSize: 12, color: 'var(--color-text-sub)' }}>Kiểm soát độ dài câu trả lời của AI — ngắn gọn hay chi tiết</div>
          </div>
        </div>
        <div className="config-section-body">
          <div className="radio-cards">
            {/* Ngắn */}
            <div className={`radio-card ${maxTokens === 50 ? 'selected' : ''}`} onClick={() => setMaxTokens(50)}>
              <div className="radio-card-header">
                <div>
                  <div className="radio-card-title">Ngắn (50 tokens)</div>
                  <div className="radio-card-sub">1-2 câu, trả lời trực tiếp</div>
                </div>
                <div className="radio-card-check" />
              </div>
              <div className="radio-card-desc">
                "Dạ bên em có dịch vụ triệt lông công nghệ Diode Laser, giá 500k/buổi ạ."
              </div>
            </div>

            {/* Trung bình */}
            <div className={`radio-card ${maxTokens === 100 ? 'selected' : ''}`} onClick={() => setMaxTokens(100)}>
              <div className="radio-card-header">
                <div>
                  <div className="radio-card-title">Trung bình (100 tokens)</div>
                  <div className="radio-card-sub">3-5 câu, giải thích ngắn gọn</div>
                </div>
                <div className="radio-card-check" />
              </div>
              <div className="radio-card-desc">
                "Dạ bên em có dịch vụ triệt lông công nghệ Diode Laser, giá 500k/buổi. Liệu trình thường 5-7 buổi, mỗi buổi cách nhau 4 tuần. Mình muốn em tư vấn kỹ hơn không ạ?"
              </div>
            </div>

            {/* Chi tiết */}
            <div className={`radio-card ${maxTokens === 150 ? 'selected' : ''}`} onClick={() => setMaxTokens(150)}>
              <div className="radio-card-header">
                <div>
                  <div className="radio-card-title">Chi tiết (150 tokens)</div>
                  <div className="radio-card-sub">5+ câu, hướng dẫn đầy đủ</div>
                </div>
                <div className="radio-card-check" />
              </div>
              <div className="radio-card-desc">
                "Dạ bên em có dịch vụ triệt lông công nghệ Diode Laser, giá 500k/buổi. Liệu trình 5-7 buổi, cách nhau 4 tuần. Công nghệ này an toàn, không đau, hiệu quả 95%. Em gửi mình lịch trống tuần này nhé ạ!"
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GeneralConfig;
