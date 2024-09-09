import axios from 'axios';
import { toast } from 'react-toastify'; // Import toast

const apiEndpoint = 'http://127.0.0.1:8000/api';

const api = axios.create({
  baseURL: apiEndpoint
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    toast.error('Failed to send request!'); // Toast error on request failure
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error);
    if (error.response) {
      if (error.response.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';
        toast.error('Unauthorized! Please login again.'); // Toast for 401 error
      } else if (error.response.status >= 500) {
        toast.error('Server error! Please try again later.'); // Toast for server errors (500+)
      } else {
        toast.error(`Error: ${error.response.statusText}`); // Generic error toast
      }
    } else {
      toast.error('Network error! Please check your connection.');
    }
    return Promise.reject(error);
  }
);

export default api;
