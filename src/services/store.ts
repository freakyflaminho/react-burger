import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './root-reducer';
import { customMiddlewares } from './custom-middleware';

export default configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(customMiddlewares),
});
