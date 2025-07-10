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
} from "@mui/material";
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
      return <CircularProgress sx={{ mt: 4 }} />;
    }

    if (accountsError) {
      return (
        <Alert severity="error" sx={{ mt: 4 }}>
          Failed to load your accounts.
        </Alert>
      );
    }

    if (!hasAccounts) {
      return (
        <Alert severity="warning" sx={{ mt: 4 }}>
          You do not have any accounts. Please open an account before making
          transfers.
        </Alert>
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
      <Container maxWidth="sm">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Transfer Funds
          </Typography>
          {renderContent()}
        </Box>
      </Container>
    </DashboardLayout>
  );
};

export default TransferPage;
