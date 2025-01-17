import { Navigate } from 'react-router';

import PropTypes from 'prop-types';
import Loader from '../components/loader/loader';

import { useGetUserQuery } from '../services/api/auth';

const withAuthRedirect = WrappedComponent => props => {
  const {
    data,
    isLoading,
    isFetching,
    isError,
  } = useGetUserQuery();

  return (
    isLoading || isFetching ? <Loader /> :
      isError || !data?.success ? <WrappedComponent {...props} /> :
        <Navigate to="/" />
  );
};

withAuthRedirect.propTypes = {
  WrappedComponent: PropTypes.func.isRequired,
};

export default withAuthRedirect;
