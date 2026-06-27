import React from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
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
  Alert,
} from "@mui/material";
import {
  AddShoppingCart as ApplyIcon,
  AccountBalance as AccountBalanceIcon,
  AttachMoney as MoneyIcon,
  Description as DescriptionIcon,
  LockClock as LockIcon,
  Business as BusinessIcon,
} from "@mui/icons-material";
import DashboardLayout from "@/layouts/DashboardLayout";
import { PageHeader, LoadingOverlay } from "@/components";
import {
  DepositFormCard,
  DepositSubmitButton,
  PrimaryIconAvatar,
  SuccessIconAvatar,
  NeutralIconAvatar,
} from "../components/styles";
import {
  IRequestAccountForm,
  requestAccountSchema,
} from "../validations/accountValidation";
import {
  useGetAccountsQuery,
  useRequestAccountMutation,
} from "../store/accountsApi";
import { useToast } from "@/utils/snackbarUtils";
import { useNavigate } from "react-router-dom";

const ApplyForNewProductPage: React.FC = () => {
  const navigate = useNavigate();
  const { success, error: showToastError } = useToast();

  const {
    data: accountsResponse,
    isLoading: isFetchingAccounts,
    error: accountsError,
  } = useGetAccountsQuery();

  const [requestAccount, { isLoading: isRequesting }] =
    useRequestAccountMutation();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isDirty, isValid },
  } = useForm<IRequestAccountForm>({
    resolver: yupResolver(requestAccountSchema),
    defaultValues: {
      accountType: "current",
      branch: "",
      amount: "",
    },
  });

  const selectedAccountType = watch("accountType");

  const onSubmit = async (data: IRequestAccountForm) => {
    try {
      const submitData = {
        ...data,
        amount: Number(data.amount),
      } as any;
      await requestAccount(submitData).unwrap();
      success("Account request submitted successfully! Waiting for approval.");
      navigate("/dashboard");
    } catch (error: any) {
      showToastError(
        error?.data?.message || "Failed to submit account request",
      );
    }
  };

  return (
    <DashboardLayout>
      <LoadingOverlay loading={isFetchingAccounts} />
      <Container maxWidth="md">
        <Box sx={{ my: 4 }}>
          <PageHeader
            title="Apply for New Product"
            subtitle="Request a new Current Account, Business Account, or Fixed Deposit"
            icon={<ApplyIcon fontSize="large" />}
            colorScheme="primary"
          />

          {accountsError && (
            <Alert severity="error" sx={{ mb: 4 }}>
              Failed to load accounts
            </Alert>
          )}

          <DepositFormCard>
            <CardContent sx={{ p: 4 }}>
              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <Grid container spacing={3}>
                  {/* Account Type Selection */}
                  <Grid item xs={12}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <PrimaryIconAvatar>
                        <AccountBalanceIcon sx={{ color: "primary.main" }} />
                      </PrimaryIconAvatar>
                      <Typography
                        variant="h6"
                        sx={{ color: "primary.main", fontWeight: 600 }}
                      >
                        Select Product
                      </Typography>
                    </Box>
                    <Controller
                      name="accountType"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          select
                          label="Choose Product"
                          fullWidth
                          error={!!errors.accountType}
                          helperText={
                            errors.accountType?.message ||
                            "Select which product you want to apply for"
                          }
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: 2,
                            },
                          }}
                        >
                          <MenuItem value="current">Current Account</MenuItem>
                          <MenuItem value="business">Business Account</MenuItem>
                          <MenuItem value="fixed_deposit">
                            Fixed Deposit
                          </MenuItem>
                        </TextField>
                      )}
                    />
                  </Grid>

                  {/* Branch Selection */}
                  <Grid item xs={12}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <NeutralIconAvatar>
                        <DescriptionIcon sx={{ color: "text.secondary" }} />
                      </NeutralIconAvatar>
                      <Typography
                        variant="h6"
                        sx={{ color: "text.secondary", fontWeight: 600 }}
                      >
                        Branch
                      </Typography>
                    </Box>
                    <Controller
                      name="branch"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          select
                          label="Choose Branch"
                          fullWidth
                          error={!!errors.branch}
                          helperText={
                            errors.branch?.message ||
                            "Select your preferred branch"
                          }
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: 2,
                            },
                          }}
                        >
                          <MenuItem value="">
                            <em>Choose branch</em>
                          </MenuItem>
                          <MenuItem value="500">
                            Kuala Lumpur / Selangor
                          </MenuItem>
                          <MenuItem value="300">Johor</MenuItem>
                          <MenuItem value="700">Penang</MenuItem>
                          <MenuItem value="100">Pahang</MenuItem>
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
                        Initial Deposit / Principal
                      </Typography>
                    </Box>
                    <Controller
                      name="amount"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Amount (RM)"
                          type="number"
                          fullWidth
                          placeholder="0.00"
                          inputProps={{
                            min:
                              selectedAccountType === "current"
                                ? 20
                                : selectedAccountType === "business"
                                  ? 500
                                  : 1000,
                            step: 0.01,
                            "aria-label": "Initial deposit amount",
                          }}
                          error={!!errors.amount}
                          helperText={
                            errors.amount?.message ||
                            `Enter the initial deposit amount (min: RM${
                              selectedAccountType === "current"
                                ? 20
                                : selectedAccountType === "business"
                                  ? 500
                                  : 1000
                            })`
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

                  {/* FD Specific Fields */}
                  {selectedAccountType === "fixed_deposit" && (
                    <>
                      <Grid item xs={12} md={6}>
                        <Box
                          sx={{ display: "flex", alignItems: "center", mb: 2 }}
                        >
                          <NeutralIconAvatar>
                            <LockIcon sx={{ color: "text.secondary" }} />
                          </NeutralIconAvatar>
                          <Typography
                            variant="h6"
                            sx={{ color: "text.secondary", fontWeight: 600 }}
                          >
                            Lock Period
                          </Typography>
                        </Box>
                        <Controller
                          name="lockPeriod"
                          control={control}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              select
                              label="Lock Period (Months)"
                              fullWidth
                              error={!!errors.lockPeriod}
                              helperText={
                                errors.lockPeriod?.message ||
                                "Select lock period"
                              }
                              sx={{
                                "& .MuiOutlinedInput-root": {
                                  borderRadius: 2,
                                },
                              }}
                            >
                              <MenuItem value="">
                                <em>Choose lock period</em>
                              </MenuItem>
                              <MenuItem value={1}>1 month</MenuItem>
                              <MenuItem value={3}>3 months</MenuItem>
                              <MenuItem value={6}>6 months</MenuItem>
                              <MenuItem value={12}>12 months</MenuItem>
                            </TextField>
                          )}
                        />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <Box
                          sx={{ display: "flex", alignItems: "center", mb: 2 }}
                        >
                          <PrimaryIconAvatar>
                            <AccountBalanceIcon
                              sx={{ color: "primary.main" }}
                            />
                          </PrimaryIconAvatar>
                          <Typography
                            variant="h6"
                            sx={{ color: "primary.main", fontWeight: 600 }}
                          >
                            Linked Account
                          </Typography>
                        </Box>
                        <Controller
                          name="linkedAccount"
                          control={control}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              select
                              label="Linked Account"
                              fullWidth
                              error={!!errors.linkedAccount}
                              helperText={
                                errors.linkedAccount?.message ||
                                "Select linked account"
                              }
                              sx={{
                                "& .MuiOutlinedInput-root": {
                                  borderRadius: 2,
                                },
                              }}
                            >
                              <MenuItem value="">
                                <em>Choose linked account</em>
                              </MenuItem>
                              {accountsResponse?.data
                                ?.filter(
                                  (account) =>
                                    account.accountType !== "fixed_deposit",
                                )
                                .map((account) => (
                                  <MenuItem
                                    key={account.accountNumber}
                                    value={account.accountNumber}
                                  >
                                    {account.accountNumber}
                                  </MenuItem>
                                ))}
                            </TextField>
                          )}
                        />
                      </Grid>
                    </>
                  )}

                  {/* Business Specific Field */}
                  {selectedAccountType === "business" && (
                    <Grid item xs={12}>
                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 2 }}
                      >
                        <NeutralIconAvatar>
                          <BusinessIcon sx={{ color: "text.secondary" }} />
                        </NeutralIconAvatar>
                        <Typography
                          variant="h6"
                          sx={{ color: "text.secondary", fontWeight: 600 }}
                        >
                          Company Registration Document
                        </Typography>
                      </Box>
                      <Controller
                        name="companyRegistrationDoc"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="Company Registration Number / Document"
                            fullWidth
                            error={!!errors.companyRegistrationDoc}
                            helperText={
                              errors.companyRegistrationDoc?.message ||
                              "Enter company registration number"
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
                  )}

                  {/* Submit Button */}
                  <Grid item xs={12}>
                    <DepositSubmitButton
                      type="submit"
                      variant="contained"
                      disabled={!isDirty || !isValid || isRequesting}
                      fullWidth
                      size="large"
                      startIcon={
                        isRequesting ? (
                          <CircularProgress size={20} />
                        ) : (
                          <ApplyIcon />
                        )
                      }
                    >
                      {isRequesting
                        ? "Submitting Request..."
                        : "Submit Application"}
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

export default ApplyForNewProductPage;
