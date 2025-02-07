import { INGREDIENT_TYPE, ORDER_STATUS } from './consts.ts';

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

export type IngredientWithCount = Ingredient & {
  count: number;
}

export type SelectedIngredient = Ingredient & {
  posId: string;
}

export type SelectedIngredientId = {
  id: string | null;
  posId?: string;
};

export type SelectedIngredientIds = {
  bun: string | null;
  ingredients: SelectedIngredientId[];
};

export type ObjectMap<T> = {
  [key: string]: T;
};

export type IngredientType = keyof typeof INGREDIENT_TYPE;

export type OrderStatusType = keyof typeof ORDER_STATUS;

export type LoadingState = {
  data: {
    success: boolean;
  };
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
};

export type DroppedIngredient = {
  id: string;
  type: string;
};
