import React, { useEffect, useMemo, useState } from 'react';
import NotificationModal from '../../../../../components/common/NotificationModal';
import { useGoals } from '../../../../../hooks/admin/useGoals';
import type { Goal } from '../../../../../types';
import GoalReplyModal from './GoalReplyModal';
import GoalScriptModal from './GoalScriptModal';
import {
  buildGoalRule,
  makeGoalNameFromScript,
  parseGoalRule,
  type ReplySample,
} from './goalHelpers';
import { parseIntentMeta } from './intentHelpers';

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
  const [expandedGoalIds, setExpandedGoalIds] = useState<string[]>([]);
  const [scriptModal, setScriptModal] = useState<{ mode: 'create' | 'edit'; goal?: Goal } | null>(null);
  const [replyGoal, setReplyGoal] = useState<Goal | null>(null);
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
    const map = new Map<string, { machine: string; display: string; examples: string[] }>();

    intents.forEach((intent) => {
      const parsedMeta = parseIntentMeta(intent);
      map.set(intent.id, {
        machine: intent.name,
        display: parsedMeta.displayName,
        examples: parsedMeta.examples,
      });
    });

    return map;
  }, [intents]);

  const goalRuleMap = useMemo(() => {
    const map = new Map<string, ReturnType<typeof parseGoalRule>>();
    goals.forEach((goal) => map.set(goal.id, parseGoalRule(goal)));
    return map;
  }, [goals]);

  const filteredGoals = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return goals;

    return goals.filter((goal) => {
      const intentInfo = goal.intent_id ? intentMap.get(goal.intent_id) : null;
      const ruleData = goalRuleMap.get(goal.id);
      const samplesText = (ruleData?.samples ?? [])
        .flatMap((sample) => [sample.user, sample.assistant])
        .join(' ');

      const haystack = [
        goal.name,
        goal.description,
        goal.script ?? '',
        goal.target_goal ?? '',
        intentInfo?.machine ?? '',
        intentInfo?.display ?? '',
        samplesText,
      ]
        .join(' ')
        .toLowerCase();

      return haystack.includes(q);
    });
  }, [goals, search, intentMap, goalRuleMap]);

  const totalReplySamples = useMemo(
    () => goals.reduce((sum, goal) => sum + (goalRuleMap.get(goal.id)?.samples.length ?? 0), 0),
    [goals, goalRuleMap]
  );

  const totalTargets = useMemo(() => {
    const uniqueTargets = new Set(
      goals.map((goal) => (goal.target_goal || goal.name || '').trim()).filter(Boolean)
    );
    return uniqueTargets.size;
  }, [goals]);

  useEffect(() => {
    if (filteredGoals.length === 0) {
      setExpandedGoalIds([]);
      return;
    }

    setExpandedGoalIds((prev) => {
      if (prev.length > 0) {
        return prev.filter((goalId) => filteredGoals.some((goal) => goal.id === goalId));
      }
      return [filteredGoals[0].id];
    });
  }, [filteredGoals]);

  const toggleExpanded = (goalId: string) => {
    setExpandedGoalIds((prev) =>
      prev.includes(goalId) ? prev.filter((id) => id !== goalId) : [...prev, goalId]
    );
  };

  const handleSubmitScript = async (scriptText: string) => {
    if (!scriptModal) return;

    try {
      if (scriptModal.mode === 'edit' && scriptModal.goal) {
        await updateGoalItem(scriptModal.goal.id, {
          name: scriptModal.goal.name,
          bot_id: scriptModal.goal.bot_id,
          script: scriptText,
          description: scriptText,
          intent_id: scriptModal.goal.intent_id ?? null,
          target_goal: scriptModal.goal.target_goal ?? null,
          rule: scriptModal.goal.rule ?? null,
        });
        setNotification({
          title: 'Thành công',
          message: 'Đã cập nhật kịch bản.',
          type: 'success',
        });
      } else {
        if (!botId) {
          setNotification({
            title: 'Lỗi',
            message: 'Thiếu bot_id để tạo kịch bản.',
            type: 'error',
          });
          return;
        }

        const goalName = makeGoalNameFromScript(scriptText, goals.length + 1);
        await createGoalItem({
          name: goalName,
          description: scriptText,
          script: scriptText,
          bot_id: botId,
          intent_id: null,
          target_goal: null,
          rule: null,
        });
        setNotification({
          title: 'Thành công',
          message: 'Đã tạo kịch bản mới.',
          type: 'success',
        });
      }

      setScriptModal(null);
    } catch (err) {
      setNotification({
        title: 'Lỗi',
        message: getErrorMessage(err),
        type: 'error',
      });
    }
  };

  const handleAddReplySample = async (sample: ReplySample) => {
    if (!replyGoal) return;

    try {
      const nextRule = buildGoalRule(replyGoal, (current) => ({
        samples: [...current.samples, sample],
      }));

      await updateGoalItem(replyGoal.id, {
        name: replyGoal.name,
        description: replyGoal.description,
        script: replyGoal.script ?? replyGoal.description,
        intent_id: replyGoal.intent_id ?? null,
        bot_id: replyGoal.bot_id,
        target_goal: replyGoal.target_goal ?? null,
        rule: nextRule,
      });
      setReplyGoal(null);
      setNotification({
        title: 'Thành công',
        message: 'Đã thêm mẫu câu trả lời.',
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
            <h1 className="goals-title">Kịch bản huấn luyện</h1>
            <p className="goals-subtitle">Mô tả kịch bản bằng tiếng Việt → AI tự sinh Intent → Goals → Hướng dẫn → Skills</p>
          </div>
          <button type="button" className="btn btn--primary" onClick={() => setScriptModal({ mode: 'create' })}>
            <i className="ti-plus"></i> Tạo kịch bản
          </button>
        </div>

        <div className="goals-stats-grid">
          <div className="goals-stat-card">
            <div className="goals-stat-icon blue">
              <i className="ti-target"></i>
            </div>
            <div>
              <strong>{goals.length}</strong>
              <span>Kịch bản</span>
            </div>
          </div>

          <div className="goals-stat-card">
            <div className="goals-stat-icon green">
              <i className="ti-check"></i>
            </div>
            <div>
              <strong>{goals.length}</strong>
              <span>Đang hoạt động</span>
            </div>
          </div>

          <div className="goals-stat-card">
            <div className="goals-stat-icon indigo">
              <i className="ti-layout-list-thumb"></i>
            </div>
            <div>
              <strong>{totalTargets}</strong>
              <span>Mục tiêu</span>
            </div>
          </div>

          <div className="goals-stat-card">
            <div className="goals-stat-icon amber">
              <i className="ti-comment-alt"></i>
            </div>
            <div>
              <strong>{totalReplySamples}</strong>
              <span>Mẫu câu trả lời</span>
            </div>
          </div>
        </div>

        <div className="goals-search-wrap">
          <span className="search-icon">
            <i className="ti-search"></i>
          </span>
          <input
            className="search-input"
            placeholder="Tìm kịch bản..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="goals-list">
          {loading ? (
            <>
              <div className="goals-item-skeleton"></div>
              <div className="goals-item-skeleton"></div>
            </>
          ) : filteredGoals.length === 0 ? (
            <div className="goals-empty">Chưa có mục tiêu phù hợp với từ khóa tìm kiếm.</div>
          ) : (
            filteredGoals.map((goal) => {
              const expanded = expandedGoalIds.includes(goal.id);
              const intentInfo = goal.intent_id ? intentMap.get(goal.intent_id) : null;
              const parsedRule = goalRuleMap.get(goal.id) ?? { samples: [], skills: [], raw: {} };
              const sampleCount = parsedRule.samples.length;
              const skills = parsedRule.skills.length
                ? parsedRule.skills
                : goal.target_goal
                  ? [goal.target_goal]
                  : [];

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
                          <span className="goals-item-badge">Hoạt động</span>
                        </p>
                        <p className="goals-item-description">{goal.description}</p>
                      </div>
                    </div>

                    <div className="goals-item-actions">
                      <div className="goals-item-meta">
                        {intentInfo && <span className="goals-intent-pill">{intentInfo.display}</span>}
                        <span>{sampleCount} Q&amp;A</span>
                      </div>
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
                        title="Chỉnh sửa kịch bản"
                        onClick={() => setScriptModal({ mode: 'edit', goal })}
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
                      <div className="goals-section intent">
                        <p className="goals-section-title">
                          <i className="ti-info-alt"></i> INTENT:{' '}
                          {intentInfo ? `${intentInfo.display} (${intentInfo.machine})` : 'Chưa liên kết'}
                        </p>
                        {intentInfo?.examples.length ? (
                          <div className="goals-chip-wrap">
                            {intentInfo.examples.slice(0, 6).map((example) => (
                              <span className="goals-chip gray" key={`${goal.id}-${example}`}>
                                {example}
                              </span>
                            ))}
                          </div>
                        ) : null}
                      </div>

                      <div className="goals-section">
                        <p className="goals-section-title">
                          <i className="ti-layout-list-thumb"></i> 1 MỤC TIÊU — THỨ TỰ XỬ LÝ
                        </p>
                        <div className="goals-chip-wrap">
                          <span className="goals-chip blue">{goal.target_goal || goal.name}</span>
                        </div>
                      </div>

                      <div className="goals-main-goal-card">
                        <div>
                          <strong>{goal.name}</strong>
                          <p>{goal.description}</p>
                        </div>
                        <div className="goals-progress-meta">
                          <span>95% hoàn thành</span>
                        </div>
                      </div>

                      <div className="goals-section answer">
                        <div className="goals-section-title-row">
                          <p className="goals-section-title">
                            <i className="ti-comment-alt"></i> HƯỚNG DẪN TRẢ LỜI ({sampleCount})
                          </p>
                          <button
                            type="button"
                            className="goals-link-btn"
                            onClick={() => setReplyGoal(goal)}
                          >
                            <i className="ti-plus"></i> Thêm mẫu
                          </button>
                        </div>

                        {sampleCount === 0 ? (
                          <p className="goals-empty-sub">Chưa có mẫu câu — AI sẽ dùng câu trả lời chung của Goal.</p>
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

                      <div className="goals-section template">
                        <div className="goals-section-title-row">
                          <p className="goals-section-title">
                            <i className="ti-files"></i> TIN NHẮN MẪU (TEMPLATE)
                          </p>
                          <button
                            type="button"
                            className="goals-link-btn"
                            onClick={() => setScriptModal({ mode: 'edit', goal })}
                          >
                            <i className="ti-pencil-alt"></i> Cấu hình
                          </button>
                        </div>

                        <p className="goals-template-text">
                          {goal.script?.trim() || 'Chưa cấu hình template — AI sẽ dùng văn bản thuần.'}
                        </p>
                      </div>

                      <div className="goals-section skills">
                        <p className="goals-section-title">
                          <i className="ti-bolt-alt"></i> SKILLS ĐƯỢC GỌI ({skills.length})
                        </p>
                        <div className="goals-chip-wrap">
                          {skills.length > 0 ? (
                            skills.map((skill) => (
                              <span key={`${goal.id}-${skill}`} className="goals-chip green">
                                {skill}
                              </span>
                            ))
                          ) : (
                            <span className="goals-empty-sub">Chưa có skills.</span>
                          )}
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

      {scriptModal && (
        <GoalScriptModal
          mode={scriptModal.mode}
          initialScript={scriptModal.goal?.script || scriptModal.goal?.description || ''}
          loading={submitting}
          onClose={() => setScriptModal(null)}
          onSubmit={handleSubmitScript}
        />
      )}

      {replyGoal && (
        <GoalReplyModal
          loading={submitting}
          onClose={() => setReplyGoal(null)}
          onSubmit={handleAddReplySample}
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

