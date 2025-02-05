import { ResponseResult } from '../api-types';
import { ORDER_STATUS } from '../consts.ts';

export type OrderStatusType = keyof typeof ORDER_STATUS;

export type WSOrder = {
  createdAt: string;
  ingredients: string[];
  name: string;
  number: number;
  status: OrderStatusType;
  updated_at: string;
  _id: string;
}

export type WSAllOrdersResponse = ResponseResult & {
  orders: WSOrder[];
  success: boolean;
  total: number;
  totalToday: number;
};
