import axiosInstance from '../axiosInstance';
import type { ApiResponse, Brand, BrandCreatePayload } from '../../types';

/** GET /api/brands/all */
export const getAllBrands = () =>
  axiosInstance.get<ApiResponse<Brand[]>>('/brands/all').then((r) => r.data);

/** GET /api/brands */
export const getBrandsByFilter = (params?: { page?: number; page_size?: number }) =>
  axiosInstance
    .get<ApiResponse<Brand[]>>('/brands', { params })
    .then((r) => r.data);

/** GET /api/brands/:id */
export const getBrandById = (brandId: string) =>
  axiosInstance.get<ApiResponse<Brand>>(`/brands/${brandId}`).then((r) => r.data);

/** POST /api/brands */
export const createBrand = (payload: BrandCreatePayload) =>
  axiosInstance
    .post<ApiResponse<Brand>>('/brands', payload)
    .then((r) => r.data);

/** PUT /api/brands/:id */
export const updateBrand = (brandId: string, payload: Partial<BrandCreatePayload>) =>
  axiosInstance
    .put<ApiResponse<Brand>>(`/brands/${brandId}`, payload)
    .then((r) => r.data);

/** DELETE /api/brands/:id */
export const deleteBrand = (brandId: string) =>
  axiosInstance.delete(`/brands/${brandId}`);
