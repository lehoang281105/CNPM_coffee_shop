import axiosInstance from '../axiosInstance';
import type { ApiResponse, Goal } from '../../types';

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
