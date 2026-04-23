import React, { useState } from 'react';
import Header from '../../../components/common/Header';
import AgentCard from '../../../components/admin/AgentCard';
import CreateBrandModal from '../../../components/admin/CreateBrandModal';
import CreateBotModal from '../../../components/admin/CreateBotModal';
import HelpModal from '../../../components/common/HelpModal';
import StatCard from '../../../components/admin/StatCard';
import { useDashboard } from '../../../hooks/admin/useDashboard';

// ── Dashboard Page ───────────────────────────────────────────────────────────
const DashboardPage: React.FC = () => {
  const {
    loading,
    error,
    search,
    setSearch,
    filteredBots,
    fetchData,
    totalBots,
    activeBots,
    totalBrands,
    totalLangs,
    brandMap,
  } = useDashboard();

  const [showBrandModal, setShowBrandModal] = useState(false);
  const [showBotModal,   setShowBotModal]   = useState(false);
  const [showHelpModal,  setShowHelpModal]  = useState(false);

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="app-layout">
      <Header
        onCreateBrand={() => setShowBrandModal(true)}
        onCreateBot={()   => setShowBotModal(true)}
        onOpenHelp={()    => setShowHelpModal(true)}
      />

      <main className="app-content">
        {/* Page title */}
        <div className="page-header">
          <h1 className="page-title">AI Agents</h1>
          <p className="page-subtitle">Quản lý và cấu hình các AI Agent của bạn</p>
        </div>

        {/* Stats */}
        <div className="stats-grid">
          <StatCard iconClass="ti-android" label="Tổng Agent"        value={totalBots}   colorMod="blue"   />
          <StatCard iconClass="ti-check-box" label="Đang hoạt động"    value={activeBots}  colorMod="green"  />
          <StatCard iconClass="ti-home" label="Thương hiệu"       value={totalBrands} colorMod="orange" />
          <StatCard iconClass="ti-world" label="Ngôn ngữ hỗ trợ"  value={totalLangs}  colorMod="purple" />
        </div>

        {/* Toolbar */}
        <div className="toolbar">
          <div className="search-wrap">
            <span className="search-icon"><i className="ti-search"></i></span>
            <input
              id="search-agents"
              className="search-input"
              placeholder="Tìm kiếm AI Agent..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Tìm kiếm AI Agent"
            />
          </div>
          <button
            id="btn-refresh"
            className="refresh-btn"
            onClick={fetchData}
            title="Làm mới dữ liệu"
          >
            <i className="ti-reload"></i> Làm mới
          </button>
        </div>

        {/* Agent grid */}
        <div className="agents-grid">
          {/* Error */}
          {error && (
            <div className="error-banner">
              <i className="ti-alert"></i> {error}
              <button onClick={fetchData}>Thử lại</button>
            </div>
          )}

          {/* Skeleton loading */}
          {loading && !error &&
            [1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="skeleton-card" aria-hidden="true" />
            ))
          }

          {/* Empty state */}
          {!loading && !error && filteredBots.length === 0 && (
            <div className="empty-state">
              <span className="empty-state__icon"><i className="ti-face-sad"></i></span>
              <span className="empty-state__title">
                {search ? 'Không tìm thấy kết quả' : 'Chưa có AI Agent nào'}
              </span>
              <span className="empty-state__sub">
                {search
                  ? `Không có Agent nào phù hợp với "${search}"`
                  : 'Nhấn "Tạo AI" để bắt đầu'}
              </span>
            </div>
          )}

          {/* Agent cards */}
          {!loading && !error && filteredBots.map((bot) => (
            <AgentCard key={bot.id} bot={bot} brand={brandMap[bot.brand_id]} />
          ))}
        </div>
      </main>

      {/* Modals */}
      {showHelpModal && (
        <HelpModal onClose={() => setShowHelpModal(false)} />
      )}
      {showBrandModal && (
        <CreateBrandModal
          onClose={() => setShowBrandModal(false)}
          onSuccess={fetchData}
        />
      )}
      {showBotModal && (
        <CreateBotModal
          onClose={() => setShowBotModal(false)}
          onSuccess={fetchData}
        />
      )}
    </div>
  );
};

export default DashboardPage;
