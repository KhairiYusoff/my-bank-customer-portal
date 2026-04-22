import { styled, alpha } from "@mui/material/styles";
import { Avatar, Card, Paper, TableCell, Tabs } from "@mui/material";

export const ExpensesPaper = styled(Paper)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 3,
  boxShadow: theme.palette.customShadows.card,
  overflow: "hidden",
}));

export const TabsContainer = styled(Tabs)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  backgroundColor: alpha(theme.palette.primary.main, 0.02),
  "& .MuiTab-root": {
    minHeight: 64,
    fontSize: "0.95rem",
    fontWeight: 500,
    textTransform: "none",
    color: theme.palette.text.secondary,
    "&.Mui-selected": {
      color: theme.palette.primary.main,
      fontWeight: 600,
    },
  },
  "& .MuiTabs-indicator": {
    backgroundColor: theme.palette.primary.main,
    height: 3,
  },
}));

export const DialogHeaderBox = styled("div")(({ theme }) => ({
  backgroundColor: alpha(theme.palette.primary.main, 0.05),
  borderBottom: `1px solid ${theme.palette.divider}`,
  padding: theme.spacing(2),
}));

export const TableHeaderCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 600,
  color: theme.palette.primary.main,
  backgroundColor: alpha(theme.palette.primary.main, 0.05),
}));

export const SectionLabel = styled("span")(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 600,
}));

export const ExpenseAmountCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
  border: "none",
  boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.1)}`,
}));

export const ExpenseFormCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 3,
  boxShadow: theme.palette.customShadows.card,
}));

export const AnalyticsStatsCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 4,
  boxShadow: theme.palette.customShadows.card,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.08)}`,
  transition: "box-shadow 0.2s",
  "&:hover": {
    boxShadow: theme.palette.customShadows.cardHover,
  },
}));

export const AnalyticsChartCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 4,
  boxShadow: theme.palette.customShadows.card,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.08)}`,
}));

export const AnalyticsStatAvatar = styled(Avatar)(({ theme }) => ({
  width: 52,
  height: 52,
  backgroundColor: alpha(theme.palette.primary.main, 0.1),
  color: theme.palette.primary.main,
}));
