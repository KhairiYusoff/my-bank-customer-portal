import React, { useState } from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "@/features/auth/store/authSlice";
import DashboardSidebar from "./components/DashboardSidebar";
import DashboardHeader from "./components/DashboardHeader";
import ProfileDropdown from "@/features/profile/components/ProfileDropdown";
import ChangePasswordDialog from "@/features/profile/pages/ChangePasswordDialog";
import { useGetProfileQuery } from "@/features/profile/store/profileApi";
import { useLogoutMutation } from "@/features/auth/store/authApi";
import { useSnackbar } from "notistack";
import { baseApi } from "@/app/store/baseApi";
import { navItems } from "./constants/navItems";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [showChangePassword, setShowChangePassword] = React.useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [logoutMutation] = useLogoutMutation();
  
  const { data: profile } = useGetProfileQuery();

  const drawerWidth = 240;

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

  return (
    <div style={{ display: "flex" }}>
      <DashboardSidebar
        drawerWidth={drawerWidth}
        navItems={navItems}
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
