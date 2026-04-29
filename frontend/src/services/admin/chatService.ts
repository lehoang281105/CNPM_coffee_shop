import axiosInstance from '../axiosInstance';
import type { ChatRequestPayload, ChatResponsePayload } from '../../types';

/** POST /api/chat */
export const chatWithBot = (payload: ChatRequestPayload) =>
  axiosInstance.post<ChatResponsePayload>('/chat', payload).then((r) => r.data);
