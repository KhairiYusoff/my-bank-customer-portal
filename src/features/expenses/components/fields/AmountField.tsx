import React from "react";
import { TextField, Grid } from "@mui/material";
import { AttachMoney as MoneyIcon } from "@mui/icons-material";
import type { UseFormRegister, FieldErrors } from "react-hook-form";

interface AmountFieldProps {
  register: UseFormRegister<any>;
  error?: any;
}

const AmountField: React.FC<AmountFieldProps> = ({ register, error }) => {
  return (
    <Grid item xs={12} md={6}>
      <TextField
        {...register("amount", { valueAsNumber: true })}
        label="Amount"
        type="number"
        fullWidth
        variant="outlined"
        error={!!error}
        helperText={error?.message || "Enter a positive amount"}
        InputProps={{
          startAdornment: <MoneyIcon sx={{ mr: 1, color: "text.secondary" }} />,
          inputProps: {
            step: "0.01",
            min: "0.01",
            max: "999999.99",
            onInput: (e: React.ChangeEvent<HTMLInputElement>) => {
              // Remove any non-numeric characters except decimal point
              e.target.value = e.target.value.replace(/[^0-9.]/g, "");
              // Prevent multiple decimal points
              const parts = e.target.value.split(".");
              if (parts.length > 2) {
                e.target.value = parts[0] + "." + parts.slice(1).join("");
              }
              // Remove leading zeros (except for "0.x" format)
              if (
                e.target.value.startsWith("0") &&
                e.target.value.length > 1 &&
                !e.target.value.startsWith("0.")
              ) {
                e.target.value = String(parseFloat(e.target.value) || "0");
              }
            },
          },
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: 2,
          },
        }}
      />
    </Grid>
  );
};

export default AmountField;
