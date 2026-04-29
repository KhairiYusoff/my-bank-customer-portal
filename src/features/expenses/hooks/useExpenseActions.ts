import { useEffect } from "react";
import {
  useCreateExpenseMutation,
  useGetExpensesQuery,
  useGetExpenseByIdQuery,
  useGetCategoriesQuery,
  useGetPaymentMethodsQuery,
  useUpdateExpenseMutation,
  useDeleteExpenseMutation,
} from "../store/expensesApi";
import { useGetAccountsQuery } from "@/features/accounts/store/accountsApi";
import { useToast } from "@/utils/snackbarUtils";
import type { FormValues } from "../components/expense-form";
import type { ExpenseFilters } from "../types/expense";

export const useExpenseActions = (
  expenseData: FormValues | null,
  filters?: ExpenseFilters,
  selectedExpenseId?: string,
  editExpenseId?: string,
) => {
  const toast = useToast();

  const [
    updateExpense,
    { isLoading: isUpdateExpenseLoading, error: updateExpenseError },
  ] = useUpdateExpenseMutation();

  const [
    deleteExpense,
    { isLoading: isDeleteExpenseLoading, error: deleteExpenseError },
  ] = useDeleteExpenseMutation();

  // API hooks
  const [createExpense, { isLoading, isSuccess, error, reset: resetMutation }] =
    useCreateExpenseMutation();
  const {
    data: accountsData,
    isLoading: isAccountsLoading,
    error: accountsError,
  } = useGetAccountsQuery();
  const {
    data: categoriesData,
    isLoading: isCategoriesLoading,
    error: categoriesError,
  } = useGetCategoriesQuery();
  const {
    data: paymentMethodsData,
    isLoading: isPaymentMethodsLoading,
    error: paymentMethodsError,
  } = useGetPaymentMethodsQuery();
  const {
    data: expensesData,
    isLoading: isExpensesLoading,
    error: expensesError,
  } = useGetExpensesQuery(filters || {});
  const {
    data: singleExpenseData,
    isLoading: isSingleExpenseLoading,
    error: singleExpenseError,
  } = useGetExpenseByIdQuery(selectedExpenseId || "", {
    skip: !selectedExpenseId,
  });
  const {
    data: editExpenseData,
    isLoading: isEditExpenseLoading,
    error: editExpenseError,
  } = useGetExpenseByIdQuery(editExpenseId || "", {
    skip: !editExpenseId,
  });

  // Show success notification
  useEffect(() => {
    if (isSuccess) {
      toast.success("Expense created successfully!");
      resetMutation();
    }
  }, [isSuccess, toast, resetMutation]);

  // Handle API errors
  useEffect(() => {
    if (error) {
      const errorMessage = error as any;
      toast.error(
        errorMessage.data?.message ||
          "Failed to create expense. Please try again.",
      );
    }
  }, [error, toast]);

  const onConfirm = async () => {
    if (!expenseData) return;

    try {
      await createExpense(expenseData).unwrap();
      return true; // Success
    } catch (error) {
      console.error("Failed to create expense:", error);
      return false; // Failure
    }
  };

  const onUpdateExpense = async (id: string, updateData: any) => {
    try {
      await updateExpense({ id, data: updateData }).unwrap();
      toast.success("Expense updated successfully!");
      return true;
    } catch (error: any) {
      toast.error(
        error.data?.message || "Failed to update expense. Please try again.",
      );
      return false;
    }
  };

  const onDeleteExpense = async (id: string) => {
    try {
      await deleteExpense(id).unwrap();
      toast.success("Expense deleted successfully!");
      return true;
    } catch (error: any) {
      toast.error(
        error.data?.message || "Failed to delete expense. Please try again.",
      );
      return false;
    }
  };

  // Extract data from API responses
  const accounts = accountsData?.data || [];
  const categories = categoriesData?.data || [];
  const paymentMethods = paymentMethodsData?.data || [];
  const expenses = expensesData?.data || [];
  const singleExpense = singleExpenseData?.data;
  const editExpense = editExpenseData?.data;

  return {
    // Data
    accounts,
    categories,
    paymentMethods,
    expenses,
    singleExpense,
    editExpense,

    // Loading states
    isLoading,
    isSuccess,
    error,
    isAccountsLoading,
    isCategoriesLoading,
    isPaymentMethodsLoading,
    isExpensesLoading,
    isSingleExpenseLoading,
    isEditExpenseLoading,
    isUpdateExpenseLoading,
    isDeleteExpenseLoading,

    // Error states
    expensesError,
    singleExpenseError,
    editExpenseError,
    updateExpenseError,
    deleteExpenseError,

    // Actions
    onConfirm,
    onUpdateExpense,
    onDeleteExpense,
  };
};
