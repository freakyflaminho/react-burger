import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL, INGREDIENTS_PATH } from '../utils/api';

export const burgerIngredientsApi = createApi({
  reducerPath: 'ingredients',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL
  }),
  endpoints: (builder) => ({
    getIngredients: builder.query({
      query: () => INGREDIENTS_PATH,
    }),
  }),
});

export const { useGetIngredientsQuery } = burgerIngredientsApi;
export const useGetIngredientsState = burgerIngredientsApi.endpoints.getIngredients.useQueryState;
