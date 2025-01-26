import { createListenerMiddleware, isAnyOf, PayloadAction } from '@reduxjs/toolkit';
import { setTokens } from '../../utils/localstorage-utils';
import { TokenPair } from '../../utils/api-types';
import { userApi } from '../api/user-api';

const localstorageMiddleware = createListenerMiddleware();

localstorageMiddleware.startListening({
  matcher: isAnyOf(
    userApi.endpoints.login.matchFulfilled,
    userApi.endpoints.register.matchFulfilled,
  ),
  effect: (action: PayloadAction<TokenPair>, api) => {
    const { accessToken, refreshToken } = action.payload;
    setTokens(accessToken, refreshToken);
    api.dispatch({ type: 'auth/checkAuth', payload: { isAuth: true } });
  },
});

export default localstorageMiddleware;
