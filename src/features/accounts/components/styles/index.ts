import { styled, alpha } from "@mui/material/styles";
import { Card, Button, Avatar, Typography } from "@mui/material";

export const GradientBalanceCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  background: theme.palette.gradients.primary,
  color: theme.palette.common.white,
  boxShadow: theme.palette.customShadows.cardHover,
}));

export const ActionButton = styled(Button)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.common.white, 0.2),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.3),
  },
}));

export const HeaderIconAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.common.white, 0.2),
  width: 56,
  height: 56,
  marginRight: theme.spacing(2),
}));

export const GradientTitle = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  background: theme.palette.gradients.primary,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  marginBottom: theme.spacing(4),
}));

export const PrimaryIconAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.primary.main, 0.1),
  marginRight: theme.spacing(2),
}));

export const SuccessIconAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.success.main, 0.1),
  marginRight: theme.spacing(2),
}));

export const ErrorIconAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.error.main, 0.1),
  marginRight: theme.spacing(2),
}));

export const NeutralIconAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.text.secondary, 0.1),
  marginRight: theme.spacing(2),
}));

export const DepositFormCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 3,
  boxShadow: theme.palette.customShadows.success,
}));

export const WithdrawFormCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 3,
  boxShadow: theme.palette.customShadows.error,
}));

export const DepositSubmitButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(3),
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
  borderRadius: theme.shape.borderRadius * 2,
  background: theme.palette.gradients.success,
  fontSize: "1.1rem",
  fontWeight: 600,
  "&:hover": {
    background: theme.palette.gradients.success,
  },
  "&:disabled": {
    background: "rgba(0, 0, 0, 0.12)",
  },
}));

export const WithdrawSubmitButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(3),
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
  borderRadius: theme.shape.borderRadius * 2,
  background: theme.palette.gradients.error,
  fontSize: "1.1rem",
  fontWeight: 600,
  "&:hover": {
    background: theme.palette.gradients.error,
  },
  "&:disabled": {
    background: "rgba(0, 0, 0, 0.12)",
  },
}));
