export interface TransferRequest {
  fromAccountNumber: string;
  toAccountNumber: string;
  amount: number;
}

export interface TransferResponse {
  success: boolean;
  message: string;
  data: null;
  errors: null | string[];
  meta: null | Record<string, unknown>;
}

// Transaction History Types
export interface TransactionAccount {
  _id: string;
  accountNumber: string;
}

export interface TransactionPerformer {
  _id: string;
  name: string;
  role: string;
}

export interface TransactionHistory {
  _id: string;
  account: TransactionAccount;
  type: 'transfer' | 'deposit' | 'withdrawal' | 'airdrop';
  amount: number;
  description: string;
  status: 'completed' | 'pending' | 'failed';
  performedBy: TransactionPerformer;
  date: string;
  __v: number;
}

export interface TransactionHistoryParams {
  accountNumber: string;
  page?: number;
  limit?: number;
}

export interface TransactionHistoryResponse {
  success: boolean;
  message: string;
  data: TransactionHistory[];
  errors: string[] | null;
  meta: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  } | null;
}
