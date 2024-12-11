import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  bun: null,
  ingredients: []
};

export const burgerConstructorSlice = createSlice({
  name: 'selectedIngredients',
  initialState,
  reducers: {
    addBun: (state, action) => {
      state.bun = action.payload;
    },
    addIngredient: (state, action) => {
      state.ingredients.push(action.payload);
    },
  },
  selectors: {
    selectedIngredientsSelector: (state) => state,
  },
});

export const {
  addBun,
  addIngredient,
} = burgerConstructorSlice.actions;

export const {
  selectedIngredientsSelector,
} = burgerConstructorSlice.selectors;
