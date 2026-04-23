import React, { useState } from "react";
import {
  Box,
  Chip,
  CircularProgress,
  Skeleton,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  AutoAwesome as AIIcon,
  Refresh as RefreshIcon,
} from "@mui/icons-material";
import { useGetInsightsQuery } from "../../store/aiApi";
import type { InsightsPeriod } from "../../types/ai";
import { CATEGORY_LABELS, PERIODS } from "../../constants/insights";
import {
  CategoryBar,
  CategoryRow,
  InsightsBody,
  InsightsCard,
  InsightsHeader,
  InsightsHeaderSubtitle,
  InsightsHeaderTitle,
  NarrativeBox,
  PeriodChipRow,
} from "./styles";

const SpendInsightsCard: React.FC = () => {
  const [period, setPeriod] = useState<InsightsPeriod>("month");

  const { data, isLoading, isFetching, refetch } = useGetInsightsQuery(period);
  const insights = data?.data;

  return (
    <InsightsCard>
      {/* ── Header ────────────────────────────────────────────── */}
      <InsightsHeader>
        <AIIcon sx={{ color: "#fff", fontSize: 22 }} />
        <Box sx={{ flex: 1 }}>
          <InsightsHeaderTitle>AI Spend Insights</InsightsHeaderTitle>
          <InsightsHeaderSubtitle>
            Powered by MyBank AI · No sensitive data shared
          </InsightsHeaderSubtitle>
        </Box>
        <Tooltip title="Refresh insights">
          <RefreshIcon
            onClick={() => refetch()}
            sx={{
              color: "rgba(255,255,255,0.8)",
              cursor: "pointer",
              fontSize: 20,
              "&:hover": { color: "#fff" },
              transition: "color 0.2s",
              ...(isFetching && { animation: "spin 1s linear infinite" }),
            }}
          />
        </Tooltip>
      </InsightsHeader>

      {/* ── Body ─────────────────────────────────────────────── */}
      <InsightsBody>
        {/* Period selector */}
        <PeriodChipRow>
          {PERIODS.map((p) => (
            <Chip
              key={p.value}
              label={p.label}
              size="small"
              onClick={() => setPeriod(p.value)}
              color={period === p.value ? "primary" : "default"}
              variant={period === p.value ? "filled" : "outlined"}
              sx={{ cursor: "pointer" }}
            />
          ))}
        </PeriodChipRow>

        {/* Narrative */}
        {isLoading ? (
          <>
            <Skeleton variant="rounded" height={72} sx={{ mb: 2.5 }} />
            <Skeleton variant="text" sx={{ mb: 1 }} />
            <Skeleton variant="text" sx={{ mb: 1 }} />
            <Skeleton variant="text" width="60%" />
          </>
        ) : (
          <>
            <NarrativeBox>
              {isFetching ? (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <CircularProgress size={16} />
                  <Typography variant="body2" color="text.secondary">
                    Refreshing…
                  </Typography>
                </Box>
              ) : (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  lineHeight={1.6}
                >
                  {insights?.aiNarrative ??
                    "No spending data available for this period."}
                </Typography>
              )}
            </NarrativeBox>

            {/* Top categories */}
            {insights && insights.topCategories.length > 0 && (
              <>
                <Typography
                  variant="caption"
                  fontWeight={600}
                  color="text.secondary"
                  sx={{
                    mb: 1.5,
                    display: "block",
                    textTransform: "uppercase",
                    letterSpacing: 0.5,
                  }}
                >
                  Top spending categories
                </Typography>
                {insights.topCategories.map((cat) => (
                  <CategoryRow key={cat.category}>
                    <Typography
                      variant="body2"
                      sx={{ minWidth: 110, color: "text.primary" }}
                    >
                      {CATEGORY_LABELS[cat.category] ?? cat.category}
                    </Typography>
                    <CategoryBar
                      variant="determinate"
                      value={cat.pct}
                      $pct={cat.pct}
                    />
                    <Typography
                      variant="body2"
                      sx={{
                        minWidth: 38,
                        textAlign: "right",
                        color: "text.secondary",
                      }}
                    >
                      {cat.pct}%
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ minWidth: 64, textAlign: "right", fontWeight: 600 }}
                    >
                      ${cat.total.toFixed(2)}
                    </Typography>
                  </CategoryRow>
                ))}

                <Box
                  sx={{ mt: 2, pt: 2, borderTop: 1, borderColor: "divider" }}
                >
                  <Typography variant="body2" color="text.secondary">
                    Total spent:{" "}
                    <Typography
                      component="span"
                      variant="body2"
                      fontWeight={700}
                      color="text.primary"
                    >
                      ${insights.totalSpent.toFixed(2)}
                    </Typography>{" "}
                    · since {insights.since}
                  </Typography>
                </Box>
              </>
            )}
          </>
        )}
      </InsightsBody>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </InsightsCard>
  );
};

export default SpendInsightsCard;
