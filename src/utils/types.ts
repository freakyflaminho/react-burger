import { INGREDIENT_TYPE } from './consts.ts';

export type Ingredient = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
};

export type SelectedIngredient = {
  id: string;
};

export type SelectedIngredients = {
  bun: string;
  ingredients: SelectedIngredient[];
};

export type ObjectMap<T> = {
  [key: string]: T;
};

export type IngredientType = keyof typeof INGREDIENT_TYPE;

