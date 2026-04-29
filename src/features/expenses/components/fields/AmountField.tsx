import React from "react";
import { TextField, Grid } from "@mui/material";
import { AttachMoney as MoneyIcon } from "@mui/icons-material";
import { Controller } from "react-hook-form";
import type { Control, FieldError } from "react-hook-form";

interface AmountFieldProps {
  control: Control<any>;
  error?: FieldError;
}

const AmountField: React.FC<AmountFieldProps> = ({ control, error }) => {
  return (
    <Grid item xs={12} md={6}>
      <Controller
        name="amount"
        control={control}
        render={({ field: { onChange, value, ...field } }) => (
          <TextField
            {...field}
            value={value ?? ""}
            onChange={(e) =>
              onChange((e.target as HTMLInputElement).valueAsNumber)
            }
            label="Amount"
            type="number"
            fullWidth
            variant="outlined"
            error={!!error}
            helperText={error?.message || "Enter a positive amount"}
            InputProps={{
              startAdornment: (
                <MoneyIcon sx={{ mr: 1, color: "text.secondary" }} />
              ),
              inputProps: {
                step: "0.01",
                min: "0.01",
                max: "999999.99",
                onInput: (e: React.ChangeEvent<HTMLInputElement>) => {
                  e.target.value = e.target.value.replace(/[^0-9.]/g, "");
                  const parts = e.target.value.split(".");
                  if (parts.length > 2) {
                    e.target.value = parts[0] + "." + parts.slice(1).join("");
                  }
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
        )}
      />
    </Grid>
  );
};

export default AmountField;
