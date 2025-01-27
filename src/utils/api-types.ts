import { Ingredient } from './types.ts';

export type ResponseResult = {
  success: boolean;
};

export type TokenPair = {
  accessToken: string;
  refreshToken: string;
}

export type RefreshResponse = ResponseResult & TokenPair;

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

export type UserCredentials = {
  email: string;
  password: string;
};

export type UserData = {
  user: {
    email: string;
    name: string;
  };
};

export type GetUserResponse = ResponseResult & UserData;

export type LoginRequest = UserCredentials;

export type LoginResponse = ResponseResult & TokenPair & UserData;

export type LogoutResponse = ResponseResult;

export type RegisterRequest = UserCredentials & {
  name: string;
};

export type RegisterResponse = ResponseResult & TokenPair & UserData;

export type UpdateUserRequest = UserCredentials & {
  name: string;
};

export type UpdateUserResponse = ResponseResult & UserData;

export type ResetPasswordRequest = {
  email: string;
};

export type ResetPasswordResponse = ResponseResult;

export type ChangePasswordRequest = {
  password: string;
  token: string;
};

export type ChangePasswordResponse = ResponseResult;
