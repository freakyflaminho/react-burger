import PropTypes from 'prop-types';
import Loader from '../components/loader/loader';
import ErrorMessage from '../components/error-message/error-message';

const withDataLoading = useGetDataQuery => WrappedComponent => props => {

  const { data: { success } = {}, isLoading, isFetching, isError, refetch } = useGetDataQuery();
  return (
    isLoading || isFetching ? <Loader /> :
      isError || !success ? <ErrorMessage onRetry={refetch} /> :
        <WrappedComponent {...props} />
  );
};

withDataLoading.propTypes = {
  getData: PropTypes.func.isRequired,
  WrappedComponent: PropTypes.func.isRequired,
};

export default withDataLoading;
