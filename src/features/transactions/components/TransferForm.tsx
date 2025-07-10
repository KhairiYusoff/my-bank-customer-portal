import React from "react";
import type {
  Control,
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import {
  Box,
  Button,
  TextField,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import type { TransferRequest } from "../types/transfer";
import type { Account } from "@/features/accounts/types/account";

export type FormValues = TransferRequest;

interface TransferFormProps {
  accounts: Account[];
  isLoading: boolean;
  isDirty: boolean;
  isValid: boolean;
  openConfirm: boolean;
  transferData: FormValues | null;
  control: Control<FormValues>;
  register: UseFormRegister<FormValues>;
  handleSubmit: UseFormHandleSubmit<FormValues>;
  errors: FieldErrors<FormValues>;
  onSubmit: (values: FormValues) => void;
  handleCloseConfirm: () => void;
  handleConfirmTransfer: () => void;
}

const TransferForm: React.FC<TransferFormProps> = ({
  accounts,
  isLoading,
  isDirty,
  isValid,
  openConfirm,
  transferData,
  control,
  register,
  handleSubmit,
  errors,
  onSubmit,
  handleCloseConfirm,
  handleConfirmTransfer,
}) => {
  return (
    <>
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

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={!isDirty || !isValid || isLoading}
          sx={{ mt: 2 }}
          fullWidth
        >
          Transfer
        </Button>
      </Box>

      <Dialog open={openConfirm} onClose={handleCloseConfirm}>
        <DialogTitle>Confirm Transfer</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please review the details below before confirming the transfer.
          </DialogContentText>
          <Typography variant="body1" sx={{ mt: 2 }}>
            <strong>From:</strong> {transferData?.fromAccountNumber}
          </Typography>
          <Typography variant="body1">
            <strong>To:</strong> {transferData?.toAccountNumber}
          </Typography>
          <Typography variant="body1">
            <strong>Amount:</strong> {transferData?.amount} {accounts.find(acc => acc.accountNumber === transferData?.fromAccountNumber)?.currency}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirm}>Cancel</Button>
          <Button onClick={handleConfirmTransfer} variant="contained" disabled={isLoading}>
            {isLoading ? <CircularProgress size={24} /> : "Confirm Transfer"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TransferForm;
