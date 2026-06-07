import React from "react";
import { Box, Card, CardContent, Divider, Typography } from "@mui/material";
import { getAccountLimits } from "../utils/accountLimits";
import { formatCurrency } from "@/utils/formatters";

interface AccountRulesCardProps {
  accountType: string;
  overdraftLimit?: number;
}

const Row: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      py: 1,
    }}
  >
    <Typography variant="body2" color="text.secondary">
      {label}
    </Typography>
    <Typography variant="body2" fontWeight={600}>
      {value}
    </Typography>
  </Box>
);

const AccountRulesCard: React.FC<AccountRulesCardProps> = ({
  accountType,
  overdraftLimit,
}) => {
  const limits = getAccountLimits(accountType);
  if (!limits) return null;

  const overdraftDisplay = limits.overdraftEligible
    ? (overdraftLimit ?? 0) > 0
      ? formatCurrency(overdraftLimit!)
      : "Not set"
    : "Not available";

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>
          Account Rules
        </Typography>
        <Divider sx={{ mb: 1 }} />
        <Row
          label="Daily Transfer Limit"
          value={limits.dailyLimit !== null ? formatCurrency(limits.dailyLimit) : "Not applicable"}
        />
        <Row
          label="Max Single Transfer"
          value={limits.maxSingle !== null ? formatCurrency(limits.maxSingle) : "Not applicable"}
        />
        <Row label="Monthly Withdrawals" value={limits.monthlyWithdrawals} />
        <Row label="Overdraft" value={overdraftDisplay} />
      </CardContent>
    </Card>
  );
};

export default AccountRulesCard;
