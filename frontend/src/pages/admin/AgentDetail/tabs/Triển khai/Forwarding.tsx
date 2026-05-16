import React, { useMemo, useState } from 'react';
import AddQueueDrawer from './AddQueueDrawer';
import './Forwarding.css';

type TabId = 'queue' | 'routing' | 'hours';

interface QueueItem {
  id: string;
  name: string;
  description: string;
  waiting: number;
  agents: number;
  enabledDefault: boolean;
}

const STATS = [
  { id: 'queues', value: '3', label: 'Queue đang hoạt động', icon: 'ti-user', mod: 'blue' },
  { id: 'waiting', value: '11', label: 'Hội thoại đang chờ', icon: 'ti-control-play', mod: 'green' },
  { id: 'hours', value: '08:00-19:00', label: 'Giờ làm việc T2-T6', icon: 'ti-time', mod: 'amber' },
];

const TABS: { id: TabId; label: string; icon: string }[] = [
  { id: 'queue', label: 'Queue', icon: 'ti-user' },
  { id: 'routing', label: 'Chiến lược routing', icon: 'ti-share' },
  { id: 'hours', label: 'Giờ làm việc', icon: 'ti-time' },
];

const QUEUES: QueueItem[] = [
  {
    id: 'general',
    name: 'General',
    description: 'Hàng chờ chung cho tất cả agent',
    waiting: 8,
    agents: 12,
    enabledDefault: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'Ưu tiên cho khách hàng Enterprise',
    waiting: 2,
    agents: 4,
    enabledDefault: true,
  },
  {
    id: 'billing',
    name: 'Billing',
    description: 'Chuyên xử lý tranh chấp hóa đơn, thanh toán',
    waiting: 1,
    agents: 3,
    enabledDefault: true,
  },
  {
    id: 'after-hours',
    name: 'After Hours',
    description: 'Thu thập voicemail ngoài giờ hành chính',
    waiting: 0,
    agents: 0,
    enabledDefault: false,
  },
];

const Forwarding: React.FC = () => {
  const [showAddDrawer, setShowAddDrawer] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>('queue');
  const [search, setSearch] = useState('');
  const [enabledMap, setEnabledMap] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(QUEUES.map((q) => [q.id, q.enabledDefault])),
  );

  const filteredQueues = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return QUEUES;
    return QUEUES.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q),
    );
  }, [search]);

  const toggleQueue = (id: string) => {
    setEnabledMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="forwarding">
      <header className="forwarding-header">
        <div className="forwarding-header-text">
          <h1 className="forwarding-title">Chuyển tiếp</h1>
          <p className="forwarding-subtitle">
            Quản lý queue, giờ làm việc và chiến lược routing khi AI chuyển cho agent
          </p>
        </div>
      </header>

      <div className="forwarding-stats">
        {STATS.map((stat) => (
          <div key={stat.id} className="forwarding-stat-card">
            <span className={`forwarding-stat-icon forwarding-stat-icon--${stat.mod}`}>
              <i className={stat.icon} aria-hidden />
            </span>
            <div>
              <strong className="forwarding-stat-value">{stat.value}</strong>
              <span className="forwarding-stat-label">{stat.label}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="forwarding-tabs" role="tablist" aria-label="Chuyển tiếp">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.id}
            className={`forwarding-tab${activeTab === tab.id ? ' is-active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <i className={tab.icon} aria-hidden />
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'queue' && (
        <>
          <div className="forwarding-toolbar">
            <div className="forwarding-search-wrap">
              <span className="forwarding-search-icon" aria-hidden>
                <i className="ti-search" />
              </span>
              <input
                type="search"
                className="forwarding-search"
                placeholder="Tìm queue..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Tìm queue"
              />
            </div>
            <button
              type="button"
              className="forwarding-add-btn"
              onClick={() => setShowAddDrawer(true)}
            >
              <i className="ti-plus" aria-hidden />
              Thêm queue
            </button>
          </div>

          <div className="forwarding-queue-grid">
            {filteredQueues.map((queue) => {
              const enabled = enabledMap[queue.id];
              return (
                <article
                  key={queue.id}
                  className={`forwarding-queue-card${!enabled ? ' forwarding-queue-card--off' : ''}`}
                >
                  <button
                    type="button"
                    role="switch"
                    aria-checked={enabled}
                    className={`forwarding-toggle${enabled ? ' is-on' : ''}`}
                    onClick={() => toggleQueue(queue.id)}
                    aria-label={`${enabled ? 'Tắt' : 'Bật'} queue ${queue.name}`}
                  >
                    <span className="forwarding-toggle-thumb" />
                  </button>
                  <span className={`forwarding-queue-icon${enabled ? '' : ' is-off'}`}>
                    <i className="ti-user" aria-hidden />
                  </span>
                  <div className="forwarding-queue-info">
                    <h3 className="forwarding-queue-name">{queue.name}</h3>
                    <p className="forwarding-queue-desc">{queue.description}</p>
                  </div>
                  <div className="forwarding-queue-metrics">
                    <span className="forwarding-queue-waiting">
                      <strong>{queue.waiting}</strong> đang chờ
                    </span>
                    <span className="forwarding-queue-agents">{queue.agents} agent</span>
                  </div>
                  <button
                    type="button"
                    className="forwarding-menu-btn"
                    aria-label="Tùy chọn queue"
                  >
                    <i className="ti-more-alt" aria-hidden />
                  </button>
                </article>
              );
            })}
          </div>

          {filteredQueues.length === 0 && (
            <p className="forwarding-empty">Không tìm thấy queue phù hợp.</p>
          )}
        </>
      )}

      {activeTab === 'routing' && (
        <div className="forwarding-panel">
          <h3 className="forwarding-panel-title">Chiến lược routing</h3>
          <p className="forwarding-panel-desc">
            Round-robin theo queue, ưu tiên Enterprise trước General khi agent online.
          </p>
          <ul className="forwarding-panel-list">
            <li>Enterprise → Billing → General</li>
            <li>Fallback sang After Hours khi ngoài giờ làm việc</li>
            <li>Giới hạn tối đa 3 hội thoại / agent</li>
          </ul>
        </div>
      )}

      {activeTab === 'hours' && (
        <div className="forwarding-panel">
          <h3 className="forwarding-panel-title">Giờ làm việc</h3>
          <p className="forwarding-panel-desc">Thời gian agent nhận chuyển tiếp từ AI.</p>
          <div className="forwarding-hours-card">
            <span className="forwarding-hours-range">08:00 – 19:00</span>
            <span className="forwarding-hours-days">Thứ 2 – Thứ 6</span>
          </div>
        </div>
      )}

      <AddQueueDrawer
        open={showAddDrawer}
        onClose={() => setShowAddDrawer(false)}
      />
    </div>
  );
};

export default Forwarding;
