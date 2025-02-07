import React from 'react';
import Loader from '../loader/loader';
import ErrorMessage from '../error-message/error-message';
import { BaseQueryFn, FetchArgs, TypedUseQueryHookResult } from '@reduxjs/toolkit/query/react';
import { ResponseResult } from '../../utils/api-types.ts';

type Props = {
  data: TypedUseQueryHookResult<ResponseResult, FetchArgs, BaseQueryFn>;
  onRetry: () => void;
  children: React.ReactNode;
};

const DataLoader = ({ data, onRetry, children }: Props) => {

  const {
    data: { success, message } = {},
    isLoading,
    isFetching,
    isError,
  } = data;

  return (
    isError || (!success && message) ? <ErrorMessage onRetry={onRetry} /> :
      isLoading || isFetching || (!success && !message) ? <Loader /> :
        children
  );
};

export default DataLoader;
