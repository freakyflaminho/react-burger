import { api } from './api/api';
import localstorageMiddleware from './middlewares/localstorage-middleware';
import { wsApi } from './api/websocket/ws-api.ts';

export const customMiddlewares = [
  api.middleware,
  wsApi.middleware,
  localstorageMiddleware.middleware,
];
