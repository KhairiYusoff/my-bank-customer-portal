import React from "react";
import { TextField, Grid } from "@mui/material";
import {
  Store as MerchantIcon,
  LocationOn as LocationIcon,
  ReceiptLong as ReceiptNumberIcon,
} from "@mui/icons-material";
import { Controller } from "react-hook-form";
import type { Control } from "react-hook-form";

interface MerchantInfoProps {
  control: Control<any>;
  error?: any;
}

const MerchantInfo: React.FC<MerchantInfoProps> = ({ control, error }) => {
  return (
    <Grid item xs={12}>
      <Grid container spacing={2}>
        {/* Merchant Name */}
        <Grid item xs={12} md={4}>
          <Controller
            name="merchant.name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Merchant Name"
                fullWidth
                variant="outlined"
                error={!!error?.name}
                helperText={error?.name?.message}
                InputProps={{
                  startAdornment: (
                    <MerchantIcon sx={{ mr: 1, color: "text.secondary" }} />
                  ),
                }}
              />
            )}
          />
        </Grid>

        {/* Location */}
        <Grid item xs={12} md={4}>
          <Controller
            name="merchant.location"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Location"
                fullWidth
                variant="outlined"
                error={!!error?.location}
                helperText={error?.location?.message}
              />
            )}
          />
        </Grid>

        {/* Receipt Number */}
        <Grid item xs={12} md={4}>
          <Controller
            name="merchant.receiptNumber"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Receipt Number"
                fullWidth
                variant="outlined"
                error={!!error?.receiptNumber}
                helperText={error?.receiptNumber?.message}
              />
            )}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MerchantInfo;
