import React, { useMemo, useState } from 'react';

export type TriggerLabel =
  | 'Bắt đầu hội thoại'
  | 'Timeout'
  | 'Nhận tin nhắn'
  | 'Phát hiện intent';

type RuleItem = {
  id: string;
  title: string;
  subtitle: string;
  priority: string;
  trigger: TriggerLabel;
  action: string;
  /** Số lần kích hoạt (dùng khi quy tắc đang bật để cộng vào thống kê) */
  activations: number;
  icon: string;
  enabled: boolean;
};

type RuleGroup = {
  label: string;
  rules: RuleItem[];
};

const DRAWER_TRIGGERS: { label: TriggerLabel; icon: string }[] = [
  { label: 'Bắt đầu hội thoại', icon: 'ti-comment' },
  { label: 'Nhận tin nhắn', icon: 'ti-bell' },
  { label: 'Timeout', icon: 'ti-timer' },
  { label: 'Phát hiện intent', icon: 'ti-bolt' },
];

const PRIORITY_OPTIONS: { value: string; dot: 'high' | 'mid' | 'low' }[] = [
  { value: 'Ưu tiên cao', dot: 'high' },
  { value: 'Trung bình', dot: 'mid' },
  { value: 'Thấp', dot: 'low' },
];

function iconForTrigger(trigger: TriggerLabel): string {
  const row = DRAWER_TRIGGERS.find((t) => t.label === trigger);
  return row?.icon ?? 'ti-bolt';
}

const INITIAL_GROUPS: RuleGroup[] = [
  {
    label: 'Bắt đầu hội thoại',
    rules: [
      {
        id: 'greeting',
        title: 'Greeting tự động',
        subtitle: 'AI tự động chào hỏi khi khách mở chat lần đầu',
        priority: 'Ưu tiên cao',
        trigger: 'Bắt đầu hội thoại',
        action: 'Send welcome message from ...',
        activations: 13081,
        icon: 'ti-comment',
        enabled: true,
      },
    ],
  },
  {
    label: 'Timeout',
    rules: [
      {
        id: 'followup',
        title: 'Auto follow-up 5 phút',
        subtitle: 'Nếu khách không phản hồi sau 5 phút, AI nhắn nhắc nhẹ',
        priority: 'Trung bình',
        trigger: 'Timeout',
        action: 'Send: "Anh/chị còn cần em hỗ..."',
        activations: 3421,
        icon: 'ti-timer',
        enabled: true,
      },
      {
        id: 'eod',
        title: 'End-of-day summary',
        subtitle: 'Tổng kết hội thoại chưa xử lý xong trước 19h',
        priority: 'Ưu tiên cao',
        trigger: 'Timeout',
        action: 'Log summary -> Notify human...',
        activations: 12,
        icon: 'ti-timer',
        enabled: true,
      },
    ],
  },
  {
    label: 'Nhận tin nhắn',
    rules: [
      {
        id: 'language',
        title: 'Chuyển ngôn ngữ',
        subtitle: 'Detect ngôn ngữ khách và phản hồi theo ngôn ngữ đó',
        priority: 'Trung bình',
        trigger: 'Nhận tin nhắn',
        action: 'Translate response to detecte...',
        activations: 856,
        icon: 'ti-bell',
        enabled: true,
      },
      {
        id: 'product-hint',
        title: 'Gợi ý sản phẩm liên quan',
        subtitle: 'Khi khách nhắc từ khóa sản phẩm, AI đề xuất thông tin thêm',
        priority: 'Trung bình',
        trigger: 'Nhận tin nhắn',
        action: 'Push product cards from catalog...',
        activations: 2340,
        icon: 'ti-layout-grid2',
        enabled: false,
      },
    ],
  },
];

function formatCount(n: number): string {
  return n.toLocaleString('en-US');
}

function triggerPillClass(trigger: TriggerLabel): string {
  if (trigger === 'Timeout') return 'timeout';
  if (trigger === 'Nhận tin nhắn') return 'message';
  if (trigger === 'Phát hiện intent') return 'intent';
  return 'start';
}

const BehaviorControl: React.FC = () => {
  const [groups, setGroups] = useState<RuleGroup[]>(INITIAL_GROUPS);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [newRuleName, setNewRuleName] = useState('');
  const [newRuleDesc, setNewRuleDesc] = useState('');
  const [newTrigger, setNewTrigger] = useState<TriggerLabel>('Nhận tin nhắn');
  const [newCondition, setNewCondition] = useState('');
  const [newAction, setNewAction] = useState('');
  const [newPriority, setNewPriority] = useState('Trung bình');

  const { totalRules, activeRules, activationSum, triggerGroupCount } = useMemo(() => {
    const flat = groups.flatMap((g) => g.rules);
    const totalRules = flat.length;
    const activeRules = flat.filter((r) => r.enabled).length;
    const activationSum = flat.filter((r) => r.enabled).reduce((s, r) => s + r.activations, 0);
    const triggerGroupCount = groups.length;
    return { totalRules, activeRules, activationSum, triggerGroupCount };
  }, [groups]);

  const toggleRule = (ruleId: string) => {
    setGroups((prev) =>
      prev.map((g) => ({
        ...g,
        rules: g.rules.map((r) => (r.id === ruleId ? { ...r, enabled: !r.enabled } : r)),
      }))
    );
  };

  const groupRuleCountLabel = (g: RuleGroup) => `${g.rules.length} quy tắc`;

  const resetDrawerForm = () => {
    setNewRuleName('');
    setNewRuleDesc('');
    setNewTrigger('Nhận tin nhắn');
    setNewCondition('');
    setNewAction('');
    setNewPriority('Trung bình');
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    resetDrawerForm();
  };

  const handleCreateRule = () => {
    const title = newRuleName.trim() || 'Quy tắc mới';
    const subtitleParts = [newRuleDesc.trim(), newCondition.trim()].filter(Boolean);
    const subtitle = subtitleParts.length ? subtitleParts.join(' · ') : '—';
    const actionText = newAction.trim() || '—';
    const id = `rule-${Date.now().toString(36)}`;
    const rule: RuleItem = {
      id,
      title,
      subtitle,
      priority: newPriority,
      trigger: newTrigger,
      action: actionText,
      activations: 0,
      icon: iconForTrigger(newTrigger),
      enabled: true,
    };

    setGroups((prev) => {
      const idx = prev.findIndex((g) => g.label === newTrigger);
      if (idx >= 0) {
        return prev.map((g, i) =>
          i === idx ? { ...g, rules: [...g.rules, rule] } : g
        );
      }
      return [...prev, { label: newTrigger, rules: [rule] }];
    });
    closeDrawer();
  };

  return (
    <div className="behavior-page">
      <div className="behavior-header">
        <div>
          <h1 className="behavior-title">Điều khiển hành vi</h1>
          <p className="behavior-subtitle">Cấu hình trigger runtime để AI phản ứng tự động trong hội thoại</p>
        </div>
        <button type="button" className="btn btn--primary" onClick={() => setDrawerOpen(true)}>
          <i className="ti-plus" /> Thêm quy tắc
        </button>
      </div>

      <div className="behavior-stats">
        <div className="behavior-stat-card">
          <span className="behavior-stat-icon"><i className="ti-bolt" /></span>
          <div>
            <div className="behavior-stat-value">
              {activeRules}/{totalRules}
            </div>
            <div className="behavior-stat-label">Đang hoạt động</div>
          </div>
        </div>
        <div className="behavior-stat-card">
          <span className="behavior-stat-icon behavior-stat-icon--green"><i className="ti-control-play" /></span>
          <div>
            <div className="behavior-stat-value">{formatCount(activationSum)}</div>
            <div className="behavior-stat-label">Lần kích hoạt</div>
          </div>
        </div>
        <div className="behavior-stat-card">
          <span className="behavior-stat-icon behavior-stat-icon--gray"><i className="ti-shield" /></span>
          <div>
            <div className="behavior-stat-value">{triggerGroupCount}</div>
            <div className="behavior-stat-label">Nhóm trigger</div>
          </div>
        </div>
      </div>

      <div className="behavior-toolbar">
        <div className="behavior-search">
          <i className="ti-search" />
          <input placeholder="Tìm quy tắc..." />
        </div>
        <div className="behavior-filters">
          <button type="button" className="behavior-chip active">Tất cả</button>
          <button type="button" className="behavior-chip">Bắt đầu hội thoại</button>
          <button type="button" className="behavior-chip">Nhận tin nhắn</button>
          <button type="button" className="behavior-chip">Timeout</button>
          <button type="button" className="behavior-chip">Phát hiện intent</button>
        </div>
      </div>

      <div className="behavior-groups">
        {groups.map((group) => (
          <div key={group.label} className="behavior-group">
            <div className="behavior-group__head">
              <span className="behavior-group__pill">{group.label}</span>
              <span className="behavior-group__count">{groupRuleCountLabel(group)}</span>
            </div>

            <div className="behavior-rule-list">
              {group.rules.map((rule) => (
                <div key={rule.id} className={`behavior-rule ${!rule.enabled ? 'is-disabled' : ''}`}>
                  <div className="behavior-rule__left">
                    <button
                      type="button"
                      className={`audience-switch ${rule.enabled ? 'is-on' : 'is-off'}`}
                      onClick={() => toggleRule(rule.id)}
                      aria-pressed={rule.enabled}
                      aria-label={rule.enabled ? 'Tắt quy tắc' : 'Bật quy tắc'}
                    >
                      <span className="audience-switch__knob" />
                    </button>
                    <span className="behavior-rule__icon"><i className={rule.icon} /></span>
                    <div>
                      <div className="behavior-rule__title">
                        {rule.title}
                        <span className="behavior-rule__priority">{rule.priority}</span>
                      </div>
                      <div className="behavior-rule__subtitle">{rule.subtitle}</div>
                    </div>
                  </div>

                  <div className="behavior-rule__right">
                    <span className={`behavior-rule__trigger ${triggerPillClass(rule.trigger)}`}>
                      {rule.trigger}
                    </span>
                    <span className="behavior-rule__action">{rule.action}</span>
                    <div className="behavior-rule__count">
                      {formatCount(rule.activations)}
                      <span>lần</span>
                    </div>
                    <button type="button" className="behavior-rule__menu">⋮</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {drawerOpen ? (
        <div
          className="queue-drawer queue-drawer--behavior"
          role="dialog"
          aria-modal="true"
          aria-labelledby="behavior-drawer-title"
        >
          <button type="button" className="queue-drawer__backdrop" aria-label="Đóng" onClick={closeDrawer} />
          <aside className="queue-drawer__panel">
            <header className="queue-drawer__header">
              <h2 id="behavior-drawer-title" className="queue-drawer__title">
                Thêm quy tắc hành vi
              </h2>
              <button type="button" className="queue-drawer__close" onClick={closeDrawer} aria-label="Đóng">
                ×
              </button>
            </header>

            <div className="queue-drawer__body">
              <div className="form-group">
                <label className="form-label" htmlFor="behavior-rule-name">Tên quy tắc</label>
                <input
                  id="behavior-rule-name"
                  className="form-input"
                  placeholder="VD: Greeting tự động"
                  value={newRuleName}
                  onChange={(e) => setNewRuleName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="behavior-rule-desc">Mô tả</label>
                <textarea
                  id="behavior-rule-desc"
                  className="form-textarea"
                  rows={4}
                  value={newRuleDesc}
                  onChange={(e) => setNewRuleDesc(e.target.value)}
                />
              </div>
              <div className="form-group">
                <span className="form-label">Trigger</span>
                <div className="behavior-drawer-trigger-grid">
                  {DRAWER_TRIGGERS.map((t) => (
                    <button
                      key={t.label}
                      type="button"
                      className={`behavior-drawer-trigger-card ${newTrigger === t.label ? 'is-selected' : ''}`}
                      onClick={() => setNewTrigger(t.label)}
                    >
                      <i className={t.icon} />
                      <span>{t.label}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="behavior-rule-condition">Condition</label>
                <input
                  id="behavior-rule-condition"
                  className="form-input"
                  placeholder="VD: first_message = true"
                  value={newCondition}
                  onChange={(e) => setNewCondition(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="behavior-rule-action">Action</label>
                <input
                  id="behavior-rule-action"
                  className="form-input"
                  placeholder="VD: Send welcome message"
                  value={newAction}
                  onChange={(e) => setNewAction(e.target.value)}
                />
              </div>
              <div className="form-group">
                <span className="form-label">Mức độ ưu tiên</span>
                <div className="behavior-drawer-priority-row">
                  {PRIORITY_OPTIONS.map((p) => (
                    <button
                      key={p.value}
                      type="button"
                      className={`behavior-drawer-priority-pill ${newPriority === p.value ? 'is-selected' : ''}`}
                      onClick={() => setNewPriority(p.value)}
                    >
                      <span className={`behavior-drawer-priority-dot behavior-drawer-priority-dot--${p.dot}`} />
                      {p.value}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <footer className="queue-drawer__footer queue-drawer__footer--split">
              <button type="button" className="queue-drawer__cancel-plain" onClick={closeDrawer}>
                Hủy
              </button>
              <button type="button" className="btn btn--primary behavior-drawer-create-btn" onClick={handleCreateRule}>
                <span className="behavior-drawer-create-btn__icon" aria-hidden>
                  <i className="ti-plus" />
                </span>
                Tạo quy tắc
              </button>
            </footer>
          </aside>
        </div>
      ) : null}
    </div>
  );
};

export default BehaviorControl;
