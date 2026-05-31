export interface TransferRequest {
  fromAccountNumber: string;
  toAccountNumber: string;
  amount: number;
  memo?: string;
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

export interface TransactionDeviceInfo {
  ip?: string;
  userAgent?: string;
}

export interface TransactionProcessingTime {
  submittedAt?: string;
  completedAt?: string;
}

export interface TransactionHistory {
  _id: string;
  account: TransactionAccount;
  type: "transfer" | "deposit" | "withdrawal" | "airdrop";
  direction?: "debit" | "credit";
  amount: number;
  description: string;
  memo?: string | null;
  status: "completed" | "pending" | "failed";
  performedBy: TransactionPerformer;
  date: string;
  reference?: string | null;
  fee?: number | null;
  balanceBefore?: number | null;
  balanceAfter?: number | null;
  currency?: string;
  channel?: string;
  counterpartAccount?: string | null;
  counterpartName?: string | null;
  isNewRecipient?: boolean | null;
  processingTime?: TransactionProcessingTime;
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
