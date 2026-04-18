import { ListItemButton, styled } from "@mui/material";
import type { LinkProps } from "react-router-dom";

// ─── Sidebar Nav Item ─────────────────────────────────────────────────────────

export const StyledListItem = styled(ListItemButton)<
  LinkProps & { component?: React.ElementType }
>(({ theme }) => ({
  "& .MuiListItemIcon-root": {
    color: theme.palette.common.white,
  },
  "&:hover": {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    "& .MuiListItemIcon-root": {
      color: theme.palette.primary.contrastText,
    },
  },
  "&.Mui-selected": {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    "& .MuiListItemIcon-root": {
      color: theme.palette.primary.contrastText,
    },
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  },
}));

// ─── Header Avatar ────────────────────────────────────────────────────────────

export const HeaderAvatar = styled("div")(({ theme }) => ({
  width: 40,
  height: 40,
  borderRadius: "50%",
  backgroundColor: theme.palette.primary.dark,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.common.white,
  fontWeight: "bold",
  fontSize: "1rem",
}));
