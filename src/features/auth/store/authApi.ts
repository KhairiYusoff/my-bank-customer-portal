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
        // Ensure credentials (cookies) are included in the request
        credentials: "include",
      }),
      // Invalidate auth data on successful login
      invalidatesTags: ["Auth"],
      // Transform error response to match our error format
      transformErrorResponse: (response: any): ApiErrorResponse => ({
        success: response?.data?.success ?? false,
        message:
          response?.data?.message ||
          "Login failed. Please check your credentials and try again.",
        errors: response?.data?.errors || null,
        statusCode: response.status,
      }),
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
  }),
  overrideExisting: false,
});

// Export hooks for usage in components
// Export hooks for usage in components
export const {
  useApplyMutation,
  useLoginMutation,
  useCompleteProfileMutation,
} = authApi;
