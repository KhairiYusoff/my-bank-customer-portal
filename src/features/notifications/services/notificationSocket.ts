import { io, Socket } from 'socket.io-client';
import { store } from '@/app/store/store';
import { notificationsApi } from '@/features/notifications/store/notificationsApi';

class NotificationSocketService {
  private socket: Socket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;

  connect(token: string) {
    if (this.socket?.connected) {
      return;
    }

    this.socket = io('http://127.0.0.1:4001', {
      auth: {
        token: token,
      },
      transports: ['websocket'],
    });

    this.setupEventListeners();
  }

  private setupEventListeners() {
    if (!this.socket) return;

    this.socket.on('connect', () => {
      console.log('Connected to notification service');
      this.reconnectAttempts = 0;
    });

    this.socket.on('disconnect', (reason) => {
      console.log('Disconnected from notification service:', reason);
      
      if (reason === 'io server disconnect') {
        // Server disconnected, reconnect manually
        this.socket?.connect();
      }
    });

    this.socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
      this.reconnectAttempts++;
      
      if (this.reconnectAttempts < this.maxReconnectAttempts) {
        setTimeout(() => {
          this.socket?.connect();
        }, 1000 * this.reconnectAttempts);
      }
    });

    // Listen for new notifications
    this.socket.on('notification', (notification) => {
      console.log('New notification received:', notification);
      
      // Invalidate the notifications cache to trigger a refetch
      store.dispatch(notificationsApi.util.invalidateTags(['Notification']));
      
      // Show toast notification
      this.showToast(notification);
    });

    // Listen for notification updates (read/unread status changes)
    this.socket.on('notification_updated', (notification) => {
      console.log('Notification updated:', notification);
      
      // Invalidate the notifications cache to trigger a refetch
      store.dispatch(notificationsApi.util.invalidateTags(['Notification']));
    });
  }

  private showToast(notification: any) {
    // Import toast dynamically to avoid circular dependencies
    import('@/utils/snackbarUtils').then(({ toast }) => {
      const message = notification.title || 'New notification';
      const variant = notification.type === 'system' ? 'info' : 'success';
      
      toast[variant](message);
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  isConnected(): boolean {
    return this.socket?.connected || false;
  }

  // Join user's notification room
  joinUserRoom(userId: string) {
    if (this.socket?.connected) {
      this.socket.emit('join_user_room', userId);
    }
  }

  // Leave user's notification room
  leaveUserRoom(userId: string) {
    if (this.socket?.connected) {
      this.socket.emit('leave_user_room', userId);
    }
  }
}

// Create singleton instance
export const notificationSocket = new NotificationSocketService();
