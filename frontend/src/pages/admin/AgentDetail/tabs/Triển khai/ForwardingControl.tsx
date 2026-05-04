import React, { useMemo, useState } from 'react';

type QueueItem = {
  id: string;
  name: string;
  desc: string;
  waiting: number;
  agentsLabel: string;
  enabled: boolean;
};

const INITIAL_QUEUES: QueueItem[] = [
  {
    id: 'general',
    name: 'General',
    desc: 'Hàng chờ chung cho tất cả agent',
    waiting: 8,
    agentsLabel: '12 agent',
    enabled: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    desc: 'Ưu tiên cho khách hàng Enterprise',
    waiting: 2,
    agentsLabel: '4 agent',
    enabled: true,
  },
  {
    id: 'billing',
    name: 'Billing',
    desc: 'Chuyên xử lý tranh chấp hóa đơn, thanh toán',
    waiting: 1,
    agentsLabel: '3 agent',
    enabled: true,
  },
  {
    id: 'after-hours',
    name: 'After Hours',
    desc: 'Thu thập voicemail ngoài giờ hành chính',
    waiting: 0,
    agentsLabel: '0 agent',
    enabled: false,
  },
];

function formatInt(n: number): string {
  return n.toLocaleString('en-US');
}

const DISTRIBUTION_OPTIONS = ['Round Robin', 'Least busy', 'Priority'];

const ForwardingControl: React.FC = () => {
  const [queues, setQueues] = useState<QueueItem[]>(INITIAL_QUEUES);
  const [addDrawerOpen, setAddDrawerOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newMaxAgents, setNewMaxAgents] = useState('5');
  const [newStrategy, setNewStrategy] = useState('Round Robin');

  const { activeQueueCount, waitingTotal } = useMemo(() => {
    const on = queues.filter((q) => q.enabled);
    return {
      activeQueueCount: on.length,
      waitingTotal: on.reduce((s, q) => s + q.waiting, 0),
    };
  }, [queues]);

  const toggleQueue = (id: string) => {
    setQueues((prev) =>
      prev.map((q) => (q.id === id ? { ...q, enabled: !q.enabled } : q))
    );
  };

  const openAddDrawer = () => {
    setNewName('');
    setNewDesc('');
    setNewMaxAgents('5');
    setNewStrategy('Round Robin');
    setAddDrawerOpen(true);
  };

  const closeAddDrawer = () => setAddDrawerOpen(false);

  const handleCreateQueue = () => {
    const name = newName.trim();
    if (!name) return;
    const max = Math.max(0, parseInt(newMaxAgents, 10) || 0);
    const id = `queue-${Date.now()}`;
    setQueues((prev) => [
      ...prev,
      {
        id,
        name,
        desc: newDesc.trim() || '—',
        waiting: 0,
        agentsLabel: `${max} agent`,
        enabled: true,
      },
    ]);
    closeAddDrawer();
  };

  return (
    <div className="forwarding-page">
      <div className="forwarding-header">
        <div>
          <h1 className="forwarding-title">Chuyển tiếp</h1>
          <p className="forwarding-subtitle">
            Quản lý queue, giờ làm việc và chiến lược routing khi AI chuyển cho agent
          </p>
        </div>
      </div>

      <div className="forwarding-stats">
        <div className="forwarding-stat-card">
          <span className="forwarding-stat-icon"><i className="ti-user" /></span>
          <div>
            <div className="forwarding-stat-value">{activeQueueCount}</div>
            <div className="forwarding-stat-label">Queue đang hoạt động</div>
          </div>
        </div>
        <div className="forwarding-stat-card">
          <span className="forwarding-stat-icon forwarding-stat-icon--green"><i className="ti-control-play" /></span>
          <div>
            <div className="forwarding-stat-value">{formatInt(waitingTotal)}</div>
            <div className="forwarding-stat-label">Hội thoại đang chờ</div>
          </div>
        </div>
        <div className="forwarding-stat-card">
          <span className="forwarding-stat-icon forwarding-stat-icon--yellow"><i className="ti-time" /></span>
          <div>
            <div className="forwarding-stat-value forwarding-stat-value--time">08:00-19:00</div>
            <div className="forwarding-stat-label">Giờ làm việc T2-T6</div>
          </div>
        </div>
      </div>

      <div className="forwarding-tabs">
        <button type="button" className="forwarding-tab active">
          <i className="ti-user" /> Queue
        </button>
        <button type="button" className="forwarding-tab">
          <i className="ti-arrow-right" /> Chiến lược routing
        </button>
        <button type="button" className="forwarding-tab">
          <i className="ti-time" /> Giờ làm việc
        </button>
      </div>

      <div className="forwarding-tools">
        <div className="forwarding-search">
          <i className="ti-search" />
          <input placeholder="Tìm queue..." />
        </div>
        <button type="button" className="btn btn--primary" onClick={openAddDrawer}>
          <i className="ti-plus" /> Thêm queue
        </button>
      </div>

      <div className="forwarding-grid">
        {queues.map((q) => (
          <div key={q.id} className={`queue-card ${!q.enabled ? 'is-disabled' : ''}`}>
            <div className="queue-card__left">
              <button
                type="button"
                className={`audience-switch ${q.enabled ? 'is-on' : 'is-off'}`}
                onClick={() => toggleQueue(q.id)}
                aria-pressed={q.enabled}
                aria-label={q.enabled ? 'Tắt queue' : 'Bật queue'}
              >
                <span className="audience-switch__knob" />
              </button>
              <span className="queue-icon"><i className="ti-user" /></span>
              <div>
                <div className="queue-name">{q.name}</div>
                <div className="queue-desc">{q.desc}</div>
              </div>
            </div>
            <div className="queue-card__right">
              <div className="queue-wait">
                <strong>{formatInt(q.waiting)}</strong>
                <span>đang chờ</span>
              </div>
              <span className="queue-agent-pill">{q.agentsLabel}</span>
              <button type="button" className="queue-menu">⋮</button>
            </div>
          </div>
        ))}
      </div>

      {addDrawerOpen ? (
        <div className="queue-drawer" role="dialog" aria-modal="true" aria-labelledby="queue-drawer-title">
          <button
            type="button"
            className="queue-drawer__backdrop"
            aria-label="Đóng"
            onClick={closeAddDrawer}
          />
          <aside className="queue-drawer__panel">
            <header className="queue-drawer__header">
              <h2 id="queue-drawer-title" className="queue-drawer__title">
                Thêm queue mới
              </h2>
              <button type="button" className="queue-drawer__close" onClick={closeAddDrawer} aria-label="Đóng">
                ×
              </button>
            </header>

            <div className="queue-drawer__body">
              <div className="form-group">
                <label className="form-label" htmlFor="queue-new-name">Tên queue</label>
                <input
                  id="queue-new-name"
                  className="form-input"
                  placeholder="VD: VIP Support"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="queue-new-desc">Mô tả</label>
                <textarea
                  id="queue-new-desc"
                  className="form-textarea"
                  rows={4}
                  placeholder=""
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="queue-new-max">Agent tối đa</label>
                <input
                  id="queue-new-max"
                  className="form-input"
                  type="number"
                  min={0}
                  value={newMaxAgents}
                  onChange={(e) => setNewMaxAgents(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="queue-new-strategy">Chiến lược phân phối</label>
                <select
                  id="queue-new-strategy"
                  className="form-select"
                  value={newStrategy}
                  onChange={(e) => setNewStrategy(e.target.value)}
                >
                  {DISTRIBUTION_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            </div>

            <footer className="queue-drawer__footer">
              <button type="button" className="btn btn--ghost" onClick={closeAddDrawer}>
                Hủy
              </button>
              <button type="button" className="btn btn--primary" onClick={handleCreateQueue}>
                <i className="ti-save" /> Tạo queue
              </button>
            </footer>
          </aside>
        </div>
      ) : null}
    </div>
  );
};

export default ForwardingControl;
