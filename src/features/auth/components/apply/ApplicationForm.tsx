import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Typography,
  Alert,
  CircularProgress,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import { Link } from "react-router-dom";
import FormField from "@/components/forms/FormField";
import {
  ApplicationFormData,
  applicationSchema,
} from "@/features/auth/validations/schemas";

interface ApplicationFormProps {
  onSubmit: (data: ApplicationFormData) => Promise<void>;
  isLoading?: boolean;
  error?: string | null;
  onErrorDismiss?: () => void;
}

const ApplicationForm: React.FC<ApplicationFormProps> = ({
  onSubmit,
  isLoading = false,
  error = null,
  onErrorDismiss,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ApplicationFormData>({
    resolver: yupResolver(applicationSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
    },
    mode: "onChange",
  });

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      sx={{ mt: 3, maxWidth: 600, mx: "auto" }}
    >
      {error && (
        <Alert severity="error" sx={{ mt: 2 }} onClose={onErrorDismiss}>
          {error}
        </Alert>
      )}

      <FormField
        name="name"
        control={control}
        label="Full Name"
        autoComplete="name"
        startIcon={<PersonIcon color={errors.name ? "error" : "action"} />}
        error={!!errors.name}
        helperText={errors.name?.message}
        disabled={isLoading}
      />

      <FormField
        name="email"
        control={control}
        label="Email Address"
        type="email"
        autoComplete="email"
        startIcon={<EmailIcon color={errors.email ? "error" : "action"} />}
        error={!!errors.email}
        helperText={errors.email?.message}
        disabled={isLoading}
      />

      <FormField
        name="phoneNumber"
        control={control}
        label="Phone Number"
        type="tel"
        autoComplete="tel"
        startIcon={
          <PhoneIcon color={errors.phoneNumber ? "error" : "action"} />
        }
        error={!!errors.phoneNumber}
        helperText={
          errors.phoneNumber?.message || "Include country code (e.g., +60)"
        }
        disabled={isLoading}
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        disabled={isLoading}
        startIcon={isLoading ? <CircularProgress size={20} /> : null}
      >
        {isLoading ? "Submitting..." : "Submit Application"}
      </Button>

      <Box mt={2} textAlign="center">
        <Button
          component={Link}
          to="/login"
          color="primary"
          disabled={isLoading}
        >
          Already have an account? Sign in
        </Button>
      </Box>
    </Box>
  );
};

export default ApplicationForm;
