import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { TransferRequest, TransferResponse } from '../types/transfer';

export const transactionsApi = createApi({
  reducerPath: 'transactionsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }), // Adjust baseUrl as needed
  endpoints: (builder) => ({
    transfer: builder.mutation<TransferResponse, TransferRequest>({
      query: (body) => ({
        url: '/transactions/transfer',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useTransferMutation } = transactionsApi;
