import React, { useState, forwardRef } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Box,
  Avatar,
  Menu,
  MenuItem,
  ListItemButton,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { styled, useTheme } from "@mui/material/styles";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Link, useNavigate, useLocation, LinkProps } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { logout } from "@/features/auth/store/authSlice";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const theme = useTheme();
  const location = useLocation();

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
    <Box sx={{ display: "flex" }}>
      {/* Sidebar */}
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
            <AccountBalanceWalletIcon
              sx={{ fontSize: 32, color: theme.palette.primary.main }}
            />
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ color: theme.palette.common.white }}
            >
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

      {/* Main content area including AppBar and children */}
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: `calc(100% - ${drawerWidth}px)` }}
      >
        <AppBar
          position="fixed"
          sx={{
            width: `calc(100% - ${drawerWidth}px)`,
            ml: `${drawerWidth}px`,
          }}
        >
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1 }}
            >
              My Bank Customer Portal
            </Typography>
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl) as boolean}
                onClose={handleClose}
              >
                <MenuItem onClick={handleProfile}>My Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
        <Toolbar />{" "}
        {/* This empty toolbar is to push content below the AppBar */}
        {children}
      </Box>
    </Box>
  );
};

export default DashboardLayout;
