import React, { useEffect, useMemo, useState } from 'react';
import NotificationModal from '../../../../../../components/common/NotificationModal';
import { useGoals } from '../../../../../../hooks/admin/useGoals';
import type {
  Goal,
  GoalCreatePayload,
  GoalUpdatePayload,
} from '../../../../../../types';
import { parseGoalRule } from '../../../../../../utils/goalHelpers';
import { parseIntentMeta } from '../../../../../../utils/intentHelpers';
import GoalModal from './GoalModal';

interface GoalsProps {
  botId?: string;
}

const Goals: React.FC<GoalsProps> = ({ botId }) => {
  const {
    goals,
    intents,
    loading,
    submitting,
    error,
    fetchGoals,
    createGoalItem,
    updateGoalItem,
    deleteGoalItem,
  } = useGoals(botId);

  const [search, setSearch] = useState('');
  const [intentFilter, setIntentFilter] = useState('all');
  const [expandedGoalIds, setExpandedGoalIds] = useState<string[]>([]);
  const [modalState, setModalState] = useState<{ mode: 'create' | 'edit'; goal?: Goal } | null>(null);
  const [deletingGoal, setDeletingGoal] = useState<Goal | null>(null);
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
    return 'Không thể xử lý yêu cầu mục tiêu.';
  };

  const intentMap = useMemo(() => {
    const map = new Map<string, { machine: string; display: string }>();

    intents.forEach((intent) => {
      const parsedMeta = parseIntentMeta(intent);
      map.set(intent.id, {
        machine: intent.name,
        display: parsedMeta.displayName,
      });
    });

    return map;
  }, [intents]);

  const goalRows = useMemo(
    () =>
      goals.map((goal) => ({
        goal,
        parsedRule: parseGoalRule(goal),
        intentInfo: goal.intent_id ? intentMap.get(goal.intent_id) : null,
      })),
    [goals, intentMap]
  );

  const filteredRows = useMemo(() => {
    const q = search.trim().toLowerCase();
    return goalRows.filter(({ goal, parsedRule, intentInfo }) => {
      if (intentFilter !== 'all' && goal.intent_id !== intentFilter) return false;
      if (!q) return true;

      const haystack = [
        goal.name,
        goal.description,
        goal.script ?? '',
        goal.target_goal ?? '',
        goal.rule ?? '',
        intentInfo?.machine ?? '',
        intentInfo?.display ?? '',
        ...parsedRule.samples.flatMap((sample) => [sample.user, sample.assistant]),
        ...parsedRule.skills,
      ]
        .join(' ')
        .toLowerCase();

      return haystack.includes(q);
    });
  }, [goalRows, intentFilter, search]);

  const totalLinkedIntents = useMemo(
    () =>
      new Set(
        goals
          .map((goal) => goal.intent_id)
          .filter((intentId): intentId is string => Boolean(intentId))
      ).size,
    [goals]
  );

  const totalRules = useMemo(
    () => goals.filter((goal) => Boolean(goal.rule?.trim())).length,
    [goals]
  );

  useEffect(() => {
    if (filteredRows.length === 0) {
      setExpandedGoalIds([]);
      return;
    }

    setExpandedGoalIds((prev) => {
      if (prev.length > 0) {
        return prev.filter((goalId) => filteredRows.some((row) => row.goal.id === goalId));
      }
      return [filteredRows[0].goal.id];
    });
  }, [filteredRows]);

  const toggleExpanded = (goalId: string) => {
    setExpandedGoalIds((prev) =>
      prev.includes(goalId) ? prev.filter((id) => id !== goalId) : [...prev, goalId]
    );
  };

  const handleSubmitGoal = async (
    payload: GoalCreatePayload | GoalUpdatePayload
  ) => {
    if (!modalState) return;
    try {
      if (modalState.mode === 'edit' && modalState.goal) {
        await updateGoalItem(modalState.goal.id, payload as GoalUpdatePayload);
        setNotification({
          title: 'Thành công',
          message: 'Đã cập nhật mục tiêu.',
          type: 'success',
        });
      } else {
        await createGoalItem(payload as GoalCreatePayload);
        setNotification({
          title: 'Thành công',
          message: 'Đã tạo mục tiêu mới.',
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

  const handleDeleteGoal = async () => {
    if (!deletingGoal) return;

    try {
      await deleteGoalItem(deletingGoal.id);
      setDeletingGoal(null);
      setNotification({
        title: 'Thành công',
        message: 'Đã xóa mục tiêu.',
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

  const formatDateTime = (value?: number) => {
    if (!value) return '--';
    const msValue = value > 1_000_000_000_000 ? value : value * 1000;
    const date = new Date(msValue);
    if (Number.isNaN(date.getTime())) return String(value);
    return date.toLocaleString('vi-VN');
  };

  return (
    <>
      <section className="goals-page">
        {!botId && (
          <div className="error-banner" style={{ marginBottom: 12 }}>
            ⚠️ Thiếu bot_id nên chưa thể tải dữ liệu mục tiêu.
          </div>
        )}

        {error && (
          <div className="error-banner" style={{ marginBottom: 12 }}>
            <i className="ti-alert"></i> {error}
            <button onClick={fetchGoals}>Thử lại</button>
          </div>
        )}

        <div className="goals-header">
          <div>
            <h1 className="goals-title">Mục tiêu (Goals)</h1>
            <p className="goals-subtitle">
              Quản lý mục tiêu theo API /api/goals và liên kết với intent của bot
            </p>
          </div>
          <div className="goals-actions">
            <button
              type="button"
              className="btn btn--ghost"
              onClick={fetchGoals}
              disabled={loading}
            >
              <i className="ti-reload"></i> Làm mới
            </button>
            <button
              type="button"
              className="btn btn--primary"
              onClick={() => setModalState({ mode: 'create' })}
            >
              <i className="ti-plus"></i> Thêm mục tiêu
            </button>
          </div>
        </div>

        <div className="goals-stats-grid">
          <div className="goals-stat-card">
            <div className="goals-stat-icon blue">
              <i className="ti-target"></i>
            </div>
            <div>
              <strong>{goals.length}</strong>
              <span>Tổng goals</span>
            </div>
          </div>

          <div className="goals-stat-card">
            <div className="goals-stat-icon green">
              <i className="ti-check"></i>
            </div>
            <div>
              <strong>{totalLinkedIntents}</strong>
              <span>Đã gắn intent</span>
            </div>
          </div>

          <div className="goals-stat-card">
            <div className="goals-stat-icon indigo">
              <i className="ti-layout-list-thumb"></i>
            </div>
            <div>
              <strong>{totalRules}</strong>
              <span>Có rule</span>
            </div>
          </div>
        </div>

        <div className="goals-filter-wrap">
          <div className="search-wrap goals-search-wrap">
            <span className="search-icon">
              <i className="ti-search"></i>
            </span>
            <input
              className="search-input"
              placeholder="Tìm theo tên, mô tả, script, rule..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select
            className="form-select goals-intent-filter"
            value={intentFilter}
            onChange={(e) => setIntentFilter(e.target.value)}
          >
            <option value="all">Tất cả intent</option>
            {intents.map((intent) => {
              const meta = parseIntentMeta(intent);
              return (
                <option key={intent.id} value={intent.id}>
                  {meta.displayName} ({intent.name})
                </option>
              );
            })}
          </select>
        </div>

        <div className="goals-list">
          {loading ? (
            <>
              <div className="goals-item-skeleton"></div>
              <div className="goals-item-skeleton"></div>
            </>
          ) : filteredRows.length === 0 ? (
            <div className="goals-empty">Chưa có mục tiêu phù hợp với bộ lọc hiện tại.</div>
          ) : (
            filteredRows.map(({ goal, intentInfo, parsedRule }) => {
              const expanded = expandedGoalIds.includes(goal.id);
              const sampleCount = parsedRule.samples.length;
              const skillCount = parsedRule.skills.length;

              return (
                <article className={`goals-item-card ${expanded ? 'is-expanded' : ''}`} key={goal.id}>
                  <div className="goals-item-head">
                    <div className="goals-item-main">
                      <div className="goals-item-icon">
                        <i className="ti-target"></i>
                      </div>
                      <div className="goals-item-content">
                        <p className="goals-item-name-line">
                          <span className="goals-item-name">{goal.name}</span>
                          {goal.target_goal?.trim() && (
                            <span className="goals-item-badge">{goal.target_goal}</span>
                          )}
                        </p>
                        <p className="goals-item-description">{goal.description}</p>
                        <div className="goals-item-meta goals-item-meta--inline">
                          {intentInfo ? (
                            <span className="goals-intent-pill">{intentInfo.display}</span>
                          ) : (
                            <span>Chưa gắn intent</span>
                          )}
                          <span>{sampleCount} Q&amp;A</span>
                          <span>{skillCount} skills</span>
                          <span>{goal.id}</span>
                        </div>
                      </div>
                    </div>

                    <div className="goals-item-actions">
                      <button
                        type="button"
                        className="goals-icon-btn"
                        title={expanded ? 'Thu gọn' : 'Mở rộng'}
                        onClick={() => toggleExpanded(goal.id)}
                      >
                        <i className={expanded ? 'ti-angle-down' : 'ti-angle-right'}></i>
                      </button>
                      <button
                        type="button"
                        className="goals-icon-btn"
                        title="Chỉnh sửa"
                        onClick={() => setModalState({ mode: 'edit', goal })}
                      >
                        <i className="ti-pencil-alt"></i>
                      </button>
                      <button
                        type="button"
                        className="goals-icon-btn danger"
                        title="Xóa mục tiêu"
                        onClick={() => setDeletingGoal(goal)}
                        disabled={submitting}
                      >
                        <i className="ti-trash"></i>
                      </button>
                    </div>
                  </div>

                  {expanded && (
                    <div className="goals-item-expanded">
                      <div className="goals-section">
                        <p className="goals-section-title">
                          <i className="ti-align-left"></i> Script
                        </p>
                        {goal.script?.trim() ? (
                          <p className="goals-template-text">{goal.script}</p>
                        ) : (
                          <p className="goals-empty-sub">Chưa cấu hình script cho goal này.</p>
                        )}
                      </div>

                      <div className="goals-section">
                        <p className="goals-section-title">
                          <i className="ti-file"></i> Rule
                        </p>
                        {goal.rule?.trim() ? (
                          <p className="goals-template-text">{goal.rule}</p>
                        ) : (
                          <p className="goals-empty-sub">Chưa cấu hình rule cho goal này.</p>
                        )}
                      </div>

                      <div className="goals-section skills">
                        <p className="goals-section-title">
                          <i className="ti-bolt-alt"></i> Skills được parse từ rule ({skillCount})
                        </p>
                        <div className="goals-chip-wrap">
                          {parsedRule.skills.length > 0 ? (
                            parsedRule.skills.map((skill) => (
                              <span key={`${goal.id}-${skill}`} className="goals-chip green">
                                {skill}
                              </span>
                            ))
                          ) : (
                            <span className="goals-empty-sub">Chưa có skills.</span>
                          )}
                        </div>
                      </div>

                      <div className="goals-section answer">
                        <p className="goals-section-title">
                          <i className="ti-comment-alt"></i> Mẫu hội thoại ({sampleCount})
                        </p>
                        {sampleCount === 0 ? (
                          <p className="goals-empty-sub">Chưa có mẫu hội thoại trong rule.</p>
                        ) : (
                          <div className="goals-sample-list">
                            {parsedRule.samples.map((sample, idx) => (
                              <div className="goals-sample-item" key={`${goal.id}-${idx}`}>
                                <p>
                                  <strong>KH:</strong> {sample.user}
                                </p>
                                <p>
                                  <strong>AI:</strong> {sample.assistant}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="goals-section">
                        <p className="goals-section-title">
                          <i className="ti-info-alt"></i> Thông tin
                        </p>
                        <div className="goals-chip-wrap">
                          <span className="goals-chip gray">ID: {goal.id}</span>
                          <span className="goals-chip gray">
                            Cập nhật: {formatDateTime(goal.updated_at)}
                          </span>
                          <span className="goals-chip gray">
                            Tạo lúc: {formatDateTime(goal.created_at)}
                          </span>
                          <span className="goals-chip blue">
                            Intent: {intentInfo ? `${intentInfo.display} (${intentInfo.machine})` : 'Chưa gắn'}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </article>
              );
            })
          )}
        </div>
      </section>

      {modalState && (
        <GoalModal
          mode={modalState.mode}
          goal={modalState.goal}
          intents={intents}
          botId={botId}
          loading={submitting}
          onClose={() => setModalState(null)}
          onSubmit={handleSubmitGoal}
        />
      )}

      {deletingGoal && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && setDeletingGoal(null)}>
          <div className="modal branch-delete-modal" role="dialog" aria-modal="true" aria-labelledby="goal-delete-title">
            <div className="modal-header">
              <h2 className="modal-title" id="goal-delete-title">
                Xác nhận xóa mục tiêu
              </h2>
              <button className="modal-close" onClick={() => setDeletingGoal(null)} aria-label="Đóng" disabled={submitting}>
                ✕
              </button>
            </div>
            <div className="modal-body branch-delete-body">
              <p>
                Bạn có chắc muốn xóa mục tiêu <strong>"{deletingGoal.name}"</strong>?
              </p>
              <p className="form-hint">Hành động này không thể hoàn tác.</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn--ghost" onClick={() => setDeletingGoal(null)} disabled={submitting}>
                Hủy
              </button>
              <button type="button" className="btn btn--danger" onClick={handleDeleteGoal} disabled={submitting}>
                {submitting ? 'Đang xóa...' : 'Xóa mục tiêu'}
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

export default Goals;

