import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { AccountsResponse } from '../types/account';

export const accountsApi = createApi({
  reducerPath: 'accountsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }), // Adjust as needed
  endpoints: (builder) => ({
    getAccounts: builder.query<AccountsResponse, void>({
      query: () => '/accounts',
    }),
  }),
});

export const { useGetAccountsQuery } = accountsApi;
