import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { AccountsResponse, AccountBalanceResponse } from '../types/account';

export const accountsApi = createApi({
  reducerPath: 'accountsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }), // Adjust as needed
  endpoints: (builder) => ({
    getAccounts: builder.query<AccountsResponse, void>({
      query: () => '/accounts',
    }),
    getAccountBalance: builder.query<AccountBalanceResponse, string>({
      query: (accountNumber) => `/accounts/balance/${accountNumber}`,
    }),

  }),
});

export const { useGetAccountsQuery, useGetAccountBalanceQuery } = accountsApi;
