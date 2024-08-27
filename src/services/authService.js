import api from './api';


export const fetchUserData = async () => {
  try {
    const response = await api.get('/me');
    return response.data;
  } catch (error) {
    throw error.response.data.error;
  }
};
