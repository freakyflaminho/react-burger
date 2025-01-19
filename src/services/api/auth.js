import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getAccessToken, setTokens } from '../../utils/localstorage-utils';

import {
  BASE_URL,
  LOGIN_PATH,
  PASSWORD_CHANGE_PATH,
  PASSWORD_RESET_PATH,
  REGISTER_PATH,
  USER_PATH
} from '../../utils/api';

const initialState = null;

export const authApi = createApi({
  reducerPath: 'authApi',
  initialState,
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: LOGIN_PATH,
        method: 'POST',
        body: credentials,
      }),
      async onQueryStarted(credentials, { queryFulfilled }) {
        const { data } = await queryFulfilled;
        setTokens(data.accessToken, data.refreshToken);
      },
    }),
    register: builder.mutation({
      query: (user) => ({
        url: REGISTER_PATH,
        method: 'POST',
        body: user,
      }),
      async onQueryStarted(user, { queryFulfilled }) {
        const { data } = await queryFulfilled;
        setTokens(data.accessToken, data.refreshToken);
      },
    }),
    getUser: builder.query({
      query: () => ({
        url: USER_PATH,
        headers: {
          Authorization: getAccessToken(),
        },
      }),
    }),
    resetPassword: builder.mutation({
      query: (email) => ({
        url: PASSWORD_RESET_PATH,
        method: 'POST',
        body: email,
      }),
    }),
    changePassword: builder.mutation({
      query: (passwordChangeData) => ({
        url: PASSWORD_CHANGE_PATH,
        method: 'POST',
        body: passwordChangeData,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
  useGetUserQuery,
} = authApi;
