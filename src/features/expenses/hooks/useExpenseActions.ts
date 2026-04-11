import { useEffect } from "react";
import {
  useCreateExpenseMutation,
  useGetExpensesQuery,
  useGetExpenseByIdQuery,
  useGetCategoriesQuery,
  useGetPaymentMethodsQuery,
} from "../store/expensesApi";
import { useGetAccountsQuery } from "@/features/accounts/store/accountsApi";
import { useToast } from "@/utils/snackbarUtils";
import { useAppSelector } from "@/app/hooks";
import { notificationService } from "@/features/notifications/services/notificationService";
import type { FormValues } from "../components/expense-form";
import type { ExpenseFilters } from "../types/expense";

export const useExpenseActions = (
  expenseData: FormValues | null,
  filters?: ExpenseFilters,
  expenseId?: string,
) => {
  const toast = useToast();
  const user = useAppSelector((state) => state.auth.user);

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
  } = useGetExpenseByIdQuery(expenseId!, {
    skip: !expenseId, // Only run when expenseId is provided
  });

  // Show success notification
  useEffect(() => {
    if (isSuccess) {
      toast.success("Expense created successfully!");
      resetMutation();
      
      // Send notification
      if (user) {
        notificationService.createNotification({
          recipientId: user.id,
          recipientRole: "customer",
          title: "Expense Created",
          message: "Your expense has been recorded successfully.",
          type: "system",
        });
      }
    }
  }, [isSuccess, toast, resetMutation, user]);

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

  // Extract data from API responses
  const accounts = accountsData?.data || [];
  const categories = categoriesData?.data || [];
  const paymentMethods = paymentMethodsData?.data || [];
  const expenses = expensesData?.data || [];
  const singleExpense = singleExpenseData?.data;

  return {
    // API state
    isLoading,
    isSuccess,
    error,
    accounts,
    categories,
    paymentMethods,
    expenses,
    singleExpense,

    // Loading states
    isAccountsLoading,
    isCategoriesLoading,
    isPaymentMethodsLoading,
    isExpensesLoading,
    isSingleExpenseLoading,

    // Error states
    expensesError,
    singleExpenseError,

    // Actions
    onConfirm,
  };
};
