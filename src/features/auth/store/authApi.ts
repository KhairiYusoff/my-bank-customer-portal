import { baseApi } from "@/app/store/baseApi";
import {
  ApiErrorResponse,
  ApplyRequest,
  ApplyResponse,
  CompleteProfileRequest,
  CompleteProfileResponse,
  LoginRequest,
  LoginResponse,
  User,
} from "@/features/auth/types/auth";

/**
 * Auth API slice containing all authentication-related endpoints
 */

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * Apply for a new bank account
     * @param applicationData - User's application details
     */
    apply: builder.mutation<ApplyResponse, ApplyRequest>({
      query: (applicationData) => ({
        url: "/auth/apply",
        method: "POST",
        body: applicationData,
      }),
      // Invalidate user data on successful application
      invalidatesTags: ["Auth"],
      // Transform error response to match our error format
      transformErrorResponse: (response: any): ApiErrorResponse => ({
        success: false,
        message: response?.data?.message || "Failed to submit application",
        errors: response?.data?.errors,
        statusCode: response.status,
      }),
    }),

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
     * Complete user profile after account approval
     * @param data - Complete profile data including personal, address, employment, and next of kin information
     */
    completeProfile: builder.mutation<
      CompleteProfileResponse,
      { data: CompleteProfileRequest; token: string }
    >({
      query: ({ data, token }) => ({
        url: "/v2/users/complete-profile",
        method: "PUT",
        body: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      // Transform error response to match our error format
      transformErrorResponse: (response: any): ApiErrorResponse => ({
        success: false,
        message: response?.data?.message || "Failed to complete profile",
        errors: response?.data?.errors,
        statusCode: response.status,
      }),
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
  }),
  overrideExisting: false,
});

// Export hooks for usage in components
export const {
  useApplyMutation,
  useLoginMutation,
  useCompleteProfileMutation,
  useResetPasswordMutation,
} = authApi;
