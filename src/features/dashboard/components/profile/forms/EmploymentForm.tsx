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
import type { UpdateProfileRequest } from "@features/dashboard/types/profile";

interface EmploymentFormProps {
  control: Control<UpdateProfileRequest>;
  editMode: boolean;
}

const employmentTypeOptions = [
  { value: "salaried", label: "Salaried" },
  { value: "self-employed", label: "Self-employed" },
  { value: "unemployed", label: "Unemployed" },
  { value: "retired", label: "Retired" },
  { value: "student", label: "Student" },
];

const salaryOptions = [
  { value: "<1000", label: "<1000" },
  { value: "1000-2999", label: "1000-2999" },
  { value: "3000-4999", label: "3000-4999" },
  { value: "5000-6999", label: "5000-6999" },
  { value: "7000-9999", label: "7000-9999" },
  { value: "10000+", label: "10000+" },
];

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
