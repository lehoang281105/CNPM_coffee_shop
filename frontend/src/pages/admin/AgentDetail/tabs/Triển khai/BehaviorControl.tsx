import React, { useMemo, useState } from 'react';
import AddBehaviorRuleDrawer from './AddBehaviorRuleDrawer';
import './BehaviorControl.css';

type FilterId = 'all' | 'conversation-start' | 'message' | 'timeout' | 'intent';
type Priority = 'high' | 'medium' | 'low';
type GroupMod = 'conversation-start' | 'timeout' | 'message' | 'intent';

interface BehaviorRule {
  id: string;
  groupId: FilterId;
  name: string;
  description: string;
  priority: Priority;
  priorityLabel: string;
  icon: string;
  iconMod: GroupMod;
  triggerLabel: string;
  actionLabel: string;
  activations: number;
  enabledDefault: boolean;
}

interface RuleGroup {
  id: FilterId;
  title: string;
  mod: GroupMod;
  rules: BehaviorRule[];
}

const STATS = [
  { id: 'active', value: '4/5', label: 'Đang hoạt động', icon: 'ti-bolt', mod: 'blue' },
  { id: 'activations', value: '17,370', label: 'Lần kích hoạt', icon: 'ti-control-play', mod: 'green' },
  { id: 'groups', value: '3', label: 'Nhóm trigger', icon: 'ti-shield', mod: 'gray' },
];

const FILTERS: { id: FilterId; label: string }[] = [
  { id: 'all', label: 'Tất cả' },
  { id: 'conversation-start', label: 'Bắt đầu hội thoại' },
  { id: 'message', label: 'Nhận tin nhắn' },
  { id: 'timeout', label: 'Timeout' },
  { id: 'intent', label: 'Phát hiện intent' },
];

const RULE_GROUPS: RuleGroup[] = [
  {
    id: 'conversation-start',
    title: 'Bắt đầu hội thoại',
    mod: 'conversation-start',
    rules: [
      {
        id: 'greeting',
        groupId: 'conversation-start',
        name: 'Greeting tự động',
        description: 'AI tự động chào hỏi khi khách mở chat lần đầu',
        priority: 'high',
        priorityLabel: 'Ưu tiên cao',
        icon: 'ti-comment',
        iconMod: 'conversation-start',
        triggerLabel: 'Bắt đầu hội thoại',
        actionLabel: 'Send welcome message from KB',
        activations: 12847,
        enabledDefault: true,
      },
    ],
  },
  {
    id: 'timeout',
    title: 'Timeout',
    mod: 'timeout',
    rules: [
      {
        id: 'followup',
        groupId: 'timeout',
        name: 'Auto follow-up 5 phút',
        description: 'Nếu khách không phản hồi sau 5 phút, AI nhắn nhắc nhẹ',
        priority: 'medium',
        priorityLabel: 'Trung bình',
        icon: 'ti-time',
        iconMod: 'timeout',
        triggerLabel: 'Timeout',
        actionLabel: 'Send: "Anh/chị còn cần em hỗ…"',
        activations: 3421,
        enabledDefault: true,
      },
      {
        id: 'eod-summary',
        groupId: 'timeout',
        name: 'End-of-day summary',
        description: 'Tổng kết hội thoại chưa xử lý xong trước 19h',
        priority: 'high',
        priorityLabel: 'Ưu tiên cao',
        icon: 'ti-time',
        iconMod: 'timeout',
        triggerLabel: 'Timeout',
        actionLabel: 'Log summary → Notify human agent',
        activations: 12,
        enabledDefault: true,
      },
    ],
  },
  {
    id: 'message',
    title: 'Nhận tin nhắn',
    mod: 'message',
    rules: [
      {
        id: 'language',
        groupId: 'message',
        name: 'Chuyển ngôn ngữ',
        description: 'Detect ngôn ngữ khách và phản hồi theo ngôn ngữ đó',
        priority: 'medium',
        priorityLabel: 'Trung bình',
        icon: 'ti-bell',
        iconMod: 'message',
        triggerLabel: 'Nhận tin nhắn',
        actionLabel: 'Translate response to detected language',
        activations: 856,
        enabledDefault: true,
      },
      {
        id: 'anti-spam',
        groupId: 'message',
        name: 'Anti-spam message',
        description: 'Giới hạn phản hồi khi khách gửi quá nhiều tin liên tiếp',
        priority: 'low',
        priorityLabel: 'Thấp',
        icon: 'ti-bell',
        iconMod: 'message',
        triggerLabel: 'Nhận tin nhắn',
        actionLabel: 'Reply once: "Em đã nhận được…"',
        activations: 234,
        enabledDefault: false,
      },
    ],
  },
];

function formatActivations(n: number) {
  return `${n.toLocaleString('vi-VN')} lần`;
}

const BehaviorControl: React.FC = () => {
  const [showAddDrawer, setShowAddDrawer] = useState(false);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<FilterId>('all');
  const [enabledMap, setEnabledMap] = useState<Record<string, boolean>>(() => {
    const map: Record<string, boolean> = {};
    RULE_GROUPS.forEach((g) => g.rules.forEach((r) => { map[r.id] = r.enabledDefault; }));
    return map;
  });

  const visibleGroups = useMemo(() => {
    const q = search.trim().toLowerCase();

    return RULE_GROUPS.map((group) => {
      if (filter !== 'all' && group.id !== filter) return null;

      const rules = group.rules.filter((rule) => {
        if (!q) return true;
        return (
          rule.name.toLowerCase().includes(q) ||
          rule.description.toLowerCase().includes(q) ||
          rule.triggerLabel.toLowerCase().includes(q)
        );
      });

      if (rules.length === 0) return null;
      return { ...group, rules };
    }).filter(Boolean) as RuleGroup[];
  }, [search, filter]);

  const toggleRule = (id: string) => {
    setEnabledMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <>
    <div className="behavior-control">
      <header className="behavior-control-header">
        <div className="behavior-control-header-text">
          <h1 className="behavior-control-title">Điều khiển hành vi</h1>
          <p className="behavior-control-subtitle">
            Cấu hình trigger runtime để AI phản ứng tự động trong hội thoại
          </p>
        </div>
        <button
          type="button"
          className="behavior-control-add-btn"
          onClick={() => setShowAddDrawer(true)}
        >
          <i className="ti-plus" aria-hidden />
          Thêm quy tắc
        </button>
      </header>

      <div className="behavior-control-stats">
        {STATS.map((stat) => (
          <div key={stat.id} className="behavior-control-stat-card">
            <span className={`behavior-control-stat-icon behavior-control-stat-icon--${stat.mod}`}>
              <i className={stat.icon} aria-hidden />
            </span>
            <div>
              <strong className="behavior-control-stat-value">{stat.value}</strong>
              <span className="behavior-control-stat-label">{stat.label}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="behavior-control-search-wrap">
        <span className="behavior-control-search-icon" aria-hidden>
          <i className="ti-search" />
        </span>
        <input
          type="search"
          className="behavior-control-search"
          placeholder="Tìm quy tắc..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Tìm quy tắc"
        />
      </div>

      <div className="behavior-control-filters" role="tablist" aria-label="Lọc trigger">
        {FILTERS.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={filter === item.id}
            className={`behavior-control-filter${filter === item.id ? ' is-active' : ''}`}
            onClick={() => setFilter(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="behavior-control-groups">
        {visibleGroups.map((group) => (
          <section key={group.id} className="behavior-control-group">
            <header className={`behavior-control-group-head behavior-control-group-head--${group.mod}`}>
              <span className="behavior-control-group-head-title">{group.title}</span>
              <span className="behavior-control-group-head-count">
                {group.rules.length} quy tắc
              </span>
            </header>

            <ul className="behavior-control-rule-list">
              {group.rules.map((rule) => {
                const enabled = enabledMap[rule.id];
                return (
                  <li
                    key={rule.id}
                    className={`behavior-control-rule${!enabled ? ' behavior-control-rule--off' : ''}`}
                  >
                    <button
                      type="button"
                      role="switch"
                      aria-checked={enabled}
                      className={`behavior-control-toggle${enabled ? ' is-on' : ''}`}
                      onClick={() => toggleRule(rule.id)}
                      aria-label={`${enabled ? 'Tắt' : 'Bật'} quy tắc ${rule.name}`}
                    >
                      <span className="behavior-control-toggle-thumb" />
                    </button>

                    <span className={`behavior-control-rule-icon behavior-control-rule-icon--${rule.iconMod}`}>
                      <i className={rule.icon} aria-hidden />
                    </span>

                    <div className="behavior-control-rule-body">
                      <div className="behavior-control-rule-title-row">
                        <h3 className="behavior-control-rule-name">{rule.name}</h3>
                        <span className={`behavior-control-priority behavior-control-priority--${rule.priority}`}>
                          <span className="behavior-control-priority-dot" aria-hidden />
                          {rule.priorityLabel}
                        </span>
                      </div>
                      <p className="behavior-control-rule-desc">{rule.description}</p>
                      <div className="behavior-control-flow">
                        <span className={`behavior-control-flow-trigger behavior-control-flow-trigger--${rule.iconMod}`}>
                          {rule.triggerLabel}
                        </span>
                        <i className="ti-angle-right behavior-control-flow-arrow" aria-hidden />
                        <span className="behavior-control-flow-action">{rule.actionLabel}</span>
                      </div>
                    </div>

                    <div className="behavior-control-rule-side">
                      <span className="behavior-control-activations">
                        {formatActivations(rule.activations)}
                      </span>
                      <button
                        type="button"
                        className="behavior-control-menu-btn"
                        aria-label="Tùy chọn quy tắc"
                      >
                        <i className="ti-more-alt" aria-hidden />
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>

      {visibleGroups.length === 0 && (
        <p className="behavior-control-empty">Không tìm thấy quy tắc phù hợp.</p>
      )}
    </div>

    <AddBehaviorRuleDrawer
      open={showAddDrawer}
      onClose={() => setShowAddDrawer(false)}
    />
  </>
  );
};

export default BehaviorControl;
