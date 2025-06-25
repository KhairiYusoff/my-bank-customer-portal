import { baseApi } from "@/app/store/baseApi";
import type {
  ApplyRequest,
  ApplyResponse,
  ApiErrorResponse,
} from "../types/auth";

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
  }),
  overrideExisting: false,
});

// Export hooks for usage in components
export const { useApplyMutation } = authApi;
