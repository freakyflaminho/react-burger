import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL, ORDER_PATH } from '../utils/api';

const initialState = null;

export const orderApi = createApi({
  reducerPath: 'order',
  initialState,
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
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

export const { useCreateOrderMutation, useCloseOrderQuery } = orderApi;
