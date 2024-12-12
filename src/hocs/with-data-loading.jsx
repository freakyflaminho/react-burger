import PropTypes from 'prop-types';
import Loader from '../components/loader/loader';
import ErrorMessage from '../components/error-message/error-message';

const withDataLoading = ({
    data: { success } = {},
    isLoading,
    isFetching,
    isError,
  },
  onRetry
) => WrappedComponent => props => {
  return (
    isLoading || isFetching ? <Loader /> :
      isError || !success ? <ErrorMessage onRetry={onRetry} /> :
        <WrappedComponent {...props} />
  );
};

withDataLoading.propTypes = {
  data: PropTypes.shape({
    success: PropTypes.bool.isRequired,
  }),
  isLoading: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  WrappedComponent: PropTypes.func.isRequired,
  onRetry: PropTypes.func,
};

export default withDataLoading;
