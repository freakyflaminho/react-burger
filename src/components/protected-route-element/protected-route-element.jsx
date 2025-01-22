import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router';

import { checkAuth, isAuth } from '../../services/slices/auth-slice';

const ProtectedRouteElement = ({ forAuth, children }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const isUserAuth = useSelector(isAuth);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch, checkAuth]);

  if (!forAuth && isUserAuth) {
    return <Navigate to={location.state?.from || '/'} replace />;
  } else if (forAuth && !isUserAuth) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
};

export default ProtectedRouteElement;
