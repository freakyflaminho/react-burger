import { combineSlices } from '@reduxjs/toolkit';
import { burgerIngredientsApi } from './burger-ingredients';
import { burgerConstructorSlice } from './burger-constructor';
import { ingredientDetailsSlice } from './ingredient-details';

export const rootReducer = combineSlices(
  burgerIngredientsApi,
  burgerConstructorSlice,
  ingredientDetailsSlice,
);
