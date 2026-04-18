import { alpha, Box, styled } from "@mui/material";

export const NotificationDot = styled(Box)(({ theme }) => ({
  width: 8,
  height: 8,
  borderRadius: "50%",
  backgroundColor: theme.palette.primary.main,
  flexShrink: 0,
}));

export const UnreadItemBox = styled(Box)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.primary.main, 0.05),
}));
