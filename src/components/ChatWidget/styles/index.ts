import { Box, IconButton, styled } from "@mui/material";

export const ChatFab = styled(IconButton)(({ theme }) => ({
  position: "fixed",
  bottom: theme.spacing(3),
  right: theme.spacing(3),
  width: 56,
  height: 56,
  background: theme.palette.gradients.primary,
  color: theme.palette.common.white,
  boxShadow: theme.palette.customShadows.card,
  zIndex: theme.zIndex.speedDial,
  "&:hover": {
    background: theme.palette.gradients.primary,
    boxShadow: theme.palette.customShadows.cardHover,
    transform: "scale(1.05)",
  },
  transition: "transform 0.2s ease, box-shadow 0.2s ease",
}));

export const ChatWindow = styled(Box)(({ theme }) => ({
  position: "fixed",
  bottom: theme.spacing(10),
  right: theme.spacing(3),
  width: 360,
  height: 520,
  display: "flex",
  flexDirection: "column",
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.palette.customShadows.cardHover,
  overflow: "hidden",
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  zIndex: theme.zIndex.speedDial,
  [theme.breakpoints.down("sm")]: {
    width: "calc(100vw - 32px)",
    right: theme.spacing(2),
  },
}));

export const ChatHeader = styled(Box)(({ theme }) => ({
  background: theme.palette.gradients.primary,
  padding: theme.spacing(1.5, 2),
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  color: theme.palette.common.white,
  flexShrink: 0,
}));

export const MessagesContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  overflowY: "auto",
  padding: theme.spacing(2),
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1),
}));

export const MessageBubble = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isUser",
})<{ isUser?: boolean }>(({ theme, isUser }) => ({
  maxWidth: "80%",
  padding: theme.spacing(1, 1.5),
  borderRadius: isUser
    ? `${theme.shape.borderRadius * 2}px ${theme.shape.borderRadius * 2}px 4px ${theme.shape.borderRadius * 2}px`
    : `${theme.shape.borderRadius * 2}px ${theme.shape.borderRadius * 2}px ${theme.shape.borderRadius * 2}px 4px`,
  backgroundColor: isUser
    ? theme.palette.primary.main
    : theme.palette.action.hover,
  color: isUser ? theme.palette.common.white : theme.palette.text.primary,
  alignSelf: isUser ? "flex-end" : "flex-start",
  wordBreak: "break-word",
  fontSize: "0.875rem",
  lineHeight: 1.5,
}));

export const InputRow = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  padding: theme.spacing(1.5),
  borderTop: `1px solid ${theme.palette.divider}`,
  flexShrink: 0,
}));
