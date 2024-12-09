import { configureStore } from '@reduxjs/toolkit';
import { burgerIngredientsApi } from './burger-ingredients';
import { burgerConstructorSlice } from './burger-constructor';

export default configureStore({
  reducer: {
    [burgerIngredientsApi.reducerPath]: burgerIngredientsApi.reducer,
    [burgerConstructorSlice.reducerPath]: burgerConstructorSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(burgerIngredientsApi.middleware),
});
