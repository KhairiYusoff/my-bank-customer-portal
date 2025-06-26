import React from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { TextField, Grid, MenuItem, Box, Typography } from '@mui/material';
import { CompleteProfileFormData } from '@/features/auth/types/auth';

const NextOfKinSection: React.FC = () => {
  const { register, formState: { errors } } = useFormContext<CompleteProfileFormData>();

  const relationships = [
    { value: 'parent', label: 'Parent' },
    { value: 'spouse', label: 'Spouse' },
    { value: 'child', label: 'Child' },
    { value: 'sibling', label: 'Sibling' },
    { value: 'relative', label: 'Relative' },
    { value: 'friend', label: 'Friend' },
    { value: 'other', label: 'Other' },
  ];

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Next of Kin Information
      </Typography>
      
      <Typography variant="body2" color="textSecondary" paragraph>
        Please provide details of a person we can contact in case of an emergency.
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Full Name"
            {...register('nextOfKin.name')}
            error={!!(errors.nextOfKin as any)?.name}
            helperText={(errors.nextOfKin as any)?.name?.message as string}
            placeholder="e.g., Ali bin Ahmad"
          />
        </Grid>
        
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Phone Number"
            {...register('nextOfKin.phone')}
            error={!!(errors.nextOfKin as any)?.phone}
            helperText={(errors.nextOfKin as any)?.phone?.message as string}
            placeholder="e.g., +60123456789"
          />
        </Grid>
        
        <Grid item xs={12} md={6}>
          <TextField
            select
            fullWidth
            label="Relationship to You"
            {...register('nextOfKin.relationship')}
            error={!!(errors.nextOfKin as any)?.relationship}
            helperText={(errors.nextOfKin as any)?.relationship?.message as string}
          >
            {relationships.map((rel) => (
              <MenuItem key={rel.value} value={rel.value}>
                {rel.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
      
      <Box mt={4} p={3} bgcolor="#f5f5f5" borderRadius={1}>
        <Typography variant="subtitle2" color="textSecondary">
          <strong>Note:</strong> The information provided will be kept confidential and used only for verification and emergency contact purposes.
        </Typography>
      </Box>
    </Box>
  );
};

export default NextOfKinSection;
