import axiosInstance from '../axiosInstance';
import type { ChatRequestPayload, ChatResponsePayload } from '../../types';

const CHAT_TIMEOUT_MS = 50000;

/** POST /api/chat */
export const chatWithBot = (payload: ChatRequestPayload) =>
  axiosInstance
    .post<ChatResponsePayload>('/chat', payload, { timeout: CHAT_TIMEOUT_MS })
    .then((r) => r.data);
