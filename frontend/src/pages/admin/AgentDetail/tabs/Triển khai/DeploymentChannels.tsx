import React, { useMemo, useState } from 'react';
import AddChannelDrawer from './AddChannelDrawer';
import './DeploymentChannels.css';

type ChannelStatus = 'active' | 'inactive';

interface ChannelItem {
  id: string;
  name: string;
  platform: string;
  icon: string;
  iconMod: string;
  status: ChannelStatus;
  hasSchedule: boolean;
  conversations: number;
  avgResponse: string;
  hours: string;
  hoursHighlight?: boolean;
}

const STATS = [
  { id: 'active', value: '3/6', label: 'Kênh đang hoạt động', icon: 'ti-comment', mod: 'blue' },
  { id: 'conversations', value: '4,937', label: 'Tổng hội thoại', icon: 'ti-check-box', mod: 'green' },
  { id: 'scheduled', value: '2', label: 'Kênh có giờ hoạt động', icon: 'ti-time', mod: 'amber' },
];

const CHANNELS: ChannelItem[] = [
  {
    id: 'webchat',
    name: 'Webchat',
    platform: 'webchat',
    icon: 'ti-comment',
    iconMod: 'webchat',
    status: 'active',
    hasSchedule: true,
    conversations: 2847,
    avgResponse: '1.8s',
    hours: 'T2-T6: 08:00 - 21:00',
    hoursHighlight: true,
  },
  {
    id: 'facebook',
    name: 'Facebook — Thẩm Viện Seoul',
    platform: 'facebook',
    icon: 'ti-world',
    iconMod: 'facebook',
    status: 'active',
    hasSchedule: true,
    conversations: 1234,
    avgResponse: '2.1s',
    hours: 'T2-T6: 07:00 - 22:00',
    hoursHighlight: true,
  },
  {
    id: 'zalo',
    name: 'Zalo OA — Seoul Center',
    platform: 'zalo',
    icon: 'ti-comment-alt',
    iconMod: 'zalo',
    status: 'active',
    hasSchedule: false,
    conversations: 856,
    avgResponse: '1.5s',
    hours: 'Không giới hạn',
  },
  {
    id: 'instagram',
    name: 'Instagram — @seoul.center',
    platform: 'instagram',
    icon: 'ti-instagram',
    iconMod: 'instagram',
    status: 'inactive',
    hasSchedule: false,
    conversations: 0,
    avgResponse: '—',
    hours: 'Không giới hạn',
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    platform: 'whatsapp',
    icon: 'ti-mobile',
    iconMod: 'whatsapp',
    status: 'inactive',
    hasSchedule: false,
    conversations: 0,
    avgResponse: '—',
    hours: 'Không giới hạn',
  },
  {
    id: 'email',
    name: 'Email',
    platform: 'email',
    icon: 'ti-email',
    iconMod: 'email',
    status: 'inactive',
    hasSchedule: false,
    conversations: 0,
    avgResponse: '—',
    hours: 'Không giới hạn',
  },
];

function formatConversations(n: number) {
  return n.toLocaleString('vi-VN');
}

const DeploymentChannels: React.FC = () => {
  const [search, setSearch] = useState('');
  const [showAddDrawer, setShowAddDrawer] = useState(false);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return CHANNELS;
    return CHANNELS.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.platform.toLowerCase().includes(q),
    );
  }, [search]);

  return (
    <div className="deploy-channels">
      <header className="deploy-channels-header">
        <div className="deploy-channels-header-text">
          <h1 className="deploy-channels-title">Kênh triển khai</h1>
          <p className="deploy-channels-subtitle">
            Quản lý kênh, Page và giờ hoạt động của AI Agent
          </p>
        </div>
        <button
          type="button"
          className="deploy-channels-add-btn"
          onClick={() => setShowAddDrawer(true)}
        >
          <i className="ti-plus" aria-hidden />
          Thêm kênh
        </button>
      </header>

      <div className="deploy-channels-stats">
        {STATS.map((stat) => (
          <div key={stat.id} className="deploy-channels-stat-card">
            <span className={`deploy-channels-stat-icon deploy-channels-stat-icon--${stat.mod}`}>
              <i className={stat.icon} aria-hidden />
            </span>
            <div>
              <strong className="deploy-channels-stat-value">{stat.value}</strong>
              <span className="deploy-channels-stat-label">{stat.label}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="deploy-channels-search-wrap">
        <span className="deploy-channels-search-icon" aria-hidden>
          <i className="ti-search" />
        </span>
        <input
          type="search"
          className="deploy-channels-search"
          placeholder="Tìm kênh..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Tìm kênh"
        />
      </div>

      <div className="deploy-channels-grid">
        {filtered.map((channel) => (
          <article
            key={channel.id}
            className={`deploy-channel-card${channel.status === 'inactive' ? ' deploy-channel-card--inactive' : ''}`}
          >
            <div className="deploy-channel-card-head">
              <span className={`deploy-channel-icon deploy-channel-icon--${channel.iconMod}`}>
                <i className={channel.icon} aria-hidden />
              </span>
              <div className="deploy-channel-title-wrap">
                <h3 className="deploy-channel-name" title={channel.name}>
                  {channel.name}
                </h3>
                <div className="deploy-channel-badges">
                  {channel.status === 'active' ? (
                    <span className="deploy-channel-badge deploy-channel-badge--active">
                      Hoạt động
                    </span>
                  ) : (
                    <span className="deploy-channel-badge deploy-channel-badge--off">Tắt</span>
                  )}
                  {channel.hasSchedule && (
                    <span className="deploy-channel-badge deploy-channel-badge--schedule">
                      Có giờ
                    </span>
                  )}
                </div>
              </div>
              <button
                type="button"
                className="deploy-channel-menu-btn"
                aria-label="Tùy chọn kênh"
              >
                <i className="ti-more-alt" aria-hidden />
              </button>
            </div>

            <dl className="deploy-channel-metrics">
              <div className="deploy-channel-metric">
                <dt>Hội thoại</dt>
                <dd>{formatConversations(channel.conversations)}</dd>
              </div>
              <div className="deploy-channel-metric">
                <dt>Phản hồi TB</dt>
                <dd>{channel.avgResponse}</dd>
              </div>
              <div className="deploy-channel-metric">
                <dt>Giờ hoạt động</dt>
                <dd
                  className={
                    channel.hoursHighlight ? 'deploy-channel-hours--highlight' : undefined
                  }
                >
                  {channel.hours}
                </dd>
              </div>
            </dl>
          </article>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="deploy-channels-empty">Không tìm thấy kênh phù hợp.</p>
      )}

      <AddChannelDrawer
        open={showAddDrawer}
        onClose={() => setShowAddDrawer(false)}
      />
    </div>
  );
};

export default DeploymentChannels;
