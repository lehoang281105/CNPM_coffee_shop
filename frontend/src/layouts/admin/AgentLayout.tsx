import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Bot, Brand } from '../../types';

interface AgentLayoutProps {
  children: React.ReactNode;
  bot?: Bot | null;
  brand?: Brand | null;
  loading?: boolean;
  activeMenuId?: string;
  onMenuSelect?: (menuId: string) => void;
}

const MENU_GROUPS = [
  {
    title: 'ĐÀO TẠO',
    items: [
      { id: 'general', label: 'Cấu hình chung', icon: 'ti-settings' },
      { id: 'intent', label: 'Ý định', icon: 'ti-target' },
      { id: 'goals', label: 'Mục tiêu', icon: 'ti-flag' },
      { id: 'knowledge', label: 'Tri thức', icon: 'ti-book' },
      { id: 'skills', label: 'Skills', icon: 'ti-bolt' },
      { id: 'faq', label: 'FAQ', icon: 'ti-help-alt' },
      { id: 'feedback', label: 'Feedback', icon: 'ti-hand-point-up' },
      { id: 'branches', label: 'Chi nhánh', icon: 'ti-map-alt' },
      { id: 'services', label: 'Dịch vụ', icon: 'ti-briefcase' },
    ]
  },
  {
    title: 'KIỂM THỬ',
    items: [
      { id: 'simulator', label: 'Chat Simulator', icon: 'ti-headphone-alt' },
    ]
  },
  {
    title: 'TRIỂN KHAI',
    items: [
      { id: 'deploy-overview', label: 'Tổng quan', icon: 'ti-layout-grid2' },
      { id: 'channels', label: 'Kênh triển khai', icon: 'ti-world' },
      { id: 'audience', label: 'Đối tượng áp dụng', icon: 'ti-id-badge' },
      { id: 'behavior', label: 'Điều khiển hành vi', icon: 'ti-wand' },
      { id: 'forwarding', label: 'Chuyển tiếp', icon: 'ti-share-alt' },
      { id: 'ui-ux', label: 'Giao diện & Trải nghiệm', icon: 'ti-palette' },
    ]
  },
];

function getInitials(name: string) {
  if (!name) return 'AI';
  return name.split(/[\s—–\-]+/).map(w => w[0]).filter(Boolean).slice(0, 2).join('').toUpperCase();
}

const AgentLayout: React.FC<AgentLayoutProps> = ({
  children,
  bot,
  brand,
  loading,
  activeMenuId = 'general',
  onMenuSelect,
}) => {
  const navigate = useNavigate();

  const botName = bot?.name || 'Loading...';
  const brandName = brand?.name ? ` — ${brand.name}` : '';
  const displayName = `${botName}${brandName}`;
  const isActive = bot?.status === 'active';

  return (
    <div className="agent-layout">
      {/* Sidebar */}
      <aside className="agent-sidebar">
        <button className="sidebar-back-btn" onClick={() => navigate('/')}>
          &lt; Tất cả Agents
        </button>

        <div className="sidebar-brand">
          <div className="agent-avatar" style={{ width: 32, height: 32, fontSize: 12 }}>
            {getInitials(botName)}
          </div>
          <div className="sidebar-brand-info">
            <strong title={displayName}>{displayName}</strong>
            {!loading && (
              <span className={`badge ${isActive ? 'badge--active' : 'badge--inactive'}`} style={{ transform: 'scale(0.85)', transformOrigin: 'left' }}>
                {isActive ? 'Hoạt động' : 'Tắt'}
              </span>
            )}
          </div>
        </div>

        <nav className="sidebar-nav">
          {MENU_GROUPS.map((group, index) => (
            <div key={group.title || index} className="sidebar-group">
              {group.title && <span className="sidebar-group-title">{group.title}</span>}
              {group.items.map(item => (
                <button
                  key={item.id}
                  className={`sidebar-nav-item ${item.id === activeMenuId ? 'active' : ''}`}
                  onClick={() => onMenuSelect?.(item.id)}
                >
                  <span style={{ width: 20 }}><i className={item.icon}></i></span> {item.label}
                </button>
              ))}
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="agent-main">
        {/* Detail Header */}
        <header className="agent-detail-header">
          <div className="agent-breadcrumb">
            <span style={{ color: 'var(--color-text-sub)' }}>Agents</span>
            <span style={{ margin: '0 8px', color: 'var(--color-border)' }}>&gt;</span>
            <span style={{ fontWeight: 600 }}>{displayName}</span>
          </div>
          <div className="agent-header-actions">
            {!loading && (
              <span className={`badge ${isActive ? 'badge--active' : 'badge--inactive'}`}>
                {isActive ? '● Hoạt động' : '○ Tắt'}
              </span>
            )}
          </div>
        </header>

        {/* Content Area */}
        <div className="agent-content-area">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AgentLayout;
