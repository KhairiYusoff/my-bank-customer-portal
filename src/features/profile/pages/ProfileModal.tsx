import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Avatar,
  Typography,
  Box,
  Divider,
  Grid,
  Paper,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useTheme } from "@mui/material/styles";
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
import { useUpdateProfileMutation } from "@/features/profile/store/profileApi";
import { useSnackbar } from "notistack";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { getErrorMessage } from "@/utils/errorUtils";
import { profileFormSchema } from "../validations/profileSchema";
import PersonalInfoForm from "../components/PersonalInfoForm";
import AddressForm from "../components/AddressForm";
import EmploymentForm from "../components/EmploymentForm";
import AccountDetailsForm from "../components/AccountDetailsForm";
import PreferencesForm from "../components/PreferencesForm";
import NextOfKinForm from "../components/NextOfKinForm";

interface ProfileModalProps {
  open: boolean;
  onClose: () => void;
  user: UserProfile | undefined;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ open, onClose, user }) => {
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const [editMode, setEditMode] = React.useState(false);
  const [showConfirm, setShowConfirm] = React.useState(false);
  const [formChanged, setFormChanged] = React.useState(false);
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

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogContent
        sx={{ p: 4, minWidth: 700, maxWidth: 900, overflow: "visible" }}
      >
        {/* Avatar and Name Section */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <Avatar
            sx={{
              width: 64,
              height: 64,
              bgcolor: theme.palette.primary.main,
              mr: 2,
            }}
          >
            {user?.name ? (
              user.name[0].toUpperCase()
            ) : (
              <AccountCircle fontSize="large" />
            )}
          </Avatar>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              {user?.name || "User"}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {user?.email || "user@email.com"}
            </Typography>
          </Box>
          {!editMode && (
            <Button sx={{ ml: "auto" }} onClick={handleEdit} variant="outlined">
              Edit
            </Button>
          )}
        </Box>
        {/* Form or View Mode */}
        {editMode ? (
          <form onSubmit={handleSubmit((data) => setShowConfirm(true))}>
            {/* --- EDIT MODE: Profile Form --- */}
            <Grid container spacing={3}>
              {/* Left Column: Personal Info, Address, Next of Kin */}
              <Grid item xs={12} md={6}>
                {/* Personal Information Section */}
                <Paper
                  variant="outlined"
                  sx={{ p: 2, borderRadius: 2, borderColor: "divider", mb: 2 }}
                >
                  {/* Section Title: Personal Information */}
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 600, mb: 1 }}
                  >
                    Personal Information
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  {/* Fields: Name, Phone Number, Identity Number, Date of Birth, Age, Nationality, Marital Status, Education Level, Residency Status */}
                  <PersonalInfoForm control={control} editMode={editMode} />
                </Paper>
                {/* Address Section */}
                <Paper
                  variant="outlined"
                  sx={{ p: 2, borderRadius: 2, borderColor: "divider", mb: 2 }}
                >
                  {/* Section Title: Address */}
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 600, mb: 1 }}
                  >
                    Address
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  {/* Fields: Street, City, State, Postal Code */}
                  <AddressForm control={control} editMode={editMode} />
                </Paper>
                {/* Next of Kin Section */}
                <Paper
                  variant="outlined"
                  sx={{ p: 2, borderRadius: 2, borderColor: "divider" }}
                >
                  {/* Section Title: Next of Kin */}
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 600, mb: 1 }}
                  >
                    Next of Kin
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  {/* Fields: Name, Phone, Relationship */}
                  <NextOfKinForm control={control} editMode={editMode} />
                </Paper>
              </Grid>
              {/* Right Column: Employment, Account, Preferences */}
              <Grid item xs={12} md={6}>
                {/* Employment & Financial Section */}
                <Paper
                  variant="outlined"
                  sx={{ p: 2, borderRadius: 2, borderColor: "divider", mb: 2 }}
                >
                  {/* Section Title: Employment & Financial */}
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 600, mb: 1 }}
                  >
                    Employment & Financial
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  {/* Fields: Job, Employer Name, Employment Type, Salary */}
                  <EmploymentForm control={control} editMode={editMode} />
                </Paper>
                {/* Account Details Section */}
                <Paper
                  variant="outlined"
                  sx={{ p: 2, borderRadius: 2, borderColor: "divider", mb: 2 }}
                >
                  {/* Section Title: Account Details */}
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 600, mb: 1 }}
                  >
                    Account Details
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  {/* Fields: Account Type, Purpose of Account */}
                  <AccountDetailsForm control={control} editMode={editMode} />
                </Paper>
                {/* Preferences Section */}
                <Paper
                  variant="outlined"
                  sx={{ p: 2, borderRadius: 2, borderColor: "divider" }}
                >
                  {/* Section Title: Preferences */}
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 600, mb: 1 }}
                  >
                    Preferences
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  {/* Fields: Theme, Language, Notifications */}
                  <PreferencesForm control={control} editMode={editMode} />
                </Paper>
              </Grid>
            </Grid>
            {/* --- END FORM FIELDS --- */}
            {/* Form Actions: Cancel/Save Buttons */}
            <DialogActions>
              <Button onClick={handleCancel} color="inherit">
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isLoading || !formChanged}
              >
                Save
              </Button>
            </DialogActions>
            {/* Confirmation Dialog for Save Action */}
            <ConfirmationDialog
              open={showConfirm}
              title="Confirm Profile Update"
              description="Are you sure you want to save your changes?"
              confirmLabel="Save"
              cancelLabel="Cancel"
              onConfirm={handleSubmit(handleConfirm)}
              onCancel={handleCloseConfirm}
            />
          </form>
        ) : (
          // --- VIEW MODE ---
          <Grid container spacing={3}>
            {/* Personal Info Section */}
            <Grid item xs={12} md={6}>
              <Paper
                variant="outlined"
                sx={{ p: 2, borderRadius: 2, borderColor: "divider", mb: 2 }}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                  Personal Information
                </Typography>
                <Divider sx={{ mb: 2 }} />
                {/* Name */}
                <Box sx={{ mb: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    Name:
                  </Typography>
                  <Typography variant="body2">{user?.name}</Typography>
                </Box>
                {/* Email */}
                <Box sx={{ mb: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    Email:
                  </Typography>
                  <Typography variant="body2">{user?.email}</Typography>
                </Box>
                {/* Phone Number */}
                <Box sx={{ mb: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    Phone Number:
                  </Typography>
                  <Typography variant="body2">{user?.phoneNumber}</Typography>
                </Box>
                {/* Identity Number */}
                <Box sx={{ mb: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    Identity Number:
                  </Typography>
                  <Typography variant="body2">
                    {user?.identityNumber}
                  </Typography>
                </Box>
                {/* Date of Birth */}
                <Box sx={{ mb: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    Date of Birth:
                  </Typography>
                  <Typography variant="body2">
                    {user?.dateOfBirth?.slice(0, 10)}
                  </Typography>
                </Box>
                {/* Age */}
                <Box sx={{ mb: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    Age:
                  </Typography>
                  <Typography variant="body2">{user?.age}</Typography>
                </Box>
                {/* Nationality */}
                <Box sx={{ mb: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    Nationality:
                  </Typography>
                  <Typography variant="body2">{user?.nationality}</Typography>
                </Box>
                {/* Marital Status */}
                <Box sx={{ mb: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    Marital Status:
                  </Typography>
                  <Typography variant="body2">{user?.maritalStatus}</Typography>
                </Box>
                {/* Education Level */}
                <Box sx={{ mb: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    Education Level:
                  </Typography>
                  <Typography variant="body2">
                    {user?.educationLevel}
                  </Typography>
                </Box>
                {/* Residency Status */}
                <Box sx={{ mb: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    Residency Status:
                  </Typography>
                  <Typography variant="body2">
                    {user?.residencyStatus}
                  </Typography>
                </Box>
              </Paper>
              {/* Address Section */}
              <Paper
                variant="outlined"
                sx={{ p: 2, borderRadius: 2, borderColor: "divider", mb: 2 }}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                  Address
                </Typography>
                <Divider sx={{ mb: 2 }} />
                {/* Address */}
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    Address:
                  </Typography>
                  <Typography variant="body2">
                    {user?.address?.street}, {user?.address?.city},{" "}
                    {user?.address?.state} {user?.address?.postalCode}
                  </Typography>
                </Box>
              </Paper>
              {/* Next of Kin Section */}
              <Paper
                variant="outlined"
                sx={{ p: 2, borderRadius: 2, borderColor: "divider" }}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                  Next of Kin
                </Typography>
                <Divider sx={{ mb: 2 }} />
                {/* Next of Kin */}
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    Next of Kin:
                  </Typography>
                  <Typography variant="body2">
                    {user?.nextOfKin?.name} ({user?.nextOfKin?.relationship}) -{" "}
                    {user?.nextOfKin?.phone}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
            {/* Employment & Account Section */}
            <Grid item xs={12} md={6}>
              <Paper
                variant="outlined"
                sx={{ p: 2, borderRadius: 2, borderColor: "divider", mb: 2 }}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                  Employment & Financial
                </Typography>
                <Divider sx={{ mb: 2 }} />
                {/* Job */}
                <Box sx={{ mb: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    Job:
                  </Typography>
                  <Typography variant="body2">{user?.job}</Typography>
                </Box>
                {/* Employer Name */}
                <Box sx={{ mb: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    Employer Name:
                  </Typography>
                  <Typography variant="body2">{user?.employerName}</Typography>
                </Box>
                {/* Employment Type */}
                <Box sx={{ mb: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    Employment Type:
                  </Typography>
                  <Typography variant="body2">
                    {user?.employmentType}
                  </Typography>
                </Box>
                {/* Salary */}
                <Box sx={{ mb: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    Salary:
                  </Typography>
                  <Typography variant="body2">{user?.salary}</Typography>
                </Box>
              </Paper>
              {/* Account Section */}
              <Paper
                variant="outlined"
                sx={{ p: 2, borderRadius: 2, borderColor: "divider", mb: 2 }}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                  Account Details
                </Typography>
                <Divider sx={{ mb: 2 }} />
                {/* Account Type */}
                <Box sx={{ mb: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    Account Type:
                  </Typography>
                  <Typography variant="body2">{user?.accountType}</Typography>
                </Box>
                {/* Purpose of Account */}
                <Box sx={{ mb: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    Purpose of Account:
                  </Typography>
                  <Typography variant="body2">
                    {user?.purposeOfAccount}
                  </Typography>
                </Box>
                {/* Application Status */}
                <Box sx={{ mb: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    Application Status:
                  </Typography>
                  <Typography variant="body2">
                    {user?.applicationStatus}
                  </Typography>
                </Box>
                {/* Is Verified */}
                <Box sx={{ mb: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    Is Verified:
                  </Typography>
                  <Typography variant="body2">
                    {user?.isVerified ? "Yes" : "No"}
                  </Typography>
                </Box>
                {/* Is Profile Complete */}
                <Box sx={{ mb: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    Is Profile Complete:
                  </Typography>
                  <Typography variant="body2">
                    {user?.isProfileComplete ? "Yes" : "No"}
                  </Typography>
                </Box>
                {/* Role */}
                <Box sx={{ mb: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    Role:
                  </Typography>
                  <Typography variant="body2">{user?.role}</Typography>
                </Box>
              </Paper>
              {/* Preferences Section */}
              <Paper
                variant="outlined"
                sx={{ p: 2, borderRadius: 2, borderColor: "divider" }}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                  Preferences
                </Typography>
                <Divider sx={{ mb: 2 }} />
                {/* Preferences */}
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    Preferences:
                  </Typography>
                  <Typography variant="body2">
                    Theme: {user?.preferences?.theme}, Language:{" "}
                    {user?.preferences?.language}, Notifications:{" "}
                    {user?.preferences?.notifications ? "On" : "Off"}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        )}
        {error && (
          <Box mt={2} color="error.main">
            <Typography color="error">{getErrorMessage(error)}</Typography>
          </Box>
        )}
      </DialogContent>
      {!editMode && (
        <DialogActions>
          <Button
            onClick={onClose}
            variant="contained"
            color="primary"
            fullWidth
          >
            Close
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
};

export default ProfileModal;
