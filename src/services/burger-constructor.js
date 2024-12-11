import { createSlice, nanoid } from '@reduxjs/toolkit';

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
    addIngredient: {
      reducer: (state, action) => {
        state.ingredients.push(action.payload);
      },
      prepare: (id) => ({
        payload: { id, posId: nanoid() }
      }),
    },
    changeIngredientPosition: {
      reducer: (state, action) => {
        state.ingredients.splice(
          action.payload.next,
          0,
          state.ingredients.splice(action.payload.prev, 1)[0]);
      },
      prepare: (prev, next) => ({
        payload: { prev, next }
      }),
    },
  },
  selectors: {
    selectedIngredientsSelector: (state) => state,
  },
});

export const {
  addBun,
  addIngredient,
  changeIngredientPosition,
} = burgerConstructorSlice.actions;

export const {
  selectedIngredientsSelector,
} = burgerConstructorSlice.selectors;
