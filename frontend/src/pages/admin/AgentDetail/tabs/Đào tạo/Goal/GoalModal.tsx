import React, { useEffect, useMemo, useState } from 'react';
import type {
  Goal,
  GoalCreatePayload,
  GoalUpdatePayload,
  Intent,
} from '../../../../../../types';
import { parseIntentMeta } from '../../../../../../utils/intentHelpers';

interface GoalModalProps {
  mode: 'create' | 'edit';
  goal?: Goal | null;
  intents: Intent[];
  botId?: string;
  loading?: boolean;
  onClose: () => void;
  onSubmit: (payload: GoalCreatePayload | GoalUpdatePayload) => Promise<void>;
}

interface GoalFormState {
  name: string;
  description: string;
  script: string;
  intentId: string;
  targetGoal: string;
  rule: string;
}

const buildInitialForm = (goal?: Goal | null): GoalFormState => ({
  name: goal?.name ?? '',
  description: goal?.description ?? '',
  script: goal?.script ?? goal?.description ?? '',
  intentId: goal?.intent_id ?? '',
  targetGoal: goal?.target_goal ?? '',
  rule: goal?.rule ?? '',
});

const GoalModal: React.FC<GoalModalProps> = ({
  mode,
  goal,
  intents,
  botId,
  loading = false,
  onClose,
  onSubmit,
}) => {
  const [form, setForm] = useState<GoalFormState>(buildInitialForm(goal));
  const [error, setError] = useState('');

  useEffect(() => {
    setForm(buildInitialForm(goal));
    setError('');
  }, [goal, mode]);

  const isEditMode = mode === 'edit';

  const intentOptions = useMemo(
    () =>
      intents.map((intent) => {
        const meta = parseIntentMeta(intent);
        return {
          id: intent.id,
          label: `${meta.displayName} (${intent.name})`,
        };
      }),
    [intents]
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const name = form.name.trim();
    const description = form.description.trim();
    const script = form.script.trim() || description;
    const intentId = form.intentId.trim();
    const targetGoal = form.targetGoal.trim();
    const rule = form.rule.trim();

    if (!name) {
      setError('Tên mục tiêu là bắt buộc.');
      return;
    }
    if (!description) {
      setError('Mô tả mục tiêu là bắt buộc.');
      return;
    }

    setError('');

    if (isEditMode) {
      const payload: GoalUpdatePayload = {
        name,
        description,
        script,
        intent_id: intentId || null,
        target_goal: targetGoal || null,
        rule: rule || null,
      };
      const resolvedBotId = botId ?? goal?.bot_id;
      if (resolvedBotId) payload.bot_id = resolvedBotId;
      await onSubmit(payload);
      return;
    }

    if (!botId) {
      setError('Thiếu bot_id để tạo mục tiêu.');
      return;
    }

    await onSubmit({
      name,
      description,
      script,
      bot_id: botId,
      intent_id: intentId || null,
      target_goal: targetGoal || null,
      rule: rule || null,
    });
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal goal-modal" role="dialog" aria-modal="true" aria-labelledby="goal-modal-title">
        <div className="modal-header">
          <h2 className="modal-title" id="goal-modal-title">
            {isEditMode ? 'Chỉnh sửa Goal' : 'Thêm Goal mới'}
          </h2>
          <button className="modal-close" onClick={onClose} aria-label="Đóng" disabled={loading}>
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body goal-modal-body">
            {error && <div className="error-banner">⚠️ {error}</div>}

            <div className="form-2col">
              <div className="form-group">
                <label className="form-label" htmlFor="goal-name">
                  Tên mục tiêu
                </label>
                <input
                  id="goal-name"
                  className="form-input"
                  value={form.name}
                  onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="VD: dat_lich_kham"
                  autoFocus
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="goal-intent">
                  Intent liên kết
                </label>
                <select
                  id="goal-intent"
                  className="form-select"
                  value={form.intentId}
                  onChange={(e) => setForm((prev) => ({ ...prev, intentId: e.target.value }))}
                >
                  <option value="">Không liên kết</option>
                  {intentOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="goal-description">
                Mô tả
              </label>
              <textarea
                id="goal-description"
                className="form-textarea"
                value={form.description}
                onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Mô tả mục tiêu xử lý của bot"
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="goal-script">
                Script
              </label>
              <textarea
                id="goal-script"
                className="form-textarea goal-modal-script-textarea"
                value={form.script}
                onChange={(e) => setForm((prev) => ({ ...prev, script: e.target.value }))}
                placeholder="Kịch bản xử lý cho mục tiêu này"
              />
              <p className="form-hint">Nếu để trống, hệ thống sẽ dùng nội dung Mô tả.</p>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="goal-target">
                Target Goal
              </label>
              <input
                id="goal-target"
                className="form-input"
                value={form.targetGoal}
                onChange={(e) => setForm((prev) => ({ ...prev, targetGoal: e.target.value }))}
                placeholder="VD: booking_completed"
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="goal-rule">
                Rule (JSON hoặc văn bản)
              </label>
              <textarea
                id="goal-rule"
                className="form-textarea goal-modal-rule-textarea"
                value={form.rule}
                onChange={(e) => setForm((prev) => ({ ...prev, rule: e.target.value }))}
                placeholder='VD JSON: {"reply_samples":[{"user":"...","assistant":"..."}],"skills":["skill_1"]}'
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn--ghost" onClick={onClose} disabled={loading}>
              Hủy
            </button>
            <button type="submit" className="btn btn--primary" disabled={loading}>
              <i className="ti-save"></i> {isEditMode ? 'Cập nhật Goal' : 'Tạo Goal'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GoalModal;

