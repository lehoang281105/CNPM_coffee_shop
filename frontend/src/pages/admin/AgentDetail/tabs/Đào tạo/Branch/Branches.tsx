import React, { useEffect, useMemo, useState } from 'react';
import CreateBranchModal from '../../../../../../components/admin/CreateBranchModal';
import NotificationModal from '../../../../../../components/common/NotificationModal';
import { useBranches } from '../../../../../../hooks/admin/useBranches';
import type {
  Branch,
  BranchCreatePayload,
  BranchUpdatePayload,
} from '../../../../../../types';

interface BranchesProps {
  brandId?: string | null;
}

const PAGE_SIZE_OPTIONS = [10, 20, 50];

const Branches: React.FC<BranchesProps> = ({ brandId }) => {
  const {
    branches,
    loading,
    submitting,
    error,
    fetchBranches,
    createBranchItem,
    updateBranchItem,
    deleteBranchItem,
  } = useBranches(brandId);

  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [editingBranch, setEditingBranch] = useState<Branch | null>(null);
  const [deletingBranch, setDeletingBranch] = useState<Branch | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [notification, setNotification] = useState<{
    title: string;
    message: string;
    type: 'success' | 'error';
  } | null>(null);

  const filteredBranches = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return branches;

    return branches.filter((branch) =>
      [branch.name, branch.address, branch.description]
        .filter(Boolean)
        .some((value) => value?.toLowerCase()?.includes(q))
    );
  }, [branches, search]);

  const totalPages = Math.max(1, Math.ceil(filteredBranches.length / pageSize));

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const pagedBranches = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredBranches.slice(start, start + pageSize);
  }, [filteredBranches, page, pageSize]);

  const openCreateModal = () => {
    setEditingBranch(null);
    setShowModal(true);
  };

  const openEditModal = (branch: Branch) => {
    setEditingBranch(branch);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingBranch(null);
  };

  const handleSubmit = async (
    payload: BranchCreatePayload | BranchUpdatePayload
  ) => {
    try {
      if (editingBranch) {
        await updateBranchItem(editingBranch.id, payload as BranchUpdatePayload);
        setNotification({
          title: 'Thành công',
          message: 'Đã cập nhật chi nhánh.',
          type: 'success',
        });
      } else {
        await createBranchItem(payload as BranchCreatePayload);
        setNotification({
          title: 'Thành công',
          message: 'Đã thêm mới chi nhánh.',
          type: 'success',
        });
      }
      closeModal();
    } catch (err: any) {
      setNotification({
        title: 'Lỗi',
        message: err?.message || 'Không thể lưu chi nhánh.',
        type: 'error',
      });
    }
  };

  const handleConfirmDelete = async () => {
    if (!deletingBranch) return;
    try {
      await deleteBranchItem(deletingBranch.id);
      setNotification({
        title: 'Thành công',
        message: 'Đã xóa chi nhánh.',
        type: 'success',
      });
      setDeletingBranch(null);
    } catch (err: any) {
      setNotification({
        title: 'Lỗi',
        message: err?.message || 'Không thể xóa chi nhánh.',
        type: 'error',
      });
    }
  };

  return (
    <>
      <section className="branch-page">
        {!brandId && (
          <div className="error-banner" style={{ marginBottom: 12 }}>
            ⚠️ Agent này chưa gắn thương hiệu. Bạn vẫn có thể xem chi nhánh, nhưng khi thêm mới nên gắn
            thương hiệu trước để dữ liệu đồng nhất.
          </div>
        )}

        {error && (
          <div className="error-banner" style={{ marginBottom: 12 }}>
            <i className="ti-alert"></i> {error}
            <button onClick={fetchBranches}>Thử lại</button>
          </div>
        )}

        <div className="branch-toolbar">
          <div className="search-wrap branch-search-wrap">
            <span className="search-icon">
              <i className="ti-search"></i>
            </span>
            <input
              className="search-input"
              placeholder="Nhập từ khóa tìm kiếm"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </div>

          <button
            type="button"
            className="btn btn--primary branch-add-btn"
            onClick={openCreateModal}
          >
            <i className="ti-plus"></i> Thêm mới
          </button>
        </div>

        <div className="branch-table-wrap">
          <table className="branch-table">
            <thead>
              <tr>
                <th>Tên chi nhánh</th>
                <th>Trạng thái</th>
                <th>Địa chỉ</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4} className="branch-empty-row">
                    Đang tải dữ liệu chi nhánh...
                  </td>
                </tr>
              ) : pagedBranches.length === 0 ? (
                <tr>
                  <td colSpan={4} className="branch-empty-row">
                    Không có dữ liệu chi nhánh phù hợp.
                  </td>
                </tr>
              ) : (
                pagedBranches.map((branch) => {
                  const isActive = branch.status?.toLowerCase() === 'active';
                  return (
                    <tr key={branch.id}>
                      <td className="branch-name-cell">{branch.name}</td>
                      <td>
                        <span className={`branch-status-pill ${isActive ? 'active' : 'inactive'}`}>
                          {isActive ? 'Hoạt động' : 'Không hoạt động'}
                        </span>
                      </td>
                      <td>{branch.address}</td>
                      <td>
                        <div className="branch-action-group">
                          <button
                            type="button"
                            className="branch-action-btn"
                            title="Sửa"
                            onClick={() => openEditModal(branch)}
                          >
                            <i className="ti-pencil-alt"></i>
                          </button>
                          <button
                            type="button"
                            className="branch-action-btn danger"
                            title="Xóa"
                            onClick={() => setDeletingBranch(branch)}
                            disabled={submitting}
                          >
                            <i className="ti-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        <div className="branch-pagination">
          <div className="branch-pagination-info">
            Hiển thị{' '}
            <select
              className="branch-page-size"
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setPage(1);
              }}
            >
              {PAGE_SIZE_OPTIONS.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>{' '}
            trong {filteredBranches.length} bản ghi
          </div>

          <div className="branch-pagination-controls">
            <span>Trang {page}/{totalPages}</span>
            <button type="button" onClick={() => setPage(1)} disabled={page === 1}>
              <i className="ti-angle-double-left"></i>
            </button>
            <button type="button" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>
              <i className="ti-angle-left"></i>
            </button>
            <button
              type="button"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
            >
              <i className="ti-angle-right"></i>
            </button>
            <button type="button" onClick={() => setPage(totalPages)} disabled={page >= totalPages}>
              <i className="ti-angle-double-right"></i>
            </button>
          </div>
        </div>
      </section>

      {showModal && (
        <CreateBranchModal
          mode={editingBranch ? 'edit' : 'create'}
          branch={editingBranch}
          brandId={brandId}
          loading={submitting}
          onClose={closeModal}
          onSubmit={handleSubmit}
        />
      )}

      {deletingBranch && (
        <div
          className="modal-overlay"
          onClick={(e) => e.target === e.currentTarget && setDeletingBranch(null)}
        >
          <div
            className="modal branch-delete-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="branch-delete-title"
          >
            <div className="modal-header">
              <h2 className="modal-title" id="branch-delete-title">
                Xác nhận xóa chi nhánh
              </h2>
              <button
                className="modal-close"
                onClick={() => setDeletingBranch(null)}
                aria-label="Đóng"
                disabled={submitting}
              >
                ✕
              </button>
            </div>
            <div className="modal-body branch-delete-body">
              <p>
                Bạn có chắc muốn xóa chi nhánh <strong>"{deletingBranch.name}"</strong>?
              </p>
              <p className="form-hint">Hành động này không thể hoàn tác.</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn--ghost"
                onClick={() => setDeletingBranch(null)}
                disabled={submitting}
              >
                Hủy
              </button>
              <button
                type="button"
                className="btn btn--danger"
                onClick={handleConfirmDelete}
                disabled={submitting}
              >
                {submitting ? 'Đang xóa...' : 'Xóa chi nhánh'}
              </button>
            </div>
          </div>
        </div>
      )}

      {notification && (
        <NotificationModal
          title={notification.title}
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </>
  );
};

export default Branches;
