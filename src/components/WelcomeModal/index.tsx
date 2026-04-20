import React from "react";
import { Dialog, DialogContent, Typography, Button } from "@mui/material";
import { AccountBalance as BankIcon } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { dismissWelcome } from "@/features/auth/store/authSlice";

import { ModalHeader, ModalAvatar } from "./styles";

const WelcomeModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const isFirstTime = useAppSelector((state) => state.auth.isFirstTime);
  const userName = useAppSelector((state) => state.auth.user?.name);

  const handleClose = () => {
    dispatch(dismissWelcome());
  };

  return (
    <Dialog
      open={isFirstTime}
      onClose={handleClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{ sx: { borderRadius: 3, overflow: "hidden" } }}
    >
      <ModalHeader>
        <ModalAvatar>
          <BankIcon />
        </ModalAvatar>
        <Typography variant="h5" fontWeight={700} color="common.white" textAlign="center">
          Welcome to My Bank!
        </Typography>
        <Typography variant="body2" color="rgba(255,255,255,0.85)" textAlign="center">
          Hello{userName ? `, ${userName}` : ""}! Your account is active and ready to use.
        </Typography>
      </ModalHeader>

      <DialogContent sx={{ px: 4, py: 3 }}>
        <Typography variant="body1" color="text.secondary" textAlign="center" mb={3}>
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
          onClick={handleClose}
          sx={{ borderRadius: 2, py: 1.5 }}
        >
          Get Started
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomeModal;
