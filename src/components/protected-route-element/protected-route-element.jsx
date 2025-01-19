import { Navigate } from 'react-router';

const ProtectedRouteElement = ({ forAuth, isAuth, children }) => {

  if (!forAuth && isAuth) {
    return <Navigate to="/" replace />;
  } else if (forAuth && !isAuth) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRouteElement;
