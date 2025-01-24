import { createSlice } from '@reduxjs/toolkit';
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
    setAuth: {
      reducer: (state, action) => {
        state.isAuth = action.payload.isAuth;
      }
    },
  },
  selectors: {
    isAuth: (state) => state.isAuth,
  },
});

export const {
  checkAuth,
  setAuth
} = authSlice.actions;

export const {
  isAuth,
} = authSlice.selectors;
