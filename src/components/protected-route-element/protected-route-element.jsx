import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router';

import PropTypes from 'prop-types';

import { isAuth } from '../../services/slices/auth-slice';

const ProtectedRouteElement = ({ forAuth, children }) => {
  const location = useLocation();
  const isUserAuth = useSelector(isAuth);

  if (!forAuth && isUserAuth) {
    return <Navigate to={location.state?.from || '/'} replace />;
  } else if (forAuth && !isUserAuth) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
};

ProtectedRouteElement.propTypes = {
  forAuth: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

export default ProtectedRouteElement;
