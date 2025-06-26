import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCompleteProfileMutation } from "@/features/auth/store/authApi";
import { CompleteProfileFormData } from "@/features/auth/validations/schemas";
import { completeProfileSchema } from "@/features/auth/validations/schemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, FormProvider } from "react-hook-form";
import {
  Container,
  Typography,
  Box,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import {
  PersonalInfoSection,
  AddressSection,
  EmploymentSection,
  NextOfKinSection,
} from "@/features/auth/components/complete-profile";
import { useSnackbar } from "notistack";

const steps = ["Personal Information", "Address", "Employment", "Next of Kin"];

const CompleteProfilePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [activeStep, setActiveStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const methods = useForm<CompleteProfileFormData>({
    resolver: yupResolver(completeProfileSchema) as any,
    mode: "onChange",
    defaultValues: {
      password: "",
      confirmPassword: "",
      identityNumber: "",
      dateOfBirth: null,
      age: 18,
      nationality: "Malaysian",
      maritalStatus: "single",
      educationLevel: "secondary",
      residencyStatus: "citizen",
      address: {
        street: "",
        city: "",
        state: "",
        postalCode: "",
      },
      job: "",
      employerName: "",
      employmentType: "salaried",
      salary: "3000-4999",
      accountType: "savings",
      purposeOfAccount: "savings",
      nextOfKin: {
        name: "",
        phone: "",
        relationship: "parent",
      },
    },
  });

  const [completeProfile] = useCompleteProfileMutation();

  useEffect(() => {
    if (!token) {
      enqueueSnackbar(
        "Invalid or missing token. Please use the link from your email.",
        {
          variant: "error",
          autoHideDuration: 10000,
        }
      );
      navigate("/login");
    }
  }, [token, enqueueSnackbar, navigate]);

  const handleNext = async () => {
    const fields = getStepFields(activeStep);
    const isValid = await methods.trigger(fields as any);

    if (isValid) {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const getStepFields = (step: number): string[] => {
    switch (step) {
      case 0:
        return [
          "password",
          "confirmPassword",
          "identityNumber",
          "dateOfBirth",
          "age",
          "nationality",
          "maritalStatus",
          "educationLevel",
          "residencyStatus",
        ];
      case 1:
        return [
          "address.street",
          "address.city",
          "address.state",
          "address.postalCode",
        ];
      case 2:
        return [
          "job",
          "employerName",
          "employmentType",
          "salary",
          "accountType",
          "purposeOfAccount",
        ];
      case 3:
        return ["nextOfKin.name", "nextOfKin.phone", "nextOfKin.relationship"];
      default:
        return [];
    }
  };

  const onSubmit = async (formData: CompleteProfileFormData) => {
    if (!token) return;

    try {
      setIsSubmitting(true);
      setServerError(null);

      // Prepare the data for submission (remove confirmPassword and format date)
      const { confirmPassword, dateOfBirth, ...submitData } = formData;

      const formattedData = {
        ...submitData,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth).toISOString() : "",
      };

      await completeProfile({
        data: formattedData,
        token,
      }).unwrap();

      enqueueSnackbar("Profile completed successfully!", {
        variant: "success",
      });
      navigate("/complete-profile/success");
    } catch (error: any) {
      console.error("Error completing profile:", error);

      const errorMessage =
        error?.message || "Failed to complete profile. Please try again.";
      setServerError(errorMessage);

      enqueueSnackbar(errorMessage, { variant: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <PersonalInfoSection />;
      case 1:
        return <AddressSection />;
      case 2:
        return <EmploymentSection />;
      case 3:
        return <NextOfKinSection />;
      default:
        return "Unknown step";
    }
  };

  if (!token) {
    return (
      <Container component="main" maxWidth="md">
        <Box sx={{ mt: 8, textAlign: "center" }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container component="main" maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4, mb: 4 }}>
        <Typography component="h1" variant="h4" align="center" gutterBottom>
          Complete Your Profile
        </Typography>

        <Typography
          variant="body1"
          align="center"
          color="textSecondary"
          paragraph
        >
          Please complete your profile to activate your account
        </Typography>

        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4, mt: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            {serverError && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {serverError}
              </Alert>
            )}

            {getStepContent(activeStep)}

            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}
            >
              <Button
                disabled={activeStep === 0 || isSubmitting}
                onClick={handleBack}
                variant="outlined"
              >
                Back
              </Button>

              {activeStep === steps.length - 1 ? (
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? <CircularProgress size={24} /> : "Submit"}
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  disabled={isSubmitting}
                >
                  Next
                </Button>
              )}
            </Box>
          </form>
        </FormProvider>
      </Paper>
    </Container>
  );
};

export default CompleteProfilePage;
