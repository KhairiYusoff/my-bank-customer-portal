import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Paper,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import { useSnackbar } from "notistack";
import {
  forgotPasswordSchema,
  ForgotPasswordFormData,
} from "../validations/schemas";
import { useResetPasswordMutation } from "../store/authApi";
import { getErrorMessage } from "@/utils/errorUtils";

const ForgotPasswordPage: React.FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [resetPassword, { isLoading, error }] = useResetPasswordMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: yupResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      await resetPassword(data).unwrap();
      enqueueSnackbar("Password reset successfully!", { variant: "success" });
    } catch (err) {
      // Error handled by error state
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Paper elevation={3} sx={{ padding: 4, width: "100%" }}>
          <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
            Reset your password
          </Typography>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {getErrorMessage(error)}
            </Alert>
          )}
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              autoComplete="email"
              autoFocus
              error={!!errors.email}
              helperText={errors.email?.message}
              {...register("email")}
              disabled={isLoading}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="newPassword"
              label="New Password"
              type="password"
              error={!!errors.newPassword}
              helperText={errors.newPassword?.message}
              {...register("newPassword")}
              disabled={isLoading}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isLoading}
              sx={{ mt: 2, mb: 2 }}
            >
              {isLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Reset Password"
              )}
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default ForgotPasswordPage;
