export interface Account {
  _id: string;
  user: string;
  accountNumber: string;
  accountType: string;
  branch: string;
  balance: number;
  interestRate?: number;
  currency: string;
  status: string;
  dateOpened: string;
  dateClosed?: string;
  overdraftLimit?: number;
  minimumBalance?: number;
  // Fixed Deposit fields
  lockPeriod?: 1 | 3 | 6 | 12;
  maturityDate?: string;
  linkedAccount?: string;
  principal?: number;
  autoRenew?: boolean;
  // Business field
  companyRegistrationDoc?: string;
}

export interface AccountsResponse {
  success: boolean;
  message: string;
  data: Account[] | null;
  errors: string[] | null;
  meta: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  } | null;
}

export interface AccountBalanceResponse {
  success: boolean;
  message: string;
  data: {
    balance: number;
  } | null;
  errors: string[] | null;
  meta: null;
}

export interface WithdrawRequest {
  accountNumber: string;
  amount: number;
}

export interface Transaction {
  account: string;
  type: "withdrawal" | "deposit" | "transfer";
  amount: number;
  description: string;
  status: "completed" | "pending" | "failed";
  performedBy: string;
  _id: string;
  date: string;
}

export interface WithdrawResponse {
  success: boolean;
  message: string;
  data: {
    account: Account;
    transaction: Transaction;
  } | null;
  errors: string[] | null;
  meta: null;
}

export interface DepositRequest {
  accountNumber: string;
  amount: number;
  memo?: string;
}

export interface DepositResponse {
  success: boolean;
  message: string;
  data: {
    account: Account;
    transaction: Transaction;
  } | null;
  errors: string[] | null;
  meta: null;
}

export interface RequestAccountRequest {
  accountType: "current" | "business" | "fixed_deposit";
  branch: string;
  amount: number;
  lockPeriod?: 1 | 3 | 6 | 12;
  linkedAccount?: string;
  companyRegistrationDoc?: string;
}

export interface RequestAccountResponse {
  success: boolean;
  message: string;
  data: Account | null;
  errors: string[] | null;
  meta: null;
}
