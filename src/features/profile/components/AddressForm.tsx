import React from "react";
import { Controller } from "react-hook-form";
import { Grid, TextField } from "@mui/material";
import type { Control } from "react-hook-form";
import type { UpdateProfileRequest } from "@/features/profile/types/profile";

interface AddressFormProps {
  control: Control<UpdateProfileRequest>;
  editMode: boolean;
}

const AddressForm: React.FC<AddressFormProps> = ({ control, editMode }) => (
  <Grid container spacing={2}>
    {/* Street Field */}
    <Grid item xs={12} sm={6}>
      <Controller
        name="address.street"
        control={control}
        render={({ field }) => (
          <TextField {...field} label="Street" fullWidth disabled={!editMode} />
        )}
      />
    </Grid>
    {/* City Field */}
    <Grid item xs={12} sm={6}>
      <Controller
        name="address.city"
        control={control}
        render={({ field }) => (
          <TextField {...field} label="City" fullWidth disabled={!editMode} />
        )}
      />
    </Grid>
    {/* State Field */}
    <Grid item xs={12} sm={6}>
      <Controller
        name="address.state"
        control={control}
        render={({ field }) => (
          <TextField {...field} label="State" fullWidth disabled={!editMode} />
        )}
      />
    </Grid>
    {/* Postal Code Field */}
    <Grid item xs={12} sm={6}>
      <Controller
        name="address.postalCode"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Postal Code"
            fullWidth
            disabled={!editMode}
          />
        )}
      />
    </Grid>
  </Grid>
);

export default AddressForm;
