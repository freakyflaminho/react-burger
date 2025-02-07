import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router';

import { isAuth } from '../../services/slices/auth-slice';

type Props = {
  forAuth: boolean;
  children: React.ReactNode;
}

const ProtectedRouteElement = ({ forAuth, children }: Props) => {
  const currLocation = useLocation();
  const prevLocation = currLocation.state;
  const isUserAuth = useSelector(isAuth);

  if (!forAuth && isUserAuth) {
    return <Navigate to={prevLocation.pathname || '/'} state={prevLocation.state} replace />;
  } else if (forAuth && !isUserAuth) {
    return <Navigate to="/login" state={prevLocation || currLocation} replace />;
  }
  return children;
};

export default ProtectedRouteElement;
