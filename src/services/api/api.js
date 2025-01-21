import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL, REFRESH_TOKEN_PATH } from '../../utils/api';
import {
  getAccessToken,
  getRefreshToken,
  isAccessTokenExists,
  isRefreshTokenExists,
  removeTokens,
  setTokens
} from '../../utils/localstorage-utils';

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    if (isAccessTokenExists()) {
      headers.set('Authorization', getAccessToken());
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

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && [401, 403].some(errorCode => errorCode === result.error.status)) {
    if (!isRefreshTokenExists()) {
      removeTokens();
    } else {
      const refreshResult = await baseQuery(getRefreshParams(), api, extraOptions);
      if (refreshResult.data && refreshResult.data.success) {
        const { accessToken, refreshToken } = refreshResult.data;
        setTokens(accessToken, refreshToken);
        result = await baseQuery(args, api, extraOptions);
      } else {
        removeTokens();
      }
    }
  }
  return result;
};

export const api = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});