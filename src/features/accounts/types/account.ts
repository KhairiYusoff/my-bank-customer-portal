export interface Account {
  _id: string;
  user: string;
  accountNumber: string;
  accountType: string;
  branch: string;
  balance: number;
  interestRate: number;
  currency: string;
  status: string;
  dateOpened: string;
  overdraftLimit?: number;
  minimumBalance?: number;
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
  type: 'withdrawal' | 'deposit' | 'transfer';
  amount: number;
  description: string;
  status: 'completed' | 'pending' | 'failed';
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
