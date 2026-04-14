import { baseApi } from '@/app/store/baseApi';
import type { BaseResponse, ApiError } from '@/types/api';
import type { 
  Notification, 
  NotificationResponse, 
  CreateNotificationRequest, 
  UpdateNotificationRequest 
} from '../types/notification';

export const notificationsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get user notifications (JWT authenticated)
    getNotifications: builder.query<Notification[], void>({
      query: () => '/notifications',
      providesTags: ['Notification'],
      transformResponse: (response: NotificationResponse) => response.data,
    }),

    // Get unread notifications count
    getUnreadCount: builder.query<number, void>({
      query: () => '/notifications?read=false',
      providesTags: ['Notification'],
      transformResponse: (response: NotificationResponse) => response.data.length,
    }),

    // Mark notification as read/unread
    updateNotification: builder.mutation<Notification, { id: string; read: boolean }>({
      query: ({ id, read }) => ({
        url: `/notifications/${id}`,
        method: 'PATCH',
        body: { read },
      }),
      invalidatesTags: ['Notification'],
    }),

    // Delete notification
    deleteNotification: builder.mutation<void, string>({
      query: (id) => ({
        url: `/notifications/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Notification'],
    }),
  }),
});

export const {
  useGetNotificationsQuery,
  useGetUnreadCountQuery,
  useUpdateNotificationMutation,
  useDeleteNotificationMutation,
} = notificationsApi;
