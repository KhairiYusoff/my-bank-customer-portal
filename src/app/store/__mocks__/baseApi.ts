import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Jest-compatible mock of baseApi — avoids import.meta.env (Vite-only syntax)
export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost' }),
  tagTypes: [
    'Auth',
    'Account',
    'AccountBalance',
    'Transaction',
    'User',
    'Notification',
    'Expenses',
    'Categories',
    'PaymentMethods',
  ],
  endpoints: () => ({}),
});

export const { middleware, reducerPath, reducer } = baseApi;
