import axios from 'axios';

declare const process: {
  env: {
    REACT_APP_API_BASE_URL?: string;
  };
};

const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://192.168.30.28:8234/api';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// ── Request interceptor: attach bearer token if available ───────────────────
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ── Response interceptor: handle errors globally ─────────────────────────────
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server responded with error status
      const status = error.response.status;
      const data = error.response.data;
      
      // Extract error message from various possible formats
      let message = 'Đã xảy ra lỗi';
      
      if (data?.message) {
        message = data.message;
      } else if (data?.detail) {
        // FastAPI validation errors
        if (typeof data.detail === 'string') {
          message = data.detail;
        } else if (Array.isArray(data.detail)) {
          message = data.detail.map((err: any) => err.msg).join(', ');
        }
      } else if (error.response.statusText) {
        message = error.response.statusText;
      }
      
      // Add status code context
      if (status === 404) {
        message = 'Không tìm thấy dữ liệu';
      } else if (status === 403) {
        message = 'Bạn không có quyền thực hiện thao tác này';
      } else if (status === 401) {
        message = 'Phiên đăng nhập đã hết hạn';
      } else if (status >= 500) {
        message = 'Lỗi server. Vui lòng thử lại sau';
      }
      
      return Promise.reject(new Error(message));
    } else if (error.request) {
      // Request was made but no response
      return Promise.reject(new Error('Không thể kết nối đến server'));
    } else {
      // Something else happened
      return Promise.reject(error);
    }
  }
);

export default axiosInstance;
