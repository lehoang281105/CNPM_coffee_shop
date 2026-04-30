import React, { useState, useEffect } from 'react';
import * as catalogService from '../../../../../../services/admin/catalogService';
import type { ServiceCatalog } from '../../../../../../types';
import CreateCatalogModal from './CreateCatalogModal';
import './ServiceTab.css';

interface CatalogListProps {
  brandId?: string;
}

const CatalogList: React.FC<CatalogListProps> = ({ brandId }) => {
  const [catalogs, setCatalogs] = useState<ServiceCatalog[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [catalogToEdit, setCatalogToEdit] = useState<ServiceCatalog | null>(null);

  const fetchCatalogs = async () => {
    setLoading(true);
    try {
      const res = await catalogService.getCatalogs();
      const data = res.data || [];
      setCatalogs(brandId ? data.filter(c => c.brand_id === brandId) : data);
    } catch (err) {
      console.error('Failed to fetch catalogs', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCatalogs();
  }, [brandId]);

  const handleDelete = async (id: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa danh mục này?')) {
      try {
        await catalogService.deleteCatalog(id);
        fetchCatalogs();
      } catch (err) {
        alert('Xóa thất bại');
      }
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
    fetchCatalogs();
  };

  return (
    <div className="tab-pane">
      <div className="table-toolbar">
        <div className="search-box">
          <input type="text" placeholder="Tìm kiếm theo tên" className="form-control" />
        </div>
        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
          + Thêm danh mục
        </button>
      </div>

      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>Tên danh mục</th>
              <th>Thương hiệu</th>
              <th>Mô tả</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={4} className="text-center">Đang tải...</td></tr>
            ) : catalogs.length === 0 ? (
              <tr><td colSpan={4} className="text-center">Không có dữ liệu</td></tr>
            ) : (
              catalogs.map(catalog => (
                <tr key={catalog.id}>
                  <td>{catalog.category_name}</td>
                  <td>{catalog.brand_id}</td>
                  <td className="text-muted">Không hỗ trợ</td>
                  <td>
                    <button className="icon-btn edit-btn" onClick={() => handleEdit(catalog)}>✎</button>
                    <button className="icon-btn delete-btn" onClick={() => handleDelete(catalog.id)}>🗑</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination placeholder */}
      <div className="pagination-bar">
        <span>Hiển thị 10 trong {catalogs.length} bản ghi</span>
        <div className="pagination-controls">
          <span>Trang 1/1</span>
          <button disabled>&lt;&lt;</button>
          <button disabled>&lt;</button>
          <button disabled>&gt;</button>
          <button disabled>&gt;&gt;</button>
        </div>
      </div>

      {isModalOpen && (
        <CreateCatalogModal 
          onClose={handleCloseModal} 
          onSuccess={handleSuccess} 
          brandId={brandId}
          catalogToEdit={catalogToEdit}
        />
      )}
    </div>
  );
};

export default CatalogList;
