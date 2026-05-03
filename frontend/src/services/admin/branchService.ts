import axiosInstance from '../axiosInstance';
import type {
  ApiResponse,
  Branch,
  BranchCreatePayload,
  BranchUpdatePayload,
} from '../../types';

interface BranchFilterParams {
  page?: number;
  page_size?: number;
  sort_by?: string;
  order?: 'asc' | 'desc';
}

/** GET /api/branches/all */
export const getAllBranches = () =>
  axiosInstance.get<ApiResponse<Branch[]>>('/branches/all').then((r) => r.data);

/** GET /api/branches */
export const getBranchesByFilter = (params?: BranchFilterParams) =>
  axiosInstance
    .get<ApiResponse<Branch[]>>('/branches', { params })
    .then((r) => r.data);

/** GET /api/branches/:id */
export const getBranchById = (branchId: string) =>
  axiosInstance.get<ApiResponse<Branch>>(`/branches/${branchId}`).then((r) => r.data);

/** POST /api/branches */
export const createBranch = (payload: BranchCreatePayload) =>
  axiosInstance
    .post<ApiResponse<Branch>>('/branches', payload)
    .then((r) => r.data);

/** PUT /api/branches/:id */
export const updateBranch = (branchId: string, payload: BranchUpdatePayload) =>
  axiosInstance
    .put<ApiResponse<Branch>>(`/branches/${branchId}`, payload)
    .then((r) => r.data);

/** DELETE /api/branches/:id */
export const deleteBranch = (branchId: string) =>
  axiosInstance.delete(`/branches/${branchId}`);
