import React from "react";
import { Menu, MenuItem, Avatar, Typography, Box } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { useTheme } from "@mui/material/styles";
import type { UserProfile } from "../types/profile";

interface ProfileDropdownProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  onProfile: () => void;
  onLogout: () => void;
  user: UserProfile | undefined;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({
  anchorEl,
  open,
  onClose,
  onProfile,
  onLogout,
  user,
}) => {
  const theme = useTheme();
  return (
    <Menu
      id="menu-appbar"
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            minWidth: 220,
            p: 1.5,
            borderRadius: 2,
            boxShadow: 3,
          },
        },
      }}
    >
      {/* User Info Section */}
      <Box
        sx={{ display: "flex", alignItems: "center", gap: 1.5, px: 1, py: 1 }}
      >
        {/* User Avatar */}
        <Avatar
          sx={{ width: 40, height: 40, bgcolor: theme.palette.primary.main }}
        >
          {user?.name ? user.name[0].toUpperCase() : <AccountCircle />}
        </Avatar>
        <Box>
          {/* User Name */}
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            {user?.name || "User"}
          </Typography>
          {/* User Email */}
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: 13 }}
          >
            {user?.email || "user@email.com"}
          </Typography>
        </Box>
      </Box>
      <MenuItem onClick={onProfile} sx={{ mt: 1 }}>
        {/* My Profile */}
        <AccountCircle fontSize="small" sx={{ mr: 1 }} /> My Profile
      </MenuItem>
      <MenuItem onClick={onLogout} sx={{ color: "error.main" }}>
        {/* Logout */}
        <LogoutIcon fontSize="small" sx={{ mr: 1 }} /> Logout
      </MenuItem>
    </Menu>
  );
};

export default ProfileDropdown;
