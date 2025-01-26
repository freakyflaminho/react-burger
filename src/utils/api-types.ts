export type ResponseResult = {
  success: boolean;
};

export type RefreshResponse = ResponseResult & {
  accessToken: string;
  refreshToken: string;
};
