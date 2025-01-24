export function getAccessToken() {
  return localStorage.getItem('accessToken');
}

export function setAccessToken(accessToken) {
  localStorage.setItem('accessToken', accessToken);
}

export function getRefreshToken() {
  return localStorage.getItem('refreshToken');
}

export function setRefreshToken(refreshToken) {
  localStorage.setItem('refreshToken', refreshToken);
}

export function setTokens(accessToken, refreshToken) {
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
