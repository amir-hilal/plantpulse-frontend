import axios from 'axios';

const apiEndpoint = 'http://127.0.0.1:8000/api';

const api = axios.create({
    baseURL: apiEndpoint,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;
