import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Alert,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import DashboardLayout from "@/layouts/DashboardLayout";
import {
  useGetAccountsQuery,
  useWithdrawMutation,
} from "@/features/accounts/store/accountsApi";
import { useToast } from '@/utils/snackbarUtils';

const schema = yup.object().shape({
  accountNumber: yup.string().required("Account is required"),
  amount: yup
    .number()
    .typeError("Amount must be a number")
    .positive("Amount must be positive")
    .required("Amount is required"),
});

interface IWithdrawForm {
  accountNumber: string;
  amount: number;
}

const WithdrawPage: React.FC = () => {
  const { data: accountsResponse, isLoading: isLoadingAccounts } =
    useGetAccountsQuery();
  const [
    withdraw,
    { isLoading, isSuccess, isError, error, reset: resetMutation },
  ] = useWithdrawMutation();
  const toast = useToast();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm<IWithdrawForm>({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: { accountNumber: "", amount: 0 },
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success('Withdrawal successful!');
      reset();
      resetMutation();
    }
    if (isError) {
      const apiError = error as any;
      toast.error(apiError.data?.message || 'Withdrawal failed.');
    }
  }, [isSuccess, isError, error, reset, resetMutation, toast]);

  const onSubmit = (data: IWithdrawForm) => {
    withdraw(data);
  };

  return (
    <DashboardLayout>
      <Container maxWidth="sm">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Withdraw Funds
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <FormControl fullWidth margin="normal">
              <InputLabel id="account-select-label">From Account</InputLabel>
              <Controller
                name="accountNumber"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    labelId="account-select-label"
                    label="From Account"
                    error={!!errors.accountNumber}
                    disabled={isLoadingAccounts}
                  >
                    {isLoadingAccounts ? (
                      <MenuItem value="">
                        <em>Loading accounts...</em>
                      </MenuItem>
                    ) : (
                      accountsResponse?.data?.map((account) => (
                        <MenuItem
                          key={account.accountNumber}
                          value={account.accountNumber}
                        >
                          {`${account.accountType.replace(/_/g, " ")} (${
                            account.accountNumber
                          })`}
                        </MenuItem>
                      ))
                    )}
                  </Select>
                )}
              />
              {errors.accountNumber && (
                <Alert severity="error" sx={{ mt: 1 }}>
                  {errors.accountNumber.message}
                </Alert>
              )}
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

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={!isDirty || !isValid || isLoading}
            >
              {isLoading ? <CircularProgress size={24} /> : "Withdraw"}
            </Button>
          </form>
        </Box>
      </Container>
    </DashboardLayout>
  );
};

export default WithdrawPage;
