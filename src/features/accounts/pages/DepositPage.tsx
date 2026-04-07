import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { 
  Box, 
  Container, 
  Typography, 
  TextField, 
  Button, 
  CircularProgress, 
  Alert, 
  MenuItem, 
  Card,
  CardContent,
  Paper,
  Avatar,
  Grid,
  Stack
} from '@mui/material';
import {
  Add as DepositIcon,
  AccountBalance as AccountBalanceIcon,
  AttachMoney as MoneyIcon,
  Description as DescriptionIcon,
} from '@mui/icons-material';
import DashboardLayout from '@/layouts/DashboardLayout';
import { useGetAccountsQuery, useDepositMutation } from '@/features/accounts/store/accountsApi';
import { useToast } from '@/utils/snackbarUtils';
import { useAppSelector } from '@/app/hooks';
import { notificationService } from '@/features/notifications/services/notificationService';

const schema: yup.ObjectSchema<IDepositForm> = yup.object().shape({
  accountNumber: yup.string().required('Account is required'),
  amount: yup.number().typeError('Amount must be a number').positive('Amount must be positive').required('Amount is required'),
  description: yup.string(),
});

interface IDepositForm {
  accountNumber: string;
  amount: number;
  description?: string;
}

const DepositPage: React.FC = () => {
  const { data: accountsResponse, isLoading: isLoadingAccounts } = useGetAccountsQuery();
  const [deposit, { isLoading, isSuccess, isError, error, reset: resetMutation }] = useDepositMutation();
  const toast = useToast();
  const user = useAppSelector((state) => state.auth.user);
  const [depositData, setDepositData] = useState<IDepositForm | null>(null);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm<IDepositForm>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: { accountNumber: '', amount: 0, description: '' },
  });

  useEffect(() => {
    if (isSuccess && depositData && user) {
      // Show immediate toast
      toast.success('Deposit successful!');
      
      // Create backend notification
      notificationService.createTransactionNotification({
        userId: user.id,
        type: 'deposit',
        amount: depositData.amount,
        accountNumber: depositData.accountNumber,
      }).catch(console.error);
      
      reset();
      resetMutation();
      setDepositData(null);
    }
    if (isError) {
      const apiError = error as any;
      toast.error(apiError.data?.message || 'Deposit failed.');
    }
  }, [isSuccess, isError, error, reset, resetMutation, toast, depositData, user]);

  const onSubmit = (data: IDepositForm) => {
    setDepositData(data);
    deposit(data);
  };

  if (isLoadingAccounts) {
    return (
      <DashboardLayout>
        <Container maxWidth="md">
          <Box sx={{ my: 4 }}>
            <Paper sx={{ textAlign: 'center', py: 6 }}>
              <CircularProgress size={60} />
              <Typography variant="h6" sx={{ mt: 2, color: 'text.secondary' }}>
                Loading your accounts...
              </Typography>
            </Paper>
          </Box>
        </Container>
      </DashboardLayout>
    );
  }

  if (!accountsResponse?.data?.length) {
    return (
      <DashboardLayout>
        <Container maxWidth="md">
          <Box sx={{ my: 4 }}>
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
                <Typography variant="body1" color="text.secondary">
                  You need at least one account to make deposits.
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Container>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <Container maxWidth="md">
        <Box sx={{ my: 4 }}>
          {/* Header Section */}
          <Paper sx={{ 
            p: 4, 
            mb: 4, 
            background: 'linear-gradient(135deg, #2e7d32 0%, #4caf50 100%)',
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
                <DepositIcon fontSize="large" />
              </Avatar>
              <Box>
                <Typography 
                  variant="h4" 
                  component="h1"
                  sx={{ fontWeight: 'bold', mb: 1 }}
                >
                  Deposit Funds
                </Typography>
                <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
                  Add money to your account securely
                </Typography>
              </Box>
            </Box>
          </Paper>

          {/* Deposit Form */}
          <Card sx={{ borderRadius: 3, boxShadow: '0 8px 32px rgba(46, 125, 50, 0.08)' }}>
            <CardContent sx={{ p: 4 }}>
              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <Grid container spacing={3}>
                  {/* Account Selection */}
                  <Grid item xs={12}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar sx={{ backgroundColor: 'rgba(0, 80, 158, 0.1)', mr: 2 }}>
                        <AccountBalanceIcon sx={{ color: '#00509e' }} />
                      </Avatar>
                      <Typography variant="h6" sx={{ color: '#00509e', fontWeight: 600 }}>
                        Select Account
                      </Typography>
                    </Box>
                    <Controller
                      name="accountNumber"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          select
                          label="Choose Account to Deposit"
                          fullWidth
                          error={!!errors.accountNumber}
                          helperText={errors.accountNumber?.message || "Select which account to deposit funds into"}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: 2,
                            }
                          }}
                        >
                          <MenuItem value="">
                            <em>Choose your account</em>
                          </MenuItem>
                          {accountsResponse?.data?.map((account) => (
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
                      )}
                    />
                  </Grid>

                  {/* Amount */}
                  <Grid item xs={12}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar sx={{ backgroundColor: 'rgba(46, 125, 50, 0.1)', mr: 2 }}>
                        <MoneyIcon sx={{ color: '#2e7d32' }} />
                      </Avatar>
                      <Typography variant="h6" sx={{ color: '#2e7d32', fontWeight: 600 }}>
                        Deposit Amount
                      </Typography>
                    </Box>
                    <Controller
                      name="amount"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Amount"
                          type="number"
                          fullWidth
                          placeholder="0.00"
                          inputProps={{ 
                            min: 0.01, 
                            step: 0.01,
                            'aria-label': 'Deposit amount'
                          }}
                          error={!!errors.amount}
                          helperText={errors.amount?.message || "Enter the amount to deposit"}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: 2,
                            }
                          }}
                        />
                      )}
                    />
                  </Grid>

                  {/* Description */}
                  <Grid item xs={12}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar sx={{ backgroundColor: 'rgba(117, 117, 117, 0.1)', mr: 2 }}>
                        <DescriptionIcon sx={{ color: '#757575' }} />
                      </Avatar>
                      <Typography variant="h6" sx={{ color: '#757575', fontWeight: 600 }}>
                        Description (Optional)
                      </Typography>
                    </Box>
                    <Controller
                      name="description"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Description"
                          fullWidth
                          placeholder="Add a note for this deposit (optional)"
                          multiline
                          rows={3}
                          error={!!errors.description}
                          helperText={errors.description?.message || "Optional description for your records"}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: 2,
                            }
                          }}
                        />
                      )}
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
                      startIcon={isLoading ? <CircularProgress size={20} /> : <DepositIcon />}
                      sx={{
                        mt: 3,
                        py: 2,
                        borderRadius: 2,
                        background: 'linear-gradient(135deg, #2e7d32 0%, #4caf50 100%)',
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        '&:hover': {
                          background: 'linear-gradient(135deg, #2e7d32 20%, #4caf50 80%)',
                        },
                        '&:disabled': {
                          background: 'rgba(0, 0, 0, 0.12)',
                        }
                      }}
                    >
                      {isLoading ? 'Processing Deposit...' : 'Deposit Funds'}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </DashboardLayout>
  );
};

export default DepositPage;

