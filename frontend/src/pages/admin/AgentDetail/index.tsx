import React, { useState } from 'react';
import AgentLayout from '../../../layouts/AgentLayout';
import './AgentDetail.css';

const TONES = [
  { id: 'professional', left: 'Trang trọng', right: 'Thoải mái', defaultValue: 80, badge: 'Professional' },
  { id: 'warm', left: 'Ấm áp', right: 'Trung lập', defaultValue: 30, badge: 'High' },
  { id: 'concise', left: 'Ngắn gọn', right: 'Chi tiết', defaultValue: 50, badge: 'Balanced' },
  { id: 'empathy', left: 'Thấu cảm', right: 'Thẳng thắn', defaultValue: 20, badge: 'High' },
  { id: 'technical', left: 'Mức kỹ thuật', right: 'Đơn giản', defaultValue: 70, badge: 'Accessible' },
];

const GeneralConfig: React.FC = () => {
  const [activeLength, setActiveLength] = useState('medium');

  return (
    <>
      <div className="config-header">
        <div>
          <h1 className="config-title">Cấu hình chung</h1>
          <p className="config-subtitle">Persona, tổng giọng và độ dài phản hồi của AI</p>
        </div>
        <div className="config-actions">
          <button className="btn btn--ghost">✨ AI tự sinh cấu hình</button>
          <button className="btn btn--ghost">🔄 Khôi phục mặc định</button>
          <button className="btn btn--primary">💾 Lưu thay đổi</button>
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
              <input className="form-input" defaultValue="Lumi Assistant" />
            </div>
            <div className="form-group">
              <label className="form-label">Vai trò</label>
              <input className="form-input" defaultValue="Tư vấn viên Thẩm mỹ viện Seoul Center" />
            </div>
            <div className="form-group">
              <label className="form-label">Công ty</label>
              <input className="form-input" defaultValue="Seoul Center" />
            </div>
            <div className="form-group">
              <label className="form-label">Mô tả</label>
              <textarea 
                className="form-textarea" 
                defaultValue="Trợ lý AI chuyên nghiệp, thân thiện của Viện Thẩm Mỹ Seoul Center, tư vấn dịch vụ làm đẹp và chăm sóc khách hàng." 
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
              <div style={{ fontWeight: 700, fontSize: 14 }}>Tổng giọng</div>
              <div style={{ fontSize: 12, color: 'var(--color-text-sub)' }}>Phong cách giao tiếp của AI</div>
            </div>
          </div>
          <div className="config-section-body">
            {TONES.map(tone => (
              <div key={tone.id}>
                <div className="tone-slider-group">
                  <span>{tone.left}</span>
                  <span className="tone-badge">{tone.badge}</span>
                </div>
                <div className="tone-slider-wrap">
                  <div className="tone-slider-track" />
                  <div className="tone-slider-thumb" style={{ left: `${tone.defaultValue}%` }} />
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
            <div className={`radio-card ${activeLength === 'short' ? 'selected' : ''}`} onClick={() => setActiveLength('short')}>
              <div className="radio-card-header">
                <div>
                  <div className="radio-card-title">Ngắn</div>
                  <div className="radio-card-sub">1-2 câu, trả lời trực tiếp</div>
                </div>
                <div className="radio-card-check" />
              </div>
              <div className="radio-card-desc">
                "Dạ bên em có dịch vụ triệt lông công nghệ Diode Laser, giá 500k/buổi ạ."
              </div>
            </div>

            {/* Trung bình */}
            <div className={`radio-card ${activeLength === 'medium' ? 'selected' : ''}`} onClick={() => setActiveLength('medium')}>
              <div className="radio-card-header">
                <div>
                  <div className="radio-card-title">Trung bình</div>
                  <div className="radio-card-sub">3-5 câu, giải thích ngắn gọn</div>
                </div>
                <div className="radio-card-check" />
              </div>
              <div className="radio-card-desc">
                "Dạ bên em có dịch vụ triệt lông công nghệ Diode Laser, giá 500k/buổi. Liệu trình thường 5-7 buổi, mỗi buổi cách nhau 4 tuần. Mình muốn em tư vấn kỹ hơn không ạ?"
              </div>
            </div>

            {/* Chi tiết */}
            <div className={`radio-card ${activeLength === 'detailed' ? 'selected' : ''}`} onClick={() => setActiveLength('detailed')}>
              <div className="radio-card-header">
                <div>
                  <div className="radio-card-title">Chi tiết</div>
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

const AgentDetailPage: React.FC = () => {
  return (
    <AgentLayout>
      <GeneralConfig />
    </AgentLayout>
  );
};

export default AgentDetailPage;
