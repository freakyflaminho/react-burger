import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const wsApi = createApi({
  reducerPath: 'wsApi',
  baseQuery: fetchBaseQuery(),
  endpoints: () => ({}),
});
