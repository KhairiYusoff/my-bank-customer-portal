import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  CardContent,
  Typography,
  Stack,
  IconButton,
  Alert,
  Chip,
} from "@mui/material";
import { GradientBalanceCard, ActionButton } from "./styles";
import {
  SwapHoriz as TransferIcon,
  Add as DepositIcon,
  Remove as WithdrawIcon,
  Refresh as RefreshIcon,
  ExitToApp as SettleIcon,
  ErrorOutline as WarningIcon,
} from "@mui/icons-material";
import type { AccountBalanceResponse } from "../types/account";
import type { AccountTypeLimits } from "../store/accountsApi";
import { useFdSettleMutation } from "../store/accountsApi";
import { formatCurrency } from "@/utils/formatters";
import { useToast } from "@/utils/snackbarUtils";
import AccountTypeChip from "./AccountTypeChip";

interface BalanceCardProps {
  accountNumber: string;
  balanceData?: AccountBalanceResponse;
  balanceError: unknown;
  onRefresh: () => void;
  accountType?: string;
  status?: string;
  overdraftLimit?: number;
  limits?: AccountTypeLimits | null;
  maturityDate?: string | Date;
}

const BalanceCard: React.FC<BalanceCardProps> = ({
  accountNumber,
  balanceData,
  balanceError,
  onRefresh,
  accountType,
  status,
  overdraftLimit,
  limits,
  maturityDate,
}) => {
  const navigate = useNavigate();
  const { success, error: showError } = useToast();
  const [fdSettle, { isLoading: isSettling }] = useFdSettleMutation();

  const isDormant = status === "dormant";
  const isSuspended = status === "suspended";
  const isActionsDisabled = isDormant || isSuspended;

  const isMaturedFD = React.useMemo(() => {
    if (accountType !== "fixed_deposit" || !maturityDate) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const mDate = new Date(maturityDate);
    mDate.setHours(0, 0, 0, 0);
    
    const diffTime = today.getTime() - mDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays >= 0 && diffDays <= 7;
  }, [accountType, maturityDate]);

  const handleSettle = async () => {
    try {
      await fdSettle(accountNumber).unwrap();
      success("Fixed Deposit principal has been settled successfully.");
      navigate("/dashboard");
    } catch (err: any) {
      showError(err?.data?.message || "Failed to settle Fixed Deposit");
    }
  };

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
      <Box>
        {isDormant && (
          <Alert 
            severity="warning" 
            variant="filled" 
            icon={<WarningIcon />}
            sx={{ mb: 2, borderRadius: 2 }}
          >
            This account is <strong>Dormant</strong>. Self-service transactions are disabled. Please visit your nearest branch for reactivation.
          </Alert>
        )}
        
        {isSuspended && (
          <Alert 
            severity="error" 
            variant="filled" 
            icon={<WarningIcon />}
            sx={{ mb: 2, borderRadius: 2 }}
          >
            This account is <strong>Suspended</strong> for security reasons. Please contact support immediately.
          </Alert>
        )}

        <GradientBalanceCard sx={{ opacity: isActionsDisabled ? 0.85 : 1 }}>
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
                <Stack direction="row" spacing={1} sx={{ mb: 1 }} alignItems="center">
                  {accountType && (
                    <AccountTypeChip
                      accountType={accountType}
                      overdraftLimit={overdraftLimit}
                      limits={limits ?? null}
                      darkSurface
                    />
                  )}
                  {(isDormant || isSuspended) && (
                    <Chip 
                      label={status?.toUpperCase()} 
                      size="small" 
                      sx={{ 
                        bgcolor: isSuspended ? "error.main" : "grey.500", 
                        color: "white", 
                        fontWeight: "bold",
                        fontSize: "0.7rem"
                      }} 
                    />
                  )}
                </Stack>
                <Typography variant="h6" sx={{ opacity: 0.9, mb: 1 }}>
                  Account Balance
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: "bold", mb: 1 }}>
                  {formatCurrency(balanceData.data.balance)}
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
              {accountType === "fixed_deposit" ? (
                <>
                  {isMaturedFD && (
                    <ActionButton
                      variant="contained"
                      startIcon={<SettleIcon />}
                      onClick={handleSettle}
                      disabled={isSettling || isActionsDisabled}
                      sx={{ bgcolor: "warning.main", "&:hover": { bgcolor: "warning.dark" } }}
                    >
                      {isSettling ? "Settling..." : "Withdraw Principal"}
                    </ActionButton>
                  )}
                  <Typography variant="caption" sx={{ color: "white", opacity: 0.8, mt: 1 }}>
                    {isMaturedFD 
                      ? "Your FD has matured. You can withdraw the principal now." 
                      : "Fixed Deposits are locked until maturity."}
                  </Typography>
                </>
              ) : (
                <>
                  <ActionButton
                    variant="contained"
                    startIcon={<TransferIcon />}
                    onClick={() => navigate("/transfer", { state: { fromAccount: accountNumber } })}
                    disabled={isActionsDisabled}
                  >
                    Transfer
                  </ActionButton>
                  <ActionButton
                    variant="contained"
                    startIcon={<DepositIcon />}
                    onClick={() => navigate("/deposit", { state: { accountNumber } })}
                    disabled={isActionsDisabled}
                  >
                    Deposit
                  </ActionButton>
                  <ActionButton
                    variant="contained"
                    startIcon={<WithdrawIcon />}
                    onClick={() => navigate("/withdraw", { state: { accountNumber } })}
                    disabled={isActionsDisabled}
                  >
                    Withdraw
                  </ActionButton>
                </>
              )}
            </Stack>
          </CardContent>
        </GradientBalanceCard>
      </Box>
    );
  }

  return (
    <Alert severity="info" sx={{ mb: 3 }}>
      Account details could not be loaded.
    </Alert>
  );
};

export default BalanceCard;
