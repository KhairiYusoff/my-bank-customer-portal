import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  GetCategoriesResponse,
  GetPaymentMethodsResponse,
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
  }),
});

export const {
  useGetCategoriesQuery,
  useGetPaymentMethodsQuery,
} = expensesApi;
