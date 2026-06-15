import { baseApi } from "@/app/store/baseApi";
import type {
  AccountsResponse,
  AccountBalanceResponse,
  WithdrawRequest,
  WithdrawResponse,
  DepositRequest,
  DepositResponse,
  RequestAccountRequest,
  RequestAccountResponse,
} from "../types/account";

export interface AccountTypeLimits {
  dailyTransferLimit: number | null;
  maxSingleTransfer: number | null;
  overdraftEligible: boolean;
  minWithdrawal: number | null;
  transfersAllowed: boolean;
}

export interface AccountLimitsResponse {
  success: boolean;
  message: string;
  data: Record<string, AccountTypeLimits>;
}

export const accountsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAccounts: builder.query<AccountsResponse, void>({
      query: () => "/accounts",
      providesTags: ["Account"],
    }),
    getAccountBalance: builder.query<AccountBalanceResponse, string>({
      query: (accountNumber) => `/accounts/balance/${accountNumber}`,
      providesTags: (result, error, accountNumber) => [
        { type: "AccountBalance", id: accountNumber },
      ],
    }),
    getAccountLimits: builder.query<AccountLimitsResponse, void>({
      query: () => "/accounts/limits",
      providesTags: ["Account"],
    }),
    withdraw: builder.mutation<WithdrawResponse, WithdrawRequest>({
      query: (withdrawData) => ({
        url: "/accounts/withdraw",
        method: "POST",
        body: withdrawData,
      }),
      invalidatesTags: (result, error, { accountNumber }) => [
        "Account",
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
        "Account",
        { type: "AccountBalance", id: accountNumber },
      ],
    }),
    requestAccount: builder.mutation<RequestAccountResponse, RequestAccountRequest>({
      query: (requestData) => ({
        url: "/accounts/request",
        method: "POST",
        body: requestData,
      }),
      invalidatesTags: ["Account"],
    }),
    fdSettle: builder.mutation<any, string>({
      query: (accountNumber) => ({
        url: `/accounts/${accountNumber}/fd-settle`,
        method: "POST",
      }),
      invalidatesTags: (result, error, accountNumber) => [
        "Account",
        { type: "AccountBalance", id: accountNumber },
      ],
    }),
    updateFdInstructions: builder.mutation<any, { accountNumber: string; autoRenew: boolean; linkedAccount?: string }>({
      query: ({ accountNumber, ...body }) => ({
        url: `/accounts/${accountNumber}/fd-instructions`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (result, error, { accountNumber }) => [
        "Account",
      ],
    }),
    fdWithdrawEarly: builder.mutation<any, string>({
      query: (accountNumber) => ({
        url: `/accounts/${accountNumber}/fd-withdraw-early`,
        method: "POST",
      }),
      invalidatesTags: (result, error, accountNumber) => [
        "Account",
        { type: "AccountBalance", id: accountNumber },
      ],
    }),
  }),
});

export const {
  useGetAccountsQuery,
  useGetAccountBalanceQuery,
  useGetAccountLimitsQuery,
  useWithdrawMutation,
  useDepositMutation,
  useRequestAccountMutation,
  useFdSettleMutation,
  useUpdateFdInstructionsMutation,
  useFdWithdrawEarlyMutation,
} = accountsApi;
