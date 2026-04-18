import React from "react";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import {
  Person as PersonIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Verified as VerifiedIcon,
} from "@mui/icons-material";
import type { UserProfile } from "../types/profile";
import {
  HeroPaper,
  HeroAvatarCircle,
  HeroVerifiedChip,
  HeroStatusChip,
  HeroOutlinedButton,
  HeroActionButton,
} from "./styles";

interface ProfileHeroCardProps {
  user: UserProfile;
  editMode: boolean;
  isLoading: boolean;
  formChanged: boolean;
  onEdit: () => void;
  onCancel: () => void;
  onSave: () => void;
}

const ProfileHeroCard: React.FC<ProfileHeroCardProps> = ({
  user,
  editMode,
  isLoading,
  formChanged,
  onEdit,
  onCancel,
  onSave,
}) => {
  return (
    <HeroPaper>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* User Identity */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <HeroAvatarCircle>
            {user.name ? user.name[0].toUpperCase() : <PersonIcon fontSize="large" />}
          </HeroAvatarCircle>
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                {user.name || "User Profile"}
              </Typography>
              {user.isVerified && (
                <HeroVerifiedChip icon={<VerifiedIcon />} label="Verified" size="small" />
              )}
            </Box>
            <Typography variant="h6" sx={{ opacity: 0.9, mb: 1 }}>
              {user.email}
            </Typography>
            <Stack direction="row" spacing={1}>
              <HeroStatusChip label={user.role} size="small" />
              <HeroStatusChip label={user.applicationStatus} size="small" />
            </Stack>
          </Box>
        </Box>

        {/* Action Buttons */}
        {editMode ? (
          <Stack direction="row" spacing={2}>
            <HeroOutlinedButton
              variant="outlined"
              onClick={onCancel}
              startIcon={<CancelIcon />}
              disabled={isLoading}
            >
              Cancel
            </HeroOutlinedButton>
            <HeroActionButton
              variant="contained"
              onClick={onSave}
              startIcon={isLoading ? <CircularProgress size={16} /> : <SaveIcon />}
              disabled={isLoading || !formChanged}
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </HeroActionButton>
          </Stack>
        ) : (
          <HeroActionButton variant="contained" onClick={onEdit} startIcon={<EditIcon />}>
            Edit Profile
          </HeroActionButton>
        )}
      </Box>
    </HeroPaper>
  );
};

export default ProfileHeroCard;
