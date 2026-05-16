import axiosInstance from '../axiosInstance';
import type { ApiResponse, Feedback, FeedbackCreatePayload, FeedbackRatingPayload, FeedbackSavePayload, FeedbackReportDevPayload } from '../../types';

const BASE_URL = '/feedbacks';

export const feedbackService = {
  // Lấy danh sách feedback theo bot_id
  async getByBot(
    botId: string,
    params?: {
      sort_by?: string;
      order?: 'asc' | 'desc';
      page_size?: number;
      page?: number;
    }
  ): Promise<ApiResponse<Feedback[]>> {
    const response = await axiosInstance.get<ApiResponse<Feedback[]>>(BASE_URL, {
      params: { bot_id: botId, ...params },
    });
    return response.data;
  },

  // Lấy feedback theo ID
  async getById(feedbackId: string): Promise<ApiResponse<Feedback>> {
    const response = await axiosInstance.get<ApiResponse<Feedback>>(`${BASE_URL}/${feedbackId}`);
    return response.data;
  },

  // Tạo feedback mới
  async create(payload: FeedbackCreatePayload): Promise<ApiResponse<Feedback>> {
    const response = await axiosInstance.post<ApiResponse<Feedback>>(BASE_URL, payload);
    return response.data;
  },

  // Đánh giá feedback (👍/👎)
  async rate(feedbackId: string, payload: FeedbackRatingPayload): Promise<ApiResponse<Feedback>> {
    const response = await axiosInstance.patch<ApiResponse<Feedback>>(
      `${BASE_URL}/${feedbackId}/rate`,
      payload
    );
    return response.data;
  },

  // Lưu câu trả lời đã chỉnh sửa vào FAQ
  async saveToFAQ(feedbackId: string, payload: FeedbackSavePayload): Promise<ApiResponse<Feedback>> {
    const response = await axiosInstance.patch<ApiResponse<Feedback>>(
      `${BASE_URL}/${feedbackId}/save-to-faq`,
      payload
    );
    return response.data;
  },

  // Báo cáo cho Dev Team
  async reportToDev(feedbackId: string, payload: FeedbackReportDevPayload): Promise<ApiResponse<Feedback>> {
    const response = await axiosInstance.patch<ApiResponse<Feedback>>(
      `${BASE_URL}/${feedbackId}/report-dev`,
      payload
    );
    return response.data;
  },

  // Dev đánh dấu đã fix
  async markFixed(feedbackId: string): Promise<ApiResponse<Feedback>> {
    const response = await axiosInstance.patch<ApiResponse<Feedback>>(
      `${BASE_URL}/${feedbackId}/mark-fixed`
    );
    return response.data;
  },

  // Xác nhận fix
  async confirmFix(feedbackId: string): Promise<ApiResponse<Feedback>> {
    const response = await axiosInstance.patch<ApiResponse<Feedback>>(
      `${BASE_URL}/${feedbackId}/confirm-fix`
    );
    return response.data;
  },

  // Bỏ qua feedback
  async dismiss(feedbackId: string): Promise<ApiResponse<Feedback>> {
    const response = await axiosInstance.patch<ApiResponse<Feedback>>(
      `${BASE_URL}/${feedbackId}/dismiss`
    );
    return response.data;
  },

  // Xóa feedback
  async delete(feedbackId: string): Promise<void> {
    await axiosInstance.delete(`${BASE_URL}/${feedbackId}`);
  },
};
