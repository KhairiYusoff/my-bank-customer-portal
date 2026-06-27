import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  Typography,
  Button,
  Alert,
} from "@mui/material";
import {
  AccountBalance as BankIcon,
  Lock as LockIcon,
} from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { dismissWelcome } from "@/features/auth/store/authSlice";
import ChangePasswordDialog from "@/features/profile/pages/ChangePasswordDialog";

import { ModalHeader, ModalAvatar } from "./styles";

const WelcomeModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const isFirstTime = useAppSelector((state) => state.auth.isFirstTime);
  const userName = useAppSelector((state) => state.auth.user?.name);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);

  const handleGetStarted = () => {
    setShowPasswordDialog(true);
  };

  const handlePasswordSuccess = () => {
    dispatch(dismissWelcome());
    setShowPasswordDialog(false);
  };

  const handleClose = (_event: any, reason: string) => {
    // Prevent closing if it's first time and password hasn't been changed
    if (isFirstTime && !showPasswordDialog) {
      return;
    }
    // Also prevent closing via escape key or backdrop click
    if (reason === "escapeKeyDown" || reason === "backdropClick") {
      return;
    }
  };

  return (
    <>
      <Dialog
        open={isFirstTime && !showPasswordDialog}
        onClose={handleClose}
        maxWidth="xs"
        fullWidth
        PaperProps={{ sx: { borderRadius: 3, overflow: "hidden" } }}
      >
        <ModalHeader>
          <ModalAvatar>
            <BankIcon />
          </ModalAvatar>
          <Typography
            variant="h5"
            fontWeight={700}
            color="common.white"
            textAlign="center"
          >
            Welcome to My Bank!
          </Typography>
          <Typography
            variant="body2"
            color="rgba(255,255,255,0.85)"
            textAlign="center"
          >
            Hello{userName ? `, ${userName}` : ""}! Your account is active and
            ready to use.
          </Typography>
        </ModalHeader>

        <DialogContent sx={{ px: 4, py: 3 }}>
          <Alert severity="info" sx={{ mb: 3, borderRadius: 2 }}>
            <Typography variant="body2">
              For your security, you are required to change your password before
              continuing.
            </Typography>
          </Alert>
          <Typography
            variant="body1"
            color="text.secondary"
            textAlign="center"
            mb={3}
          >
            Here's what you can do to get started:
          </Typography>
          <ul style={{ paddingLeft: 20, marginBottom: 24 }}>
            <li>
              <Typography variant="body2" color="text.secondary">
                View your account balance and transactions
              </Typography>
            </li>
            <li>
              <Typography variant="body2" color="text.secondary">
                Transfer funds between accounts
              </Typography>
            </li>
            <li>
              <Typography variant="body2" color="text.secondary">
                Track your expenses and spending habits
              </Typography>
            </li>
            <li>
              <Typography variant="body2" color="text.secondary">
                Update your profile and preferences
              </Typography>
            </li>
          </ul>
          <Button
            fullWidth
            variant="contained"
            size="large"
            onClick={handleGetStarted}
            startIcon={<LockIcon />}
            sx={{ borderRadius: 2, py: 1.5 }}
          >
            Change Password to Continue
          </Button>
        </DialogContent>
      </Dialog>

      <ChangePasswordDialog
        open={showPasswordDialog}
        onClose={handlePasswordSuccess}
        isForced={true}
      />
    </>
  );
};

export default WelcomeModal;
