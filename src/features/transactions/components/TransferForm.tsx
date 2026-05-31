import React from "react";
import { Controller } from "react-hook-form";
import type {
  Control,
  FieldErrors,
  UseFormHandleSubmit,
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
  NoteAlt as MemoIcon,
} from "@mui/icons-material";
import type { ITransferForm } from "../validations/transferValidation";
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
  NeutralIconAvatar,
} from "./styles";

interface TransferFormProps {
  accounts: Account[];
  isLoading: boolean;
  isDirty: boolean;
  isValid: boolean;
  openConfirm: boolean;
  transferData: ITransferForm | null;
  control: Control<ITransferForm>;
  handleSubmit: UseFormHandleSubmit<ITransferForm>;
  errors: FieldErrors<ITransferForm>;
  onSubmit: (values: ITransferForm) => void;
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
  handleSubmit,
  errors,
  onSubmit,
  handleCloseConfirm,
  handleConfirmTransfer,
}) => {
  const formatAccountOption = (account: Account) => {
    return `${account.accountNumber} (${account.accountType.replace(/_/g, " ")} - $${account.balance?.toFixed(2) || "0.00"})`;
  };

  const getSelectedAccount = (accountNumber: string) => {
    return accounts.find((acc) => acc.accountNumber === accountNumber);
  };

  return (
    <>
      <TransferFormCard>
        <CardContent sx={{ p: 4 }}>
          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              {/* From Account */}
              <Grid item xs={12}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <PrimaryIconAvatar sx={{ mr: 2 }}>
                    <AccountBalanceIcon sx={{ color: "primary.main" }} />
                  </PrimaryIconAvatar>
                  <Typography
                    variant="h6"
                    sx={{ color: "primary.main", fontWeight: 600 }}
                  >
                    From Account
                  </Typography>
                </Box>
                <Controller
                  name="fromAccountNumber"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      select
                      label="Select Source Account"
                      fullWidth
                      error={!!errors.fromAccountNumber}
                      helperText={errors.fromAccountNumber?.message}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                        },
                      }}
                    >
                      <MenuItem value="">
                        <em>Choose your account</em>
                      </MenuItem>
                      {accounts.map((account) => (
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
                              Balance: ${account.balance?.toFixed(2) || "0.00"}
                            </Typography>
                          </Box>
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Grid>

              {/* Transfer Icon */}
              <Grid item xs={12}>
                <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
                  <TransferIconAvatar>
                    <TransferIcon />
                  </TransferIconAvatar>
                </Box>
                <Divider />
              </Grid>

              {/* To Account */}
              <Grid item xs={12}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <InfoIconAvatar sx={{ mr: 2 }}>
                    <SendIcon sx={{ color: "info.main" }} />
                  </InfoIconAvatar>
                  <Typography
                    variant="h6"
                    sx={{ color: "info.main", fontWeight: 600 }}
                  >
                    To Account
                  </Typography>
                </Box>
                <Controller
                  name="toAccountNumber"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Destination Account Number"
                      fullWidth
                      placeholder="Enter recipient account number"
                      error={!!errors.toAccountNumber}
                      helperText={
                        errors.toAccountNumber?.message ||
                        "Enter the account number you want to transfer to"
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

              {/* Amount */}
              <Grid item xs={12}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <WarningIconAvatar sx={{ mr: 2 }}>
                    <MoneyIcon sx={{ color: "warning.main" }} />
                  </WarningIconAvatar>
                  <Typography
                    variant="h6"
                    sx={{ color: "warning.main", fontWeight: 600 }}
                  >
                    Transfer Amount
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
                        "aria-label": "Transfer amount",
                      }}
                      error={!!errors.amount}
                      helperText={
                        errors.amount?.message || "Enter the amount to transfer"
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

              {/* Memo */}
              <Grid item xs={12}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <NeutralIconAvatar sx={{ mr: 2 }}>
                    <MemoIcon sx={{ color: "text.secondary" }} />
                  </NeutralIconAvatar>
                  <Typography
                    variant="h6"
                    sx={{ color: "text.secondary", fontWeight: 600 }}
                  >
                    Memo (Optional)
                  </Typography>
                </Box>
                <Controller
                  name="memo"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Memo"
                      fullWidth
                      placeholder="Add a note for this transfer (e.g. rent May)"
                      inputProps={{ maxLength: 255 }}
                      error={!!errors.memo}
                      helperText={errors.memo?.message}
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
                <TransferSubmitButton
                  type="submit"
                  variant="contained"
                  disabled={!isDirty || !isValid || isLoading}
                  fullWidth
                  size="large"
                  startIcon={
                    isLoading ? (
                      <CircularProgress size={20} />
                    ) : (
                      <TransferIcon />
                    )
                  }
                >
                  {isLoading ? "Processing..." : "Transfer Funds"}
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
          sx: { borderRadius: 3 },
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
              <Typography
                variant="subtitle2"
                color="text.secondary"
                gutterBottom
              >
                FROM ACCOUNT
              </Typography>
              <Typography variant="h6" sx={{ fontFamily: "monospace" }}>
                {transferData?.fromAccountNumber}
              </Typography>
              {getSelectedAccount(transferData?.fromAccountNumber || "") && (
                <Chip
                  label={`Balance: $${getSelectedAccount(transferData?.fromAccountNumber || "")?.balance?.toFixed(2)}`}
                  size="small"
                  color="primary"
                  variant="outlined"
                  sx={{ mt: 1 }}
                />
              )}
            </PrimaryDialogInfoBox>

            <InfoDialogInfoBox>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                gutterBottom
              >
                TO ACCOUNT
              </Typography>
              <Typography variant="h6" sx={{ fontFamily: "monospace" }}>
                {transferData?.toAccountNumber}
              </Typography>
            </InfoDialogInfoBox>

            <WarningDialogInfoBox>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                gutterBottom
              >
                TRANSFER AMOUNT
              </Typography>
              <Typography
                variant="h4"
                sx={{ fontWeight: "bold", color: "warning.main" }}
              >
                $
                {typeof transferData?.amount === "number"
                  ? transferData.amount.toFixed(2)
                  : transferData?.amount}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {getSelectedAccount(transferData?.fromAccountNumber || "")
                  ?.currency || "USD"}
              </Typography>
            </WarningDialogInfoBox>

            {transferData?.memo && (
              <PrimaryDialogInfoBox>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  gutterBottom
                >
                  MEMO
                </Typography>
                <Typography variant="body1">{transferData.memo}</Typography>
              </PrimaryDialogInfoBox>
            )}
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
            startIcon={
              isLoading ? <CircularProgress size={20} /> : <SendIcon />
            }
          >
            {isLoading ? "Processing..." : "Confirm Transfer"}
          </TransferConfirmButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TransferForm;
