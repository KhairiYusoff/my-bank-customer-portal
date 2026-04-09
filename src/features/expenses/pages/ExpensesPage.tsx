import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Container,
  Typography,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  Paper,
  Avatar,
} from "@mui/material";
import {
  Receipt as ExpenseIcon,
  AccountBalance as AccountBalanceIcon,
} from "@mui/icons-material";
import DashboardLayout from "@/layouts/DashboardLayout";
import ExpenseForm, { FormValues } from "../components/ExpenseForm";
import { useGetAccountsQuery } from "@/features/accounts/store/accountsApi";
import { useGetCategoriesQuery, useGetPaymentMethodsQuery, useCreateExpenseMutation } from "../store/expensesApi";
import { expenseSchema } from "../validations/expenseValidation";
import { useToast } from "@/utils/snackbarUtils";
import { useAppSelector } from "@/app/hooks";
import { notificationService } from "@/features/notifications/services/notificationService";

const ExpensesPage: React.FC = () => {
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
  const toast = useToast();
  const user = useAppSelector((state) => state.auth.user);

  const [openConfirm, setOpenConfirm] = useState(false);
  const [expenseData, setExpenseData] = useState<FormValues | null>(null);

  const {
    control,
    register,
    handleSubmit,
    watch,
    reset,
    formState: { isDirty, isValid },
  } = useForm<FormValues>({
    resolver: yupResolver(expenseSchema as any),
    mode: "onChange",
    defaultValues: {
      amount: undefined as any,
      category: "",
      subCategory: "",
      description: "",
      date: new Date().toISOString().split("T")[0], // Today's date
      paymentMethod: "",
      account: "",
      notes: "",
      tags: [],
      merchant: {
        name: "",
        location: "",
        receiptNumber: "",
      },
    },
  });

  // Show success notification
  useEffect(() => {
    if (isSuccess) {
      toast.success("Expense created successfully!");
      resetMutation();
      reset();
      setExpenseData(null);
      
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
  }, [isSuccess, toast, resetMutation, reset, user]);

  // Handle API errors
  useEffect(() => {
    if (error) {
      const errorMessage = error as any;
      toast.error(errorMessage.data?.message || "Failed to create expense. Please try again.");
    }
  }, [error, toast]);

  const onSubmit = (values: FormValues) => {
    setExpenseData(values);
    setOpenConfirm(true);
  };

  const onConfirm = async () => {
    if (!expenseData) return;

    try {
      await createExpense(expenseData).unwrap();
      setOpenConfirm(false);
    } catch (error) {
      // Error is handled in the useEffect above
    }
  };

  const onCancel = () => {
    reset();
  };

  const onCloseConfirm = () => {
    setOpenConfirm(false);
    setExpenseData(null);
  };

  // Loading states
  const isLoadingData = isAccountsLoading || isCategoriesLoading || isPaymentMethodsLoading;
  const hasDataError = accountsError || categoriesError || paymentMethodsError;

  if (isLoadingData) {
    return (
      <DashboardLayout>
        <Container maxWidth="lg">
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
            <Box textAlign="center">
              <CircularProgress size={60} />
              <Typography variant="h6" sx={{ mt: 2 }}>
                Loading expense data...
              </Typography>
            </Box>
          </Box>
        </Container>
      </DashboardLayout>
    );
  }

  if (hasDataError) {
    return (
      <DashboardLayout>
        <Container maxWidth="lg">
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
            <Alert severity="error" sx={{ width: "100%" }}>
              Failed to load expense data. Please refresh the page and try again.
            </Alert>
          </Box>
        </Container>
      </DashboardLayout>
    );
  }

  const accounts = accountsData?.data || [];
  const categories = categoriesData?.data || [];
  const paymentMethods = paymentMethodsData?.data || [];

  return (
    <DashboardLayout>
      <Container maxWidth="lg">
        
        {accounts.length === 0 ? (
          <Card elevation={2}>
            <CardContent sx={{ textAlign: "center", py: 6 }}>
              <AccountBalanceIcon sx={{ fontSize: 64, color: "text.secondary", mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                No Accounts Available
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                You need at least one account to create expenses. Contact support to open an account.
              </Typography>
            </CardContent>
          </Card>
        ) : (
          <ExpenseForm
            accounts={accounts}
            categories={categories}
            paymentMethods={paymentMethods}
            isLoading={isLoading}
            isDirty={isDirty}
            isValid={isValid}
            openConfirm={openConfirm}
            expenseData={expenseData}
            control={control}
            register={register}
            handleSubmit={handleSubmit}
            watch={watch}
            errors={{}}
            onSubmit={onSubmit}
            onConfirm={onConfirm}
            onCancel={onCancel}
            onCloseConfirm={onCloseConfirm}
          />
        )}
      </Container>
    </DashboardLayout>
  );
};

export default ExpensesPage;
