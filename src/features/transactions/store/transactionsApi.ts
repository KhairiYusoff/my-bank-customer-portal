import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { 
  TransferRequest, 
  TransferResponse, 
  TransactionHistoryParams, 
  TransactionHistoryResponse 
} from '../types/transfer';

export const transactionsApi = createApi({
  reducerPath: 'transactionsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Transactions'],
  endpoints: (builder) => ({
    transfer: builder.mutation<TransferResponse, TransferRequest>({
      query: (body) => ({
        url: '/transactions/transfer',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Transactions'],
    }),
    getAccountTransactions: builder.query<TransactionHistoryResponse, TransactionHistoryParams>({
      query: ({ accountNumber, page = 1, limit = 10 }) => 
        `/transactions/account/${accountNumber}?page=${page}&limit=${limit}`,
      providesTags: (result, error, { accountNumber }) => [
        { type: 'Transactions', id: accountNumber },
        'Transactions'
      ],
    }),
  }),
});

export const { 
  useTransferMutation,
  useGetAccountTransactionsQuery 
} = transactionsApi;
