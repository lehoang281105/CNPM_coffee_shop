import { useCallback, useEffect, useMemo, useState } from 'react';
import { chatWithBot, resetChatSession } from '../../services/admin/chatService';
import type { ChatMessageItem, ChatResponsePayload } from '../../types';

interface UseChatSimulatorParams {
  botId?: string;
  brandId?: string;
}

interface PersistedChatState {
  messages: ChatMessageItem[];
  latestResponse: ChatResponsePayload | null;
}

const EMPTY_STATE: PersistedChatState = {
  messages: [],
  latestResponse: null,
};

const makeMessageId = () =>
  typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

const normalizeErrorMessage = (err: unknown) => {
  if (typeof err === 'string') return err;

  if (err && typeof err === 'object') {
    const maybeAxios = err as {
      response?: { data?: { message?: string } };
      message?: string;
    };
    if (maybeAxios.response?.data?.message) return maybeAxios.response.data.message;
    if (maybeAxios.message) return maybeAxios.message;
  }

  return 'Không thể gửi tin nhắn tới API Chat.';
};

const buildStorageKey = (botId?: string) => `chat-simulator-state:${botId || 'unknown'}`;

const readState = (storageKey: string): PersistedChatState => {
  if (typeof window === 'undefined') return EMPTY_STATE;
  const raw = window.localStorage.getItem(storageKey);
  if (!raw) return EMPTY_STATE;

  try {
    const parsed = JSON.parse(raw) as PersistedChatState;
    if (!parsed || typeof parsed !== 'object') return EMPTY_STATE;
    if (!Array.isArray(parsed.messages)) return EMPTY_STATE;
    return {
      messages: parsed.messages,
      latestResponse: parsed.latestResponse ?? null,
    };
  } catch (error) {
    console.warn('Invalid chat simulator state in localStorage:', error);
    return EMPTY_STATE;
  }
};

const toHistoryPayload = (messages: ChatMessageItem[]) =>
  messages.map((m) => ({
    role: m.role,
    content: m.content,
    created_at: m.created_at,
  }));


export const useChatSimulator = ({ botId, brandId }: UseChatSimulatorParams) => {
  const storageKey = useMemo(() => buildStorageKey(botId), [botId]);
  const initialState = useMemo(() => readState(storageKey), [storageKey]);

  const [messages, setMessages] = useState<ChatMessageItem[]>(initialState.messages);
  const [latestResponse, setLatestResponse] = useState<ChatResponsePayload | null>(
    initialState.latestResponse
  );
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const stateFromStorage = readState(storageKey);
    setMessages(stateFromStorage.messages);
    setLatestResponse(stateFromStorage.latestResponse);
    setError('');
  }, [storageKey]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const dataToSave: PersistedChatState = { messages, latestResponse };
    window.localStorage.setItem(storageKey, JSON.stringify(dataToSave));
  }, [messages, latestResponse, storageKey]);

  const clearChat = useCallback(async () => {
    if (!botId) {
      setError('Thiếu bot_id để xóa session');
      return;
    }

    try {
      await resetChatSession({
        user_id: `simulator-${botId}`,
        bot_id: botId,
      });

      setMessages([]);
      setLatestResponse(null);
      setError('');
    } catch (err) {
      const message = normalizeErrorMessage(err);
      setError(`Không thể xóa session: ${message}`);
      throw err;
    }
  }, [botId]);

  const sendMessage = useCallback(
    async (text: string) => {
      const content = text.trim();
      if (!content || !botId || !brandId) return;

      const userMessage: ChatMessageItem = {
        id: makeMessageId(),
        role: 'user',
        content,
        created_at: Date.now(),
      };

      const optimisticMessages = [...messages, userMessage];
      setMessages(optimisticMessages);
      setSending(true);
      setError('');

      try {
        const response = await chatWithBot({
          user: {
            user_id: `simulator-${botId}`,
            language: 'vi',
          },
          history: toHistoryPayload(optimisticMessages),
          message: content,
          bot_id: botId,
          brand_id: brandId,
          payload: {
            source: 'chat_simulator',
          },
        });

        const possibleData = response.data;
        const normalizedResponse =
          possibleData &&
          typeof possibleData === 'object' &&
          Array.isArray((possibleData as ChatResponsePayload).response)
            ? (possibleData as ChatResponsePayload)
            : response;

        const responseBody = normalizedResponse.response as unknown;
        const assistantText = Array.isArray(responseBody)
          ? responseBody.join('\n').trim()
          : typeof responseBody === 'string'
            ? responseBody.trim()
            : '';

        const assistantMessage: ChatMessageItem = {
                  id: normalizedResponse.message_id || makeMessageId(),
                  role: 'assistant',
                  content: assistantText || 'Xin lỗi, hiện tại tôi chưa có phản hồi phù hợp.',
                  created_at: Date.now(),
                };

        setMessages((prev) => [...prev, assistantMessage]);
        setLatestResponse(normalizedResponse);
      } catch (err) {
        const message = normalizeErrorMessage(err);
        setError(message);

        const fallbackMessage: ChatMessageItem = {
          id: makeMessageId(),
          role: 'assistant',
          content: `⚠️ ${message}`,
          created_at: Date.now(),
        };
        setMessages((prev) => [...prev, fallbackMessage]);
      } finally {
        setSending(false);
      }
    },
    [messages, botId, brandId]
  );

  return {
    messages,
    latestResponse,
    sending,
    error,
    hasMessages: messages.length > 0,
    sendMessage,
    clearChat,
    clearError: () => setError(''),
  };
};
