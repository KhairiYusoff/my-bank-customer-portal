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
import type { ExpenseFormData } from "../validations/expenseValidation";
import type { Account } from "@/features/accounts/types/account";
import type { ExpenseCategory, PaymentMethod } from "../types/expense";
import ConfirmDialog from "./dialogs/ConfirmDialog";

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
  const selectedCategory = watch("category");
  const selectedAccount = watch("account");

  // Get subcategories for selected category
  const getSubcategories = () => {
    const category = categories.find((cat) => cat.value === selectedCategory);
    return category?.subcategories || [];
  };

  // Get selected account details
  const getSelectedAccount = () => {
    return accounts.find((acc) => acc._id === selectedAccount);
  };

  return (
    <>
      <Card sx={{ borderRadius: 3, boxShadow: '0 8px 32px rgba(0, 80, 158, 0.08)' }}>
        <CardContent sx={{ p: 4 }}>
          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Box display="flex" alignItems="center" mb={3}>
              <Avatar sx={{ bgcolor: "primary.main", mr: 2 }}>
                <ExpenseIcon />
              </Avatar>
              <Typography variant="h6" component="h2">
                Create New Expense
              </Typography>
            </Box>

            <Grid container spacing={3}>
              {/* Amount */}
              <Grid item xs={12} md={6}>
                <TextField
                  {...register("amount", { valueAsNumber: true })}
                  label="Amount"
                  type="number"
                  fullWidth
                  variant="outlined"
                  error={!!errors.amount}
                  helperText={errors.amount?.message || "Enter a positive amount"}
                  InputProps={{
                    startAdornment: <MoneyIcon sx={{ mr: 1, color: "text.secondary" }} />,
                    inputProps: { 
                      step: "0.01", 
                      min: "0.01",
                      max: "999999.99",
                      onInput: (e: React.ChangeEvent<HTMLInputElement>) => {
                        // Remove any non-numeric characters except decimal point
                        e.target.value = e.target.value.replace(/[^0-9.]/g, '');
                        // Prevent multiple decimal points
                        const parts = e.target.value.split('.');
                        if (parts.length > 2) {
                          e.target.value = parts[0] + '.' + parts.slice(1).join('');
                        }
                        // Remove leading zeros (except for "0.x" format)
                        if (e.target.value.startsWith('0') && e.target.value.length > 1 && !e.target.value.startsWith('0.')) {
                          e.target.value = String(parseFloat(e.target.value) || '0');
                        }
                      }
                    },
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    }
                  }}
                />
              </Grid>

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
                    startAdornment: <DateIcon sx={{ mr: 1, color: "text.secondary" }} />,
                    inputProps: { max: new Date().toISOString().split("T")[0] },
                  }}
                />
              </Grid>

              {/* Transaction Details */}
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ backgroundColor: 'rgba(0, 80, 158, 0.1)', mr: 2 }}>
                    <CategoryIcon sx={{ color: '#00509e' }} />
                  </Avatar>
                  <Typography variant="h6" sx={{ color: '#00509e', fontWeight: 600 }}>
                    Transaction Details
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  {...register("category")}
                  label="Category"
                  select
                  fullWidth
                  variant="outlined"
                  error={!!errors.category}
                  helperText={errors.category?.message}
                  InputProps={{
                    startAdornment: <CategoryIcon sx={{ mr: 1, color: "text.secondary" }} />,
                  }}
                >
                  {categories.map((category) => (
                    <MenuItem key={category.value} value={category.value}>
                      {category.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              {/* Subcategory */}
              <Grid item xs={12} md={6}>
                <TextField
                  {...register("subCategory")}
                  label="Subcategory (Optional)"
                  select
                  fullWidth
                  variant="outlined"
                  error={!!errors.subCategory}
                  helperText={errors.subCategory?.message}
                  disabled={!selectedCategory}
                  InputProps={{
                    startAdornment: <CategoryIcon sx={{ mr: 1, color: "text.secondary" }} />,
                  }}
                >
                  <MenuItem value="">None</MenuItem>
                  {getSubcategories().map((subcategory) => (
                    <MenuItem key={subcategory.value} value={subcategory.value}>
                      {subcategory.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

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
                    startAdornment: <PaymentIcon sx={{ mr: 1, color: "text.secondary" }} />,
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
                    startAdornment: <DescriptionIcon sx={{ mr: 1, color: "text.secondary" }} />,
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
                    startAdornment: <NotesIcon sx={{ mr: 1, alignSelf: "flex-start", mt: 2, color: "text.secondary" }} />,
                  }}
                />
              </Grid>

              {/* Merchant Info */}
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={4}>
                    <TextField
                      {...register("merchant.name")}
                      label="Merchant Name"
                      fullWidth
                      variant="outlined"
                      error={!!errors.merchant?.name}
                      helperText={errors.merchant?.name?.message}
                      InputProps={{
                        startAdornment: <MerchantIcon sx={{ mr: 1, color: "text.secondary" }} />,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      {...register("merchant.location")}
                      label="Location"
                      fullWidth
                      variant="outlined"
                      error={!!errors.merchant?.location}
                      helperText={errors.merchant?.location?.message}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      {...register("merchant.receiptNumber")}
                      label="Receipt Number"
                      fullWidth
                      variant="outlined"
                      error={!!errors.merchant?.receiptNumber}
                      helperText={errors.merchant?.receiptNumber?.message}
                    />
                  </Grid>
                </Grid>
              </Grid>

              {/* Action Buttons */}
              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
                <Stack direction="row" spacing={2} justifyContent="flex-end">
                  <Button
                    variant="outlined"
                    onClick={onCancel}
                    disabled={isLoading}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={!isDirty || !isValid || isLoading}
                    startIcon={isLoading ? <CircularProgress size={20} /> : <ExpenseIcon />}
                  >
                    {isLoading ? "Creating..." : "Create Expense"}
                  </Button>
                                  </Stack>
              </Grid>
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
        selectedAccount={getSelectedAccount()}
      />
    </>
  );
};

export default ExpenseForm;
