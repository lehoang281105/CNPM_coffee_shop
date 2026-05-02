import React, { useState, useEffect } from 'react';
import * as serviceService from '../../../../../../services/admin/serviceService';
import * as catalogService from '../../../../../../services/admin/catalogService';
import type { Service, ServiceCatalog } from '../../../../../../types';
import './ServiceTab.css';

interface CreateServiceModalProps {
  onClose: () => void;
  onSuccess: () => void;
  brandId?: string;
  serviceToEdit?: Service | null;
}

const CreateServiceModal: React.FC<CreateServiceModalProps> = ({
  onClose,
  onSuccess,
  brandId,
  serviceToEdit,
}) => {
  const meta = serviceToEdit?.service_metadata || {};

  // Root payload fields
  const [name, setName] = useState(serviceToEdit?.name || '');
  const [description, setDescription] = useState(serviceToEdit?.description || '');
  const [status, setStatus] = useState<'active' | 'inactive'>(serviceToEdit?.status || 'active');
  const selectedBrandId = serviceToEdit?.brand_id || brandId || '';

  // service_metadata fields
  const [serviceCode, setServiceCode] = useState(meta.service_code || '');
  const [slug, setSlug] = useState(meta.slug || '');
  const [catalogId, setCatalogId] = useState(meta.catalog_id || '');
  const [duration, setDuration] = useState<number | string>(meta.duration ?? '');
  const [imageBase64, setImageBase64] = useState(meta.image_url || '');
  const [tags, setTags] = useState(meta.tags?.join(', ') || '');
  const [generalPrice, setGeneralPrice] = useState<number | string>(meta.general_price ?? '');

  const [catalogs, setCatalogs] = useState<ServiceCatalog[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    catalogService.getAllCatalogs()
      .then(res => setCatalogs(res.data || []))
      .catch(err => console.error('Failed to load catalogs', err));
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert('Kích thước tệp tối đa là 5 MB.');
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => setImageBase64(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceCode || !name || !catalogId) {
      setError('Vui lòng điền các trường bắt buộc (*)');
      return;
    }
    setLoading(true);
    setError(null);
    const payload = {
      name,
      description,
      status,
      brand_id: selectedBrandId,
      branch_id: serviceToEdit?.branch_id,
      service_metadata: {
        service_code: serviceCode,
        slug,
        catalog_id: catalogId,
        duration: Number(duration) || 0,
        image_url: imageBase64,
        tags: tags.split(',').map(t => t.trim()).filter(Boolean),
        general_price: Number(generalPrice) || 0,
        conditional_prices: meta.conditional_prices || [],
      },
    };
    try {
      if (serviceToEdit) {
        await serviceService.updateService(serviceToEdit.id, payload);
      } else {
        await serviceService.createService(payload);
      }
      onSuccess();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Có lỗi xảy ra khi lưu dịch vụ');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="svc-modal-overlay">
      <div className="svc-modal" style={{ maxWidth: 960, width: '90vw' }}>
        {/* Header */}
        <div className="svc-modal-header">
          <span className="svc-modal-title">
            {serviceToEdit ? 'Chỉnh sửa dịch vụ' : 'Tạo dịch vụ'}
          </span>
          <button className="svc-modal-close" onClick={onClose}>×</button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit}>
          <div className="svc-modal-body">
            {error && <div className="svc-error-bar">{error}</div>}

            <div className="svc-modal-two-col">
              {/* LEFT column */}
              <div className="svc-modal-col-main">
                <div className="svc-form-grid">
                  <div className="svc-form-group">
                    <label className="svc-form-label">
                      Mã dịch vụ <span className="svc-required">*</span>
                    </label>
                    <input
                      type="text"
                      className="svc-form-input"
                      placeholder="Nhập mã dịch vụ"
                      value={serviceCode}
                      onChange={e => setServiceCode(e.target.value)}
                    />
                  </div>

                  <div className="svc-form-group">
                    <label className="svc-form-label">
                      Tên dịch vụ <span className="svc-required">*</span>
                    </label>
                    <input
                      type="text"
                      className="svc-form-input"
                      placeholder="Nhập tên dịch vụ"
                      value={name}
                      onChange={e => setName(e.target.value)}
                    />
                  </div>

                  <div className="svc-form-group">
                    <label className="svc-form-label">Slug</label>
                    <input
                      type="text"
                      className="svc-form-input"
                      placeholder="Nhập slug"
                      value={slug}
                      onChange={e => setSlug(e.target.value)}
                    />
                  </div>

                  <div className="svc-form-group">
                    <label className="svc-form-label">
                      Danh mục dịch vụ <span className="svc-required">*</span>
                    </label>
                    <select
                      className="svc-form-select"
                      value={catalogId}
                      onChange={e => setCatalogId(e.target.value)}
                    >
                      <option value="">-- Chọn danh mục --</option>
                      {catalogs.map(c => (
                        <option key={c.id} value={c.id}>{c.category_name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="svc-form-group">
                    <label className="svc-form-label">Thời lượng</label>
                    <div className="svc-form-input-wrap">
                      <input
                        type="number"
                        className="svc-form-input"
                        placeholder="0"
                        value={duration}
                        onChange={e => setDuration(e.target.value)}
                      />
                      <select className="svc-form-select-small">
                        <option>Phút</option>
                        <option>Giờ</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="svc-form-group">
                  <label className="svc-form-label">Mô tả chi tiết</label>
                  <textarea
                    className="svc-form-textarea"
                    placeholder="Nhập mô tả chi tiết"
                    rows={4}
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                  />
                </div>

                <div className="svc-form-group">
                  <label className="svc-form-label">Hình ảnh dịch vụ</label>
                  <div className="svc-upload-area">
                    {imageBase64 ? (
                      <div className="svc-upload-preview">
                        <img src={imageBase64} alt="Preview" />
                        <button
                          type="button"
                          className="svc-upload-remove"
                          onClick={() => setImageBase64('')}
                        >×</button>
                      </div>
                    ) : (
                      <>
                        <input type="file" accept=".jpg,.jpeg,.png" onChange={handleImageUpload} />
                        <div className="svc-upload-area-text">
                          <span>Nhấp để tải lên</span> hoặc kéo thả ảnh vào đây
                        </div>
                        <div className="svc-upload-area-hint">
                          Tải lên tệp jpg, jpeg, png — tối đa 5 MB.
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* RIGHT column */}
              <div className="svc-modal-col-side">
                <div className="svc-switch-row">
                  <span className="svc-switch-label">Trạng thái</span>
                  <label className="svc-switch">
                    <input
                      type="checkbox"
                      checked={status === 'active'}
                      onChange={e => setStatus(e.target.checked ? 'active' : 'inactive')}
                    />
                    <span className="svc-slider" />
                  </label>
                </div>

                <div className="svc-form-group">
                  <label className="svc-form-label">Tag</label>
                  <input
                    type="text"
                    className="svc-form-input"
                    placeholder="tag1, tag2, tag3"
                    value={tags}
                    onChange={e => setTags(e.target.value)}
                  />
                  <span style={{ fontSize: 11, color: 'var(--color-text-sub)', marginTop: 2 }}>
                    Các tag cách nhau bởi dấu phẩy
                  </span>
                </div>

                <div className="svc-form-group">
                  <label className="svc-form-label">Giá chung</label>
                  <input
                    type="number"
                    className="svc-form-input"
                    placeholder="0"
                    value={generalPrice}
                    onChange={e => setGeneralPrice(e.target.value)}
                  />
                </div>

                <div className="svc-form-group">
                  <label className="svc-form-label">Giá điều kiện</label>
                  <button
                    type="button"
                    className="svc-btn svc-btn--outline"
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    + Thêm giá
                  </button>
                </div>
              </div>
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

export default CreateServiceModal;
