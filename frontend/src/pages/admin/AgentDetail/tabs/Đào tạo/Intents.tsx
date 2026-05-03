import React, { useEffect, useMemo, useState } from 'react';
import NotificationModal from '../../../../../components/common/NotificationModal';
import { useIntents } from '../../../../../hooks/admin/useIntents';
import type { Intent, IntentCreatePayload, IntentUpdatePayload } from '../../../../../types';
import IntentModal from './IntentModal';
import { parseIntentMeta } from '../../../../../utils/intentHelpers';

interface IntentsProps {
  botId?: string;
}

const Intents: React.FC<IntentsProps> = ({ botId }) => {
  const {
    intents,
    goals,
    loading,
    submitting,
    error,
    fetchIntents,
    createIntentItem,
    updateIntentItem,
    deleteIntentItem,
  } = useIntents(botId);

  const [search, setSearch] = useState('');
  const [goalFilter, setGoalFilter] = useState('all');
  const [expandedIntentIds, setExpandedIntentIds] = useState<string[]>([]);
  const [modalState, setModalState] = useState<{ mode: 'create' | 'edit'; intent?: Intent } | null>(null);
  const [deletingIntent, setDeletingIntent] = useState<Intent | null>(null);
  const [notification, setNotification] = useState<{
    title: string;
    message: string;
    type: 'success' | 'error';
  } | null>(null);

  const getErrorMessage = (err: unknown): string => {
    if (typeof err === 'string') return err;
    if (err && typeof err === 'object') {
      const maybeError = err as { message?: string };
      if (maybeError.message) return maybeError.message;
    }
    return 'Không thể xử lý yêu cầu intent.';
  };

  const goalNameMap = useMemo(() => {
    const map = new Map<string, string>();
    goals.forEach((goal) => map.set(goal.id, goal.name));
    return map;
  }, [goals]);

  const intentRows = useMemo(() => {
    return intents.map((intent) => {
      const meta = parseIntentMeta(intent);
      const linkedGoalIds = meta.goalIds.length
        ? meta.goalIds
        : intent.target_goal
          ? [intent.target_goal]
          : [];
      return { intent, meta, linkedGoalIds };
    });
  }, [intents]);

  useEffect(() => {
    if (intentRows.length === 0) {
      setExpandedIntentIds([]);
      return;
    }

    setExpandedIntentIds((prev) => {
      if (prev.length > 0) return prev.filter((id) => intentRows.some((row) => row.intent.id === id));
      return [intentRows[0].intent.id];
    });
  }, [intentRows]);

  const filteredRows = useMemo(() => {
    const q = search.trim().toLowerCase();
    return intentRows.filter(({ intent, meta, linkedGoalIds }) => {
      if (goalFilter !== 'all' && !linkedGoalIds.includes(goalFilter)) return false;
      if (!q) return true;

      const goalNames = linkedGoalIds.map((goalId) => goalNameMap.get(goalId) || goalId);
      const haystack = [
        intent.name,
        intent.description,
        meta.displayName,
        ...meta.examples,
        ...goalNames,
      ]
        .join(' ')
        .toLowerCase();

      return haystack.includes(q);
    });
  }, [intentRows, search, goalFilter, goalNameMap]);

  const totalExamples = useMemo(
    () => intentRows.reduce((total, row) => total + row.meta.examples.length, 0),
    [intentRows]
  );

  const handleToggleExpanded = (intentId: string) => {
    setExpandedIntentIds((prev) =>
      prev.includes(intentId) ? prev.filter((id) => id !== intentId) : [...prev, intentId]
    );
  };

  const handleSubmitIntent = async (payload: IntentCreatePayload | IntentUpdatePayload) => {
    if (!modalState) return;
    try {
      if (modalState.mode === 'edit' && modalState.intent) {
        await updateIntentItem(modalState.intent.id, payload as IntentUpdatePayload);
        setNotification({
          title: 'Thành công',
          message: 'Đã cập nhật intent.',
          type: 'success',
        });
      } else {
        await createIntentItem(payload as IntentCreatePayload);
        setNotification({
          title: 'Thành công',
          message: 'Đã tạo intent mới.',
          type: 'success',
        });
      }
      setModalState(null);
    } catch (err) {
      setNotification({
        title: 'Lỗi',
        message: getErrorMessage(err),
        type: 'error',
      });
    }
  };

  const handleConfirmDelete = async () => {
    if (!deletingIntent) return;
    try {
      await deleteIntentItem(deletingIntent.id);
      setDeletingIntent(null);
      setNotification({
        title: 'Thành công',
        message: 'Đã xóa intent.',
        type: 'success',
      });
    } catch (err) {
      setNotification({
        title: 'Lỗi',
        message: getErrorMessage(err),
        type: 'error',
      });
    }
  };

  return (
    <>
      <section className="intent-page">
        {!botId && (
          <div className="error-banner" style={{ marginBottom: 12 }}>
            ⚠️ Thiếu bot_id nên chưa thể tải dữ liệu intent.
          </div>
        )}

        {error && (
          <div className="error-banner" style={{ marginBottom: 12 }}>
            <i className="ti-alert"></i> {error}
            <button onClick={fetchIntents}>Thử lại</button>
          </div>
        )}

        <div className="intent-header">
          <div>
            <h1 className="intent-title">Ý định (Intents)</h1>
            <p className="intent-subtitle">Định nghĩa và huấn luyện AI nhận diện ý định khách hàng</p>
          </div>
          <div className="intent-actions">
            <button type="button" className="btn btn--ghost" onClick={fetchIntents} disabled={loading}>
              <i className="ti-reload"></i> Làm mới
            </button>
            <button type="button" className="btn btn--primary" onClick={() => setModalState({ mode: 'create' })}>
              <i className="ti-plus"></i> Thêm Intent
            </button>
          </div>
        </div>

        <div className="intent-stats-grid">
          <div className="intent-stat-card">
            <div className="intent-stat-icon blue">
              <i className="ti-target"></i>
            </div>
            <div>
              <strong>{intentRows.length}</strong>
              <span>Tổng intents</span>
            </div>
          </div>

          <div className="intent-stat-card">
            <div className="intent-stat-icon green">
              <i className="ti-check"></i>
            </div>
            <div>
              <strong>{intentRows.length}</strong>
              <span>Đang hoạt động</span>
            </div>
          </div>

          <div className="intent-stat-card">
            <div className="intent-stat-icon gray">
              <i className="ti-tag"></i>
            </div>
            <div>
              <strong>{totalExamples}</strong>
              <span>Tổng examples</span>
            </div>
          </div>
        </div>

        <div className="intent-filter-wrap">
          <div className="search-wrap intent-search-wrap">
            <span className="search-icon">
              <i className="ti-search"></i>
            </span>
            <input
              className="search-input"
              placeholder="Tìm theo tên hoặc label..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            className="form-select intent-goal-filter"
            value={goalFilter}
            onChange={(e) => setGoalFilter(e.target.value)}
          >
            <option value="all">Tất cả mục tiêu</option>
            {goals.map((goal) => (
              <option key={goal.id} value={goal.id}>
                {goal.name}
              </option>
            ))}
          </select>
        </div>

        <div className="intent-list">
          {loading ? (
            <>
              <div className="intent-item-skeleton"></div>
              <div className="intent-item-skeleton"></div>
            </>
          ) : filteredRows.length === 0 ? (
            <div className="intent-empty">Chưa có intent phù hợp với bộ lọc hiện tại.</div>
          ) : (
            filteredRows.map(({ intent, meta, linkedGoalIds }) => {
              const expanded = expandedIntentIds.includes(intent.id);
              const linkedGoals = linkedGoalIds.map((goalId) => ({
                id: goalId,
                name: goalNameMap.get(goalId) || goalId,
              }));

              const skills = meta.skills.length > 0 ? meta.skills : linkedGoalIds.slice(0, 3);

              return (
                <article className="intent-item-card" key={intent.id}>
                  <div className="intent-item-head">
                    <div className="intent-item-main">
                      <div className="intent-item-icon">
                        <i className="ti-target"></i>
                      </div>
                      <div className="intent-item-content">
                        <p className="intent-item-name-line">
                          <span className="intent-machine-name">{intent.name}</span>
                          <span className="intent-name-separator">—</span>
                          <span className="intent-display-name">{meta.displayName}</span>
                          <span className="intent-display-pill">{meta.displayName}</span>
                        </p>
                        <p className="intent-item-description">{intent.description}</p>

                        {meta.examples.length > 0 && (
                          <div className="intent-example-line">
                            <span className="intent-example-label">Examples</span>
                            {meta.examples.slice(0, 6).map((example) => (
                              <span key={example}>{example}</span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="intent-item-actions">
                      <div className="intent-goal-count">
                        <strong>{linkedGoalIds.length}</strong>
                        <span>mục tiêu</span>
                      </div>

                      <button
                        type="button"
                        className="intent-icon-btn"
                        title={expanded ? 'Thu gọn' : 'Mở rộng'}
                        onClick={() => handleToggleExpanded(intent.id)}
                      >
                        <i className={expanded ? 'ti-angle-down' : 'ti-angle-right'}></i>
                      </button>
                      <button
                        type="button"
                        className="intent-icon-btn"
                        title="Chỉnh sửa"
                        onClick={() => setModalState({ mode: 'edit', intent })}
                      >
                        <i className="ti-pencil-alt"></i>
                      </button>
                      <button
                        type="button"
                        className="intent-icon-btn danger"
                        title="Xóa"
                        disabled={submitting}
                        onClick={() => setDeletingIntent(intent)}
                      >
                        <i className="ti-trash"></i>
                      </button>
                    </div>
                  </div>

                  {expanded && (
                    <div className="intent-expanded-body">
                      <p className="intent-flow-title">
                        <i className="ti-bolt-alt"></i> LUỒNG XỬ LÝ: INTENT → GOALS → HƯỚNG DẪN TRẢ LỜI →
                        SKILLS
                      </p>

                      {linkedGoals.length > 0 ? (
                        <div className="intent-goal-list">
                          {linkedGoals.map((goal, index) => (
                            <div className="intent-goal-card" key={goal.id}>
                              <div className="intent-goal-index">{index + 1}</div>
                              <div className="intent-goal-text">
                                <strong>{goal.name}</strong>
                                <span>{goal.id}</span>
                              </div>
                              <div className="intent-goal-progress">
                                <strong>95%</strong>
                                <span>hoàn thành</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="intent-empty-sub">Intent này chưa liên kết goal nào.</p>
                      )}

                      {skills.length > 0 && (
                        <>
                          <div className="intent-skill-box">
                            <p>SKILLS ĐƯỢC GỌI</p>
                            <div className="intent-chip-wrap">
                              {skills.map((skill) => (
                                <span key={skill} className="intent-chip green">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="intent-skill-box summary">
                            <p>TỔNG HỢP SKILLS CHO INTENT NÀY</p>
                            <div className="intent-chip-wrap">
                              {skills.map((skill) => (
                                <span key={`summary-${skill}`} className="intent-chip blue">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </article>
              );
            })
          )}
        </div>
      </section>

      {modalState && (
        <IntentModal
          mode={modalState.mode}
          intent={modalState.intent}
          goals={goals}
          botId={botId}
          loading={submitting}
          onClose={() => setModalState(null)}
          onSubmit={handleSubmitIntent}
        />
      )}

      {deletingIntent && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && setDeletingIntent(null)}>
          <div className="modal branch-delete-modal" role="dialog" aria-modal="true" aria-labelledby="intent-delete-title">
            <div className="modal-header">
              <h2 className="modal-title" id="intent-delete-title">
                Xác nhận xóa intent
              </h2>
              <button className="modal-close" onClick={() => setDeletingIntent(null)} aria-label="Đóng" disabled={submitting}>
                ✕
              </button>
            </div>
            <div className="modal-body branch-delete-body">
              <p>
                Bạn có chắc muốn xóa intent <strong>"{deletingIntent.name}"</strong>?
              </p>
              <p className="form-hint">Hành động này không thể hoàn tác.</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn--ghost" onClick={() => setDeletingIntent(null)} disabled={submitting}>
                Hủy
              </button>
              <button type="button" className="btn btn--danger" onClick={handleConfirmDelete} disabled={submitting}>
                {submitting ? 'Đang xóa...' : 'Xóa intent'}
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

export default Intents;
