import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { userApi } from '../api/user-api';
import { isAccessTokenExists, isRefreshTokenExists } from '../../utils/localstorage-utils';

const initialState = {
  isAuth: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    checkAuth: {
      prepare: () => ({
        payload: {
          isAuth: isAccessTokenExists() || isRefreshTokenExists(),
        }
      }),
      reducer: (state, action) => {
        state.isAuth = action.payload.isAuth;
      },
    },
  },
  selectors: {
    isAuth: (state) => state.isAuth,
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      isAnyOf(
        userApi.endpoints.login.matchFulfilled,
        userApi.endpoints.register.matchFulfilled,
      ),
      (state) => {
        state.isAuth = true;
      },
    );
  },
});

export const {
  checkAuth,
} = authSlice.actions;

export const {
  isAuth,
} = authSlice.selectors;
