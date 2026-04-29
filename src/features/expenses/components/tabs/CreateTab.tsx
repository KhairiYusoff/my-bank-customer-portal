import React from "react";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import { AccountBalance as AccountBalanceIcon } from "@mui/icons-material";
import ExpenseForm, { FormValues } from "../expense-form";
import type { Account } from "@/features/accounts/types/account";
import type { ExpenseCategory, PaymentMethod } from "../../types/expense";

interface CreateTabProps {
  accounts: Account[];
  categories: ExpenseCategory[];
  paymentMethods: PaymentMethod[];
  isLoading: boolean;
  isDirty: boolean;
  isValid: boolean;
  openConfirm: boolean;
  expenseData: FormValues | null;
  control: any;
  handleSubmit: any;
  errors: any;
  onSubmit: (values: FormValues) => void;
  onConfirm: () => void;
  onCancel: () => void;
  onCloseConfirm: () => void;
}

const CreateTab: React.FC<CreateTabProps> = ({
  accounts,
  categories,
  paymentMethods,
  isLoading,
  isDirty,
  isValid,
  openConfirm,
  expenseData,
  control,
  handleSubmit,
  errors,
  onSubmit,
  onConfirm,
  onCancel,
  onCloseConfirm,
}) => {
  return (
    <>
      {accounts.length === 0 ? (
        <Card elevation={0} sx={{ textAlign: "center", py: 8 }}>
          <AccountBalanceIcon
            sx={{ fontSize: 64, color: "text.secondary", mb: 2 }}
          />
          <Typography variant="h6" gutterBottom>
            No Accounts Available
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            You need at least one account to create expenses. Contact support to
            open an account.
          </Typography>
          <Button variant="contained" href="/contact-us">
            Contact Support
          </Button>
        </Card>
      ) : (
        <ExpenseForm
          accounts={accounts}
          categories={categories}
          paymentMethods={paymentMethods}
          isLoading={isLoading}
          isDirty={isDirty}
          isValid={isValid}
          openConfirm={openConfirm}
          expenseData={expenseData}
          control={control}
          handleSubmit={handleSubmit}
          errors={errors}
          onSubmit={onSubmit}
          onConfirm={onConfirm}
          onCancel={onCancel}
          onCloseConfirm={onCloseConfirm}
        />
      )}
    </>
  );
};

export default CreateTab;
