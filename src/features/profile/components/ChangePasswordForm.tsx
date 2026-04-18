import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Box,
  TextField,
  InputAdornment,
  IconButton,
  CircularProgress,
  Typography,
  Stack,
  Alert,
  Grid,
} from "@mui/material";
import {
  PasswordSectionAvatar,
  PasswordRequirementsBox,
  PasswordSubmitButton,
  StrengthChip,
  StrengthBar,
} from "./styles";
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
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <PasswordSectionAvatar $variant="current">
              <LockIcon sx={{ color: "error.main", fontSize: "1.25rem" }} />
            </PasswordSectionAvatar>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "error.main" }}>
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
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <PasswordSectionAvatar $variant="new">
              <KeyIcon sx={{ color: "primary.main", fontSize: "1.25rem" }} />
            </PasswordSectionAvatar>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "primary.main" }}>
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
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Password Strength
                </Typography>
                <StrengthChip
                  label={getStrengthLabel()}
                  size="small"
                  $strength={passwordStrength}
                />
              </Box>
              <StrengthBar
                variant="determinate"
                value={passwordStrength}
                $strength={passwordStrength}
              />
            </Box>
          )}
        </Box>

        {/* Password Requirements */}
        <PasswordRequirementsBox>
          <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
            <SecurityIcon sx={{ color: "primary.main", mr: 1, fontSize: "1.25rem" }} />
            <Typography variant="subtitle2" sx={{ fontWeight: 600, color: "primary.main" }}>
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
        </PasswordRequirementsBox>

        {/* Action Buttons */}
        <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
          <PasswordSubmitButton
            type="submit"
            variant="contained"
            disabled={!isDirty || !isValid || loading}
            startIcon={loading ? <CircularProgress size={20} /> : <LockIcon />}
          >
            {loading ? "Updating..." : "Change Password"}
          </PasswordSubmitButton>
        </Stack>
      </Stack>
    </Box>
  );
};

export default ChangePasswordForm;
