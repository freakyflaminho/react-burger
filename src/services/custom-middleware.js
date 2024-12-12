import { burgerIngredientsApi } from './burger-ingredients';
import { orderApi } from './order';

export const customMiddlewares = [
  burgerIngredientsApi.middleware,
  orderApi.middleware,
];
