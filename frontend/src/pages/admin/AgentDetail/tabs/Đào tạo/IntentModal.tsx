import React, { useEffect, useMemo, useState } from 'react';
import type {
  Goal,
  Intent,
  IntentCreatePayload,
  IntentUpdatePayload,
} from '../../../../../types';
import {
  buildIntentExamplePayload,
  parseIntentMeta,
  toDisplayNameFromMachine,
} from '../../../../../utils/intentHelpers';

interface IntentModalProps {
  mode: 'create' | 'edit';
  intent?: Intent | null;
  goals: Goal[];
  botId?: string;
  loading?: boolean;
  onClose: () => void;
  onSubmit: (payload: IntentCreatePayload | IntentUpdatePayload) => Promise<void>;
}

interface IntentFormState {
  machineName: string;
  displayName: string;
  description: string;
  trainingExamples: string;
  selectedGoalIds: string[];
}

const buildInitialForm = (intent?: Intent | null): IntentFormState => {
  if (!intent) {
    return {
      machineName: '',
      displayName: '',
      description: '',
      trainingExamples: '',
      selectedGoalIds: [],
    };
  }

  const meta = parseIntentMeta(intent);
  return {
    machineName: intent.name ?? '',
    displayName: meta.displayName || toDisplayNameFromMachine(intent.name ?? ''),
    description: intent.description ?? '',
    trainingExamples: meta.examples.join('\n'),
    selectedGoalIds: meta.goalIds,
  };
};

const IntentModal: React.FC<IntentModalProps> = ({
  mode,
  intent,
  goals,
  botId,
  loading = false,
  onClose,
  onSubmit,
}) => {
  const [form, setForm] = useState<IntentFormState>(buildInitialForm(intent));
  const [error, setError] = useState('');

  useEffect(() => {
    setForm(buildInitialForm(intent));
    setError('');
  }, [intent, mode]);

  const isEditMode = mode === 'edit';

  const selectedGoalSet = useMemo(() => new Set(form.selectedGoalIds), [form.selectedGoalIds]);

  const handleToggleGoal = (goalId: string) => {
    setForm((prev) => {
      if (prev.selectedGoalIds.includes(goalId)) {
        return {
          ...prev,
          selectedGoalIds: prev.selectedGoalIds.filter((id) => id !== goalId),
        };
      }
      return {
        ...prev,
        selectedGoalIds: [...prev.selectedGoalIds, goalId],
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const machineName = form.machineName.trim().replace(/\s+/g, '_');
    const displayName = form.displayName.trim();
    const description = form.description.trim();

    if (!machineName) {
      setError('Machine Name là bắt buộc.');
      return;
    }
    if (!displayName) {
      setError('Tên hiển thị là bắt buộc.');
      return;
    }
    if (!description) {
      setError('Mô tả là bắt buộc.');
      return;
    }

    const examples = form.trainingExamples
      .split(/\r?\n/g)
      .map((line) => line.trim())
      .filter(Boolean);

    const examplePayload = buildIntentExamplePayload(
      intent?.example,
      displayName,
      examples,
      form.selectedGoalIds
    );

    setError('');

    if (isEditMode) {
      const updatePayload: IntentUpdatePayload = {
        name: machineName,
        description,
        target_goal: form.selectedGoalIds[0] ?? null,
        example: examplePayload,
      };
      const resolvedBotId = botId ?? intent?.bot_id;
      if (resolvedBotId) {
        updatePayload.bot_id = resolvedBotId;
      }
      await onSubmit(updatePayload);
      return;
    }

    if (!botId) {
      setError('Thiếu bot_id để tạo intent.');
      return;
    }

    await onSubmit({
      name: machineName,
      description,
      target_goal: form.selectedGoalIds[0] ?? null,
      example: examplePayload,
      bot_id: botId,
    });
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal intent-modal" role="dialog" aria-modal="true" aria-labelledby="intent-modal-title">
        <div className="modal-header intent-modal-header">
          <h2 className="modal-title" id="intent-modal-title">
            {isEditMode ? 'Chỉnh sửa Intent' : 'Thêm Intent mới'}
          </h2>
          <button className="modal-close" onClick={onClose} aria-label="Đóng" disabled={loading}>
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body intent-modal-body">
            {error && <div className="error-banner">⚠️ {error}</div>}

            <div className="form-2col">
              <div className="form-group">
                <label className="form-label" htmlFor="intent-machine-name">
                  Machine Name
                </label>
                <input
                  id="intent-machine-name"
                  className="form-input"
                  value={form.machineName}
                  onChange={(e) => setForm((prev) => ({ ...prev, machineName: e.target.value }))}
                  placeholder="VD: chao_hoi"
                  autoFocus
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="intent-display-name">
                  Tên hiển thị
                </label>
                <input
                  id="intent-display-name"
                  className="form-input"
                  value={form.displayName}
                  onChange={(e) => setForm((prev) => ({ ...prev, displayName: e.target.value }))}
                  placeholder="VD: Chào hỏi"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="intent-description">
                Mô tả
              </label>
              <textarea
                id="intent-description"
                className="form-textarea"
                value={form.description}
                onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Mô tả ngắn gọn mục đích của intent"
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="intent-training-examples">
                Training Examples (mỗi dòng 1 ví dụ)
              </label>
              <textarea
                id="intent-training-examples"
                className="form-textarea intent-training-textarea"
                value={form.trainingExamples}
                onChange={(e) => setForm((prev) => ({ ...prev, trainingExamples: e.target.value }))}
                placeholder={'Chào\nHello\nXin chào'}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Mục tiêu liên kết</label>
              <div className="intent-goal-checklist">
                {goals.length === 0 ? (
                  <p className="form-hint">Chưa có goal để liên kết cho bot này.</p>
                ) : (
                  goals.map((goal) => (
                    <label className="intent-goal-item" key={goal.id}>
                      <input
                        type="checkbox"
                        checked={selectedGoalSet.has(goal.id)}
                        onChange={() => handleToggleGoal(goal.id)}
                      />
                      <span>{goal.name}</span>
                    </label>
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn--ghost" onClick={onClose} disabled={loading}>
              Hủy
            </button>
            <button type="submit" className="btn btn--primary" disabled={loading}>
              <i className="ti-save"></i> {isEditMode ? 'Cập nhật' : 'Tạo Intent'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default IntentModal;
