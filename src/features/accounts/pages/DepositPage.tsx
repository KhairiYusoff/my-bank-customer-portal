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
  Paper,
  Avatar,
  Grid,
} from "@mui/material";
import {
  Add as DepositIcon,
  AccountBalance as AccountBalanceIcon,
  AttachMoney as MoneyIcon,
  Description as DescriptionIcon,
} from "@mui/icons-material";
import DashboardLayout from "@/layouts/DashboardLayout";
import { useDepositForm } from "../hooks/useDepositForm";
import { PageHeader, EmptyState } from "../components";
import {
  DepositFormCard,
  DepositSubmitButton,
  PrimaryIconAvatar,
  SuccessIconAvatar,
  NeutralIconAvatar,
} from "../components/styles";

const DepositPage: React.FC = () => {
  const {
    control,
    handleSubmit,
    errors,
    isDirty,
    isValid,
    isLoading,
    isLoadingAccounts,
    accountsResponse,
    onSubmit,
  } = useDepositForm();

  if (isLoadingAccounts) {
    return (
      <DashboardLayout>
        <Container maxWidth="md">
          <Box sx={{ my: 4 }}>
            <Paper sx={{ textAlign: "center", py: 6 }}>
              <CircularProgress size={60} />
              <Typography variant="h6" sx={{ mt: 2, color: "text.secondary" }}>
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
            <EmptyState
              icon={<AccountBalanceIcon />}
              title="No Accounts Available"
              description="You need at least one account to make deposits."
            />
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
          <PageHeader
            title="Deposit Funds"
            subtitle="Add money to your account securely"
            icon={<DepositIcon fontSize="large" />}
            colorScheme="success"
          />

          {/* Deposit Form */}
          <DepositFormCard>
            <CardContent sx={{ p: 4 }}>
              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <Grid container spacing={3}>
                  {/* Account Selection */}
                  <Grid item xs={12}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <PrimaryIconAvatar>
                        <AccountBalanceIcon sx={{ color: "primary.main" }} />
                      </PrimaryIconAvatar>
                      <Typography
                        variant="h6"
                        sx={{ color: "primary.main", fontWeight: 600 }}
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
                          label="Choose Account to Deposit"
                          fullWidth
                          error={!!errors.accountNumber}
                          helperText={
                            errors.accountNumber?.message ||
                            "Select which account to deposit funds into"
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
                                  Balance: $
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
                      <SuccessIconAvatar>
                        <MoneyIcon sx={{ color: "success.main" }} />
                      </SuccessIconAvatar>
                      <Typography
                        variant="h6"
                        sx={{ color: "success.main", fontWeight: 600 }}
                      >
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
                            "aria-label": "Deposit amount",
                          }}
                          error={!!errors.amount}
                          helperText={
                            errors.amount?.message ||
                            "Enter the amount to deposit"
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

                  {/* Description */}
                  <Grid item xs={12}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <NeutralIconAvatar>
                        <DescriptionIcon sx={{ color: "text.secondary" }} />
                      </NeutralIconAvatar>
                      <Typography
                        variant="h6"
                        sx={{ color: "text.secondary", fontWeight: 600 }}
                      >
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
                          helperText={
                            errors.description?.message ||
                            "Optional description for your records"
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
                    <DepositSubmitButton
                      type="submit"
                      variant="contained"
                      disabled={!isDirty || !isValid || isLoading}
                      fullWidth
                      size="large"
                      startIcon={
                        isLoading ? (
                          <CircularProgress size={20} />
                        ) : (
                          <DepositIcon />
                        )
                      }
                    >
                      {isLoading ? "Processing Deposit..." : "Deposit Funds"}
                    </DepositSubmitButton>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </DepositFormCard>
        </Box>
      </Container>
    </DashboardLayout>
  );
};

export default DepositPage;
