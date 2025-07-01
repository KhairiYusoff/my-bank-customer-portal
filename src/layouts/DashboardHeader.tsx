import React from "react";
import { AppBar, Toolbar, Typography, IconButton, Avatar } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import AccountCircle from "@mui/icons-material/AccountCircle";

interface DashboardHeaderProps {
  drawerWidth: number;
  onMenuClick: (event: React.MouseEvent<HTMLElement>) => void;
  user: any;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  drawerWidth,
  onMenuClick,
  user,
}) => {
  const theme = useTheme();
  return (
    <AppBar
      position="fixed"
      sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
    >
      <Toolbar>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          My Bank Customer Portal
        </Typography>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={onMenuClick}
          color="inherit"
        >
          <Avatar
            sx={{ width: 40, height: 40, bgcolor: theme.palette.primary.dark }}
          >
            {user?.name ? user.name[0].toUpperCase() : <AccountCircle />}
          </Avatar>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default DashboardHeader;
