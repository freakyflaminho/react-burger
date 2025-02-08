import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
  QueryReturnValue,
} from '@reduxjs/toolkit/query/react';
import { checkAuth } from '../slices/auth-slice.ts';
import { BASE_URL, REFRESH_TOKEN_PATH } from '../../utils/api';
import {
  getAccessToken,
  getRefreshToken,
  isRefreshTokenExists,
  removeTokens,
  setTokens,
} from '../../utils/localstorage-utils';
import { RefreshResponse } from '../../utils/api-types.ts';

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    const accessToken = getAccessToken();
    if (accessToken) {
      headers.set('Authorization', accessToken);
    }
    return headers;
  },
});

const getRefreshParams = () => ({
  url: REFRESH_TOKEN_PATH,
  method: 'POST',
  body: {
    'token': getRefreshToken(),
  },
});

const baseQueryWithReauth: BaseQueryFn<FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && [401, 403].some(errorCode => errorCode === result.error?.status)) {
    if (!isRefreshTokenExists()) {
      removeTokens();
      api.dispatch(checkAuth());
    } else {
      const refreshResult = await baseQuery(getRefreshParams(), api, extraOptions) as QueryReturnValue<RefreshResponse>;
      if (refreshResult.data && refreshResult.data.success) {
        const { accessToken, refreshToken } = refreshResult.data;
        setTokens(accessToken, refreshToken);
        result = await baseQuery(args, api, extraOptions);
      } else {
        removeTokens();
        api.dispatch(checkAuth());
      }
    }
  }
  return result;
};

export const api = createApi({
  baseQuery: baseQueryWithReauth,
  refetchOnMountOrArgChange: true,
  endpoints: () => ({}),
});
