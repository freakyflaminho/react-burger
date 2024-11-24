import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Loader from '../components/loader/loader';
import ErrorMessage from '../components/error-message/error-message';

const withDataLoading = getData => WrappedComponent => props => {

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const loadData = () => {
    setIsLoading(true);
    getData()
      .then(data => {
        setData(data);
        setIsError(false);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        setIsError(true);
        setIsLoading(false);
      });
  };

  useEffect(loadData, []);

  return (
    isLoading ? <Loader /> :
      isError ? <ErrorMessage onClick={loadData} /> :
        <WrappedComponent {...props} data={data} />
  );
};

withDataLoading.propTypes = {
  getData: PropTypes.func.isRequired,
  WrappedComponent: PropTypes.func.isRequired,
};

export default withDataLoading;
