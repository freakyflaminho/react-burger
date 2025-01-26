import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router';

import { isAuth } from '../../services/slices/auth-slice';

type Props = {
  forAuth: boolean;
  children: React.ReactNode;
}

const ProtectedRouteElement = ({ forAuth, children }: Props) => {
  const location = useLocation();
  const isUserAuth = useSelector(isAuth);

  if (!forAuth && isUserAuth) {
    return <Navigate to={location.state?.from || '/'} replace />;
  } else if (forAuth && !isUserAuth) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
};

export default ProtectedRouteElement;
