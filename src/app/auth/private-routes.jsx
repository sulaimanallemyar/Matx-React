import React from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import useAuth from 'app/hooks/useAuth';

export const checkAuthorities = (authorities = [], hasAuthorties = []) => {
  if (authorities?.length) {
    if (hasAuthorties?.length === 0) {
      return true;
    }

    return hasAuthorties.some((auth) => authorities.includes(auth));
  }
  return false;
};

export const PrivateRoute = ({ children, hasAuthorities }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const isAuthenticated = user?.id ? true : false;
  if (isAuthenticated) {
    if (children) {
      const authorities = user.authorities ?? [];

      const permission = checkAuthorities(authorities, hasAuthorities);

      if (permission) return children;
      return (
        <div>
          You do not have access this page{' '}
          <button
            onClick={() => {
              navigate('/');
            }}
          >
            Go To Home
          </button>
        </div>
      );
    }
    return <Outlet />;
  }
  return <Navigate to="/session/signin" />;
};
