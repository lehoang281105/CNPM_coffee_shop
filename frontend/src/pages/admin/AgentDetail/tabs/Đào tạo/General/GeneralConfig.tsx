import React, { useState, useEffect } from 'react';
import type { Bot, Brand, WorkingHours, WorkingHoursDay } from '../../../../../../types';
import './GeneralConfig.css';

// ── Constants ─────────────────────────────────────────────────────────
const TONES = [
  { id: 'professional', left: 'Trang trọng', right: 'Thoải mái', defaultValue: 80, badge: 'Professional' },
  { id: 'warm', left: 'Ấm áp', right: 'Trung lập', defaultValue: 30, badge: 'High' },
  { id: 'concise', left: 'Ngắn gọn', right: 'Chi tiết', defaultValue: 50, badge: 'Balanced' },
  { id: 'empathy', left: 'Thấu cảm', right: 'Thẳng thắn', defaultValue: 20, badge: 'High' },
  { id: 'technical', left: 'Mức kỹ thuật', right: 'Đơn giản', defaultValue: 70, badge: 'Accessible' },
];

type DayKey = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

const DAYS: { key: DayKey; label: string }[] = [
  { key: 'monday', label: 'Thứ 2' },
  { key: 'tuesday', label: 'Thứ 3' },
  { key: 'wednesday', label: 'Thứ 4' },
  { key: 'thursday', label: 'Thứ 5' },
  { key: 'friday', label: 'Thứ 6' },
  { key: 'saturday', label: 'Thứ 7' },
  { key: 'sunday', label: 'Chủ nhật' },
];

// FE cần trường enabled để toggle UI, API không có trường này
interface WorkingHoursDayLocal extends WorkingHoursDay {
  enabled: boolean;
}
type WorkingHoursLocal = Record<DayKey, WorkingHoursDayLocal>;

const DEFAULT_WH: WorkingHoursLocal = {
  monday: { start: '08:00', end: '22:00', enabled: true },
  tuesday: { start: '08:00', end: '22:00', enabled: true },
  wednesday: { start: '08:00', end: '22:00', enabled: true },
  thursday: { start: '08:00', end: '22:00', enabled: true },
  friday: { start: '08:00', end: '22:00', enabled: true },
  saturday: { start: '08:00', end: '22:00', enabled: false },
  sunday: { start: '08:00', end: '22:00', enabled: false },
};

/** Chuyển API working_hours → local state (thêm trường enabled) */
const apiToLocal = (wh?: WorkingHours): WorkingHoursLocal => {
  const result = { ...DEFAULT_WH };
  if (!wh) return result;
  DAYS.forEach(({ key }) => {
    if (wh[key]) {
      result[key] = { ...wh[key]!, enabled: true };
    } else {
      result[key] = { ...result[key], enabled: false };
    }
  });
  return result;
};

/** Chuyển local state → API payload (bỏ enabled, chỉ gửi ngày bật) */
const localToApi = (local: WorkingHoursLocal): WorkingHours => {
  const result: WorkingHours = {};
  DAYS.forEach(({ key }) => {
    if (local[key].enabled) {
      result[key] = { start: local[key].start, end: local[key].end };
    }
  });
  return result;
};

// ── Component ─────────────────────────────────────────────────────────
interface GeneralConfigProps {
  bot: Bot;
  brand?: Brand | null;
  onSave: (payload: any) => Promise<void>;
}

const GeneralConfig: React.FC<GeneralConfigProps> = ({ bot, brand, onSave }) => {
  // ── Persona state ───────────────────────────────────────────
  const [name, setName] = useState(bot.name || '');
  const [rolePrompt, setRolePrompt] = useState(bot.role_prompt || '');
  const [role, setRole] = useState('');
  const [maxTokens, setMaxTokens] = useState(bot.max_tokens || 100);
  const [tones, setTones] = useState(TONES.map(t => ({ ...t, value: t.defaultValue })));

  // ── Working hours state ─────────────────────────────────────
  const [workingHours, setWorkingHours] = useState<WorkingHoursLocal>(apiToLocal(bot.working_hours));

  // ── Nudge state ─────────────────────────────────────────────
  const [nudgeEnabled, setNudgeEnabled] = useState(bot.nudge_settings?.enabled ?? false);
  const [nudgeDelay, setNudgeDelay] = useState<number | string>(bot.nudge_settings?.delays?.[0] ?? 60);

  useEffect(() => {
    if (bot) {
      setName(bot.name || '');
      setRolePrompt(bot.role_prompt || '');
      setMaxTokens(bot.max_tokens || 100);
      setWorkingHours(apiToLocal(bot.working_hours));
      setNudgeEnabled(bot.nudge_settings?.enabled ?? false);
      setNudgeDelay(bot.nudge_settings?.delays?.[0] ?? 60);
    }
  }, [bot]);

  // ── Working hours handlers ──────────────────────────────────
  const handleDayToggle = (day: DayKey) => {
    setWorkingHours(prev => ({ ...prev, [day]: { ...prev[day], enabled: !prev[day].enabled } }));
  };

  const handleTimeChange = (day: DayKey, field: 'start' | 'end', value: string) => {
    setWorkingHours(prev => ({ ...prev, [day]: { ...prev[day], [field]: value } }));
  };

  const handleApplyAll = () => {
    setWorkingHours(prev => {
      const first = prev.monday;
      const updated = { ...prev };
      DAYS.forEach(({ key }) => {
        updated[key] = { start: first.start, end: first.end, enabled: updated[key].enabled };
      });
      return updated;
    });
  };

  // ── General handlers ────────────────────────────────────────
  const handleSave = () => {
    onSave({
      ...bot,
      name,
      role_prompt: rolePrompt,
      max_tokens: maxTokens,
      working_hours: localToApi(workingHours),
      nudge_settings: {
        enabled: nudgeEnabled,
        delays: [Math.max(10, Number(nudgeDelay) || 60)],
      },
    });
  };

  const handleToneChange = (id: string, val: number) => {
    setTones(tones.map(t => t.id === id ? { ...t, value: val } : t));
  };

  return (
    <>
      <div className="config-header">
        <div>
          <h1 className="config-title">Cấu hình chung</h1>
          <p className="config-subtitle">Persona, tông giọng và độ dài phản hồi của AI</p>
        </div>
        <div className="config-actions">
          <button className="btn btn--primary" onClick={handleSave}>Lưu thay đổi</button>
        </div>
      </div>

      <div className="general-config-grid">
        {/* Left Column: Persona */}
        <div className="config-section">
          <div className="config-section-header">
            <div className="config-section-icon">👤</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14 }}>Persona</div>
              <div style={{ fontSize: 12, color: 'var(--color-text-sub)' }}>Định danh và vai trò của AI</div>
            </div>
          </div>
          <div className="config-section-body">
            <div className="form-group">
              <label className="form-label">Tên Agent</label>
              <input className="form-input" value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Vai trò</label>
              <input className="form-input" value={role} onChange={e => setRole(e.target.value)} placeholder="Để trống" />
            </div>
            <div className="form-group">
              <label className="form-label">Thương hiệu</label>
              <input className="form-input" value={brand?.name || 'Không có thương hiệu'} readOnly disabled style={{ backgroundColor: 'var(--color-bg-sub)' }} />
            </div>
            <div className="form-group">
              <label className="form-label">Mô tả</label>
              <textarea
                className="form-textarea"
                value={rolePrompt}
                onChange={e => setRolePrompt(e.target.value)}
              />
            </div>
            <p style={{ fontSize: 11, color: 'var(--color-text-sub)' }}>
              Mô tả này định hình cách AI tự nhận diện và tương tác.
            </p>
          </div>
        </div>

        {/* Right Column: Tổng giọng */}
        <div className="config-section">
          <div className="config-section-header">
            <div className="config-section-icon yellow">🗣️</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14 }}>Tông giọng</div>
              <div style={{ fontSize: 12, color: 'var(--color-text-sub)' }}>Phong cách giao tiếp của AI</div>
            </div>
          </div>
          <div className="config-section-body">
            {tones.map(tone => (
              <div key={tone.id}>
                <div className="tone-slider-group">
                  <span>{tone.left}</span>
                  <span className="tone-badge">{tone.badge}</span>
                </div>
                <div className="tone-slider-wrap" style={{ position: 'relative' }}>
                  <div className="tone-slider-track" />
                  <div className="tone-slider-thumb" style={{ left: `${tone.value}%` }} />
                  <input
                    type="range"
                    min="0" max="100"
                    value={tone.value}
                    onChange={e => handleToneChange(tone.id, parseInt(e.target.value))}
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }}
                  />
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', fontSize: 11, color: 'var(--color-text-sub)', marginTop: -20 }}>
                  {tone.right}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom: Độ dài */}
      <div className="config-section" style={{ marginTop: 20 }}>
        <div className="config-section-header">
          <div className="config-section-icon blue-gray">📏</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 14 }}>Độ dài phản hồi</div>
            <div style={{ fontSize: 12, color: 'var(--color-text-sub)' }}>Kiểm soát độ dài câu trả lời của AI — ngắn gọn hay chi tiết</div>
          </div>
        </div>
        <div className="config-section-body">
          <div className="radio-cards">
            {/* Ngắn */}
            <div className={`radio-card ${maxTokens === 50 ? 'selected' : ''}`} onClick={() => setMaxTokens(50)}>
              <div className="radio-card-header">
                <div>
                  <div className="radio-card-title">Ngắn (50 tokens)</div>
                  <div className="radio-card-sub">1-2 câu, trả lời trực tiếp</div>
                </div>
                <div className="radio-card-check" />
              </div>
              <div className="radio-card-desc">
                "Dạ bên em có dịch vụ triệt lông công nghệ Diode Laser, giá 500k/buổi ạ."
              </div>
            </div>

            {/* Trung bình */}
            <div className={`radio-card ${maxTokens === 100 ? 'selected' : ''}`} onClick={() => setMaxTokens(100)}>
              <div className="radio-card-header">
                <div>
                  <div className="radio-card-title">Trung bình (100 tokens)</div>
                  <div className="radio-card-sub">3-5 câu, giải thích ngắn gọn</div>
                </div>
                <div className="radio-card-check" />
              </div>
              <div className="radio-card-desc">
                "Dạ bên em có dịch vụ triệt lông công nghệ Diode Laser, giá 500k/buổi. Liệu trình thường 5-7 buổi, mỗi buổi cách nhau 4 tuần. Mình muốn em tư vấn kỹ hơn không ạ?"
              </div>
            </div>

            {/* Chi tiết */}
            <div className={`radio-card ${maxTokens === 150 ? 'selected' : ''}`} onClick={() => setMaxTokens(150)}>
              <div className="radio-card-header">
                <div>
                  <div className="radio-card-title">Chi tiết (150 tokens)</div>
                  <div className="radio-card-sub">5+ câu, hướng dẫn đầy đủ</div>
                </div>
                <div className="radio-card-check" />
              </div>
              <div className="radio-card-desc">
                "Dạ bên em có dịch vụ triệt lông công nghệ Diode Laser, giá 500k/buổi. Liệu trình 5-7 buổi, cách nhau 4 tuần. Công nghệ này an toàn, không đau, hiệu quả 95%. Em gửi mình lịch trống tuần này nhé ạ!"
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Working Hours ──────────────────────────────────────── */}
      <div className="config-section wh-section">
        <div className="config-section-header">
          <div className="config-section-icon" style={{ background: '#dcfce7', color: '#15803d' }}>🕐</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 14 }}>Giờ hoạt động chatbot</div>
            <div style={{ fontSize: 12, color: 'var(--color-text-sub)' }}>
              Cấu hình khung giờ bot được phép phản hồi tự động
            </div>
          </div>
        </div>
        <div className="config-section-body" style={{ padding: 0 }}>
          <table className="wh-table">
            <thead>
              <tr>
                <th style={{ width: 60 }}>Bật</th>
                <th style={{ width: 120 }}>Ngày</th>
                <th>Khung giờ</th>
                <th style={{ width: 120 }}></th>
              </tr>
            </thead>
            <tbody>
              {DAYS.map(({ key, label }, idx) => {
                const day = workingHours[key];
                return (
                  <tr key={key} className={!day.enabled ? 'wh-row--disabled' : ''}>
                    <td>
                      <label className="wh-switch">
                        <input
                          type="checkbox"
                          checked={day.enabled}
                          onChange={() => handleDayToggle(key)}
                        />
                        <span className="wh-slider" />
                      </label>
                    </td>
                    <td>
                      <span className="wh-day-name">{label}</span>
                    </td>
                    <td>
                      <div className="wh-time-cell">
                        <input
                          type="time"
                          className="wh-time-input"
                          value={day.start}
                          disabled={!day.enabled}
                          onChange={e => handleTimeChange(key, 'start', e.target.value)}
                        />
                        <span className="wh-arrow">→</span>
                        <input
                          type="time"
                          className="wh-time-input"
                          value={day.end}
                          disabled={!day.enabled}
                          onChange={e => handleTimeChange(key, 'end', e.target.value)}
                        />
                      </div>
                    </td>
                    <td>
                      {idx === 0 && (
                        <button
                          type="button"
                          className="wh-apply-all-btn"
                          onClick={handleApplyAll}
                          title="Copy giờ của Thứ 2 cho tất cả các ngày"
                        >
                          Áp dụng tất cả
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Nudge Settings ─────────────────────────────────────── */}
      <div className="config-section nudge-section">
        <div className="config-section-header">
          <div className="config-section-icon" style={{ background: '#fef3c7', color: '#d97706' }}>💬</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 14 }}>Nhắc nhở tự động</div>
            <div style={{ fontSize: 12, color: 'var(--color-text-sub)' }}>
              Gửi tin nhắn kéo chân khi khách không phản hồi
            </div>
          </div>
        </div>
        <div className="config-section-body">
          <div className="nudge-content">
            <div className="nudge-toggle-row">
              <div className="nudge-toggle-label">
                <span className="nudge-toggle-title">Bật tính năng nhắc nhở</span>
                <span className="nudge-toggle-desc">
                  Khi khách hàng không trả lời, bot sẽ tự động gửi tin nhắn nhắc nhở sau khoảng thời gian được cài đặt
                </span>
              </div>
              <label className="wh-switch">
                <input
                  type="checkbox"
                  checked={nudgeEnabled}
                  onChange={e => setNudgeEnabled(e.target.checked)}
                />
                <span className="wh-slider" />
              </label>
            </div>

            {nudgeEnabled && (
              <div className="nudge-delay-row">
                <span className="nudge-delay-label">Thời gian chờ trước khi nhắc:</span>
                <input
                  type="number"
                  className="nudge-delay-input"
                  value={nudgeDelay}
                  min={10}
                  max={3600}
                  onChange={e => setNudgeDelay(e.target.value === '' ? '' : parseInt(e.target.value))}
                  onBlur={() => setNudgeDelay(Math.max(10, Number(nudgeDelay) || 60))}
                />
                <span className="nudge-delay-unit">giây</span>
                <span className="nudge-delay-hint">
                  {Number(nudgeDelay) >= 60 
                    ? `≈ ${Math.floor(Number(nudgeDelay) / 60)} phút ${Number(nudgeDelay) % 60 > 0 ? `${Number(nudgeDelay) % 60}s` : ''}` 
                    : (nudgeDelay !== '' ? `≈ ${nudgeDelay} giây` : '')}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default GeneralConfig;
