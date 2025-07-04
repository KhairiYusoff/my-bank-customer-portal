import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type { BaseResponse, ApiError } from '@/types/api';

// IMPORTANT: For environment compatibility between Jest and Vite
// We're using a hardcoded API URL for now
// In a production environment, you would want to set up proper environment handling
// through your build configuration (vite.config.ts and jest.config.js)
const API_URL = '/api';

// Create base query with credentials for cookie-based auth
const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  credentials: 'include',
  prepareHeaders: (headers) => {
    // Content type is set automatically by fetchBaseQuery
    // Add any additional headers here if needed
    return headers;
  },
});

// Custom base query with re-authentication logic
const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  
  // Handle 401 Unauthorized responses
  if (result.error?.status === 401) {
    // TODO: Add token refresh logic
    console.log('Unauthorized - redirect to login');
  }
  
  // Handle API error responses
  if (result.error) {
    const error = result.error as ApiError;
    console.error('API Error:', error);
  }
  
  return result;
};

// Initialize an empty api service that we'll inject endpoints into
export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Auth', 'Account', 'Transaction', 'User'],
  endpoints: () => ({}), // Inject endpoints in feature slices
});

// Export hooks for use in components
export const { middleware, reducerPath, reducer, middleware: apiMiddleware } = baseApi;
