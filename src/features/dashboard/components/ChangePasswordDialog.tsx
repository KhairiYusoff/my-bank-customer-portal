import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { useChangePasswordMutation } from "../store/profileApi";
import { useSnackbar } from "notistack";
import ChangePasswordForm from "./profile/forms/ChangePasswordForm";
import type { ChangePasswordRequest } from "@features/dashboard/types/profile";

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
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Change Password</DialogTitle>
      <DialogContent>
        <ChangePasswordForm
          key={formKey}
          onSubmit={handleSubmit}
          loading={isLoading}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" disabled={isLoading}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ChangePasswordDialog;
