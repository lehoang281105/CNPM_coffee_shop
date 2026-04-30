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

const CreateServiceModal: React.FC<CreateServiceModalProps> = ({ onClose, onSuccess, brandId, serviceToEdit }) => {
  const meta = serviceToEdit?.service_metadata || {};
  
  // Base fields
  const [name, setName] = useState(serviceToEdit?.name || '');
  const [description, setDescription] = useState(serviceToEdit?.description || '');
  const [status, setStatus] = useState<'active' | 'inactive'>(serviceToEdit?.status || 'active');
  const [selectedBrandId] = useState(serviceToEdit?.brand_id || brandId || '');
  
  // Metadata fields
  const [serviceCode, setServiceCode] = useState(meta.service_code || '');
  const [slug, setSlug] = useState(meta.slug || '');
  const [catalogId, setCatalogId] = useState(meta.catalog_id || '');
  const [duration, setDuration] = useState<number | string>(meta.duration || '');
  const [imageBase64, setImageBase64] = useState(meta.image_url || '');
  const [tags, setTags] = useState(meta.tags?.join(', ') || '');
  const [generalPrice, setGeneralPrice] = useState<number | string>(meta.general_price || '');

  const [catalogs, setCatalogs] = useState<ServiceCatalog[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCatalogs = async () => {
      try {
        const res = await catalogService.getAllCatalogs();
        setCatalogs(res.data || []);
      } catch (err) {
        console.error('Failed to load catalogs', err);
      }
    };
    fetchCatalogs();
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Kích thước tệp tối đa là 5 MB.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageBase64(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
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
      branch_id: serviceToEdit?.branch_id || undefined, // Keep existing branch_id if any
      service_metadata: {
        service_code: serviceCode,
        slug,
        catalog_id: catalogId,
        duration: Number(duration) || 0,
        image_url: imageBase64,
        tags: tags.split(',').map(t => t.trim()).filter(Boolean),
        general_price: Number(generalPrice) || 0,
        conditional_prices: meta.conditional_prices || [], // Preserve existing conditional prices
      }
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
    <div className="modal-overlay">
      <div className="modal" style={{ maxWidth: 800 }}>
        <div className="modal-header">
          <h3>{serviceToEdit ? 'Chỉnh sửa dịch vụ' : 'Tạo dịch vụ'}</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit} className="modal-body">
          {error && <div className="error-message" style={{ color: 'red', marginBottom: 16 }}>{error}</div>}
          
          <div style={{ display: 'flex', gap: 24 }}>
            {/* Cột trái */}
            <div style={{ flex: 2 }}>
              <div className="form-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
                <div className="form-group">
                  <label>Mã dịch vụ <span className="required">*</span></label>
                  <input type="text" className="form-control" placeholder="Nhập mã dịch vụ" value={serviceCode} onChange={e => setServiceCode(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Tên dịch vụ <span className="required">*</span></label>
                  <input type="text" className="form-control" placeholder="Nhập tên dịch vụ" value={name} onChange={e => setName(e.target.value)} />
                </div>
                
                <div className="form-group">
                  <label>Slug</label>
                  <input type="text" className="form-control" placeholder="Nhập slug" value={slug} onChange={e => setSlug(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Danh mục dịch vụ <span className="required">*</span></label>
                  <select className="form-control" value={catalogId} onChange={e => setCatalogId(e.target.value)}>
                    <option value="">Nhập để tìm danh mục dịch vụ</option>
                    {catalogs.map(c => (
                      <option key={c.id} value={c.id}>{c.category_name}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Thời lượng dịch vụ (Phút)</label>
                  <input type="number" className="form-control" placeholder="0" value={duration} onChange={e => setDuration(e.target.value)} />
                </div>
              </div>

              <div className="form-group">
                <label>Mô tả chi tiết</label>
                <textarea className="form-control" placeholder="Nhập mô tả chi tiết" rows={4} value={description} onChange={e => setDescription(e.target.value)} />
              </div>

              <div className="form-group">
                <label>Hình ảnh dịch vụ</label>
                <div className="image-upload-area" style={{ border: '1px dashed #ccc', padding: 20, textAlign: 'center', borderRadius: 4, position: 'relative' }}>
                  {imageBase64 ? (
                    <div>
                      <img src={imageBase64} alt="Preview" style={{ maxHeight: 100, objectFit: 'contain' }} />
                      <button type="button" onClick={() => setImageBase64('')} style={{ position: 'absolute', top: 5, right: 5, background: 'red', color: 'white', border: 'none', borderRadius: '50%', width: 24, height: 24, cursor: 'pointer' }}>×</button>
                    </div>
                  ) : (
                    <>
                      <input type="file" accept=".jpg,.jpeg,.png" onChange={handleImageUpload} style={{ position: 'absolute', opacity: 0, top: 0, left: 0, width: '100%', height: '100%', cursor: 'pointer' }} />
                      <span style={{ color: 'var(--color-primary)' }}>Nhấp để tải lên</span> hoặc kéo thả ảnh vào đây
                      <p style={{ fontSize: 12, color: '#888', marginTop: 8 }}>Tải lên tệp jpg, jpeg, png - Kích thước tệp tối đa là 5 MB.</p>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Cột phải */}
            <div style={{ flex: 1, borderLeft: '1px solid #eee', paddingLeft: 24 }}>
              <div className="form-group" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label style={{ margin: 0 }}>Trạng thái</label>
                <label className="switch">
                  <input type="checkbox" checked={status === 'active'} onChange={(e) => setStatus(e.target.checked ? 'active' : 'inactive')} />
                  <span className="slider round"></span>
                </label>
              </div>

              <div className="form-group">
                <label>Tag</label>
                <input type="text" className="form-control" placeholder="Nhập tags (cách nhau bởi dấu phẩy)" value={tags} onChange={e => setTags(e.target.value)} />
              </div>

              <div className="form-group">
                <label>Giá chung</label>
                <input type="number" className="form-control" placeholder="0" value={generalPrice} onChange={e => setGeneralPrice(e.target.value)} />
              </div>

              <div className="form-group">
                <label>Giá điều kiện</label>
                <button type="button" className="btn btn-outline" style={{ width: '100%' }}>+ Thêm giá</button>
              </div>
            </div>
          </div>

          <div className="modal-footer" style={{ marginTop: 24 }}>
            <button type="button" className="btn btn-secondary" onClick={onClose} disabled={loading}>Đóng</button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Đang lưu...' : 'Lưu'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateServiceModal;
