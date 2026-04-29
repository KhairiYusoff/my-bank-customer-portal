import { useState } from "react";
import {
  useGetDashboardStatsQuery,
  useGetMonthlyAnalyticsQuery,
  useGetYearlyAnalyticsQuery,
} from "../store/expensesApi";

export const useAnalytics = () => {
  const now = new Date();
  const [selectedYear, setSelectedYear] = useState(now.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(now.getMonth() + 1);

  const {
    data: dashboardStatsResponse,
    isLoading: isDashboardLoading,
    isFetching: isDashboardFetching,
    error: dashboardError,
  } = useGetDashboardStatsQuery();

  const {
    data: monthlyResponse,
    isLoading: isMonthlyLoading,
    isFetching: isMonthlyFetching,
    error: monthlyError,
  } = useGetMonthlyAnalyticsQuery({ year: selectedYear, month: selectedMonth });

  const {
    data: yearlyResponse,
    isLoading: isYearlyLoading,
    isFetching: isYearlyFetching,
    error: yearlyError,
  } = useGetYearlyAnalyticsQuery({ year: selectedYear });

  const dashboardStats = dashboardStatsResponse?.data ?? null;
  const monthlyData = monthlyResponse?.data ?? null;
  const yearlyData = yearlyResponse?.data ?? null;
  const isAnyFetching =
    isDashboardFetching || isMonthlyFetching || isYearlyFetching;

  return {
    // Period controls
    selectedYear,
    setSelectedYear,
    selectedMonth,
    setSelectedMonth,

    // Data
    dashboardStats,
    monthlyData,
    yearlyData,

    // Loading states
    isDashboardLoading,
    isMonthlyLoading,
    isYearlyLoading,
    isAnyFetching,

    // Error states
    dashboardError,
    monthlyError,
    yearlyError,
  };
};
