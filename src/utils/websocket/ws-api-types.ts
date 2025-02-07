import { Order, ResponseResult } from '../api-types';

export type WSOrder = Omit<Order, 'owner'>;

export type WSAllOrdersResponse = ResponseResult & {
  orders: WSOrder[];
  total: number;
  totalToday: number;
};
