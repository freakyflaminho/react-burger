import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  bun: null,
  ingredients: []
};

export const burgerConstructorSlice = createSlice({
  name: 'selectedIngredients',
  initialState,
  reducers: {},
});
