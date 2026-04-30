import axiosInstance from '../axiosInstance';
import type { ApiResponse, ServiceCatalog } from '../../types';

/** GET /api/catalogs/all — lấy toàn bộ danh mục */
export const getAllCatalogs = () =>
  axiosInstance.get<ApiResponse<ServiceCatalog[]>>('/catalogs/all').then((r) => r.data);

/** GET /api/catalogs — lấy có phân trang */
export const getCatalogs = (params?: { page?: number; page_size?: number }) =>
  axiosInstance.get<ApiResponse<ServiceCatalog[]>>('/catalogs', { params }).then((r) => r.data);

/** GET /api/catalogs/:id */
export const getCatalogById = (catalogId: string) =>
  axiosInstance.get<ApiResponse<ServiceCatalog>>(`/catalogs/${catalogId}`).then((r) => r.data);

/** POST /api/catalogs */
export const createCatalog = (payload: { category_name: string; brand_id: string; service_ids?: string[] }) =>
  axiosInstance.post<ApiResponse<ServiceCatalog>>('/catalogs', payload).then((r) => r.data);

/** PUT /api/catalogs/:id */
export const updateCatalog = (catalogId: string, payload: Partial<{ category_name: string; brand_id: string; service_ids: string[] }>) =>
  axiosInstance.put<ApiResponse<ServiceCatalog>>(`/catalogs/${catalogId}`, payload).then((r) => r.data);

/** DELETE /api/catalogs/:id */
export const deleteCatalog = (catalogId: string) =>
  axiosInstance.delete(`/catalogs/${catalogId}`);
