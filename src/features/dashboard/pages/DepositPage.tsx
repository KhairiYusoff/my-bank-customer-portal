import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Box, Container, Typography, TextField, Button, CircularProgress, Alert, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import DashboardLayout from '@/layouts/DashboardLayout';
import { useGetAccountsQuery, useDepositMutation } from '@/features/accounts/store/accountsApi';
import { useToast } from '@/utils/snackbarUtils';

const schema = yup.object().shape({
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
    if (isSuccess) {
      toast.success('Deposit successful!');
      reset();
      resetMutation();
    }
    if (isError) {
      const apiError = error as any;
      toast.error(apiError.data?.message || 'Deposit failed.');
    }
  }, [isSuccess, isError, error, reset, resetMutation, toast]);

  const onSubmit = (data: IDepositForm) => {
    deposit(data);
  };

  return (
    <DashboardLayout>
      <Container maxWidth="sm">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Deposit Funds
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <FormControl fullWidth margin="normal">
              <InputLabel id="account-select-label">To Account</InputLabel>
              <Controller
                name="accountNumber"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    labelId="account-select-label"
                    label="To Account"
                    error={!!errors.accountNumber}
                    disabled={isLoadingAccounts}
                  >
                    {isLoadingAccounts ? (
                      <MenuItem value="">
                        <em>Loading accounts...</em>
                      </MenuItem>
                    ) : (
                      accountsResponse?.data?.map((account) => (
                        <MenuItem key={account.accountNumber} value={account.accountNumber}>
                          {`${account.accountType.replace(/_/g, ' ')} (${account.accountNumber})`}
                        </MenuItem>
                      ))
                    )}
                  </Select>
                )}
              />
              {errors.accountNumber && <Alert severity="error" sx={{ mt: 1 }}>{errors.accountNumber.message}</Alert>}
            </FormControl>

            <Controller
              name="amount"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="normal"
                  required
                  fullWidth
                  label="Amount"
                  type="number"
                  error={!!errors.amount}
                  helperText={errors.amount?.message}
                />
              )}
            />

            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="normal"
                  fullWidth
                  label="Description (Optional)"
                  error={!!errors.description}
                  helperText={errors.description?.message}
                />
              )}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={!isDirty || !isValid || isLoading}
            >
              {isLoading ? <CircularProgress size={24} /> : 'Deposit'}
            </Button>
          </form>
        </Box>
      </Container>
    </DashboardLayout>
  );
};

export default DepositPage;

