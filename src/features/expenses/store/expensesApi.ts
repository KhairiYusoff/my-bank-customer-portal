import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  GetCategoriesResponse,
  GetPaymentMethodsResponse,
  CreateExpenseRequest,
  CreateExpenseResponse,
  Expense,
  ExpenseFilters,
  GetSingleExpenseResponse,
  GetExpensesResponse,
  UpdateExpenseRequest,
  UpdateExpenseResponse,
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
    getExpenses: builder.query<GetExpensesResponse, ExpenseFilters>({
      query: (filters) => ({
        url: '/expenses',
        params: filters,
      }),
      providesTags: ['Expenses'],
    }),
    getExpenseById: builder.query<GetSingleExpenseResponse, string>({
      query: (id) => `/expenses/${id}`,
      providesTags: ['Expenses'],
    }),
    updateExpense: builder.mutation<UpdateExpenseResponse, { id: string; data: UpdateExpenseRequest }>({
      query: ({ id, data }) => ({
        url: `/expenses/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Expenses'],
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
  useGetExpensesQuery,
  useGetExpenseByIdQuery,
  useUpdateExpenseMutation,
  useCreateExpenseMutation,
} = expensesApi;
