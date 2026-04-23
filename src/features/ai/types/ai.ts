export type InsightsPeriod = "week" | "month" | "quarter" | "year";

export interface SpendCategory {
  category: string;
  total: number;
  count: number;
  pct: number;
}

export interface SpendAccount {
  accountType: string;
  balance: number;
  currency: string;
}

export interface SpendInsightsData {
  period: InsightsPeriod;
  since: string;
  totalSpent: number;
  topCategories: SpendCategory[];
  accounts: SpendAccount[];
  aiNarrative: string;
}

export interface GetInsightsResponse {
  success: boolean;
  data: SpendInsightsData;
}
