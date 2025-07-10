import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  AccountsResponse,
  AccountBalanceResponse,
  WithdrawRequest,
  WithdrawResponse,
  DepositRequest,
  DepositResponse,
} from "../types/account";

export const accountsApi = createApi({
  reducerPath: "accountsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }), // Adjust as needed
  tagTypes: ["Accounts", "AccountBalance"],
  endpoints: (builder) => ({
    getAccounts: builder.query<AccountsResponse, void>({
      query: () => "/accounts",
      providesTags: ["Accounts"],
    }),
    getAccountBalance: builder.query<AccountBalanceResponse, string>({
      query: (accountNumber) => `/accounts/balance/${accountNumber}`,
      providesTags: (result, error, accountNumber) => [
        { type: "AccountBalance", id: accountNumber },
      ],
    }),
    withdraw: builder.mutation<WithdrawResponse, WithdrawRequest>({
      query: (withdrawData) => ({
        url: "/accounts/withdraw",
        method: "POST",
        body: withdrawData,
      }),
      invalidatesTags: (result, error, { accountNumber }) => [
        "Accounts",
        { type: "AccountBalance", id: accountNumber },
      ],
    }),
    deposit: builder.mutation<DepositResponse, DepositRequest>({
      query: (depositData) => ({
        url: "/accounts/deposit",
        method: "POST",
        body: depositData,
      }),
      invalidatesTags: (result, error, { accountNumber }) => [
        "Accounts",
        { type: "AccountBalance", id: accountNumber },
      ],
    }),
  }),
});

export const {
  useGetAccountsQuery,
  useGetAccountBalanceQuery,
  useWithdrawMutation,
  useDepositMutation,
} = accountsApi;
