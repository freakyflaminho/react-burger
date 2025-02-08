import { createListenerMiddleware, isAnyOf, PayloadAction } from '@reduxjs/toolkit';
import { userApi } from '../api/user-api';
import { checkAuth } from '../slices/auth-slice.ts';
import { setTokens } from '../../utils/localstorage-utils';
import { TokenPair } from '../../utils/api-types';

const localstorageMiddleware = createListenerMiddleware();

localstorageMiddleware.startListening({
  matcher: isAnyOf(
    userApi.endpoints.login.matchFulfilled,
    userApi.endpoints.register.matchFulfilled,
  ),
  effect: (action: PayloadAction<TokenPair>, api) => {
    const { accessToken, refreshToken } = action.payload;
    setTokens(accessToken, refreshToken);
    api.dispatch(checkAuth());
  },
});

export default localstorageMiddleware;
