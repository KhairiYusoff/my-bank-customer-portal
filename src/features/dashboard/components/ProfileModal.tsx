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
  Paper
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useTheme } from "@mui/material/styles";
import type { UserProfile } from "../types/profile";
import { getErrorMessage } from "@/utils/errorUtils";

interface ProfileModalProps {
  open: boolean;
  onClose: () => void;
  user: UserProfile | undefined;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ open, onClose, user }) => {
  const theme = useTheme();
  // You can handle error/loading here if needed
  // Example: const errorMsg = getErrorMessage(error);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ textAlign: "center", pb: 0 }}>My Profile</DialogTitle>
      <DialogContent sx={{ p: 4, minWidth: 700, maxWidth: 900, overflow: 'visible' }}>
        {/* Avatar and Name Section */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Avatar
            sx={{ width: 64, height: 64, bgcolor: theme.palette.primary.main, mr: 2 }}
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
        </Box>
        <Grid container spacing={3}>
          {/* Personal Info Section */}
          <Grid item xs={12} md={6}>
            <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, borderColor: 'divider', mb: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                Personal Information
              </Typography>
              <Divider sx={{ mb: 2 }} />
              {/* Name */}
              <Box sx={{ mb: 1 }}>
                <Typography variant="subtitle2" color="text.secondary">Name</Typography>
                <Typography variant="body2">{user?.name}</Typography>
              </Box>
              {/* Email */}
              <Box sx={{ mb: 1 }}>
                <Typography variant="subtitle2" color="text.secondary">Email</Typography>
                <Typography variant="body2">{user?.email}</Typography>
              </Box>
              {/* Phone Number */}
              <Box sx={{ mb: 1 }}>
                <Typography variant="subtitle2" color="text.secondary">Phone Number</Typography>
                <Typography variant="body2">{user?.phoneNumber}</Typography>
              </Box>
              {/* Identity Number */}
              <Box sx={{ mb: 1 }}>
                <Typography variant="subtitle2" color="text.secondary">Identity Number</Typography>
                <Typography variant="body2">{user?.identityNumber}</Typography>
              </Box>
              {/* Date of Birth */}
              <Box sx={{ mb: 1 }}>
                <Typography variant="subtitle2" color="text.secondary">Date of Birth</Typography>
                <Typography variant="body2">{user?.dateOfBirth?.slice(0, 10)}</Typography>
              </Box>
              {/* Age */}
              <Box sx={{ mb: 1 }}>
                <Typography variant="subtitle2" color="text.secondary">Age</Typography>
                <Typography variant="body2">{user?.age}</Typography>
              </Box>
              {/* Nationality */}
              <Box sx={{ mb: 1 }}>
                <Typography variant="subtitle2" color="text.secondary">Nationality</Typography>
                <Typography variant="body2">{user?.nationality}</Typography>
              </Box>
              {/* Marital Status */}
              <Box sx={{ mb: 1 }}>
                <Typography variant="subtitle2" color="text.secondary">Marital Status</Typography>
                <Typography variant="body2">{user?.maritalStatus}</Typography>
              </Box>
              {/* Education Level */}
              <Box sx={{ mb: 1 }}>
                <Typography variant="subtitle2" color="text.secondary">Education Level</Typography>
                <Typography variant="body2">{user?.educationLevel}</Typography>
              </Box>
              {/* Residency Status */}
              <Box sx={{ mb: 1 }}>
                <Typography variant="subtitle2" color="text.secondary">Residency Status</Typography>
                <Typography variant="body2">{user?.residencyStatus}</Typography>
              </Box>
            </Paper>
            {/* Address Section */}
            <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, borderColor: 'divider', mb: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                Address
              </Typography>
              <Divider sx={{ mb: 2 }} />
              {/* Address */}
              <Box>
                <Typography variant="body2">
                  {user?.address?.street}, {user?.address?.city}, {user?.address?.state} {user?.address?.postalCode}
                </Typography>
              </Box>
            </Paper>
            {/* Next of Kin Section */}
            <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, borderColor: 'divider' }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                Next of Kin
              </Typography>
              <Divider sx={{ mb: 2 }} />
              {/* Next of Kin */}
              <Box>
                <Typography variant="body2">
                  {user?.nextOfKin?.name} ({user?.nextOfKin?.relationship}) - {user?.nextOfKin?.phone}
                </Typography>
              </Box>
            </Paper>
          </Grid>
          {/* Employment & Account Section */}
          <Grid item xs={12} md={6}>
            <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, borderColor: 'divider', mb: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                Employment & Financial
              </Typography>
              <Divider sx={{ mb: 2 }} />
              {/* Job */}
              <Box sx={{ mb: 1 }}>
                <Typography variant="subtitle2" color="text.secondary">Job</Typography>
                <Typography variant="body2">{user?.job}</Typography>
              </Box>
              {/* Employer Name */}
              <Box sx={{ mb: 1 }}>
                <Typography variant="subtitle2" color="text.secondary">Employer Name</Typography>
                <Typography variant="body2">{user?.employerName}</Typography>
              </Box>
              {/* Employment Type */}
              <Box sx={{ mb: 1 }}>
                <Typography variant="subtitle2" color="text.secondary">Employment Type</Typography>
                <Typography variant="body2">{user?.employmentType}</Typography>
              </Box>
              {/* Salary */}
              <Box sx={{ mb: 1 }}>
                <Typography variant="subtitle2" color="text.secondary">Salary</Typography>
                <Typography variant="body2">{user?.salary}</Typography>
              </Box>
            </Paper>
            {/* Account Section */}
            <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, borderColor: 'divider', mb: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                Account Details
              </Typography>
              <Divider sx={{ mb: 2 }} />
              {/* Account Type */}
              <Box sx={{ mb: 1 }}>
                <Typography variant="subtitle2" color="text.secondary">Account Type</Typography>
                <Typography variant="body2">{user?.accountType}</Typography>
              </Box>
              {/* Purpose of Account */}
              <Box sx={{ mb: 1 }}>
                <Typography variant="subtitle2" color="text.secondary">Purpose of Account</Typography>
                <Typography variant="body2">{user?.purposeOfAccount}</Typography>
              </Box>
              {/* Application Status */}
              <Box sx={{ mb: 1 }}>
                <Typography variant="subtitle2" color="text.secondary">Application Status</Typography>
                <Typography variant="body2">{user?.applicationStatus}</Typography>
              </Box>
              {/* Is Verified */}
              <Box sx={{ mb: 1 }}>
                <Typography variant="subtitle2" color="text.secondary">Verified</Typography>
                <Typography variant="body2">{user?.isVerified ? "Yes" : "No"}</Typography>
              </Box>
              {/* Is Profile Complete */}
              <Box sx={{ mb: 1 }}>
                <Typography variant="subtitle2" color="text.secondary">Profile Complete</Typography>
                <Typography variant="body2">{user?.isProfileComplete ? "Yes" : "No"}</Typography>
              </Box>
              {/* Role */}
              <Box sx={{ mb: 1 }}>
                <Typography variant="subtitle2" color="text.secondary">Role</Typography>
                <Typography variant="body2">{user?.role}</Typography>
              </Box>
            </Paper>
            {/* Preferences Section */}
            <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, borderColor: 'divider' }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                Preferences
              </Typography>
              <Divider sx={{ mb: 2 }} />
              {/* Preferences */}
              <Box>
                <Typography variant="body2">
                  Theme: {user?.preferences?.theme}, Language: {user?.preferences?.language}, Notifications: {user?.preferences?.notifications ? "On" : "Off"}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained" color="primary" fullWidth>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProfileModal;
