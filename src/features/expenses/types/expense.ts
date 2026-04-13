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

export interface Expense {
  _id: string;
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
  createdAt: string;
  updatedAt: string;
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

// Expense Filters
export interface ExpenseFilters {
  search?: string;
  category?: string;
  paymentMethod?: string;
  status?: string;
  dateFrom?: string;
  dateTo?: string;
  minAmount?: number;
  maxAmount?: number;
  page?: number;
  limit?: number;
  sortBy?: 'date' | 'amount' | 'category' | undefined;
  sortOrder?: 'asc' | 'desc';
}

// Get Single Expense Response
export interface GetSingleExpenseResponse extends BaseResponse<Expense> {
  meta: null;
}

// Update Expense Request
export interface UpdateExpenseRequest {
  amount?: number;
  category?: string;
  subCategory?: string;
  description?: string;
  date?: string;
  paymentMethod?: string;
  notes?: string;
  tags?: string[];
  merchant?: {
    name?: string;
    location?: string;
    receiptNumber?: string;
  };
}

// Update Expense Response
export interface UpdateExpenseResponse extends BaseResponse<Expense> {
  meta: null;
}

// Get Expenses Response
export interface GetExpensesResponse extends BaseResponse<Expense[]> {
  meta: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

// Delete Expense Response
export interface DeleteExpenseResponse extends BaseResponse<null> {
  meta: null;
}
