import { baseApi } from "@/app/store/baseApi";
import type {
  AccountsResponse,
  AccountBalanceResponse,
  WithdrawRequest,
  WithdrawResponse,
  DepositRequest,
  DepositResponse,
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
  }),
});

export const {
  useGetAccountsQuery,
  useGetAccountBalanceQuery,
  useGetAccountLimitsQuery,
  useWithdrawMutation,
  useDepositMutation,
} = accountsApi;
