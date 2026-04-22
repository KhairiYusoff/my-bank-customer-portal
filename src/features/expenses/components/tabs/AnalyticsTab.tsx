import React from "react";
import {
  Box,
  Grid,
  CardContent,
  Typography,
  CircularProgress,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Receipt as ReceiptIcon,
  AccountBalanceWallet as WalletIcon,
  BarChart as BarChartIcon,
  PieChart as PieChartIcon,
  ShowChart as ShowChartIcon,
} from "@mui/icons-material";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useAnalytics } from "../../hooks/useAnalytics";
import {
  AnalyticsStatsCard,
  AnalyticsChartCard,
  AnalyticsStatAvatar,
} from "../styles";
import {
  CHART_COLORS,
  MONTH_NAMES,
  YEAR_OPTIONS,
} from "../../constants/analyticsOptions";
import { formatCurrency } from "@/utils/formatters";

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}

const ChartTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
  label,
}) => {
  if (!active || !payload?.length) return null;
  return (
    <Box
      sx={{
        backgroundColor: "background.paper",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2,
        p: 1.5,
        boxShadow: 3,
      }}
    >
      {label && (
        <Typography
          variant="caption"
          color="text.secondary"
          display="block"
          sx={{ mb: 0.5 }}
        >
          {label}
        </Typography>
      )}
      {payload.map((entry) => (
        <Typography
          key={entry.name}
          variant="body2"
          sx={{ color: entry.color, fontWeight: 600 }}
        >
          {entry.name}: {formatCurrency(entry.value)}
        </Typography>
      ))}
    </Box>
  );
};

const AnalyticsTab: React.FC = () => {
  const {
    selectedYear,
    setSelectedYear,
    selectedMonth,
    setSelectedMonth,
    dashboardStats,
    monthlyData,
    yearlyData,
    isDashboardLoading,
    isMonthlyLoading,
    isYearlyLoading,
    dashboardError,
    monthlyError,
    yearlyError,
  } = useAnalytics();

  // Build chart data from API responses
  const pieData = (monthlyData?.categoryBreakdown ?? []).map((item) => ({
    name: item._id,
    value: item.total,
  }));

  const barData = (yearlyData?.monthlyBreakdown ?? []).map((item) => ({
    name: MONTH_NAMES[item._id.month - 1],
    total: item.total,
  }));

  const areaData = (monthlyData?.dailyBreakdown ?? []).map((item) => ({
    name: `${item._id.day}`,
    total: item.total,
  }));

  const isAnyLoading =
    isDashboardLoading || isMonthlyLoading || isYearlyLoading;

  return (
    <Box sx={{ p: 3 }}>
      {/* Period Controls */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          mb: 4,
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" fontWeight={600} sx={{ flexGrow: 1 }}>
          Expense Analytics
        </Typography>
        <FormControl size="small" sx={{ minWidth: 130 }}>
          <InputLabel>Year</InputLabel>
          <Select
            label="Year"
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
          >
            {YEAR_OPTIONS.map((y) => (
              <MenuItem key={y} value={y}>
                {y}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ minWidth: 130 }}>
          <InputLabel>Month</InputLabel>
          <Select
            label="Month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(Number(e.target.value))}
          >
            {MONTH_NAMES.map((name, idx) => (
              <MenuItem key={idx + 1} value={idx + 1}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {isAnyLoading && (
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress size={48} />
        </Box>
      )}

      {(dashboardError || monthlyError || yearlyError) && !isAnyLoading && (
        <Alert severity="error" sx={{ mb: 3 }}>
          Failed to load analytics data. Please try again.
        </Alert>
      )}

      {!isAnyLoading && (
        <>
          {/* ── Row 1: Stat Cards ── */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {/* Card 1 – Current Month Total */}
            <Grid item xs={12} sm={4}>
              <AnalyticsStatsCard>
                <CardContent sx={{ p: 3 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      mb: 2,
                    }}
                  >
                    <AnalyticsStatAvatar>
                      <WalletIcon />
                    </AnalyticsStatAvatar>
                    <Typography
                      variant="caption"
                      sx={{
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 10,
                        bgcolor: alpha("#00509e", 0.08),
                        color: "primary.main",
                        fontWeight: 600,
                      }}
                    >
                      This Month
                    </Typography>
                  </Box>
                  <Typography
                    variant="h5"
                    fontWeight={700}
                    color="primary.main"
                  >
                    {formatCurrency(dashboardStats?.currentMonth.total ?? 0)}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 0.5 }}
                  >
                    Total spent this month
                  </Typography>
                </CardContent>
              </AnalyticsStatsCard>
            </Grid>

            {/* Card 2 – Expense Count */}
            <Grid item xs={12} sm={4}>
              <AnalyticsStatsCard>
                <CardContent sx={{ p: 3 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      mb: 2,
                    }}
                  >
                    <AnalyticsStatAvatar>
                      <ReceiptIcon />
                    </AnalyticsStatAvatar>
                    <Typography
                      variant="caption"
                      sx={{
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 10,
                        bgcolor: alpha("#2e7d32", 0.08),
                        color: "success.main",
                        fontWeight: 600,
                      }}
                    >
                      Transactions
                    </Typography>
                  </Box>
                  <Typography
                    variant="h5"
                    fontWeight={700}
                    color="text.primary"
                  >
                    {dashboardStats?.currentMonth.count ?? 0}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 0.5 }}
                  >
                    Expenses recorded
                  </Typography>
                </CardContent>
              </AnalyticsStatsCard>
            </Grid>

            {/* Card 3 – Month-over-Month Change */}
            <Grid item xs={12} sm={4}>
              {(() => {
                const change = dashboardStats?.monthOverMonthChange ?? 0;
                const isPositive = change >= 0;
                return (
                  <AnalyticsStatsCard>
                    <CardContent sx={{ p: 3 }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          mb: 2,
                        }}
                      >
                        <AnalyticsStatAvatar
                          sx={{
                            bgcolor: alpha(
                              isPositive ? "#d32f2f" : "#2e7d32",
                              0.1,
                            ),
                            color: isPositive ? "error.main" : "success.main",
                          }}
                        >
                          {isPositive ? (
                            <TrendingUpIcon />
                          ) : (
                            <TrendingDownIcon />
                          )}
                        </AnalyticsStatAvatar>
                        <Typography
                          variant="caption"
                          sx={{
                            px: 1.5,
                            py: 0.5,
                            borderRadius: 10,
                            bgcolor: alpha(
                              isPositive ? "#d32f2f" : "#2e7d32",
                              0.08,
                            ),
                            color: isPositive ? "error.main" : "success.main",
                            fontWeight: 600,
                          }}
                        >
                          vs Last Month
                        </Typography>
                      </Box>
                      <Typography
                        variant="h5"
                        fontWeight={700}
                        color={isPositive ? "error.main" : "success.main"}
                      >
                        {isPositive ? "+" : ""}
                        {change.toFixed(1)}%
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mt: 0.5 }}
                      >
                        Month-over-month change
                      </Typography>
                    </CardContent>
                  </AnalyticsStatsCard>
                );
              })()}
            </Grid>
          </Grid>

          {/* ── Row 2: Charts ── */}
          <Grid container spacing={3}>
            {/* Chart 1 – Pie: Category Breakdown (monthly) */}
            <Grid item xs={12} md={4}>
              <AnalyticsChartCard>
                <CardContent sx={{ p: 3 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 1,
                    }}
                  >
                    <PieChartIcon
                      sx={{ color: "primary.main", fontSize: 20 }}
                    />
                    <Typography variant="subtitle1" fontWeight={600}>
                      Category Breakdown
                    </Typography>
                  </Box>
                  <Typography variant="caption" color="text.secondary">
                    {MONTH_NAMES[selectedMonth - 1]} {selectedYear}
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  {pieData.length === 0 ? (
                    <Box sx={{ textAlign: "center", py: 6 }}>
                      <Typography variant="body2" color="text.secondary">
                        No data for this period
                      </Typography>
                    </Box>
                  ) : (
                    <ResponsiveContainer width="100%" height={260}>
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={55}
                          outerRadius={90}
                          paddingAngle={3}
                          dataKey="value"
                        >
                          {pieData.map((_, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={CHART_COLORS[index % CHART_COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <Tooltip
                          formatter={(value) => formatCurrency(Number(value))}
                          contentStyle={{
                            borderRadius: 8,
                            border: "1px solid #e0e0e0",
                            fontSize: 12,
                          }}
                        />
                        <Legend
                          iconType="circle"
                          iconSize={8}
                          wrapperStyle={{ fontSize: 12 }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  )}
                </CardContent>
              </AnalyticsChartCard>
            </Grid>

            {/* Chart 2 – Bar: Monthly Trend (yearly) */}
            <Grid item xs={12} md={8}>
              <AnalyticsChartCard>
                <CardContent sx={{ p: 3 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 1,
                    }}
                  >
                    <BarChartIcon
                      sx={{ color: "primary.main", fontSize: 20 }}
                    />
                    <Typography variant="subtitle1" fontWeight={600}>
                      Monthly Spending
                    </Typography>
                  </Box>
                  <Typography variant="caption" color="text.secondary">
                    Full year {selectedYear}
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  {barData.length === 0 ? (
                    <Box sx={{ textAlign: "center", py: 6 }}>
                      <Typography variant="body2" color="text.secondary">
                        No data for this year
                      </Typography>
                    </Box>
                  ) : (
                    <ResponsiveContainer width="100%" height={260}>
                      <BarChart data={barData} barSize={32}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis
                          dataKey="name"
                          tick={{ fontSize: 12, fill: "#666" }}
                          axisLine={false}
                          tickLine={false}
                        />
                        <YAxis
                          tick={{ fontSize: 11, fill: "#666" }}
                          axisLine={false}
                          tickLine={false}
                          tickFormatter={(v) => `RM${(v / 1000).toFixed(0)}k`}
                        />
                        <Tooltip content={<ChartTooltip />} />
                        <Bar
                          dataKey="total"
                          name="Total"
                          fill="#00509e"
                          radius={[6, 6, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  )}
                </CardContent>
              </AnalyticsChartCard>
            </Grid>

            {/* Chart 3 – Area: Daily Spending Pattern (monthly) */}
            <Grid item xs={12}>
              <AnalyticsChartCard>
                <CardContent sx={{ p: 3 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 1,
                    }}
                  >
                    <ShowChartIcon
                      sx={{ color: "primary.main", fontSize: 20 }}
                    />
                    <Typography variant="subtitle1" fontWeight={600}>
                      Daily Spending Pattern
                    </Typography>
                  </Box>
                  <Typography variant="caption" color="text.secondary">
                    {MONTH_NAMES[selectedMonth - 1]} {selectedYear} — day-by-day
                    breakdown
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  {areaData.length === 0 ? (
                    <Box sx={{ textAlign: "center", py: 6 }}>
                      <Typography variant="body2" color="text.secondary">
                        No daily data for this period
                      </Typography>
                    </Box>
                  ) : (
                    <ResponsiveContainer width="100%" height={220}>
                      <AreaChart data={areaData}>
                        <defs>
                          <linearGradient
                            id="areaGradient"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor="#00509e"
                              stopOpacity={0.15}
                            />
                            <stop
                              offset="95%"
                              stopColor="#00509e"
                              stopOpacity={0}
                            />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis
                          dataKey="name"
                          tick={{ fontSize: 11, fill: "#666" }}
                          axisLine={false}
                          tickLine={false}
                          label={{
                            value: "Day",
                            position: "insideBottomRight",
                            offset: -5,
                            fontSize: 11,
                          }}
                        />
                        <YAxis
                          tick={{ fontSize: 11, fill: "#666" }}
                          axisLine={false}
                          tickLine={false}
                          tickFormatter={(v) => `RM${(v / 1000).toFixed(0)}k`}
                        />
                        <Tooltip content={<ChartTooltip />} />
                        <Area
                          type="monotone"
                          dataKey="total"
                          name="Total"
                          stroke="#00509e"
                          strokeWidth={2.5}
                          fill="url(#areaGradient)"
                          dot={{ fill: "#00509e", strokeWidth: 2, r: 3 }}
                          activeDot={{ r: 5 }}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  )}
                </CardContent>
              </AnalyticsChartCard>
            </Grid>
          </Grid>
        </>
      )}
    </Box>
  );
};

export default AnalyticsTab;
