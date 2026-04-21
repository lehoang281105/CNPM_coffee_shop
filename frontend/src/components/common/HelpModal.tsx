import React, { useState } from 'react';

interface Props {
  onClose: () => void;
}

const STEPS = [
  {
    id: 1,
    icon: '🚀',
    title: 'Chào mừng đến với MASS CHATBOT!',
    subtitle: 'Nền tảng quản lý AI Agent tự động hỗ trợ khách hàng 24/7 trên mọi kênh.',
    content: (
      <div className="help-step-content">
        <p style={{ marginBottom: 16 }}>MASS CHATBOT giúp bạn tạo ra <strong>AI tư vấn viên thông minh</strong> có thể:</p>
        <div className="help-grid-2x2">
          <div className="help-card">
            <span className="help-card-icon">💬</span>
            <span>Tự động trả lời khách hàng trên Facebook, Zalo, Webchat</span>
          </div>
          <div className="help-card">
            <span className="help-card-icon">📚</span>
            <span>Học từ tri thức có sẵn: Website, PDF, Q&A</span>
          </div>
          <div className="help-card">
            <span className="help-card-icon">📅</span>
            <span>Đặt lịch, thu thập SĐT, chốt đơn trong chat</span>
          </div>
          <div className="help-card">
            <span className="help-card-icon">🛡️</span>
            <span>Tự động phát hiện lỗi, đảm bảo chất lượng</span>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 2,
    icon: '💼',
    title: 'Danh sách AI Agent',
    subtitle: 'Nơi quản lý tất cả AI Agent của bạn',
    content: (
      <div className="help-step-content">
        <p style={{ marginBottom: 16 }}>Mỗi <strong>Agent</strong> là một AI tư vấn viên riêng biệt, được cấu hình cho một doanh nghiệp hoặc chi nhánh cụ thể.</p>
        <ul className="help-list-numbered">
          <li>Xem danh sách Agent hiện có</li>
          <li>Nhấn vào card để vào cấu hình chi tiết</li>
          <li>Nhấn <strong>"Thư viện kịch bản"</strong> để xem kịch bản mẫu</li>
          <li>Nhấn <strong>"Hội thoại"</strong> để xem hội thoại Agent xử lý</li>
        </ul>
        <div className="help-tip">
          <strong>💡 Mẹo:</strong> Nhấn <strong>"+ Tạo AI Agent"</strong> để bắt đầu wizard tạo Agent mới với hướng dẫn từng bước.
        </div>
      </div>
    )
  },
  {
    id: 3,
    icon: '✨',
    title: 'Wizard tạo Agent mới',
    subtitle: '4 bước đơn giản để khởi tạo AI Agent',
    content: (
      <div className="help-step-content">
        <p style={{ marginBottom: 16 }}>Wizard hướng dẫn bạn qua <strong>4 bước</strong> để tạo Agent hoàn chỉnh:</p>
        <div className="help-wizard-steps">
          <div className="help-w-step">
            <div className="help-w-icon">1</div>
            <div><strong>Bước 1: Cấu hình chung</strong><p>Đặt tên, mô tả, thương hiệu cho Agent</p></div>
          </div>
          <div className="help-w-step">
            <div className="help-w-icon">2</div>
            <div><strong>Bước 2: Chọn kịch bản</strong><p>Chọn kịch bản AI sẽ xử lý (đặt lịch, tư vấn, thu thập info...)</p></div>
          </div>
          <div className="help-w-step">
            <div className="help-w-icon">3</div>
            <div><strong>Bước 3: Khởi tạo tri thức</strong><p>Quét website, tải PDF, chọn nguồn học tự động</p></div>
          </div>
          <div className="help-w-step">
            <div className="help-w-icon">4</div>
            <div><strong>Bước 4: Test & Hoàn tất</strong><p>Chat thử với AI, xem preview, lưu cấu hình</p></div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 4,
    icon: '🌐',
    title: 'Cấu hình chi tiết Agent',
    subtitle: 'Sidebar với 4 nhóm chức năng chính',
    content: (
      <div className="help-step-content">
        <p style={{ marginBottom: 16 }}>Mỗi Agent có sidebar cấu hình riêng với <strong>4 nhóm chức năng:</strong></p>
        <ul className="help-list-groups">
          <li>
            <strong>🎓 Đào tạo</strong>
            <p>Cấu hình chung, Ý định & Mục tiêu, Tri thức, Skills, Chính sách...</p>
          </li>
          <li>
            <strong>🧪 Kiểm thử</strong>
            <p>Chat Simulator, Scenario Testing, Lịch sử kiểm thử...</p>
          </li>
          <li>
            <strong>🚀 Triển khai</strong>
            <p>Tổng quan Deploy, Kênh triển khai, Điều khiển hành vi, Chuyển tiếp...</p>
          </li>
          <li>
            <strong>📊 QA & Tối ưu</strong>
            <p>Auto QA, Manual QA, Insights...</p>
          </li>
        </ul>
      </div>
    )
  },
  {
    id: 5,
    icon: '⚙️',
    title: 'Luồng AI xử lý hội thoại',
    subtitle: 'Intent → Goals → Hướng dẫn trả lời → Skills',
    content: (
      <div className="help-step-content">
        <p style={{ marginBottom: 16 }}>Đây là <strong>trái tim</strong> của AI Agent — cách AI hiểu và phản hồi khách hàng:</p>
        
        <div className="help-flow-diagram">
          <span>Intent</span> ➔ <span>Goals</span> ➔ <span>Trả lời</span> ➔ <span>Skills</span>
        </div>

        <ul className="help-list-numbered help-flow-list">
          <li>
            <strong>Intent nhận diện ý định</strong>
            <p>AI phân tích tin nhắn khách — xác định intent (chao_hoi, tu_van, dat_lich...)</p>
          </li>
          <li>
            <strong>Goals liên kết được kích hoạt</strong>
            <p>Intent kích hoạt các Goals đã liên kết — AI biết cần làm gì tiếp theo.</p>
          </li>
          <li>
            <strong>Hướng dẫn trả lời cho từng Goal</strong>
            <p>Mỗi Goal có Q&A pairs — mẫu câu trả lời sẵn cho các tình huống.</p>
          </li>
          <li>
            <strong>Skills được gọi để thực hiện thao tác</strong>
            <p>Nếu cần thao tác (lưu SĐT, tìm chi nhánh), AI gọi Skills tương ứng.</p>
          </li>
        </ul>
      </div>
    )
  },
  {
    id: 6,
    icon: '🛡️',
    title: 'Auto QA — Đảm bảo chất lượng',
    subtitle: 'AI tự động kiểm tra và phát hiện rủi ro',
    content: (
      <div className="help-step-content">
        <p style={{ marginBottom: 16 }}>Auto QA tự động <strong>chấm điểm 100% hội thoại</strong> và phát hiện rủi ro trước khi bạn cần xem thủ công.</p>
        <ul className="help-list-groups">
          <li>
            <strong>⚡ 4 Tab chính</strong>
            <p>Tổng quan → Spotlight → Tiêu chí QA → Hội thoại → Cài đặt</p>
          </li>
          <li>
            <strong>🎯 Spotlight Filters</strong>
            <p>5 bộ lọc AI tự động: Rủi ro mất khách, Đợt lặp lại, Compliance, Bất thường, Sentiment giảm</p>
          </li>
          <li>
            <strong>📖 Tiêu chí tùy chỉnh</strong>
            <p>16 template có sẵn + AI gợi ý + Tự viết bằng tiếng Việt</p>
          </li>
          <li>
            <strong>⚙️ Cài đặt</strong>
            <p>Bật/tắt Auto QA, ngưỡng chuyển Manual, thời gian xem, sample rate</p>
          </li>
        </ul>
      </div>
    )
  },
  {
    id: 7,
    icon: '🎉',
    title: 'Bạn đã sẵn sàng!',
    subtitle: 'Bắt đầu tạo AI Agent đầu tiên ngay',
    content: (
      <div className="help-step-content">
        <p style={{ marginBottom: 16 }}>Bạn đã nắm được các tính năng chính của MASS CHATBOT. Giờ hãy bắt đầu!</p>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div className="help-card" style={{ flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '24px 16px' }}>
            <span className="help-card-icon" style={{ fontSize: 28, marginBottom: 8 }}>🚀</span>
            <strong style={{ fontSize: 14 }}>Tạo Agent mới</strong>
            <p style={{ fontSize: 12.5, color: 'var(--color-text-sub)', marginTop: 4 }}>Wizard 4 bước hướng dẫn</p>
          </div>
          <div className="help-card" style={{ flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '24px 16px' }}>
            <span className="help-card-icon" style={{ fontSize: 28, marginBottom: 8, color: 'var(--color-primary)' }}>📖</span>
            <strong style={{ fontSize: 14 }}>Xem tài liệu</strong>
            <p style={{ fontSize: 12.5, color: 'var(--color-text-sub)', marginTop: 4 }}>Hướng dẫn chi tiết</p>
          </div>
        </div>

        <div className="help-tip" style={{ marginTop: 24, textAlign: 'center', background: '#fffbeb', borderColor: '#fde68a', color: '#92400e' }}>
          💡 Bạn luôn có thể xem lại hướng dẫn này bằng cách nhấn vào <strong>"?"</strong> ở góc phải header.
        </div>
      </div>
    )
  }
];

const HelpModal: React.FC<Props> = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const stepData = STEPS[currentStep];
  const isLast = currentStep === STEPS.length - 1;

  const handleNext = () => {
    if (!isLast) setCurrentStep(c => c + 1);
    else onClose();
  };

  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep(c => c - 1);
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal help-modal" role="dialog" aria-modal="true">
        
        {/* Header (Dynamic) */}
        <div className="modal-header help-modal-header">
          <div className="help-header-left">
            <div className="help-icon-box">{stepData.icon}</div>
            <div className="help-title-box">
              <h2 className="modal-title">{stepData.title}</h2>
              <p className="help-subtitle">{stepData.subtitle}</p>
            </div>
          </div>
          <button className="modal-close" onClick={onClose} aria-label="Đóng">✕</button>
        </div>

        {/* Progress Bar */}
        <div className="help-progress">
          <span className="help-step-text">Bước {currentStep + 1}/{STEPS.length}</span>
          <div className="help-progress-bar">
            {STEPS.map((s, idx) => (
              <div 
                key={s.id} 
                className={`help-progress-step ${idx <= currentStep ? 'active' : ''}`} 
              />
            ))}
          </div>
          <button className="help-skip-btn" onClick={onClose}>Bỏ qua →</button>
        </div>

        {/* Body */}
        <div className="modal-body help-modal-body">
          {stepData.content}
        </div>

        {/* Footer */}
        <div className="modal-footer help-modal-footer">
          {currentStep > 0 ? (
            <button className="btn btn--ghost" onClick={handlePrev}>&lt; Quay lại</button>
          ) : <div />}
          
          <button className="btn btn--primary" onClick={handleNext}>
            {isLast ? '✓ Bắt đầu ngay' : 'Tiếp theo >'}
          </button>

        </div>

      </div>
    </div>
  );
};

export default HelpModal;
