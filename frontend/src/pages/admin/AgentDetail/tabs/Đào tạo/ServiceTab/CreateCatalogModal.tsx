import React, { useState } from 'react';
import * as catalogService from '../../../../../../services/admin/catalogService';
import type { ServiceCatalog } from '../../../../../../types';
import './ServiceTab.css';

interface CreateCatalogModalProps {
  onClose: () => void;
  onSuccess: () => void;
  brandId?: string;
  brandName?: string;
  catalogToEdit?: ServiceCatalog | null;
}

const CreateCatalogModal: React.FC<CreateCatalogModalProps> = ({
  onClose,
  onSuccess,
  brandId,
  brandName,
  catalogToEdit,
}) => {
  const [categoryName, setCategoryName] = useState(catalogToEdit?.category_name || '');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectedBrandId = catalogToEdit?.brand_id || brandId || '';
  const displayBrandName = brandName || selectedBrandId;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryName || !selectedBrandId) {
      setError('Vui lòng điền các trường bắt buộc (*)');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      if (catalogToEdit) {
        await catalogService.updateCatalog(catalogToEdit.id, {
          category_name: categoryName,
          brand_id: selectedBrandId,
        });
      } else {
        await catalogService.createCatalog({
          category_name: categoryName,
          brand_id: selectedBrandId,
        });
      }
      onSuccess();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Có lỗi xảy ra');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="svc-modal-overlay">
      <div className="svc-modal" style={{ maxWidth: 520 }}>
        {/* Header */}
        <div className="svc-modal-header">
          <span className="svc-modal-title">
            {catalogToEdit ? 'Chỉnh sửa danh mục' : 'Tạo danh mục dịch vụ'}
          </span>
          <button className="svc-modal-close" onClick={onClose}>×</button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit}>
          <div className="svc-modal-body">
            {error && <div className="svc-error-bar">{error}</div>}

            <div className="svc-form-group" style={{ marginBottom: 16 }}>
              <label className="svc-form-label">
                Tên danh mục <span className="svc-required">*</span>
              </label>
              <input
                type="text"
                className="svc-form-input"
                placeholder="Nhập tên danh mục"
                value={categoryName}
                onChange={e => setCategoryName(e.target.value)}
              />
            </div>

            <div className="svc-form-group" style={{ marginBottom: 16 }}>
              <label className="svc-form-label">
                Thương hiệu <span className="svc-required">*</span>
              </label>
              <input
                type="text"
                className="svc-form-input"
                value={displayBrandName}
                readOnly
                disabled
                style={{ background: 'var(--color-surface-2)', color: 'var(--color-text-sub)' }}
              />
              <span style={{ fontSize: 11, color: 'var(--color-text-sub)', marginTop: 2 }}>
                Thương hiệu được lấy từ Agent hiện tại
              </span>
            </div>

            <div className="svc-form-group">
              <label className="svc-form-label">Mô tả</label>
              <textarea
                className="svc-form-textarea"
                placeholder="Nhập mô tả (tùy chọn)"
                rows={3}
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
              <span style={{ fontSize: 11, color: 'var(--color-text-sub)', marginTop: 2 }}>
                Trường mô tả hiện chưa được lưu vào API.
              </span>
            </div>
          </div>

          {/* Footer */}
          <div className="svc-modal-footer">
            <button type="button" className="svc-btn svc-btn--ghost" onClick={onClose} disabled={loading}>
              Đóng
            </button>
            <button type="submit" className="svc-btn svc-btn--primary" disabled={loading}>
              {loading ? 'Đang lưu...' : 'Lưu'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCatalogModal;
