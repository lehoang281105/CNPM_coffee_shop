import React, { useState, useMemo } from 'react';
import FAQUpsertModal from '../../../../../../components/admin/FAQUpsertModal';
import NotificationModal from '../../../../../../components/common/NotificationModal';
import { useFAQ } from '../../../../../../hooks/admin/useFAQ';
import type { FAQ as FAQType, FAQCreatePayload, FAQUpdatePayload } from '../../../../../../types';
import './FAQ.css';

const PAGE_SIZE = 8;

interface FAQProps {
  botId?: string;
}

export default function FAQ({ botId }: FAQProps) {
  const {
    faqs,
    allFAQs,
    bots,
    botMap,
    loading,
    error,
    search,
    setSearch,
    fetchData,
    handleCreate,
    handleUpdate,
    handleDelete,
  } = useFAQ(botId);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [editFAQ, setEditFAQ] = useState<FAQType | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<FAQType | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [notification, setNotification] = useState<{ title: string; message: string; type: 'success' | 'error' } | null>(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(faqs.length / PAGE_SIZE));
  const paginatedFAQs = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return faqs.slice(start, start + PAGE_SIZE);
  }, [faqs, currentPage]);

  // Reset page when search changes
  React.useEffect(() => { setCurrentPage(1); }, [search]);

  // Unique bot count
  const uniqueBotIds = useMemo(() => new Set(allFAQs.map((f) => f.bot_id)).size, [allFAQs]);

  // Format date
  const formatDate = (ts: number) => {
    const d = new Date(ts * 1000);
    return d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  // Handlers
  const openCreate = () => {
    if (!botId) {
      setNotification({
        title: 'Lỗi',
        message: 'Không xác định được Bot hiện tại. Vui lòng thử lại.',
        type: 'error'
      });
      return;
    }
    setEditFAQ(null);
    setShowModal(true);
  };
  
  const openEdit = (faq: FAQType) => { setEditFAQ(faq); setShowModal(true); };
  const closeModal = () => { setShowModal(false); setEditFAQ(null); };

  const onSubmit = async (payload: FAQCreatePayload | FAQUpdatePayload) => {
    if (editFAQ) {
      await handleUpdate(editFAQ.id, payload as FAQUpdatePayload);
    } else {
      await handleCreate(payload as FAQCreatePayload);
    }
  };

  const confirmDelete = async () => {
    if (!showDeleteConfirm) return;
    setDeleting(true);
    try {
      await handleDelete(showDeleteConfirm.id);
      setShowDeleteConfirm(null);
      setNotification({
        title: 'Xóa thành công',
        message: 'FAQ đã được xóa khỏi hệ thống.',
        type: 'success'
      });
    } catch (err) {
      console.error('Error deleting FAQ:', err);
      setShowDeleteConfirm(null);
      setNotification({
        title: 'Xóa thất bại',
        message: err instanceof Error ? err.message : 'Không thể xóa FAQ. Vui lòng thử lại.',
        type: 'error'
      });
    } finally {
      setDeleting(false);
    }
  };

  // Page buttons
  const pageButtons = useMemo(() => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push('...');
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        pages.push(i);
      }
      if (currentPage < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  }, [currentPage, totalPages]);

  return (
    <div className="intent-page">
      {/* Page header */}
      <div className="faq-page-header">
        <div className="faq-page-header-left">
          <div className="faq-page-icon">
            <i className="ti-help-alt" />
          </div>
          <div className="faq-page-title-area">
            <h1>Quản lý FAQ</h1>
            <p>Câu hỏi thường gặp — quản lý cơ sở tri thức cho AI Agent</p>
          </div>
        </div>
        <button id="btn-create-faq" className="btn btn--primary" onClick={openCreate}>
          <i className="ti-plus" /> Thêm FAQ
        </button>
      </div>

        {/* Stats */}
        <div className="faq-stats-bar">
          <div className="faq-stat-chip">
            <div className="faq-stat-chip__icon faq-stat-chip__icon--total">
              <i className="ti-help-alt" />
            </div>
            <div>
              <div className="faq-stat-chip__count">
                {loading ? '—' : allFAQs.length}
              </div>
              <div style={{ fontSize: 11, color: 'var(--color-text-sub)', fontWeight: 500 }}>
                Tổng FAQ
              </div>
            </div>
          </div>
          <div className="faq-stat-chip">
            <div className="faq-stat-chip__icon faq-stat-chip__icon--bots">
              <i className="ti-android" />
            </div>
            <div>
              <div className="faq-stat-chip__count">
                {loading ? '—' : uniqueBotIds}
              </div>
              <div style={{ fontSize: 11, color: 'var(--color-text-sub)', fontWeight: 500 }}>
                Bot liên kết
              </div>
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="faq-toolbar">
          <div className="faq-toolbar-left">
            <div className="search-wrap">
              <span className="search-icon"><i className="ti-search" /></span>
              <input
                id="search-faqs"
                className="search-input"
                placeholder="Tìm kiếm câu hỏi hoặc câu trả lời..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Tìm kiếm FAQ"
              />
            </div>
          </div>
          <div className="faq-toolbar-right">
            <button id="btn-refresh-faq" className="refresh-btn" onClick={fetchData} title="Làm mới">
              <i className="ti-reload" /> Làm mới
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="error-banner" style={{ marginBottom: 20 }}>
            <i className="ti-alert" /> {error}
            <button onClick={fetchData}>Thử lại</button>
          </div>
        )}

        {/* Table */}
        <div className="faq-table-card">
          <table className="faq-table">
            <thead>
              <tr>
                <th className="th-center" style={{ width: 50 }}>STT</th>
                <th>Câu hỏi</th>
                <th>Câu trả lời</th>
                <th>Bot</th>
                <th>Ngày tạo</th>
                <th className="th-center" style={{ width: 100 }}>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {/* Loading skeleton */}
              {loading && !error && Array.from({ length: 5 }).map((_, i) => (
                <tr key={`skel-${i}`} className="faq-skeleton-row">
                  <td className="faq-cell-stt"><div className="faq-skeleton-bar faq-skeleton-bar--xs" style={{ margin: '0 auto' }} /></td>
                  <td><div className="faq-skeleton-bar faq-skeleton-bar--lg" /><div className="faq-skeleton-bar faq-skeleton-bar--sm" style={{ marginTop: 6 }} /></td>
                  <td><div className="faq-skeleton-bar faq-skeleton-bar--md" /><div className="faq-skeleton-bar faq-skeleton-bar--sm" style={{ marginTop: 6 }} /></td>
                  <td><div className="faq-skeleton-bar faq-skeleton-bar--xs" style={{ width: 80 }} /></td>
                  <td><div className="faq-skeleton-bar faq-skeleton-bar--xs" style={{ width: 80 }} /></td>
                  <td><div className="faq-skeleton-bar faq-skeleton-bar--xs" style={{ width: 60, margin: '0 auto' }} /></td>
                </tr>
              ))}

              {/* Empty state */}
              {!loading && !error && faqs.length === 0 && (
                <tr>
                  <td colSpan={6}>
                    <div className="faq-empty">
                      <div className="faq-empty__icon">
                        <i className="ti-help-alt" />
                      </div>
                      <span className="faq-empty__title">
                        {search ? 'Không tìm thấy kết quả' : 'Chưa có FAQ nào'}
                      </span>
                      <span className="faq-empty__sub">
                        {search
                          ? `Không có FAQ nào phù hợp với "${search}"`
                          : 'Nhấn "Thêm FAQ" để bắt đầu tạo câu hỏi thường gặp'}
                      </span>
                      {!search && (
                        <button className="btn btn--primary" style={{ marginTop: 12 }} onClick={openCreate}>
                          <i className="ti-plus" /> Thêm FAQ đầu tiên
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              )}

              {/* Data rows */}
              {!loading && !error && paginatedFAQs.map((faq, idx) => (
                <tr key={faq.id}>
                  <td className="faq-cell-stt">
                    {(currentPage - 1) * PAGE_SIZE + idx + 1}
                  </td>
                  <td className="faq-cell-question">
                    <div className="faq-cell-question__text">{faq.question}</div>
                  </td>
                  <td className="faq-cell-answer">
                    <div className="faq-cell-answer__text">{faq.answer}</div>
                  </td>
                  <td className="faq-cell-bot">
                    <span className="faq-bot-badge">
                      <i className="ti-android" />
                      {botMap[faq.bot_id]?.name ?? faq.bot_id}
                    </span>
                  </td>
                  <td className="faq-cell-date">
                    {formatDate(faq.created_at)}
                  </td>
                  <td className="faq-cell-actions">
                    <button
                      className="faq-action-btn"
                      title="Chỉnh sửa"
                      onClick={() => openEdit(faq)}
                    >
                      <i className="ti-pencil" />
                    </button>
                    <button
                      className="faq-action-btn faq-action-btn--danger"
                      title="Xóa"
                      onClick={() => setShowDeleteConfirm(faq)}
                    >
                      <i className="ti-trash" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          {!loading && faqs.length > PAGE_SIZE && (
            <div className="faq-pagination">
              <div className="faq-pagination-info">
                Hiển thị {(currentPage - 1) * PAGE_SIZE + 1}–
                {Math.min(currentPage * PAGE_SIZE, faqs.length)} / {faqs.length} FAQ
              </div>
              <div className="faq-pagination-controls">
                <button
                  className="faq-page-btn"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => p - 1)}
                >
                  ‹
                </button>
                {pageButtons.map((p, i) =>
                  typeof p === 'string' ? (
                    <span key={`dots-${i}`} style={{ padding: '0 4px', color: 'var(--color-text-sub)' }}>…</span>
                  ) : (
                    <button
                      key={p}
                      className={`faq-page-btn ${p === currentPage ? 'active' : ''}`}
                      onClick={() => setCurrentPage(p)}
                    >
                      {p}
                    </button>
                  )
                )}
                <button
                  className="faq-page-btn"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => p + 1)}
                >
                  ›
                </button>
              </div>
            </div>
          )}
        </div>

      {/* Create/Edit Modal */}
      {showModal && botId && (
        <FAQUpsertModal
          faq={editFAQ}
          botId={botId}
          onClose={closeModal}
          onSubmit={onSubmit}
        />
      )}

      {/* Delete Confirmation */}
      {showDeleteConfirm && (
        <div className="modal-overlay" onClick={() => setShowDeleteConfirm(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 420 }}>
            <div className="modal-body">
              <div className="faq-delete-confirm">
                <div className="faq-delete-icon">
                  <i className="ti-trash" />
                </div>
                <h3>Xác nhận xóa FAQ</h3>
                <p>Bạn có chắc chắn muốn xóa FAQ này? Hành động này không thể hoàn tác.</p>
                <div className="question-preview">
                  "{showDeleteConfirm.question}"
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn--ghost" onClick={() => setShowDeleteConfirm(null)} disabled={deleting}>
                Hủy
              </button>
              <button className="btn btn--danger" onClick={confirmDelete} disabled={deleting}>
                {deleting ? (
                  <><span className="btn-spinner" /> Đang xóa...</>
                ) : (
                  <><i className="ti-trash" /> Xóa FAQ</>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notification Modal */}
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
}
