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
