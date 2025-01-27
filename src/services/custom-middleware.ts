import { api } from './api/api';
import localstorageMiddleware from './middlewares/localstorage-middleware';

export const customMiddlewares = [
  api.middleware,
  localstorageMiddleware.middleware,
];
