import PropTypes from 'prop-types';
import Loader from '../components/loader/loader';
import ErrorMessage from '../components/error-message/error-message';

const withDataLoading = useGetDataQuery => WrappedComponent => props => {

  const { data: response = {}, isLoading, isFetching, isError, refetch } = useGetDataQuery();
  const { success, ...data } = response;

  return (
    isLoading || isFetching ? <Loader /> :
      isError || !success ? <ErrorMessage onRetry={refetch} /> :
        <WrappedComponent {...props} {...data} />
  );
};

withDataLoading.propTypes = {
  getData: PropTypes.func.isRequired,
  WrappedComponent: PropTypes.func.isRequired,
};

export default withDataLoading;
