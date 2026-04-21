import React, { useState, useEffect } from 'react';
import { createBot } from '../../services/admin/botService';
import { getAllBrands } from '../../services/admin/brandService';
import type { BotCreatePayload, Brand } from '../../types';

interface Props {
  onClose: () => void;
  onSuccess: () => void;
}

const LANG_OPTIONS = ['vi', 'en', 'zh', 'ja', 'ko', 'fr', 'de', 'es'];

const CreateBotModal: React.FC<Props> = ({ onClose, onSuccess }) => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [form, setForm] = useState<BotCreatePayload>({
    name: '',
    language: ['vi'],
    role_prompt: '',
    temperature: 0.7,
    max_tokens: 1024,
    status: 'active',
    brand_id: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch brands để chọn
  useEffect(() => {
    getAllBrands()
      .then((res) => setBrands(res.data ?? []))
      .catch(() => {});
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const toggleLang = (lang: string) =>
    setForm((prev) => ({
      ...prev,
      language: prev.language.includes(lang)
        ? prev.language.filter((l) => l !== lang)
        : [...prev.language, lang],
    }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) { setError('Tên AI Agent là bắt buộc.'); return; }
    if (!form.brand_id)    { setError('Vui lòng chọn thương hiệu.'); return; }
    if (!form.language.length) { setError('Chọn ít nhất 1 ngôn ngữ.'); return; }
    setError('');
    setLoading(true);
    try {
      await createBot({
        ...form,
        temperature: Number(form.temperature),
        max_tokens: Number(form.max_tokens),
      });
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err?.response?.data?.message || err.message || 'Có lỗi xảy ra.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal" style={{ maxWidth: 560 }} role="dialog" aria-modal="true"
        aria-labelledby="modal-bot-title">
        <div className="modal-header">
          <h2 className="modal-title" id="modal-bot-title">🤖 Tạo AI Agent mới</h2>
          <button className="modal-close" onClick={onClose} aria-label="Đóng">✕</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            {error && (
              <div className="error-banner" style={{ gridColumn: 'unset' }}>
                ⚠️ {error}
              </div>
            )}

            {/* Name */}
            <div className="form-group">
              <label className="form-label" htmlFor="bot-name">
                Tên AI Agent <span className="req">*</span>
              </label>
              <input
                id="bot-name" name="name" className="form-input"
                placeholder="VD: MASS Bot — Hà Nội" value={form.name}
                onChange={handleChange} autoFocus required
              />
            </div>

            {/* Brand */}
            <div className="form-group">
              <label className="form-label" htmlFor="bot-brand">
                Thương hiệu <span className="req">*</span>
              </label>
              <select
                id="bot-brand" name="brand_id"
                className="form-select" value={form.brand_id} onChange={handleChange}
              >
                <option value="">— Chọn thương hiệu —</option>
                {brands.map((b) => (
                  <option key={b.id} value={b.id}>{b.name}</option>
                ))}
              </select>
              {brands.length === 0 && (
                <p className="form-hint">⚠️ Chưa có thương hiệu nào. Hãy tạo trước.</p>
              )}
            </div>

            {/* Role Prompt */}
            <div className="form-group">
              <label className="form-label" htmlFor="bot-prompt">Vai trò (Role Prompt)</label>
              <textarea
                id="bot-prompt" name="role_prompt" className="form-textarea"
                placeholder="Bạn là trợ lý AI cho chuỗi cà phê MASS, hỗ trợ khách đặt hàng..."
                value={form.role_prompt} onChange={handleChange}
              />
            </div>

            {/* Language pills */}
            <div className="form-group">
              <label className="form-label">Ngôn ngữ hỗ trợ</label>
              <div className="lang-pills">
                {LANG_OPTIONS.map((lang) => (
                  <button
                    key={lang} type="button" id={`lang-${lang}`}
                    className={`lang-pill${form.language.includes(lang) ? ' active' : ''}`}
                    onClick={() => toggleLang(lang)}
                  >
                    {lang.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Temperature + Max Tokens */}
            <div className="form-2col">
              <div className="form-group">
                <label className="form-label" htmlFor="bot-temp">
                  Temperature <span style={{ fontWeight: 400, color: 'var(--color-text-sub)' }}>
                    ({form.temperature})
                  </span>
                </label>
                <input
                  id="bot-temp" name="temperature" type="range"
                  min="0" max="2" step="0.1"
                  value={form.temperature} onChange={handleChange}
                  style={{ width: '100%', accentColor: 'var(--color-primary)' }}
                />
                <p className="form-hint">0 = chính xác · 2 = sáng tạo</p>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="bot-tokens">Max Tokens</label>
                <input
                  id="bot-tokens" name="max_tokens" type="number"
                  min="128" max="8192" step="128"
                  className="form-input" value={form.max_tokens} onChange={handleChange}
                />
              </div>
            </div>

            {/* Status */}
            <div className="form-group">
              <label className="form-label" htmlFor="bot-status">Trạng thái</label>
              <select
                id="bot-status" name="status"
                className="form-select" value={form.status} onChange={handleChange}
              >
                <option value="active">Hoạt động</option>
                <option value="inactive">Không hoạt động</option>
              </select>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn--ghost" onClick={onClose}>Hủy</button>
            <button
              type="submit" id="btn-submit-bot"
              className="btn btn--primary" disabled={loading}
            >
              {loading ? '⏳ Đang tạo...' : '🤖 Tạo AI Agent'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBotModal;
