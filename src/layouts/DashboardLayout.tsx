import React, { useState, forwardRef } from "react";
import { styled, useTheme } from "@mui/material/styles";
import { ListItemButton, Box } from "@mui/material";
import { Link, useNavigate, useLocation, LinkProps } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import PersonIcon from "@mui/icons-material/Person";
import ReceiptIcon from "@mui/icons-material/Receipt";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { logout } from "@/features/auth/store/authSlice";
import DashboardSidebar from "./DashboardSidebar";
import DashboardHeader from "./DashboardHeader";
import ProfileDropdown from "@/features/profile/components/ProfileDropdown";
import ChangePasswordDialog from "@/features/profile/pages/ChangePasswordDialog";
import { useGetProfileQuery } from "@/features/profile/store/profileApi";
import { useLogoutMutation } from "@/features/auth/store/authApi";
import { useSnackbar } from "notistack";
import { baseApi } from "@/app/store/baseApi";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [showChangePassword, setShowChangePassword] = React.useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [logoutMutation, { isLoading: isLoggingOut }] = useLogoutMutation();
  
  // Fetch user profile from dashboard feature
  const {
    data: profile,
    isLoading: profileLoading,
    error: profileError,
  } = useGetProfileQuery();

  const drawerWidth = 240;

  const navItems = [
    { text: "Dashboard", path: "/dashboard", icon: <DashboardIcon /> },
    { text: "Transfer", path: "/transfer", icon: <SyncAltIcon /> },
    { text: "Deposit", path: "/deposit", icon: <AccountBalanceWalletIcon /> },
    { text: "Withdraw", path: "/withdraw", icon: <AttachMoneyIcon /> },
    { text: "Expenses", path: "/expenses", icon: <ReceiptIcon /> },
    { text: "Profile", path: "/profile", icon: <PersonIcon /> },
    { text: "Contact Us", path: "/contact-us", icon: <ContactPhoneIcon /> },
  ];

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      // Call logout API to invalidate session on server
      await logoutMutation().unwrap();
      
      // Clear all RTK Query cached data
      dispatch(baseApi.util.resetApiState());
      
      // Clear Redux auth state
      dispatch(logout());
      handleClose();
      
      // Redirect to login
      navigate("/login");
      
      enqueueSnackbar("Logged out successfully", { variant: "success" });
    } catch (error) {
      console.error("Logout failed:", error);
      
      // Still clear local state even if API call fails
      dispatch(baseApi.util.resetApiState());
      dispatch(logout());
      handleClose();
      navigate("/login");
      
      enqueueSnackbar("Logged out (session may still be active on server)", { 
        variant: "warning" 
      });
    }
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
          user={profile}
        />
        <ProfileDropdown
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          onProfile={handleProfile}
          onLogout={handleLogout}
          onChangePassword={() => setShowChangePassword(true)}
          user={profile}
        />
        <ChangePasswordDialog
          open={showChangePassword}
          onClose={() => setShowChangePassword(false)}
        />
        <div style={{ height: 64 }} /> {/* Spacer for AppBar */}
        {children}
      </Box>
    </div>
  );
};

export default DashboardLayout;
