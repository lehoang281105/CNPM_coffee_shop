import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Header from '../../../components/common/Header';
import AgentCard from '../../../components/admin/AgentCard';
import CreateBrandModal from '../../../components/admin/CreateBrandModal';
import CreateBotModal from '../../../components/admin/CreateBotModal';
import HelpModal from '../../../components/common/HelpModal';
import { getAllBots } from '../../../services/admin/botService';
import { getAllBrands } from '../../../services/admin/brandService';
import type { Bot, Brand } from '../../../types';

// ── Stat Card ────────────────────────────────────────────────────────────────
interface StatCardProps {
  emoji: string;
  label: string;
  value: number | null;
  colorMod: 'blue' | 'green' | 'orange' | 'purple';
}

const StatCard: React.FC<StatCardProps> = ({ emoji, label, value, colorMod }) => (
  <div className="stat-card">
    <div className={`stat-icon stat-icon--${colorMod}`}>{emoji}</div>
    <div className="stat-info">
      <span className="stat-label">{label}</span>
      {value === null
        ? <span className="stat-value stat-value--skeleton" aria-label="Đang tải" />
        : <span className="stat-value">{value.toLocaleString()}</span>
      }
    </div>
  </div>
);

// ── Dashboard Page ───────────────────────────────────────────────────────────
const DashboardPage: React.FC = () => {
  const [bots,    setBots]    = useState<Bot[]>([]);
  const [brands,  setBrands]  = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState('');
  const [search,  setSearch]  = useState('');
  const [showBrandModal, setShowBrandModal] = useState(false);
  const [showBotModal,   setShowBotModal]   = useState(false);
  const [showHelpModal,  setShowHelpModal]  = useState(false);

  // ── Fetch ────────────────────────────────────────────────────────────────
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const [botsRes, brandsRes] = await Promise.all([
        getAllBots(),
        getAllBrands(),
      ]);
      setBots(botsRes.data   ?? []);
      setBrands(brandsRes.data ?? []);
    } catch (err: any) {
      setError(
        err?.response?.data?.message
          || err.message
          || 'Không thể kết nối tới API. Vui lòng thử lại.'
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  // ── Derived stats ────────────────────────────────────────────────────────
  const totalBots     = loading ? null : bots.length;
  const activeBots    = loading ? null : bots.filter((b) => b.status === 'active').length;
  const totalBrands   = loading ? null : brands.length;
  const totalLangs    = loading ? null : new Set(bots.flatMap((b) => b.language)).size;

  // ── Brand map ────────────────────────────────────────────────────────────
  const brandMap = useMemo(
    () => Object.fromEntries(brands.map((b) => [b.id, b])),
    [brands]
  );

  // ── Filtered bots ────────────────────────────────────────────────────────
  const filteredBots = useMemo(() => {
    const q = search.toLowerCase();
    return bots.filter(
      (b) =>
        b.name.toLowerCase().includes(q) ||
        (b.role_prompt ?? '').toLowerCase().includes(q) ||
        b.language.some((l) => l.toLowerCase().includes(q)) ||
        (brandMap[b.brand_id]?.name ?? '').toLowerCase().includes(q)
    );
  }, [bots, search, brandMap]);

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
          <StatCard emoji="🤖" label="Tổng Agent"        value={totalBots}   colorMod="blue"   />
          <StatCard emoji="✅" label="Đang hoạt động"    value={activeBots}  colorMod="green"  />
          <StatCard emoji="🏠" label="Thương hiệu"       value={totalBrands} colorMod="orange" />
          <StatCard emoji="🌐" label="Ngôn ngữ hỗ trợ"  value={totalLangs}  colorMod="purple" />
        </div>

        {/* Toolbar */}
        <div className="toolbar">
          <div className="search-wrap">
            <span className="search-icon">🔍</span>
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
            🔄 Làm mới
          </button>
        </div>

        {/* Agent grid */}
        <div className="agents-grid">
          {/* Error */}
          {error && (
            <div className="error-banner">
              ⚠️ {error}
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
              <span className="empty-state__icon">🤖</span>
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
