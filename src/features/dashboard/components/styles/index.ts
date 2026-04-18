import { alpha, Avatar, Button, Card, Paper, styled, Typography } from "@mui/material";
import type { AccountColorScheme } from "../../constants/accountColorMap";

// ─── Dashboard Title ──────────────────────────────────────────────────────────

export const GradientPageTitle = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  background: theme.palette.gradients.primary,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  marginBottom: theme.spacing(4),
}));

// ─── Account Card ─────────────────────────────────────────────────────────────

export const DashboardAccountCard = styled(Card)(({ theme }) => ({
  height: "100%",
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: theme.palette.customShadows.cardHover,
  },
}));

export const AccountTypeAvatar = styled(Avatar)<{ $colorScheme: AccountColorScheme }>(
  ({ theme, $colorScheme }) => ({
    backgroundColor: (theme.palette as any)[$colorScheme].main,
    marginRight: theme.spacing(2),
    width: 56,
    height: 56,
  })
);

export const AccountNumberBox = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.subtle,
  borderRadius: theme.shape.borderRadius * 2,
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

export const BalanceBox = styled("div")<{ $colorScheme: AccountColorScheme }>(
  ({ theme, $colorScheme }) => ({
    backgroundColor: alpha((theme.palette as any)[$colorScheme].main, 0.05),
    borderRadius: theme.shape.borderRadius * 2,
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
  })
);

export const AccountViewButton = styled(Button)<{ $colorScheme: AccountColorScheme }>(
  ({ theme, $colorScheme }) => ({
    marginTop: "auto",
    background: `linear-gradient(135deg, ${(theme.palette as any)[$colorScheme].main} 0%, ${(theme.palette as any)[$colorScheme].dark} 100%)`,
    "&:hover": {
      background: `linear-gradient(135deg, ${(theme.palette as any)[$colorScheme].main} 20%, ${(theme.palette as any)[$colorScheme].dark} 80%)`,
    },
  })
);

// ─── Quick Actions ────────────────────────────────────────────────────────────

export const QuickActionsPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(4),
  background: theme.palette.gradients.primary,
  color: "white",
}));

export const QuickActionButton = styled(Button)(() => ({
  backgroundColor: alpha("#ffffff", 0.15),
  "&:hover": { backgroundColor: alpha("#ffffff", 0.25) },
}));

// ─── Accounts Section ─────────────────────────────────────────────────────────

export const AccountsSectionTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  fontWeight: 600,
  color: theme.palette.primary.main,
}));
