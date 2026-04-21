import React from 'react';
import type { Bot, Brand } from '../../types';

// ── Helpers ──────────────────────────────────────────────────────────────────

const PALETTE = [
  ['#4f63d2','#7c5cfc'],['#059669','#10b981'],
  ['#f59e0b','#ef4444'],['#9333ea','#ec4899'],
  ['#0ea5e9','#6366f1'],['#14b8a6','#22c55e'],
];

function getGradient(id: string) {
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = id.charCodeAt(i) + ((hash << 5) - hash);
  const [a, b] = PALETTE[Math.abs(hash) % PALETTE.length];
  return `linear-gradient(135deg, ${a}, ${b})`;
}

function getInitials(name: string) {
  return name
    .split(/[\s—–\-]+/)
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

function relativeTime(ts: number) {
  const diff = Date.now() - ts * 1000;
  const m = Math.floor(diff / 60000);
  if (m < 1)  return 'vừa xong';
  if (m < 60) return `${m} phút trước`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h} giờ trước`;
  return `${Math.floor(h / 24)} ngày trước`;
}

// ── Component ────────────────────────────────────────────────────────────────

interface AgentCardProps {
  bot: Bot;
  brand?: Brand;
}

const AgentCard: React.FC<AgentCardProps> = ({ bot, brand }) => {
  const isActive = bot.status === 'active';

  return (
    <article className="agent-card" id={`agent-card-${bot.id}`}>
      {/* Header row */}
      <div className="agent-card__header">
        <div
          className="agent-avatar"
          style={{ background: getGradient(bot.id || bot.name) }}
          aria-label={bot.name}
        >
          {getInitials(bot.name)}
        </div>

        <div className="agent-meta">
          <p className="agent-name" title={bot.name}>{bot.name}</p>
          <div className="agent-badges">
            <span className={`badge ${isActive ? 'badge--active' : 'badge--inactive'}`}>
              {isActive ? '● Hoạt động' : '○ Tắt'}
            </span>
            {brand && (
              <span className="badge badge--brand" title={brand.name}>
                🏠 {brand.name}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Role prompt */}
      {bot.role_prompt && (
        <p className="agent-prompt">{bot.role_prompt}</p>
      )}

      {/* Stats */}
      <div className="agent-stats">
        <div className="agent-stat">
          <span className="agent-stat__value">{bot.max_tokens.toLocaleString()}</span>
          <span className="agent-stat__label">Max Tokens</span>
        </div>
        <div className="agent-stat">
          <span className="agent-stat__value">{bot.temperature}</span>
          <span className="agent-stat__label">Temperature</span>
        </div>
        <div className="agent-stat">
          <span className="agent-stat__value">{bot.language.length}</span>
          <span className="agent-stat__label">Ngôn ngữ</span>
        </div>
      </div>

      {/* Footer */}
      <div className="agent-card__footer">
        <div className="lang-tags">
          {bot.language.map((l) => (
            <span key={l} className="lang-tag">{l.toUpperCase()}</span>
          ))}
        </div>
        <span title={new Date((bot.updated_at || bot.created_at) * 1000).toLocaleString('vi-VN')}>
          🕐 {relativeTime(bot.updated_at || bot.created_at)}
        </span>
      </div>
    </article>
  );
};

export default AgentCard;
