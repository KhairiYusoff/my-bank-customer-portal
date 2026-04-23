import {
  alpha,
  Box,
  Card,
  LinearProgress,
  styled,
  Typography,
} from "@mui/material";

export const InsightsCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.palette.customShadows.card,
  overflow: "hidden",
  transition: "box-shadow 0.3s ease",
  "&:hover": {
    boxShadow: theme.palette.customShadows.cardHover,
  },
}));

export const InsightsHeader = styled(Box)(({ theme }) => ({
  background: theme.palette.gradients.primary,
  padding: theme.spacing(2.5, 3),
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1.5),
}));

export const InsightsHeaderTitle = styled(Typography)(() => ({
  color: "#fff",
  fontWeight: 700,
  fontSize: "1rem",
  lineHeight: 1.2,
}));

export const InsightsHeaderSubtitle = styled(Typography)(() => ({
  color: "rgba(255,255,255,0.8)",
  fontSize: "0.75rem",
}));

export const InsightsBody = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2.5, 3),
}));

export const NarrativeBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.subtle,
  borderRadius: theme.shape.borderRadius * 1.5,
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2.5),
}));

export const CategoryRow = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1.5),
  marginBottom: theme.spacing(1.5),
}));

export const CategoryBar = styled(LinearProgress)<{ $pct: number }>(
  ({ theme, $pct: _ }) => ({
    flex: 1,
    height: 8,
    borderRadius: 4,
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
    "& .MuiLinearProgress-bar": {
      background: theme.palette.gradients.primary,
      borderRadius: 4,
    },
  }),
);

export const PeriodChipRow = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(1),
  marginBottom: theme.spacing(2),
  flexWrap: "wrap",
}));
