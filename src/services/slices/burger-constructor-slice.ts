import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { SelectedIngredientId, SelectedIngredientIds } from '../../utils/types.ts';

const initialState: SelectedIngredientIds = {
  bun: null,
  ingredients: [],
};

export const burgerConstructorSlice = createSlice({
  name: 'selectedIngredients',
  initialState,
  reducers: {
    addBun: (state, action: PayloadAction<string>) => {
      state.bun = action.payload;
    },
    addIngredient: {
      reducer: (state, action: PayloadAction<SelectedIngredientId>) => {
        state.ingredients.push(action.payload);
      },
      prepare: (id: string) => ({
        payload: { id, posId: nanoid() },
      }),
    },
    removeIngredient: (state, action: PayloadAction<number>) => {
      state.ingredients.splice(action.payload, 1);
    },
    changeIngredientPosition: {
      reducer: (state, action: PayloadAction<{ next: number; prev: number }>) => {
        state.ingredients.splice(
          action.payload.next,
          0,
          state.ingredients.splice(action.payload.prev, 1)[0]);
      },
      prepare: (prev: number, next: number) => ({
        payload: { prev, next },
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
  removeIngredient,
  changeIngredientPosition,
} = burgerConstructorSlice.actions;

export const {
  selectedIngredientsSelector,
} = burgerConstructorSlice.selectors;
