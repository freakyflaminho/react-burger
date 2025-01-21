import { api } from './api';
import { INGREDIENTS_PATH } from '../../utils/api';

export const ingredientsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getIngredients: builder.query({
      query: () => INGREDIENTS_PATH,
    }),
  }),
});

export const { useGetIngredientsQuery } = ingredientsApi;

export const useGetIngredientsState = ingredientsApi.endpoints.getIngredients.useQueryState;
