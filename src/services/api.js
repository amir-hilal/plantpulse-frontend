import axios from 'axios';
import { handleLogin, handleLogout } from '../utils/authUtils';

const apiEndpoint = 'http://127.0.0.1:8000/api';

const api = axios.create({
  baseURL: apiEndpoint,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (originalRequest.url === '/refresh-token') {
        handleLogout(); 
        return Promise.reject(error);
      }

      try {
        const response = await api.post('/refresh-token');
        const newToken = response.data.token;
        handleLogin(newToken);
        originalRequest.headers['Authorization'] = `Bearer ${newToken}`;

        return api(originalRequest);
      } catch (_error) {
        handleLogout();
        return Promise.reject(_error);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
