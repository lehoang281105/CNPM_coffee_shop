import axiosInstance from '../axiosInstance';
import type { ApiResponse } from '../../types';
import type { 
  LongTermBaseResponse, 
  LongTermCreateRequest, 
  LongTermUpdateRequest 
} from '../../types';

export const getLongTerms = (params?: { user_id?: string; bot_id?: string; page?: number; page_size?: number; sort_by?: string; order?: string }) =>
  axiosInstance
    .get<ApiResponse<LongTermBaseResponse[]>>('/longterms', { params })
    .then((r) => r.data);

export const createLongTerm = (payload: LongTermCreateRequest) =>
  axiosInstance
    .post<ApiResponse<LongTermBaseResponse>>('/longterms', payload)
    .then((r) => r.data);

export const updateLongTerm = (id: string, payload: LongTermUpdateRequest) =>
  axiosInstance
    .put<ApiResponse<LongTermBaseResponse>>(`/longterms/${id}`, payload)
    .then((r) => r.data);
