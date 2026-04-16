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
  Card,
  CardContent,
  Paper,
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

const WithdrawPage: React.FC = () => {
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
  } = useWithdrawForm();

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
                  backgroundColor: 'rgba(211, 47, 47, 0.1)',
                  width: 80, 
                  height: 80, 
                  mx: 'auto',
                  mb: 2 
                }}>
                  <AccountBalanceIcon sx={{ fontSize: '2.5rem', color: '#d32f2f' }} />
                </Avatar>
                <Typography variant="h5" color="text.secondary" gutterBottom>
                  No Accounts Available
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  You need at least one account to make withdrawals.
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
            background: 'linear-gradient(135deg, #d32f2f 0%, #f44336 100%)',
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
                <WithdrawIcon fontSize="large" />
              </Avatar>
              <Box>
                <Typography 
                  variant="h4" 
                  component="h1"
                  sx={{ fontWeight: 'bold', mb: 1 }}
                >
                  Withdraw Funds
                </Typography>
                <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
                  Safely withdraw money from your account
                </Typography>
              </Box>
            </Box>
          </Paper>

          {/* Withdraw Form */}
          <Card sx={{ borderRadius: 3, boxShadow: '0 8px 32px rgba(211, 47, 47, 0.08)' }}>
            <CardContent sx={{ p: 4 }}>
              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <Grid container spacing={3}>
                  {/* Account Selection */}
                  <Grid item xs={12}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar sx={{ backgroundColor: 'rgba(211, 47, 47, 0.1)', mr: 2 }}>
                        <AccountBalanceIcon sx={{ color: '#d32f2f' }} />
                      </Avatar>
                      <Typography variant="h6" sx={{ color: '#d32f2f', fontWeight: 600 }}>
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
                          helperText={errors.accountNumber?.message || "Select which account to withdraw funds from"}
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
                                  {account.accountType.replace(/_/g, ' ')} • Available: ${account.balance?.toFixed(2) || '0.00'}
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
                      <Avatar sx={{ backgroundColor: 'rgba(244, 67, 54, 0.1)', mr: 2 }}>
                        <MoneyIcon sx={{ color: '#f44336' }} />
                      </Avatar>
                      <Typography variant="h6" sx={{ color: '#f44336', fontWeight: 600 }}>
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
                            'aria-label': 'Withdrawal amount'
                          }}
                          error={!!errors.amount}
                          helperText={errors.amount?.message || "Enter the amount to withdraw"}
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
                      startIcon={isLoading ? <CircularProgress size={20} /> : <WithdrawIcon />}
                      sx={{
                        mt: 3,
                        py: 2,
                        borderRadius: 2,
                        background: 'linear-gradient(135deg, #d32f2f 0%, #f44336 100%)',
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        '&:hover': {
                          background: 'linear-gradient(135deg, #d32f2f 20%, #f44336 80%)',
                        },
                        '&:disabled': {
                          background: 'rgba(0, 0, 0, 0.12)',
                        }
                      }}
                    >
                      {isLoading ? 'Processing Withdrawal...' : 'Withdraw Funds'}
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

export default WithdrawPage;
