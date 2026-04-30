import React, { useState } from 'react';
import * as catalogService from '../../../../../../services/admin/catalogService';
import type { ServiceCatalog } from '../../../../../../types';
import './ServiceTab.css';

interface CreateCatalogModalProps {
  onClose: () => void;
  onSuccess: () => void;
  brandId?: string;
  catalogToEdit?: ServiceCatalog | null;
}

const CreateCatalogModal: React.FC<CreateCatalogModalProps> = ({ onClose, onSuccess, brandId, catalogToEdit }) => {
  const [categoryName, setCategoryName] = useState(catalogToEdit?.category_name || '');
  const [selectedBrandId, setSelectedBrandId] = useState(catalogToEdit?.brand_id || brandId || '');
  const [description, setDescription] = useState(''); // Not saved to API yet as discussed
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // In a real app, we'd fetch brands here. Assuming brandId is passed or we just allow input for now.
  
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
    <div className="modal-overlay">
      <div className="modal" style={{ maxWidth: 600 }}>
        <div className="modal-header">
          <h3>{catalogToEdit ? 'Chỉnh sửa danh mục' : 'Tạo danh mục dịch vụ'}</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit} className="modal-body form-grid">
          {error && <div className="error-message" style={{ color: 'red', marginBottom: 16 }}>{error}</div>}
          
          <div className="form-group">
            <label>Tên danh mục <span className="required">*</span></label>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Nhập tên danh mục"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Thương hiệu <span className="required">*</span></label>
            <select 
              className="form-control"
              value={selectedBrandId}
              onChange={(e) => setSelectedBrandId(e.target.value)}
            >
              <option value="">Nhập để tìm thương hiệu</option>
              {brandId && <option value={brandId}>Brand hiện tại</option>}
              {/* Other brands would be loaded here */}
            </select>
          </div>

          <div className="form-group">
            <label>Mô tả</label>
            <textarea 
              className="form-control" 
              placeholder="Nhập mô tả"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="modal-footer">
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

export default CreateCatalogModal;
