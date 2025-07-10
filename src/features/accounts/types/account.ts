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
