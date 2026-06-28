import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  Stack,
  Chip,
  Alert,
} from "@mui/material";
import {
  AccountBalance as AccountBalanceIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  SwapHoriz as TransferIcon,
  AttachMoney as MoneyIcon,
  CalendarToday as DateIcon,
  Tag as ReferenceIcon,
} from "@mui/icons-material";
import { formatDateTime, formatCurrency } from "@/utils/formatters";
import { Pagination } from "@/components";
import type {
  TransactionHistory,
  TransactionHistoryResponse,
} from "@/features/transactions/types/transfer";
import {
  getTransactionTypeColor,
  getTransactionTypeLabel,
  isOutgoing,
  getAmountColor,
  formatTransactionAmount,
} from "@/features/transactions/utils/transactionUtils";

interface TransactionsListProps {
  transactionsData?: TransactionHistoryResponse;
  transactionsError: unknown;
  page: number;
  onPageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
  onSelect: (tx: TransactionHistory) => void;
}

const getTransactionIcon = (type: string) => {
  switch (type) {
    case "transfer":
      return <TransferIcon sx={{ color: "info.main" }} />;
    case "deposit":
    case "airdrop":
      return <TrendingUpIcon sx={{ color: "success.main" }} />;
    case "withdrawal":
      return <TrendingDownIcon sx={{ color: "error.main" }} />;
    default:
      return <MoneyIcon sx={{ color: "text.secondary" }} />;
  }
};

const TransactionsList: React.FC<TransactionsListProps> = ({
  transactionsData,
  transactionsError,
  page,
  onPageChange,
  onSelect,
}) => {
  if (transactionsError) {
    const apiError = transactionsError as any;
    return (
      <Alert severity="error">
        {apiError.data?.message || "Failed to load transaction history."}
      </Alert>
    );
  }

  if (!transactionsData?.success || !transactionsData.data?.length) {
    return (
      <Card>
        <CardContent sx={{ textAlign: "center", py: 6 }}>
          <AccountBalanceIcon
            sx={{ fontSize: 64, color: "text.secondary", mb: 2 }}
          />
          <Typography variant="h6" color="text.secondary">
            No transactions found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Your transaction history will appear here
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent sx={{ p: 0 }}>
        <Box sx={{ p: 3, pb: 1 }}>
          <Typography
            variant="h6"
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <AccountBalanceIcon />
            Transaction History
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Total: {transactionsData.meta?.total || 0} transactions
          </Typography>
        </Box>

        <List disablePadding>
          {transactionsData.data.map((transaction, index) => (
            <React.Fragment key={transaction._id}>
              <ListItem
                onClick={() => onSelect(transaction)}
                sx={{
                  px: 3,
                  py: 2,
                  cursor: "pointer",
                  "&:hover": { bgcolor: "action.hover" },
                }}
              >
                <ListItemAvatar>
                  <Avatar sx={{ backgroundColor: "transparent" }}>
                    {getTransactionIcon(transaction.type)}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mb: 0.5,
                      }}
                    >
                      <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                        {transaction.description}
                      </Typography>
                      <Chip
                        label={getTransactionTypeLabel(
                          transaction.type,
                          transaction.direction,
                        )}
                        color={getTransactionTypeColor(
                          transaction.type,
                          transaction.direction,
                        )}
                        size="small"
                        sx={{ textTransform: "capitalize" }}
                      />
                    </Box>
                  }
                  secondary={
                    <Stack spacing={0.5}>
                      {transaction.counterpartName && (
                        <Typography variant="body2" color="text.secondary">
                          {transaction.counterpartName}
                        </Typography>
                      )}
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 0.5,
                        }}
                      >
                        <DateIcon
                          sx={{ fontSize: 16, color: "text.secondary" }}
                        />
                        <Typography variant="body2" color="text.secondary">
                          {formatDateTime(transaction.date)}
                        </Typography>
                      </Box>
                      {transaction.reference && (
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5,
                          }}
                        >
                          <ReferenceIcon
                            sx={{ fontSize: 14, color: "text.disabled" }}
                          />
                          <Typography
                            variant="caption"
                            color="text.disabled"
                            sx={{ fontFamily: "monospace" }}
                          >
                            {transaction.reference}
                          </Typography>
                        </Box>
                      )}
                    </Stack>
                  }
                />
                <Box sx={{ textAlign: "right" }}>
                  <Typography
                    variant="h6"
                    sx={{
                      color: getAmountColor(transaction),
                      fontWeight: "bold",
                    }}
                  >
                    {formatTransactionAmount(transaction, (n) =>
                      formatCurrency(Math.abs(n)),
                    )}
                  </Typography>
                  <Chip
                    label={transaction.status}
                    size="small"
                    color={
                      transaction.status === "completed" ? "success" : "warning"
                    }
                    variant="outlined"
                  />
                </Box>
              </ListItem>
              {index < transactionsData.data.length - 1 && (
                <Divider variant="inset" component="li" />
              )}
            </React.Fragment>
          ))}
        </List>

        {transactionsData.meta && (
          <Pagination
            count={transactionsData.meta.pages}
            page={page}
            onChange={onPageChange}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default TransactionsList;
