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
