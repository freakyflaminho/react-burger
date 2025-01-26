import { Ingredient } from './types.ts';

export type ResponseResult = {
  success: boolean;
};

export type RefreshResponse = ResponseResult & {
  accessToken: string;
  refreshToken: string;
};

export type GetIngredientsResponse = ResponseResult & {
  data: Ingredient[];
};
