import { api } from './api';
import { setTokens } from '../../utils/localstorage-utils';
import { LOGIN_PATH, PASSWORD_CHANGE_PATH, PASSWORD_RESET_PATH, REGISTER_PATH, USER_PATH } from '../../utils/api';

export const userApi = api.injectEndpoints({
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
      }),
    }),
    updateUser: builder.mutation({
      query: (user) => ({
        url: USER_PATH,
        method: 'PATCH',
        body: user,
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
  useUpdateUserMutation,
} = userApi;
