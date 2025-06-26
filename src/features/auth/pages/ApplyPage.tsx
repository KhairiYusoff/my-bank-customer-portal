import React from "react";
import { Container, Typography, Box, Paper } from "@mui/material";
import { useApplyMutation } from "@/features/auth/store/authApi";
import type { ApplyRequest } from "@/features/auth/types/auth";
import {
  applicationSchema,
  type ApplicationFormData,
} from "@/features/auth/validations/schemas";
import ApplicationForm from "@/features/auth/components/apply/ApplicationForm";
import SuccessMessage from "@/features/auth/components/apply/SuccessMessage";

const ApplyPage: React.FC = () => {
  const [apply, { isLoading, isSuccess }] = useApplyMutation();
  const [serverError, setServerError] = React.useState<string | null>(null);

  const handleSubmit = async (formData: ApplicationFormData) => {
    try {
      setServerError(null);

      const applicationData: ApplyRequest = {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        phoneNumber: formData.phoneNumber.trim(),
      };

      await apply(applicationData).unwrap();
      console.log("Application submitted successfully!");
    } catch (error: any) {
      console.error("Error submitting application:", error);

      if (error?.message) {
        setServerError(error.message);
      } else if (error?.status === "FETCH_ERROR") {
        setServerError(
          "Network error. Please check your connection and try again."
        );
      } else {
        setServerError("Failed to submit application. Please try again.");
      }

      throw error;
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h4" gutterBottom>
            Bank Account Application
          </Typography>

          {isSuccess ? (
            <SuccessMessage />
          ) : (
            <ApplicationForm
              onSubmit={handleSubmit}
              isLoading={isLoading}
              error={serverError}
              onErrorDismiss={() => setServerError(null)}
            />
          )}
        </Paper>
      </Box>
    </Container>
  );
};

export default ApplyPage;
