import { baseApi } from '@/app/store/baseApi';
import type { 
  TransferRequest, 
  TransferResponse, 
  TransactionHistoryParams, 
  TransactionHistoryResponse 
} from '../types/transfer';

export const transactionsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    transfer: builder.mutation<TransferResponse, TransferRequest>({
      query: (body) => ({
        url: '/transactions/transfer',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Transaction'],
    }),
    getAccountTransactions: builder.query<TransactionHistoryResponse, TransactionHistoryParams>({
      query: ({ accountNumber, page = 1, limit = 10 }) => 
        `/transactions/account/${accountNumber}?page=${page}&limit=${limit}`,
      providesTags: (result, error, { accountNumber }) => [
        { type: 'Transaction', id: accountNumber },
        'Transaction'
      ],
    }),
  }),
});

export const { 
  useTransferMutation,
  useGetAccountTransactionsQuery 
} = transactionsApi;
