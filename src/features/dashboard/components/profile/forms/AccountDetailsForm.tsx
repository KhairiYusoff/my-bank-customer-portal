import React from "react";
import { Controller } from "react-hook-form";
import { Grid, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import type { Control } from "react-hook-form";
import type { UpdateProfileRequest } from "@features/dashboard/types/profile";

interface AccountDetailsFormProps {
  control: Control<UpdateProfileRequest>;
  editMode: boolean;
}

const accountTypeOptions = [
  { value: "savings", label: "Savings" },
  { value: "current", label: "Current" },
  { value: "fixed deposit", label: "Fixed Deposit" },
];

const purposeOfAccountOptions = [
  { value: "savings", label: "Savings" },
  { value: "salary credit", label: "Salary Credit" },
  { value: "investment", label: "Investment" },
  { value: "business", label: "Business" },
  { value: "education", label: "Education" },
  { value: "travel", label: "Travel" },
  { value: "others", label: "Others" },
];

const AccountDetailsForm: React.FC<AccountDetailsFormProps> = ({
  control,
  editMode,
}) => (
  <Grid container spacing={2}>
    {/* Account Type Field */}
    <Grid item xs={12} sm={6}>
      <Controller
        name="accountType"
        control={control}
        render={({ field }) => (
          <FormControl fullWidth>
            <InputLabel id="account-type-label">Account Type</InputLabel>
            <Select
              {...field}
              labelId="account-type-label"
              label="Account Type"
              disabled={!editMode}
            >
              {accountTypeOptions.map((opt) => (
                <MenuItem key={opt.value} value={opt.value}>
                  {opt.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      />
    </Grid>

    {/* Purpose of Account Field */}
    <Grid item xs={12} sm={6}>
      <Controller
        name="purposeOfAccount"
        control={control}
        render={({ field }) => (
          <FormControl fullWidth>
            <InputLabel id="purpose-of-account-label">
              Purpose of Account
            </InputLabel>
            <Select
              {...field}
              labelId="purpose-of-account-label"
              label="Purpose of Account"
              disabled={!editMode}
            >
              {purposeOfAccountOptions.map((opt) => (
                <MenuItem key={opt.value} value={opt.value}>
                  {opt.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      />
    </Grid>
  </Grid>
);

export default AccountDetailsForm;
