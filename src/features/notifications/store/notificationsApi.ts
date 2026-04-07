import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { BaseResponse, ApiError } from '@/types/api';
import type { 
  Notification, 
  NotificationResponse, 
  CreateNotificationRequest, 
  UpdateNotificationRequest 
} from '../types/notification';

// Create a separate API slice for notifications since it uses a different base URL
const baseQueryWithErrors = fetchBaseQuery({
  baseUrl: '/api/notifications',
  credentials: 'include',
  prepareHeaders: (headers) => {
    return headers;
  },
});

export const notificationsApi = createApi({
  reducerPath: 'notificationsApi',
  baseQuery: async (args, api, extraOptions) => {
    const result = await baseQueryWithErrors(args, api, extraOptions);
    
    // Log errors for debugging
    if (result.error) {
      console.error('Notification API Error:', result.error);
    }
    
    return result;
  },
  tagTypes: ['Notification'],
  endpoints: (builder) => ({
    // Get user notifications (JWT authenticated)
    getNotifications: builder.query<Notification[], void>({
      query: () => ({
        url: '',
        method: 'GET',
      }),
      providesTags: ['Notification'],
      transformResponse: (response: NotificationResponse) => response.data,
    }),

    // Get unread notifications count
    getUnreadCount: builder.query<number, void>({
      query: () => ({
        url: '?read=false',
        method: 'GET',
      }),
      providesTags: ['Notification'],
      transformResponse: (response: NotificationResponse) => response.data.length,
    }),

    // Mark notification as read/unread
    updateNotification: builder.mutation<Notification, { id: string; read: boolean }>({
      query: ({ id, read }) => ({
        url: `/${id}`,
        method: 'PATCH',
        body: { read },
      }),
      invalidatesTags: ['Notification'],
    }),

    // Delete notification
    deleteNotification: builder.mutation<void, string>({
      query: (id) => ({
        url: `/${id}`,
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
