import { ResponseResult } from '../api-types';

export type WSOrder = {
  createdAt: string;
  ingredients: string[];
  name: string;
  number: number;
  status: string;
  updated_at: string;
  _id: string;
}

export type WSAllOrdersResponse = ResponseResult & {
  orders: WSOrder[];
  success: boolean;
  total: number;
  totalToday: number;
};
