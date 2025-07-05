import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { UserProfileResponse } from "../types/profile";

export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    getProfile: builder.query<UserProfileResponse["data"], void>({
      query: () => "/users/me",
      transformResponse: (response: UserProfileResponse) => response.data,
    }),
    updateProfile: builder.mutation<
      import("@features/dashboard/types/profile").UpdateProfileResponse,
      import("@features/dashboard/types/profile").UpdateProfileRequest
    >({
      query: (body) => ({
        url: "/users/me",
        method: "PUT",
        body,
      }),
    }),
    changePassword: builder.mutation<
      import("@features/dashboard/types/profile").ChangePasswordResponse,
      import("@features/dashboard/types/profile").ChangePasswordRequest
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
