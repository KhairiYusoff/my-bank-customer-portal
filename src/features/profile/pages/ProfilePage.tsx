import React from "react";
import {
  Container,
  Button,
  Avatar,
  Typography,
  Box,
  Grid,
  Paper,
  Card,
  CardContent,
  Chip,
  Stack,
  CircularProgress,
} from "@mui/material";
import {
  Person as PersonIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Home as AddressIcon,
  Work as WorkIcon,
  AccountBalance as AccountIcon,
  Settings as SettingsIcon,
  ContactPhone as ContactIcon,
  Verified as VerifiedIcon,
} from "@mui/icons-material";
import DashboardLayout from "@/layouts/DashboardLayout";
import type {
  UserProfile,
  UpdateProfileRequest,
  MaritalStatus,
  EducationLevel,
  ResidencyStatus,
  EmploymentType,
  SalaryRange,
  AccountType,
  PurposeOfAccount,
  NextOfKinRelationship,
} from "@/features/profile/types/profile";
import ConfirmationDialog from "@components/ConfirmationDialog";
import { useUpdateProfileMutation, useGetProfileQuery } from "@/features/profile/store/profileApi";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { getErrorMessage } from "@/utils/errorUtils";
import { profileFormSchema } from "../validations/profileSchema";
import PersonalInfoForm from "../components/PersonalInfoForm";
import AddressForm from "../components/AddressForm";
import EmploymentForm from "../components/EmploymentForm";
import AccountDetailsForm from "../components/AccountDetailsForm";
import PreferencesForm from "../components/PreferencesForm";
import NextOfKinForm from "../components/NextOfKinForm";

const ProfilePage: React.FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [editMode, setEditMode] = React.useState(false);
  const [showConfirm, setShowConfirm] = React.useState(false);
  const [formChanged, setFormChanged] = React.useState(false);
  
  // Fetch user profile data
  const { data: user, isLoading: profileLoading, error: profileError } = useGetProfileQuery();
  const [updateProfile, { isLoading, error }] = useUpdateProfileMutation();

  // Helper to map UserProfile to UpdateProfileRequest with correct union types
  function mapUserProfileToUpdateProfile(
    user?: UserProfile
  ): UpdateProfileRequest {
    if (!user) return {};
    return {
      name: user.name,
      phoneNumber: user.phoneNumber,
      identityNumber: user.identityNumber,
      dateOfBirth: user.dateOfBirth?.slice(0, 10),
      age: user.age,
      nationality: user.nationality,
      maritalStatus: user.maritalStatus as MaritalStatus,
      educationLevel: user.educationLevel as EducationLevel,
      residencyStatus: user.residencyStatus as ResidencyStatus,
      job: user.job,
      employerName: user.employerName,
      employmentType: user.employmentType as EmploymentType,
      salary: user.salary as SalaryRange,
      accountType: user.accountType as AccountType,
      purposeOfAccount: user.purposeOfAccount as PurposeOfAccount,
      address: user.address,
      preferences: user.preferences,
      nextOfKin: user.nextOfKin
        ? {
            ...user.nextOfKin,
            relationship: user.nextOfKin.relationship as NextOfKinRelationship,
          }
        : undefined,
    };
  }

  const { control, handleSubmit, reset, watch } = useForm<UpdateProfileRequest>(
    {
      resolver: yupResolver(profileFormSchema),
      defaultValues: mapUserProfileToUpdateProfile(user),
      mode: "onChange",
    }
  );

  React.useEffect(() => {
    if (user) {
      reset(mapUserProfileToUpdateProfile(user));
    }
  }, [user, reset]);

  // Watch for changes to enable Save
  React.useEffect(() => {
    if (editMode) {
      const subscription = watch(() => setFormChanged(true));
      return () => subscription.unsubscribe();
    }
  }, [editMode, watch]);

  const handleEdit = () => setEditMode(true);
  const handleCancel = () => {
    reset();
    setEditMode(false);
    setFormChanged(false);
  };
  const handleSave = () => setShowConfirm(true);
  const handleConfirm = async (data: UpdateProfileRequest) => {
    try {
      await updateProfile(data).unwrap();
      enqueueSnackbar("Profile updated successfully", { variant: "success" });
      setEditMode(false);
      setShowConfirm(false);
      setFormChanged(false);
    } catch (e) {
      enqueueSnackbar(getErrorMessage(e as any), { variant: "error" });
    }
  };
  const handleCloseConfirm = () => setShowConfirm(false);

  // Profile section configurations
  const sectionConfigs = [
    {
      id: 'personal',
      title: 'Personal Information',
      icon: <PersonIcon />,
      color: '#00509e',
      component: PersonalInfoForm,
      viewData: {
        'Name': user?.name,
        'Email': user?.email,
        'Phone Number': user?.phoneNumber,
        'Identity Number': user?.identityNumber,
        'Date of Birth': user?.dateOfBirth?.slice(0, 10),
        'Age': user?.age,
        'Nationality': user?.nationality,
        'Marital Status': user?.maritalStatus,
        'Education Level': user?.educationLevel,
        'Residency Status': user?.residencyStatus,
      }
    },
    {
      id: 'address',
      title: 'Address',
      icon: <AddressIcon />,
      color: '#1976d2',
      component: AddressForm,
      viewData: {
        'Street': user?.address?.street,
        'City': user?.address?.city,
        'State': user?.address?.state,
        'Postal Code': user?.address?.postalCode,
      }
    },
    {
      id: 'employment',
      title: 'Employment & Financial',
      icon: <WorkIcon />,
      color: '#2e7d32',
      component: EmploymentForm,
      viewData: {
        'Job': user?.job,
        'Employer Name': user?.employerName,
        'Employment Type': user?.employmentType,
        'Salary': user?.salary,
      }
    },
    {
      id: 'account',
      title: 'Account Details',
      icon: <AccountIcon />,
      color: '#ed6c02',
      component: AccountDetailsForm,
      viewData: {
        'Account Type': user?.accountType,
        'Purpose of Account': user?.purposeOfAccount,
        'Application Status': user?.applicationStatus,
        'Is Verified': user?.isVerified ? 'Yes' : 'No',
        'Profile Complete': user?.isProfileComplete ? 'Yes' : 'No',
        'Role': user?.role,
      }
    },
    {
      id: 'nextofkin',
      title: 'Next of Kin',
      icon: <ContactIcon />,
      color: '#9c27b0',
      component: NextOfKinForm,
      viewData: {
        'Name': user?.nextOfKin?.name,
        'Phone': user?.nextOfKin?.phone,
        'Relationship': user?.nextOfKin?.relationship,
      }
    },
    {
      id: 'preferences',
      title: 'Preferences',
      icon: <SettingsIcon />,
      color: '#795548',
      component: PreferencesForm,
      viewData: {
        'Theme': user?.preferences?.theme,
        'Language': user?.preferences?.language,
        'Notifications': user?.preferences?.notifications ? 'Enabled' : 'Disabled',
      }
    }
  ];

  if (profileError) {
    return (
      <DashboardLayout>
        <Container maxWidth="lg">
          <Box sx={{ my: 4 }}>
            <Paper sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h6" sx={{ color: 'error.main', mb: 2 }}>
                Failed to load profile
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                Please try refreshing the page
              </Typography>
            </Paper>
          </Box>
        </Container>
      </DashboardLayout>
    );
  }

  if (!user || profileLoading) {
    return (
      <DashboardLayout>
        <Container maxWidth="lg">
          <Box sx={{ my: 4 }}>
            <Paper sx={{ textAlign: 'center', py: 8 }}>
              <CircularProgress size={60} />
              <Typography variant="h6" sx={{ mt: 2, color: 'text.secondary' }}>
                Loading your profile...
              </Typography>
            </Paper>
          </Box>
        </Container>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          {/* Header Section */}
          <Paper sx={{ 
            p: 4, 
            mb: 4, 
            background: 'linear-gradient(135deg, #00509e 0%, #1976d2 100%)',
            color: 'white',
            borderRadius: 3,
            position: 'relative',
            overflow: 'hidden'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    mr: 3,
                    border: '3px solid rgba(255, 255, 255, 0.3)'
                  }}
                >
                  {user.name ? user.name[0].toUpperCase() : <PersonIcon fontSize="large" />}
                </Avatar>
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                    <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                      {user.name || "User Profile"}
                    </Typography>
                    {user.isVerified && (
                      <Chip
                        icon={<VerifiedIcon />}
                        label="Verified"
                        size="small"
                        sx={{ 
                          backgroundColor: 'rgba(76, 175, 80, 0.8)',
                          color: 'white'
                        }}
                      />
                    )}
                  </Box>
                  <Typography variant="h6" sx={{ opacity: 0.9, mb: 1 }}>
                    {user.email}
                  </Typography>
                  <Stack direction="row" spacing={1}>
                    <Chip 
                      label={user.role} 
                      size="small" 
                      sx={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.2)', 
                        color: 'white' 
                      }} 
                    />
                    <Chip 
                      label={user.applicationStatus} 
                      size="small" 
                      sx={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.2)', 
                        color: 'white' 
                      }} 
                    />
                  </Stack>
                </Box>
              </Box>
              
              {/* Action Buttons */}
              {editMode ? (
                <Stack direction="row" spacing={2}>
                  <Button
                    onClick={handleCancel}
                    variant="outlined"
                    startIcon={<CancelIcon />}
                    sx={{ 
                      color: 'white',
                      borderColor: 'rgba(255, 255, 255, 0.5)',
                      '&:hover': {
                        borderColor: 'white',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)'
                      }
                    }}
                    disabled={isLoading}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSubmit(() => setShowConfirm(true))}
                    variant="contained"
                    startIcon={isLoading ? <CircularProgress size={16} /> : <SaveIcon />}
                    disabled={isLoading || !formChanged}
                    sx={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.3)' }
                    }}
                  >
                    {isLoading ? 'Saving...' : 'Save Changes'}
                  </Button>
                </Stack>
              ) : (
                <Button
                  onClick={handleEdit}
                  variant="contained"
                  startIcon={<EditIcon />}
                  sx={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.3)' }
                  }}
                >
                  Edit Profile
                </Button>
              )}
            </Box>
          </Paper>

          {/* Profile Sections */}
          {editMode ? (
            // Edit Mode
            <form onSubmit={handleSubmit(() => setShowConfirm(true))}>
              <Grid container spacing={4}>
                {sectionConfigs.map((section, index) => {
                  const FormComponent = section.component;
                  return (
                    <Grid item xs={12} lg={6} key={section.id}>
                      <Card sx={{ 
                        borderRadius: 3,
                        boxShadow: '0 8px 32px rgba(0, 80, 158, 0.08)',
                        height: 'fit-content'
                      }}>
                        <CardContent sx={{ p: 3 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                            <Avatar sx={{ 
                              backgroundColor: `${section.color}15`,
                              mr: 2,
                              width: 48,
                              height: 48
                            }}>
                              <Box sx={{ color: section.color }}>
                                {section.icon}
                              </Box>
                            </Avatar>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', color: section.color }}>
                              {section.title}
                            </Typography>
                          </Box>
                          <FormComponent control={control} editMode={editMode} />
                        </CardContent>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>
            </form>
          ) : (
            // View Mode
            <Grid container spacing={4}>
              {sectionConfigs.map((section) => (
                <Grid item xs={12} lg={6} key={section.id}>
                  <Card sx={{ 
                    borderRadius: 3,
                    boxShadow: '0 8px 32px rgba(0, 80, 158, 0.08)',
                    height: 'fit-content',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 12px 40px rgba(0, 80, 158, 0.12)'
                    }
                  }}>
                    <CardContent sx={{ p: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                        <Avatar sx={{ 
                          backgroundColor: `${section.color}15`,
                          mr: 2,
                          width: 48,
                          height: 48
                        }}>
                          <Box sx={{ color: section.color }}>
                            {section.icon}
                          </Box>
                        </Avatar>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: section.color }}>
                          {section.title}
                        </Typography>
                      </Box>
                      
                      <Stack spacing={2}>
                        {Object.entries(section.viewData).map(([key, value]) => (
                          value && (
                            <Box key={key} sx={{ 
                              p: 2, 
                              backgroundColor: `${section.color}08`,
                              borderRadius: 2,
                              border: `1px solid ${section.color}20`
                            }}>
                              <Typography variant="caption" sx={{ 
                                color: 'text.secondary', 
                                fontWeight: 600,
                                textTransform: 'uppercase',
                                fontSize: '0.7rem'
                              }}>
                                {key}
                              </Typography>
                              <Typography variant="body1" sx={{ fontWeight: 500, mt: 0.5 }}>
                                {value}
                              </Typography>
                            </Box>
                          )
                        ))}
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}

          {/* Confirmation Dialog */}
          <ConfirmationDialog
            open={showConfirm}
            title="Confirm Profile Update"
            description="Are you sure you want to save your changes? This will update your profile information."
            confirmLabel="Save Changes"
            cancelLabel="Cancel"
            onConfirm={handleSubmit(handleConfirm)}
            onCancel={handleCloseConfirm}
          />
        </Box>
      </Container>
    </DashboardLayout>
  );
};

export default ProfilePage;