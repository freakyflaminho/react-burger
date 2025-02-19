import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { isAccessTokenExists, isRefreshTokenExists } from '../../utils/localstorage-utils';

export const initialState = {
  isAuth: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    checkAuth: {
      prepare: () => ({
        payload: isAccessTokenExists() || isRefreshTokenExists(),
      }),
      reducer: (state, action: PayloadAction<boolean>) => {
        state.isAuth = action.payload;
      },
    },
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
  },
  selectors: {
    isAuth: (state) => state.isAuth,
  },
});

export const {
  checkAuth,
  setAuth,
} = authSlice.actions;

export const {
  isAuth,
} = authSlice.selectors;

export default authSlice.reducer;
