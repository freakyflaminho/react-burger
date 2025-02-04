import { combineSlices } from '@reduxjs/toolkit';
import { api } from './api/api';
import { authSlice } from './slices/auth-slice';
import { burgerConstructorSlice } from './slices/burger-constructor-slice';
import { wsApi } from './api/websocket/ws-api.ts';

export const rootReducer = combineSlices(
  api,
  wsApi,
  authSlice,
  burgerConstructorSlice,
);
