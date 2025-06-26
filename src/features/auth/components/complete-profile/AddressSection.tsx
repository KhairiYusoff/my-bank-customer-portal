import React from 'react';
import { useFormContext } from 'react-hook-form';
import { TextField, Grid, Box, Typography, MenuItem } from '@mui/material';
import { CompleteProfileFormData } from '@/features/auth/types/auth';

const AddressSection: React.FC = () => {
  const { register, formState: { errors } } = useFormContext<CompleteProfileFormData>();

  // List of Malaysian states
  const malaysianStates = [
    'Johor',
    'Kedah',
    'Kelantan',
    'Melaka',
    'Negeri Sembilan',
    'Pahang',
    'Perak',
    'Perlis',
    'Pulau Pinang',
    'Sabah',
    'Sarawak',
    'Selangor',
    'Terengganu',
    'Kuala Lumpur',
    'Labuan',
    'Putrajaya',
  ];

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Address Information
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Street Address"
            {...register('address.street')}
            error={!!(errors.address as any)?.street}
            helperText={(errors.address as any)?.street?.message as string}
            placeholder="e.g., No 123, Jalan Example"
          />
        </Grid>
        
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="City"
            {...register('address.city')}
            error={!!(errors.address as any)?.city}
            helperText={(errors.address as any)?.city?.message as string}
            placeholder="e.g., Petaling Jaya"
          />
        </Grid>
        
        <Grid item xs={12} md={6}>
          <TextField
            select
            fullWidth
            label="State"
            {...register('address.state')}
            error={!!(errors.address as any)?.state}
            helperText={(errors.address as any)?.state?.message as string}
          >
            <MenuItem value="">Select a state</MenuItem>
            {malaysianStates.map((state) => (
              <MenuItem key={state} value={state}>
                {state}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Postal Code"
            {...register('address.postalCode')}
            error={!!(errors.address as any)?.postalCode}
            helperText={(errors.address as any)?.postalCode?.message as string}
            placeholder="e.g., 47800"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddressSection;
