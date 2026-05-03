import React, { useState, useEffect } from 'react';
import * as serviceService from '../../../../../../services/admin/serviceService';
import * as catalogService from '../../../../../../services/admin/catalogService';
import type { Service } from '../../../../../../types';
import CreateServiceModal from './CreateServiceModal';
import ConfirmModal from '../../../../../../components/common/ConfirmModal';
import NotificationModal from '../../../../../../components/common/NotificationModal';
import './ServiceTab.css';

interface ServiceListProps {
  brandId?: string;
}

const ServiceList: React.FC<ServiceListProps> = ({ brandId }) => {
  const [services, setServices] = useState<Service[]>([]);
  const [catalogsMap, setCatalogsMap] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [serviceToEdit, setServiceToEdit] = useState<Service | null>(null);
  const [searchText, setSearchText] = useState('');

  // Confirm delete
  const [confirmId, setConfirmId] = useState<string | null>(null);
  // Notification
  const [notification, setNotification] = useState<{ title: string; message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [serviceRes, catalogRes] = await Promise.all([
        serviceService.getServices(),
        catalogService.getAllCatalogs(),
      ]);
      const catalogs = catalogRes.data || [];
      const map: Record<string, string> = {};
      catalogs.forEach(c => (map[c.id] = c.category_name));
      setCatalogsMap(map);
      const serviceData = serviceRes.data || [];
      setServices(brandId ? serviceData.filter(s => s.brand_id === brandId) : serviceData);
    } catch (err) {
      console.error('Failed to fetch services', err);
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
      await serviceService.deleteService(confirmId);
      setConfirmId(null);
      fetchData();
      setNotification({ title: 'Xóa thành công', message: 'Dịch vụ đã được xóa khỏi hệ thống.', type: 'success' });
    } catch (err) {
      setConfirmId(null);
      setNotification({ title: 'Xóa thất bại', message: 'Đã có lỗi xảy ra, vui lòng thử lại.', type: 'error' });
    }
  };

  const handleEdit = (service: Service) => {
    setServiceToEdit(service);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setServiceToEdit(null);
  };

  const handleSuccess = () => {
    handleCloseModal();
    fetchData();
    setNotification({ title: 'Lưu thành công', message: 'Thông tin dịch vụ đã được cập nhật.', type: 'success' });
  };

  const formatCurrency = (amount?: number) => {
    if (amount == null) return '—';
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  const filtered = services.filter(s =>
    s.name.toLowerCase().includes(searchText.toLowerCase()) ||
    (s.service_metadata?.service_code || '').toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="service-panel">
      {/* Panel Header */}
      <div className="service-panel-header">
        <div className="service-panel-header-left">
          <div>
            <div className="service-panel-title">Danh sách dịch vụ</div>
            <div className="service-panel-subtitle">Tất cả dịch vụ thuộc thương hiệu này</div>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="service-toolbar">
        <div className="service-search-wrap">
          <input
            type="text"
            className="service-search-input"
            placeholder="Tìm kiếm theo tên hoặc mã dịch vụ"
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
          />
        </div>
        <button className="svc-btn svc-btn--primary" onClick={() => setIsModalOpen(true)}>
          + Thêm dịch vụ
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
            <div className="service-empty__text">Chưa có dịch vụ nào</div>
            <div className="service-empty__sub">Nhấn "+ Thêm dịch vụ" để tạo mới</div>
          </div>
        ) : (
          <table className="service-table">
            <thead>
              <tr>
                <th>Mã dịch vụ</th>
                <th>Tên dịch vụ</th>
                <th>Danh mục</th>
                <th>Giá chung</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(service => {
                const meta = service.service_metadata || {};
                const catalogName = meta.catalog_id ? catalogsMap[meta.catalog_id] : null;
                const isActive = service.status === 'active';
                return (
                  <tr key={service.id}>
                    <td><span className="service-code-cell">{meta.service_code || '—'}</span></td>
                    <td className="service-name-cell">{service.name}</td>
                    <td className="service-muted">{catalogName || '—'}</td>
                    <td className="service-price-cell">{formatCurrency(meta.general_price)}</td>
                    <td>
                      <span className={`badge ${isActive ? 'badge--active' : 'badge--inactive'}`}>
                        {isActive ? '● Hoạt động' : '○ Tắt'}
                      </span>
                    </td>
                    <td>
                      <div className="service-action-cell">
                        <button
                          className="svc-text-btn svc-text-btn--edit"
                          onClick={() => handleEdit(service)}
                        >
                          Sửa
                        </button>
                        <button
                          className="svc-text-btn svc-text-btn--delete"
                          onClick={() => setConfirmId(service.id)}
                        >
                          Xóa
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {!loading && filtered.length > 0 && (
        <div className="service-pagination">
          <span>Hiển thị <strong>{filtered.length}</strong> trong <strong>{services.length}</strong> bản ghi</span>
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
        <CreateServiceModal
          onClose={handleCloseModal}
          onSuccess={handleSuccess}
          brandId={brandId}
          serviceToEdit={serviceToEdit}
        />
      )}

      {confirmId && (
        <ConfirmModal
          title="Xóa dịch vụ"
          message="Bạn có chắc chắn muốn xóa dịch vụ này? Hành động này không thể hoàn tác."
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

export default ServiceList;
