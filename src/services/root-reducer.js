import { combineSlices } from '@reduxjs/toolkit';
import { burgerIngredientsApi } from './burger-ingredients';
import { burgerConstructorSlice } from './burger-constructor';
import { ingredientDetailsSlice } from './ingredient-details';
import { orderApi } from './order';
import { authApi } from './api/auth';

export const rootReducer = combineSlices(
  burgerIngredientsApi,
  burgerConstructorSlice,
  ingredientDetailsSlice,
  orderApi,
  authApi,
);
