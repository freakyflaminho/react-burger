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

export type CreateOrderResponse = ResponseResult & {
  name: string;
  order: {
    ingredients: Ingredient[];
    _id: string;
    owner: {
      name: string;
      email: string;
      createdAt: string;
      updatedAt: string;
    };
    status: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    number: number;
    price: number;
  };
};
