import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  IconButton,
  Alert,
  CircularProgress,
} from "@mui/material";
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
  balanceLoading: boolean;
  onRefresh: () => void;
}

const BalanceCard: React.FC<BalanceCardProps> = ({
  accountNumber,
  balanceData,
  balanceError,
  balanceLoading,
  onRefresh,
}) => {
  const navigate = useNavigate();

  if (balanceLoading) {
    return (
      <Card
        sx={{
          mb: 3,
          background: "linear-gradient(135deg, #00509e 0%, #1976d2 100%)",
        }}
      >
        <CardContent sx={{ color: "white", textAlign: "center", py: 4 }}>
          <CircularProgress color="inherit" />
        </CardContent>
      </Card>
    );
  }

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
      <Card
        sx={{
          mb: 3,
          background: "linear-gradient(135deg, #00509e 0%, #1976d2 100%)",
          color: "white",
          boxShadow: "0 8px 32px rgba(0, 80, 158, 0.15)",
        }}
      >
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
            <Button
              variant="contained"
              startIcon={<TransferIcon />}
              onClick={() => navigate("/transfer")}
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.3)" },
              }}
            >
              Transfer
            </Button>
            <Button
              variant="contained"
              startIcon={<DepositIcon />}
              onClick={() => navigate("/deposit")}
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.3)" },
              }}
            >
              Deposit
            </Button>
            <Button
              variant="contained"
              startIcon={<WithdrawIcon />}
              onClick={() => navigate("/withdraw")}
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.3)" },
              }}
            >
              Withdraw
            </Button>
          </Stack>
        </CardContent>
      </Card>
    );
  }

  return (
    <Alert severity="info" sx={{ mb: 3 }}>
      Account details could not be loaded.
    </Alert>
  );
};

export default BalanceCard;
