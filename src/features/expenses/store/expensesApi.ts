import { baseApi } from '@/app/store/baseApi';
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
  DeleteExpenseResponse,
  GetMonthlyAnalyticsResponse,
  GetYearlyAnalyticsResponse,
  GetDashboardStatsResponse,
} from '../types/expense';

export const expensesApi = baseApi.injectEndpoints({
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
    deleteExpense: builder.mutation<DeleteExpenseResponse, string>({
      query: (id) => ({
        url: `/expenses/${id}`,
        method: 'DELETE',
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
    getMonthlyAnalytics: builder.query<GetMonthlyAnalyticsResponse, { year: number; month: number }>({
      query: ({ year, month }) => ({
        url: '/expenses/analytics/monthly',
        params: { year, month },
      }),
      providesTags: ['Expenses'],
    }),
    getYearlyAnalytics: builder.query<GetYearlyAnalyticsResponse, { year: number }>({
      query: ({ year }) => ({
        url: '/expenses/analytics/yearly',
        params: { year },
      }),
      providesTags: ['Expenses'],
    }),
    getDashboardStats: builder.query<GetDashboardStatsResponse, void>({
      query: () => '/expenses/dashboard/stats',
      providesTags: ['Expenses'],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetPaymentMethodsQuery,
  useGetExpensesQuery,
  useGetExpenseByIdQuery,
  useUpdateExpenseMutation,
  useDeleteExpenseMutation,
  useCreateExpenseMutation,
  useGetMonthlyAnalyticsQuery,
  useGetYearlyAnalyticsQuery,
  useGetDashboardStatsQuery,
} = expensesApi;
