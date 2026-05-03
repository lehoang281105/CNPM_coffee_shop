import React, { useState, useMemo } from 'react';
import NotificationModal from '../../../../../../components/common/NotificationModal';
import { useFeedback } from '../../../../../../hooks/admin/useFeedback';
import type { Feedback as FeedbackType } from '../../../../../../types';
import '../../Đào tạo/FAQ/FAQ.css';

const PAGE_SIZE = 8;

interface FeedbackProps {
  botId?: string;
}

export default function Feedback({ botId }: FeedbackProps) {
  const {
    feedbacks,
    allFeedbacks,
    loading,
    error,
    search,
    setSearch,
    fetchData,
    handleCreate: createFeedback,
    handleSaveToFAQ,
    handleReportToDev,
    handleDismiss,
    handleDelete,
  } = useFeedback({ botId });

  const [notification, setNotification] = useState<{ title: string; message: string; type: 'success' | 'error' } | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<FeedbackType | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [showEditModal, setShowEditModal] = useState<FeedbackType | null>(null);
  const [correctedAnswer, setCorrectedAnswer] = useState('');
  const [editNote, setEditNote] = useState('');
  const [saving, setSaving] = useState(false);
  const [showReportModal, setShowReportModal] = useState<FeedbackType | null>(null);
  const [reportNote, setReportNote] = useState('');
  const [reporting, setReporting] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createQuestion, setCreateQuestion] = useState('');
  const [createAnswer, setCreateAnswer] = useState('');
  const [createNote, setCreateNote] = useState('');
  const [creating, setCreating] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(feedbacks.length / PAGE_SIZE));
  const paginatedFeedbacks = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return feedbacks.slice(start, start + PAGE_SIZE);
  }, [feedbacks, currentPage]);

  React.useEffect(() => { setCurrentPage(1); }, [search]);

  // Stats
  const stats = useMemo(() => {
    const pending = allFeedbacks.filter(f => f.status === 'pending').length;
    const savedToFaq = allFeedbacks.filter(f => f.status === 'saved_to_faq').length;
    const reportedToDev = allFeedbacks.filter(f => f.status === 'reported_to_dev').length;
    return { pending, savedToFaq, reportedToDev };
  }, [allFeedbacks]);

  const formatDate = (ts: number) => {
    const d = new Date(ts * 1000);
    return d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; className: string }> = {
      pending: { label: 'Chờ xử lý', className: 'status-pending' },
      saved_to_faq: { label: 'Đã lưu FAQ', className: 'status-saved' },
      reported_to_dev: { label: 'Báo Dev', className: 'status-reported' },
      dev_fixed: { label: 'Dev đã fix', className: 'status-fixed' },
      dismissed: { label: 'Đã bỏ qua', className: 'status-dismissed' },
    };
    const info = statusMap[status] || { label: status, className: '' };
    return <span className={`feedback-status-badge ${info.className}`}>{info.label}</span>;
  };

  const getRatingIcon = (rating: string) => {
    if (rating === 'positive') return <span style={{ color: '#10b981' }}>👍</span>;
    if (rating === 'negative') return <span style={{ color: '#ef4444' }}>👎</span>;
    return <span style={{ color: '#94a3b8' }}>—</span>;
  };

  const openEditModal = (feedback: FeedbackType) => {
    setShowEditModal(feedback);
    setCorrectedAnswer(feedback.corrected_answer || feedback.original_answer);
    setEditNote(feedback.note || '');
  };

  const closeEditModal = () => {
    setShowEditModal(null);
    setCorrectedAnswer('');
    setEditNote('');
  };

  const handleSave = async () => {
    if (!showEditModal || !correctedAnswer.trim()) return;
    setSaving(true);
    try {
      await handleSaveToFAQ(showEditModal.id, {
        corrected_answer: correctedAnswer.trim(),
        note: editNote.trim() || undefined,
      });
      closeEditModal();
      setNotification({
        title: 'Lưu thành công',
        message: 'Câu trả lời đã được lưu vào FAQ.',
        type: 'success',
      });
    } catch (err) {
      console.error('Error saving to FAQ:', err);
      setNotification({
        title: 'Lưu thất bại',
        message: err instanceof Error ? err.message : 'Không thể lưu vào FAQ. Vui lòng thử lại.',
        type: 'error',
      });
    } finally {
      setSaving(false);
    }
  };

  const openReportModal = (feedback: FeedbackType) => {
    setShowReportModal(feedback);
    setReportNote('');
  };

  const closeReportModal = () => {
    setShowReportModal(null);
    setReportNote('');
  };

  const handleReport = async () => {
    if (!showReportModal || !reportNote.trim()) return;
    setReporting(true);
    try {
      await handleReportToDev(showReportModal.id, { note: reportNote.trim() });
      closeReportModal();
      setNotification({
        title: 'Báo cáo thành công',
        message: 'Feedback đã được gửi cho Dev Team.',
        type: 'success',
      });
    } catch (err) {
      console.error('Error reporting to dev:', err);
      setNotification({
        title: 'Báo cáo thất bại',
        message: err instanceof Error ? err.message : 'Không thể báo cáo. Vui lòng thử lại.',
        type: 'error',
      });
    } finally {
      setReporting(false);
    }
  };

  const openCreateModal = () => {
    setShowCreateModal(true);
    setCreateQuestion('');
    setCreateAnswer('');
    setCreateNote('');
  };

  const closeCreateModal = () => {
    setShowCreateModal(false);
    setCreateQuestion('');
    setCreateAnswer('');
    setCreateNote('');
  };

  const handleCreateFeedback = async () => {
    if (!botId || !createQuestion.trim() || !createAnswer.trim()) return;
    setCreating(true);
    try {
      await createFeedback({
        bot_id: botId,
        original_question: createQuestion.trim(),
        original_answer: createAnswer.trim(),
        rating: 'pending',
        note: createNote.trim() || undefined,
      });
      closeCreateModal();
      setNotification({
        title: 'Tạo thành công',
        message: 'Feedback mới đã được tạo.',
        type: 'success',
      });
    } catch (err) {
      console.error('Error creating feedback:', err);
      setNotification({
        title: 'Tạo thất bại',
        message: err instanceof Error ? err.message : 'Không thể tạo feedback. Vui lòng thử lại.',
        type: 'error',
      });
    } finally {
      setCreating(false);
    }
  };

  const handleDismissClick = async (feedback: FeedbackType) => {
    try {
      await handleDismiss(feedback.id);
      setNotification({
        title: 'Đã bỏ qua',
        message: 'Feedback đã được đánh dấu bỏ qua.',
        type: 'success',
      });
    } catch (err) {
      console.error('Error dismissing feedback:', err);
      setNotification({
        title: 'Thất bại',
        message: err instanceof Error ? err.message : 'Không thể bỏ qua feedback.',
        type: 'error',
      });
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
        message: 'Feedback đã được xóa khỏi hệ thống.',
        type: 'success',
      });
    } catch (err) {
      console.error('Error deleting feedback:', err);
      setShowDeleteConfirm(null);
      setNotification({
        title: 'Xóa thất bại',
        message: err instanceof Error ? err.message : 'Không thể xóa feedback. Vui lòng thử lại.',
        type: 'error',
      });
    } finally {
      setDeleting(false);
    }
  };

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
      <div className="faq-page-header">
        <div className="faq-page-header-left">
          <div className="faq-page-icon" style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' }}>
            <i className="ti-hand-point-up" />
          </div>
          <div className="faq-page-title-area">
            <h1>Quản lý Feedback</h1>
            <p>Phản hồi từ người dùng — cải thiện chất lượng AI Agent</p>
          </div>
        </div>
        <button id="btn-create-feedback" className="btn btn--primary" onClick={openCreateModal}>
          <i className="ti-plus" /> Thêm Feedback
        </button>
      </div>

      <div className="faq-stats-bar">
        <div className="faq-stat-chip">
          <div className="faq-stat-chip__icon" style={{ background: '#fef3c7', color: '#d97706' }}>
            <i className="ti-time" />
          </div>
          <div>
            <div className="faq-stat-chip__count">{loading ? '—' : stats.pending}</div>
            <div style={{ fontSize: 11, color: 'var(--color-text-sub)', fontWeight: 500 }}>Chờ xử lý</div>
          </div>
        </div>
        <div className="faq-stat-chip">
          <div className="faq-stat-chip__icon" style={{ background: '#d1fae5', color: '#059669' }}>
            <i className="ti-check" />
          </div>
          <div>
            <div className="faq-stat-chip__count">{loading ? '—' : stats.savedToFaq}</div>
            <div style={{ fontSize: 11, color: 'var(--color-text-sub)', fontWeight: 500 }}>Đã lưu FAQ</div>
          </div>
        </div>
        <div className="faq-stat-chip">
          <div className="faq-stat-chip__icon" style={{ background: '#dbeafe', color: '#2563eb' }}>
            <i className="ti-alert" />
          </div>
          <div>
            <div className="faq-stat-chip__count">{loading ? '—' : stats.reportedToDev}</div>
            <div style={{ fontSize: 11, color: 'var(--color-text-sub)', fontWeight: 500 }}>Báo Dev</div>
          </div>
        </div>
      </div>

      <div className="faq-toolbar">
        <div className="faq-toolbar-left">
          <div className="search-wrap">
            <span className="search-icon"><i className="ti-search" /></span>
            <input
              className="search-input"
              placeholder="Tìm kiếm câu hỏi, câu trả lời..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="faq-toolbar-right">
          <button className="refresh-btn" onClick={fetchData} title="Làm mới">
            <i className="ti-reload" /> Làm mới
          </button>
        </div>
      </div>

      {error && (
        <div className="error-banner" style={{ marginBottom: 20 }}>
          <i className="ti-alert" /> {error}
          <button onClick={fetchData}>Thử lại</button>
        </div>
      )}

      <div className="faq-table-card">
        <table className="faq-table">
          <thead>
            <tr>
              <th className="th-center" style={{ width: 50 }}>STT</th>
              <th>Câu hỏi</th>
              <th>Câu trả lời gốc</th>
              <th style={{ width: 80 }}>Đánh giá</th>
              <th style={{ width: 120 }}>Trạng thái</th>
              <th style={{ width: 100 }}>Ngày tạo</th>
              <th className="th-center" style={{ width: 140 }}>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {loading && !error && Array.from({ length: 5 }).map((_, i) => (
              <tr key={`skel-${i}`} className="faq-skeleton-row">
                <td className="faq-cell-stt"><div className="faq-skeleton-bar faq-skeleton-bar--xs" style={{ margin: '0 auto' }} /></td>
                <td><div className="faq-skeleton-bar faq-skeleton-bar--lg" /></td>
                <td><div className="faq-skeleton-bar faq-skeleton-bar--md" /></td>
                <td><div className="faq-skeleton-bar faq-skeleton-bar--xs" style={{ width: 40, margin: '0 auto' }} /></td>
                <td><div className="faq-skeleton-bar faq-skeleton-bar--sm" /></td>
                <td><div className="faq-skeleton-bar faq-skeleton-bar--xs" style={{ width: 80 }} /></td>
                <td><div className="faq-skeleton-bar faq-skeleton-bar--xs" style={{ width: 100, margin: '0 auto' }} /></td>
              </tr>
            ))}

            {!loading && !error && feedbacks.length === 0 && (
              <tr>
                <td colSpan={7}>
                  <div className="faq-empty">
                    <div className="faq-empty__icon">
                      <i className="ti-hand-point-up" />
                    </div>
                    <span className="faq-empty__title">
                      {search ? 'Không tìm thấy kết quả' : 'Chưa có feedback nào'}
                    </span>
                    <span className="faq-empty__sub">
                      {search
                        ? `Không có feedback nào phù hợp với "${search}"`
                        : 'Feedback từ người dùng sẽ xuất hiện ở đây'}
                    </span>
                    {!search && (
                      <button className="btn btn--primary" style={{ marginTop: 12 }} onClick={openCreateModal}>
                        <i className="ti-plus" /> Thêm Feedback đầu tiên
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            )}

            {!loading && !error && paginatedFeedbacks.map((fb, idx) => (
              <tr key={fb.id}>
                <td className="faq-cell-stt">{(currentPage - 1) * PAGE_SIZE + idx + 1}</td>
                <td className="faq-cell-question">
                  <div className="faq-cell-question__text">{fb.original_question}</div>
                </td>
                <td className="faq-cell-answer">
                  <div className="faq-cell-answer__text">{fb.original_answer}</div>
                </td>
                <td className="th-center">{getRatingIcon(fb.rating)}</td>
                <td>{getStatusBadge(fb.status)}</td>
                <td className="faq-cell-date">{formatDate(fb.created_at)}</td>
                <td className="faq-cell-actions">
                  {fb.status === 'pending' && (
                    <>
                      <button
                        className="faq-action-btn"
                        title="Lưu vào FAQ"
                        onClick={() => openEditModal(fb)}
                      >
                        <i className="ti-save" />
                      </button>
                      <button
                        className="faq-action-btn"
                        title="Báo Dev"
                        onClick={() => openReportModal(fb)}
                        style={{ color: '#2563eb' }}
                      >
                        <i className="ti-alert" />
                      </button>
                      <button
                        className="faq-action-btn"
                        title="Bỏ qua"
                        onClick={() => handleDismissClick(fb)}
                        style={{ color: '#64748b' }}
                      >
                        <i className="ti-close" />
                      </button>
                    </>
                  )}
                  <button
                    className="faq-action-btn faq-action-btn--danger"
                    title="Xóa"
                    onClick={() => setShowDeleteConfirm(fb)}
                  >
                    <i className="ti-trash" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {!loading && feedbacks.length > PAGE_SIZE && (
          <div className="faq-pagination">
            <div className="faq-pagination-info">
              Hiển thị {(currentPage - 1) * PAGE_SIZE + 1}–{Math.min(currentPage * PAGE_SIZE, feedbacks.length)} / {feedbacks.length} feedback
            </div>
            <div className="faq-pagination-controls">
              <button className="faq-page-btn" disabled={currentPage === 1} onClick={() => setCurrentPage((p) => p - 1)}>‹</button>
              {pageButtons.map((p, i) =>
                typeof p === 'string' ? (
                  <span key={`dots-${i}`} style={{ padding: '0 4px', color: 'var(--color-text-sub)' }}>…</span>
                ) : (
                  <button key={p} className={`faq-page-btn ${p === currentPage ? 'active' : ''}`} onClick={() => setCurrentPage(p)}>{p}</button>
                )
              )}
              <button className="faq-page-btn" disabled={currentPage === totalPages} onClick={() => setCurrentPage((p) => p + 1)}>›</button>
            </div>
          </div>
        )}
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="modal-overlay" onClick={() => !creating && closeCreateModal()}>
          <div className="modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 600 }}>
            <div className="modal-header">
              <h2 className="modal-title">Tạo Feedback mới</h2>
              <button className="modal-close" onClick={closeCreateModal} disabled={creating}>✕</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label className="form-label">Câu hỏi *</label>
                <textarea
                  className="form-input"
                  rows={3}
                  value={createQuestion}
                  onChange={(e) => setCreateQuestion(e.target.value)}
                  placeholder="Nhập câu hỏi từ người dùng..."
                  disabled={creating}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Câu trả lời gốc *</label>
                <textarea
                  className="form-input"
                  rows={5}
                  value={createAnswer}
                  onChange={(e) => setCreateAnswer(e.target.value)}
                  placeholder="Nhập câu trả lời gốc từ bot..."
                  disabled={creating}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Ghi chú</label>
                <textarea
                  className="form-input"
                  rows={2}
                  value={createNote}
                  onChange={(e) => setCreateNote(e.target.value)}
                  placeholder="Ghi chú thêm (tùy chọn)..."
                  disabled={creating}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn--ghost" onClick={closeCreateModal} disabled={creating}>Hủy</button>
              <button className="btn btn--primary" onClick={handleCreateFeedback} disabled={!createQuestion.trim() || !createAnswer.trim() || creating}>
                {creating ? <><span className="btn-spinner" /> Đang tạo...</> : <><i className="ti-plus" /> Tạo Feedback</>}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className="modal-overlay" onClick={() => !saving && closeEditModal()}>
          <div className="modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 600 }}>
            <div className="modal-header">
              <h2 className="modal-title">Chỉnh sửa và lưu vào FAQ</h2>
              <button className="modal-close" onClick={closeEditModal} disabled={saving}>✕</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label className="form-label">Câu hỏi</label>
                <div style={{ padding: '10px 12px', background: '#f8fafc', borderRadius: 6, fontSize: 14, color: '#475569' }}>
                  {showEditModal.original_question}
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Câu trả lời đã chỉnh sửa *</label>
                <textarea
                  className="form-input"
                  rows={6}
                  value={correctedAnswer}
                  onChange={(e) => setCorrectedAnswer(e.target.value)}
                  placeholder="Nhập câu trả lời đã chỉnh sửa..."
                  disabled={saving}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Ghi chú</label>
                <textarea
                  className="form-input"
                  rows={3}
                  value={editNote}
                  onChange={(e) => setEditNote(e.target.value)}
                  placeholder="Ghi chú thêm (tùy chọn)..."
                  disabled={saving}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn--ghost" onClick={closeEditModal} disabled={saving}>Hủy</button>
              <button className="btn btn--primary" onClick={handleSave} disabled={!correctedAnswer.trim() || saving}>
                {saving ? <><span className="btn-spinner" /> Đang lưu...</> : <><i className="ti-save" /> Lưu vào FAQ</>}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Report Modal */}
      {showReportModal && (
        <div className="modal-overlay" onClick={() => !reporting && closeReportModal()}>
          <div className="modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 500 }}>
            <div className="modal-header">
              <h2 className="modal-title">Báo cáo cho Dev Team</h2>
              <button className="modal-close" onClick={closeReportModal} disabled={reporting}>✕</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label className="form-label">Mô tả vấn đề *</label>
                <textarea
                  className="form-input"
                  rows={5}
                  value={reportNote}
                  onChange={(e) => setReportNote(e.target.value)}
                  placeholder="Mô tả chi tiết vấn đề cần Dev Team xem xét..."
                  disabled={reporting}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn--ghost" onClick={closeReportModal} disabled={reporting}>Hủy</button>
              <button className="btn btn--primary" onClick={handleReport} disabled={!reportNote.trim() || reporting}>
                {reporting ? <><span className="btn-spinner" /> Đang gửi...</> : <><i className="ti-alert" /> Gửi báo cáo</>}
              </button>
            </div>
          </div>
        </div>
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
                <h3>Xác nhận xóa Feedback</h3>
                <p>Bạn có chắc chắn muốn xóa feedback này? Hành động này không thể hoàn tác.</p>
                <div className="question-preview">"{showDeleteConfirm.original_question}"</div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn--ghost" onClick={() => setShowDeleteConfirm(null)} disabled={deleting}>Hủy</button>
              <button className="btn btn--danger" onClick={confirmDelete} disabled={deleting}>
                {deleting ? <><span className="btn-spinner" /> Đang xóa...</> : <><i className="ti-trash" /> Xóa Feedback</>}
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
    </div>
  );
}
