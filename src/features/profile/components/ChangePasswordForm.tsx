import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Box,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  CircularProgress,
  Typography,
  LinearProgress,
  Stack,
  Chip,
  Alert,
  Grid,
  Avatar,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Lock as LockIcon,
  VpnKey as KeyIcon,
  Security as SecurityIcon,
} from "@mui/icons-material";
import type { ChangePasswordRequest } from "@/features/profile/types/profile";

// --- ChangePasswordForm: Handles password change fields and validation ---

const schema = yup.object({
  currentPassword: yup.string().required("Current password is required"),
  newPassword: yup
    .string()
    .required("New password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Must contain an uppercase letter")
    .matches(/[a-z]/, "Must contain a lowercase letter")
    .matches(/[0-9]/, "Must contain a number")
    .matches(/[^A-Za-z0-9]/, "Must contain a special character"),
});

export interface ChangePasswordFormProps {
  onSubmit: (data: ChangePasswordRequest) => void;
  loading: boolean;
}

const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({
  onSubmit,
  loading,
}) => {
  const [showCurrent, setShowCurrent] = React.useState(false);
  const [showNew, setShowNew] = React.useState(false);
  const [passwordStrength, setPasswordStrength] = React.useState(0);
  
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors, isValid, isDirty },
    reset,
  } = useForm<ChangePasswordRequest>({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: { currentPassword: "", newPassword: "" },
  });

  const watchedNewPassword = watch("newPassword");

  // Password strength calculation
  React.useEffect(() => {
    if (!watchedNewPassword) {
      setPasswordStrength(0);
      return;
    }

    let strength = 0;
    if (watchedNewPassword.length >= 8) strength += 25;
    if (/[A-Z]/.test(watchedNewPassword)) strength += 25;
    if (/[a-z]/.test(watchedNewPassword)) strength += 25;
    if (/[0-9]/.test(watchedNewPassword)) strength += 12.5;
    if (/[^A-Za-z0-9]/.test(watchedNewPassword)) strength += 12.5;
    
    setPasswordStrength(Math.min(strength, 100));
  }, [watchedNewPassword]);

  const getStrengthColor = () => {
    if (passwordStrength < 25) return "#f44336";
    if (passwordStrength < 50) return "#ff9800";
    if (passwordStrength < 75) return "#2196f3";
    return "#4caf50";
  };

  const getStrengthLabel = () => {
    if (passwordStrength < 25) return "Weak";
    if (passwordStrength < 50) return "Fair";
    if (passwordStrength < 75) return "Good";
    return "Strong";
  };

  React.useEffect(() => {
    if (!loading) reset({ currentPassword: "", newPassword: "" });
  }, [loading, reset]);

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {/* Security Notice */}
        <Alert 
          severity="info" 
          sx={{ 
            borderRadius: 2,
            '& .MuiAlert-icon': { fontSize: '1.25rem' }
          }}
        >
          <Typography variant="body2">
            For your security, please enter your current password to confirm your identity.
          </Typography>
        </Alert>

        {/* Current Password Section */}
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Avatar sx={{ backgroundColor: 'rgba(211, 47, 47, 0.1)', mr: 2, width: 32, height: 32 }}>
              <LockIcon sx={{ color: '#d32f2f', fontSize: '1.25rem' }} />
            </Avatar>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#d32f2f' }}>
              Current Password
            </Typography>
          </Box>
          
          <Controller
            name="currentPassword"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Enter your current password"
                type={showCurrent ? "text" : "password"}
                fullWidth
                placeholder="••••••••"
                autoComplete="current-password"
                error={!!errors.currentPassword}
                helperText={errors.currentPassword?.message}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  }
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle current password visibility"
                        onClick={() => setShowCurrent((show) => !show)}
                        edge="end"
                      >
                        {showCurrent ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        </Box>

        {/* New Password Section */}
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Avatar sx={{ backgroundColor: 'rgba(0, 80, 158, 0.1)', mr: 2, width: 32, height: 32 }}>
              <KeyIcon sx={{ color: '#00509e', fontSize: '1.25rem' }} />
            </Avatar>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#00509e' }}>
              New Password
            </Typography>
          </Box>

          <Controller
            name="newPassword"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Create a strong new password"
                type={showNew ? "text" : "password"}
                fullWidth
                placeholder="••••••••"
                autoComplete="new-password"
                error={!!errors.newPassword}
                helperText={errors.newPassword?.message}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  }
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle new password visibility"
                        onClick={() => setShowNew((show) => !show)}
                        edge="end"
                      >
                        {showNew ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />

          {/* Password Strength Indicator */}
          {watchedNewPassword && (
            <Box sx={{ mt: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Password Strength
                </Typography>
                <Chip 
                  label={getStrengthLabel()} 
                  size="small" 
                  sx={{ 
                    backgroundColor: getStrengthColor(),
                    color: 'white',
                    fontWeight: 600,
                    fontSize: '0.75rem'
                  }}
                />
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={passwordStrength} 
                sx={{ 
                  height: 6,
                  borderRadius: 3,
                  backgroundColor: 'rgba(0, 0, 0, 0.1)',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: getStrengthColor(),
                    borderRadius: 3,
                  }
                }}
              />
            </Box>
          )}
        </Box>

        {/* Password Requirements */}
        <Box sx={{ 
          p: 2, 
          backgroundColor: 'rgba(0, 80, 158, 0.03)',
          borderRadius: 2,
          border: '1px solid rgba(0, 80, 158, 0.1)'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
            <SecurityIcon sx={{ color: '#00509e', mr: 1, fontSize: '1.25rem' }} />
            <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#00509e' }}>
              Password Requirements
            </Typography>
          </Box>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Typography variant="caption" color="text.secondary">
                • At least 8 characters
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="caption" color="text.secondary">
                • One uppercase letter
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="caption" color="text.secondary">
                • One lowercase letter
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="caption" color="text.secondary">
                • One number
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="caption" color="text.secondary">
                • One special character (!@#$%^&*)
              </Typography>
            </Grid>
          </Grid>
        </Box>

        {/* Action Buttons */}
        <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
          <Button
            type="submit"
            variant="contained"
            disabled={!isDirty || !isValid || loading}
            startIcon={loading ? <CircularProgress size={20} /> : <LockIcon />}
            sx={{
              flex: 1,
              py: 1.5,
              borderRadius: 2,
              background: 'linear-gradient(135deg, #00509e 0%, #1976d2 100%)',
              fontSize: '1rem',
              fontWeight: 600,
              '&:hover': {
                background: 'linear-gradient(135deg, #00509e 20%, #1976d2 80%)',
              },
              '&:disabled': {
                background: 'rgba(0, 0, 0, 0.12)',
              }
            }}
          >
            {loading ? 'Updating...' : 'Change Password'}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default ChangePasswordForm;
