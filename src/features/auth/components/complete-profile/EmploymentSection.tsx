import React from 'react';
import { useFormContext } from 'react-hook-form';
import { TextField, Grid, MenuItem, Box, Typography } from '@mui/material';
import { CompleteProfileFormData } from '@/features/auth/types/auth';

const EmploymentSection: React.FC = () => {
  const { register, formState: { errors } } = useFormContext<CompleteProfileFormData>();

  const employmentTypes = [
    { value: 'salaried', label: 'Salaried Employee' },
    { value: 'self-employed', label: 'Self-Employed' },
    { value: 'unemployed', label: 'Unemployed' },
    { value: 'retired', label: 'Retired' },
    { value: 'student', label: 'Student' },
  ];

  const salaryRanges = [
    { value: '<1000', label: 'Below RM 1,000' },
    { value: '1000-2999', label: 'RM 1,000 - RM 2,999' },
    { value: '3000-4999', label: 'RM 3,000 - RM 4,999' },
    { value: '5000-6999', label: 'RM 5,000 - RM 6,999' },
    { value: '7000-9999', label: 'RM 7,000 - RM 9,999' },
    { value: '10000+', label: 'RM 10,000 and above' },
  ];

  const accountTypes = [
    { value: 'savings', label: 'Savings Account' },
    { value: 'current', label: 'Current Account' },
    { value: 'fixed deposit', label: 'Fixed Deposit Account' },
  ];

  const accountPurposes = [
    { value: 'savings', label: 'Personal Savings' },
    { value: 'salary credit', label: 'Salary Crediting' },
    { value: 'investment', label: 'Investment' },
    { value: 'business', label: 'Business Transactions' },
    { value: 'education', label: 'Education' },
    { value: 'travel', label: 'Travel/Abroad Use' },
    { value: 'other', label: 'Other' },
  ];

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
            {...register('job')}
            error={!!errors.job}
            helperText={errors.job?.message as string}
            placeholder="e.g., Software Engineer"
          />
        </Grid>
        
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Employer Name"
            {...register('employerName')}
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
            {...register('employmentType')}
            error={!!errors.employmentType}
            helperText={errors.employmentType?.message as string}
          >
            {employmentTypes.map((type) => (
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
            {...register('salary')}
            error={!!errors.salary}
            helperText={errors.salary?.message as string}
          >
            {salaryRanges.map((range) => (
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
            {...register('accountType')}
            error={!!errors.accountType}
            helperText={errors.accountType?.message as string}
          >
            {accountTypes.map((type) => (
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
            {...register('purposeOfAccount')}
            error={!!errors.purposeOfAccount}
            helperText={errors.purposeOfAccount?.message as string}
          >
            {accountPurposes.map((purpose) => (
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
