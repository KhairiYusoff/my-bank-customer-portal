import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { UserProfileResponse } from '../types/profile';

export const profileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getProfile: builder.query<UserProfileResponse['data'], void>({
      query: () => '/users/me',
      transformResponse: (response: UserProfileResponse) => response.data,
    }),
  }),
});

export const { useGetProfileQuery } = profileApi;
