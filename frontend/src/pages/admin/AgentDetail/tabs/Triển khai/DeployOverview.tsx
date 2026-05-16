import React from 'react';
import './DeployOverview.css';

const SUMMARY_CARDS = [
  {
    id: 'channels',
    title: 'Kênh',
    stat: '3/6 hoạt động',
    icon: 'ti-world',
    iconMod: 'blue',
    items: ['Webchat', 'Facebook Messenger', 'Zalo OA'],
  },
  {
    id: 'audience',
    title: 'Đối tượng',
    stat: '2/3 nhóm',
    icon: 'ti-user',
    iconMod: 'green',
    items: ['Tất cả khách hàng', 'Khách hàng mới'],
  },
  {
    id: 'behavior',
    title: 'Hành vi',
    stat: '4/5 quy tắc',
    icon: 'ti-bolt',
    iconMod: 'amber',
    items: ['Greeting tự động', 'Auto follow-up', 'Chuyển ngôn ngữ', 'Anti-spam'],
  },
  {
    id: 'forwarding',
    title: 'Chuyển tiếp',
    stat: '3/3 quy tắc',
    icon: 'ti-share-alt',
    iconMod: 'purple',
    items: ['Escalade tự động', 'Enterprise ưu tiên', 'Pháp lý → Legal'],
  },
];

const DEPLOY_HISTORY = [
  {
    version: 'v2.3.0',
    user: 'Nguyễn Thị Hương',
    description: 'Cập nhật kênh Facebook, thêm kịch bản Đặt lịch',
    date: '03/04/2026 21:30',
    meta: '3 kênh · 5 hành vi',
  },
  {
    version: 'v2.2.1',
    user: 'Trần Văn Minh',
    description: 'Sửa lỗi routing Zalo, cập nhật giờ hoạt động',
    date: '02/04/2026 16:15',
    meta: '3 kênh · 4 hành vi',
  },
  {
    version: 'v2.2.0',
    user: 'Nguyễn Thị Hương',
    description: 'Thêm kênh Instagram, cập nhật giao diện widget',
    date: '01/04/2026 23:45',
    meta: '4 kênh · 5 hành vi',
  },
];

interface DeployOverviewProps {
  version?: string;
}

const DeployOverview: React.FC<DeployOverviewProps> = ({ version = 'v2.3.0' }) => {
  return (
    <div className="deploy-overview">
      <header className="deploy-header">
        <div className="deploy-header-text">
          <h1 className="deploy-title">Triển khai</h1>
          <p className="deploy-subtitle">
            Xem tổng quan cấu hình, deploy và lịch sử phiên bản
          </p>
        </div>
        <div className="deploy-header-actions">
          <span className="deploy-status-pill">
            <span className="deploy-status-dot" aria-hidden />
            Đang hoạt động — {version}
          </span>
          <button type="button" className="deploy-btn-primary">
            <i className="ti-rocket" aria-hidden />
            Deploy ngay
          </button>
        </div>
      </header>

      <div className="deploy-summary-grid">
        {SUMMARY_CARDS.map((card) => (
          <button key={card.id} type="button" className="deploy-summary-card">
            <div className="deploy-summary-card-top">
              <span className={`deploy-summary-icon deploy-summary-icon--${card.iconMod}`}>
                <i className={card.icon} aria-hidden />
              </span>
              <span className="deploy-summary-chevron" aria-hidden>
                <i className="ti-angle-right" />
              </span>
            </div>
            <h3 className="deploy-summary-title">{card.title}</h3>
            <p className="deploy-summary-stat">{card.stat}</p>
            <ul className="deploy-summary-list">
              {card.items.map((item) => (
                <li key={item}>
                  <i className="ti-check deploy-check-icon" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </button>
        ))}
      </div>

      <section className="deploy-history">
        <header className="deploy-history-header">
          <div className="deploy-history-title-wrap">
            <span className="deploy-history-icon" aria-hidden>
              <i className="ti-time" />
            </span>
            <div>
              <h2 className="deploy-history-title">Lịch sử Deploy</h2>
              <p className="deploy-history-count">5 phiên bản</p>
            </div>
          </div>
          <button type="button" className="deploy-view-all">
            Xem tất cả <i className="ti-angle-right" aria-hidden />
          </button>
        </header>

        <ul className="deploy-history-list">
          {DEPLOY_HISTORY.map((row) => (
            <li key={row.version} className="deploy-history-row">
              <div className="deploy-history-row-main">
                <div className="deploy-history-badges">
                  <span className="deploy-badge deploy-badge--success">
                    <i className="ti-check" aria-hidden />
                    Thành công
                  </span>
                  <span className="deploy-version">{row.version}</span>
                  <span className="deploy-badge deploy-badge--env">Production</span>
                </div>
                <div className="deploy-history-meta-line">
                  <span className="deploy-history-user">
                    <i className="ti-user" aria-hidden />
                    {row.user}
                  </span>
                  <span className="deploy-history-desc">
                    <i className="ti-file" aria-hidden />
                    {row.description}
                  </span>
                </div>
              </div>
              <div className="deploy-history-row-side">
                <time className="deploy-history-time">{row.date}</time>
                <span className="deploy-history-scope">{row.meta}</span>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default DeployOverview;
