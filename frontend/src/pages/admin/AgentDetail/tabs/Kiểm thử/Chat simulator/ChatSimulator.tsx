import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useChatSimulator } from '../../../../../../hooks/admin/useChatSimulator';
import type { ChatResponsePayload } from '../../../../../../types';

interface ChatSimulatorProps {
  botId?: string;
  botName?: string;
  brandId?: string;
  onSwitchToFeedback?: () => void;
}

interface DebugIntentScore {
  label: string;
  percent: number;
}

interface DebugSkillCall {
  skill_name: string;
  reason: string | null;
  confidence: number | null;
  status: string | null;
  skipped: boolean;
}

interface DebugCompletedGoal {
  goal_id: string;
  goal_name: string | null;
  reason: string | null;
}

interface DebugData {
  reasoningFlow: string;
  intentScores: DebugIntentScore[];
  kbArticles: string[];
  policies: string[];
  tokenInput: number | null;
  tokenOutput: number | null;
  answerReason: string | null;
  skillCalls: DebugSkillCall[];
  completedGoals: DebugCompletedGoal[];
  userMessageId: string | null;
}

const EMPTY_DEBUG: DebugData = {
  reasoningFlow: '',
  intentScores: [],
  kbArticles: [],
  policies: [],
  tokenInput: null,
  tokenOutput: null,
  answerReason: null,
  skillCalls: [],
  completedGoals: [],
  userMessageId: null,
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const toNumber = (value: unknown): number | null => {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string') {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
};

const toStringList = (value: unknown): string[] => {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (typeof item === 'string') return item;
      if (isRecord(item)) {
        const id = item.id;
        const name = item.name;
        const title = item.title;
        const valueText = item.value;
        if (typeof id === 'string') return id;
        if (typeof name === 'string') return name;
        if (typeof title === 'string') return title;
        if (typeof valueText === 'string') return valueText;
      }
      return '';
    })
    .filter(Boolean);
};

const getPathValue = (source: unknown, path: string[]): unknown =>
  path.reduce<unknown>((acc, key) => (isRecord(acc) ? acc[key] : undefined), source);

const pickFirstNumber = (source: unknown, paths: string[][]): number | null => {
  for (const path of paths) {
    const numberValue = toNumber(getPathValue(source, path));
    if (numberValue !== null) return numberValue;
  }
  return null;
};

const normalizePercent = (value: number | null): number => {
  if (value === null) return 0;
  if (value <= 1) return Math.max(0, Math.min(100, Math.round(value * 100)));
  return Math.max(0, Math.min(100, Math.round(value)));
};

const unique = (items: string[]) => [...new Set(items.filter(Boolean))];

const formatReasoningFlow = (value: string): string =>
  value
    .replace(/\r\n?/g, '\n')
    .replace(/([^\n])\s+(\d+\.\s)/g, '$1\n$2')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

const extractDebugData = (response: ChatResponsePayload | null): DebugData => {
  if (!response) return EMPTY_DEBUG;

  const reasoning = isRecord(response.reasoning) ? response.reasoning : {};
  const intent = isRecord(reasoning.intent) ? reasoning.intent : {};
  const goal = isRecord(reasoning.goal) ? reasoning.goal : {};

  const reasoningPieces: string[] = [];
  const intentReason = typeof intent.reason === 'string' ? intent.reason : '';
  const intentThought = typeof intent.thought === 'string' ? intent.thought : '';
  const goalReason = typeof goal.reason === 'string' ? goal.reason : '';
  const goalThought = typeof goal.thought === 'string' ? goal.thought : '';

  if (intentReason) reasoningPieces.push(`Intent: ${intentReason}`);
  if (intentThought) reasoningPieces.push(intentThought);
  if (goalReason) reasoningPieces.push(`Goal: ${goalReason}`);
  if (goalThought) reasoningPieces.push(goalThought);

  const intentScores: DebugIntentScore[] = [];
  const intentLabel =
    typeof intent.id === 'string' && intent.id.trim() ? intent.id : 'matched_intent';
  const intentConfidence = normalizePercent(toNumber(intent.confidence));
  if (intentConfidence > 0) {
    intentScores.push({ label: intentLabel, percent: intentConfidence });
  }

  const scoreCandidates = [
    getPathValue(response, ['intent_scores']),
    getPathValue(response, ['reasoning', 'intent_scores']),
    getPathValue(response, ['debug', 'intent_scores']),
    getPathValue(response, ['payload', 'intent_scores']),
    getPathValue(response, ['metadata', 'intent_scores']),
  ];

  scoreCandidates.forEach((candidate) => {
    if (Array.isArray(candidate)) {
      candidate.forEach((item) => {
        if (!isRecord(item)) return;
        const label =
          (typeof item.label === 'string' && item.label) ||
          (typeof item.intent === 'string' && item.intent) ||
          (typeof item.id === 'string' && item.id) ||
          '';
        const confidence = normalizePercent(
          toNumber(item.confidence) ?? toNumber(item.score) ?? toNumber(item.probability)
        );
        if (label && confidence > 0) {
          intentScores.push({ label, percent: confidence });
        }
      });
    } else if (isRecord(candidate)) {
      Object.entries(candidate).forEach(([label, value]) => {
        const confidence = normalizePercent(toNumber(value));
        if (label && confidence > 0) {
          intentScores.push({ label, percent: confidence });
        }
      });
    }
  });

  const dedupedIntentScores = unique(intentScores.map((item) => item.label)).map((label) => {
    const maxPercent = Math.max(
      ...intentScores.filter((item) => item.label === label).map((item) => item.percent)
    );
    return { label, percent: maxPercent };
  });

  const kbArticles = unique(
    [
      getPathValue(response, ['kb_articles']),
      getPathValue(response, ['reasoning', 'kb_articles']),
      getPathValue(response, ['reasoning', 'intent', 'kb_articles']),
      getPathValue(response, ['debug', 'kb_articles']),
      getPathValue(response, ['payload', 'kb_articles']),
      getPathValue(response, ['metadata', 'kb_articles']),
    ].flatMap((value) => toStringList(value))
  );

  const policies = unique(
    [
      getPathValue(response, ['policy']),
      getPathValue(response, ['policies']),
      getPathValue(response, ['applied_policies']),
      getPathValue(response, ['matched_policies']),
      getPathValue(response, ['reasoning', 'policy']),
      getPathValue(response, ['reasoning', 'policies']),
      getPathValue(response, ['debug', 'policy']),
      getPathValue(response, ['debug', 'policies']),
      getPathValue(response, ['payload', 'policy']),
      getPathValue(response, ['payload', 'policies']),
    ].flatMap((value) => (typeof value === 'string' ? [value] : toStringList(value)))
  );

  const tokenInput = pickFirstNumber(response, [
    ['token_usage', 'input'],
    ['token_usage', 'input_tokens'],
    ['usage', 'prompt_tokens'],
    ['usage', 'input_tokens'],
    ['debug', 'token_usage', 'input'],
    ['debug', 'usage', 'prompt_tokens'],
  ]);

  const tokenOutput = pickFirstNumber(response, [
    ['token_usage', 'output'],
    ['token_usage', 'output_tokens'],
    ['usage', 'completion_tokens'],
    ['usage', 'output_tokens'],
    ['debug', 'token_usage', 'output'],
    ['debug', 'usage', 'completion_tokens'],
  ]);

  const answerReason = typeof response.answer_reason === 'string' ? response.answer_reason : null;
  const userMessageId = typeof response.user_message_id === 'string' ? response.user_message_id : null;

  const skillCalls: DebugSkillCall[] = [];
  if (Array.isArray(response.skill_calls)) {
    response.skill_calls.forEach((item) => {
      if (isRecord(item) && typeof item.skill_name === 'string') {
        skillCalls.push({
          skill_name: item.skill_name,
          reason: typeof item.reason === 'string' ? item.reason : null,
          confidence: toNumber(item.confidence),
          status: typeof item.status === 'string' ? item.status : null,
          skipped: item.skipped === true,
        });
      }
    });
  }

  const completedGoals: DebugCompletedGoal[] = [];
  if (Array.isArray(response.completed_goals)) {
    response.completed_goals.forEach((item) => {
      if (isRecord(item) && typeof item.goal_id === 'string') {
        completedGoals.push({
          goal_id: item.goal_id,
          goal_name: typeof item.goal_name === 'string' ? item.goal_name : null,
          reason: typeof item.reason === 'string' ? item.reason : null,
        });
      }
    });
  }

  return {
    reasoningFlow: formatReasoningFlow(reasoningPieces.join('\n\n')),
    intentScores: dedupedIntentScores.sort((a, b) => b.percent - a.percent),
    kbArticles,
    policies,
    tokenInput,
    tokenOutput,
    answerReason,
    skillCalls,
    completedGoals,
    userMessageId,
  };
};

const ChatSimulator: React.FC<ChatSimulatorProps> = ({ botId, botName, brandId, onSwitchToFeedback }) => {
  const {
    messages,
    latestResponse,
    sending,
    error,
    hasMessages,
    sendMessage,
    clearChat,
    clearError,
  } = useChatSimulator({ botId, brandId });

  const [input, setInput] = useState('');
  const [collapsedDebug, setCollapsedDebug] = useState(false);
  const [showReasoningFlow, setShowReasoningFlow] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const messagesRef = useRef<HTMLDivElement | null>(null);

  const debugData = useMemo(() => extractDebugData(latestResponse), [latestResponse]);
  const canChat = Boolean(botId && brandId);

  useEffect(() => {
    if (!messagesRef.current) return;
    messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
  }, [messages, sending]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || sending || !canChat) return;
    const messageToSend = input;
    setInput('');
    await sendMessage(messageToSend);
  };

  const handleLoadSample = async () => {
    if (sending || !canChat) return;
    await sendMessage('alo');
  };

  const handleClearConversation = async () => {
    try {
      await clearChat();
      setShowClearConfirm(false);
    } catch (err) {
      // Error đã được xử lý trong hook, chỉ cần giữ modal mở
      console.error('Failed to clear chat:', err);
    }
  };

  return (
    <>
      <div className="simulator-page">
        <div className="simulator-header">
          <div>
            <h1 className="simulator-title">Phòng kiểm thử</h1>
            <p className="simulator-subtitle">Chat Simulator với bảng Debug AI</p>
          </div>

          <div className="simulator-actions">
            <button type="button" className="btn btn--ghost" onClick={handleLoadSample} disabled={!canChat || sending}>
              <i className="ti-star"></i> Tải mẫu
            </button>
            <button type="button" className="btn btn--ghost" onClick={() => setShowClearConfirm(true)} disabled={!hasMessages || sending}>
              <i className="ti-trash"></i> Xóa
            </button>
          </div>
        </div>

        {!canChat && (
          <div className="error-banner" style={{ marginBottom: 12 }}>
            ⚠️ Thiếu thông tin bot/brand để gọi API Chat. Vui lòng kiểm tra lại dữ liệu Agent.
          </div>
        )}

        {error && (
          <div className="error-banner" style={{ marginBottom: 12 }}>
            <i className="ti-alert"></i> {error}
            <button onClick={clearError}>Đóng</button>
          </div>
        )}

        <div className="simulator-grid">
          <section className="sim-chat-card">
            <div className="sim-chat-scroll" ref={messagesRef}>
              <div className="sim-chat-hint">
                Phòng kiểm thử - Chat Simulator. Thử hội thoại mẫu hoặc tự nhập.
              </div>

              {messages.length === 0 && (
                <div className="sim-chat-empty">
                  Chưa có hội thoại. Bạn có thể bấm <strong>Tải mẫu</strong> hoặc nhập tin nhắn để bắt
                  đầu kiểm thử.
                </div>
              )}

              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`sim-message-row ${
                    message.role === 'user' ? 'sim-message-row--user' : 'sim-message-row--assistant'
                  }`}
                >
                  {message.role === 'assistant' ? (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '6px', maxWidth: '82%' }}>
                      <div className={`sim-message-bubble sim-message-bubble--${message.role}`}>
                        {message.content}
                      </div>
                      {onSwitchToFeedback && (
                        <button
                          type="button"
                          className="sim-feedback-btn"
                          onClick={onSwitchToFeedback}
                          title="Báo sai"
                        >
                          👎 Báo sai
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className={`sim-message-bubble sim-message-bubble--${message.role}`}>
                      {message.content}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <form className="sim-chat-input-wrap" onSubmit={handleSubmit}>
              <input
                className="sim-chat-input"
                placeholder="Nhập tin nhắn để kiểm thử AI..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={!canChat || sending}
              />
              <button type="submit" className="sim-chat-send" disabled={!input.trim() || !canChat || sending}>
                <i className="ti-location-arrow"></i>
              </button>
            </form>
          </section>

          <aside className="sim-debug-card">
            <div className="sim-debug-header">
              <h3>
                <i className="ti-bug"></i> Bảng Debug
              </h3>
              <button
                type="button"
                className="sim-debug-toggle"
                onClick={() => setCollapsedDebug((prev) => !prev)}
                title={collapsedDebug ? 'Mở rộng' : 'Thu gọn'}
              >
                <i className={collapsedDebug ? 'ti-angle-left' : 'ti-angle-down'}></i>
              </button>
            </div>

            {!collapsedDebug && (
              <div className="sim-debug-body">
                <div className="sim-debug-section">
                  <div className="sim-debug-section-header">
                    <h4>Luồng suy luận AI</h4>
                    <button
                      type="button"
                      className={`sim-reasoning-toggle ${showReasoningFlow ? 'is-active' : ''}`}
                      onClick={() => setShowReasoningFlow((prev) => !prev)}
                      title={showReasoningFlow ? 'Ẩn luồng suy luận' : 'Hiện luồng suy luận'}
                      aria-expanded={showReasoningFlow}
                    >
                      <i className="ti-light-bulb"></i>
                    </button>
                  </div>
                  {showReasoningFlow ? (
                    <div className="sim-debug-box">
                      {debugData.reasoningFlow || 'Chưa có dữ liệu suy luận từ phản hồi API.'}
                    </div>
                  ) : (
                    <p className="sim-debug-empty-text">Nhấn vào icon để xem chi tiết luồng suy luận</p>
                  )}
                </div>

                <div className="sim-debug-section">
                  <h4>Phát hiện intent</h4>
                  {debugData.intentScores.length > 0 ? (
                    <div className="sim-intent-list">
                      {debugData.intentScores.map((item) => (
                        <div className="sim-intent-item" key={item.label}>
                          <span>{item.label}</span>
                          <div className="sim-intent-meter">
                            <div style={{ width: `${item.percent}%` }}></div>
                          </div>
                          <strong>{item.percent}%</strong>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="sim-debug-empty-text">Chưa có dữ liệu intent.</p>
                  )}
                </div>

                <div className="sim-debug-section">
                  <h4>KB articles đã truy xuất</h4>
                  {debugData.kbArticles.length > 0 ? (
                    <ul className="sim-debug-list">
                      {debugData.kbArticles.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="sim-debug-empty-text">Chưa có dữ liệu KB.</p>
                  )}
                </div>

                <div className="sim-debug-section">
                  <h4>Policy đã áp dụng</h4>
                  {debugData.policies.length > 0 ? (
                    <div className="sim-policy-wrap">
                      {debugData.policies.map((item) => (
                        <span className="sim-policy-pill" key={item}>
                          {item}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="sim-debug-empty-text">Chưa có dữ liệu policy.</p>
                  )}
                </div>

                <div className="sim-debug-section">
                  <h4>Sử dụng token</h4>
                  <div className="sim-token-grid">
                    <div className="sim-token-card">
                      <span>Đầu vào</span>
                      <strong>{debugData.tokenInput ?? '--'}</strong>
                    </div>
                    <div className="sim-token-card">
                      <span>Đầu ra</span>
                      <strong>{debugData.tokenOutput ?? '--'}</strong>
                    </div>
                  </div>
                </div>

                {debugData.skillCalls.length > 0 && (
                  <div className="sim-debug-section">
                    <h4>Skill đã gọi</h4>
                    <div className="sim-debug-list">
                      {debugData.skillCalls.map((skill, idx) => (
                        <div key={idx} style={{ marginBottom: '12px', padding: '8px', background: '#f5f5f5', borderRadius: '4px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                            <strong>{skill.skill_name}</strong>
                            {skill.skipped && <span style={{ color: '#999', fontSize: '12px' }}>(bỏ qua)</span>}
                            {skill.status && <span className="sim-policy-pill" style={{ fontSize: '11px' }}>{skill.status}</span>}
                          </div>
                          {skill.reason && <p style={{ fontSize: '13px', margin: '4px 0 0 0' }}>{skill.reason}</p>}
                          {skill.confidence !== null && (
                            <p style={{ fontSize: '12px', color: '#666', margin: '4px 0 0 0' }}>
                              Độ tin cậy: {skill.confidence}%
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {debugData.completedGoals.length > 0 && (
                  <div className="sim-debug-section">
                    <h4>Goal đã hoàn thành</h4>
                    <div className="sim-debug-list">
                      {debugData.completedGoals.map((goal, idx) => (
                        <div key={idx} style={{ marginBottom: '12px', padding: '8px', background: '#f0f9ff', borderRadius: '4px', borderLeft: '3px solid #3b82f6' }}>
                          <div style={{ marginBottom: '4px' }}>
                            <strong>{goal.goal_name || goal.goal_id}</strong>
                          </div>
                          {goal.goal_name && goal.goal_id !== goal.goal_name && (
                            <p style={{ fontSize: '12px', color: '#666', margin: '2px 0' }}>ID: {goal.goal_id}</p>
                          )}
                          {goal.reason && <p style={{ fontSize: '13px', margin: '4px 0 0 0' }}>{goal.reason}</p>}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {debugData.answerReason && (
                  <div className="sim-debug-section">
                    <h4>Lý do trả lời</h4>
                    <div className="sim-debug-box">
                      {debugData.answerReason}
                    </div>
                  </div>
                )}

                {debugData.userMessageId && (
                  <div className="sim-debug-meta">user_message_id: {debugData.userMessageId}</div>
                )}

                {latestResponse?.message_id && (
                  <div className="sim-debug-meta">message_id: {latestResponse.message_id}</div>
                )}
              </div>
            )}
          </aside>
        </div>

        {botName && <div className="simulator-bot-tag">Bot đang kiểm thử: {botName}</div>}
      </div>

      {showClearConfirm && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && setShowClearConfirm(false)}>
          <div className="modal branch-delete-modal" role="dialog" aria-modal="true" aria-labelledby="clear-chat-title">
            <div className="modal-header">
              <h2 className="modal-title" id="clear-chat-title">
                Xóa lịch sử hội thoại
              </h2>
              <button className="modal-close" onClick={() => setShowClearConfirm(false)} aria-label="Đóng">
                ✕
              </button>
            </div>
            <div className="modal-body branch-delete-body">
              <p>Bạn có chắc muốn xóa toàn bộ nội dung Chat Simulator?</p>
              <p className="form-hint">Dữ liệu sẽ chỉ mất khi bạn xác nhận xóa.</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn--ghost" onClick={() => setShowClearConfirm(false)}>
                Hủy
              </button>
              <button type="button" className="btn btn--danger" onClick={handleClearConversation}>
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatSimulator;
