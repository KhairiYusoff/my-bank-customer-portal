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
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useTheme } from "@mui/material/styles";

interface ProfileModalProps {
  open: boolean;
  onClose: () => void;
  user: any;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ open, onClose, user }) => {
  const theme = useTheme();
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ textAlign: "center", pb: 0 }}>My Profile</DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Avatar
            sx={{
              width: 64,
              height: 64,
              bgcolor: theme.palette.primary.main,
              mb: 1,
            }}
          >
            {user?.name ? (
              user.name[0].toUpperCase()
            ) : (
              <AccountCircle fontSize="large" />
            )}
          </Avatar>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {user?.name || "User"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {user?.email || "user@email.com"}
          </Typography>
        </Box>
        <Divider sx={{ mb: 2 }} />
        {/* Extendable: Add more user info fields here */}
        <Box sx={{ mb: 1 }}>
          <Typography variant="subtitle2" color="text.secondary">
            Role
          </Typography>
          <Typography variant="body2">{user?.role || "Customer"}</Typography>
        </Box>
        {/* Add more fields as needed */}
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
