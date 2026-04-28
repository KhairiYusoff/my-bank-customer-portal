import React from "react";
import { Controller } from "react-hook-form";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  CircularProgress,
  MenuItem,
  CardContent,
  Avatar,
  Grid,
} from "@mui/material";
import {
  Remove as WithdrawIcon,
  AccountBalance as AccountBalanceIcon,
  AttachMoney as MoneyIcon,
} from "@mui/icons-material";
import DashboardLayout from "@/layouts/DashboardLayout";
import { useWithdrawForm } from "../hooks/useWithdrawForm";
import { PageHeader, LoadingOverlay } from "@/components";
import { EmptyState } from "../components";
import {
  WithdrawFormCard,
  WithdrawSubmitButton,
  ErrorIconAvatar,
} from "../components/styles";

const WithdrawPage: React.FC = () => {
  const {
    control,
    handleSubmit,
    errors,
    isDirty,
    isValid,
    isLoading,
    isFetchingAccounts,
    accountsResponse,
    onSubmit,
  } = useWithdrawForm();

  if (!accountsResponse?.data?.length && !isFetchingAccounts) {
    return (
      <DashboardLayout>
        <Container maxWidth="md">
          <Box sx={{ my: 4 }}>
            <EmptyState
              icon={<AccountBalanceIcon />}
              title="No Accounts Available"
              description="You need at least one account to make withdrawals."
            />
          </Box>
        </Container>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <LoadingOverlay loading={isFetchingAccounts} />
      <Container maxWidth="md">
        <Box sx={{ my: 4 }}>
          {/* Header Section */}
          <PageHeader
            title="Withdraw Funds"
            subtitle="Safely withdraw money from your account"
            icon={<WithdrawIcon fontSize="large" />}
            colorScheme="error"
          />

          {/* Withdraw Form */}
          <WithdrawFormCard>
            <CardContent sx={{ p: 4 }}>
              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <Grid container spacing={3}>
                  {/* Account Selection */}
                  <Grid item xs={12}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <ErrorIconAvatar>
                        <AccountBalanceIcon sx={{ color: "error.main" }} />
                      </ErrorIconAvatar>
                      <Typography
                        variant="h6"
                        sx={{ color: "error.main", fontWeight: 600 }}
                      >
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
                          label="Choose Account to Withdraw From"
                          fullWidth
                          error={!!errors.accountNumber}
                          helperText={
                            errors.accountNumber?.message ||
                            "Select which account to withdraw funds from"
                          }
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: 2,
                            },
                          }}
                        >
                          <MenuItem value="">
                            <em>Choose your account</em>
                          </MenuItem>
                          {accountsResponse?.data?.map((account) => (
                            <MenuItem
                              key={account.accountNumber}
                              value={account.accountNumber}
                            >
                              <Box>
                                <Typography variant="subtitle2">
                                  {account.accountNumber}
                                </Typography>
                                <Typography
                                  variant="caption"
                                  color="text.secondary"
                                >
                                  {account.accountType.replace(/_/g, " ")} •
                                  Available: $
                                  {account.balance?.toFixed(2) || "0.00"}
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
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <ErrorIconAvatar>
                        <MoneyIcon sx={{ color: "error.main" }} />
                      </ErrorIconAvatar>
                      <Typography
                        variant="h6"
                        sx={{ color: "error.main", fontWeight: 600 }}
                      >
                        Withdrawal Amount
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
                            "aria-label": "Withdrawal amount",
                          }}
                          error={!!errors.amount}
                          helperText={
                            errors.amount?.message ||
                            "Enter the amount to withdraw"
                          }
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: 2,
                            },
                          }}
                        />
                      )}
                    />
                  </Grid>

                  {/* Submit Button */}
                  <Grid item xs={12}>
                    <WithdrawSubmitButton
                      type="submit"
                      variant="contained"
                      disabled={!isDirty || !isValid || isLoading}
                      fullWidth
                      size="large"
                      startIcon={
                        isLoading ? (
                          <CircularProgress size={20} />
                        ) : (
                          <WithdrawIcon />
                        )
                      }
                    >
                      {isLoading
                        ? "Processing Withdrawal..."
                        : "Withdraw Funds"}
                    </WithdrawSubmitButton>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </WithdrawFormCard>
        </Box>
      </Container>
    </DashboardLayout>
  );
};

export default WithdrawPage;
