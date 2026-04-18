import React from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
} from "@mui/material";
import {
  Lock as LockIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { useChangePasswordMutation } from "@/features/profile/store/profileApi";
import { useSnackbar } from "notistack";
import ChangePasswordForm from "../components/ChangePasswordForm";
import type { ChangePasswordRequest } from "@/features/profile/types/profile";
import {
  DialogGradientHeader,
  DialogHeaderAvatar,
  DialogCloseButton,
} from "../components/styles";

interface ChangePasswordDialogProps {
  open: boolean;
  onClose: () => void;
}

const ChangePasswordDialog: React.FC<ChangePasswordDialogProps> = ({
  open,
  onClose,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const [formKey, setFormKey] = React.useState(0); // For resetting form

  const handleSubmit = async (data: ChangePasswordRequest) => {
    try {
      await changePassword(data).unwrap();
      enqueueSnackbar("Password changed successfully", { variant: "success" });
      onClose();
      setFormKey((k) => k + 1); // Reset form
    } catch (err: any) {
      enqueueSnackbar(err?.data?.message || "Failed to change password", {
        variant: "error",
      });
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="sm" 
      fullWidth
      PaperProps={{
        sx: { 
          borderRadius: 3,
          overflow: 'visible'
        }
      }}
    >
      <DialogContent sx={{ p: 0 }}>
        {/* Gradient Header */}
        <DialogGradientHeader>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <DialogHeaderAvatar>
                <LockIcon fontSize="medium" />
              </DialogHeaderAvatar>
              <Box>
                <Typography variant="h5" sx={{ fontWeight: "bold", mb: 0.5 }}>
                  Change Password
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Update your account security
                </Typography>
              </Box>
            </Box>
            <DialogCloseButton onClick={onClose} disabled={isLoading}>
              <CloseIcon />
            </DialogCloseButton>
          </Box>
        </DialogGradientHeader>

        {/* Form Section */}
        <Box sx={{ p: 4 }}>
          <ChangePasswordForm
            key={formKey}
            onSubmit={handleSubmit}
            loading={isLoading}
          />
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ChangePasswordDialog;
