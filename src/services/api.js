import axios from 'axios';

const apiEndpoint = 'http://127.0.0.1:8000/api';

const api = axios.create({
    baseURL: apiEndpoint,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
