import axiosInstance from '../axiosInstance';
import type { ApiResponse, FAQ, FAQCreatePayload, FAQUpdatePayload } from '../../types';

/** GET /api/faqs/all — lấy toàn bộ danh sách FAQ */
export const getAllFAQs = () =>
  axiosInstance.get<ApiResponse<FAQ[]>>('/faqs/all').then((r) => r.data);

/** GET /api/faqs — lấy có phân trang + filter */
export const getFAQsByFilter = (params?: {
  page?: number;
  page_size?: number;
  sort_by?: string;
  order?: string;
}) =>
  axiosInstance
    .get<ApiResponse<FAQ[]>>('/faqs', { params })
    .then((r) => r.data);

/** GET /api/faqs/:id */
export const getFAQById = (faqId: string) =>
  axiosInstance.get<ApiResponse<FAQ>>(`/faqs/${faqId}`).then((r) => r.data);

/** POST /api/faqs */
export const createFAQ = (payload: FAQCreatePayload) =>
  axiosInstance.post<ApiResponse<FAQ>>('/faqs', payload).then((r) => r.data);

/** PUT /api/faqs/:id */
export const updateFAQ = (faqId: string, payload: FAQUpdatePayload) =>
  axiosInstance
    .put<ApiResponse<FAQ>>(`/faqs/${faqId}`, payload)
    .then((r) => r.data);

/** DELETE /api/faqs/:id */
export const deleteFAQ = (faqId: string) =>
  axiosInstance.delete(`/faqs/${faqId}`);
