import React from "react";
import { AppBar, Toolbar, Typography, IconButton, Avatar, Box } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import type { UserProfile } from "@/features/profile/types/profile";
import NotificationCenter from "@/features/notifications/components/NotificationCenter";
import { styled } from "@mui/material/styles";

const HeaderAvatar = styled(Avatar)(({ theme }) => ({
  width: 40,
  height: 40,
  bgcolor: theme.palette.primary.dark,
}));

interface DashboardHeaderProps {
  drawerWidth: number;
  onMenuClick: (event: React.MouseEvent<HTMLElement>) => void;
  user: UserProfile | undefined;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  drawerWidth,
  onMenuClick,
  user,
}) => {
  return (
    <AppBar
      position="fixed"
      sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
    >
      <Toolbar>
        <Typography
          noWrap
          component="div"
          sx={{
            flexGrow: 1,
            fontWeight: 100,
            color: "common.white",
            fontSize: "0.9rem",
            lineHeight: 1.5,
            fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
            textTransform: "capitalize",
          }}
        >
          {user?.name
            ? `Hi ${user.name}, welcome back!`
            : "Hi Customer, welcome back!"}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <NotificationCenter userId={user?._id} />
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={onMenuClick}
            color="inherit"
          >
            <HeaderAvatar>
              {user?.name ? user.name[0].toUpperCase() : <AccountCircle />}
            </HeaderAvatar>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default DashboardHeader;
