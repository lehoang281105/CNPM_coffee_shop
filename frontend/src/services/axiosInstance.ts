import axios from 'axios';

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

export default axiosInstance;
