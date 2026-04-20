import { Box, styled } from "@mui/material";

export const ModalHeader = styled(Box)(({ theme }) => ({
  background: theme.palette.gradients.primary,
  padding: theme.spacing(4),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: theme.spacing(1.5),
}));

export const ModalAvatar = styled(Box)(({ theme }) => ({
  backgroundColor: "rgba(255,255,255,0.2)",
  borderRadius: "50%",
  width: 64,
  height: 64,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.common.white,
  "& svg": { fontSize: 36 },
}));
