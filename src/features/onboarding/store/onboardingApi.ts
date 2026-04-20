import { baseApi } from "@/app/store/baseApi";
import type { ApiErrorResponse } from "@/features/auth/types/auth";
import type {
  ApplyRequest,
  ApplyResponse,
  CompleteProfileRequest,
  CompleteProfileResponse,
} from "../types/onboarding";

export const onboardingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    apply: builder.mutation<ApplyResponse, ApplyRequest>({
      query: (applicationData) => ({
        url: "/onboarding/apply",
        method: "POST",
        body: applicationData,
      }),
      invalidatesTags: ["Auth"],
      transformErrorResponse: (response: any): ApiErrorResponse => ({
        success: false,
        message: response?.data?.message || "Failed to submit application",
        errors: response?.data?.errors,
        statusCode: response.status,
      }),
    }),

    completeProfile: builder.mutation<
      CompleteProfileResponse,
      { data: CompleteProfileRequest; token: string }
    >({
      query: ({ data, token }) => ({
        url: "/onboarding/complete-profile",
        method: "PUT",
        body: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
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

export const { useApplyMutation, useCompleteProfileMutation } = onboardingApi;
