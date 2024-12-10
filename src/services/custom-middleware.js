import { burgerIngredientsApi } from './burger-ingredients';

export const customMiddlewares = [
  burgerIngredientsApi.middleware,
];
