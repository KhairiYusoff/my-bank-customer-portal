import { baseApi } from "@/app/store/baseApi";
import {
  ApiErrorResponse,
  LoginRequest,
  LoginResponse,
} from "@/features/auth/types/auth";

/**
 * Auth API slice containing all authentication-related endpoints
 */

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * Login user with email and password
     * @param credentials - User's login credentials (email and password)
     */
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
        credentials: "include",
        timeout: 10000,
      }),
      // Invalidate auth data on successful login
      invalidatesTags: ["Auth"],
      // Transform error response to match our error format
      transformErrorResponse: (response: any): ApiErrorResponse => {
        if (process.env.NODE_ENV === "development") {
          console.log("[DEV] Login error response:", response);
        }

        // Handle timeout errors
        if (response.status === "TIMEOUT_ERROR") {
          return {
            success: false,
            message: "Request timed out. Please try again.",
            errors: undefined,
            statusCode: 408,
          };
        }

        // Handle network errors
        if (response.status === "FETCH_ERROR") {
          return {
            success: false,
            message:
              "Network error. Please check your connection and try again.",
            errors: undefined,
            statusCode: 0,
          };
        }

        // Handle HTTP errors
        return {
          success: response?.data?.success ?? false,
          message:
            response.status === 500
              ? "Server error. Please try again later."
              : response?.data?.message ||
                "Login failed. Please check your credentials and try again.",
          errors: response?.data?.errors,
          statusCode: response.status,
        };
      },
    }),
    /**
     * Reset password for users who forgot their password
     * @param data - { email, newPassword }
     */
    resetPassword: builder.mutation<
      { message: string },
      { email: string; newPassword: string }
    >({
      query: (data) => ({
        url: "/users/me/reset-password",
        method: "POST",
        body: data,
      }),
      // Transform error response to match our error format
      transformErrorResponse: (response: any) => ({
        success: false,
        message: response?.data?.message || "Failed to reset password",
        errors: response?.data?.errors,
        statusCode: response.status,
      }),
    }),

    /**
     * Check if current session is valid
     * Used on app initialization to restore auth state from cookies
     */
    checkToken: builder.query<LoginResponse, void>({
      query: () => ({
        url: "/auth/check-token",
        method: "GET",
        credentials: "include",
      }),
    }),

    /**
     * Logout user and clear session
     * Invalidates refresh token on server and clears cookies
     */
    logout: builder.mutation<{ success: boolean; message: string }, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
        credentials: "include",
      }),
    }),
  }),
  overrideExisting: false,
});

// Export hooks for usage in components
export const {
  useLoginMutation,
  useResetPasswordMutation,
  useLazyCheckTokenQuery,
  useLogoutMutation,
} = authApi;
