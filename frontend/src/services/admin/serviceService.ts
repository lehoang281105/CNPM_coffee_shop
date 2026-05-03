import axiosInstance from '../axiosInstance';
import type { ApiResponse, Service, ServiceCreatePayload } from '../../types';

/** GET /api/services — lấy có phân trang */
export const getServices = (params?: { page?: number; page_size?: number }) =>
  axiosInstance.get<ApiResponse<Service[]>>('/services', { params }).then((r) => r.data);

/** GET /api/services/:id */
export const getServiceById = (serviceId: string) =>
  axiosInstance.get<ApiResponse<Service>>(`/services/${serviceId}`).then((r) => r.data);

/** POST /api/services */
export const createService = (payload: ServiceCreatePayload) =>
  axiosInstance.post<ApiResponse<Service>>('/services', payload).then((r) => r.data);

/** PUT /api/services/:id */
export const updateService = (serviceId: string, payload: Partial<ServiceCreatePayload>) =>
  axiosInstance.put<ApiResponse<Service>>(`/services/${serviceId}`, payload).then((r) => r.data);

/** DELETE /api/services/:id */
export const deleteService = (serviceId: string) =>
  axiosInstance.delete(`/services/${serviceId}`);
