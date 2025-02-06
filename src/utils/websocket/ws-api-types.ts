import { Order, ResponseResult } from '../api-types';
import { ORDER_STATUS } from '../consts.ts';

export type OrderStatusType = keyof typeof ORDER_STATUS;

export type WSOrder = Omit<Order, 'owner'>;

export type WSAllOrdersResponse = ResponseResult & {
  orders: WSOrder[];
  success: boolean;
  total: number;
  totalToday: number;
};
