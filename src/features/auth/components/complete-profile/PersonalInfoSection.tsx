import React from 'react';
import { useFormContext, Controller, useWatch } from 'react-hook-form';
import { TextField, Grid, MenuItem, Box, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { format } from 'date-fns';
import { CompleteProfileFormData } from '@/features/auth/types/auth';

const PersonalInfoSection: React.FC = () => {
  const { register, formState: { errors }, control, setValue, trigger } = useFormContext<CompleteProfileFormData>();
  const dateOfBirth = useWatch({ control, name: 'dateOfBirth' });

  // Calculate age from date of birth
  const calculateAge = (birthDate: Date): number => {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  // Handle date change
  const handleDateChange = (date: Date | null) => {
    setValue('dateOfBirth', date, { shouldValidate: true });
    
    // Trigger age validation when date changes
    if (date) {
      const age = calculateAge(date);
      setValue('age', age, { shouldValidate: true });
      trigger('age');
    } else {
      setValue('age', 0, { shouldValidate: true });
      trigger('age');
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Personal Information
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Identity Number"
            {...register('identityNumber')}
            error={!!errors.identityNumber}
            helperText={errors.identityNumber?.message as string}
            placeholder="e.g., 900101015050"
          />
        </Grid>
        
        <Grid item xs={12} md={6}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Controller
              name="dateOfBirth"
              control={control}
              render={({ field: { onChange, value } }) => (
                <DatePicker
                  label="Date of Birth"
                  value={value}
                  onChange={(newValue) => {
                    onChange(newValue);
                    if (newValue) {
                      const age = calculateAge(newValue);
                      setValue('age', age, { shouldValidate: true });
                    }
                  }}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      required: true,
                      error: !!errors.dateOfBirth,
                      helperText: errors.dateOfBirth?.message as string,
                    },
                  }}
                />
              )}
            />
          </LocalizationProvider>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Age"
            type="number"
            {...register('age', {
              valueAsNumber: true,
            })}
            disabled
            error={!!errors.age}
            helperText={errors.age?.message as string}
          />
        </Grid>
        
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Nationality"
            {...register('nationality')}
            error={!!errors.nationality}
            helperText={errors.nationality?.message as string}
          />
        </Grid>
        
        <Grid item xs={12} md={6}>
          <TextField
            select
            fullWidth
            label="Marital Status"
            {...register('maritalStatus')}
            error={!!errors.maritalStatus}
            helperText={errors.maritalStatus?.message as string}
          >
            <MenuItem value="single">Single</MenuItem>
            <MenuItem value="married">Married</MenuItem>
            <MenuItem value="divorced">Divorced</MenuItem>
            <MenuItem value="widowed">Widowed</MenuItem>
          </TextField>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <TextField
            select
            fullWidth
            label="Education Level"
            {...register('educationLevel')}
            error={!!errors.educationLevel}
            helperText={errors.educationLevel?.message as string}
          >
            <MenuItem value="none">No Formal Education</MenuItem>
            <MenuItem value="primary">Primary School</MenuItem>
            <MenuItem value="secondary">Secondary School</MenuItem>
            <MenuItem value="diploma">Diploma</MenuItem>
            <MenuItem value="degree">Bachelor's Degree</MenuItem>
            <MenuItem value="postgraduate">Postgraduate</MenuItem>
          </TextField>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <TextField
            select
            fullWidth
            label="Residency Status"
            {...register('residencyStatus')}
            error={!!errors.residencyStatus}
            helperText={errors.residencyStatus?.message as string}
          >
            <MenuItem value="citizen">Citizen</MenuItem>
            <MenuItem value="permanent resident">Permanent Resident</MenuItem>
            <MenuItem value="foreigner">Foreigner</MenuItem>
          </TextField>
        </Grid>
        
        <Grid item xs={12}>
          <Typography variant="subtitle1" gutterBottom sx={{ mt: 2, mb: 2 }}>
            Account Security
          </Typography>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            type="password"
            label="Password"
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message as string}
          />
        </Grid>
        
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            type="password"
            label="Confirm Password"
            {...register('confirmPassword')}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message as string}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default PersonalInfoSection;
