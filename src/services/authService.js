import api from './api'; 

export const loginUser = async (credentials) => {
  try {
    const response = await api.post('/login', credentials);
    const { token, user } = response.data;
    localStorage.setItem('token', token);

    return user;
  } catch (error) {
    throw error.response.data.error;
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await api.post('/register', userData);
    const { token, user } = response.data;
    localStorage.setItem('token', token);

    return user;
  } catch (error) {
    throw error.response.data.error;
  }
};

export const fetchUserData = async () => {
  try {
    const response = await api.get('/me');
    return response.data.user;
  } catch (error) {
    throw error.response.data.error;
  }
};
