import React from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  CardContent,
  CircularProgress,
} from "@mui/material";
import DashboardLayout from "@/layouts/DashboardLayout";
import ConfirmationDialog from "@components/ConfirmationDialog";
import { profileSections } from "../constants/profileSections";
import { buildViewDataMap } from "../utils/profileUtils";
import { useProfileForm } from "../hooks/useProfileForm";
import ProfileHeroCard from "../components/ProfileHeroCard";
import ProfileSectionCard from "../components/ProfileSectionCard";
import { SectionCard, SectionIconAvatar } from "../components/styles";

const ProfilePage: React.FC = () => {
  const {
    user,
    profileLoading,
    profileError,
    isLoading,
    control,
    handleSubmit,
    editMode,
    showConfirm,
    formChanged,
    handleEdit,
    handleCancel,
    handleConfirm,
    handleCloseConfirm,
    openConfirm,
  } = useProfileForm();

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

  // user is guaranteed defined beyond this point
  const viewDataMap = buildViewDataMap(user);

  return (
    <DashboardLayout>
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          {/* Profile Hero Card */}
          <ProfileHeroCard
            user={user}
            editMode={editMode}
            isLoading={isLoading}
            formChanged={formChanged}
            onEdit={handleEdit}
            onCancel={handleCancel}
            onSave={handleSubmit(openConfirm)}
          />

          {/* Profile Sections */}
          {editMode ? (
            // Edit Mode
            <form onSubmit={handleSubmit(openConfirm)}>
              <Grid container spacing={4}>
                {profileSections.map((section) => {
                  const FormComponent = section.FormComponent;
                  return (
                    <Grid item xs={12} lg={6} key={section.id}>
                      <SectionCard>
                        <CardContent sx={{ p: 3 }}>
                          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                            <SectionIconAvatar $colorScheme={section.colorScheme}>
                              <Box sx={{ color: `${section.colorScheme}.main` }}>
                                <section.IconComponent />
                              </Box>
                            </SectionIconAvatar>
                            <Typography
                              variant="h6"
                              sx={{ fontWeight: "bold", color: `${section.colorScheme}.main` }}
                            >
                              {section.title}
                            </Typography>
                          </Box>
                          <FormComponent control={control} editMode={editMode} />
                        </CardContent>
                      </SectionCard>
                    </Grid>
                  );
                })}
              </Grid>
            </form>
          ) : (
            // View Mode
            <Grid container spacing={4}>
              {profileSections.map((section) => (
                <Grid item xs={12} lg={6} key={section.id}>
                  <ProfileSectionCard
                    title={section.title}
                    IconComponent={section.IconComponent}
                    colorScheme={section.colorScheme}
                    viewData={viewDataMap[section.id]}
                  />
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