import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
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
  SwapHoriz as TransferIcon,
  AccountBalance as AccountBalanceIcon,
} from "@mui/icons-material";
import DashboardLayout from "@/layouts/DashboardLayout";
import TransferForm, { FormValues } from "../components/TransferForm";
import { useGetAccountsQuery } from "@/features/accounts/store/accountsApi";
import { useTransferMutation } from "../store/transactionsApi";
import { useToast } from "@/utils/snackbarUtils";
import type { TransferRequest } from "../types/transfer";

const schema = yup.object({
  fromAccountNumber: yup.string().required("From Account Number is required"),
  toAccountNumber: yup.string().required("To Account Number is required"),
  amount: yup
    .number()
    .typeError("Amount must be a number")
    .positive("Amount must be positive")
    .required("Amount is required"),
});

const TransferPage: React.FC = () => {
  const [transfer, { isLoading, isSuccess, error, reset: resetMutation }] =
    useTransferMutation();
  const {
    data: accountsData,
    isLoading: isAccountsLoading,
    error: accountsError,
  } = useGetAccountsQuery();
  const toast = useToast();

  const [openConfirm, setOpenConfirm] = useState(false);
  const [transferData, setTransferData] = useState<FormValues | null>(null);

  const accounts = accountsData?.data || [];
  const hasAccounts = Array.isArray(accounts) && accounts.length > 0;

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Transfer successful!");
      reset();
      resetMutation();
    }
    if (error) {
      const apiError = error as any;
      toast.error(apiError.data?.message || "Transfer failed.");
    }
  }, [isSuccess, error, reset, resetMutation, toast]);

  const handleOpenConfirm = (values: FormValues) => {
    setTransferData(values);
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
    setTransferData(null);
  };

  const handleConfirmTransfer = () => {
    if (transferData) {
      transfer(transferData);
      handleCloseConfirm();
    }
  };

  const renderContent = () => {
    if (isAccountsLoading) {
      return (
        <Card>
          <CardContent sx={{ textAlign: 'center', py: 6 }}>
            <CircularProgress size={60} />
            <Typography variant="h6" sx={{ mt: 2, color: 'text.secondary' }}>
              Loading your accounts...
            </Typography>
          </CardContent>
        </Card>
      );
    }

    if (accountsError) {
      return (
        <Alert 
          severity="error" 
          sx={{ 
            borderRadius: 3,
            '& .MuiAlert-icon': { fontSize: '2rem' }
          }}
        >
          <Typography variant="h6" gutterBottom>Failed to load accounts</Typography>
          <Typography variant="body2">
            Unable to retrieve your account information. Please try refreshing the page.
          </Typography>
        </Alert>
      );
    }

    if (!hasAccounts) {
      return (
        <Card>
          <CardContent sx={{ textAlign: 'center', py: 6 }}>
            <Avatar sx={{ 
              backgroundColor: 'rgba(0, 80, 158, 0.1)',
              width: 80, 
              height: 80, 
              mx: 'auto',
              mb: 2 
            }}>
              <AccountBalanceIcon sx={{ fontSize: '2.5rem', color: '#00509e' }} />
            </Avatar>
            <Typography variant="h5" color="text.secondary" gutterBottom>
              No Accounts Available
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              You need at least one account to make transfers. Please open an account first.
            </Typography>
          </CardContent>
        </Card>
      );
    }

    return (
      <TransferForm
        accounts={accounts}
        isLoading={isLoading}
        isDirty={isDirty}
        isValid={isValid}
        openConfirm={openConfirm}
        transferData={transferData}
        control={control}
        register={register}
        handleSubmit={handleSubmit}
        errors={errors}
        onSubmit={handleOpenConfirm}
        handleCloseConfirm={handleCloseConfirm}
        handleConfirmTransfer={handleConfirmTransfer}
      />
    );
  };

  return (
    <DashboardLayout>
      <Container maxWidth="md">
        <Box sx={{ my: 4 }}>
          {/* Header Section */}
          <Paper sx={{ 
            p: 4, 
            mb: 4, 
            background: 'linear-gradient(135deg, #00509e 0%, #1976d2 100%)',
            color: 'white',
            borderRadius: 3
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Avatar sx={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                mr: 2,
                width: 56,
                height: 56
              }}>
                <TransferIcon fontSize="large" />
              </Avatar>
              <Box>
                <Typography 
                  variant="h4" 
                  component="h1"
                  sx={{ fontWeight: 'bold', mb: 1 }}
                >
                  Transfer Funds
                </Typography>
                <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
                  Send money securely between your accounts
                </Typography>
              </Box>
            </Box>
          </Paper>

          {/* Content Section */}
          {renderContent()}
        </Box>
      </Container>
    </DashboardLayout>
  );
};

export default TransferPage;
