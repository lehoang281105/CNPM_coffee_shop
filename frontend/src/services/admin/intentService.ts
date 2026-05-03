import axiosInstance from '../axiosInstance';
import type {
  ApiResponse,
  Intent,
  IntentCreatePayload,
  IntentUpdatePayload,
} from '../../types';

/** GET /api/intents/by-bot/:bot_id */
export const getIntentsByBotId = (botId: string) =>
  axiosInstance
    .get<ApiResponse<Intent[]>>(`/intents/by-bot/${botId}`)
    .then((r) => r.data);

/** POST /api/intents */
export const createIntent = (payload: IntentCreatePayload) =>
  axiosInstance.post<ApiResponse<Intent>>('/intents', payload).then((r) => r.data);

/** PUT /api/intents/:id */
export const updateIntent = (intentId: string, payload: IntentUpdatePayload) =>
  axiosInstance
    .put<ApiResponse<Intent>>(`/intents/${intentId}`, payload)
    .then((r) => r.data);

/** DELETE /api/intents/:id */
export const deleteIntent = (intentId: string) =>
  axiosInstance.delete(`/intents/${intentId}`);
