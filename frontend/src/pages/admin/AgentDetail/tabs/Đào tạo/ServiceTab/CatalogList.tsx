import React, { useState, useEffect } from 'react';
import * as catalogService from '../../../../../../services/admin/catalogService';
import * as brandService from '../../../../../../services/admin/brandService';
import type { ServiceCatalog, Brand } from '../../../../../../types';
import CreateCatalogModal from './CreateCatalogModal';
import ConfirmModal from '../../../../../../components/common/ConfirmModal';
import NotificationModal from '../../../../../../components/common/NotificationModal';
import './ServiceTab.css';

interface CatalogListProps {
  brandId?: string;
}

const CatalogList: React.FC<CatalogListProps> = ({ brandId }) => {
  const [catalogs, setCatalogs] = useState<ServiceCatalog[]>([]);
  const [brandsMap, setBrandsMap] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [catalogToEdit, setCatalogToEdit] = useState<ServiceCatalog | null>(null);
  const [searchText, setSearchText] = useState('');

  // Confirm delete
  const [confirmId, setConfirmId] = useState<string | null>(null);
  // Notification
  const [notification, setNotification] = useState<{ title: string; message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [catalogRes, brandRes] = await Promise.all([
        catalogService.getCatalogs(),
        brandService.getAllBrands(),
      ]);
      const brands = brandRes.data || [];
      const map: Record<string, string> = {};
      brands.forEach((b: Brand) => (map[b.id] = b.name));
      setBrandsMap(map);
      const data = catalogRes.data || [];
      setCatalogs(brandId ? data.filter(c => c.brand_id === brandId) : data);
    } catch (err) {
      console.error('Failed to fetch catalogs', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brandId]);

  const handleDeleteConfirm = async () => {
    if (!confirmId) return;
    try {
      await catalogService.deleteCatalog(confirmId);
      setConfirmId(null);
      fetchData();
      setNotification({ title: 'Xóa thành công', message: 'Danh mục đã được xóa khỏi hệ thống.', type: 'success' });
    } catch (err) {
      setConfirmId(null);
      setNotification({ title: 'Xóa thất bại', message: 'Đã có lỗi xảy ra, vui lòng thử lại.', type: 'error' });
    }
  };

  const handleEdit = (catalog: ServiceCatalog) => {
    setCatalogToEdit(catalog);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCatalogToEdit(null);
  };

  const handleSuccess = () => {
    handleCloseModal();
    fetchData();
    setNotification({ title: 'Lưu thành công', message: 'Thông tin danh mục đã được cập nhật.', type: 'success' });
  };

  const filtered = catalogs.filter(c =>
    c.category_name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="service-panel">
      {/* Panel Header */}
      <div className="service-panel-header">
        <div className="service-panel-header-left">
          <div>
            <div className="service-panel-title">Danh mục dịch vụ</div>
            <div className="service-panel-subtitle">Phân nhóm các dịch vụ theo danh mục</div>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="service-toolbar">
        <div className="service-search-wrap">
          <input
            type="text"
            className="service-search-input"
            placeholder="Tìm kiếm theo tên"
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
          />
        </div>
        <button className="svc-btn svc-btn--primary" onClick={() => setIsModalOpen(true)}>
          + Thêm danh mục
        </button>
      </div>

      {/* Table */}
      <div className="service-table-wrap">
        {loading ? (
          <div className="service-loading">
            <div className="service-loading-dot" />
            <div className="service-loading-dot" />
            <div className="service-loading-dot" />
            <span>Đang tải...</span>
          </div>
        ) : filtered.length === 0 ? (
          <div className="service-empty">
            <div className="service-empty__text">Chưa có danh mục nào</div>
            <div className="service-empty__sub">Nhấn "+ Thêm danh mục" để tạo mới</div>
          </div>
        ) : (
          <table className="service-table">
            <thead>
              <tr>
                <th>Tên danh mục</th>
                <th>Thương hiệu</th>
                <th>Mô tả</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(catalog => (
                <tr key={catalog.id}>
                  <td className="service-name-cell">{catalog.category_name}</td>
                  <td className="service-muted">{brandsMap[catalog.brand_id] || catalog.brand_id}</td>
                  <td className="service-muted">{catalog.description || '—'}</td>
                  <td>
                    <div className="service-action-cell">
                      <button
                        className="svc-text-btn svc-text-btn--edit"
                        onClick={() => handleEdit(catalog)}
                      >
                        Sửa
                      </button>
                      <button
                        className="svc-text-btn svc-text-btn--delete"
                        onClick={() => setConfirmId(catalog.id)}
                      >
                        Xóa
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {!loading && filtered.length > 0 && (
        <div className="service-pagination">
          <span>Hiển thị <strong>{filtered.length}</strong> bản ghi</span>
          <div className="service-pagination-controls">
            <span className="service-pagination-label">Trang 1 / 1</span>
            <button className="service-pagination-btn" disabled>«</button>
            <button className="service-pagination-btn" disabled>‹</button>
            <button className="service-pagination-btn" disabled>›</button>
            <button className="service-pagination-btn" disabled>»</button>
          </div>
        </div>
      )}

      {/* Modals */}
      {isModalOpen && (
        <CreateCatalogModal
          onClose={handleCloseModal}
          onSuccess={handleSuccess}
          brandId={brandId}
          brandName={brandsMap[brandId || ''] || brandId}
          catalogToEdit={catalogToEdit}
        />
      )}

      {confirmId && (
        <ConfirmModal
          title="Xóa danh mục"
          message="Bạn có chắc chắn muốn xóa danh mục này? Hành động này không thể hoàn tác."
          confirmText="Xóa"
          cancelText="Hủy"
          type="danger"
          onConfirm={handleDeleteConfirm}
          onCancel={() => setConfirmId(null)}
        />
      )}

      {notification && (
        <NotificationModal
          title={notification.title}
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
};

export default CatalogList;
