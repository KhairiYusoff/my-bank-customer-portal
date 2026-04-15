import { styled, alpha } from "@mui/material/styles";
import { Paper, TableCell, Tabs } from "@mui/material";

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
