import api from './api';


export const fetchUserData = async () => {
  try {
    const response = await api.get('/me');
    return response.data.user;
  } catch (error) {
    throw error.response.data.error;
  }
};
