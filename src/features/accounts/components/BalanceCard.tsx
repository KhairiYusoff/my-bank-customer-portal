import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  CardContent,
  Typography,
  Stack,
  IconButton,
  Alert,
} from "@mui/material";
import { GradientBalanceCard, ActionButton } from "./styles";
import {
  SwapHoriz as TransferIcon,
  Add as DepositIcon,
  Remove as WithdrawIcon,
  Refresh as RefreshIcon,
} from "@mui/icons-material";
import type { AccountBalanceResponse } from "../types/account";

interface BalanceCardProps {
  accountNumber: string;
  balanceData?: AccountBalanceResponse;
  balanceError: unknown;
  onRefresh: () => void;
}

const BalanceCard: React.FC<BalanceCardProps> = ({
  accountNumber,
  balanceData,
  balanceError,
  onRefresh,
}) => {
  const navigate = useNavigate();

  if (balanceError) {
    const apiError = balanceError as any;
    return (
      <Alert severity="error" sx={{ mb: 3 }}>
        {apiError.data?.message || "Failed to load account balance."}
      </Alert>
    );
  }

  if (balanceData?.success && balanceData.data) {
    return (
      <GradientBalanceCard>
        <CardContent sx={{ p: 4 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              mb: 2,
            }}
          >
            <Box>
              <Typography variant="h6" sx={{ opacity: 0.9, mb: 1 }}>
                Account Balance
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: "bold", mb: 1 }}>
                ${balanceData.data.balance.toFixed(2)}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                {accountNumber}
              </Typography>
            </Box>
            <IconButton onClick={onRefresh} sx={{ color: "white" }}>
              <RefreshIcon />
            </IconButton>
          </Box>

          <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
            <ActionButton
              variant="contained"
              startIcon={<TransferIcon />}
              onClick={() => navigate("/transfer")}
            >
              Transfer
            </ActionButton>
            <ActionButton
              variant="contained"
              startIcon={<DepositIcon />}
              onClick={() => navigate("/deposit")}
            >
              Deposit
            </ActionButton>
            <ActionButton
              variant="contained"
              startIcon={<WithdrawIcon />}
              onClick={() => navigate("/withdraw")}
            >
              Withdraw
            </ActionButton>
          </Stack>
        </CardContent>
      </GradientBalanceCard>
    );
  }

  return (
    <Alert severity="info" sx={{ mb: 3 }}>
      Account details could not be loaded.
    </Alert>
  );
};

export default BalanceCard;
