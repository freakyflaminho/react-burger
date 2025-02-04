import { wsApi } from './ws-api.ts';
import { getAccessTokenWithoutBearer, isRefreshTokenExists, removeTokens } from '../../../utils/localstorage-utils.ts';
import { userApi } from '../user-api.ts';
import { openWebSocket } from '../../../utils/websocket/websocket.ts';
import { WS_ALL_ORDERS_PATH, WS_BASE_URL, WS_USER_ORDERS_PATH } from '../../../utils/websocket/websocket-api.ts';

export const wsOrdersApi = wsApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrders: builder.query<[], void>({
      queryFn: () => ({
        data: [],
      }),
      async onCacheEntryAdded(_arg, { cacheDataLoaded, updateCachedData, cacheEntryRemoved }) {
        await cacheDataLoaded;
        const url = `${WS_BASE_URL}${WS_ALL_ORDERS_PATH}`;
        const ws = openWebSocket(url);

        const listener = async (event: MessageEvent) => {
          const data = JSON.parse(event.data);
          updateCachedData(() => data);
        };
        ws.addEventListener('message', listener);

        await cacheEntryRemoved;
        ws.close();
      },
      keepUnusedDataFor: 0,
    }),

    getUserOrders: builder.query<[], void>({
      queryFn: () => ({
        data: [],
      }),
      async onCacheEntryAdded(_arg, { cacheDataLoaded, updateCachedData, cacheEntryRemoved, dispatch }) {
        await cacheDataLoaded;
        const url = `${WS_BASE_URL}${WS_USER_ORDERS_PATH}`;
        let ws = openWebSocket(url, getAccessTokenWithoutBearer());

        const listener = async (event: MessageEvent) => {
          const data = JSON.parse(event.data);
          if (data && !data.success && data.message === 'Invalid or missing token') {
            if (!isRefreshTokenExists()) {
              removeTokens();
            } else {
              const { data: { success } = {} } = await dispatch(userApi.endpoints.refreshToken.initiate());
              if (success) {
                ws.close();
                ws = openWebSocket(url, getAccessTokenWithoutBearer());
              }
            }
          }
          updateCachedData(() => data);
        };
        ws.addEventListener('message', listener);

        await cacheEntryRemoved;
        ws.close();
      },
      keepUnusedDataFor: 0,
    }),
  }),
});

export const {
  useGetUserOrdersQuery,
  useGetAllOrdersQuery,
} = wsOrdersApi;
