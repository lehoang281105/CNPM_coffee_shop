import React, { useMemo } from 'react';

type DeployHistoryItem = {
  id: string;
  statusLabel: 'Thành công' | 'Thất bại';
  version: string;
  env: 'Production' | 'Staging';
  author: string;
  message: string;
  dateTimeLabel: string;
  metaRight: string;
};

const DeployOverview: React.FC = () => {
  const cards = useMemo(
    () => [
      {
        title: 'Kênh',
        subtitle: '3/6 hoạt động',
        icon: 'ti-world',
        items: ['Webchat', 'Facebook Messenger', 'Zalo OA'],
      },
      {
        title: 'Đối tượng',
        subtitle: '2/3 nhóm',
        icon: 'ti-user',
        items: ['Tất cả khách hàng', 'Khách hàng mới'],
      },
      {
        title: 'Hành vi',
        subtitle: '4/5 quy tắc',
        icon: 'ti-bolt',
        items: ['Greeting tự động', 'Auto follow-up', 'Chuyển ngôn ngữ', 'Anti-spam'],
      },
      {
        title: 'Chuyển tiếp',
        subtitle: '3/3 quy tắc',
        icon: 'ti-share',
        items: ['Escalate tự động', 'Enterprise ưu tiên', 'Pháp lý → Legal'],
      },
    ],
    []
  );

  const history = useMemo<DeployHistoryItem[]>(
    () => [
      {
        id: 'h1',
        statusLabel: 'Thành công',
        version: 'v2.3.0',
        env: 'Production',
        author: 'Nguyễn Thị Hương',
        message: 'Cập nhật kênh Facebook, thêm kịch bản Đặt lịch',
        dateTimeLabel: '03/04/2026 21:30',
        metaRight: '3 kênh • 5 hành vi',
      },
      {
        id: 'h2',
        statusLabel: 'Thành công',
        version: 'v2.2.1',
        env: 'Production',
        author: 'Trần Văn Minh',
        message: 'Sửa lỗi routing Zalo, cập nhật gợi hoạt động',
        dateTimeLabel: '02/04/2026 16:15',
        metaRight: '3 kênh • 4 hành vi',
      },
      {
        id: 'h3',
        statusLabel: 'Thành công',
        version: 'v2.2.0',
        env: 'Production',
        author: 'Nguyễn Thị Hồng',
        message: 'Thêm kênh Instagram, cập nhật giao diện widget',
        dateTimeLabel: '01/04/2026 23:45',
        metaRight: '4 kênh • 4 hành vi',
      },
    ],
    []
  );

  return (
    <>
      <div className="deploy-header">
        <div>
          <h1 className="deploy-title">Triển khai</h1>
          <p className="deploy-subtitle">Xem tổng quan cấu hình, deploy và lịch sử phiên bản</p>
        </div>
        <div className="deploy-actions">
          <span className="deploy-pill">
            <span className="deploy-pill__dot" />
            Đang hoạt động — v2.3.0
          </span>
          <button className="btn btn--primary">
            <i className="ti-rocket" /> Deploy ngay
          </button>
        </div>
      </div>

      <div className="deploy-cards">
        {cards.map((c) => (
          <div key={c.title} className="deploy-card">
            <div className="deploy-card__top">
              <div className="deploy-card__left">
                <div className="deploy-card__title-row">
                  <span className="deploy-card__icon">
                    <i className={c.icon} />
                  </span>
                  <div>
                    <div className="deploy-card__title">{c.title}</div>
                    <div className="deploy-card__subtitle">{c.subtitle}</div>
                  </div>
                </div>
              </div>
              <span className="deploy-card__chev">›</span>
            </div>

            <div className="deploy-card__list">
              {c.items.map((it) => (
                <div key={it} className="deploy-card__item">
                  <span className="deploy-card__check" />
                  <span>{it}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="deploy-history">
        <div className="deploy-history__header">
          <div className="deploy-history__title">
            <span className="deploy-history__icon">
              <i className="ti-time" />
            </span>
            <div>
              <div className="deploy-history__h">Lịch sử Deploy</div>
              <div className="deploy-history__sub">{history.length} phiên bản</div>
            </div>
          </div>
          <button className="deploy-history__all">
            Xem tất cả <span className="deploy-history__chev">›</span>
          </button>
        </div>

        <div className="deploy-history__list">
          {history.map((h) => (
            <div key={h.id} className="deploy-history__row">
              <div className="deploy-history__row-left">
                <div className="deploy-history__badges">
                  <span className="deploy-badge deploy-badge--success">
                    <span className="deploy-badge__dot" /> {h.statusLabel}
                  </span>
                  <span className="deploy-badge deploy-badge--muted">{h.version}</span>
                  <span className="deploy-badge deploy-badge--outline">{h.env}</span>
                </div>

                <div className="deploy-history__meta">
                  <span className="deploy-history__author">
                    <i className="ti-user" /> {h.author}
                  </span>
                  <span className="deploy-history__msg">{h.message}</span>
                </div>
              </div>

              <div className="deploy-history__row-right">
                <div className="deploy-history__date">
                  <i className="ti-calendar" /> {h.dateTimeLabel}
                </div>
                <div className="deploy-history__right-sub">{h.metaRight}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default DeployOverview;

