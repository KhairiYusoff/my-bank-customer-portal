import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Box, Button, TextField, InputAdornment, IconButton, CircularProgress } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import type { ChangePasswordRequest } from "@features/dashboard/types/profile";

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

const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({ onSubmit, loading }) => {
  const [showCurrent, setShowCurrent] = React.useState(false);
  const [showNew, setShowNew] = React.useState(false);
  const {
    handleSubmit,
    control,
    formState: { errors, isValid, isDirty },
    reset,
  } = useForm<ChangePasswordRequest>({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: { currentPassword: "", newPassword: "" },
  });

  // --- UX: Reset on success or dialog close (parent should call via ref if needed) ---
  React.useEffect(() => {
    if (!loading) reset({ currentPassword: "", newPassword: "" });
  }, [loading, reset]);

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
      {/* Current Password Field */}
      <Controller
        name="currentPassword"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Current Password"
            type={showCurrent ? "text" : "password"}
            fullWidth
            margin="normal"
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
      {/* New Password Field */}
      <Controller
        name="newPassword"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="New Password"
            type={showNew ? "text" : "password"}
            fullWidth
            margin="normal"
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
      {/* Submit Button with Loading State */}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
        disabled={!isDirty || !isValid || loading}
        startIcon={loading ? <CircularProgress size={20} /> : null}
      >
        Change Password
      </Button>
    </Box>
  );
};

export default ChangePasswordForm;
