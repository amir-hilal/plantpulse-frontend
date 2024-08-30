import { login, logoutUser } from '../features/auth/authSlice';

export const handleLogin = (dispatch, token, user = null) => {
  localStorage.setItem('token', token);
  dispatch(login(user));
};

export const handleLogout = (dispatch) => {
  localStorage.removeItem('token');
  dispatch(logoutUser());
};
