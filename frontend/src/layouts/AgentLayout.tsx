import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

interface AgentLayoutProps {
  children: React.ReactNode;
}

const MENU_GROUPS = [
  {
    title: '',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: 'ti-bar-chart' },
    ]
  },
  {
    title: 'ĐÀO TẠO',
    items: [
      { id: 'general', label: 'Cấu hình chung', icon: 'ti-settings' },
      { id: 'intent', label: 'Ý định', icon: 'ti-target' },
      { id: 'goals', label: 'Mục tiêu', icon: 'ti-flag' },
      { id: 'knowledge', label: 'Tri thức', icon: 'ti-book' },
      { id: 'skills', label: 'Skills', icon: 'ti-bolt' },
      { id: 'policy', label: 'Chính sách', icon: 'ti-shield' },
      { id: 'escalation', label: 'Quy tắc leo thang', icon: 'ti-alert' },
      { id: 'feedback', label: 'Phản hồi', icon: 'ti-comment-alt' },
    ]
  },
  {
    title: 'KIỂM THỬ',
    items: [
      { id: 'simulator', label: 'Chat Simulator', icon: 'ti-headphone-alt' },
      { id: 'scenario', label: 'Scenario Testing', icon: 'ti-pulse' },
      { id: 'test-history', label: 'Lịch sử kiểm thử', icon: 'ti-time' },
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

const AgentLayout: React.FC<AgentLayoutProps> = ({ children }) => {
  const navigate = useNavigate();

  return (
    <div className="agent-layout">
      {/* Sidebar */}
      <aside className="agent-sidebar">
        <button className="sidebar-back-btn" onClick={() => navigate('/')}>
          &lt; Tất cả Agents
        </button>

        <div className="sidebar-brand">
          <div className="agent-avatar" style={{ width: 32, height: 32, fontSize: 12 }}>SC</div>
          <div className="sidebar-brand-info">
            <strong>Lumi — Seoul Center</strong>
            <span className="badge badge--active" style={{ transform: 'scale(0.85)', transformOrigin: 'left' }}>Production</span>
          </div>
        </div>

        <nav className="sidebar-nav">

          {MENU_GROUPS.map((group, index) => (
            <div key={group.title || index} className="sidebar-group">
              {group.title && <span className="sidebar-group-title">{group.title}</span>}
              {group.items.map(item => (
                // This is a mockup layout, later we can use NavLink with exact path
                <button
                  key={item.id}
                  className={`sidebar-nav-item ${item.id === 'general' ? 'active' : ''}`}
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
            <span style={{ fontWeight: 600 }}>Lumi — Seoul Center</span>
          </div>
          <div className="agent-header-actions">
            <span className="badge badge--active">● Hoạt động</span>
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
