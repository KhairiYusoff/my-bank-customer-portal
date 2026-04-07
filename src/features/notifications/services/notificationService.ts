import type { CreateNotificationRequest } from '../types/notification';

const NOTIFICATION_SERVICE_URL = 'http://127.0.0.1:4001';
const API_KEY = '1e2f3c4b5a6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f';

export const notificationService = {
  // Create a notification (service-to-service)
  async createNotification(notification: Omit<CreateNotificationRequest, 'recipient'> & { recipientId: string; recipientRole: string }) {
    try {
      const response = await fetch(`${NOTIFICATION_SERVICE_URL}/api/notifications`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': API_KEY,
        },
        body: JSON.stringify({
          recipient: {
            userId: notification.recipientId,
            role: notification.recipientRole as 'customer' | 'banker' | 'admin',
          },
          type: notification.type,
          title: notification.title,
          message: notification.message,
          metadata: notification.metadata,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to create notification: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating notification:', error);
      // Don't throw error to avoid breaking main transaction flow
      return null;
    }
  },

  // Helper for transaction notifications
  async createTransactionNotification({
    userId,
    type,
    amount,
    accountNumber,
    transactionId,
    fromAccountNumber,
    toAccountNumber,
  }: {
    userId: string;
    type: 'transfer' | 'deposit' | 'withdraw';
    amount: number;
    accountNumber?: string;
    transactionId?: string;
    fromAccountNumber?: string;
    toAccountNumber?: string;
  }) {
    const notificationConfig = {
      transfer: {
        title: 'Transfer Completed',
        message: `Successfully transferred $${amount.toFixed(2)} from ${fromAccountNumber} to ${toAccountNumber}`,
      },
      deposit: {
        title: 'Deposit Completed',
        message: `Successfully deposited $${amount.toFixed(2)} to account ${accountNumber}`,
      },
      withdraw: {
        title: 'Withdrawal Completed',
        message: `Successfully withdrew $${amount.toFixed(2)} from account ${accountNumber}`,
      },
    };

    const config = notificationConfig[type];

    return this.createNotification({
      recipientId: userId,
      recipientRole: 'customer',
      type,
      title: config.title,
      message: config.message,
      metadata: {
        amount,
        accountNumber,
        transactionId,
        fromAccountNumber,
        toAccountNumber,
      },
    });
  },
};
