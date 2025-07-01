import React from "react";
import { Menu, MenuItem, Avatar, Typography, Box } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { useTheme } from "@mui/material/styles";

interface ProfileDropdownProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  onProfile: () => void;
  onLogout: () => void;
  user: any;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ anchorEl, open, onClose, onProfile, onLogout, user }) => {
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
          }
        }
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, px: 1, py: 1 }}>
        <Avatar sx={{ width: 40, height: 40, bgcolor: theme.palette.primary.main }}>
          {user?.name ? user.name[0].toUpperCase() : <AccountCircle />}
        </Avatar>
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            {user?.name || 'User'}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: 13 }}>
            {user?.email || 'user@email.com'}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ my: 1 }}>
        <hr style={{ border: 0, borderTop: `1px solid ${theme.palette.divider}` }} />
      </Box>
      <MenuItem onClick={onProfile} sx={{ gap: 1.5 }}>
        <AccountCircle fontSize="small" color="primary" />
        My Profile
      </MenuItem>
      <MenuItem onClick={onLogout} sx={{ gap: 1.5 }}>
        <LogoutIcon fontSize="small" color="error" />
        Logout
      </MenuItem>
    </Menu>
  );
};

export default ProfileDropdown;
