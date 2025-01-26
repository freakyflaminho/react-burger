import React from 'react';
import Loader from '../loader/loader';
import ErrorMessage from '../error-message/error-message';
import { LoadingState } from '../../utils/types.ts';

type Props = {
  data: LoadingState;
  onRetry: () => void;
  children: React.ReactNode;
};

const DataLoader = ({ data, onRetry, children }: Props) => {

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

export default DataLoader;
