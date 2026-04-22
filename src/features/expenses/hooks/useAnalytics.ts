import { useState } from 'react';
import {
  useGetDashboardStatsQuery,
  useGetMonthlyAnalyticsQuery,
  useGetYearlyAnalyticsQuery,
} from '../store/expensesApi';

export const useAnalytics = () => {
  const now = new Date();
  const [selectedYear, setSelectedYear] = useState(now.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(now.getMonth() + 1);

  const {
    data: dashboardStatsResponse,
    isLoading: isDashboardLoading,
    error: dashboardError,
  } = useGetDashboardStatsQuery();

  const {
    data: monthlyResponse,
    isLoading: isMonthlyLoading,
    error: monthlyError,
  } = useGetMonthlyAnalyticsQuery({ year: selectedYear, month: selectedMonth });

  const {
    data: yearlyResponse,
    isLoading: isYearlyLoading,
    error: yearlyError,
  } = useGetYearlyAnalyticsQuery({ year: selectedYear });

  const dashboardStats = dashboardStatsResponse?.data ?? null;
  const monthlyData = monthlyResponse?.data ?? null;
  const yearlyData = yearlyResponse?.data ?? null;

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

    // Error states
    dashboardError,
    monthlyError,
    yearlyError,
  };
};
