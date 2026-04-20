import React from "react";
import { useFormContext } from "react-hook-form";
import { TextField, Grid, MenuItem, Box, Typography } from "@mui/material";
import { CompleteProfileFormData } from "@/features/onboarding/validations/schemas";
import {
  EMPLOYMENT_TYPES,
  SALARY_RANGES,
  ACCOUNT_TYPES,
  ACCOUNT_PURPOSES,
} from "../../constants/formOptions";

const EmploymentSection: React.FC = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<CompleteProfileFormData>();

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Employment & Financial Information
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Current Job Title"
            {...register("job")}
            error={!!errors.job}
            helperText={errors.job?.message as string}
            placeholder="e.g., Software Engineer"
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Employer Name"
            {...register("employerName")}
            error={!!errors.employerName}
            helperText={errors.employerName?.message as string}
            placeholder="e.g., ABC Sdn Bhd"
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            select
            fullWidth
            label="Employment Type"
            {...register("employmentType")}
            error={!!errors.employmentType}
            helperText={errors.employmentType?.message as string}
          >
            {EMPLOYMENT_TYPES.map((type) => (
              <MenuItem key={type.value} value={type.value}>
                {type.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            select
            fullWidth
            label="Monthly Income (MYR)"
            {...register("salary")}
            error={!!errors.salary}
            helperText={errors.salary?.message as string}
          >
            {SALARY_RANGES.map((range) => (
              <MenuItem key={range.value} value={range.value}>
                {range.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="subtitle1" gutterBottom sx={{ mt: 2, mb: 2 }}>
            Account Information
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            select
            fullWidth
            label="Preferred Account Type"
            {...register("accountType")}
            error={!!errors.accountType}
            helperText={errors.accountType?.message as string}
          >
            {ACCOUNT_TYPES.map((type) => (
              <MenuItem key={type.value} value={type.value}>
                {type.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            select
            fullWidth
            label="Primary Purpose of Account"
            {...register("purposeOfAccount")}
            error={!!errors.purposeOfAccount}
            helperText={errors.purposeOfAccount?.message as string}
          >
            {ACCOUNT_PURPOSES.map((purpose) => (
              <MenuItem key={purpose.value} value={purpose.value}>
                {purpose.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EmploymentSection;
