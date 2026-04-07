export interface NotificationRecipient {
  userId: string;
  role: 'customer' | 'banker' | 'admin';
}

export interface Notification {
  _id: string;
  recipient: NotificationRecipient;
  type: 'transfer' | 'deposit' | 'withdraw' | 'system' | 'airdrop';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  updatedAt: string;
  metadata?: {
    amount?: number;
    accountNumber?: string;
    transactionId?: string;
    fromAccountNumber?: string;
    toAccountNumber?: string;
  };
}

export interface NotificationResponse {
  data: Notification[];
}

export interface CreateNotificationRequest {
  recipient: NotificationRecipient;
  type: 'transfer' | 'deposit' | 'withdraw' | 'system' | 'airdrop';
  title: string;
  message: string;
  metadata?: Record<string, any>;
}

export interface UpdateNotificationRequest {
  read?: boolean;
}
