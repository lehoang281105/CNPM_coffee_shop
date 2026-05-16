import React, { useMemo, useState } from 'react';
import AddAudienceGroupDrawer from './AddAudienceGroupDrawer';
import './TargetAudience.css';

type BadgeType = 'all' | 'rule' | 'tag';
type IconMod = 'globe' | 'rule' | 'tag' | 'rule-off';

interface AudienceGroup {
  id: string;
  name: string;
  description: string;
  badge: BadgeType;
  badgeLabel: string;
  icon: string;
  iconMod: IconMod;
  users: number;
  rule?: string;
  enabledDefault: boolean;
}

const STATS = [
  { id: 'applied', value: '5', label: 'Nhóm đang áp dụng', icon: 'ti-user', mod: 'blue' },
  { id: 'scope', value: '21,100', label: 'Người dùng trong scope', icon: 'ti-tag', mod: 'green' },
  { id: 'total', value: '6', label: 'Tổng nhóm', icon: 'ti-layers', mod: 'purple' },
];

const GROUPS: AudienceGroup[] = [
  {
    id: 'all',
    name: 'Tất cả khách hàng',
    description: 'Áp dụng cho mọi người dùng',
    badge: 'all',
    badgeLabel: 'Tất cả',
    icon: 'ti-world',
    iconMod: 'globe',
    users: 15420,
    enabledDefault: true,
  },
  {
    id: 'premium',
    name: 'Khách hàng Premium',
    description: 'Người dùng đang dùng gói Premium',
    badge: 'rule',
    badgeLabel: 'Rule',
    icon: 'ti-layout-grid2',
    iconMod: 'rule',
    users: 3240,
    rule: 'plan_tier = "premium"',
    enabledDefault: true,
  },
  {
    id: 'new',
    name: 'Khách hàng mới',
    description: 'Người dùng mới đăng ký trong 30 ngày',
    badge: 'rule',
    badgeLabel: 'Rule',
    icon: 'ti-layout-grid2',
    iconMod: 'rule',
    users: 1856,
    rule: 'days_since_signup <= 30',
    enabledDefault: true,
  },
  {
    id: 'enterprise',
    name: 'Khách hàng Enterprise',
    description: 'Doanh nghiệp dùng gói Enterprise',
    badge: 'rule',
    badgeLabel: 'Rule',
    icon: 'ti-layout-grid2',
    iconMod: 'rule',
    users: 428,
    rule: 'plan_tier = "enterprise"',
    enabledDefault: true,
  },
  {
    id: 'free',
    name: 'Khách hàng miễn phí',
    description: 'Người dùng gói Free',
    badge: 'rule',
    badgeLabel: 'Rule',
    icon: 'ti-layout-grid2',
    iconMod: 'rule-off',
    users: 8920,
    rule: 'plan_tier = "free"',
    enabledDefault: false,
  },
  {
    id: 'vip-tag',
    name: 'Tag: Hỗ trợ VIP',
    description: 'Khách hàng được gắn tag VIP',
    badge: 'tag',
    badgeLabel: 'Tag',
    icon: 'ti-tag',
    iconMod: 'tag',
    users: 156,
    rule: 'tags CONTAINS "vip"',
    enabledDefault: true,
  },
];

function formatUsers(n: number) {
  return `${n.toLocaleString('vi-VN')} người dùng`;
}

const TargetAudience: React.FC = () => {
  const [search, setSearch] = useState('');
  const [showAddDrawer, setShowAddDrawer] = useState(false);
  const [enabledMap, setEnabledMap] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(GROUPS.map((g) => [g.id, g.enabledDefault])),
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return GROUPS;
    return GROUPS.filter(
      (g) =>
        g.name.toLowerCase().includes(q) ||
        g.description.toLowerCase().includes(q) ||
        (g.rule && g.rule.toLowerCase().includes(q)),
    );
  }, [search]);

  const toggleGroup = (id: string) => {
    setEnabledMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="target-audience">
      <header className="target-audience-header">
        <div className="target-audience-header-text">
          <h1 className="target-audience-title">Đối tượng áp dụng</h1>
          <p className="target-audience-subtitle">
            Chọn nhóm khách hàng mà AI Agent phục vụ
          </p>
        </div>
        <button
          type="button"
          className="target-audience-add-btn"
          onClick={() => setShowAddDrawer(true)}
        >
          <i className="ti-plus" aria-hidden />
          Thêm nhóm
        </button>
      </header>

      <div className="target-audience-stats">
        {STATS.map((stat) => (
          <div key={stat.id} className="target-audience-stat-card">
            <span className={`target-audience-stat-icon target-audience-stat-icon--${stat.mod}`}>
              <i className={stat.icon} aria-hidden />
            </span>
            <div>
              <strong className="target-audience-stat-value">{stat.value}</strong>
              <span className="target-audience-stat-label">{stat.label}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="target-audience-search-wrap">
        <span className="target-audience-search-icon" aria-hidden>
          <i className="ti-search" />
        </span>
        <input
          type="search"
          className="target-audience-search"
          placeholder="Tìm nhóm đối tượng..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Tìm nhóm đối tượng"
        />
      </div>

      <ul className="target-audience-list">
        {filtered.map((group) => {
          const enabled = enabledMap[group.id];
          const iconMod = enabled ? group.iconMod : group.iconMod === 'rule' ? 'rule-off' : group.iconMod;

          return (
            <li
              key={group.id}
              className={`target-audience-card${!enabled ? ' target-audience-card--off' : ''}`}
            >
              <button
                type="button"
                role="switch"
                aria-checked={enabled}
                className={`target-audience-toggle${enabled ? ' is-on' : ''}`}
                onClick={() => toggleGroup(group.id)}
                aria-label={`${enabled ? 'Tắt' : 'Bật'} nhóm ${group.name}`}
              >
                <span className="target-audience-toggle-thumb" />
              </button>

              <span className={`target-audience-icon target-audience-icon--${iconMod}`}>
                {iconMod === 'rule' || iconMod === 'rule-off' ? (
                  <span className="target-audience-hash" aria-hidden>#</span>
                ) : (
                  <i className={group.icon} aria-hidden />
                )}
              </span>

              <div className="target-audience-card-body">
                <div className="target-audience-card-title-row">
                  <h3 className="target-audience-card-name">{group.name}</h3>
                  <span className={`target-audience-badge target-audience-badge--${group.badge}`}>
                    {group.badgeLabel}
                  </span>
                </div>
                <p className="target-audience-card-desc">{group.description}</p>
                {group.rule && (
                  <pre className="target-audience-rule">{group.rule}</pre>
                )}
              </div>

              <div className="target-audience-card-side">
                <span className="target-audience-users">{formatUsers(group.users)}</span>
                <button
                  type="button"
                  className="target-audience-menu-btn"
                  aria-label="Tùy chọn nhóm"
                >
                  <i className="ti-more-alt" aria-hidden />
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      {filtered.length === 0 && (
        <p className="target-audience-empty">Không tìm thấy nhóm phù hợp.</p>
      )}

      <AddAudienceGroupDrawer
        open={showAddDrawer}
        onClose={() => setShowAddDrawer(false)}
      />
    </div>
  );
};

export default TargetAudience;
