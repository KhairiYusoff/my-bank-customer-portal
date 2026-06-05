import React from "react";
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Stack,
  Divider,
  Chip,
  useMediaQuery,
  useTheme,
  Alert,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { formatDateTime, formatCurrency } from "@/utils/formatters";
import type { TransactionHistory } from "../types/transfer";
import {
  getTransactionTypeLabel,
  getTransactionTypeColor,
  getAmountColor,
  formatTransactionAmount,
} from "../utils/transactionUtils";

interface ReceiptDrawerProps {
  transaction: TransactionHistory | null;
  open: boolean;
  onClose: () => void;
  error?: boolean;
  onRetry?: () => void;
}

const DASH = "—";

function getCounterpartLabel(tx: TransactionHistory): string | null {
  if (tx.type === "transfer") {
    return tx.direction === "debit" ? "To" : "From";
  }
  if (tx.type === "deposit" || tx.type === "airdrop") return "From";
  return null;
}

const ReceiptRow: React.FC<{ label: string; value: React.ReactNode }> = ({
  label,
  value,
}) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 2,
    }}
  >
    <Typography
      variant="body2"
      color="text.secondary"
      sx={{ minWidth: 110, flexShrink: 0 }}
    >
      {label}
    </Typography>
    <Typography variant="body2" fontWeight={500} sx={{ textAlign: "right" }}>
      {value}
    </Typography>
  </Box>
);

const ReceiptDrawer: React.FC<ReceiptDrawerProps> = ({
  transaction,
  open,
  onClose,
  error,
  onRetry,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Drawer
      anchor={isMobile ? "bottom" : "right"}
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: isMobile ? "100%" : 400,
          maxHeight: isMobile ? "90vh" : "100vh",
          borderTopLeftRadius: isMobile ? 16 : 0,
          borderTopRightRadius: isMobile ? 16 : 0,
          p: 3,
          overflowY: "auto",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          mb: 1,
        }}
      >
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </Box>

      {error ? (
        <Box sx={{ py: 4 }}>
          <Alert severity="error" sx={{ mb: 2 }}>
            Unable to load receipt. Please try again.
          </Alert>
          {onRetry && (
            <Button variant="outlined" onClick={onRetry} fullWidth>
              Retry
            </Button>
          )}
        </Box>
      ) : !transaction ? null : (
        <>
          <Chip
            label={getTransactionTypeLabel(
              transaction.type,
              transaction.direction,
            )}
            color={getTransactionTypeColor(
              transaction.type,
              transaction.direction,
            )}
            sx={{ fontWeight: 700, letterSpacing: 0.5, mb: 2 }}
          />

          <Typography
            variant="h4"
            fontWeight={700}
            color={getAmountColor(transaction)}
            sx={{ mb: 3 }}
          >
            {formatTransactionAmount(transaction, formatCurrency)}
          </Typography>

          <Divider sx={{ mb: 3 }} />

          <Stack spacing={2}>
            {/* Reference */}
            <ReceiptRow
              label="Reference"
              value={transaction.reference ?? DASH}
            />

            {/* Counterpart name */}
            {(() => {
              const label = getCounterpartLabel(transaction);
              if (!label) return null;
              return (
                <ReceiptRow
                  label={label}
                  value={transaction.counterpartName ?? DASH}
                />
              );
            })()}

            {/* Counterpart account*/}
            {transaction.counterpartAccount && (
              <ReceiptRow
                label="Account"
                value={transaction.counterpartAccount}
              />
            )}

            {/* Balance after */}
            {transaction.balanceAfter != null && (
              <ReceiptRow
                label="Balance after"
                value={formatCurrency(transaction.balanceAfter)}
              />
            )}

            {/* Date */}
            <ReceiptRow label="Date" value={formatDateTime(transaction.date)} />

            {/* Status */}
            <ReceiptRow
              label="Status"
              value={
                <Chip
                  label={transaction.status}
                  size="small"
                  color={
                    transaction.status === "completed" ? "success" : "warning"
                  }
                  variant="outlined"
                />
              }
            />

            {/* Fee */}
            <ReceiptRow
              label="Fee"
              value={formatCurrency(transaction.fee ?? 0)}
            />

            {/* Memo */}
            {transaction.type !== "withdrawal" && (
              <ReceiptRow label="Memo" value={transaction.memo ?? DASH} />
            )}
          </Stack>
        </>
      )}
    </Drawer>
  );
};

export default ReceiptDrawer;
