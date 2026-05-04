import React, { useMemo, useState } from 'react';

type Channel = {
  id: string;
  name: string;
  icon: string;
  status: 'active' | 'idle' | 'off';
  chats: string;
  avgReply: string;
  activeHours: string;
};

type ChannelKindId = 'webchat' | 'facebook' | 'instagram' | 'zalo' | 'whatsapp' | 'email';

const CHANNEL_KIND_OPTIONS: {
  id: ChannelKindId;
  title: string;
  desc: string;
  icon: string;
}[] = [
  { id: 'webchat', title: 'Webchat', desc: 'Widget chat trên website', icon: 'ti-comment' },
  { id: 'facebook', title: 'Facebook Messenger', desc: 'Tích hợp Fanpage Facebook', icon: 'ti-world' },
  { id: 'instagram', title: 'Instagram', desc: 'Tích hợp Instagram DM + Comment', icon: 'ti-instagram' },
  { id: 'zalo', title: 'Zalo OA', desc: 'Kênh Zalo Official Account', icon: 'ti-mobile' },
  { id: 'whatsapp', title: 'WhatsApp', desc: 'WhatsApp Business API', icon: 'ti-comment-alt' },
  { id: 'email', title: 'Email', desc: 'Hộp thư hỗ trợ email', icon: 'ti-email' },
];

const WIDGET_POSITIONS = ['Góc phải dưới', 'Góc trái dưới', 'Góc phải trên', 'Góc trái trên'];
const THEME_OPTIONS = ['Sáng', 'Tối'];

function parseChats(label: string): number {
  const n = parseInt(label.replace(/,/g, ''), 10);
  return Number.isFinite(n) ? n : 0;
}

function formatInt(n: number): string {
  return n.toLocaleString('en-US');
}

function iconForKind(kind: ChannelKindId): string {
  const row = CHANNEL_KIND_OPTIONS.find((c) => c.id === kind);
  return row?.icon ?? 'ti-comment';
}

const INITIAL_CHANNELS: Channel[] = [
  { id: '1', name: 'Webchat', icon: 'ti-comment', status: 'active', chats: '2,847', avgReply: '1.8s', activeHours: 'T2-T6: 08:00-21:00' },
  { id: '2', name: 'Facebook — Thẩm Viện ...', icon: 'ti-facebook', status: 'active', chats: '1,234', avgReply: '2.1s', activeHours: 'T2-T6: 07:00-22:00' },
  { id: '3', name: 'Zalo OA — Seoul Center', icon: 'ti-mobile', status: 'active', chats: '856', avgReply: '1.5s', activeHours: 'Không giới hạn' },
  { id: '4', name: 'Instagram — @seoul.ce...', icon: 'ti-instagram', status: 'off', chats: '0', avgReply: '—', activeHours: 'Không giới hạn' },
  { id: '5', name: 'WhatsApp', icon: 'ti-comment-alt', status: 'off', chats: '0', avgReply: '—', activeHours: 'Không giới hạn' },
  { id: '6', name: 'Email', icon: 'ti-email', status: 'off', chats: '0', avgReply: '—', activeHours: 'Không giới hạn' },
];

const DeploymentChannels: React.FC = () => {
  const [channels, setChannels] = useState<Channel[]>(INITIAL_CHANNELS);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [kind, setKind] = useState<ChannelKindId>('webchat');
  const [channelName, setChannelName] = useState('');
  const [widgetPos, setWidgetPos] = useState('Góc phải dưới');
  const [theme, setTheme] = useState('Sáng');
  const [welcomeMsg, setWelcomeMsg] = useState('');

  const { activeCount, totalCount, chatsSum, scheduledCount } = useMemo(() => {
    const totalCount = channels.length;
    const activeCount = channels.filter((c) => c.status === 'active').length;
    const chatsSum = channels.reduce((s, c) => s + parseChats(c.chats), 0);
    const scheduledCount = channels.filter((c) => c.activeHours !== 'Không giới hạn').length;
    return { activeCount, totalCount, chatsSum, scheduledCount };
  }, [channels]);

  const resetDrawer = () => {
    setKind('webchat');
    setChannelName('');
    setWidgetPos('Góc phải dưới');
    setTheme('Sáng');
    setWelcomeMsg('');
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    resetDrawer();
  };

  const handleAddChannel = () => {
    const opt = CHANNEL_KIND_OPTIONS.find((c) => c.id === kind);
    const name =
      channelName.trim() ||
      (opt ? `${opt.title} — Kênh mới` : 'Kênh mới');
    const id = `ch-${Date.now().toString(36)}`;
    const row: Channel = {
      id,
      name,
      icon: iconForKind(kind),
      status: 'active',
      chats: '0',
      avgReply: '—',
      activeHours: 'Không giới hạn',
    };
    setChannels((prev) => [...prev, row]);
    closeDrawer();
  };

  return (
    <div className="channels-page">
      <div className="channels-header">
        <div>
          <h1 className="channels-title">Kênh triển khai</h1>
          <p className="channels-subtitle">Quản lý kênh, Page và giờ hoạt động của AI Agent</p>
        </div>
        <button type="button" className="btn btn--primary" onClick={() => setDrawerOpen(true)}>
          <i className="ti-plus" /> Thêm kênh
        </button>
      </div>

      <div className="channels-stats">
        <div className="channels-stat-card">
          <span className="channels-stat-icon"><i className="ti-comment" /></span>
          <div>
            <div className="channels-stat-value">
              {activeCount}/{totalCount}
            </div>
            <div className="channels-stat-label">Kênh đang hoạt động</div>
          </div>
        </div>
        <div className="channels-stat-card">
          <span className="channels-stat-icon channels-stat-icon--green"><i className="ti-check-box" /></span>
          <div>
            <div className="channels-stat-value">{formatInt(chatsSum)}</div>
            <div className="channels-stat-label">Tổng hội thoại</div>
          </div>
        </div>
        <div className="channels-stat-card">
          <span className="channels-stat-icon channels-stat-icon--yellow"><i className="ti-time" /></span>
          <div>
            <div className="channels-stat-value">{scheduledCount}</div>
            <div className="channels-stat-label">Kênh có giờ hoạt động</div>
          </div>
        </div>
      </div>

      <div className="channels-search">
        <i className="ti-search" />
        <input placeholder="Tìm kênh..." />
      </div>

      <div className="channels-grid">
        {channels.map((c) => (
          <div key={c.id} className="channel-card">
            <div className="channel-card__top">
              <div className="channel-card__title-wrap">
                <span className="channel-card__icon"><i className={c.icon} /></span>
                <div>
                  <div className="channel-card__name">{c.name}</div>
                  <div className="channel-card__badges">
                    {c.status === 'active' ? (
                      <>
                        <span className="channel-pill channel-pill--active">Hoạt động</span>
                        <span className="channel-pill channel-pill--idle">Có giờ</span>
                      </>
                    ) : (
                      <span className="channel-pill channel-pill--off">Tắt</span>
                    )}
                  </div>
                </div>
              </div>
              <button type="button" className="channel-card__menu">⋮</button>
            </div>

            <div className="channel-card__meta-row">
              <span>Hội thoại</span>
              <strong>{c.chats}</strong>
            </div>
            <div className="channel-card__meta-row">
              <span>Phản hồi TB</span>
              <strong>{c.avgReply}</strong>
            </div>
            <div className="channel-card__meta-row">
              <span><i className="ti-time" /> Giờ hoạt động</span>
              <strong className="channel-card__hours">{c.activeHours}</strong>
            </div>
          </div>
        ))}
      </div>

      {drawerOpen ? (
        <div
          className="queue-drawer queue-drawer--channels"
          role="dialog"
          aria-modal="true"
          aria-labelledby="channel-drawer-title"
        >
          <button type="button" className="queue-drawer__backdrop" aria-label="Đóng" onClick={closeDrawer} />
          <aside className="queue-drawer__panel">
            <header className="queue-drawer__header">
              <h2 id="channel-drawer-title" className="queue-drawer__title">
                Thêm kênh mới
              </h2>
              <button type="button" className="queue-drawer__close" onClick={closeDrawer} aria-label="Đóng">
                ×
              </button>
            </header>

            <div className="queue-drawer__body">
              <div className="form-group">
                <span className="form-label">Chọn loại kênh</span>
                <div className="channel-drawer-type-grid">
                  {CHANNEL_KIND_OPTIONS.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      className={`channel-type-card ${kind === t.id ? 'is-selected' : ''}`}
                      onClick={() => setKind(t.id)}
                    >
                      <span className="channel-type-card__icon">
                        <i className={t.icon} />
                      </span>
                      <span className="channel-type-card__text">
                        <span className="channel-type-card__title">{t.title}</span>
                        <span className="channel-type-card__desc">{t.desc}</span>
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="channel-new-name">Tên kênh</label>
                <input
                  id="channel-new-name"
                  className="form-input"
                  placeholder="VD: Facebook — Thẩm Viện Seoul"
                  value={channelName}
                  onChange={(e) => setChannelName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="channel-widget-pos">Vị trí widget</label>
                <select
                  id="channel-widget-pos"
                  className="form-select"
                  value={widgetPos}
                  onChange={(e) => setWidgetPos(e.target.value)}
                >
                  {WIDGET_POSITIONS.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="channel-theme">Giao diện</label>
                <select
                  id="channel-theme"
                  className="form-select"
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                >
                  {THEME_OPTIONS.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="channel-welcome">Tin nhắn chào mừng</label>
                <textarea
                  id="channel-welcome"
                  className="form-textarea"
                  rows={5}
                  value={welcomeMsg}
                  onChange={(e) => setWelcomeMsg(e.target.value)}
                />
              </div>
            </div>

            <footer className="queue-drawer__footer queue-drawer__footer--split">
              <button type="button" className="btn btn--ghost" onClick={closeDrawer}>
                Hủy
              </button>
              <button type="button" className="btn btn--primary" onClick={handleAddChannel}>
                <i className="ti-save" /> Thêm kênh
              </button>
            </footer>
          </aside>
        </div>
      ) : null}
    </div>
  );
};

export default DeploymentChannels;
