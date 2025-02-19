import reducer, { initialState, checkAuth, setAuth } from './auth-slice';
import * as tokenUtils from '../../utils/localstorage-utils';

describe('test auth-slice reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, { type: 'unknown' }))
      .toEqual(initialState);
  });

  it('should change isAuth to true', () => {
    expect(reducer({ isAuth: false }, setAuth(true)))
      .toEqual({ isAuth: true });
  });

  it('should change isAuth to false', () => {
    expect(reducer({ isAuth: true }, setAuth(false)))
      .toEqual({ isAuth: false });
  });

  it('should return true if accessToken exists and refreshToken not exists', () => {
    jest.spyOn(tokenUtils, 'isAccessTokenExists').mockReturnValue(true);
    jest.spyOn(tokenUtils, 'isRefreshTokenExists').mockReturnValue(false);
    expect(reducer(initialState, checkAuth()))
      .toEqual({ isAuth: true });
  });

  it('should return true if accessToken not exists and refreshToken exists', () => {
    jest.spyOn(tokenUtils, 'isAccessTokenExists').mockReturnValue(false);
    jest.spyOn(tokenUtils, 'isRefreshTokenExists').mockReturnValue(true);
    expect(reducer(initialState, checkAuth()))
      .toEqual({ isAuth: true });
  });

  it('should return true if accessToken exists and refreshToken exists', () => {
    jest.spyOn(tokenUtils, 'isAccessTokenExists').mockReturnValue(true);
    jest.spyOn(tokenUtils, 'isRefreshTokenExists').mockReturnValue(true);
    expect(reducer(initialState, checkAuth()))
      .toEqual({ isAuth: true });
  });

  it('should return false if accessToken not exists and refreshToken not exists', () => {
    jest.spyOn(tokenUtils, 'isAccessTokenExists').mockReturnValue(false);
    jest.spyOn(tokenUtils, 'isRefreshTokenExists').mockReturnValue(false);
    expect(reducer(initialState, checkAuth()))
      .toEqual({ isAuth: false });
  });
});
