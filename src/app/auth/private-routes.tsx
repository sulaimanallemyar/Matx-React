import React from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useUser } from '../../app/contexts/JWTAuthContext';
import { routes } from '../navigations';

export const checkAuthorities = (
  authorities: Array<string> = [],
  hasAuthorties: Array<string> = []
) => {
  if (authorities?.length) {
    if (hasAuthorties?.length === 0) {
      return true;
    }

    return hasAuthorties.some((auth) => authorities.includes(auth));
  }
  return false;
};

export const PrivateRoute = ({
  children,
  hasAuthorities
}: {
  children?: any;
  hasAuthorities?: Array<string>;
}) => {
  const navigate = useNavigate();
  const { user } = useUser();
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
  return <Navigate to={routes.session.signin} />;
};
