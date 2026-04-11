import React from "react";
import { TextField, Grid } from "@mui/material";
import { Store as MerchantIcon, LocationOn as LocationIcon, ReceiptLong as ReceiptNumberIcon } from "@mui/icons-material";
import type { UseFormRegister, FieldErrors } from "react-hook-form";

interface MerchantInfoProps {
  register: UseFormRegister<any>;
  error?: any;
}

const MerchantInfo: React.FC<MerchantInfoProps> = ({ register, error }) => {
  return (
    <Grid item xs={12}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <TextField
            {...register("merchant.name")}
            label="Merchant Name"
            fullWidth
            variant="outlined"
            error={!!error?.name}
            helperText={error?.name?.message}
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
            error={!!error?.location}
            helperText={error?.location?.message}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            {...register("merchant.receiptNumber")}
            label="Receipt Number"
            fullWidth
            variant="outlined"
            error={!!error?.receiptNumber}
            helperText={error?.receiptNumber?.message}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MerchantInfo;
