import React, { useMemo, useState } from 'react';

function parseUserCount(usersLabel: string): number {
  const n = parseInt(usersLabel.replace(/,/g, ''), 10);
  return Number.isFinite(n) ? n : 0;
}

function formatWithCommas(n: number): string {
  return n.toLocaleString('en-US');
}

type AudienceItem = {
  id: string;
  name: string;
  description: string;
  kind: 'all' | 'rule' | 'tag';
  users: string;
  expression: string;
  enabled: boolean;
};

const AUDIENCE_TYPE_OPTIONS: { value: AudienceItem['kind']; label: string }[] = [
  { value: 'rule', label: 'Theo Rule' },
  { value: 'tag', label: 'Theo Tag' },
  { value: 'all', label: 'Tất cả' },
];

const INITIAL_AUDIENCES: AudienceItem[] = [
  {
    id: 'all',
    name: 'Tất cả khách hàng',
    description: 'Áp dụng cho mọi người dùng',
    kind: 'all',
    users: '15,420',
    expression: '',
    enabled: true,
  },
  {
    id: 'premium',
    name: 'Khách hàng Premium',
    description: 'Người dùng đang dùng gói Premium',
    kind: 'rule',
    users: '3,240',
    expression: 'plan_tier = "premium"',
    enabled: true,
  },
  {
    id: 'new',
    name: 'Khách hàng mới',
    description: 'Người dùng mới đăng ký trong 30 ngày',
    kind: 'rule',
    users: '1,856',
    expression: 'days_since_signup <= 30',
    enabled: true,
  },
  {
    id: 'enterprise',
    name: 'Khách hàng Enterprise',
    description: 'Doanh nghiệp dùng gói Enterprise',
    kind: 'rule',
    users: '428',
    expression: 'plan_tier = "enterprise"',
    enabled: true,
  },
  {
    id: 'free',
    name: 'Khách hàng miễn phí',
    description: 'Người dùng gói Free',
    kind: 'rule',
    users: '8,920',
    expression: 'plan_tier = "free"',
    enabled: false,
  },
  {
    id: 'vip',
    name: 'Tag: Hỗ trợ VIP',
    description: 'Khách hàng được gắn tag VIP',
    kind: 'tag',
    users: '156',
    expression: 'tags CONTAINS "vip"',
    enabled: true,
  },
];

const AudienceTargets: React.FC = () => {
  const [audiences, setAudiences] = useState<AudienceItem[]>(INITIAL_AUDIENCES);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newKind, setNewKind] = useState<AudienceItem['kind']>('rule');
  const [newCondition, setNewCondition] = useState('');

  const { appliedGroupCount, usersInScope, totalGroups } = useMemo(() => {
    const enabledRows = audiences.filter((a) => a.enabled);
    const appliedGroupCount = enabledRows.length;
    const usersInScope = enabledRows.reduce((sum, a) => sum + parseUserCount(a.users), 0);
    const totalGroups = audiences.length;
    return { appliedGroupCount, usersInScope, totalGroups };
  }, [audiences]);

  const toggleAudience = (id: string) => {
    setAudiences((prev) =>
      prev.map((row) => (row.id === id ? { ...row, enabled: !row.enabled } : row))
    );
  };

  const resetDrawer = () => {
    setNewName('');
    setNewDesc('');
    setNewKind('rule');
    setNewCondition('');
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    resetDrawer();
  };

  const handleCreateGroup = () => {
    const name = newName.trim() || 'Nhóm mới';
    const description = newDesc.trim() || '—';
    const expression =
      newKind === 'all' ? '' : newCondition.trim();
    const id = `aud-${Date.now().toString(36)}`;
    const row: AudienceItem = {
      id,
      name,
      description,
      kind: newKind,
      users: '0',
      expression,
      enabled: true,
    };
    setAudiences((prev) => [...prev, row]);
    closeDrawer();
  };

  return (
    <div className="audience-page">
      <div className="audience-header">
        <div>
          <h1 className="audience-title">Đối tượng áp dụng</h1>
          <p className="audience-subtitle">Chọn nhóm khách hàng mà AI Agent phục vụ</p>
        </div>
        <button type="button" className="btn btn--primary" onClick={() => setDrawerOpen(true)}>
          <i className="ti-plus" /> Thêm nhóm
        </button>
      </div>

      <div className="audience-stats">
        <div className="audience-stat-card">
          <span className="audience-stat-icon"><i className="ti-user" /></span>
          <div>
            <div className="audience-stat-value">{appliedGroupCount}</div>
            <div className="audience-stat-label">Nhóm đang áp dụng</div>
          </div>
        </div>
        <div className="audience-stat-card">
          <span className="audience-stat-icon audience-stat-icon--green"><i className="ti-tag" /></span>
          <div>
            <div className="audience-stat-value">{formatWithCommas(usersInScope)}</div>
            <div className="audience-stat-label">Người dùng trong scope</div>
          </div>
        </div>
        <div className="audience-stat-card">
          <span className="audience-stat-icon audience-stat-icon--gray"><i className="ti-layers-alt" /></span>
          <div>
            <div className="audience-stat-value">{totalGroups}</div>
            <div className="audience-stat-label">Tổng nhóm</div>
          </div>
        </div>
      </div>

      <div className="audience-search">
        <i className="ti-search" />
        <input placeholder="Tìm nhóm đối tượng..." />
      </div>

      <div className="audience-list">
        {audiences.map((a) => (
          <div key={a.id} className={`audience-row ${!a.enabled ? 'is-disabled' : ''}`}>
            <div className="audience-row__top">
              <div className="audience-row__left">
                <button
                  type="button"
                  className={`audience-switch ${a.enabled ? 'is-on' : 'is-off'}`}
                  onClick={() => toggleAudience(a.id)}
                  aria-pressed={a.enabled}
                  aria-label={a.enabled ? 'Tắt nhóm' : 'Bật nhóm'}
                >
                  <span className="audience-switch__knob" />
                </button>
                <span className={`audience-kind ${a.kind}`}>
                  {a.kind === 'all' ? (
                    <i className="ti-world" />
                  ) : a.kind === 'tag' ? (
                    <i className="ti-tag" />
                  ) : (
                    <span className="audience-kind__hash">#</span>
                  )}
                </span>
                <div>
                  <div className="audience-row__name">
                    {a.name}
                    <span className={`audience-pill ${a.kind}`}>{a.kind === 'all' ? 'Tất cả' : a.kind === 'tag' ? 'Tag' : 'Rule'}</span>
                  </div>
                  <div className="audience-row__desc">{a.description}</div>
                </div>
              </div>
              <div className="audience-row__right">
                <div className="audience-row__users">{a.users}</div>
                <div className="audience-row__users-sub">người dùng</div>
                <button type="button" className="audience-row__menu">⋮</button>
              </div>
            </div>

            {a.expression ? <div className="audience-row__code">{a.expression}</div> : null}
          </div>
        ))}
      </div>

      {drawerOpen ? (
        <div
          className="queue-drawer queue-drawer--audience"
          role="dialog"
          aria-modal="true"
          aria-labelledby="audience-drawer-title"
        >
          <button type="button" className="queue-drawer__backdrop" aria-label="Đóng" onClick={closeDrawer} />
          <aside className="queue-drawer__panel">
            <header className="queue-drawer__header">
              <h2 id="audience-drawer-title" className="queue-drawer__title">
                Thêm nhóm đối tượng
              </h2>
              <button type="button" className="queue-drawer__close" onClick={closeDrawer} aria-label="Đóng">
                ×
              </button>
            </header>

            <div className="queue-drawer__body">
              <div className="form-group">
                <label className="form-label" htmlFor="audience-new-name">Tên nhóm</label>
                <input
                  id="audience-new-name"
                  className="form-input"
                  placeholder="VD: Khách hàng Premium"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="audience-new-desc">Mô tả</label>
                <textarea
                  id="audience-new-desc"
                  className="form-textarea"
                  rows={4}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="audience-new-kind">Loại</label>
                <select
                  id="audience-new-kind"
                  className="form-select"
                  value={newKind}
                  onChange={(e) => setNewKind(e.target.value as AudienceItem['kind'])}
                >
                  {AUDIENCE_TYPE_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="audience-new-condition">Điều kiện</label>
                <textarea
                  id="audience-new-condition"
                  className="form-textarea audience-drawer-condition"
                  rows={4}
                  placeholder='VD: plan_tier = "premium" AND days_since_signup > 7'
                  value={newCondition}
                  onChange={(e) => setNewCondition(e.target.value)}
                  disabled={newKind === 'all'}
                />
              </div>
            </div>

            <footer className="queue-drawer__footer">
              <button type="button" className="btn btn--ghost" onClick={closeDrawer}>
                Hủy
              </button>
              <button type="button" className="btn btn--primary" onClick={handleCreateGroup}>
                <i className="ti-save" /> Tạo nhóm
              </button>
            </footer>
          </aside>
        </div>
      ) : null}
    </div>
  );
};

export default AudienceTargets;

