export function getAccessToken() {
  return localStorage.getItem('accessToken');
}

export function getAccessTokenWithoutBearer() {
  return getAccessToken()?.split('Bearer ')[1];
}

export function setAccessToken(accessToken: string) {
  localStorage.setItem('accessToken', accessToken);
}

export function getRefreshToken() {
  return localStorage.getItem('refreshToken');
}

export function setRefreshToken(refreshToken: string) {
  localStorage.setItem('refreshToken', refreshToken);
}

export function setTokens(accessToken: string, refreshToken: string) {
  setAccessToken(accessToken);
  setRefreshToken(refreshToken);
}

export function removeTokens() {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
}

export function isAccessTokenExists() {
  return !!getAccessToken();
}

export function isRefreshTokenExists() {
  return !!getRefreshToken();
}
