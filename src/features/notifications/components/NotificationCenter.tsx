import React, { useState, useEffect } from 'react';
import {
  Badge,
  IconButton,
  Popover,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Typography,
  Box,
  Button,
  CircularProgress,
  Divider,
  Tooltip,
  Avatar,
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  NotificationsNone as NotificationsNoneIcon,
  Done as DoneIcon,
  Delete as DeleteIcon,
  MarkEmailRead as MarkEmailReadIcon,
} from '@mui/icons-material';
import { formatDistanceToNow } from 'date-fns';
import { useGetNotificationsQuery, useUpdateNotificationMutation, useDeleteNotificationMutation } from '../store/notificationsApi';
import { useToast } from '@/utils/snackbarUtils';
import { notificationSocket } from '../services/notificationSocket';
import type { Notification } from '../types/notification';

interface NotificationCenterProps {
  userId?: string;
}

const NotificationCenter: React.FC<NotificationCenterProps> = ({ userId }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { data: notifications = [], isLoading, error } = useGetNotificationsQuery();
  const [updateNotification] = useUpdateNotificationMutation();
  const [deleteNotification] = useDeleteNotificationMutation();
  const toast = useToast();

  const unreadCount = notifications.filter(n => !n.read).length;

  // Log errors for debugging
  useEffect(() => {
    if (error) {
      console.error('NotificationCenter Error:', error);
    }
  }, [error]);

  useEffect(() => {
    // Connect to WebSocket when user is available
    if (userId) {
      // Get token from localStorage or Redux state
      const token = localStorage.getItem('access_token');
      if (token) {
        notificationSocket.connect(token);
        notificationSocket.joinUserRoom(userId);
      }
    }

    return () => {
      if (userId) {
        notificationSocket.leaveUserRoom(userId);
      }
    };
  }, [userId]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMarkAsRead = async (notificationId: string) => {
    try {
      await updateNotification({ id: notificationId, read: true }).unwrap();
      toast.success('Marked as read');
    } catch (error) {
      toast.error('Failed to mark as read');
    }
  };

  const handleMarkAllAsRead = async () => {
    const unreadNotifications = notifications.filter(n => !n.read);
    
    try {
      await Promise.all(
        unreadNotifications.map(notification =>
          updateNotification({ id: notification._id, read: true })
        )
      );
      toast.success('All notifications marked as read');
    } catch (error) {
      toast.error('Failed to mark all as read');
    }
  };

  const handleDelete = async (notificationId: string) => {
    try {
      await deleteNotification(notificationId).unwrap();
      toast.success('Notification deleted');
    } catch (error) {
      toast.error('Failed to delete notification');
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'transfer':
        return '💸';
      case 'deposit':
        return '💰';
      case 'withdraw':
        return '💳';
      case 'airdrop':
        return '🎁';
      default:
        return '📢';
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'transfer':
        return '#2196F3';
      case 'deposit':
        return '#4CAF50';
      case 'withdraw':
        return '#FF9800';
      case 'airdrop':
        return '#9C27B0';
      default:
        return '#757575';
    }
  };

  const open = Boolean(anchorEl);
  const id = open ? 'notification-popover' : undefined;

  if (error) {
    return (
      <Tooltip title="Notifications unavailable">
        <IconButton color="inherit">
          <NotificationsNoneIcon />
        </IconButton>
      </Tooltip>
    );
  }

  return (
    <>
      <Tooltip title="Notifications">
        <IconButton
          color="inherit"
          onClick={handleClick}
          aria-describedby={id}
        >
          {isLoading ? (
            <CircularProgress size={20} color="inherit" />
          ) : (
            <Badge badgeContent={unreadCount} color="error">
              {unreadCount > 0 ? (
                <NotificationsIcon />
              ) : (
                <NotificationsNoneIcon />
              )}
            </Badge>
          )}
        </IconButton>
      </Tooltip>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          sx: {
            width: 360,
            maxHeight: 480,
          },
        }}
      >
        <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
          <Typography variant="h6">Notifications</Typography>
          {unreadCount > 0 && (
            <Button
              size="small"
              onClick={handleMarkAllAsRead}
              sx={{ mt: 1 }}
            >
              Mark all as read
            </Button>
          )}
        </Box>

        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
            <CircularProgress />
          </Box>
        ) : notifications.length === 0 ? (
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Typography color="text.secondary">
              No notifications yet
            </Typography>
          </Box>
        ) : (
          <List sx={{ maxHeight: 400, overflow: 'auto' }}>
            {notifications.map((notification) => (
              <ListItem
                key={notification._id}
                sx={{
                  backgroundColor: notification.read ? 'transparent' : 'action.hover',
                  '&:hover': {
                    backgroundColor: 'action.selected',
                  },
                }}
              >
                <Avatar
                  sx={{
                    mr: 2,
                    bgcolor: getNotificationColor(notification.type),
                    width: 32,
                    height: 32,
                  }}
                >
                  {getNotificationIcon(notification.type)}
                </Avatar>
                <ListItemText
                  primary={
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: notification.read ? 'normal' : 'bold',
                      }}
                    >
                      {notification.title}
                    </Typography>
                  }
                  secondary={
                    <Box>
                      <Typography variant="caption" display="block">
                        {notification.message}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {formatDistanceToNow(new Date(notification.createdAt), {
                          addSuffix: true,
                        })}
                      </Typography>
                    </Box>
                  }
                />
                <ListItemSecondaryAction>
                  {!notification.read && (
                    <Tooltip title="Mark as read">
                      <IconButton
                        edge="end"
                        size="small"
                        onClick={() => handleMarkAsRead(notification._id)}
                      >
                        <DoneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  )}
                  <Tooltip title="Delete">
                    <IconButton
                      edge="end"
                      size="small"
                      onClick={() => handleDelete(notification._id)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        )}
      </Popover>
    </>
  );
};

export default NotificationCenter;
