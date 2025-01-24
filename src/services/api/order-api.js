import { api } from './api';
import { ORDER_PATH } from '../../utils/api';

export const orderApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (ingredients) => ({
        url: ORDER_PATH,
        method: 'POST',
        body: { ingredients },
      }),
    }),
  }),
});

export const { useCreateOrderMutation } = orderApi;
