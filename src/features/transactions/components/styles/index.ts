import { styled, alpha } from "@mui/material/styles";
import { Card, Button, Avatar, Box, DialogTitle } from "@mui/material";

export const TransferFormCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 3,
  boxShadow: theme.palette.customShadows.card,
}));

export const PrimaryIconAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.primary.main, 0.1),
}));

export const InfoIconAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.info.main, 0.1),
}));

export const WarningIconAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.warning.main, 0.1),
}));

export const TransferIconAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: theme.palette.info.main,
  width: 48,
  height: 48,
}));

export const TransferSubmitButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(3),
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
  borderRadius: theme.shape.borderRadius * 2,
  background: theme.palette.gradients.primary,
  fontSize: "1.1rem",
  fontWeight: 600,
  "&:hover": {
    background: theme.palette.gradients.primary,
  },
  "&:disabled": {
    background: "rgba(0, 0, 0, 0.12)",
  },
}));

export const TransferConfirmButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 2,
  background: theme.palette.gradients.primary,
  paddingLeft: theme.spacing(3),
  paddingRight: theme.spacing(3),
  "&:hover": {
    background: theme.palette.gradients.primary,
  },
}));

export const GradientDialogTitle = styled(DialogTitle)(({ theme }) => ({
  background: theme.palette.gradients.primary,
  color: theme.palette.common.white,
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),
}));

export const PrimaryDialogInfoBox = styled(Box)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.primary.main, 0.05),
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius * 2,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
}));

export const InfoDialogInfoBox = styled(Box)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.info.main, 0.05),
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius * 2,
  border: `1px solid ${alpha(theme.palette.info.main, 0.1)}`,
}));

export const WarningDialogInfoBox = styled(Box)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.warning.main, 0.05),
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius * 2,
  border: `1px solid ${alpha(theme.palette.warning.main, 0.1)}`,
  textAlign: "center",
}));
