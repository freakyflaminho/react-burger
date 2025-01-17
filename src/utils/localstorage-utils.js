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
