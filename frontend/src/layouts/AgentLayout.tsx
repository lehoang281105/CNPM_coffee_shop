import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

interface AgentLayoutProps {
  children: React.ReactNode;
}

const MENU_GROUPS = [
  {
    title: 'ĐÀO TẠO',
    items: [
      { id: 'general', label: 'Cấu hình chung', icon: '👤' },
      { id: 'intent', label: 'Ý định', icon: '🎯' },
      { id: 'goals', label: 'Mục tiêu', icon: '🏆' },
      { id: 'knowledge', label: 'Tri thức', icon: '📚' },
      { id: 'skills', label: 'Skills', icon: '⚡' },
      { id: 'faq', label: 'FAQ', icon: '💬' },
      { id: 'branches', label: 'Chi nhánh', icon: '🏢' },
      { id: 'service-catalog', label: 'Dịch vụ', icon: '🛍️' },
    ]
  },
  {
    title: 'KIỂM THỬ',
    items: [
      { id: 'simulator', label: 'Chat Simulator', icon: '🧪' },
    ]
  },
  {
    title: 'TRIỂN KHAI',
    items: [
      { id: 'deploy', label: 'Triển khai', icon: '🚀' },
    ]
  }
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
          <button className="sidebar-nav-item" onClick={() => navigate('/')}>
            <span style={{ width: 20 }}>🏠</span> Dashboard
          </button>

          {MENU_GROUPS.map(group => (
            <div key={group.title} className="sidebar-group">
              <span className="sidebar-group-title">{group.title}</span>
              {group.items.map(item => (
                // This is a mockup layout, later we can use NavLink with exact path
                <button
                  key={item.id}
                  className={`sidebar-nav-item ${item.id === 'general' ? 'active' : ''}`}
                >
                  <span style={{ width: 20 }}>{item.icon}</span> {item.label}
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
