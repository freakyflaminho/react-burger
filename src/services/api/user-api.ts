import { api } from './api';
import {
  LOGIN_PATH,
  LOGOUT_PATH,
  PASSWORD_CHANGE_PATH,
  PASSWORD_RESET_PATH,
  REGISTER_PATH,
  USER_PATH,
} from '../../utils/api';
import { setAuth } from '../slices/auth-slice';
import { getRefreshToken, removeTokens } from '../../utils/localstorage-utils';
import {
  ChangePasswordRequest,
  ChangePasswordResponse,
  GetUserResponse,
  LoginRequest,
  LoginResponse,
  LogoutResponse,
  RegisterRequest,
  RegisterResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
  UpdateUserRequest,
  UpdateUserResponse,
} from '../../utils/api-types.ts';

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: LOGIN_PATH,
        method: 'POST',
        body: credentials,
      }),
    }),
    logout: builder.mutation<LogoutResponse, void>({
      query: () => ({
        url: LOGOUT_PATH,
        method: 'POST',
        body: { token: getRefreshToken() },
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        dispatch(setAuth({ isAuth: false }));
        await queryFulfilled.finally(() => {
          removeTokens();
        });
      },
    }),
    register: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (user) => ({
        url: REGISTER_PATH,
        method: 'POST',
        body: user,
      }),
    }),
    getUser: builder.query<GetUserResponse, void>({
      query: () => ({
        url: USER_PATH,
      }),
    }),
    updateUser: builder.mutation<UpdateUserResponse, UpdateUserRequest>({
      query: (user) => ({
        url: USER_PATH,
        method: 'PATCH',
        body: user,
      }),
    }),
    resetPassword: builder.mutation<ResetPasswordResponse, ResetPasswordRequest>({
      query: (email) => ({
        url: PASSWORD_RESET_PATH,
        method: 'POST',
        body: email,
      }),
    }),
    changePassword: builder.mutation<ChangePasswordResponse, ChangePasswordRequest>({
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
  useLogoutMutation,
  useRegisterMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
  useGetUserQuery,
  useUpdateUserMutation,
} = userApi;
