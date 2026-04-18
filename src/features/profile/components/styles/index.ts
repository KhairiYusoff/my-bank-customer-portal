import { alpha, Avatar, Button, Card, Chip, LinearProgress, Paper, styled } from "@mui/material";

export type ProfileColorScheme = "primary" | "info" | "success" | "warning" | "secondary";

// ─── Hero Section ────────────────────────────────────────────────────────────

export const HeroPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginBottom: theme.spacing(4),
  background: theme.palette.gradients.primary,
  color: "white",
  borderRadius: theme.shape.borderRadius * 3,
  position: "relative",
  overflow: "hidden",
}));

export const HeroAvatarCircle = styled(Avatar)(() => ({
  width: 80,
  height: 80,
  backgroundColor: alpha("#ffffff", 0.2),
  fontSize: "2rem",
  fontWeight: "bold",
  marginRight: 24,
  border: `3px solid ${alpha("#ffffff", 0.3)}`,
}));

export const HeroVerifiedChip = styled(Chip)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.success.main, 0.8),
  color: "white",
}));

export const HeroStatusChip = styled(Chip)(() => ({
  backgroundColor: alpha("#ffffff", 0.2),
  color: "white",
}));

export const HeroOutlinedButton = styled(Button)(() => ({
  color: "white",
  borderColor: alpha("#ffffff", 0.5),
  "&:hover": {
    borderColor: "white",
    backgroundColor: alpha("#ffffff", 0.1),
  },
}));

export const HeroActionButton = styled(Button)(() => ({
  backgroundColor: alpha("#ffffff", 0.2),
  "&:hover": { backgroundColor: alpha("#ffffff", 0.3) },
}));

// ─── Section Cards ───────────────────────────────────────────────────────────

export const SectionCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 3,
  boxShadow: theme.palette.customShadows.card,
  height: "fit-content",
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: theme.palette.customShadows.cardHover,
  },
}));

export const SectionIconAvatar = styled(Avatar)<{ $colorScheme: ProfileColorScheme }>(
  ({ theme, $colorScheme }) => ({
    backgroundColor: alpha(theme.palette[$colorScheme].main, 0.1),
    marginRight: theme.spacing(2),
    width: 48,
    height: 48,
  })
);

export const SectionDataBox = styled("div")<{ $colorScheme: ProfileColorScheme }>(
  ({ theme, $colorScheme }) => ({
    padding: theme.spacing(2),
    backgroundColor: alpha(theme.palette[$colorScheme].main, 0.05),
    borderRadius: theme.shape.borderRadius * 2,
    border: `1px solid ${alpha(theme.palette[$colorScheme].main, 0.15)}`,
  })
);

// ─── Password Form ───────────────────────────────────────────────────────────

export const PasswordSectionAvatar = styled(Avatar)<{ $variant: "current" | "new" }>(
  ({ theme, $variant }) => ({
    backgroundColor: alpha(
      $variant === "current" ? theme.palette.error.main : theme.palette.primary.main,
      0.1
    ),
    marginRight: theme.spacing(2),
    width: 32,
    height: 32,
  })
);

export const PasswordRequirementsBox = styled("div")(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: alpha(theme.palette.primary.main, 0.03),
  borderRadius: theme.shape.borderRadius * 2,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
}));

export const PasswordSubmitButton = styled(Button)(({ theme }) => ({
  flex: 1,
  paddingTop: theme.spacing(1.5),
  paddingBottom: theme.spacing(1.5),
  borderRadius: theme.shape.borderRadius * 2,
  background: theme.palette.gradients.primary,
  fontSize: "1rem",
  fontWeight: 600,
  "&:hover": {
    background: theme.palette.gradients.primary,
    filter: "brightness(0.92)",
  },
  "&:disabled": {
    background: alpha(theme.palette.common.black, 0.12),
  },
}));

export const StrengthChip = styled(Chip)<{ $strength: number }>(
  ({ theme, $strength }) => ({
    backgroundColor:
      $strength < 25
        ? theme.palette.error.main
        : $strength < 50
        ? theme.palette.warning.main
        : $strength < 75
        ? theme.palette.info.main
        : theme.palette.success.main,
    color: "white",
    fontWeight: 600,
    fontSize: "0.75rem",
  })
);

export const StrengthBar = styled(LinearProgress)<{ $strength: number }>(
  ({ theme, $strength }) => ({
    height: 6,
    borderRadius: 3,
    backgroundColor: alpha(theme.palette.common.black, 0.1),
    "& .MuiLinearProgress-bar": {
      backgroundColor:
        $strength < 25
          ? theme.palette.error.main
          : $strength < 50
          ? theme.palette.warning.main
          : $strength < 75
          ? theme.palette.info.main
          : theme.palette.success.main,
      borderRadius: 3,
    },
  })
);

// ─── Change Password Dialog ──────────────────────────────────────────────────

export const DialogGradientHeader = styled(Paper)(({ theme }) => ({
  paddingLeft: theme.spacing(4),
  paddingRight: theme.spacing(4),
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
  background: theme.palette.gradients.primary,
  color: "white",
  borderRadius: "12px 12px 0 0",
  position: "relative",
}));

export const DialogHeaderAvatar = styled(Avatar)(() => ({
  backgroundColor: alpha("#ffffff", 0.2),
  marginRight: 16,
  width: 48,
  height: 48,
}));

export const DialogCloseButton = styled(Button)(() => ({
  color: "white",
  minWidth: "auto",
  padding: 8,
  "&:hover": {
    backgroundColor: alpha("#ffffff", 0.1),
  },
}));
