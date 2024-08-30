import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import routes from '../../routes';

const Guard = ({ children, authRequired, redirectPath }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  if (authRequired && !isLoggedIn) {
    return <Navigate to={routes.login} />;
  }

  if (!authRequired && isLoggedIn) {
    return <Navigate to={redirectPath || routes.home} />;
  }

  return children;
};

export default Guard;
