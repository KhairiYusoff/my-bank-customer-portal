import { baseApi } from "@/app/store/baseApi";
import type { UserProfileResponse } from "../types/profile";

export const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<UserProfileResponse["data"], void>({
      query: () => "/users/me",
      transformResponse: (response: UserProfileResponse) => response.data,
    }),
    updateProfile: builder.mutation<
      import("@/features/profile/types/profile").UpdateProfileResponse,
      import("@/features/profile/types/profile").UpdateProfileRequest
    >({
      query: (body) => ({
        url: "/users/me",
        method: "PUT",
        body,
      }),
    }),
    changePassword: builder.mutation<
      import("@/features/profile/types/profile").ChangePasswordResponse,
      import("@/features/profile/types/profile").ChangePasswordRequest
    >({
      query: (body) => ({
        url: "/users/me/password",
        method: "PUT",
        body,
      }),
    }),
  }),
});

export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
} = profileApi;
