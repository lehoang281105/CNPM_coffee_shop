import axiosInstance from '../axiosInstance';
import type { ApiResponse, Bot, BotCreatePayload } from '../../types';

/** GET /api/bots/all — lấy toàn bộ danh sách bot */
export const getAllBots = () =>
  axiosInstance.get<ApiResponse<Bot[]>>('/bots/all').then((r) => r.data);

/** GET /api/bots — lấy có phân trang + filter */
export const getBotsByFilter = (params?: {
  page?: number;
  page_size?: number;
  sort_by?: string;
  order?: string;
}) =>
  axiosInstance
    .get<ApiResponse<Bot[]>>('/bots', { params })
    .then((r) => r.data);

/** GET /api/bots/:id */
export const getBotById = (botId: string) =>
  axiosInstance.get<ApiResponse<Bot>>(`/bots/${botId}`).then((r) => r.data);

/** POST /api/bots */
export const createBot = (payload: BotCreatePayload) =>
  axiosInstance.post<ApiResponse<Bot>>('/bots', payload).then((r) => r.data);

/** PUT /api/bots/:id */
export const updateBot = (botId: string, payload: Partial<BotCreatePayload>) =>
  axiosInstance
    .put<ApiResponse<Bot>>(`/bots/${botId}`, payload)
    .then((r) => r.data);

/** DELETE /api/bots/:id */
export const deleteBot = (botId: string) =>
  axiosInstance.delete(`/bots/${botId}`);
