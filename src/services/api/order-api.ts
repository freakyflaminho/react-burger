import { api } from './api';
import { ORDER_PATH } from '../../utils/api';
import { CreateOrderResponse } from '../../utils/api-types.ts';

export const orderApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation<CreateOrderResponse, string[]>({
      query: (ingredients) => ({
        url: ORDER_PATH,
        method: 'POST',
        body: { ingredients },
      }),
    }),
  }),
});

export const { useCreateOrderMutation } = orderApi;
