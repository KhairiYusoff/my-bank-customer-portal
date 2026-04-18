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
import { employmentTypeOptions, salaryOptions } from "../constants/formOptions";

interface EmploymentFormProps {
  control: Control<UpdateProfileRequest>;
  editMode: boolean;
}

const EmploymentForm: React.FC<EmploymentFormProps> = ({
  control,
  editMode,
}) => (
  <Grid container spacing={2}>
    {/* Job Field */}
    <Grid item xs={12} sm={6}>
      <Controller
        name="job"
        control={control}
        render={({ field }) => (
          <TextField {...field} label="Job" fullWidth disabled={!editMode} />
        )}
      />
    </Grid>
    {/* Employer Name Field */}
    <Grid item xs={12} sm={6}>
      <Controller
        name="employerName"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Employer Name"
            fullWidth
            disabled={!editMode}
          />
        )}
      />
    </Grid>
    {/* Employment Type Field */}
    <Grid item xs={12} sm={6}>
      <Controller
        name="employmentType"
        control={control}
        render={({ field }) => (
          <FormControl fullWidth>
            <InputLabel id="employment-type-label">Employment Type</InputLabel>
            <Select
              {...field}
              labelId="employment-type-label"
              label="Employment Type"
              disabled={!editMode}
            >
              {employmentTypeOptions.map((opt) => (
                <MenuItem key={opt.value} value={opt.value}>
                  {opt.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      />
    </Grid>
    {/* Salary Field */}
    <Grid item xs={12} sm={6}>
      <Controller
        name="salary"
        control={control}
        render={({ field }) => (
          <FormControl fullWidth>
            <InputLabel id="salary-label">Salary</InputLabel>
            <Select
              {...field}
              labelId="salary-label"
              label="Salary"
              disabled={!editMode}
            >
              {salaryOptions.map((opt) => (
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

export default EmploymentForm;
