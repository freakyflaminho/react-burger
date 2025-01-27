import { api } from './api';
import { INGREDIENTS_PATH } from '../../utils/api';
import { GetIngredientsResponse } from '../../utils/api-types.ts';

export const ingredientsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getIngredients: builder.query<GetIngredientsResponse, void>({
      query: () => ({
        url: INGREDIENTS_PATH,
      }),
    }),
  }),
});

export const { useGetIngredientsQuery } = ingredientsApi;

export const useGetIngredientsState = ingredientsApi.endpoints.getIngredients.useQueryState;
