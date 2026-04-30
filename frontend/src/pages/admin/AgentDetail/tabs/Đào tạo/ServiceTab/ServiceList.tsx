import React, { useState, useEffect } from 'react';
import * as serviceService from '../../../../../../services/admin/serviceService';
import * as catalogService from '../../../../../../services/admin/catalogService';
import type { Service, ServiceCatalog } from '../../../../../../types';
import CreateServiceModal from './CreateServiceModal';
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

  const fetchData = async () => {
    setLoading(true);
    try {
      const [serviceRes, catalogRes] = await Promise.all([
        serviceService.getServices(),
        catalogService.getAllCatalogs()
      ]);
      
      const catalogs = catalogRes.data || [];
      const map: Record<string, string> = {};
      catalogs.forEach(c => map[c.id] = c.category_name);
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
  }, [brandId]);

  const handleDelete = async (id: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa dịch vụ này?')) {
      try {
        await serviceService.deleteService(id);
        fetchData();
      } catch (err) {
        alert('Xóa thất bại');
      }
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
  };

  const formatCurrency = (amount?: number) => {
    if (amount == null) return '-';
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  return (
    <div className="tab-pane">
      <div className="table-toolbar">
        <div className="search-box">
          <input type="text" placeholder="Tìm kiếm theo tên" className="form-control" />
        </div>
        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
          + Thêm dịch vụ
        </button>
      </div>

      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>Mã dịch vụ</th>
              <th>Tên dịch vụ</th>
              <th>Danh mục dịch vụ</th>
              <th>Giá chung</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6} className="text-center">Đang tải...</td></tr>
            ) : services.length === 0 ? (
              <tr><td colSpan={6} className="text-center">Không có dữ liệu</td></tr>
            ) : (
              services.map(service => {
                const meta = service.service_metadata || {};
                const catalogName = meta.catalog_id ? catalogsMap[meta.catalog_id] : '-';
                const statusLabel = service.status === 'active' ? 'Hoạt động' : 'Đã tắt';
                const statusClass = service.status === 'active' ? 'badge--active' : 'badge--inactive';

                return (
                  <tr key={service.id}>
                    <td>{meta.service_code || '-'}</td>
                    <td>{service.name}</td>
                    <td>{catalogName}</td>
                    <td>{formatCurrency(meta.general_price)}</td>
                    <td><span className={`badge ${statusClass}`}>{statusLabel}</span></td>
                    <td>
                      <button className="icon-btn edit-btn" onClick={() => handleEdit(service)}>✎</button>
                      <button className="icon-btn delete-btn" onClick={() => handleDelete(service.id)}>🗑</button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination placeholder */}
      <div className="pagination-bar">
        <span>Hiển thị 10 trong {services.length} bản ghi</span>
        <div className="pagination-controls">
          <span>Trang 1/1</span>
          <button disabled>&lt;&lt;</button>
          <button disabled>&lt;</button>
          <button disabled>&gt;</button>
          <button disabled>&gt;&gt;</button>
        </div>
      </div>

      {isModalOpen && (
        <CreateServiceModal 
          onClose={handleCloseModal} 
          onSuccess={handleSuccess} 
          brandId={brandId}
          serviceToEdit={serviceToEdit}
        />
      )}
    </div>
  );
};

export default ServiceList;
