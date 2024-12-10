import { configureStore } from '@reduxjs/toolkit';
import { burgerIngredientsApi } from './burger-ingredients';
import { burgerConstructorSlice } from './burger-constructor';
import { ingredientDetailsSlice } from './ingredient-details';

export default configureStore({
  reducer: {
    [burgerIngredientsApi.reducerPath]: burgerIngredientsApi.reducer,
    [burgerConstructorSlice.reducerPath]: burgerConstructorSlice.reducer,
    [ingredientDetailsSlice.reducerPath]: ingredientDetailsSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(burgerIngredientsApi.middleware),
});
