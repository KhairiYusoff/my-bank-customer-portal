import React from "react";
import { Controller } from "react-hook-form";
import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import type { Control } from "react-hook-form";
import type { UpdateProfileRequest } from "@/features/profile/types/profile";

interface NextOfKinFormProps {
  control: Control<UpdateProfileRequest>;
  editMode: boolean;
}

const relationshipOptions = [
  { value: "parent", label: "Parent" },
  { value: "spouse", label: "Spouse" },
  { value: "child", label: "Child" },
  { value: "sibling", label: "Sibling" },
  { value: "relative", label: "Relative" },
  { value: "friend", label: "Friend" },
  { value: "other", label: "Other" },
];

const NextOfKinForm: React.FC<NextOfKinFormProps> = ({ control, editMode }) => (
  <Grid container spacing={2}>
    {/* Next of Kin Name Field */}
    <Grid item xs={12} sm={4}>
      <Controller
        name="nextOfKin.name"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Next of Kin Name"
            fullWidth
            disabled={!editMode}
          />
        )}
      />
    </Grid>
    {/* Next of Kin Phone Field */}
    <Grid item xs={12} sm={4}>
      <Controller
        name="nextOfKin.phone"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Next of Kin Phone"
            fullWidth
            disabled={!editMode}
          />
        )}
      />
    </Grid>
    {/* Next of Kin Relationship Field */}
    <Grid item xs={12} sm={4}>
      <Controller
        name="nextOfKin.relationship"
        control={control}
        render={({ field }) => (
          <FormControl fullWidth>
            <InputLabel id="relationship-label">Relationship</InputLabel>
            <Select
              {...field}
              labelId="relationship-label"
              label="Relationship"
              disabled={!editMode}
            >
              {relationshipOptions.map((opt) => (
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

export default NextOfKinForm;
