import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import routes from '../../routes';

const Guard = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return isLoggedIn ? children : <Navigate to={routes.login} />;
};

export default Guard;
