import React, { useState, forwardRef } from "react";
import { styled, useTheme } from "@mui/material/styles";
import { ListItemButton, Box } from "@mui/material";
import { Link, useNavigate, useLocation, LinkProps } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { logout } from "@/features/auth/store/authSlice";
import DashboardSidebar from "./DashboardSidebar";
import DashboardHeader from "./DashboardHeader";
import ProfileDropdown from "./ProfileDropdown";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  const drawerWidth = 240;

  const navItems = [
    { text: "Dashboard", path: "/dashboard", icon: <DashboardIcon /> },
    { text: "Transfer", path: "/transfer", icon: <SyncAltIcon /> },
    { text: "Deposit", path: "/deposit", icon: <AccountBalanceWalletIcon /> },
    { text: "Withdraw", path: "/withdraw", icon: <AttachMoneyIcon /> },
  ];

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    handleClose();
    navigate("/login");
  };

  const handleProfile = () => {
    handleClose();
    navigate("/profile");
  };

  interface ListItemLinkProps extends LinkProps {
    children: React.ReactNode;
  }

  const ListItemLink = forwardRef<HTMLAnchorElement, ListItemLinkProps>(
    function ListItemLink(props, ref) {
      const { to, children, ...other } = props;
      return (
        <ListItemButton component={Link} to={to} ref={ref} {...other}>
          {children}
        </ListItemButton>
      );
    }
  );

  const StyledListItem = styled(ListItemButton)<
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

  return (
    <div style={{ display: "flex" }}>
      <DashboardSidebar
        drawerWidth={drawerWidth}
        navItems={navItems}
        ListItemLink={ListItemLink}
        StyledListItem={StyledListItem}
      />
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: `calc(100% - ${drawerWidth}px)` }}
      >
        <DashboardHeader
          drawerWidth={drawerWidth}
          onMenuClick={handleMenu}
          user={user}
        />
        <ProfileDropdown
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          onProfile={handleProfile}
          onLogout={handleLogout}
          user={user}
        />
        <div style={{ height: 64 }} /> {/* Spacer for AppBar */}
        {children}
      </Box>
    </div>
  );
};

export default DashboardLayout;
