import { baseApi } from "@/app/store/baseApi";
import type { GetInsightsResponse, InsightsPeriod } from "../types/ai";

export const aiApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getInsights: builder.query<GetInsightsResponse, InsightsPeriod | void>({
      query: (period = "month") => ({
        url: "/ai/insights",
        params: { period },
      }),
      providesTags: ["AIInsights"],
    }),
  }),
});

export const { useGetInsightsQuery } = aiApi;
