import { createSlice } from '@reduxjs/toolkit';

const initialState = null;

export const ingredientDetailsSlice = createSlice({
  name: 'ingredientDetails',
  initialState,
  reducers: {
    openIngredientDetails: (state, action) => action.payload,
    closeIngredientDetails: () => initialState,
  },
  selectors: {
    ingredientDetailsSelector: (state) => state,
  }
});

export const {
  openIngredientDetails,
  closeIngredientDetails
} = ingredientDetailsSlice.actions;

export const {
  ingredientDetailsSelector,
} = ingredientDetailsSlice.selectors;
