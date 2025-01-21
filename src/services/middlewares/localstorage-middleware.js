import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import { api } from '../api/api';
import { setTokens } from '../../utils/localstorage-utils';

const localstorageMiddleware = createListenerMiddleware();

localstorageMiddleware.startListening({
  matcher: isAnyOf(
    api.endpoints.login.matchFulfilled,
    api.endpoints.register.matchFulfilled,
  ),
  effect: (action, api) => {
    const { accessToken, refreshToken } = action.payload;
    setTokens(accessToken, refreshToken);
    api.dispatch({ type: 'auth/checkAuth', payload: { isAuth: true } });
  },
});

export default localstorageMiddleware;
