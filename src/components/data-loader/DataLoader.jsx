import PropTypes from 'prop-types';
import Loader from '../loader/loader';
import ErrorMessage from '../error-message/error-message';

const DataLoader = ({ data, onRetry, children }) => {

  const {
    data: { success } = {},
    isLoading,
    isFetching,
    isError,
  } = data;

  return (
    isLoading || isFetching ? <Loader /> :
      isError || !success ? <ErrorMessage onRetry={onRetry} /> :
        children
  );
};

DataLoader.propTypes = {
  data: PropTypes.shape({
    data: PropTypes.shape({
      success: PropTypes.bool.isRequired,
    }),
    isLoading: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool,
    isError: PropTypes.bool.isRequired,
  }),
  onRetry: PropTypes.func,
};

export default DataLoader;
