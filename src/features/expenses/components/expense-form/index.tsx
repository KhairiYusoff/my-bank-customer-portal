import React from "react";
import type {
  Control,
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";
import {
  Box,
  Button,
  TextField,
  CircularProgress,
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
  Receipt as ExpenseIcon,
  AttachMoney as MoneyIcon,
  Event as DateIcon,
  Payment as PaymentIcon,
  Category as CategoryIcon,
  Description as DescriptionIcon,
  Store as MerchantIcon,
  LocationOn as LocationIcon,
  ReceiptLong as ReceiptNumberIcon,
  Notes as NotesIcon,
} from "@mui/icons-material";
import type { ExpenseFormData } from "../../validations/expenseValidation";
import type { Account } from "@/features/accounts/types/account";
import type { ExpenseCategory, PaymentMethod } from "../../types/expense";
import ConfirmDialog from "../dialogs/ConfirmDialog";
import AmountField from "../fields/AmountField";
import CategorySelect from "../fields/CategorySelect";
import MerchantInfo from "../fields/MerchantInfo";
import FormActions from "../fields/FormActions";

export type FormValues = ExpenseFormData;

interface ExpenseFormProps {
  accounts: Account[];
  categories: ExpenseCategory[];
  paymentMethods: PaymentMethod[];
  isLoading: boolean;
  isDirty: boolean;
  isValid: boolean;
  openConfirm: boolean;
  expenseData: FormValues | null;
  control: Control<FormValues>;
  register: UseFormRegister<FormValues>;
  handleSubmit: UseFormHandleSubmit<FormValues>;
  watch: UseFormWatch<FormValues>;
  errors: FieldErrors<FormValues>;
  onSubmit: (values: FormValues) => void;
  onConfirm: () => void;
  onCancel: () => void;
  onCloseConfirm: () => void;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({
  accounts,
  categories,
  paymentMethods,
  isLoading,
  isDirty,
  isValid,
  openConfirm,
  expenseData,
  control,
  register,
  handleSubmit,
  watch,
  errors,
  onSubmit,
  onConfirm,
  onCancel,
  onCloseConfirm,
}) => {
  return (
    <>
      <Card
        sx={{ borderRadius: 3, boxShadow: "0 8px 32px rgba(0, 80, 158, 0.08)" }}
      >
        <CardContent sx={{ p: 4 }}>
          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              {/* Amount */}
              <AmountField register={register} error={errors.amount} />

              {/* Date */}
              <Grid item xs={12} md={6}>
                <TextField
                  {...register("date")}
                  label="Date"
                  type="date"
                  fullWidth
                  variant="outlined"
                  error={!!errors.date}
                  helperText={errors.date?.message}
                  InputProps={{
                    startAdornment: (
                      <DateIcon sx={{ mr: 1, color: "text.secondary" }} />
                    ),
                    inputProps: { max: new Date().toISOString().split("T")[0] },
                  }}
                />
              </Grid>

              <CategorySelect
                register={register}
                watch={watch}
                error={errors}
                categories={categories}
              />

              {/* Account */}
              <Grid item xs={12} md={6}>
                <TextField
                  {...register("account")}
                  label="Account"
                  select
                  fullWidth
                  variant="outlined"
                  error={!!errors.account}
                  helperText={errors.account?.message}
                  InputProps={{
                    startAdornment: <AccountBalanceIcon sx={{ mr: 1, color: "text.secondary" }} />,
                  }}
                >
                  {accounts.map((account) => (
                    <MenuItem key={account._id} value={account._id}>
                      {account.accountNumber} - {account.accountType} (RM{account.balance.toLocaleString()})
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              {/* Payment Method */}
              <Grid item xs={12} md={6}>
                <TextField
                  {...register("paymentMethod")}
                  label="Payment Method"
                  select
                  fullWidth
                  variant="outlined"
                  error={!!errors.paymentMethod}
                  helperText={errors.paymentMethod?.message}
                  InputProps={{
                    startAdornment: (
                      <PaymentIcon sx={{ mr: 1, color: "text.secondary" }} />
                    ),
                  }}
                >
                  {paymentMethods.map((method) => (
                    <MenuItem key={method.value} value={method.value}>
                      {method.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              {/* Description */}
              <Grid item xs={12}>
                <TextField
                  {...register("description")}
                  label="Description"
                  fullWidth
                  variant="outlined"
                  error={!!errors.description}
                  helperText={errors.description?.message}
                  InputProps={{
                    startAdornment: (
                      <DescriptionIcon
                        sx={{ mr: 1, color: "text.secondary" }}
                      />
                    ),
                  }}
                />
              </Grid>

              {/* Notes */}
              <Grid item xs={12}>
                <TextField
                  {...register("notes")}
                  label="Notes (Optional)"
                  multiline
                  rows={3}
                  fullWidth
                  variant="outlined"
                  error={!!errors.notes}
                  helperText={errors.notes?.message || "Maximum 500 characters"}
                  InputProps={{
                    startAdornment: (
                      <NotesIcon
                        sx={{
                          mr: 1,
                          alignSelf: "flex-start",
                          mt: 2,
                          color: "text.secondary",
                        }}
                      />
                    ),
                  }}
                />
              </Grid>

              {/* Merchant Info */}
              <MerchantInfo 
                register={register}
                error={errors.merchant}
              />

              {/* Action Buttons */}
              <FormActions
                isDirty={isDirty}
                isValid={isValid}
                isLoading={isLoading}
                onCancel={onCancel}
                onSubmit={handleSubmit(onSubmit)}
              />
            </Grid>
          </Box>
        </CardContent>
      </Card>

      {/* Confirmation Dialog */}
      <ConfirmDialog
        open={openConfirm}
        onClose={onCloseConfirm}
        onConfirm={onConfirm}
        isLoading={isLoading}
        expenseData={expenseData}
        categories={categories}
        selectedAccount={accounts.find((acc) => acc._id === watch("account"))}
      />
    </>
  );
};

export default ExpenseForm;
