import axios from 'axios';
import { getToken, logout } from '../utils/auth';

const api = axios.create({
  baseURL: 'http://localhost:4000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach token mỗi khi request
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      // Server chấp nhận các loại token sau
      config.headers.token = token;
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      delete config.headers.token;
      delete config.headers.Authorization;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Tự động đăng xuất khi gặp phải lỗi Authentication
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      // Token invalid/expired/no token -> logout
      logout();
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export default api;
