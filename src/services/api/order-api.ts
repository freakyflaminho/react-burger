import { api } from './api';
import { ORDER_PATH } from '../../utils/api';
import { CreateOrderResponse, GetOrderResponse } from '../../utils/api-types';

export const orderApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation<CreateOrderResponse, string[]>({
      query: (ingredients) => ({
        url: ORDER_PATH,
        method: 'POST',
        body: { ingredients },
      }),
    }),
    getOrder: builder.query<GetOrderResponse, string>({
      query: (orderNumber) => ({
        url: `${ORDER_PATH}/${orderNumber}`,
      }),
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderQuery,
} = orderApi;
