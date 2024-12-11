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
      prepare: (id) => {
        const posId = nanoid();
        return { payload: { id, posId } };
      }
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
