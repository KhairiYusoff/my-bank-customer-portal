export interface AccountLimits {
  dailyLimit: number | null;
  maxSingle: number | null;
  monthlyWithdrawals: string;
  overdraftEligible: boolean;
}

const ACCOUNT_LIMITS: Record<string, AccountLimits> = {
  savings: {
    dailyLimit: 10000,
    maxSingle: 5000,
    monthlyWithdrawals: "4 per month",
    overdraftEligible: false,
  },
  current: {
    dailyLimit: 20000,
    maxSingle: 10000,
    monthlyWithdrawals: "Unlimited",
    overdraftEligible: true,
  },
  business: {
    dailyLimit: 50000,
    maxSingle: 20000,
    monthlyWithdrawals: "Unlimited",
    overdraftEligible: true,
  },
  fixed_deposit: {
    dailyLimit: null,
    maxSingle: null,
    monthlyWithdrawals: "At maturity only",
    overdraftEligible: false,
  },
};

export const getAccountLimits = (accountType: string): AccountLimits | null =>
  ACCOUNT_LIMITS[accountType.toLowerCase()] ?? null;
