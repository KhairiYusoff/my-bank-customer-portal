import React, { forwardRef } from "react";
import { Drawer, Toolbar, Box, Typography, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { Link, useLocation } from "react-router-dom";
import type { LinkProps } from "react-router-dom";
import { StyledListItem } from "../styles";
import type { NavItem } from "../constants/navItems";

interface DashboardSidebarProps {
  drawerWidth: number;
  navItems: NavItem[];
}

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

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ drawerWidth, navItems }) => {
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
          backgroundColor: "grey.900",
          color: "common.white",
        },
      }}
    >
      <Toolbar sx={{ justifyContent: "center", padding: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <AccountBalanceWalletIcon sx={{ fontSize: 32, color: "primary.main" }} />
          <Typography variant="h6" noWrap component="div" sx={{ color: "common.white" }}>
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
              <ListItemIcon>
                <item.IconComponent />
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </StyledListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default DashboardSidebar;
