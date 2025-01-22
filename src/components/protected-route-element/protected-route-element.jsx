import { Navigate, useLocation } from 'react-router';

const ProtectedRouteElement = ({ forAuth, isAuth, children }) => {

  const location = useLocation();

  if (!forAuth && isAuth) {
    return <Navigate to={location.state?.from || '/'} replace />;
  } else if (forAuth && !isAuth) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
};

export default ProtectedRouteElement;
