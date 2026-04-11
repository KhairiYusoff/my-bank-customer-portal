import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Grid,
  Chip,
  Divider,
  CircularProgress,
  Card,
  CardContent,
  Stack,
  Avatar,
} from "@mui/material";
import {
  AccountBalance as AccountIcon,
  Receipt as ExpenseIcon,
  AttachMoney as AmountIcon,
  Event as DateIcon,
  Payment as PaymentIcon,
  Category as CategoryIcon,
  Description as DescriptionIcon,
  Store as MerchantIcon,
  LocationOn as LocationIcon,
  ReceiptLong as ReceiptNumberIcon,
  Notes as NotesIcon,
  ErrorOutline as ErrorOutlineIcon,
  Repeat as RecurringIcon,
  Tag as TagIcon,
  Edit as ManualEntryIcon,
  Info as InfoIcon,
} from "@mui/icons-material";
import type { Expense } from "../../types/expense";

interface ExpenseDetailsDialogProps {
  open: boolean;
  onClose: () => void;
  expense: Expense | null;
  isLoading: boolean;
  error: any;
}

const ExpenseDetailsDialog: React.FC<ExpenseDetailsDialogProps> = ({
  open,
  onClose,
  expense,
  isLoading,
  error,
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatCurrency = (amount: number) => {
    return `RM${amount.toLocaleString()}`;
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ pb: 2 }}>
        <Box display="flex" alignItems="center" gap={2}>
          <ExpenseIcon color="primary" />
          <Typography variant="h6">Expense Details</Typography>
        </Box>
      </DialogTitle>

      <DialogContent dividers>
        {isLoading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="200px"
          >
            <CircularProgress />
          </Box>
        ) : error ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="200px"
            color="error.main"
          >
            <ErrorOutlineIcon sx={{ mr: 1 }} />
            <Typography variant="body1">
              Error loading expense details.
            </Typography>
          </Box>
        ) : expense ? (
          <Box>
            {/* Amount and Status Card */}
            <Card
              variant="outlined"
              sx={{
                mb: 3,
                background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
                border: "none",
                boxShadow: "0 4px 20px rgba(0, 80, 158, 0.1)",
              }}
            >
              <CardContent sx={{ pb: 2 }}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box>
                    <Typography
                      variant="overline"
                      color="text.secondary"
                      sx={{ mb: 1 }}
                    >
                      TOTAL AMOUNT
                    </Typography>
                    <Typography variant="h3" color="primary" fontWeight="bold">
                      {formatCurrency(expense.amount)}
                    </Typography>
                  </Box>
                  <Box textAlign="right">
                    <Chip
                      label={expense.status.toUpperCase()}
                      color={
                        expense.status === "active" ? "success" : "default"
                      }
                      sx={{
                        fontWeight: "bold",
                        minWidth: 100,
                        height: 32,
                      }}
                    />
                  </Box>
                </Box>
              </CardContent>
            </Card>

            {/* Basic Information */}
            <Card variant="outlined" sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
                  Expense Information
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <DateIcon color="action" fontSize="small" sx={{ minWidth: 24 }} />
                      <Box flex={1}>
                        <Typography variant="body2" color="text.secondary">
                          Date
                        </Typography>
                        <Typography variant="body1" fontWeight="medium">
                          {formatDate(expense.date)}
                        </Typography>
                      </Box>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <CategoryIcon color="action" fontSize="small" sx={{ minWidth: 24 }} />
                      <Box flex={1}>
                        <Typography variant="body2" color="text.secondary">
                          Category
                        </Typography>
                        <Typography variant="body1" fontWeight="medium">
                          {expense.category}
                        </Typography>
                      </Box>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <PaymentIcon color="action" fontSize="small" sx={{ minWidth: 24 }} />
                      <Box flex={1}>
                        <Typography variant="body2" color="text.secondary">
                          Payment Method
                        </Typography>
                        <Typography variant="body1" fontWeight="medium">
                          {expense.paymentMethod.replace("_", " ").toUpperCase()}
                        </Typography>
                      </Box>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <AccountIcon color="action" fontSize="small" sx={{ minWidth: 24 }} />
                      <Box flex={1}>
                        <Typography variant="body2" color="text.secondary">
                          Account
                        </Typography>
                        <Typography variant="body1" fontWeight="medium">
                          {expense.account.accountNumber}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {expense.account.accountType}
                        </Typography>
                      </Box>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Stack direction="row" spacing={2} alignItems="flex-start">
                      <DescriptionIcon color="action" fontSize="small" />
                      <Box flex={1}>
                        <Typography variant="body2" color="text.secondary">
                          Description
                        </Typography>
                        <Typography variant="body1" fontWeight="medium">
                          {expense.description}
                        </Typography>
                      </Box>
                    </Stack>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            <Grid item xs={12}>
              {/* Entry Information */}
              <Card variant="outlined" sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
                    Entry Information
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <ManualEntryIcon color="action" fontSize="small" />
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            Entry Type
                          </Typography>
                          <Chip
                            label={expense.isManualEntry ? "Manual Entry" : "System Generated"}
                            color={expense.isManualEntry ? "warning" : "info"}
                            variant="filled"
                            size="small"
                            sx={{ fontWeight: "medium" }}
                          />
                        </Box>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <InfoIcon color="action" fontSize="small" />
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            Expense ID
                          </Typography>
                          <Typography variant="body2" sx={{ fontFamily: "monospace" }}>
                            {expense._id}
                          </Typography>
                        </Box>
                      </Stack>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>

              {/* Status and Metadata */}
              <Card variant="outlined" sx={{ mb: 3 }}>
                <CardContent>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Created: {formatDate(expense.createdAt)}
                      </Typography>
                      {expense.updatedAt !== expense.createdAt && (
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          display="block"
                        >
                          Updated: {formatDate(expense.updatedAt)}
                        </Typography>
                      )}
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Box>
        ) : (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            py={8}
          >
            <Typography color="text.secondary" variant="h6">
              No expense data available.
            </Typography>
          </Box>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} variant="outlined">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ExpenseDetailsDialog;
