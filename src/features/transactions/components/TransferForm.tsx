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
  Card,
  CardContent,
  Grid,
  MenuItem,
  Divider,
  Stack,
  Avatar,
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
      <Card sx={{ borderRadius: 3, boxShadow: '0 8px 32px rgba(0, 80, 158, 0.08)' }}>
        <CardContent sx={{ p: 4 }}>
          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              {/* From Account */}
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ backgroundColor: 'rgba(0, 80, 158, 0.1)', mr: 2 }}>
                    <AccountBalanceIcon sx={{ color: '#00509e' }} />
                  </Avatar>
                  <Typography variant="h6" sx={{ color: '#00509e', fontWeight: 600 }}>
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
                  <Avatar sx={{ 
                    backgroundColor: '#1976d2', 
                    width: 48, 
                    height: 48 
                  }}>
                    <TransferIcon />
                  </Avatar>
                </Box>
                <Divider />
              </Grid>

              {/* To Account */}
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ backgroundColor: 'rgba(25, 118, 210, 0.1)', mr: 2 }}>
                    <SendIcon sx={{ color: '#1976d2' }} />
                  </Avatar>
                  <Typography variant="h6" sx={{ color: '#1976d2', fontWeight: 600 }}>
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
                  <Avatar sx={{ backgroundColor: 'rgba(237, 108, 2, 0.1)', mr: 2 }}>
                    <MoneyIcon sx={{ color: '#ed6c02' }} />
                  </Avatar>
                  <Typography variant="h6" sx={{ color: '#ed6c02', fontWeight: 600 }}>
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
                <Button
                  type="submit"
                  variant="contained"
                  disabled={!isDirty || !isValid || isLoading}
                  fullWidth
                  size="large"
                  startIcon={isLoading ? <CircularProgress size={20} /> : <TransferIcon />}
                  sx={{
                    mt: 3,
                    py: 2,
                    borderRadius: 2,
                    background: 'linear-gradient(135deg, #00509e 0%, #1976d2 100%)',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    '&:hover': {
                      background: 'linear-gradient(135deg, #00509e 20%, #1976d2 80%)',
                    },
                    '&:disabled': {
                      background: 'rgba(0, 0, 0, 0.12)',
                    }
                  }}
                >
                  {isLoading ? 'Processing...' : 'Transfer Funds'}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>

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
        <DialogTitle sx={{ 
          background: 'linear-gradient(135deg, #00509e 0%, #1976d2 100%)',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          gap: 2
        }}>
          <TransferIcon />
          Confirm Transfer
        </DialogTitle>
        <DialogContent sx={{ p: 4 }}>
          <DialogContentText sx={{ mb: 3 }}>
            Please review the transfer details carefully before confirming.
          </DialogContentText>
          
          <Stack spacing={3}>
            <Box sx={{ 
              backgroundColor: 'rgba(0, 80, 158, 0.05)', 
              p: 3, 
              borderRadius: 2,
              border: '1px solid rgba(0, 80, 158, 0.1)'
            }}>
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
            </Box>

            <Box sx={{ 
              backgroundColor: 'rgba(25, 118, 210, 0.05)', 
              p: 3, 
              borderRadius: 2,
              border: '1px solid rgba(25, 118, 210, 0.1)'
            }}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                TO ACCOUNT
              </Typography>
              <Typography variant="h6" sx={{ fontFamily: 'monospace' }}>
                {transferData?.toAccountNumber}
              </Typography>
            </Box>

            <Box sx={{ 
              backgroundColor: 'rgba(237, 108, 2, 0.05)', 
              p: 3, 
              borderRadius: 2,
              border: '1px solid rgba(237, 108, 2, 0.1)',
              textAlign: 'center'
            }}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                TRANSFER AMOUNT
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#ed6c02' }}>
                ${transferData?.amount?.toFixed(2)}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {getSelectedAccount(transferData?.fromAccountNumber || '')?.currency || 'USD'}
              </Typography>
            </Box>
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
          <Button 
            onClick={handleConfirmTransfer} 
            variant="contained" 
            disabled={isLoading}
            startIcon={isLoading ? <CircularProgress size={20} /> : <SendIcon />}
            sx={{
              borderRadius: 2,
              background: 'linear-gradient(135deg, #00509e 0%, #1976d2 100%)',
              px: 3
            }}
          >
            {isLoading ? 'Processing...' : 'Confirm Transfer'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TransferForm;
