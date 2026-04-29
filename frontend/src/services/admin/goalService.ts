import axiosInstance from '../axiosInstance';
import type {
  ApiResponse,
  Goal,
  GoalCreatePayload,
  GoalUpdatePayload,
} from '../../types';

interface GoalFilterParams {
  page?: number;
  page_size?: number;
  sort_by?: string;
  order?: 'asc' | 'desc';
}

/** GET /api/goals */
export const getGoalsByFilter = (params?: GoalFilterParams) =>
  axiosInstance
    .get<ApiResponse<Goal[]>>('/goals', { params })
    .then((r) => r.data);

/** POST /api/goals */
export const createGoal = (payload: GoalCreatePayload) =>
  axiosInstance.post<ApiResponse<Goal>>('/goals', payload).then((r) => r.data);

/** PUT /api/goals/:id */
export const updateGoal = (goalId: string, payload: GoalUpdatePayload) =>
  axiosInstance
    .put<ApiResponse<Goal>>(`/goals/${goalId}`, payload)
    .then((r) => r.data);

/** DELETE /api/goals/:id */
export const deleteGoal = (goalId: string) =>
  axiosInstance.delete(`/goals/${goalId}`);
