import React from "react";
import { Drawer, Toolbar, Box, Typography, List, ListItemIcon, ListItemText } from "@mui/material";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { styled, useTheme } from "@mui/material/styles";
import { Link, useLocation, LinkProps } from "react-router-dom";

interface NavItem {
  text: string;
  path: string;
  icon: React.ReactElement;
}

interface DashboardSidebarProps {
  drawerWidth: number;
  navItems: NavItem[];
  ListItemLink: React.ForwardRefExoticComponent<LinkProps & { children: React.ReactNode }>;
  StyledListItem: any;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ drawerWidth, navItems, ListItemLink, StyledListItem }) => {
  const theme = useTheme();
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: theme.palette.grey[900],
          color: theme.palette.common.white,
        },
      }}
    >
      <Toolbar sx={{ justifyContent: "center", padding: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <AccountBalanceWalletIcon sx={{ fontSize: 32, color: theme.palette.primary.main }} />
          <Typography variant="h6" noWrap component="div" sx={{ color: theme.palette.common.white }}>
            MyBank
          </Typography>
        </Box>
      </Toolbar>
      <Box sx={{ overflow: "auto" }}>
        <List>
          {navItems.map((item) => (
            <StyledListItem
              key={item.text}
              component={ListItemLink}
              to={item.path}
              selected={location.pathname === item.path}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </StyledListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default DashboardSidebar;
