import { combineSlices } from '@reduxjs/toolkit';
import { api } from './api/api';
import { authSlice } from './slices/auth-slice';
import { burgerConstructorSlice } from './slices/burger-constructor-slice';

export const rootReducer = combineSlices(
  api,
  authSlice,
  burgerConstructorSlice,
);
