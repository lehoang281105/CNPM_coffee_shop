import React, { useState } from 'react';
import { createBrand } from '../../services/admin/brandService';
import type { BrandCreatePayload } from '../../types';

interface Props {
  onClose: () => void;
  onSuccess: () => void;
}

const CreateBrandModal: React.FC<Props> = ({ onClose, onSuccess }) => {
  const [form, setForm] = useState<BrandCreatePayload>({
    name: '',
    description: '',
    logo_url: '',
    status: 'active',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) { setError('Tên thương hiệu là bắt buộc.'); return; }
    setError('');
    setLoading(true);
    try {
      await createBrand(form);
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
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-brand-title">
        <div className="modal-header">
          <h2 className="modal-title" id="modal-brand-title">🏠 Tạo thương hiệu mới</h2>
          <button className="modal-close" onClick={onClose} aria-label="Đóng">✕</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            {error && (
              <div className="error-banner" style={{ gridColumn: 'unset' }}>
                ⚠️ {error}
              </div>
            )}

            <div className="form-group">
              <label className="form-label" htmlFor="brand-name">
                Tên thương hiệu <span className="req">*</span>
              </label>
              <input
                id="brand-name" name="name" className="form-input"
                placeholder="VD: MASS Coffee" value={form.name}
                onChange={handleChange} autoFocus required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="brand-desc">Mô tả</label>
              <textarea
                id="brand-desc" name="description" className="form-textarea"
                placeholder="Mô tả ngắn về thương hiệu..."
                value={form.description} onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="brand-logo">URL Logo</label>
              <input
                id="brand-logo" name="logo_url" className="form-input"
                placeholder="https://example.com/logo.png"
                value={form.logo_url} onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="brand-status">Trạng thái</label>
              <select
                id="brand-status" name="status"
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
              type="submit" id="btn-submit-brand"
              className="btn btn--primary" disabled={loading}
            >
              {loading ? '⏳ Đang tạo...' : '✓ Tạo thương hiệu'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBrandModal;
