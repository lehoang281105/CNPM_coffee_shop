import React from 'react';
import {
  NavLink,
  useNavigate,
  useParams,
  useSearchParams
} from 'react-router-dom';

import type { Bot, Brand } from '../../types';

/* =========================
   IMPORT TAB COMPONENTS
========================= */
import GeneralConfig from '../../pages/admin/AgentDetail/tabs/Đào tạo/GeneralConfig';

import DeployOverview from '../../pages/admin/AgentDetail/tabs/Triển khai/DeployOverview';
import DeploymentChannels from '../../pages/admin/AgentDetail/tabs/Triển khai/DeploymentChannels';
import AudienceTargets from '../../pages/admin/AgentDetail/tabs/Triển khai/AudienceTargets';
import BehaviorControl from '../../pages/admin/AgentDetail/tabs/Triển khai/BehaviorControl';
import ForwardingControl from '../../pages/admin/AgentDetail/tabs/Triển khai/ForwardingControl';
import UiUxConfig from '../../pages/admin/AgentDetail/tabs/Triển khai/UiUxConfig';

interface AgentLayoutProps {
  bot?: Bot | null;
  brand?: Brand | null;
  loading?: boolean;

  // optional
  onSaveConfig: (payload: any) => Promise<void>;
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

  return name
    .split(/[\s—–\-]+/)
    .map(w => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

const AgentLayout: React.FC<AgentLayoutProps> = ({
  bot,
  brand,
  loading,
  onSaveConfig,
}) => {

  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  /* =========================
     TAB CONTROL
  ========================= */
  const [searchParams] = useSearchParams();

  const activeTab =
    searchParams.get('tab') || 'general';

  /* =========================
     DATA
  ========================= */
  const botName = bot?.name || 'Loading...';

  const brandName = brand?.name
    ? ` — ${brand.name}`
    : '';

  const displayName =
    `${botName}${brandName}`;

  const isActive =
    bot?.status === 'active';

  /* =========================
     TAB RENDER
  ========================= */
  const renderTabContent = () => {

    if (loading) {
      return (
        <div
          style={{
            padding: 40,
            textAlign: 'center'
          }}
        >
          Đang tải dữ liệu Agent...
        </div>
      );
    }

    if (!bot) {
      return (
        <div
          style={{
            padding: 40,
            textAlign: 'center',
            color: 'red'
          }}
        >
          Không tìm thấy Agent!
        </div>
      );
    }

    switch (activeTab) {

      /* =========================
         ĐÀO TẠO
      ========================= */

      case 'general':
        return (
          <GeneralConfig
            bot={bot}
            brand={brand}
            onSave={onSaveConfig}
          />
        );

      /* =========================
         TRIỂN KHAI
      ========================= */

      case 'deploy-overview':
        return <DeployOverview />;

      case 'channels':
        return <DeploymentChannels />;

      case 'audience':
        return <AudienceTargets />;

      case 'behavior':
        return <BehaviorControl />;

      case 'forwarding':
        return <ForwardingControl />;

      case 'ui-ux':
        return <UiUxConfig />;

      /* =========================
         DEFAULT
      ========================= */

      default:
        return (
          <div
            style={{
              padding: 40,
              textAlign: 'center'
            }}
          >
            <h3 style={{ marginBottom: 8 }}>
              Tab "{activeTab}"
            </h3>

            <p style={{ color: '#666' }}>
              Mục này đang được phát triển.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="agent-layout">

      {/* =========================
          SIDEBAR
      ========================= */}
      <aside className="agent-sidebar">

        <button
          className="sidebar-back-btn"
          onClick={() => navigate('/')}
        >
          &lt; Tất cả Agents
        </button>

        {/* =========================
            BRAND
        ========================= */}
        <div className="sidebar-brand">

          <div
            className="agent-avatar"
            style={{
              width: 32,
              height: 32,
              fontSize: 12
            }}
          >
            {getInitials(botName)}
          </div>

          <div className="sidebar-brand-info">

            <strong title={displayName}>
              {displayName}
            </strong>

            {!loading && (
              <span
                className={`badge ${
                  isActive
                    ? 'badge--active'
                    : 'badge--inactive'
                }`}
                style={{
                  transform: 'scale(0.85)',
                  transformOrigin: 'left'
                }}
              >
                {isActive
                  ? 'Hoạt động'
                  : 'Tắt'}
              </span>
            )}
          </div>
        </div>

        {/* =========================
            NAVIGATION
        ========================= */}
        <nav className="sidebar-nav">

          {MENU_GROUPS.map((group, index) => (

            <div
              key={group.title || index}
              className="sidebar-group"
            >

              {group.title && (
                <span className="sidebar-group-title">
                  {group.title}
                </span>
              )}

              {group.items.map(item => (

                <NavLink
                  key={item.id}
                  to={
                    id
                      ? `/agents/${id}?tab=${item.id}`
                      : '#'
                  }
                  className={`sidebar-nav-item ${
                    item.id === activeTab
                      ? 'active'
                      : ''
                  }`}
                >

                  <span style={{ width: 20 }}>
                    <i className={item.icon}></i>
                  </span>

                  {item.label}

                </NavLink>

              ))}
            </div>

          ))}

        </nav>
      </aside>

      {/* =========================
          MAIN
      ========================= */}
      <main className="agent-main">

        {/* =========================
            HEADER
        ========================= */}
        <header className="agent-detail-header">

          <div className="agent-breadcrumb">

            <span
              style={{
                color: 'var(--color-text-sub)'
              }}
            >
              Agents
            </span>

            <span
              style={{
                margin: '0 8px',
                color: 'var(--color-border)'
              }}
            >
              &gt;
            </span>

            <span style={{ fontWeight: 600 }}>
              {displayName}
            </span>
          </div>

          <div className="agent-header-actions">

            {!loading && (
              <span
                className={`badge ${
                  isActive
                    ? 'badge--active'
                    : 'badge--inactive'
                }`}
              >
                {isActive
                  ? '● Hoạt động'
                  : '○ Tắt'}
              </span>
            )}

          </div>
        </header>

        {/* =========================
            CONTENT
        ========================= */}
        <div className="agent-content-area">
          {renderTabContent()}
        </div>

      </main>
    </div>
  );
};

export default AgentLayout;