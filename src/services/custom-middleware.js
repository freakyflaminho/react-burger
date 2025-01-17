import { burgerIngredientsApi } from './burger-ingredients';
import { orderApi } from './order';
import { authApi } from './api/auth';

export const customMiddlewares = [
  burgerIngredientsApi.middleware,
  orderApi.middleware,
  authApi.middleware,
];
