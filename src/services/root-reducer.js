import { combineSlices } from '@reduxjs/toolkit';
import { authSlice } from './slices/auth-slice';
import { burgerConstructorSlice } from './burger-constructor';
import { ingredientDetailsSlice } from './ingredient-details';
import { authApi } from './api/auth';
import { orderApi } from './order';
import { burgerIngredientsApi } from './burger-ingredients';

export const rootReducer = combineSlices(
  authSlice,
  burgerConstructorSlice,
  ingredientDetailsSlice,
  authApi,
  orderApi,
  burgerIngredientsApi,
);
