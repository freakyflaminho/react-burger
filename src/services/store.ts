import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './root-reducer';
import { customMiddlewares } from './custom-middleware';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(customMiddlewares),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
