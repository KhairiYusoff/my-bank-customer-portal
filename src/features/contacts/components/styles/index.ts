import { styled, alpha } from "@mui/material/styles";
import { Card, Button, Avatar, Box, Chip } from "@mui/material";

export const ContactCard = styled(Card)(({ theme }) => ({
  height: "100%",
  borderRadius: theme.shape.borderRadius * 3,
  boxShadow: theme.palette.customShadows.card,
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: theme.palette.customShadows.cardHover,
  },
}));

export const ContactSectionIconAvatar = styled(Avatar, {
  shouldForwardProp: (prop) => prop !== "$colorScheme",
})<{ $colorScheme: "primary" | "info" }>(({ theme, $colorScheme }) => ({
  backgroundColor: alpha(theme.palette[$colorScheme].main, 0.08),
  width: 48,
  height: 48,
  marginRight: theme.spacing(2),
}));

export const ContactItemBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: alpha(theme.palette.primary.main, 0.03),
  borderRadius: theme.shape.borderRadius * 2,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
}));

export const ContactFormCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 3,
  boxShadow: theme.palette.customShadows.card,
}));

export const InfoFormAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.info.main, 0.1),
  marginRight: theme.spacing(2),
}));

export const SendMessageButton = styled(Button)(({ theme }) => ({
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
  borderRadius: theme.shape.borderRadius * 2,
  background: theme.palette.gradients.primary,
  fontSize: "1rem",
  fontWeight: 600,
  "&:hover": {
    background: theme.palette.gradients.primary,
  },
}));

export const AboutInfoBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: alpha(theme.palette.primary.main, 0.05),
  borderRadius: theme.shape.borderRadius * 2,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
}));

export const WhiteOverlayChip = styled(Chip)(() => ({
  backgroundColor: alpha("#ffffff", 0.2),
  color: "white",
  "& .MuiChip-icon": { color: "white" },
}));
