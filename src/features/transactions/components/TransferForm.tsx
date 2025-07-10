import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Box, Button, TextField, CircularProgress, Alert } from "@mui/material";
import { useTransferMutation } from "../store/transactionsApi";
import { useGetAccountsQuery } from "@/features/accounts/store/accountsApi";
import type { TransferRequest } from "../types/transfer";
import type { Account } from "@/features/accounts/types/account";

const schema = yup.object({
  fromAccountNumber: yup.string().required("From Account Number is required"),
  toAccountNumber: yup.string().required("To Account Number is required"),
  amount: yup
    .number()
    .typeError("Amount must be a number")
    .positive("Amount must be positive")
    .required("Amount is required"),
});

type FormValues = TransferRequest;

const TransferForm: React.FC = () => {
  const [transfer, { isLoading, error, data }] = useTransferMutation();
  const {
    data: accountsData,
    isLoading: isAccountsLoading,
    error: accountsError,
  } = useGetAccountsQuery();
  const accounts = accountsData?.data || [];
  const hasAccounts = Array.isArray(accounts) && accounts.length > 0;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (values: FormValues) => {
    await transfer(values);
  };

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
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
      <TextField
        select
        label="From Account Number"
        fullWidth
        margin="normal"
        SelectProps={{ native: true }}
        {...register("fromAccountNumber")}
        error={!!errors.fromAccountNumber}
        helperText={errors.fromAccountNumber?.message}
        InputLabelProps={{ shrink: true }}
      >
        <option value="">Select your account</option>
        {accounts.map((acc: Account) => (
          <option key={acc.accountNumber} value={acc.accountNumber}>
            {acc.accountNumber} ({acc.accountType}, Balance: {acc.balance}{" "}
            {acc.currency})
          </option>
        ))}
      </TextField>
      <TextField
        label="To Account Number"
        fullWidth
        margin="normal"
        {...register("toAccountNumber")}
        error={!!errors.toAccountNumber}
        helperText={errors.toAccountNumber?.message}
      />
      <TextField
        label="Amount"
        type="number"
        fullWidth
        margin="normal"
        {...register("amount")}
        error={!!errors.amount}
        helperText={errors.amount?.message}
      />

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {(error as any)?.data?.message || "Transfer failed"}
        </Alert>
      )}
      {data && data.success && (
        <Alert severity="success" sx={{ mt: 2 }}>
          {data.message}
        </Alert>
      )}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={isLoading}
        sx={{ mt: 2 }}
        fullWidth
      >
        {isLoading ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          "Transfer"
        )}
      </Button>
    </Box>
  );
};

export default TransferForm;
