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
  CircularProgress,
  Pagination,
} from "@mui/material";
import {
  AccountBalance as AccountBalanceIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  SwapHoriz as TransferIcon,
  AttachMoney as MoneyIcon,
  Person as PersonIcon,
  CalendarToday as DateIcon,
} from "@mui/icons-material";
import { format } from "date-fns";
import type { TransactionHistoryResponse } from "@/features/transactions/types/transfer";

interface TransactionsListProps {
  transactionsData?: TransactionHistoryResponse;
  transactionsError: unknown;
  transactionsLoading: boolean;
  page: number;
  onPageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
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

const getAmountColor = (amount: number) => {
  return amount >= 0 ? "success.main" : "error.main";
};

const formatAmount = (amount: number) => {
  return amount >= 0
    ? `+$${Math.abs(amount).toFixed(2)}`
    : `-$${Math.abs(amount).toFixed(2)}`;
};

const getTransactionTypeChip = (type: string) => {
  const configs: Record<string, { label: string; color: "primary" | "success" | "error" | "secondary" | "default" }> = {
    transfer: { label: "Transfer", color: "primary" },
    deposit: { label: "Deposit", color: "success" },
    withdrawal: { label: "Withdrawal", color: "error" },
    airdrop: { label: "Bonus", color: "secondary" },
  };
  const config = configs[type] || { label: type, color: "default" as const };
  return (
    <Chip
      label={config.label}
      color={config.color}
      size="small"
      sx={{ textTransform: "capitalize" }}
    />
  );
};

const TransactionsList: React.FC<TransactionsListProps> = ({
  transactionsData,
  transactionsError,
  transactionsLoading,
  page,
  onPageChange,
}) => {
  if (transactionsLoading) {
    return (
      <Card>
        <CardContent sx={{ textAlign: "center", py: 4 }}>
          <CircularProgress />
          <Typography variant="body2" sx={{ mt: 2, color: "text.secondary" }}>
            Loading transactions...
          </Typography>
        </CardContent>
      </Card>
    );
  }

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
              <ListItem sx={{ px: 3, py: 2 }}>
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
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: 500 }}
                      >
                        {transaction.description}
                      </Typography>
                      {getTransactionTypeChip(transaction.type)}
                    </Box>
                  }
                  secondary={
                    <Stack spacing={0.5}>
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
                          {format(
                            new Date(transaction.date),
                            "MMM dd, yyyy • hh:mm a"
                          )}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 0.5,
                        }}
                      >
                        <PersonIcon
                          sx={{ fontSize: 16, color: "text.secondary" }}
                        />
                        <Typography variant="body2" color="text.secondary">
                          By {transaction.performedBy.name} (
                          {transaction.performedBy.role})
                        </Typography>
                      </Box>
                    </Stack>
                  }
                />
                <Box sx={{ textAlign: "right" }}>
                  <Typography
                    variant="h6"
                    sx={{
                      color: getAmountColor(transaction.amount),
                      fontWeight: "bold",
                    }}
                  >
                    {formatAmount(transaction.amount)}
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

        {transactionsData.meta && transactionsData.meta.pages > 1 && (
          <Box sx={{ p: 3, pt: 2 }}>
            <Pagination
              count={transactionsData.meta.pages}
              page={page}
              onChange={onPageChange}
              color="primary"
              sx={{ display: "flex", justifyContent: "center" }}
            />
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default TransactionsList;
