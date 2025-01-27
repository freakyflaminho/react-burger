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
