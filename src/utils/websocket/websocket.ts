export const openWebSocket = (url: string, accessToken?: string) => {
  let wsUrl = url;
  if (accessToken) {
    wsUrl = `${wsUrl}?token=${accessToken}`;
  }

  return new WebSocket(wsUrl);
};
