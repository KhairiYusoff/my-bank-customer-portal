import React from "react";
import { Box, Tooltip, Typography } from "@mui/material";
import type { AccountTypeLimits } from "../store/accountsApi";
import { formatCurrency } from "@/utils/formatters";
import { AccountChip, AccountChipInfoIcon } from "./styles";

interface AccountTypeChipProps {
  accountType: string;
  overdraftLimit?: number;
  limits: AccountTypeLimits | null;
  darkSurface?: boolean;
}

const TooltipContent: React.FC<{
  limits: AccountTypeLimits;
  overdraftLimit?: number;
}> = ({ limits, overdraftLimit }) => {
  const overdraftDisplay = limits.overdraftEligible
    ? (overdraftLimit ?? 0) > 0
      ? formatCurrency(overdraftLimit!)
      : "Not set"
    : "No";

  return (
    <Box sx={{ p: 0.5 }}>
      {limits.transfersAllowed ? (
        <>
          <Typography variant="caption" display="block">
            Daily transfer limit&nbsp;&nbsp;
            {limits.dailyTransferLimit !== null
              ? formatCurrency(limits.dailyTransferLimit)
              : "—"}
          </Typography>
          <Typography variant="caption" display="block">
            Max single transfer&nbsp;&nbsp;
            {limits.maxSingleTransfer !== null
              ? formatCurrency(limits.maxSingleTransfer)
              : "—"}
          </Typography>
        </>
      ) : (
        <Typography variant="caption" display="block">
          Transfers&nbsp;&nbsp;Not permitted
        </Typography>
      )}
      <Typography variant="caption" display="block">
        Min withdrawal&nbsp;&nbsp;
        {limits.minWithdrawal !== null
          ? formatCurrency(limits.minWithdrawal)
          : "At maturity only"}
      </Typography>
      <Typography variant="caption" display="block">
        Overdraft&nbsp;&nbsp;{overdraftDisplay}
      </Typography>
    </Box>
  );
};

const AccountTypeChip: React.FC<AccountTypeChipProps> = ({
  accountType,
  overdraftLimit,
  limits,
  darkSurface = false,
}) => {
  const label = accountType.replace(/_/g, " ");

  if (!limits) {
    return (
      <AccountChip label={label} size="small" $darkSurface={darkSurface} />
    );
  }

  return (
    <Box sx={{ display: "inline-flex", alignItems: "center", gap: 0.5 }}>
      <AccountChip label={label} size="small" $darkSurface={darkSurface} />
      <Tooltip
        title={
          <TooltipContent limits={limits} overdraftLimit={overdraftLimit} />
        }
        arrow
        placement="right"
      >
        <AccountChipInfoIcon fontSize="small" $darkSurface={darkSurface} />
      </Tooltip>
    </Box>
  );
};

export default AccountTypeChip;
