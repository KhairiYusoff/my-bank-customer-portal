import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  GetCategoriesResponse,
  GetPaymentMethodsResponse,
  CreateExpenseRequest,
  CreateExpenseResponse,
} from '../types/expense';

export const expensesApi = createApi({
  reducerPath: 'expensesApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Expenses', 'Categories', 'PaymentMethods'],
  endpoints: (builder) => ({
    getCategories: builder.query<GetCategoriesResponse, void>({
      query: () => '/expenses/categories',
      providesTags: ['Categories'],
    }),
    getPaymentMethods: builder.query<GetPaymentMethodsResponse, void>({
      query: () => '/expenses/payment-methods',
      providesTags: ['PaymentMethods'],
    }),
    createExpense: builder.mutation<CreateExpenseResponse, CreateExpenseRequest>({
      query: (expenseData) => ({
        url: '/expenses',
        method: 'POST',
        body: expenseData,
      }),
      invalidatesTags: ['Expenses'],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetPaymentMethodsQuery,
  useCreateExpenseMutation,
} = expensesApi;
