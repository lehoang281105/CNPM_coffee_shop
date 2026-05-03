import axiosInstance from '../axiosInstance';
import type { ChatRequestPayload, ChatResponsePayload, ResetSessionPayload } from '../../types';

/** POST /api/chat */
export const chatWithBot = (payload: ChatRequestPayload) =>
  axiosInstance.post<ChatResponsePayload>('/chat', payload).then((r) => r.data);

/** DELETE /api/chat/reset */
export const resetChatSession = (payload: ResetSessionPayload) =>
  axiosInstance.delete('/chat/reset', { data: payload });
