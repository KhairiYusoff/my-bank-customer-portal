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
  Typography,
  CardContent,
  Grid,
  MenuItem,
  Divider,
  Stack,
  Chip,
} from "@mui/material";
import {
  AccountBalance as AccountBalanceIcon,
  SwapHoriz as TransferIcon,
  AttachMoney as MoneyIcon,
  Send as SendIcon,
} from "@mui/icons-material";
import type { TransferRequest } from "../types/transfer";
import type { Account } from "@/features/accounts/types/account";
import {
  TransferFormCard,
  PrimaryIconAvatar,
  InfoIconAvatar,
  WarningIconAvatar,
  TransferIconAvatar,
  TransferSubmitButton,
  TransferConfirmButton,
  GradientDialogTitle,
  PrimaryDialogInfoBox,
  InfoDialogInfoBox,
  WarningDialogInfoBox,
} from "./styles";

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
  const formatAccountOption = (account: Account) => {
    return `${account.accountNumber} (${account.accountType.replace(/_/g, ' ')} - $${account.balance?.toFixed(2) || '0.00'})`;
  };

  const getSelectedAccount = (accountNumber: string) => {
    return accounts.find(acc => acc.accountNumber === accountNumber);
  };

  return (
    <>
      <TransferFormCard>
        <CardContent sx={{ p: 4 }}>
          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              {/* From Account */}
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <PrimaryIconAvatar sx={{ mr: 2 }}>
                    <AccountBalanceIcon sx={{ color: 'primary.main' }} />
                  </PrimaryIconAvatar>
                  <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 600 }}>
                    From Account
                  </Typography>
                </Box>
                <TextField
                  select
                  label="Select Source Account"
                  fullWidth
                  {...register("fromAccountNumber")}
                  error={!!errors.fromAccountNumber}
                  helperText={errors.fromAccountNumber?.message}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    }
                  }}
                >
                  <MenuItem value="">
                    <em>Choose your account</em>
                  </MenuItem>
                  {accounts.map((account) => (
                    <MenuItem key={account.accountNumber} value={account.accountNumber}>
                      <Box>
                        <Typography variant="subtitle2">{account.accountNumber}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {account.accountType.replace(/_/g, ' ')} • Balance: ${account.balance?.toFixed(2) || '0.00'}
                        </Typography>
                      </Box>
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              {/* Transfer Icon */}
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
                  <TransferIconAvatar>
                    <TransferIcon />
                  </TransferIconAvatar>
                </Box>
                <Divider />
              </Grid>

              {/* To Account */}
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <InfoIconAvatar sx={{ mr: 2 }}>
                    <SendIcon sx={{ color: 'info.main' }} />
                  </InfoIconAvatar>
                  <Typography variant="h6" sx={{ color: 'info.main', fontWeight: 600 }}>
                    To Account
                  </Typography>
                </Box>
                <TextField
                  label="Destination Account Number"
                  fullWidth
                  placeholder="Enter recipient account number"
                  {...register("toAccountNumber")}
                  error={!!errors.toAccountNumber}
                  helperText={errors.toAccountNumber?.message || "Enter the account number you want to transfer to"}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    }
                  }}
                />
              </Grid>

              {/* Amount */}
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <WarningIconAvatar sx={{ mr: 2 }}>
                    <MoneyIcon sx={{ color: 'warning.main' }} />
                  </WarningIconAvatar>
                  <Typography variant="h6" sx={{ color: 'warning.main', fontWeight: 600 }}>
                    Transfer Amount
                  </Typography>
                </Box>
                <TextField
                  label="Amount"
                  type="number"
                  fullWidth
                  placeholder="0.00"
                  inputProps={{ 
                    min: 0.01, 
                    step: 0.01,
                    'aria-label': 'Transfer amount'
                  }}
                  {...register("amount")}
                  error={!!errors.amount}
                  helperText={errors.amount?.message || "Enter the amount to transfer"}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    }
                  }}
                />
              </Grid>

              {/* Submit Button */}
              <Grid item xs={12}>
                <TransferSubmitButton
                  type="submit"
                  variant="contained"
                  disabled={!isDirty || !isValid || isLoading}
                  fullWidth
                  size="large"
                  startIcon={isLoading ? <CircularProgress size={20} /> : <TransferIcon />}
                >
                  {isLoading ? 'Processing...' : 'Transfer Funds'}
                </TransferSubmitButton>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </TransferFormCard>

      {/* Confirmation Dialog */}
      <Dialog 
        open={openConfirm} 
        onClose={handleCloseConfirm}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 3 }
        }}
      >
        <GradientDialogTitle>
          <TransferIcon />
          Confirm Transfer
        </GradientDialogTitle>
        <DialogContent sx={{ p: 4 }}>
          <DialogContentText sx={{ mb: 3 }}>
            Please review the transfer details carefully before confirming.
          </DialogContentText>
          
          <Stack spacing={3}>
            <PrimaryDialogInfoBox>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                FROM ACCOUNT
              </Typography>
              <Typography variant="h6" sx={{ fontFamily: 'monospace' }}>
                {transferData?.fromAccountNumber}
              </Typography>
              {getSelectedAccount(transferData?.fromAccountNumber || '') && (
                <Chip 
                  label={`Balance: $${getSelectedAccount(transferData?.fromAccountNumber || '')?.balance?.toFixed(2)}`}
                  size="small"
                  color="primary"
                  variant="outlined"
                  sx={{ mt: 1 }}
                />
              )}
            </PrimaryDialogInfoBox>

            <InfoDialogInfoBox>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                TO ACCOUNT
              </Typography>
              <Typography variant="h6" sx={{ fontFamily: 'monospace' }}>
                {transferData?.toAccountNumber}
              </Typography>
            </InfoDialogInfoBox>

            <WarningDialogInfoBox>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                TRANSFER AMOUNT
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'warning.main' }}>
                ${transferData?.amount?.toFixed(2)}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {getSelectedAccount(transferData?.fromAccountNumber || '')?.currency || 'USD'}
              </Typography>
            </WarningDialogInfoBox>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button 
            onClick={handleCloseConfirm}
            variant="outlined"
            sx={{ borderRadius: 2 }}
          >
            Cancel
          </Button>
          <TransferConfirmButton
            onClick={handleConfirmTransfer} 
            variant="contained" 
            disabled={isLoading}
            startIcon={isLoading ? <CircularProgress size={20} /> : <SendIcon />}
          >
            {isLoading ? 'Processing...' : 'Confirm Transfer'}
          </TransferConfirmButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TransferForm;
