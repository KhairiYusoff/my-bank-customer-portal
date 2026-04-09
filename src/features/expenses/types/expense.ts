import { BaseResponse } from "@/types/api";

// Expense Categories
export interface Subcategory {
  value: string;
  label: string;
}

export interface ExpenseCategory {
  value: string;
  label: string;
  subcategories: Subcategory[];
}

export interface GetCategoriesResponse extends BaseResponse<ExpenseCategory[]> {
  meta: null;
}

// Payment Methods
export interface PaymentMethod {
  value: string;
  label: string;
}

export interface GetPaymentMethodsResponse extends BaseResponse<PaymentMethod[]> {
  meta: null;
}

// Create Expense Types
export interface MerchantInfo {
  name?: string;
  location?: string;
  receiptNumber?: string;
}

export interface CreateExpenseRequest {
  amount: number;
  category: string;
  subCategory?: string;
  description: string;
  date: string; // YYYY-MM-DD format
  paymentMethod: string;
  account: string;
  notes?: string;
  tags?: string[];
  merchant?: MerchantInfo;
}

export interface ExpenseAccount {
  _id: string;
  accountNumber: string;
  accountType: string;
}

export interface CreatedExpense {
  user: string;
  account: ExpenseAccount;
  amount: number;
  category: string;
  subCategory: string | null;
  description: string;
  date: string;
  paymentMethod: string;
  isManualEntry: boolean;
  isRecurring: boolean;
  recurringPattern: string | null;
  tags: string[];
  status: string;
  notes?: string;
  merchant?: MerchantInfo;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateExpenseResponse extends BaseResponse<CreatedExpense> {
  meta: null;
}
