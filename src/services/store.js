import { configureStore } from '@reduxjs/toolkit';
import { burgerIngredientsApi } from './burger-ingredients';

export default configureStore({
  reducer: {
    [burgerIngredientsApi.reducerPath]: burgerIngredientsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(burgerIngredientsApi.middleware),
});
