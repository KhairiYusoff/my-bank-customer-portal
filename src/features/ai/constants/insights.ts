import type { InsightsPeriod } from "../types/ai";

export const PERIODS: { value: InsightsPeriod; label: string }[] = [
  { value: "week", label: "7 days" },
  { value: "month", label: "30 days" },
  { value: "quarter", label: "90 days" },
  { value: "year", label: "1 year" },
];

export const CATEGORY_LABELS: Record<string, string> = {
  food: "Food & Dining",
  transport: "Transport",
  shopping: "Shopping",
  utilities: "Utilities",
  housing: "Housing",
  healthcare: "Healthcare",
  entertainment: "Entertainment",
  education: "Education",
  personal: "Personal",
  travel: "Travel",
  other: "Other",
};
